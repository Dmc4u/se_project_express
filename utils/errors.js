// Define custom error functions
const createNotFoundError = (message = "Resource not found") => {
  const error = new Error(message);
  error.statusCode = 404;
  return error;
};

const createBadRequestError = (message = "Bad request") => {
  const error = new Error(message);
  error.statusCode = 400;
  return error;
};

const createUnauthorizedError = (message = "Unauthorized access") => {
  const error = new Error(message);
  error.statusCode = 401;
  return error;
};

// Error formatting utility
const formatError = (err) => ({
    message: err.message || "An unknown error occurred",
    statusCode: err.statusCode || 500,
    stack: process.env.NODE_ENV === "production" ? undefined : err.stack,
  });

// Middleware to handle errors
const errorHandler = (err, req, res, next) => {
  const formattedError = {
    message: err.message || "An unknown error occurred",
    statusCode: err.statusCode || 500,
  };
  res.status(formattedError.statusCode).json({
    message: formattedError.message, // Ensure 'message' field in response
  });
  next();
};

module.exports = {
  createNotFoundError,
  createBadRequestError,
  createUnauthorizedError,
  formatError,
  errorHandler,
};
