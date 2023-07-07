// Import the express package.
const express = require("express");
// Import routes
const tasksRoutes = require("./routes/tasks");
// Import the DB
const connectDB = require("./db/connect");
// Import the dotenv package.
require("dotenv").config();

// Create the express instance
const app = express();
// Create the port that is used to initate the application.
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
// Routes
app.get("/hello", (req, res) => {
  res.send("Task Manager App");
});

app.use("/api/v1/tasks", tasksRoutes);

// app.get('/api/v1/tasks')          - get all the tasks
// app.post('/api/v1/tasks')         - create a new task
// app.get('/api/v1/tasks:id')       - get single task
// app.patch('/api/v1/tasks:id')     - update task
// app.delete('/api/v1/tasks:id')    - delete task

// Catch all end point for pages that do not exist.
app.all("*", (req, res) => {
  res.status(404).send("<h1>Page not found - 404 error</h1>");
});

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
