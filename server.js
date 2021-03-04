const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "Welcome to Bibs application." });
});

require("./app/routes/player.routes.js")(app);
app.listen(3900, () => {
  console.log("Server is running on port 3900.");
});
