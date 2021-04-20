module.exports = (app) => {
  // const games = require("../controllers/game.controller.js");

  const stats = require("../controllers/stats.controller.js");

  // app.post("/games", games.create);
  app.get("/stats", stats.findAll);

  // app.get("/games/:gameId", games.findOne);

  // app.put("/games/:gameId", games.update);
};
