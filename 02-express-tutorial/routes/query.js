const express = require("express");

const { queryProducts } = require('../controllers/query')

const router = express.Router();

console.log("router object BEFORE adding routes =", router);

// query end points
// /api/v1/query requests
router.route("/").get(queryProducts);

console.log("router object AFTER adding routes =", router);

module.exports = router;
