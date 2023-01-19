const db = require('../model');
const Entry = db.entries;

exports.addEntry = (req, res) => {
    const entry = new Entry({
        title: req.body.title,
        text: req.body.text,
        date: req.body.date,
        time: req.body.time
    });

    Entry
        .save(entry)
        .then((data) => res.send(data))
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