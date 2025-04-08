const express = require("express");
const { createUser, login } = require("../controllers/users");
const userRouter = require("./users");
const clothingItemRouter = require("./clothingItems");
const { NOT_FOUND } = require("../utils/errors");

const router = express.Router();

// Add routes for signup and signin
router.post('/signup', createUser);
router.post('/signin', login);

// Add route for getting items
router.get('/items', require('../controllers/clothingItems').getItems);

router.use("/users", userRouter);
router.use("/items", clothingItemRouter);

// Handle non-existent routes
router.use((req, res) => {
  res.status(NOT_FOUND).send({ message: "Requested resource not found" });
});

module.exports = router;