const express = require("express");
const taskController = require("../controlers/taskListController");
const authControler = require("../controlers/authController");

const {getAllTasks, getTasks, createTaskList, updateTaskList, deleteTaskList} = taskController;

const { protect, restrictTo } = authControler;

const router = express.Router();


router.route("/").get(getAllTasks).post(createTaskList);

router.route("/:id")
.get(protect, getTasks)
.patch(protect, updateTaskList)
.delete(protect, deleteTaskList);

module.exports = router;