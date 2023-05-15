const router = require("express").Router();

const userController = require("../controllers/userController");

router.post("/register", userController.register);
router.get("/getUser", userController.getUser);
router.post("/checkExistsEmail", userController.checkExistsEmail);
router.post("/checkExistsPhone", userController.checkExistsPhone);
router.post("/getUserByID", userController.getUserByID);

module.exports = router;