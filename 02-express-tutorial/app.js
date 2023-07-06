const express = require("express");

const { products } = require("./data");

const app = express();
const PORT = 3000;

app.use(express.static("./public"));

app.get("/api/v1/test", (req, res) => {
  res.json({ message: "It worked!" });
});

app.get("/api/v1/products", (req, res) => {
  res.json(products);
});

app.get("/api/v1/products/:productID", (req, res) => {
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
});

app.get("/api/v1/query", (req, res) => {
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
});

app.all("*", (req, res) => {
  res.status(404).send("<h1>Page not found - 404</h1>");
});

app.listen(PORT, () => {
  console.log(`This app is listening on port ${PORT}!`);
});
