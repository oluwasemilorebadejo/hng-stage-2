const express = require("express");
const personController = require("../controllers/personController");
const personValidationMiddleware = require("../validation/personValidator");

const router = express.Router();

router
  .route("/")
  .post(personValidationMiddleware, personController.createPerson);

router
  .route("/:id")
  .get(personController.getPerson)
  .put(personController.updatePerson)
  .delete(personController.deletePerson);

module.exports = router;
