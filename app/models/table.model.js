const sql = require("./db.js");

const Table = function (table) {
  this.rank = table.rank;
  this.name = table.name;
  this.date = table.date;
  this.profit = table.profit;
  this.avgProfit = table.avg_profit;
  this.numOfGames = table.num_of_games;
  this.isPlus = table.is_plus;
  this.successPercentage = table.success_percentage;
  this.avgNumOfPritot = table.avg_num_of_pritot;
  this.lastGame = table.last_game;
};

Table.create = (newTable, result) => {
  console.log(newTable, result);
  sql.query("INSERT INTO games SET ?", newTable, (err, res) => {
    if (err) {
      console.log("error:", err);
      result(err, null);
      return;
    }

    console.log("created game:", { id: res.insertId, ...newTable });
    console.log(JSON.stringify(res));
    result(null, { id: res.insertId, ...newTable });
  });
};

Table.findById = (gameId, result) => {
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

Table.getAll = (result) => {
  sql.query(
    ` SELECT g.date,p.name,g.cashing,g.profit FROM games g LEFT JOIN players p on g.player_id=p.id ORDER BY g.date DESC LIMIT 20
     ;SELECT p.name,SUM( g.profit) as profit ,
     COUNT(p.id) AS num_of_games , 
     SUM(if(g.profit>0, 1, 0)) AS is_plus,
     ROUND(SUM(g.profit)/COUNT(p.id	),2) as avg_profit,
     ROUND( SUM(if(g.profit>0, 1, 0))*100/COUNT(p.id),2) As success_percentage ,
     ROUND(AVG(g.num_of_cashing),2) AS avg_num_of_pritot ,
     MAX(g.date) as last_game 
     FROM players p  right JOIN games g on p.id=g.player_id
     where g.is_app<>9
     GROUP by p.id
     order by profit DESC 
    `,
    (err, res) => {
      if (err) {
        console.log("error: ", err);

        result(null, err);
        return;
      }

      console.log("tables: ", res);

      result(null, res);
    }
  );
};

module.exports = Table;
