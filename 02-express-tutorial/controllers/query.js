const { products } = require("../data");

// Query products handler
const queryProducts = (req, res) => {
  console.log("req.query =", req.query);
  console.log("req.query.search is of type:", typeof req.query.search);

  const { search, limit, price } = req.query;
  console.log("search =", search);
  console.log("limit =", limit);
  console.log("typeof limit =", typeof limit);

  let sortedProducts = [...products];

  if (search) {
    sortedProducts = products.filter((product) =>
      product.name.startsWith(search)
    );
    console.log("if 'search' is truthy:", sortedProducts);
  }

  if (limit) {
    sortedProducts = sortedProducts.slice(0, parseInt(limit));
    console.log("If 'limit' is truthy:", sortedProducts);
  }

  if (price) {
    console.log(
      "convert price from string to integer data type:",
      typeof parseInt(price)
    );
    sortedProducts = sortedProducts.filter((product) => {
      return product.price <= price;
    });
    console.log("if 'price' is truthy:", sortedProducts);
  }

  if (sortedProducts.length < 1) {
    return res.status(200).json({ success: true, data: [] });
  }

  console.log("sortedProducts now equals: ", sortedProducts);
  return res.status(200).json(sortedProducts);
};

module.exports = {
  queryProducts,
};
