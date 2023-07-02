const express = require("express");

const { getProducts, getSingleProduct } = require("../controllers/products");

const router = express.Router();

console.log("router object BEFORE adding routes =", router);

// products end points
// /api/v1/products requests
router.route("/").get(getProducts);

// /api/v1/products/:productID requests
router.route("/:productID").get(getSingleProduct);

console.log("router object AFTER adding routes =", router);

module.exports = router;
