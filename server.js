const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Welcome to Bibs application." });
});

require("./app/routes/player.routes.js")(app);
require("./app/routes/game.routes.js")(app);
require("./app/routes/table.routes.js")(app);

app.listen(3900, () => {
  console.log("Server is running on port 3900.");
});
