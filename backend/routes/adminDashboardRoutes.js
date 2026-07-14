const adminAuth = require("../middleware/adminAuth");
const express = require("express");

const router = express.Router();

const {
    getDashboardStats
} = require("../controllers/adminDashboardController");

router.get("/", adminAuth, getDashboardStats);

module.exports = router;