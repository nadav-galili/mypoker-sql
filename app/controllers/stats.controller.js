const Stats = require("../models/stats.model.js");

exports.create = (req, res) => {
  console.log(req.body);
  if (!req.body) {
    res.status(400).send({
      message: "content cant be empty",
    });
  }

  const stats = new Stats({
    id: req.body.id,
    name: req.body.name,
    cashing: req.body.cashing,
    num_of_cashing: req.body.num_of_cashing,
    avg_num_of_cashing: req.body.avg_num_of_cashing,
    profit: req.body.profit,
    succes_percentage: req.body.success_percentage,
  });

  Stats.create(stats, (err, data) => {
    if (err)
      res.status(500).send({
        game,
        message: err.message || "some error occurd",
      });
    else res.send(data);
  });
};

exports.findAll = (req, res) => {
  Stats.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurd",
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
  Stats.findById(req.params.gameId, (err, data) => {
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
  Stats.updateById(req.params.gameId, new Stats(req.body), (err, data) => {
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
