const User = require("../models/user");
const { BAD_REQUEST, NOT_FOUND } = require("../utils/errors");

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users)) // Status 200 is implied
    .catch(next); // No need to handle specific errors here
};

const getUser = (req, res, next) => {
  User.findById(req.params.userId)
    .orFail(() => {
      const error = new Error("User not found");
      error.statusCode = NOT_FOUND;
      throw error;
    })
    .then((user) => res.send(user)) // Status 200 is implied
    .catch((err) => {
      console.error(err);
      if (err.name === "CastError") {
        res.status(BAD_REQUEST).json({ message: "Invalid ID format" });
      } else {
        next(err);
      }
    });
};

const createUser = (req, res, next) => {
  const { name, avatar } = req.body;
  User.create({ name, avatar })
    .then((user) => res.status(201).json(user))
    .catch(next); // Forward all errors to the global error handler
};

module.exports = { getUsers, getUser, createUser };
