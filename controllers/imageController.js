const Image = require("../models/imageModel");

exports.uploadImage = async (req, res) => {
  const { imageID, imageURL } = req.body;
  const image = new Image({
    imageID,
    imageURL,
  });
  image.save();
  res.status(200).json({
    success: true,
    data: image,
  });
};

exports.getAllImageStock = async (req, res) => {
  try {
    const images = await Image.find();
    res.status(200).json({
      success: true,
      data: images,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      data: null,
    });
  }
};

exports.getImageStockByID = async (req, res) => {
  try {
    const { ID } = req.body;
    const existingImage = await Image.find({"imageID": ID});

    if (existingImage.length == 0) {
      res.status(200).json({
        success: false,
        data: null
      });
      return;
    }
    res.status(200).json({
      success: true,
      data: existingImage
    });
  } catch (error) {
    console.log(error);
    res.status(200).json({
      success: false,
      data: null
    });
  }
};

exports.deleteImage = async (req, res) => {
  const { ID } = req.body;

  try {
    const image = await Image.findByIdAndRemove({ "_id": ID });
    if (!image) {
      return res.status(404).json({
        success: false,
        data: null,
      });
    }

    return res.status(200).json({
      success: true,
      data: image,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      data: null,
    });
  }
};