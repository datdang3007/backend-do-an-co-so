const router = require("express").Router();

const commentController = require("../controllers/commentController");

router.post("/addNewComment", commentController.addNewComment);
router.post("/getAllCommentByTargetID", commentController.getAllCommentByTargetID);
router.post("/handleLikeByID", commentController.handleLikeByID);

module.exports = router;