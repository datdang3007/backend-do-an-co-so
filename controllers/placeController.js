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

exports.getPlaceWithNameLike = async (req, res) => {
  try {
    const { nameSearching } = req.body;
    const places = await Place.find();
    
    const filterPlaces = places.filter( val => val.name.includes(nameSearching) );

    if (!filterPlaces || filterPlaces.length == 0) {
      res.status(500).json({
        success: false,
        data: null,
      });
      return;
    }
    
    res.status(200).json({
      success: true,
      data: filterPlaces,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      data: null,
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

exports.getPlaceByImageID = async (req, res) => {
  try {
    const { ID } = req.body;
    const existingPlace = await Place.findOne({"imageID": ID});
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

exports.getAllPlaceByProvinceID = async (req, res) => {
  try {
    const { ID } = req.body;
    const existingPlace = await Place.find({"provinceID": ID});
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

exports.editPlace = async (req, res) => {
  const { placeID, name, provinceID, territoryID, regionID, image, overview, service, content, imageID, likeArray, commentID} = req.body;
  try {
    const place = await Place.findById(placeID);
    if (!place) {
      return res.status(404).json({ success: false, data: null });
    }
    place.name = name || place.name;
    place.provinceID = provinceID || place.provinceID;
    place.territoryID = territoryID || place.territoryID;
    place.regionID = regionID || place.regionID;
    place.image = image || place.image;
    place.overview = overview || place.overview;
    place.service = service || place.service;
    place.content = content || null;
    place.imageID = imageID || place.imageID;
    place.likeArray = likeArray || place.likeArray;
    place.commentID = commentID || place.commentID;
    
    await place.save();
    res.status(200).json({ success: true, data: place });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, data: null });
  }
};

exports.editArrayLikeByID = async (req, res) => {
  const { ID, data } = req.body;
  try {
    const place = await Place.findById(ID);
    if (!place) {
      return res.status(404).json({ success: false, data: null });
    }
    for (const [index, val] of Object.entries(place.likeArray)) {
      if (val.userID == data.userID) {
        place.likeArray.splice(index, 1);
      }
    }
    place.likeArray.push(data);
    await place.save();
    res.status(200).json({ success: true, data: place });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, data: null });
  }
};

exports.deletePlace = async (req, res) => {
  const { ID } = req.body;

  try {
    const place = await Place.findByIdAndRemove({ "_id": ID });
    if (!place) {
      return res.status(404).json({
        success: false,
        data: null,
      });
    }

    return res.status(200).json({
      success: true,
      data: place,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      data: null,
    });
  }
};

exports.addConnectPlace = async (req, res) => {
  const { ID } = req.body;
  try {
    const element = await Place.findById(ID);
    if (!element) {
      return res.status(404).json({ success: false, message: "element not found" });
    }
    element.connect = element.connect !== undefined ? element.connect + 1 : 0;
    await element.save();
    res.status(200).json({ success: true, data: element.connect });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, data: null });
  }
};