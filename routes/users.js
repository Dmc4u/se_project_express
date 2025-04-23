const express = require("express");
const { getCurrentUser, updateUser } = require("../controllers/users");
const { validateUserBody, validateId } = require("../middlewares/validation");

const router = express.Router();

router.get("/me", validateId, getCurrentUser);
router.patch("/me", validateUserBody, updateUser);

module.exports = router;