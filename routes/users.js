const express = require("express"); // ✅ Built-in module first
const { getUsers, getUser, createUser } = require("../controllers/users"); // ✅ Local module after

const router = express.Router();

router.get("/", getUsers);
router.get("/:userId", getUser);
router.post("/", createUser);

module.exports = router;
