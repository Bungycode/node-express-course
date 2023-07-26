const Product = require("../models/product");

// Test Get all products handler
const getAllProductsStatic = async (req, res) => {
  const products = await Product.find({ price: { $gte: 300 } }).sort("price");

  return res.status(200).json({
    success: true,
    msg: "Testing static get route!",
    nbHits: products.length,
    data: products,
  });
};

// Get all products handler
const getAllProducts = async (req, res) => {
  const { company, featured, fields, name, numericFilters, sort } = req.query;
  const queryObject = {};
  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
  }
  if (featured) {
    queryObject.featured = featured === "true" ? true : false;
  }
  if (company) {
    queryObject.company = company;
  }
  if (numericFilters) {
    const operatorMap = {
      "<": "$lt",
      "<=": "$lte",
      "=": "$eq",
      ">": "$gt",
      ">=": "$gte",
    };
    const regEx = /\b(<|>|>=|=|<|<=)\b/g;
    let filters = numericFilters.replace(
      regEx,
      (match) => `-${operatorMap[match]}-`
    );
    const options = ["price", "rating"];
    filters = filters.split(",").forEach((item) => {
      const [field, operator, value] = item.split("-");
      if (options.includes(field)) {
        return (queryObject[field] = { [operator]: Number(value) });
      }
    });
  }

  // create query based off data from the query object.
  let result = Product.find(queryObject);

  // Refine query using "thenables" based on user conditions.
  //sort
  if (sort) {
    const sortList = sort.split(",").join(" ");
    result = result.sort(sortList);
  } else {
    result = result.sort("createdAt");
  }
  //fields
  if (fields) {
    const fieldsList = fields.split(",").join(" ");
    result = result.select(fieldsList);
  }
  const page = parseInt(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  // After refining the query, execute and fulfill the promise.
  const products = await result.limit(limit).skip(skip);
  res.status(200).json({
    success: true,
    msg: "Found all products!",
    nbHits: products.length,
    data: products,
  });
};

// Create a product handler
const createProduct = async (req, res) => {
  const createProduct = await Product.create(req.body);
  return res.status(201).json({
    success: true,
    msg: `You have just entered a new user by the name of ${req.body.name}!`,
    data: createProduct,
  });
};

module.exports = {
  getAllProducts,
  getAllProductsStatic,
  createProduct,
};
