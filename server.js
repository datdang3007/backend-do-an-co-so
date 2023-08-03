const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./connectMongoo");
const app = express();

const user = require("./routes/user");
const region = require("./routes/region");
const territory = require("./routes/territory");
const province = require("./routes/province");
const place = require("./routes/place");
const allIn = require("./routes/allIn");
const image = require("./routes/image");
const comment = require("./routes/comment");

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
app.use(cors());

app.use("/api", user);
app.use("/api", region);
app.use("/api", territory);
app.use("/api", province);
app.use("/api", place);
app.use("/api", allIn);
app.use("/api", image);
app.use("/api", comment);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`we're on port ${PORT}`));
