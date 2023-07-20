const { products } = require("../data");

// Get products handler
const getProducts = (req, res) => {
  res.json(products);
};

// Get single product handler
const getSingleProduct = (req, res) => {
  const idToFind = parseInt(req.params.productID); // because this will be a string, and we need an integer

  const validProduct = products.some((p) => {
    return p.id === idToFind;
  });

  if (validProduct) {
    // p.id = idToFind causes an unwanted mutation to the data. It causes the first product to not exist and the rest of the products to be the albany sofa.
    const product = products.find((p) => p.id === idToFind);
    res.status(200).json(product);
  } else if (!validProduct) {
    res.status(404).json({ message: "That product was not found." });
  }
};

module.exports = {
  getProducts,
  getSingleProduct,
};
