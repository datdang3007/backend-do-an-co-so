const router = require("express").Router();

const regionController = require("../controllers/regionController");

router.post("/newRegion", regionController.newRegion);
router.get("/getRegion", regionController.getRegion);
router.post("/getRegionByID", regionController.getRegionByID);
router.post("/editRegion", regionController.editRegion);

module.exports = router;