const User = require("../models/userModel");
const Project = require("../models/projectModel");
const catchAsync = require("../utils/catchAsync");

// 6. get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      status: "success",
      results: users.length,
      data: {
        users,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "error",
      message: err.message,
    });
  }
};

// 7. get user by ID
exports.getUser = (req, res) => {
  try {
    const user = User.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }

  // res.status(500).json({
  //   status: "error",
  //   message: "This route is not yet defined",
  // });
};

//8. create user
exports.createUser = async (req, res) => {
  try {
    const newUser = User.create(req.body);

    await Project.findById(
      req.body.membersProject, { $push: { projects: newUser._id } },
    )
    res.status(201).json({
      status: "success",
      data: {
        user: newUser,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }

  // res.status(500).json({
  //   status: "error",
  //   message: "This route is not yet defined",
  // });
};

//9. update user
exports.updateUser = (req, res) => {
  try {
    const user = User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
    }


  // res.status(500).json({
  //   status: "error",
  //   message: "This route is not yet defined",
  // });
};

//10. delete user
exports.deleteUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not yet defined",
  });
};