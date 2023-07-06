//import the http package and assign it to a variable.
const http = require("http");

// Print the http module data in the command line.
console.log(http);

const server = http.createServer((req, res) => {
  // I learned through this task that if you use template literals to view the req and res object, it will only print to the command line that it is an object instead of displaying the object data.
  console.log("request object data: ", req);
  console.log("response object data: ", res);
  console.log(
    `Template literals does not display the req and res object data. Instead it shows this: \nreq = ${req} \nres = ${res}`
  );

  if (req.url === "/") {
    res.end("Welcome to my first home page in the code the dream course!");
  } else if (req.url === "/about") {
    res.end("I am an upcoming software developer who loves coding!");
  } else {
    res.end(`<h1>Well this is awkward....</h1>
    <p>It seems the page you are looking for doesn't exist!</p>
    <p>Try again from the <a href='/'>Home Page</a>.</p>`);
  }
});

server.listen(3000, () => {
  console.log("Listening on port 3000");
});
