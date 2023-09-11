const AppError = require("../utils/AppError");

const handleCastErrorDB = (err) => {
  // still handling the invalid id err
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new AppError(message, 400);
};

const sendErrorDev = (err, req, res) =>
  // API and SSRendered
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });

const sendErrorProd = (err, req, res) => {
  // (A) API
  if (req.originalUrl.startsWith("/api")) {
    // expected errors, send err to client
    if (err.isOperational) {
      return res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      });
    }
    // programming errors, dont send details to client
    console.error("ERROR", err);

    return res.status(500).json({
      status: "error",
      message: "something went wrong",
    });
  }
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, req, res);
  } else {
    let error = { ...err };
    error.message = err.message;

    if (err.name === "CastError") err = handleCastErrorDB(err);
    sendErrorProd(err, req, res);
  }
};
