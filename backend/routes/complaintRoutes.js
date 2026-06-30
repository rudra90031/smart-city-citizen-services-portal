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
router.post("/", protect, upload.single("image"), createComplaint);
router.get("/", protect, getComplaints);

router.get("/admin/all", protect, getAllComplaints);
router.get("/admin/export-excel", protect, exportComplaintsExcel);
router.get("/track/:complaintId", getComplaintByComplaintId);

router.put("/admin/:id/status", protect, updateComplaintStatus);

router.get("/:id", protect, getComplaintById);
module.exports = router;