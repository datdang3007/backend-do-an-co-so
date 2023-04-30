const Territory = require("../models/territoryModel");

exports.addTerritory = async (req, res) => {
  try {
    const { name, slogan, regionID, image, overview } = req.body;
    const territory = new Territory({
      name,
      slogan,
      regionID,
      image,
      overview,
    });
    territory.save();
    res.status(200).json({
      success: true,
      data: req.body,
    });
  } catch (error) {
    console.log(error);
    res.status(200).json({
      success: false,
      message: "Server Error",
    });
  };
};

exports.getTerritory = async (req, res) => {
  try {
    const territorys = await Territory.find();
    res.status(200).json({
      success: true,
      data: territorys,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

exports.getTerritoryByID = async (req, res) => {
  try {
    const { ID } = req.body;
    const existingTerritory = await Territory.findOne({"_id": ID});
    res.status(200).json({
      success: true,
      data: existingTerritory
    });
  } catch (error) {
    console.log(error);
    res.status(200).json({
      success: false,
      data: null
    });
  }
};

