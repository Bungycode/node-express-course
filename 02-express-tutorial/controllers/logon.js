// logon handler
const logOnHandler = (req, res) => {
  try {
    if (req.body.name) {
      return res
        .cookie("name", req.body.name)
        .status(201)
        .json({ success: true, message: `Hello ${req.body.name}!` });
    } else {
      return res.status(404).json({
        success: false,
        message: "Please provide a name!",
        date: req.body,
      });
    }
  } catch (error) {
    console.log(`error = ${error}.\nfile path = ${__filename}\n`);
    return res.status(400).json({
      success: false,
      message: `Something went wrong with your request! ${error}`,
    });
  }
};

module.exports = logOnHandler;
