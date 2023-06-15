const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const RegionSchema = new Schema(
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
    collection: "regions",
  }
);

module.exports = mongoose.model("region", RegionSchema);

