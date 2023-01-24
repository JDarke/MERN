import { IEntry, IRequest } from './../shared/interface';
import { Response } from 'express';
const db = require('../model');
const Entry = db.entry;

// Create and Save a new Entry
exports.addEntry = (req: IRequest, res: Response): void => {
  const entry = new Entry({
    title: req.body.title,
		author: req.body.author,
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

// Retrieve all Entries from the database.
exports.getAllEntries = (req: IRequest, res: Response): void => {
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

// Find a single Entry with an id and remove it from the database
exports.deleteEntry = (req: IRequest, res: Response): void => {
  const id = req.params.id;
  
  Entry.findByIdAndRemove(id)
    .then((data: IEntry) => {
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

// Update a Entry
exports.updateEntry = (req: IRequest, res: Response): void => {
  if (!req.body) {
    res.status(400).send({
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

exports.getPdf = (req: IRequest, res: Response): void => {
	const id = req.params.id;

  Entry
    .find({ _id: id})
    .then( async (entry: IEntry[]) => {
			const pdfBuffer = await require('../pdf/pdf-generator')(entry[0]);
			const pdfBase64string = pdfBuffer.toString('base64')
			res.send(pdfBase64string);
		})
    .catch((e: Error) => {
      res.status(500)
        .send({
          message: e.message || 'An error occurred - failed to fetch entries.'
        });
    }
  );
}