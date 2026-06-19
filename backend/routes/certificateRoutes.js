const express = require("express");
const router = express.Router();

const {
    createCertificate,
    getCertificates,
    getAllCertificates,
} = require("../controllers/certificateController");

const {
    protect,
} = require("../middleware/authMiddleware");

router.post("/", protect, createCertificate);
router.get("/", protect, getCertificates);
router.get("/admin/all", getAllCertificates);

module.exports = router;