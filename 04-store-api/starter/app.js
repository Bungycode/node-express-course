require("dotenv").config();
const express = require("express");
require("express-async-errors");

const connectDB = require("./db/connect1");
const productsRoutes = require("./routes/products");

const errorMiddleware = require("./middleware/error-handler");
const notFoundMiddleware = require("./middleware/not-found");

const app = express();
const PORT = process.env.PORT || 3000;
// request body parser middleware
app.use(express.json());

// Routes
app.use("/api/v1/products", productsRoutes);

// middleware
app.use(notFoundMiddleware);
app.use(errorMiddleware);

const start = async () => {
  try {
    // Connect to database then initiate express server.
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
