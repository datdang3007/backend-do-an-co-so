const Region = require("../models/regionModel");
const Territory = require("../models/territoryModel");
const Province = require("../models/provinceModel");
const Place = require("../models/placeModel");
const Image = require("../models/imageModel");

function getRandomNumberTypeInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function searchName(name) {
  try {
    const regionResults = await Region.find({ name: { $regex: name, $options: "i" } });
    const territoryResults = await Territory.find({ name: { $regex: name, $options: "i" } });
    const provinceResults = await Province.find({ name: { $regex: name, $options: "i" } });
    const placeResults = await Place.find({ name: { $regex: name, $options: "i" } });

    const results = {
      regions: regionResults,
      territories: territoryResults,
      provinces: provinceResults,
      places: placeResults
    };

    return results;
  } catch (error) {
    throw new Error("Lỗi khi tìm kiếm dữ liệu: " + error.message);
  }
}

exports.getAllCollectionHaveNameLike = async (req, res) => {
  const { searchValue } = req.body;
  try {
    searchName(searchValue)
    .then((results) => {
      res.status(200).json({
        success: true,
        data: results
      });
    })
    .catch((error) => {
      console.error("Lỗi khi tìm kiếm:", error);
    });
  } catch (error) {
    console.log(error);
    res.status(200).json({
      success: false,
      data: null
    });
  };
};

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

exports.getAllImageInProvince = async (req, res) => {
  try {
    const result = []
    const { ID } = req.body;
    const places = await Place.find({"provinceID": ID});

    if (places.length == 0) return res.status(404).json({ success: false, data: null });

    for (const [index, place] of Object.entries(places)) {
      const place_name = place.name;
      const image_id = place.imageID;
      const image_stock = await Image.find({"imageID": image_id});
      const data = {
        name: place_name,
        imageStock: image_stock
      }
      result.push(data);
    };

    if (result.length == 0) return res.status(404).json({ success: false, data: null });

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

exports.getStatiscal = async (req, res) => {
  try {
    const regions = await Region.find();
    const territorys = await Territory.find();
    const provinces = await Province.find();
    const places = await Place.find();

    const regionConnectCount = regions.reduce((total, val) => total + (val.connect || 0), 0);
    const territoryConnectCount = territorys.reduce((total, val) => total + (val.connect || 0), 0);
    const provinceConnectCount = provinces.reduce((total, val) => total + (val.connect || 0), 0);
    const placeConnectCount = places.reduce((total, val) => total + (val.connect || 0), 0);

    const connectCount = regionConnectCount + territoryConnectCount + provinceConnectCount + placeConnectCount
    const likeCount = places.reduce((total, val) => total + (val.likeArray.length || 0), 0) || 0;
    const ScoreCount = places.reduce((total, val) => {
      if (Array.isArray(val.likeArray)) {
        const scores = val.likeArray.map(item => item.score || 0);
        return total + scores.reduce((sum, score) => sum + score, 0);
      }
      return total;
    }, 0);

    const ScorePercent = (ScoreCount / likeCount).toFixed(1);
    
    const result = {
      connectCount,
      likeCount,
      ScorePercent
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
}