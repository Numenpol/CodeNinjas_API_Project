const express = require("express");
const taskController = require("../controlers/taskListController");

const {getAllTasks, getTasks, createTaskList, updateTaskList, deleteTaskList} = taskController;

const router = express.Router();


router.route("/").get(getAllTasks).post(createTaskList);

router.route("/:id")
.get(getTasks)
.patch(updateTaskList)
.delete(deleteTaskList);

module.exports = router;