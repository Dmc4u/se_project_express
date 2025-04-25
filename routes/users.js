const express = require("express");
const { getCurrentUser, updateUser } = require("../controllers/users");
const { validateUserBody } = require("../middlewares/validation");

const router = express.Router();

router.get("/me", getCurrentUser); //ask question about validateId that is not used in this route
// router.get("/me", validateId, getCurrentUser); //ask question about validateId that is not used in this route
router.patch("/me", validateUserBody, updateUser);

module.exports = router;
