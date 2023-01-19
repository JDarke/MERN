const express = require('express');
const app = express();
const entriesDb = require('./model');
const port = 5001;

entriesDb.mongoose
    .set('strictQuery', true)
    .connect(entriesDb.url, {
        useNewUrlParser: true,
    })
    .then(() => {
        console.log(`Connected to db: ${entriesDb.url}`);
    })
    .catch((e: any) => {
        console.log('Failed to connect to db:', e);
        process.exit();
    });

app.get('/', (req: any, res: any) => res.send('Successful GET'));

require("./routes/entry.routes")(app);
app.listen(port, () => console.log(`Server running on port ${port}`));