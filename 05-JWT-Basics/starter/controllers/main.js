// check username, password in post(login) request
// if exist create new JWT
// send back to fron-end
// setup authentication so only the request with JWT can access the dasboard

const jwt = require("jsonwebtoken");
const { BadRequestError } = require("../errors");

//login
const login = async (req, res) => {
  const { username, password } = req.body;
  // mongoose validation
  // Joi - package
  // check in the controller

  console.log("username =", username);
  console.log("password =", password);
  if (!username || !password) {
    throw new BadRequestError("Please provide an email and password!");
  }

  //just for demo, normally provided by DB!!!!
  const id = new Date().getDate();

  // try to keep payload small, better experience for user
  // just for demo, in production use long, complex and unguessable string value!!!!!!!!!
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  console.log("token =", token);
  res.status(200).json({ msg: "user created!", token });
};

const dashboard = async (req, res) => {
  console.log("req.user =", req.user);
  const luckynumber = Math.floor(Math.random() * 100);

  return res.status(200).json({
    msg: `Hello, ${req.user.username} with an id of ${req.user.id}`,
    secret: `Here is your authorized data, your lucky number is ${luckynumber}`,
  });
};

module.exports = { login, dashboard };
