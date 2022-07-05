//Models
const { Tasks } = require("../models/tasks.model");

//Utils
const { catchAsync } = require("../utils/catchAsync");
const { AppError } = require("../utils/appError");

const taskExists = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const task = await Tasks.findOne({
    where: { id, status: "active" },
  });

  if (!task) {
    return next(new AppError("Task does not exist with given Id", 404));
  }

  // Add user data to the req object
  req.task = task;
  next();
});

const taskStatus = catchAsync(async (req, res, next) => {
  const { status } = req.params;
  switch (status) {
    case "active":
      return (req.status = status), next();
      break;
    case "completed":
      return (req.status = status), next();
      break;
    case "late":
      return (req.status = status), next();
      break;
    case "cancelled":
      return (req.status = status), next();
      break;
    default:
      return next(new AppError("status  not found", 400));
      break;
  }
  // if (status === "active" || "completed" || "late" || "cancelled") {
  //   return (req.status = status), next();
  // } else {
  //   next(new AppError("status  not found", 400));
  // }
});

module.exports = { taskStatus, taskExists };
