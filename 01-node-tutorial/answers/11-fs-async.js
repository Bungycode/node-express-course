const { readFile, writeFile } = require("fs");

writeFile("./temporary/fileB.txt", "This is\n", () => {
  console.log("Wrote first line.");
  writeFile("./temporary/fileB.txt", "an asynchronus\n", { flag: "a" }, () => {
    console.log("Wrote second line.");
    writeFile(
      "./temporary/fileB.txt",
      "callback operation",
      { flag: "a" },
      () => {
        console.log("Wrote third line.");
        readFile("./temporary/fileB.txt", "utf-8", (err, data) => {
          if (err) throw err;
          console.log(data);
          console.log(
            "Printed the ./temporary/fileB.txt data in the command line."
          );
        });
      }
    );
  });
});
