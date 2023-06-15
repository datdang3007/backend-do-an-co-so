const User = require("../models/userModel");

exports.register = async (req, res) => {
  const { fist_name, last_name, phone, email, password, admin } = req.body;
  const user = new User({
    fist_name,
    last_name,
    phone,
    email,
    password,
    admin,
  });
  user.save();
  res.status(200).json({
    success: true,
    data: req.body,
  });
};

exports.checkExistsName = async (req, res) => {
  const { first_name, last_name } = req.body;
  const existingUser = await User.findOne({"first_name": first_name, "last_name": last_name});
  if (existingUser) {
    res.status(200).json({
      success: true,
      data: existingUser
    });
  } else {
    res.status(200).json({
      success: false,
      data: null
    });
  }
};

exports.checkExistsEmail = async (req, res) => {
  const { email } = req.body;
  const existingUser = await User.findOne({"email": email});
  if (existingUser) {
    res.status(200).json({
      success: true,
      data: existingUser
    });
  } else {
    res.status(200).json({
      success: false,
      data: null
    });
  }
};

exports.checkExistsPhone = async (req, res) => {
  const { phone } = req.body;
  const existingUser = await User.findOne({"phone": phone});
  if (existingUser) {
    res.status(200).json({
      success: true,
      data: existingUser
    });
  } else {
    res.status(200).json({
      success: false,
      data: existingUser
    });
  }
};

exports.getUser = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

exports.getUserByID = async (req, res) => {
  try {
    const { ID } = req.body;
    const user = await User.findOne({"_id": ID});
    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    console.log(error);
    res.status(200).json({
      success: false,
      data: null
    });
  }
};

exports.deleteUser = async (req, res) => {
  const { ID } = req.body;

  try {
    const user = await User.findByIdAndRemove({ "_id": ID });
    if (!user) {
      return res.status(404).json({
        success: false,
        data: null,
      });
    }

    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      data: null,
    });
  }
};