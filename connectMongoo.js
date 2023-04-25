const mongoose = require("mongoose");

const connectUrl = process.env.DB_URL;

mongoose
  .connect(connectUrl)
  .then(() => {
    console.log("connect success!");
  })
  .catch(() => {
    console.log("connect fail!");
  });
