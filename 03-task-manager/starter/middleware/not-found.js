//For routes that don't exist
const notFound = (req, res) => [
  res.status(404).send("<h1>This route does not exist!</h1>")
]

module.exports = notFound