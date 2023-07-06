var http = require("http");
var fs = require("fs");

console.log("start");
http
  .createServer(function (req, res) {
    console.log("1");
    const text = fs.readFileSync("../content/big.txt", "utf8");
    console.log("2");

    res.end(text);
    console.log("3");
    const fileStream = fs.createReadStream("./content/big.txt", "utf-8");
    console.log("4");
    fileStream.on("open", () => {
      console.log("5");
      // fileStream.pipe(res);
      console.log(fileStream.pipe(res))
      console.log("6");
    });

    console.log("7");
    fileStream.on("error", (err) => {
      console.log("8");
      res.end(err);
    });
  })
  .listen(5000);

console.log("end");
