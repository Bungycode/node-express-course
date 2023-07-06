const { products } = require("../data");

// Query products handler
const queryProducts = (req, res) => {
  const { search, limit, price } = req.query;
  let sortedProducts = [...products];

  if (search) {
    sortedProducts = products.filter((product) =>
      product.name.startsWith(search)
    );
  }

  if (limit) {
    sortedProducts = sortedProducts.slice(0, parseInt(limit));
  }

  if (price) {
    sortedProducts = sortedProducts.filter((product) => {
      return product.price <= price;
    });
  }

  if (sortedProducts.length < 1) {
    return res.status(200).json({ success: true, data: [] });
  }
  return res.status(200).json(sortedProducts);
};

module.exports = {
  queryProducts,
};
