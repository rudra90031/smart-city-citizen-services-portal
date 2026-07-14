const adminAuth = require("../middleware/adminAuth");
const express = require("express");
const router = express.Router();

const {
    createCertificate,
    getCertificates,
    getAllCertificates,
    getCertificateById,
    updateCertificateStatus
} = require("../controllers/certificateController");

const upload =
    require("../middleware/uploadMiddleware");

const {
    protect,
} = require("../middleware/authMiddleware");

router.get("/", protect, getCertificates);
router.get(
    "/admin/all",
    adminAuth,
    getAllCertificates
);
router.post(
    "/",
    protect,
    upload.fields([
        { name: "aadhaarFile", maxCount: 1 },
        { name: "supportingFile", maxCount: 1 },
    ]),
    (req, res, next) => {
        console.log("BODY:", req.body);
        console.log("FILES:", req.files);
        next();
    },
    createCertificate
);
router.get(
    "/:id",
    adminAuth,
    getCertificateById
);
router.put(
    "/:id/status",
    adminAuth,
    updateCertificateStatus
);
module.exports = router;