const Place = require("../models/placeModel");

exports.newPlace = async (req, res) => {
  const { name, provinceID, territoryID, regionID, image, overview, service, content, imageID, likeArray, commentID} = req.body;
  const place = new Place({
    name,
    provinceID,
    territoryID,
    regionID,
    image,
    overview,
    service,
    content,
    imageID,
    likeArray,
    commentID,
  });
  place.save();
  res.status(200).json({
    success: true,
    data: req.body,
  });
};

exports.getPlace = async (req, res) => {
  try {
    const places = await Place.find();
    res.status(200).json({
      success: true,
      data: places,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

exports.getPlaceByID = async (req, res) => {
  try {
    const { ID } = req.body;
    const existingPlace = await Place.findOne({"_id": ID});
    res.status(200).json({
      success: true,
      data: existingPlace
    });
  } catch (error) {
    console.log(error);
    res.status(200).json({
      success: false,
      data: null
    });
  }
};

// exports.getAllPlaceByTerritoryID = async (req, res) => {
//   try {
//     const { ID } = req.body;
//     const existingPlace = await Place.find({"territoryID": ID});
//     res.status(200).json({
//       success: true,
//       data: existingPlace
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(200).json({
//       success: false,
//       data: null
//     });
//   }
// };

exports.getAllPlaceByRegionID = async (req, res) => {
  try {
    const { ID } = req.body;
    const existingPlace = await Place.find({"regionID": ID});
    res.status(200).json({
      success: true,
      data: existingPlace
    });
  } catch (error) {
    console.log(error);
    res.status(200).json({
      success: false,
      data: null
    });
  }
};