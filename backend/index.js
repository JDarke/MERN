const express = require('express');
const app = express();
const database = require('./model');
const port = 5001;

database.mongoose
    .set('strictQuery', true)
    .connect(database.url, {
        useNewUrlParser: true,
    })
    .then(() => {
        console.log(`Connected to db: ${database.url}`);
    })
    .catch((e) => {
        console.log('Failed to connect to db:', e);
        process.exit();
    });

app.get('/', (req, res) => res.send('Succesful GET'));

app.listen(port, () => console.log(`Server running on port ${port}`));