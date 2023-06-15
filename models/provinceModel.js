const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ProvinceSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
      unique: true,
    },
    territoryID: {
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
    collection: "provinces",
  }
);

module.exports = mongoose.model("province", ProvinceSchema);

