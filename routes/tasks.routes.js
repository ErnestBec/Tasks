const express = require("express");

//Controllers
const {
  createTask,
  getAllTasks,
  getAllTasksStatus,
  updateTaskById,
  deleteTaskById,
} = require("../controllers/tasks.controller");

//Middlewares
const {
  createTaskValidators,
} = require("../middlewares/validators.middleware");
const { taskStatus, taskExists } = require("../middlewares/tasks.middleware");

const tasksRouter = express.Router();

tasksRouter.post("/", createTaskValidators, createTask);

tasksRouter.get("/", getAllTasks);

tasksRouter.get("/:status", taskStatus, getAllTasksStatus);

tasksRouter.patch("/:id", taskExists, updateTaskById);

tasksRouter.delete("/:id", taskExists, deleteTaskById);

module.exports = { tasksRouter };
