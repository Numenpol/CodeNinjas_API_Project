const express = require("express");
const projectController = require("../controlers/projectController");
const authControler = require("../controlers/authController");

const {getAllProjects, getProject, createProject, updateProject, deleteProject} = projectController;

const {protect, restrictTo} = authControler;

const router = express.Router();

router.route("/").get(getAllProjects).post(createProject);
router
    .route("/:id")
    .get(getProject)
    .patch(updateProject)
    .delete(protect, restrictTo("admin", "user"), deleteProject);

module.exports = router;