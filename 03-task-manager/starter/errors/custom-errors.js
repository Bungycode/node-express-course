// Create a child custom error class which is an 
// extension from its parent class Error.
class CustomAPIError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

// Instead of just creating an instance of the custom
// error class, I will create a function that returns
// an instance of the custom error class instead.
const createCustomError = (msg, statusCode) => {
  return new CustomAPIError(msg, statusCode);
};

module.exports = { CustomAPIError, createCustomError };
