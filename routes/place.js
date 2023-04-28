const router = require("express").Router();

const placeController = require("../controllers/placeController");

router.post("/newPlace", placeController.newPlace);
router.get("/getPlace", placeController.getPlace);
router.post("/getPlaceByID", placeController.getPlaceByID);

module.exports = router;