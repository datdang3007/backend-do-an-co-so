const router = require("express").Router();

const allInController = require("../controllers/allInController");

router.get("/getAllPlaceForTerritory", allInController.getAllPlaceForTerritory);
router.post("/getAllPlaceForListTerritory", allInController.getAllPlaceForListTerritory);
router.post("/getAllImageInProvince", allInController.getAllImageInProvince);
router.get("/getStatiscal", allInController.getStatiscal);
router.get("/getStatiscal", allInController.getStatiscal);
router.post("/getAllCollectionHaveNameLike", allInController.getAllCollectionHaveNameLike);

module.exports = router;