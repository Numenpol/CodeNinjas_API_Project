const Project = require("../models/projectModel");
const User = require("../models/userModel");

exports.getAllProjects = async (req, res) => {
  let searchParams = req.query;

  try {
    let projetsCreated;
    if (req.user.role === "admin") {
      projetsCreated = await Project.find();
    } else {
      const userId = req.user._id;
      projetsCreated = await Project.find({ user: userId });
    }

    let userWithProjects = await User.findById(req.user._id).populate("membersProject");
    
    let allProjects = [
      ...userWithProjects.membersProject,
      ...projetsCreated,
    ];

    let filteredProjects = allProjects.filter((project) => {
      if (searchParams.projectName) {
        return project.projectName.toLowerCase().includes(searchParams.projectName.toLowerCase());
      } else {
        return true;
      }
    });

    if (searchParams.projectName && filteredProjects.length === 0) {
      filteredProjects = allProjects;
    }

    res.status(200).json({
      status: "success",
      results: filteredProjects.length,
      data: {
        projects: filteredProjects,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error.message,
    });
  }
};

exports.getProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id).populate("tasks");
    res.status(200).json({
      status: "success",
      data: {
        project,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error.message,
    });
  }
};

// get projects by task
// exports.getProjectsByTask = async (req, res) => {
//  let searchParamstask = req.query;

//   try {
//     // const { taskId } = req.params;
//     // const projects = await Project.find({ tasks: taskId }).populate("tasks");
//     // const filteredProjects = projects.filter(project => project.tasks.includes(taskId));
//     const projectId = req.params.id;
//     const project = await Project.findById(projectId).populate("tasks");
//     const projectTasks = project.tasks;

//     res.status(200).json({
//       status: "success",
//       data: {
//         tasks: projectTasks,
//       },
//     });
//   } catch (error) {
//     res.status(404).json({
//       status: "fail",
//       message: error.message,
//     });
//   }
// };

exports.getProjectsByTask = async (req, res) => {
  let searchParams = req.query;

  try {
    const projectId = req.params.id;
    const project = await Project.findById(projectId).populate("tasks");

    if (!project) {
      return res.status(404).json({
        status: "fail",
        message: "Project not found",
      });
    }

    let filteredTasks = project.tasks.filter(task => {
      let matches = true;
      for (const key in searchParams) {
        if (
          searchParams[key] && 
          task[key] && 
          !task[key].toString().toLowerCase().includes(searchParams[key].toLowerCase())
        ) {
          matches = false;
          break;
        }
      }
      return matches;
    });

    if (filteredTasks.length === 0) {
      filteredTasks = project.tasks;
    }

    res.status(200).json({
      status: "success",
      results: filteredTasks.length,
      data: {
        tasks: filteredTasks,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error.message,
    });
  }
};


exports.createProject = async (req, res) => {
  try {
    const project = await Project.create({ ...req.body, user: req.user._id });
    res.status(201).json({
      status: "success",
      data: {
        project,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

exports.updateProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "success",
      data: {
        project,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error.message,
    });
  }
};

exports.deleteProject = async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error.message,
    });
  }
};

// exports.updateProjectsMembers = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const  membersData = req.body;

//     console.log("******");
//     console.log(membersData);

//     const project = await Project.findByIdAndUpdate(
//       id,
//       { $push: { members: membersData } },
//       { new: true }
//     );
//     await User.findOneAndUpdate(
//       {email: membersData.emails}, {$push: {membersProject: id}}
//     )

//     res.status(200).json({
//       status: "success",
//       data: {
//         project,
//       },
//     });
//   } catch (error) {
//     res.status(404).json({
//       status: "fail",
//       message: error.message,
//     });
//   }
// };

// exports.updateProjectsMembers = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const membersData = req.body;

//     console.log("******");
//     console.log(membersData);

//     // Get the current project
//     const project = await Project.findById(id);

//     // Check if the member is already in the project
//     if (!project.members.includes(membersData.emails)) {
//       // If not, update the project and add the member
//       await Project.findByIdAndUpdate(
//         id,
//         { $push: { members: membersData } },
//         { new: true }
//       );
//       await User.findOneAndUpdate(
//         { email: membersData.emails },
//         { $push: { membersProject: id } }
//       );
//     }

//     res.status(200).json({
//       status: "success",
//       data: {
//         project,
//       },
//     });
//   } catch (error) {
//     res.status(404).json({
//       status: "fail",
//       message: error.message,
//     });
//   }
// };

exports.updateProjectsMembers = async (req, res) => {
  try {
    const { id } = req.params;
    const membersData = req.body;

    console.log("******");
    console.log(membersData);

    const project = await Project.findById(id);

    if (
      !project.members.some((member) => member.emails === membersData.emails)
    ) {
      await Project.findByIdAndUpdate(
        id,
        { $push: { members: membersData } },
        { new: true }
      );
      await User.findOneAndUpdate(
        { email: membersData.emails },
        { $push: { membersProject: id } }
      );
    }

    res.status(200).json({
      status: "success",
      data: {
        project,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error.message,
    });
  }
};
