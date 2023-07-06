const express = require("express");

const { queryProducts } = require('../controllers/query')

const router = express.Router();

// query end points
// /api/v1/query requests
router.route("/").get(queryProducts);

module.exports = router;
