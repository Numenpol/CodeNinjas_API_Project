const Project = require("../models/projectModel");
const User = require("../models/userModel");

exports.getAllProjects = async (req, res) => {
  let searchParams = req.query;

  try {
    let projectsCreated;
    if (req.user.role === "admin") {
      projectsCreated = await Project.find();
    } else {
      const userId = req.user._id;git 
      projectsCreated = await Project.find({ user: userId });
    }

    let userWithProjects = await User.findById(req.user._id).populate("membersProject");
    
    let allProjects = [
      ...userWithProjects.membersProject,
      ...projectsCreated,
    ];

    let filteredProjects = allProjects.filter((project) => {
      let matchesName = true;
      let matchesStatus = true;

      if (searchParams.projectName) {
        matchesName = project.projectName.toLowerCase().includes(searchParams.projectName.toLowerCase());
      }
      
      if (searchParams.status && searchParams.status === "active") {
        matchesStatus = ["In progress", "Done"].includes(project.status);
      }

      return matchesName && matchesStatus;
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
// exports.getAllProjects = async (req, res) => {
//   try {
  
//     const page = parseInt(req.query.page, 10) || 1;
//     const limit = parseInt(req.query.limit, 12) || 12;
//     const skip = (page - 1) * limit;

    
//     const numProjects = await Project.countDocuments();
//     if (skip >= numProjects && numProjects > 0) {
//       return res.status(404).json({
//         status: 'fail',
//         message: 'This page does not exist',
//       });
//     }

   
//     let projectsCreated;
//     if (req.user.role === 'admin') {
//       projectsCreated = await Project.find().skip(skip).limit(limit);
//     } else {
//       const userId = req.user._id;
//       projectsCreated = await Project.find({ user: userId }).skip(skip).limit(limit);
//     }

 
//     const userWithProjects = await User.findById(req.user._id).populate('membersProject');
//     const userProjects = userWithProjects.membersProject.slice(skip, skip + limit);

   
//     let allProjects = [
//       ...userProjects,
//       ...projectsCreated,
//     ];

   
//     const { projectName, status } = req.query;
//     let filteredProjects = allProjects.filter((project) => {
//       let matchesName = true;
//       let matchesStatus = true;

//       if (projectName) {
//         matchesName = project.projectName.toLowerCase().includes(projectName.toLowerCase());
//       }

//       if (status) {
//         if (status === 'active') {
//           matchesStatus = ['In progress', 'Done'].includes(project.status);
//         } else {
//           matchesStatus = project.status === status;
//         }
//       }

//       return matchesName && matchesStatus;
//     });

//     res.status(200).json({
//       status: 'success',
//       results: filteredProjects.length,
//       data: {
//         projects: filteredProjects,
//       },
//     });
//   } catch (error) {
//     res.status(404).json({
//       status: 'fail',
//       message: error.message,
//     });
//   }
// };



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

exports.getProjectsByTask = async (req, res) => {
  let searchParams = req.query;

  try {
      const projectId = req.params.id;
      const project = await Project.findById(projectId).populate('tasks');

      if (!project) {
          return res.status(404).json({
              status: 'fail',
              message: 'Project not found',
          });
      }

      let filteredTasks = project.tasks.filter((task) => {
          let matches = true;

          if (searchParams.task) {
              matches = task.task.toLowerCase().includes(searchParams.task.toLowerCase());
          }

          if (matches && searchParams.status) {
              if (searchParams.status === 'active') {
                  matches = ['in progress', 'done', 'to do'].includes(task.status.toLowerCase());
              } else {
                  matches = task.status.toLowerCase() === searchParams.status.toLowerCase();
              }
          }

          if (matches && searchParams.priority) {
              matches = ['low', 'medium', 'high'].includes(task.priority.toLowerCase());
          }

          return matches;
      });

      if (searchParams.status && filteredTasks.length === 0) {
        filteredTasks = project.tasks;
      }
  
      if (searchParams.priority && filteredTasks.length === 0) {
        filteredTasks = project.tasks;
      }
  
  

      res.status(200).json({
          status: 'success',
          results: filteredTasks.length,
          data: {
              tasks: filteredTasks,
          },
      });
  } catch (error) {
      res.status(404).json({
          status: 'fail',
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
