const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PostSchema = new Schema(
  {
    content: {
      type: String,
      require: true,
      unique: true,
    },
    status: {
      type: Number,
      require: true,
    },
    imgArray: {
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
    collection: "posts",
  }
);

module.exports = mongoose.model("post", PostSchema);

