const express = require("express");
const projectController = require("../controlers/projectController");
const authControler = require("../controlers/authController");

const { getAllProjects, getProject, createProject, updateProject, deleteProject, upadateProjectsMembers, getProjectsByTask } = projectController;

const { protect, restrictTo } = authControler;

const router = express.Router();

router.route("/").get(protect, getAllProjects).post(protect,createProject);
router
    .route("/:id")
    .get(getProject)
    .patch(updateProject)
    .delete(protect, restrictTo("admin", "user"), deleteProject);
router
    .route("/members/:id")
    .patch(upadateProjectsMembers);
router
    .route("/onetask/:id")
    .get(getProjectsByTask);

module.exports = router;