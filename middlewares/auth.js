const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const { UnauthorizedError } = require("../utils/errors");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    // Throw an UnauthorizedError if the authorization header is missing or invalid
    return next(new UnauthorizedError("Authorization required"));
  }

  const token = authorization.replace("Bearer ", "");

  return jwt.verify(token, JWT_SECRET, (err, payload) => {
    if (err) {
      // Throw an UnauthorizedError if the token verification fails
      return next(new UnauthorizedError("Authorization required"));
    }

    req.user = payload; // Attach the payload to the request object
    return next();
  });
};