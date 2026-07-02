const express = require("express");

const router = express.Router();

const {
    sendNotification,
    getNotifications
} = require("../controllers/emailController");

router.post("/send", sendNotification);

router.get("/", getNotifications);

module.exports = router;