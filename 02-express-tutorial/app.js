const cookieParser = require("cookie-parser");
const express = require("express");

const auth = require("./utils/auth");
const authTestRoute = require("./routes/authTest");
const logOffRoute = require("./routes/logoff");
const logOnRoute = require("./routes/logon");
const peopleRoutes = require("./routes/people");
const productsRoutes = require("./routes/products");
const queryRoutes = require("./routes/query");

console.log("peopleRoutes =", peopleRoutes);
console.log("productRoutes =", productsRoutes);
console.log("queryRoutes =", queryRoutes);

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
console.log("app =", app);

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
app.all("*", (req, res) => {
  res.status(404).send("<h1>Page not found - 404</h1>");
});

// Initiate server on designated port. PORT is 3000 at the moment.
app.listen(PORT, () => {
  console.log(`This app is listening on port ${PORT}!`);
});
