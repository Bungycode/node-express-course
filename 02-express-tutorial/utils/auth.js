const auth = (req, res, next) => {
  try {
    if (req.cookies.name) {
      req.user = req.cookies.name;
      next();
    } else {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized! Please login." });
    }
  } catch (error) {
    console.log(`error = ${error}.\nfile path = ${__filename}\n`);
    return res.status(400).json({
      success: false,
      message: `Something went wrong! ${error}`,
    });
  }
};

module.exports = auth;
