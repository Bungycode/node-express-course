const express = require("express");
const path = require("path");

const { products } = require("./data");

const app = express();
console.log(app);

const PORT = 3000;

app.use(express.static("./public"));

app.get("/api/v1/test", (req, res) => {
  res.json({ message: "It worked!" });
});

app.get("/api/v1/products", (req, res) => {
  res.json(products);
});

app.get("/api/v1/products/:productID", (req, res) => {
  // console.log(req.params);
  // console.log(req.params.productID);

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
});

app.get("/api/v1/query", (req, res) => {
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
});

app.all("*", (req, res) => {
  res.status(404).send("<h1>Page not found - 404</h1>");
});

app.listen(PORT, () => {
  console.log(`This app is listening on port ${PORT}!`);
});
