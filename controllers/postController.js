const Post = require("../models/postModel");

exports.addNew = async (req, res) => {
  const { content, status, imgArray, likeArray, commentID } = req.body;
  const post = new Post({
    content,
    status,
    imgArray,
    likeArray,
    commentID,
  });
  post.save();
  res.status(200).json({
    success: true,
    data: req.body,
  });
};