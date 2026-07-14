const adminAuth = require("../middleware/adminAuth");
const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const {
    getBills,
    getMyBills,
    createBill,
    updateBill,
    deleteBill,
    payBill
} = require("../controllers/billController");

const router = express.Router();

router.get("/", adminAuth, getBills);
router.get("/my", protect, getMyBills);
router.post("/", adminAuth, createBill);

router.put("/:id", adminAuth, updateBill);
router.delete("/:id", adminAuth, deleteBill);
router.put("/:id/pay", protect, payBill);
module.exports = router;