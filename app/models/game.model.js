const sql = require("./db.js");

const Game = function (game) {
  this.player_id = game.id;
  this.cashing = game.cashing;
  this.num_of_cashing = game.num_of_cashing;
  this.profit = game.profit;
  this.is_app = game.is_app;
};

Game.create = (newGame, result) => {
  console.log(newGame, result);
  sql.query("INSERT INTO games SET ?", newGame, (err, res) => {
    if (err) {
      console.log("error:", err);
      result(err, null);
      return;
    }

    console.log("created game:", { id: res.insertId, ...newGame });
    console.log(JSON.stringify(res));
    result(null, { id: res.insertId, ...newGame });
  });
};

Game.findById = (gameId, result) => {
  sql.query(`SELECT * FROM games WHERE id = ${gameId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found game: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Player with the id
    result({ kind: "not_found" }, null);
  });
};

Game.getAll = (result) => {
  sql.query("SELECT * FROM games", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("games: ", res);
    result(null, res);
  });
};

module.exports = Game;
