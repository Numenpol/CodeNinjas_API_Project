const mongoose = require("mongoose");

const projectTaskListSchema = new mongoose.Schema({
  key: {
    type: Number,
  },
  task: {
    type: String,
    required: [true, "Please enter project name"],
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
    type: String,
    
  },
  creationdate: {
    type: String,
    
  },
  completiondate: {
    type: String,
  },

  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
  },
   members: {
      
   }
});
projectTaskListSchema.pre('save', async function(next) {
  if (!this.key) {
    const latestTask = await this.constructor.findOne().sort({ key: -1 });
    const latestKey = latestTask ? latestTask.key : 0;
    this.key = latestKey + 1;
  }
  next();
});

projectTaskListSchema.pre('remove', async function(next) {
  const remainingTasks = await this.constructor.find().sort({ key: 1 });

  for (let i = 0; i < remainingTasks.length; i++) {
    remainingTasks[i].key = i + 1;
    await remainingTasks[i].save();
  }

  next();
});


const Task = mongoose.model("Task", projectTaskListSchema);

module.exports = Task;
