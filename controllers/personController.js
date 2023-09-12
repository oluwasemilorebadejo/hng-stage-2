const Person = require("../models/personModel");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");

exports.createPerson = catchAsync(async (req, res, next) => {
  const oldPerson = await Person.findOne({ name: req.body.name });

  if (oldPerson)
    return next(
      new AppError("Name already exists. Kindly use a different name", 409)
    );

  const newPerson = await Person.create({
    name: req.body.name,
  });

  res.status(201).json({
    status: "success",
    data: {
      person: newPerson,
    },
  });
});

exports.getPerson = catchAsync(async (req, res, next) => {
  const person = await Person.findById(req.params.id);

  if (!person) {
    return next(
      new AppError("There is no person with the id that you provided", 404)
    );
  }

  res.status(200).json({
    status: "success",
    data: {
      person,
    },
  });
});
exports.updatePerson = catchAsync(async (req, res, next) => {
  const updatedPerson = await Person.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!updatedPerson) {
    return next(
      new AppError("There is no person with the id that you provided", 404)
    );
  }

  res.status(200).json({
    status: "success",
    data: {
      person: updatedPerson,
    },
  });
});
exports.deletePerson = catchAsync(async (req, res, next) => {
  const person = await Person.findByIdAndDelete(req.params.id);

  if (!person) {
    return next(
      new AppError("There is no person with the id that you provided", 404)
    );
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
});
