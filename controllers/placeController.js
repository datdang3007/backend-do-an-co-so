const Place = require("../models/placeModel");
const Province = require("../models/provinceModel");
const Territory = require("../models/territoryModel");

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

exports.getAllPlaceByTerritoryID = async (req, res) => {
  try {
    const { ID } = req.body;
    const existingPlace = await Place.find({"territoryID": ID});
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

function getRandomNumberTypeInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

exports.getPlaceForHomePage = async (req, res) => {
  try {
    let result = []
    const territorys = await Territory.find();
    for (const [index, territory] of Object.entries(territorys)) {
      const dataPlaceOfTerritory = await Place.find({"territoryID": territory._id});
      const randomPlaceOfList = dataPlaceOfTerritory[getRandomNumberTypeInt(0, dataPlaceOfTerritory.length-1)]
      if (randomPlaceOfList) {
        const territoryName = territory.name;
        const dataProvinceOfPlace = await Province.findOne({"_id": randomPlaceOfList.provinceID});
        let dataResult = {
          name: randomPlaceOfList.name,
          provinceID: randomPlaceOfList.provinceID,
          territoryID: randomPlaceOfList.territoryID,
          regionID: randomPlaceOfList.regionID,
          image: randomPlaceOfList.image,
          overview: randomPlaceOfList.overview,
          service: randomPlaceOfList.service,
          content: randomPlaceOfList.content,
          imageID: randomPlaceOfList.imageID,
          likeArray: randomPlaceOfList.likeArray,
          commentID: randomPlaceOfList.commentID,
          provinceName: dataProvinceOfPlace.name,
          territoryName: territoryName,
        }
        result.push(dataResult);
      }
    }

    res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    console.log(error);
    res.status(200).json({
      success: false,
      data: null
    });
  }
};