//express
const express = require("express");

//Controllers
const {
  createUser,
  getAllUserActive,
  updateUserById,
  deleteUserById,
} = require("../controllers/users.contoller");

//Middlewares
const { userExist } = require("../middlewares/users.middleware");
const {
  createUserValidators,
} = require("../middlewares/validators.middleware");

const usersRouter = express.Router();

usersRouter.post("/", createUserValidators, createUser);

usersRouter.get("/", getAllUserActive);

usersRouter.patch("/:id", userExist, updateUserById);

usersRouter.delete("/:id", userExist, deleteUserById);

module.exports = { usersRouter };
