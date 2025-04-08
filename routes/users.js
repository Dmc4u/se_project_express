const express = require("express");
const { getUsers, getCurrentUser, updateUser } = require("../controllers/users");

const router = express.Router();

router.get("/", getUsers);
router.get("/me", getCurrentUser);
router.patch("/me", updateUser);

module.exports = router;