//Models
const { Tasks } = require("../models/tasks.model");
const { Users } = require("../models/user.model");
//Utils
const { catchAsync } = require("../utils/catchAsync");

const createTask = catchAsync(async (req, res, next) => {
  const { userId, title, limitDate, startDate } = req.body;
  const newTask = await Tasks.create({
    userId,
    title,
    limitDate,
    startDate,
  });
  res.status(201).json({
    status: "create Success",
    newTask,
  });
});

const getAllTasks = catchAsync(async (req, res, next) => {
  const tasks = await Tasks.findAll({
    include: [{ model: Users }],
  });

  res.status(201).json({
    status: "Success",
    tasks,
  });
});

const getAllTasksStatus = catchAsync(async (req, res, next) => {
  const { status } = req;
  const tasks = await Tasks.findAll({ where: { status: status } });

  res.status(201).json({
    status: "Success",
    tasks,
  });
});

const updateTaskById = catchAsync(async (req, res, next) => {
  const { task } = req;
  const { finishDate } = req.body;

  const limitDatenum = new Date(task.limitDate).getTime();
  const finishDatenum = new Date(finishDate).getTime();
  const remainingTime = limitDatenum - finishDatenum;

  if (remainingTime > 0) {
    await task.update({ finishDate, status: "completed" });
  } else if (remainingTime < 0) {
    await task.update({ finishDate, status: "late" });
  }

  res.status(201).json({
    status: "Success",
    task,
  });
});

const deleteTaskById = catchAsync(async (req, res, next) => {
  const { task } = req;
  await task.update({ status: "cancelled" });
  res.status(201).json({
    status: "Success",
  });
});

module.exports = {
  createTask,
  getAllTasks,
  getAllTasksStatus,
  updateTaskById,
  deleteTaskById,
};
