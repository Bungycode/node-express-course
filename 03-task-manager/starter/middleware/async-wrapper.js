const asyncWrapper = (func) => {
  return async (req, res, next) => {
    try {
      await func(req, res, next);
    } catch (error) {
      return next(error)
    }
  };
};

// Using this will cause the CLI not to show the line of code where the error message fired off.
// console.log(`${error}\nLocated at ${__filename}\n`)

// Just FYI, when using `${error}` in template literals, it does not show the entire error object's data. Example result: "msg": "Something went wrong with your request! ValidationError: name: Must include a name!"

module.exports = asyncWrapper;
