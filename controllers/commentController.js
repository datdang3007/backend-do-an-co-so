const Comment = require("../models/commentModel");

exports.addNew = async (req, res) => {
  const { userID, content, time, likeArray } = req.body;
  const comment = new Comment({
    userID,
    content,
    time,
    likeArray,
  });
  comment.save();
  res.status(200).json({
    success: true,
    data: req.body,
  });
};