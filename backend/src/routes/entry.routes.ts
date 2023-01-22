// api routes for CRUD
module.exports = (app: any): void => {
  const entries = require("../controller/entry.controller");
  const router = require("express").Router();
  
  router.post("/", entries.addEntry);
  
  router.get("/", entries.getAllEntries);

  router.delete("/:id", entries.deleteEntry);

	router.put("/:id", entries.updateEntry)
  
  app.use('/api/entries', router);
};