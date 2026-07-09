const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadMiddleware");

const {
  createComplaint,
  getComplaints,
  getComplaintById,
  getAllComplaints,
  updateComplaintStatus,
  getComplaintByComplaintId,
  exportComplaintsExcel,
} = require("../controllers/complaintController");

const { protect } = require("../middleware/authMiddleware");
const adminAuth = require("../middleware/adminAuth");
router.post("/", protect, upload.single("image"), createComplaint);
router.get("/", protect, getComplaints);

router.get("/admin/all", adminAuth, getAllComplaints);
router.get("/admin/export-excel", adminAuth, exportComplaintsExcel);
router.get("/track/:complaintId", getComplaintByComplaintId);

router.put("/admin/:id/status", adminAuth, updateComplaintStatus);
router.get("/admin/:id", adminAuth, getComplaintById);
router.get("/:id", protect, getComplaintById);
module.exports = router;