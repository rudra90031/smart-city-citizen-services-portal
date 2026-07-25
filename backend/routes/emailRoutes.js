const express = require("express");

const router = express.Router();

const {
  sendToUser,
  sendToAllUsers,
} = require("../controllers/emailController");

// Send to Specific User
router.post("/send-user", sendToUser);

// Send to All Users
router.post("/send-all", sendToAllUsers);

module.exports = router;