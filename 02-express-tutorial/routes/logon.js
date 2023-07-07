const express = require("express");

const logOnHandler = require("../controllers/logon");

const router = express.Router();

router.route("/").post(logOnHandler);

module.exports = router;
