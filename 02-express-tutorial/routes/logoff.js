const express = require("express");

const logOffHandler = require("../controllers/logoff");

const router = express.Router();

router.route("/").delete(logOffHandler);

module.exports = router;
