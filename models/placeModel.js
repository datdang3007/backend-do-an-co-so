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
    service: {
      type: Boolean,
      require: true,
    },
    content: {
      type: Array,
      require: true,
    },
    imageID: {
      type: String,
      require: true,
      unique: true,
    },
    likeArray: {
      type: Array,
      require: true,
    },
    commentID: {
      type: String,
      require: true,
      unique: true,
    }
  },
  {
    timestamps: true,
    collection: "places",
  }
);

module.exports = mongoose.model("place", placeModel);