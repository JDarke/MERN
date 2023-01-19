module.exports = app => {
    const entries = require("../controller/entry.controller");
    const router = require("express").Router();
  
    router.post("/", entries.addEntry);
  
    router.get("/", entries.getAllEntries);
  
    app.use('/api/entries', router);
  };