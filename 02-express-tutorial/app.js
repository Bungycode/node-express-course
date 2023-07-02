const express = require("express");

const peopleRoutes = require('./routes/people')
const productsRoutes = require('./routes/products')
const queryRoutes = require('./routes/query')

console.log("peopleRoutes =", peopleRoutes)
console.log("productRoutes =", productsRoutes)
console.log("queryRoutes =", queryRoutes)

const logger = (req, res, next) => {
  const { method, url } = req;
  console.log("method =", method);
  console.log("url =", url);
  next();
};

const PORT = 3000;
const app = express();
console.log("app =", app);

app.use(express.static("./public"));
app.use("/", logger);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/api/v1/people', peopleRoutes)
app.use('/api/v1/products', productsRoutes)
app.use("/api/v1/query", queryRoutes)

// catch all end point for end points that don't exist

app.all("*", (req, res) => {
  res.status(404).send("<h1>Page not found - 404</h1>");
});

// Initiate server on designated port. PORT is 3000 at the moment.
app.listen(PORT, () => {
  console.log(`This app is listening on port ${PORT}!`);
});
