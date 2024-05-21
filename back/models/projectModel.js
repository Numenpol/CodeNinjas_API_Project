const mongoose = require("mongoose");
const validator = require("validator");

const projectSchema = new mongoose.Schema({
  projectName: {
    type: String,
    required: [true, "Please enter project name"],
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
    enum: ["On hold", "In progress", "Done"],
    default: "On hold",
  },
  tasks: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Task",
    },
  ],

  members: [
    {
      emails: String,
      names: String,
    },
  ],
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  
});

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
