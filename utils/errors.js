/* eslint-disable max-classes-per-file */

// BadRequestError — Status code 400
class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 400;
  }
}

// UnauthorizedError — Status code 401
class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 401;
  }
}

// ForbiddenError — Status code 403
class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 403;
  }
}

// NotFoundError — Status code 404
class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 404;
  }
}

// ConflictError — Status code 409
class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 409;
  }
}

// Export all custom error constructors
module.exports = {
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  ConflictError,
};