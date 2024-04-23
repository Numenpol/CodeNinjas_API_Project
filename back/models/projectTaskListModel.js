const mongoose = require("mongoose");

const projectTaskListSchema = new mongoose.Schema({
  task: {
    type: String,
    required: [true, "Please enter project name"],
    unique: true,
    trim: true,
    maxlength: [50, "Project name must be less than 50 characters"],
    minlenght: [3, "Project name must be more than 3 characters"],
  },
  key: {
    type: String,
  },
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
  }
});

const Task = mongoose.model("Task", projectTaskListSchema);

module.exports = Task;
