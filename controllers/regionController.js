const Region = require("../models/regionModel");

exports.newRegion = async (req, res) => {
  const { name, slogan, image, overview } = req.body;
  const region = new Region({
    name,
    slogan,
    image,
    overview,
  });
  region.save();
  res.status(200).json({
    success: true,
    data: req.body,
  });
};

exports.getRegion = async (req, res) => {
  try {
    const regions = await Region.find();
    res.status(200).json({
      success: true,
      data: regions,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

exports.getRegionByID = async (req, res) => {
  try {
    const { ID } = req.body;
    const existingRegion = await Region.findOne({"_id": ID});
    res.status(200).json({
      success: true,
      data: existingRegion
    });
  } catch (error) {
    console.log(error);
    res.status(200).json({
      success: false,
      data: null
    });
  }
};