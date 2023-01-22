import { IEntry, IRequest } from './../shared/interface';
const db = require('../model');
const Entry = db.entries;

exports.addEntry = (req: IRequest, res: any) => {
  console.log('add entry req received: ', req.body);

  const entry = new Entry({
    title: req.body.title,
    text: req.body.text,
    date: req.body.date,
    time: req.body.time 
  });

  entry
    .save(entry)
    .then((data: IEntry) => res.send([data]))
    .catch((e: Error) => {
      res.status(500)
        .send({
          message: e.message || 'An error occurred - failed to add entry.'
        });
    }
  );
};

exports.getAllEntries = (req: IRequest, res: any) => {
  Entry
    .find()
    .then((entries: IEntry[]) => res.send(entries))
    .catch((e: Error) => {
      res.status(500)
        .send({
          message: e.message || 'An error occurred - failed to fetch entries.'
        });
    }
  );
}

exports.deleteEntry = (req: IRequest, res: any) => {
  console.log('delete entry req received: ', req);
  const id = req.params.id;
  
  Entry.findByIdAndRemove(id)
    .then(data => {
    if (!data) {
      res.status(404).send({
				message: `Failed delete entry with id ${id} - entry not found`
      });
    } else {
      res.send({
				message: `Deleted entry ${id}`
      });
    }
    })
    .catch((e: Error) => {
			res.status(500).send({
				message: e.message || `Failed delete entry with id ${id}`
			});
    });
};

exports.updateEntry = (req: IRequest, res: any) => {
  if (!req.body) {
    return res.status(400).send({
      message: "No data submitted for update"
    });
  }

  const id = req.params.id;

  Entry.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data: IEntry) => {
      if (!data) {
        res.status(404).send({
          message: `Failed to update entry with id ${id} - entry not found`
        });
      } else res.send([data]);
    })
    .catch((e: Error) => {
      res.status(500).send({
        message: e.message || `Failed to update entry with id ${id}`
      });
    });
};