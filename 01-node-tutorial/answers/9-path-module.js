const path = require("path");

// Returns the path object.
console.log("path: ", path);

// Used path.join() according to assignment instructions.
console.log(
  "path.join('/01-node-tutorial', 'answers', '9-path-module.js'): ",
  path.join("/01-node-tutorial", "answers", "9-path-module.js")
);

// Utilized extra path module functionality.
// Returns the extension name of the current file.
console.log("path.extname(__filename): ", path.extname(__filename));

// Returns the directory that this current file is in.
console.log("path.dirname(__filename): ", path.dirname(__filename));

// Determines if the directory '\answers' is an absolute path. Can do the same for a file name as well. I showed 2 differents examples, one consisting of escaping a backslash. Expected output: true
console.log("path.isAbsolute('/answers'): ", path.isAbsolute("/answers"));
console.log("path.isAbsolute('\\answers'): ", path.isAbsolute("\\answers"));

// Path.parse() takes in an argument of a path and returns an object of properties that represents important components of the path.
const currentFilePath = __filename;
console.log("currentFilePath: ", currentFilePath);
console.log("path.parse(currentFilePath): ", path.parse(currentFilePath));
