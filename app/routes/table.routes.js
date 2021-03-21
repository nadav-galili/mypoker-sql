module.exports = (app) => {
  const table = require("../controllers/table.controller.js");

  // app.post("/table", table.create);
  app.get("/table", table.findAll);

  app.get("/table/:playerId", table.findOne);

  app.put("/table/:playerId", table.update);
};
