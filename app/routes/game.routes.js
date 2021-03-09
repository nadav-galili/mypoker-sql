module.exports = (app) => {
  const games = require("../controllers/game.controller.js");

  app.get("/games", games.findAll);

  app.get("/games/:gameId", games.findOne);

  app.put("/games/:gameId", games.update);
};
