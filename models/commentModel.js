const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const commentModel = new Schema(
  {
    userID: {
      type: String,
      require: true,
    },
    content: {
      type: String,
      require: true,
    },
    time: {
      type: Date,
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

