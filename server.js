const express = require("express");
const cors = require("cors")
require("dotenv").config();
require("./connectMongoo");
const app = express();

const user = require("./routes/user");
const region = require("./routes/region");
const territory = require("./routes/territory");
const province = require("./routes/province");

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});
app.use(express.json());
app.use(cors());

app.use("/api", user);
app.use("/api", region);
app.use("/api", territory);
app.use("/api", province);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`we're on port ${PORT}`);
});