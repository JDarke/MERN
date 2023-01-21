const express = require('express');
const app = express();
const entriesDb = require('./model');
const port = 5001;
const cors = require("cors");
const corsOptions = {
    origin: "http://localhost:3000"
};

app.use(cors(corsOptions));
app.use(express.json());

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

require("./routes/entry.routes")(app);
app.listen(port, () => console.log(`Server running on port ${port}`));