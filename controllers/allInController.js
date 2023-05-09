const Region = require("../models/regionModel");
const Place = require("../models/placeModel");
const Province = require("../models/provinceModel");
const Territory = require("../models/territoryModel");

function getRandomNumberTypeInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

exports.getAllPlaceForTerritory = async (req, res) => {
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

exports.getAllPlaceForListTerritory = async (req, res) => {
  try {
    let result = []
    const { listID } = req.body;
    const territorys = await Territory.find();
    for (const [index, territory] of Object.entries(territorys)) {
      let inList = listID.filter(e => e == territory._id)
      if (inList.length == 1) {
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