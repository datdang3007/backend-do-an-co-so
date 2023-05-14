const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ImageSchema = new Schema(
  {
    imageID: {
      type: String,
      require: true,
    },
    imageURL: {
      type: Array,
      require: true,
    },
  },
  {
    timestamps: true,
    collection: "images",
  }
);

module.exports = mongoose.model("image", ImageSchema);

