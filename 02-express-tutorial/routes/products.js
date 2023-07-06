const express = require("express");

const { getProducts, getSingleProduct } = require("../controllers/products");

const router = express.Router();

// products end points
// /api/v1/products requests
router.route("/").get(getProducts);

// /api/v1/products/:productID requests
router.route("/:productID").get(getSingleProduct);

module.exports = router;
