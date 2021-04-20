const sql = require("./db.js");

const Stats = function () {
  this.name = stats.name;
  this.avgCashing = stats.avgCashing;
  this.gameNum = stats.gameNum;
  this.successPercent = stats.successPercent;
};
Stats.findById = (playerId, result) => {
  sql.query(`SELECT * FROM games WHERE id = ${playerId}`, (err, res) => {
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

Stats.getAll = (result) => {
  sql.query(
    `SELECT p.name,SUM( g.profit) as profit ,
   ROUND(SUM(g.profit)/COUNT(p.id ),2) as avg_profit FROM players p right JOIN
    games g on p.id=g.player_id where g.is_app<>9 
    GROUP by p.id order by avg_profit
     DESC LIMIT 3;
     SELECT p.name,SUM( g.profit) as profit ,
   COUNT(p.id) as games FROM players p right JOIN
    games g on p.id=g.player_id where g.is_app<>9 
    GROUP by p.id order by   games DESC
     LIMIT 3;
     SELECT p.name, SUM(if(g.profit>0, 1, 0)) AS is_plus,
      ROUND( SUM(if(g.profit>0, 1, 0))*100/COUNT(p.id),2)
       As success_percentage 
       FROM players p right JOIN games g 
       on p.id=g.player_id where g.is_app<>9
        GROUP by p.id order by success_percentage DESC
        LIMIT 3;
        SELECT p.name,
     ROUND(AVG(g.num_of_cashing),2) AS avg_num_of_pritot 
     FROM players p  right JOIN games g on p.id=g.player_id
     where g.is_app<>9
     GROUP by p.id
     order by avg_num_of_pritot
     LIMIT 3;
     SELECT SUM(cashing) as sum FROM games;
     SELECT p.name,g.profit FROM players p right JOIN
      games g on p.id=g.player_id where g.is_app<>9
       order by profit DESC LIMIT 10
     `,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      console.log("stats: ", res);
      result(null, res);
    }
  );
};

module.exports = Stats;
