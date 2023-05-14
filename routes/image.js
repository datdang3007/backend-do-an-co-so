const router = require("express").Router();

const imageController = require("../controllers/imageController");

router.post("/uploadImage", imageController.uploadImage);
router.get("/getAllImageStock", imageController.getAllImageStock);
router.post("/getImageStockByID", imageController.getImageStockByID);
router.post("/deleteImage", imageController.deleteImage);

module.exports = router;