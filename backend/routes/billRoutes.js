const express = require("express");

const {
    getBills,
    createBill,
    updateBill,
    deleteBill,
    payBill
} = require("../controllers/billController");

const router = express.Router();

router.get("/", getBills);

router.post("/", createBill);

router.put("/:id", updateBill);

router.delete("/:id", deleteBill);
router.put("/:id/pay", payBill);

module.exports = router;