const sql = require("./db.js");

const Player = function () {
  this.name = player.name;
  this.cash = player.cash;
  this.img = player.image;
};

Player.findById = (playerId, result) => {
  sql.query(`SELECT * FROM players WHERE id = ${playerId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found player: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Player with the id
    result({ kind: "not_found" }, null);
  });
};

Player.getAll = (result) => {
  sql.query("SELECT * FROM players", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("players: ", res);
    result(null, res);
  });
};

module.exports = Player;
