const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// app.get("/*", (req, res) => {
//   res.sendFile(__dirname + "/index.html"),
//     function (err) {
//       if (err) res.status(500).send(err);
//     };
// });

app.get("/", (req, res) => {
  res.json({ message: "Welcome to Bibs application." });
});

require("./app/routes/player.routes.js")(app);
require("./app/routes/game.routes.js")(app);
require("./app/routes/table.routes.js")(app);

const PORT = process.env.PORT || 3900;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
