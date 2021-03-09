const Game = require("../models/game.model.js");

exports.findAll = (req, res) => {
  Game.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurd",
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
  Game.findById(req.params.gameId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found game with id ${req.params.gameId} `,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving game with id" + req.params.gameId,
        });
      }
    } else res.send(data);
  });
};

exports.update = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }
  Game.updateById(req.params.gameId, new Game(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(400).send({
          message: `Not found Game with id ${req.params.gameId}`,
        });
      } else {
        res.status(500).send({
          message: "Error updating Game with id" + req.params.gameId,
        });
      }
    } else res.send(data);
  });
};
