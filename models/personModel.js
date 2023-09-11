const mongoose = require("mongoose");

const personSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "pls input your name"],
    },
  },
  { versionKey: false }
);

const Person = mongoose.model("Person", personSchema);

module.exports = Person;
