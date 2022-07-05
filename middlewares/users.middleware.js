//Models
const { Users } = require("../models/user.model");

//Utils
const { catchAsync } = require("../utils/catchAsync");
const { AppError } = require("../utils/appError");

const userExist = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const user = await Users.findOne({ where: { id } });

  if (!user) {
    return next(new AppError("user not found", 400));
  }
  req.user = user;
  next();
});

module.exports = { userExist };
