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

exports.getProvinceWithNameLike = async (req, res) => {
  try {
    const { nameSearching } = req.body;
    const provinces = await Province.find();
    
    const filterProvinces = provinces.filter( val => val.name.includes(nameSearching) );

    if (!filterProvinces || filterProvinces.length == 0) {
      res.status(500).json({
        success: false,
        data: null,
      });
      return;
    }
    
    res.status(200).json({
      success: true,
      data: filterProvinces,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      data: null,
    });
  }
};

exports.getProvinceWithNameLikeInRegionID = async (req, res) => {
  try {
    const { nameSearching, ID } = req.body;
    const provinces = await Province.find({"regionID": ID});
    
    const filterProvinces = provinces.filter( val => val.name.includes(nameSearching) );

    if (!filterProvinces || filterProvinces.length == 0) {
      res.status(500).json({
        success: false,
        data: null,
      });
      return;
    }
    
    res.status(200).json({
      success: true,
      data: filterProvinces,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      data: null,
    });
  }
};

exports.getProvinceWithNameLikeTerritoryID = async (req, res) => {
  try {
    const { nameSearching, ID } = req.body;
    const provinces = await Province.find({"territoryID": ID});
    
    const filterProvinces = provinces.filter( val => val.name.includes(nameSearching) );

    if (!filterProvinces || filterProvinces.length == 0) {
      res.status(500).json({
        success: false,
        data: null,
      });
      return;
    }
    
    res.status(200).json({
      success: true,
      data: filterProvinces,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      data: null,
    });
  }
};

exports.getProvinceByRegionID = async (req, res) => {
  try {
    const { ID } = req.body;
    const listProvince = await Province.find({"regionID": ID});
    res.status(200).json({
      success: true,
      data: listProvince
    });
  } catch (error) {
    console.log(error);
    res.status(200).json({
      success: false,
      data: null
    });
  }
};

exports.getProvinceByTerritoryID = async (req, res) => {
  try {
    const { ID } = req.body;
    const listProvince = await Province.find({"territoryID": ID});
    res.status(200).json({
      success: true,
      data: listProvince
    });
  } catch (error) {
    console.log(error);
    res.status(200).json({
      success: false,
      data: null
    });
  }
};

exports.editProvince = async (req, res) => {
  const { provinceID, name, territoryID, regionID, image, overview } = req.body;
  try {
    const province = await Province.findById(provinceID);
    if (!province) {
      return res.status(404).json({ success: false, data: null });
    }
    province.name = name || province.name;
    province.territoryID = territoryID || province.territoryID;
    province.regionID = regionID || province.regionID;
    province.image = image || province.image;
    province.overview = overview || province.overview;
    await province.save();
    res.status(200).json({ success: true, data: province });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, data: null });
  }
};

exports.deleteProvince = async (req, res) => {
  const { ID } = req.body;

  try {
    const province = await Province.findByIdAndRemove({ "_id": ID });
    if (!province) {
      return res.status(404).json({
        success: false,
        data: null,
      });
    }

    return res.status(200).json({
      success: true,
      data: province,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      data: null,
    });
  }
};

exports.addConnectProvince = async (req, res) => {
  const { ID } = req.body;
  try {
    const element = await Province.findById(ID);
    if (!element) {
      return res.status(404).json({ success: false, message: "element not found" });
    }
    element.connect = element.connect !== undefined ? element.connect + 1 : 0;
    console.log(element.connect);
    await element.save();
    res.status(200).json({ success: true, data: element.connect });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, data: null });
  }
};