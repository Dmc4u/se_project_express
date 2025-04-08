const express = require("express");
const userRouter = require("./users");
const clothingItemRouter = require("./clothingItems");
const { NOT_FOUND } = require("../utils/errors");

const router = express.Router();

router.use("/users", userRouter);
router.use("/items", clothingItemRouter);

// Handle non-existent routes
router.use((req, res) => {
  res.status(NOT_FOUND).send({ message: "Requested resource not found" });
});

module.exports = router;