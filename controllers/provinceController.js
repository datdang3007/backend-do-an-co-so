const Province = require("../models/provinceModel");

exports.addProvince = async (req, res) => {
  const { name, territoryID, regionID, image, overview } = req.body;
  const province = new Province({
    name,
    territoryID,
    regionID,
    image,
    overview,
  });
  province.save();
  res.status(200).json({
    success: true,
    data: req.body,
  });
};

exports.getProvince = async (req, res) => {
  try {
    const provinces = await Province.find();
    res.status(200).json({
      success: true,
      data: provinces,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

exports.getProvinceByID = async (req, res) => {
  try {
    const { ID } = req.body;
    const existingProvince = await Province.findOne({"_id": ID});
    res.status(200).json({
      success: true,
      data: existingProvince
    });
  } catch (error) {
    console.log(error);
    res.status(200).json({
      success: false,
      data: null
    });
  }
};