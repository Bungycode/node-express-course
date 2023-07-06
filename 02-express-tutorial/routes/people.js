const express = require("express");

const {
  getPeople,
  addPerson,
  getSinglePerson,
  updatePerson,
  deletePerson,
} = require("../controllers/people");

const router = express.Router();

// people end points
// /api/v1/people requests
router.route("/").get(getPeople).post(addPerson);

// /api/v1/people/:id requests
router
  .route("/:id")
  .get(getSinglePerson)
  .put(updatePerson)
  .delete(deletePerson);

module.exports = router;
