const Joi = require("joi");
const catchAsync = require("../utils/catchAsync");

const personValidator = Joi.object({
  name: Joi.string().alphanum().required().messages({
    "any.required": "Please provide a name",
    "string.base": "Name must be a string",
  }),
});

// Validation middleware for the inputs
const personValidationMiddleware = catchAsync(async (req, res, next) => {
  await personValidator.validateAsync(req.body);
  next();
});

module.exports = personValidationMiddleware;
