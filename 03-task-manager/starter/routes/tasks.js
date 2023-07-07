const express = require("express");

const { getAllTasks, createTask, getSingleTask, updateTask, deleteTask } = require('../controllers/tasks')

const router = express.Router();

// /api/v1/tasks requests
router.route("/").get(getAllTasks).post(createTask);
// /api/v1/tasks/:id requests
router.route("/:id").get(getSingleTask).patch(updateTask).delete(deleteTask)

module.exports = router;
