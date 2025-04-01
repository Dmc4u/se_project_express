const User = require("../models/user");

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch((err) => {
      console.error(err);
      if (err.name === "CastError") {
        res.status(400).send({ message: err.message });
      } else {
        next(err);
      }
    });
};

const getUser = (req, res, next) => {
  User.findById(req.params.userId)
    .orFail(() => {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    })
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      console.error(err);
      if (err.name === "CastError") {
        res.status(400).send({ message: err.message });
      } else if (err.statusCode === 404) {
        res.status(404).send({ message: err.message });
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
