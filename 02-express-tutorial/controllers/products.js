const { products } = require("../data");

// Get products handler
const getProducts = (req, res) => {
  res.json(products);
};

// Get single product handler
const getSingleProduct = (req, res) => {
  console.log(req.params);
  console.log(req.params.productID);

  // My version
  // const singleProduct = products.find((product) => {
  //   return product.id === Number(req.params.productID);
  // });
  // console.log(singleProduct);

  // if (!singleProduct) {
  //   return res.status(404).json({ message: "That product was not found." })
  // } else {
  //   return res.status(200).json(singleProduct);
  // }

  const idToFind = parseInt(req.params.productID); // because this will be a string, and we need an integer
  console.log("idToFind =", idToFind);

  const validProduct = products.some((p) => {
    console.log("p.id =", p.id);
    console.log("idToFind", idToFind);
    return p.id === idToFind;
  });

  if (validProduct) {
    // p.id = idToFind causes an unwanted mutation to the data. It causes the first product to not exist and the rest of the products to be the albany sofa.
    const product = products.find((p) => p.id === idToFind);
    console.log("product =", product);
    res.status(200).json(product);
  } else if (!validProduct) {
    res.status(404).json({ message: "That product was not found." });
  }
};

module.exports = {
  getProducts,
  getSingleProduct,
};
