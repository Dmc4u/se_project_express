const express = require("express");
const { getCurrentUser, updateUser } = require("../controllers/users");
const { validateUserBody } = require("../middlewares/validation");

const router = express.Router();

router.get("/me", getCurrentUser);
router.patch("/me", validateUserBody, updateUser);

module.exports = router;
