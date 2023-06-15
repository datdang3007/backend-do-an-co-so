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

exports.editRegion = async (req, res) => {
  const { regionID, name, slogan, image, overview } = req.body;
  try {
    const region = await Region.findById(regionID);
    if (!region) {
      return res.status(404).json({ success: false, message: "Region not found" });
    }
    region.name = name || region.name;
    region.slogan = slogan || region.slogan;
    region.image = image || region.image;
    region.overview = overview || region.overview;
    console.log(region);
    await region.save();
    res.status(200).json({ success: true, data: region });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, data: null });
  }
};

exports.deleteRegion = async (req, res) => {
  const { ID } = req.body;

  try {
    const region = await Region.findByIdAndRemove({ "_id": ID });
    if (!region) {
      return res.status(404).json({
        success: false,
        data: null,
      });
    }

    return res.status(200).json({
      success: true,
      data: region,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      data: null,
    });
  }
};

exports.addConnectRegion = async (req, res) => {
  const { ID } = req.body;
  try {
    const element = await Region.findById(ID);
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