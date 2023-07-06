const cookieParser = require("cookie-parser");
const express = require("express");

const auth = require("./utils/auth");
const authTestRoute = require("./routes/authTest");
const logOffRoute = require("./routes/logoff");
const logOnRoute = require("./routes/logon");
const peopleRoutes = require("./routes/people");
const productsRoutes = require("./routes/products");
const queryRoutes = require("./routes/query");

const logger = (req, res, next) => {
  try {
    const { method, url } = req;
    console.log("method =", method);
    console.log("url =", url);
    next();
  } catch (error) {
    console.log(`error = ${error}.\nfile path = ${__filename}\n`);
    return res.status(400).json({
      success: false,
      message: `Something went wrong! ${error}`,
    });
  }
};

const app = express();
const PORT = 3000;

// Middleware and routes
app.use(express.static("./public"));
app.use("/", logger);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use("/logon", logOnRoute);
app.use("/api/v1", auth);
app.use("/api/v1/test", authTestRoute);
app.use("/api/v1/logoff", logOffRoute);
app.use("/api/v1/people", peopleRoutes);
app.use("/api/v1/products", productsRoutes);
app.use("/api/v1/query", queryRoutes);

// Catch all end point for end points that don't exist
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

// Initiate server on designated port. PORT is 3000 at the moment.
app.listen(PORT, () => {
  console.log(`This app is listening on port ${PORT}!`);
});
