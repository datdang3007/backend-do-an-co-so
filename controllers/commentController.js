const Comment = require("../models/commentModel");

exports.addNewComment = async (req, res) => {
  const { userID, comment, targetID } = req.body;
  const newComment = new Comment({
    userID,
    comment,
    targetID,
    likeArray: [],
  });
  newComment.save();
  res.status(200).json({
    success: true,
    data: newComment,
  });
};

exports.handleLikeByID = async (req, res) => {
  const { ID, userID } = req.body;
  try {
    const comment = await Comment.findOne({"_id": ID});
    if (!comment) {
      return res.status(404).json({ success: false, data: null });
    }

    const indexExists = comment.likeArray.findIndex(val => val === userID);
    if (indexExists === -1) {
      comment.likeArray.push(userID);
    } else {
      comment.likeArray.splice(indexExists, 1);
    }
    
    console.log(comment);
    await comment.save();
    res.status(200).json({ success: true, data: comment });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, data: null });
  }
};

exports.getAllCommentByTargetID = async (req, res) => {
  try {
    const { ID } = req.body;
    const commentList = await Comment.find({"targetID": ID});
    res.status(200).json({
      success: true,
      data: commentList
    });
  } catch (error) {
    console.log(error);
    res.status(200).json({
      success: false,
      data: null
    });
  }
};