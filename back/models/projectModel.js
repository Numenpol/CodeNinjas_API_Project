const mongoose = require("mongoose");
const validator = require("validator");

const projectSchema = new mongoose.Schema({
  projectName: {
    type: String,
    required: [true, "Please enter project name"],
    unique: true,
    trim: true,
    maxlength: [40, "Project name must be less than 50 characters"],
    minlenght: [10, "Project name must be more than 3 characters"],
  },
  icon: {
    type: String,

  },
  description: {
    type: String,
    trim: true,
  },
  status: {
    type: String,
    enum: ["on hold", "in progress", "done"],
    default: "on hold",
  },
  overall: {
    type: Number,
    default: 0,
  },
  tasks: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Task",
    },
  ],

  members: [
    {
      type: String,
      
    }
  ]
  
});

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
