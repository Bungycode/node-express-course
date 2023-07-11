// Authentication test handler
const authTestHandler = (req, res) => {
  try {
    if (req.user) {
      return res.status(200).json({
        success: true,
        message: `Hello ${req.user}! You are currently at your account dashboard!`,
        data: req.user,
      });
    } else {
      return res.status(404).json({ success: true, message: "Please log in!" });
    }
  } catch (error) {
    console.log(`error = ${error}.\nfile path = ${__filename}\n`);
    return res.status(400).json({
      success: false,
      message: `Something went wrong with your request! ${error}`,
    });
  }
};

module.exports = authTestHandler;
