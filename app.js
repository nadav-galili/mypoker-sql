const express = require("express");
const cors = require("cors");

// let corsOptions = {
//   origin: "https://poker-at-vasili.com",
// };
const app = express();
app.use(cors());
// app.use(cors(corsOptions));
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Welcome to Bibs application." });
});

require("./app/routes/player.routes.js")(app);
require("./app/routes/game.routes.js")(app);
require("./app/routes/table.routes.js")(app);
require("./app/routes/stats.routes.js")(app);

const PORT = process.env.PORT || 3900;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
