const router = require("express").Router();

const provinceController = require("../controllers/provinceController");

router.post("/addProvince", provinceController.addProvince);
router.get("/getProvince", provinceController.getProvince);
router.post("/getProvinceByID", provinceController.getProvinceByID);
router.post("/editProvince", provinceController.editProvince);
router.post("/deleteProvince", provinceController.deleteProvince);
router.post("/getProvinceByRegionID", provinceController.getProvinceByRegionID);
router.post("/getProvinceByTerritoryID", provinceController.getProvinceByTerritoryID);
router.post("/getProvinceWithNameLike", provinceController.getProvinceWithNameLike);
router.post("/getProvinceWithNameLikeInRegionID", provinceController.getProvinceWithNameLikeInRegionID);
router.post("/getProvinceWithNameLikeTerritoryID", provinceController.getProvinceWithNameLikeTerritoryID);

module.exports = router;