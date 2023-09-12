const express = require("express");
const morgan = require("morgan");
const mongoSanitize = require("express-mongo-sanitize");

const AppError = require("./utils/AppError");
const globalErrorHandler = require("./controllers/errorController");
const personRouter = require("./routes/personRoutes");

const app = express();

app.use(morgan("dev"));

// log env variable
console.log(`ENVIROMENT: ${process.env.NODE_ENV}`);

app.use(express.json({ limit: "10kb" }));

app.use(mongoSanitize());

app.use("/api", personRouter);

// route error handler
app.all("*", (req, res, next) => {
  next(new AppError(`cant find ${req.originalUrl}`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
