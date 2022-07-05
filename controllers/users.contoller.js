//Models
const { Users } = require("../models/user.model");

//Utils
const { catchAsync } = require("../utils/catchAsync");

const createUser = catchAsync(async (req, res, next) => {
  const { name, email, password } = req.body;

  const newUser = await Users.create({
    name,
    email,
    password,
  });
  res.status(201).json({
    status: "success",
    newUser,
  });
});

const getAllUserActive = catchAsync(async (req, res, next) => {
  const usersActive = await Users.findAll({ where: { status: "active" } });

  res.status(200).json({
    status: "Success",
    usersActive,
  });
});

const updateUserById = catchAsync(async (req, res, next) => {
  const { user } = req;
  const { name, email } = req.body;

  await user.update({ name, email });

  res.status(204).json({
    status: "Success",
  });
});

const deleteUserById = catchAsync(async (req, res, next) => {
  const { user } = req;

  await user.update({ status: "disabled" });

  res.status(204).json({
    status: "Success",
  });
});

module.exports = {
  createUser,
  getAllUserActive,
  updateUserById,
  deleteUserById,
};
