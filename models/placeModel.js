const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const placeModel = new Schema(
  {
    name: {
      type: String,
      require: true,
      unique: true,
    },
    provinceID: {
      type: String,
      require: true,
      unique: true,
    },
    territoryID: {
      type: String,
      require: true,
      unique: true,
    },
    regionID: {
      type: String,
      require: true,
      unique: true,
    },
    image: {
      type: String,
      require: true,
    },
    overview: {
      type: String,
      require: true,
    },
    service: {
      type: Array,
    },
    imgStock: {
      type: Array,
    },
    likeArray: {
      type: Array,
    },
    commentID: {
      type: String,
      unique: true,
    }
  },
  {
    timestamps: true,
    collection: "places",
  }
);

module.exports = mongoose.model("place", placeModel);

