const express = require("express");
const projectController = require("../controlers/projectController");
const authControler = require("../controlers/authController");

const { getAllProjects, getProject, createProject, updateProject, deleteProject, updateProjectsMembers, getProjectsByTask } = projectController;

const { protect, restrictTo } = authControler;

const router = express.Router();

router.route("/").get(protect, getAllProjects).post(protect,createProject);
router
    .route("/:id")
    .get(protect, getProject)
    .patch(protect, updateProject)
    .delete(protect, restrictTo("admin", "user"), deleteProject);
router
    .route("/members/:id")
    .patch(protect, updateProjectsMembers);
router
    .route("/onetask/:id")
    .get(protect, getProjectsByTask);

module.exports = router;