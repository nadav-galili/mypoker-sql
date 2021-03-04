const Player = require("../models/player.model.js");

exports.findAll = (req, res) => {
  Player.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurd",
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
  Player.findById(req.params.playerId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found player with id ${req.params.playerId} `,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Player with id" + req.params.playerId,
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
  Player.updateById(req.params.playerId, new Player(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(400).send({
          message: `Not found Player with id ${req.params.playerId}`,
        });
      } else {
        res.status(500).send({
          message: "Error updating Player with id" + req.params.playerId,
        });
      }
    } else res.send(data);
  });
};
