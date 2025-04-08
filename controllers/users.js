const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { JWT_SECRET } = require("../utils/config");
const {
  BAD_REQUEST,
  CONFLICT,
  UNAUTHORIZED,
  NOT_FOUND,
  DEFAULT,
} = require("../utils/errors");

// Get current user function

const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => {
      const error = new Error("User not found");
      error.statusCode = NOT_FOUND;
      throw error;
    })
    .then((user) => {
      const { password, ...userWithoutPassword } = user.toObject();
      res.send(userWithoutPassword);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(BAD_REQUEST).json({ message: "Invalid ID format" });
      } else {
        next(err);
      }
    });
};

// Create user function

const createUser = (req, res, next) => {
  const { name, avatar, email, password: rawPassword } = req.body;

  if (!email || !rawPassword || !name) {
    return res.status(BAD_REQUEST).json({
      message: "Name, email, and password are required",
    });
  }

  return bcrypt
    .hash(rawPassword, 10) // Return promise
    .then((hashedPassword) => User.create({ name, avatar, email, password: hashedPassword }))
    .then((user) => {
      const { password, ...userWithoutPassword } = user.toObject();
      return res.status(201).json(userWithoutPassword);
    })
    .catch((err) => {
      if (err.code === 11000) {
        return res.status(CONFLICT).json({ message: "Email already exists" });
      }
      if (err.name === "ValidationError") {
        return res.status(BAD_REQUEST).json({ message: "Validation error" });
      }
      return next(err);
    });
};

// Login function
const login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(BAD_REQUEST)
      .json({ message: "Email and password are required" });
  }

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: "7d" });
      return res.send({ token });
    })
    .catch((err) => {
      if (err.message === "Incorrect email or password") {
        return res
          .status(UNAUTHORIZED)
          .json({ message: "Incorrect email or password" });
      }
      return res
        .status(DEFAULT)
        .json({ message: "An unexpected error occurred" });
    });
};


// Update user function
const updateUser = (req, res, next) => {
  const { name, avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, avatar },
    { new: true, runValidators: true, context: "query" }
  )
    .orFail(() => Promise.reject(new Error("User not found")))
    .then((user) => {
      const { password, email, ...userWithoutSensitive } = user.toObject();
      res.send(userWithoutSensitive);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res.status(BAD_REQUEST).json({
          message: "Validation failed",
        });
      }
      return next(err);
    });
};

module.exports = {
  getCurrentUser,
  createUser,
  login,
  updateUser,
};