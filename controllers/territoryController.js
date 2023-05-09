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

exports.editTerritory = async (req, res) => {
  const { territoryID, name, slogan, regionID, image, overview } = req.body;
  try {
    const territory = await Territory.findById(territoryID);
    if (!territory) {
      return res.status(404).json({ success: false, data: null });
    }
    territory.name = name || territory.name;
    territory.slogan = slogan || territory.slogan;
    territory.regionID = regionID || territory.regionID;
    territory.image = image || territory.image;
    territory.overview = overview || territory.overview;
    console.log(territory);
    await territory.save();
    res.status(200).json({ success: true, data: territory });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, data: null });
  }
};

exports.deleteTerritory = async (req, res) => {
  const { ID } = req.body;

  try {
    const territory = await Territory.findByIdAndRemove({ "_id": ID });
    if (!territory) {
      return res.status(404).json({
        success: false,
        data: null,
      });
    }

    return res.status(200).json({
      success: true,
      data: territory,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      data: null,
    });
  }
};

// exports.getAllTerritoryByRegionID = async (req, res) => {
//   try {
//     const { ID } = req.body;
//     const existingTerritory = await Territory.find({"regionID": ID});
//     res.status(200).json({
//       success: true,
//       data: existingTerritory
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(200).json({
//       success: false,
//       data: null
//     });
//   }
// };