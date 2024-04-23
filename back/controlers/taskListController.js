const Project = require("../models/projectModel");
const Task = require("../models/projectTaskListModel");


exports.getTaskList = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json({
      status: "success",
      results: tasks.length,
      data: {
        tasks,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.createTaskList = async (req, res) => {
  // console.log(req.body);
  try {
    // 1
    const newTask = await Task.create(req.body);
// 2
await Project.findByIdAndUpdate(
    req.body.projectId, { $push: { tasks: newTask._id } },
  );

    res.status(201).json({
      status: "success",
      data: { task: newTask },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.updateTaskList = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "success",
      data: {
        task,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.deleteTaskList = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
}
