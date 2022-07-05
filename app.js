const express = require("express");
const { db } = require("./utils/database.utils");

//Routers
const { usersRouter } = require("./routes/users.routes");
const { tasksRouter } = require("./routes/tasks.routes");

//Global err Controller
const { globalErrorHandler } = require("./controllers/error.controller");

//utils
const { AppError } = require("./utils/appError");

//Init app express
const app = express();
app.use(express.json());

//Define Endpoints
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/tasks", tasksRouter);

// Handle incoming unknown routes to the server
app.all("*", (req, res, next) => {
  next(
    new AppError(`${req.method} ${req.originalUrl} not found this server`, 400)
  );
});

app.use(globalErrorHandler);

module.exports = { app };
