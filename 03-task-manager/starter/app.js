// Import the express package.
const express = require("express");
// Import routes
const tasksRoutes = require("./routes/tasks");
// Import the DB
const connectDB = require("./db/connect");
// Import the dotenv package.
require("dotenv").config();
// Import catch all route
const notFound = require("./middleware/not-found")
// Import custom error handler
const errorHandlerMiddleware = require("./middleware/error-handler")

// Create the express instance
const app = express();
// Create the port that is used to initate the application.
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.static('./public'))
app.use(express.json());

// Routes
app.use("/api/v1/tasks", tasksRoutes);

// Catch all end point for pages that do not exist.
app.use(notFound)
// Custom error handler needs to be last middleware.
app.use(errorHandlerMiddleware)

// Connect to the DB then start the server.
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    // If connection to the database is successful,
    // use the "listen" method to start the server using the designated
    // "PORT" value.
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}...`);
    });
  } catch (error) {
    console.log(`Something went wrong with starting your server! ${error}`);
  }
};

start();
