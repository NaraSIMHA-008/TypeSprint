const express = require("express");
const router = express.Router();
const { createUser, loginUser, currentUser } = require("../api/user");
const authenticateToken = require("../middleware/validateToken");

router.post("/signup", createUser);
router.post("/login", loginUser);
router.get("/:id", authenticateToken, currentUser);

module.exports = router;
