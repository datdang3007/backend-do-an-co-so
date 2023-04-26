const router = require("express").Router();

const territoryController = require("../controllers/territoryController");

router.post("/newTerritory", territoryController.addTerritory);
router.get("/getTerritory", territoryController.getTerritory);
router.post("/getTerritoryByID", territoryController.getTerritoryByID);

module.exports = router;