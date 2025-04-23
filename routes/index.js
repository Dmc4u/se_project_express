const express = require("express");
const userRouter = require("./users");
const clothingItemRouter = require("./clothingItems");
const { NotFoundError } = require("../utils/errors");

const router = express.Router();

router.use("/users", userRouter);
router.use("/items", clothingItemRouter);

// Handle non-existent routes
router.use((req, res, next) => {
  next(new NotFoundError("Requested resource not found"));
});

module.exports = router;