const router = require("express").Router();

const allInController = require("../controllers/allInController");

router.get("/getAllPlaceForTerritory", allInController.getAllPlaceForTerritory);
router.post("/getAllPlaceForListTerritory", allInController.getAllPlaceForListTerritory);
router.post("/getAllImageInProvince", allInController.getAllImageInProvince);

module.exports = router;