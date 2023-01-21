import { IEntry } from './../shared/interface';
const db = require('../model');
const Entry = db.entries;

exports.addEntry = (req: { body: IEntry}, res) => {
  console.log('add entry req received: ', req.body);

  const entry = new Entry({
    title: req.body.title,
    text: req.body.text,
    date: req.body.date,
    time: req.body.time 
  });

  entry
    .save(entry)
    .then((data) => res.send([data]))
    .catch((e: { message: string; }) => {
      res.status(500)
        .send({
          message: e.message || 'An error occurred - failed to add entry.'
        });
    }
  );
};

exports.getAllEntries = (req, res) => {
  Entry
    .find()
    .then((entries) => res.send(entries))
    .catch((e) => {
      res.status(500)
        .send({
          message: e.message || 'An error occurred - failed to fetch entries.'
        });
    }
  );
}

exports.deleteEntry = (req, res) => {
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
    .catch(err => {
			res.status(500).send({
				message: `Failed delete entry with id ${id}`
			});
    });
  };