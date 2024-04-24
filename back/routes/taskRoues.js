const express = require("express");
const taskController = require("../controlers/taskListController");

const {getTaskList, createTaskList, updateTaskList, deleteTaskList} = taskController;

const router = express.Router();



router.route("/")
.get(getTaskList)
.post(createTaskList)
.patch(updateTaskList)
.delete(deleteTaskList);

module.exports = router;