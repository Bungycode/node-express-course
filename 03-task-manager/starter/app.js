// Import the express package.
const express = require('express')
// Create the express instance
const app = express()
// Create the port that is used to initate the application.
const PORT = 3000

// Catch all end point for pages that do not exist.
app.get("*", (req, res) => {
  res.status(404).send("<h1>Page not found - 404 error</h1>")
})

// Use the "listen" method to start the server using the designated
// "PORT" value.
app.listen(PORT, () => {
  console.log(`This server has started on port ${PORT}!`)
  
})
