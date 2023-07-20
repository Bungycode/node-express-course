const Product = require("../models/product");

// Test Get all products handler
const getAllProductsStatic = async (req, res) => {
  console.log("req.query =", req.query);
  const { name } = req.query;
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
  console.log("req.query =", req.query);
  const { company, featured, fields, name, numericFilters, sort } = req.query;
  const queryObject = {};
  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
    console.log("#1 if name, queryObject =", queryObject);
  }
  if (featured) {
    queryObject.featured = featured === "true" ? true : false;
    console.log("#2 if featured, queryObject =", queryObject);
  }
  if (company) {
    queryObject.company = company;
    console.log("#3 if company, queryObject =", queryObject);
  }
  if (numericFilters) {
    console.log("numericFilters =", numericFilters);
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
    console.log("filters =", filters);
    const options = ["price", "rating"];
    filters = filters.split(",").forEach((item) => {
      console.log("item =", item);
      const [field, operator, value] = item.split("-");
      console.log("field, operator, value =", field, operator, value);
      if (options.includes(field)) {
        return (queryObject[field] = { [operator]: Number(value) });
      }
    });
  }

  console.log("final queryObject =", queryObject);
  // create query based off data from the query object.
  let result = Product.find(queryObject);

  // Refine query using "thenables" based on user conditions.
  //sort
  if (sort) {
    console.log("sort =", sort);
    const sortList = sort.split(",").join(" ");
    console.log("sortList =", sortList);
    result = result.sort(sortList);
  } else {
    result = result.sort("createdAt");
  }
  //fields
  if (fields) {
    console.log("fields =", fields);
    const fieldsList = fields.split(",").join(" ");
    console.log("fieldsList =", fieldsList);
    result = result.select(fieldsList);
  }
  // console.log("result =", result);
  const page = parseInt(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  console.log;
  // After refining the query, execute and fulfill the promise.
  const products = await result.limit(limit).skip(skip);
  // console.log("products =", products);
  res.status(200).json({
    success: true,
    msg: "Found all products!",
    nbHits: products.length,
    data: products,
  });
};

// Create a product handler
const createProduct = async (req, res) => {
  console.log(req.body);
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
