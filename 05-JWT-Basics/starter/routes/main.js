const express = require("express");
const router = express.Router();

const { login, dashboard } = require("../controllers/main");

const authMiddleware = require("../middleware/auth");

// /api/v1/dashboard
router.route("/dashboard").get(authMiddleware, dashboard);
// /api/v1/login
router.route("/login").post(login);

module.exports = router;
