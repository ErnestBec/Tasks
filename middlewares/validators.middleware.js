const { body, validationResult } = require("express-validator");

const { AppError } = require("../utils/appError");

const checkResult = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMsgs = errors.array().map((err) => err.msg);

    const message = errorMsgs.join(". ");

    return next(new AppError(message, 400));
  }

  next();
};

const createUserValidators = [
  body("name").notEmpty().withMessage("name cannot be empty"),
  body("email").isEmail().withMessage("enter a valid email"),
  body("password")
    .isAlphanumeric()
    .withMessage("the password must have letters and numbers")
    .isLength({ min: 8 })
    .withMessage("the password must have at least 8 characters"),
  checkResult,
];
const createTaskValidators = [
  body("title")
    .notEmpty()
    .withMessage('title cannot be empty"')
    .isString()
    .withMessage("Title must be a String"),
  body("userId")
    .notEmpty()
    .withMessage('userId cannot be empty"')
    .isNumeric()
    .withMessage("User id must be a number")
    .custom((val) => val > 0)
    .withMessage("User id cannot be a negative value"),
  checkResult,
];

module.exports = { createUserValidators, createTaskValidators };
