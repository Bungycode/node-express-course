// Log off handler
const logOffHandler = (req, res) => {
  try {
    return res
      .clearCookie("name")
      .status(200)
      .json({ success: true, message: `Goodbye ${req.user}!` });
  } catch (error) {
    console.log(`error = ${error}.\nfile path = ${__filename}\n`);
    return res.status(400).json({
      success: false,
      message: `Something went wrong with your request! ${error}`,
    });
  }
};

module.exports = logOffHandler;
