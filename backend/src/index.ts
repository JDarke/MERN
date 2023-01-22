import { CORSOPTIONS, PORT } from "./config/server";
const express = require('express');
const app = express();
const entriesDb = require('./model');
const cors = require("cors");

app.use(cors(CORSOPTIONS));
app.use(express.json());

entriesDb.mongoose
    .set('strictQuery', true)
    .connect(entriesDb.url, {
        useNewUrlParser: true,
    })
    .then(() => {
        console.log(`Connected to db: ${entriesDb.url}`);
    })
    .catch((e: Error) => {
        console.log('Failed to connect to db:', e);
        process.exit();
    });

require("./routes/entry.routes")(app);
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));