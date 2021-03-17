module.exports = (app) => {
  const games = require("../controllers/game.controller.js");

  app.post("/games", games.create);
  app.get("/games/lastgame", games.findAll);

  app.get("/games/:gameId", games.findOne);

  app.put("/games/:gameId", games.update);
};
