const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const commentModel = new Schema(
  {
    userID: {
      type: String,
      require: true,
    },
    targetID: {
      type: String,
      require: true,
    },
    comment: {
      type: String,
      require: true,
    },
    likeArray: {
      type: Array,
    },
  },
  {
    timestamps: true,
    collection: "comments",
  }
);

module.exports = mongoose.model("comment", commentModel);

