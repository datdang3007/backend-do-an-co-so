const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TerritorySchema = new Schema(
  {
    name: {
      type: String,
      require: true,
      unique: true,
    },
    slogan: {
      type: String,
      require: true,
    },
    regionID: {
      type: String,
      require: true,
    },
    image: {
      type: String,
      require: true,
    },
    overview: {
      type: String,
      require: true,
    },
    connect: {
      type: Number,
    },
  },
  {
    timestamps: true,
    collection: "territories",
  }
);

module.exports = mongoose.model("territory", TerritorySchema);

