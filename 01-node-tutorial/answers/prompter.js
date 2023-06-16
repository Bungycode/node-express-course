const http = require("http");
var StringDecoder = require("string_decoder").StringDecoder;

const getBody = (req, callback) => {
  const decode = new StringDecoder("utf-8");
  console.log("decode: ", decode);
  let body = "";
  console.log(req);
  req.on("data", function (data) {
    console.log("data: ", data);
    body += decode.write(data);
    console.log("body += decode.write(data): ", body);
  });
  req.on("end", function () {
    body += decode.end();
    console.log("body += decode.end(): ", body);
    // Removed the below code to fix edge cases
    // const body1 = decodeURI(body);
    // Used the split method on body variable
    // instead of the body1 variable.
    const bodyArray = body.split("&");
    console.log("bodyArray: ", bodyArray);
    const resultHash = {};
    bodyArray.forEach((part) => {
      console.log("part: ", part);
      const partArray = part.split("=");
      console.log("partArray: ", partArray);
      resultHash[partArray[0]] = partArray[1];
      console.log("resultHash[partArray[0]]: ", resultHash[partArray[0]]);
    });
    callback(resultHash);
  });
};

// here, you could declare one or more variables to store what comes back from the form.
let item = "";
let backGroundColor = "";

// here, you can change the form below to modify the input fields and what is displayed.
// This is just ordinary html with string interpolation.
const form = () => {
  return `
  <body style="background-color: ${backGroundColor};">
  <form method="POST">
  <p>Choose a color for your background!</p>
  <select name="background-color">
    <option>--Please chooose a background color--</option>
    <option value="cyan">cyan</option>
    <option value="lavender">lavender</option>
    <option value="tan">tan</option>
  </select>
  <p>Enter something below.</p>
  <input name="item"></input>
  <button type="submit">Submit</button>
  <p><span style="background-color: slategrey; color: white; display: inline-block;">${item}</span></p>
  </form>
  </body>
  `;
};

const server = http.createServer((req, res) => {
  console.log("req.method is ", req.method);
  console.log("req.url is ", req.url);
  if (req.method === "POST") {
    getBody(req, (body) => {
      console.log("The body of the post is ", body);
      // here, you can add your own logic
      // Provided a drop down for picking background color.
      if (body["background-color"]) {
        backGroundColor = body["background-color"];
        console.log(backGroundColor);
      }
      if (body["item"]) {
        // Here I have provided javascript methods that remove the
        // default + sign and separates each word(item) with a space.
        // I have removed the decodeURI above and implemented the
        // decodeURIComponent here to decode the different special characters.
        // The existing code provided an edge case where the percent sign "%"
        // was not working as intended.
        item = decodeURIComponent(body["item"]).split("+").join(" ");
        console.log(item);
      } else {
        item = "Nothing was entered.";
      }
      // Your code changes would end here
      res.writeHead(303, {
        Location: "/",
      });
      res.end();
    });
  } else {
    res.end(form());
  }
});

console.log("Added nodemon!")

server.on('request', (req) => {
  console.log("event received: ", req.method, req.url)
})

server.listen(3000);
console.log("The server is listening on port 3000.");
