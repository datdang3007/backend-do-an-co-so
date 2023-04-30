const router = require("express").Router();

const placeController = require("../controllers/placeController");

router.post("/newPlace", placeController.newPlace);
router.get("/getPlace", placeController.getPlace);
router.post("/getPlaceByID", placeController.getPlaceByID);
router.post("/getAllPlaceByTerritoryID", placeController.getAllPlaceByTerritoryID);
router.get("/getPlaceForHomePage", placeController.getPlaceForHomePage);

module.exports = router;