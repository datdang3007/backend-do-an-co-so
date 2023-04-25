const Place = require("../models/placeModel");

exports.addNew = async (req, res) => {
  const { name, provinceID, territoryID, regionID, image, overview, service, imgStock, likeArray, commentID } = req.body;
  const place = new Place({
    name,
    provinceID,
    territoryID,
    regionID,
    image,
    overview,
    service,
    imgStock,
    likeArray,
    commentID,
  });
  place.save();
  res.status(200).json({
    success: true,
    data: req.body,
  });
};