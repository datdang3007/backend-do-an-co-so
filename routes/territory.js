const router = require("express").Router();

const territoryController = require("../controllers/territoryController");

router.post("/newTerritory", territoryController.addTerritory);
router.get("/getTerritory", territoryController.getTerritory);
router.post("/getTerritoryByID", territoryController.getTerritoryByID);
router.post("/editTerritory", territoryController.editTerritory);
// router.post("/getAllTerritoryByRegionID", territoryController.getAllTerritoryByRegionID);

module.exports = router;