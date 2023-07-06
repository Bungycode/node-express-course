const { andrew } = require("./4-name");
const myPassion = "I love coding!";

const myFunction = (name) => {
  console.log(`My name is ${name} and ${myPassion}`);
};

myFunction(andrew);

module.exports = myFunction;
