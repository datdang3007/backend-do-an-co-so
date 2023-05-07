const router = require("express").Router();

const provinceController = require("../controllers/provinceController");

router.post("/addProvince", provinceController.addProvince);
router.get("/getProvince", provinceController.getProvince);
router.post("/getProvinceByID", provinceController.getProvinceByID);
router.post("/editProvince", provinceController.editProvince);
router.post("/getProvinceByRegionID", provinceController.getProvinceByRegionID);

module.exports = router;