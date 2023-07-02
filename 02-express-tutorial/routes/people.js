const express = require("express");

const {
  getPeople,
  addPerson,
  getSinglePerson,
  updatePerson,
  deletePerson,
} = require("../controllers/people");

const router = express.Router();
console.log("router object BEFORE adding routes =", router);

// people end points
// /api/v1/people requests
router.route("/").get(getPeople).post(addPerson);

// /api/v1/people/:id requests
router
  .route("/:id")
  .get(getSinglePerson)
  .put(updatePerson)
  .delete(deletePerson);

console.log("router object AFTER adding routes =", router);

module.exports = router;
