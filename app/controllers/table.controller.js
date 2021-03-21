const Table = require("../models/table.model.js");

exports.create = (req, res) => {
  console.log(req.body);
  if (!req.body) {
    res.status(400).send({
      message: "content cant be empty",
    });
  }

  const table = new Table({
    id: req.body.id,
    date: req.body.date,
    name: req.body.name,
    cashing: req.body.cashing,
    num_of_cashing: req.body.num_of_cashing,
    profit: req.body.profit,
    is_app: req.body.is_app,
  });

  Table.create(table, (err, data) => {
    if (err)
      res.status(500).send({
        table,
        message: err.message || "some error occurd",
      });
    else res.send(data);
  });
};

exports.findAll = (req, res) => {
  Table.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurd",
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
  Table.findById(req.params.tableId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found table with id ${req.params.tableId} `,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving table with id" + req.params.tableId,
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
  Table.updateById(req.params.tableId, new table(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(400).send({
          message: `Not found table with id ${req.params.tableId}`,
        });
      } else {
        res.status(500).send({
          message: "Error updating table with id" + req.params.tableId,
        });
      }
    } else res.send(data);
  });
};
