const User = require("../models/user");

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch(next); // Pass errors to next middleware
};

const getUser = (req, res, next) => {
  User.findById(req.params.userId)
    .orFail(() => {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    })
    .then((user) => res.status(200).send(user))
    .catch(next); // Pass errors to next middleware
};

const createUser = (req, res, next) => {
  const { name, avatar } = req.body;
  User.create({ name, avatar })
    .then((user) => res.status(201).send(user))
    .catch(next); // Pass errors to next middleware
};

module.exports = { getUsers, getUser, createUser };