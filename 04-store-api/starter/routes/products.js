const express = require("express");

const { getAllProducts, getAllProductsStatic, createProduct } = require("../controllers/products");

const router = express.Router();

// /api/v1/products routes
router.route("/").get(getAllProducts).post(createProduct);
// /api/v1/products/static routes
router.route("/static").get(getAllProductsStatic)
module.exports = router;
