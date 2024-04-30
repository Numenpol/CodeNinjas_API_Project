const mongoose = require("mongoose");

const projectTaskListSchema = new mongoose.Schema({
  key: {
    type: String,
  },
  task: {
    type: String,
    required: [true, "Please enter project name"],
    unique: true,
    trim: true,
    maxlength: [50, "Project name must be less than 50 characters"],
    minlenght: [3, "Project name must be more than 3 characters"],
  },

  owner: {
    type: String,
    
  },
  status: {
    type: String,
    // enum: ["To do", "In progress", "Done"],
    // default: "To do",
  },
  priority: {
    type: String,
    // enum: ["Low", "Medium", "High"],
    // default: "Low",
  },
  timeline: {
    type: Date,
    
  },
  creationdate: {
    type: Date,
    
  },
  completiondate: {
    type: Date,
    
  },

  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
  },
});

const Task = mongoose.model("Task", projectTaskListSchema);

module.exports = Task;
