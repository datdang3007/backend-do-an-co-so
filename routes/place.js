const router = require("express").Router();

const placeController = require("../controllers/placeController");

router.post("/newPlace", placeController.newPlace);
router.get("/getPlace", placeController.getPlace);
router.post("/getPlaceByID", placeController.getPlaceByID);
router.post("/getPlaceByImageID", placeController.getPlaceByImageID);
router.post("/getAllPlaceByRegionID", placeController.getAllPlaceByRegionID);
router.post("/getAllPlaceByProvinceID", placeController.getAllPlaceByProvinceID);
router.post("/editPlace", placeController.editPlace);
router.post("/deletePlace", placeController.deletePlace);
router.post("/getPlaceWithNameLike", placeController.getPlaceWithNameLike);

module.exports = router;