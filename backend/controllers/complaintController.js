const Complaint = require("../models/Complaint");
const Notification = require("../models/Notification");
const XLSX = require("xlsx");

const createComplaint = async (req, res) => {
  console.log("CREATE API HIT");

  try {
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);
    console.log("USER:", req.user);

    const {
      title,
      description,
      category,
      location,
    } = req.body;

    const parsedLocation = JSON.parse(location);

    const complaint = await Complaint.create({
      user: req.user.id,
      title,
      description,
      category,
      location: parsedLocation,
      image: req.file ? req.file.filename : "",
    });

    const count = await Complaint.countDocuments();

    complaint.complaintId =
      `SC-${new Date().getFullYear()}-${String(count).padStart(4, "0")}`;

    await complaint.save();
    await Notification.create({
    userId: complaint.user,
    title: "Complaint Submitted",
    message: `Your complaint (${complaint.complaintId}) has been submitted successfully.`,
    type: "complaint"
});

    res.status(201).json({
      message: "Complaint Submitted Successfully",
      complaint,
    });

  } catch (error) {
    console.log("================ ERROR ================");
    console.log(error);
    console.log(error.message);
    console.log(error.errors);
    console.log("=======================================");

    res.status(500).json({
      message: error.message,
    });
  }
};
const getComplaints = async (req, res) => {
  try {

    console.log("Logged In User:", req.user.id);

    const complaints = await Complaint.find({
      user: req.user.id,
    }).populate("user", "name email mobile")

    console.log("Complaints Found:", complaints);

    res.status(200).json(complaints);

  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};
const getComplaintById = async (req, res) => {
  try {

    const complaint = await Complaint.findById(
      req.params.id
    ).populate("user", "name email mobile");

    if (!complaint) {
      return res.status(404).json({
        message: "Complaint Not Found",
      });
    }

    res.status(200).json(complaint);

  } catch (error) {

    res.status(500).json({
      message: "Server Error",
    });

  }
};
const getAllComplaints = async (req, res) => {
  try {

    const complaints = await Complaint.find()
      .populate("user", "name email mobile")
      .sort({ createdAt: -1 });

    res.status(200).json(complaints);

  } catch (error) {

    res.status(500).json({
      message: "Server Error"
    });

  }
};
const updateComplaintStatus = async (req, res) => {
  try {

    const complaint = await Complaint.findById(
      req.params.id
    );

    if (!complaint) {
      return res.status(404).json({
        message: "Complaint Not Found"
      });
    }

    complaint.status = req.body.status;

    await complaint.save();

const status = complaint.status;

let message = "";

switch (status) {

    case "Pending":
        message = `Your complaint (${complaint.complaintId}) is waiting for review.`;
        break;

    case "In Progress":
        message = `Your complaint (${complaint.complaintId}) is currently being processed.`;
        break;

    case "Resolved":
        message = `Your complaint (${complaint.complaintId}) has been resolved successfully.`;
        break;

    case "Rejected":
        message = `Your complaint (${complaint.complaintId}) has been rejected.`;
        break;

    default:
        message = `Your complaint (${complaint.complaintId}) status has been updated to ${status}.`;

}

await Notification.create({

    userId: complaint.user,

    title: `Complaint ${status}`,

    message,

    type: "complaint"

});

    res.status(200).json({
      message: "Status Updated",
      complaint
    });

  } catch (error) {

    res.status(500).json({
      message: "Server Error"
    });

  }
};
const getComplaintByComplaintId = async (
  req,
  res
) => {
  try {

    const complaint =
      await Complaint.findOne({
        complaintId:
          req.params.complaintId,
      });

    if (!complaint) {
      return res.status(404).json({
        message:
          "Complaint Not Found",
      });
    }

    res.status(200).json(
      complaint
    );

  } catch (error) {

    res.status(500).json({
      message: "Server Error",
    });

  }
};
const exportComplaintsExcel = async (req, res) => {
  try {
    const complaints = await Complaint.find()
      .populate("user", "name email mobile")
      .sort({ createdAt: -1 });

    const data = complaints.map((item) => ({
      "Complaint ID": item.complaintId,
      "Title": item.title,
      "Citizen Name": item.user?.name || "",
      "Email": item.user?.email || "",
      "Mobile": item.user?.mobile || "",
      "Category": item.category,
      "Location": item.location,
      "Status": item.status,
      "Description": item.description,
      "Date Submitted": new Date(item.createdAt).toLocaleString(),
      "Last Updated": new Date(item.updatedAt).toLocaleString(),
    }));

    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(data);

    worksheet["!cols"] = [
      { wch: 18 },
      { wch: 25 },
      { wch: 20 },
      { wch: 30 },
      { wch: 15 },
      { wch: 20 },
      { wch: 20 },
      { wch: 15 },
      { wch: 40 },
      { wch: 25 },
      { wch: 25 },
    ];

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Complaints"
    );

    const buffer = XLSX.write(workbook, {
      type: "buffer",
      bookType: "xlsx",
    });

    res.setHeader(
      "Content-Disposition",
      "attachment; filename=complaints.xlsx"
    );

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );

    res.send(buffer);
  } catch (error) {
    res.status(500).json({
      message: "Export Failed",
    });
  }
};

module.exports = {
  createComplaint,
  getComplaints,
  getComplaintById,
  getAllComplaints,
  updateComplaintStatus,
  getComplaintByComplaintId,
  exportComplaintsExcel,
};