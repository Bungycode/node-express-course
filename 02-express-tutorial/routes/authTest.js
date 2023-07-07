const express = require("express");

const authTestHandler = require("../controllers/authTest");

const router = express.Router();

router.route("/").get(authTestHandler);

module.exports = router;
