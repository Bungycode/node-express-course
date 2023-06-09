const { readFileSync, writeFileSync } = require("fs");

// Write 3 lines to the ./temporary/fileA.txt.
writeFileSync("./temporary/fileA.txt", "Hello World!\n");
writeFileSync("./temporary/fileA.txt", "My name is Andrew. \n", { flag: "a" });
writeFileSync(
  "./temporary/fileA.txt",
  "What is it that I love to do? Coding!",
  { flag: "a" }
);

// Read the data above from the fileA.txt file.
console.log(readFileSync("./temporary/fileA.txt", "utf-8"));
