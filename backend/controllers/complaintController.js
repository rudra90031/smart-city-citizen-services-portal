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

    const lastComplaint = await Complaint.findOne({
      complaintId: { $exists: true, $ne: "" }
    })
      .sort({ complaintId: -1 })
      .select("complaintId");

    let nextNumber = 1;

    if (lastComplaint?.complaintId) {
      const parts = lastComplaint.complaintId.split("-");
      const lastNumber = parseInt(parts[2], 10);

      if (!isNaN(lastNumber)) {
        nextNumber = lastNumber + 1;
      }
    }

    const complaintId = `SC-${new Date().getFullYear()}-${String(nextNumber).padStart(4, "0")}`;
    console.log("Last Complaint:", lastComplaint);
    console.log("Generated Complaint ID:", complaintId);

    const complaint = await Complaint.create({
      complaintId,
      user: req.user.id,
      title,
      description,
      category,
      location: parsedLocation,
      image: req.file ? req.file.filename : "",
    });


    await Notification.create({
      userId: complaint.user,
      title: `Complaint Submitted (${complaint.complaintId})`,
      message: "",
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

    await Notification.create({

      userId: complaint.user,

      title: `Complaint ${status} (${complaint.complaintId})`,
      message: "",

      type: "complaint"

    });

    res.status(200).json({
      message: "Status Updated",
      complaint
    });

  } catch (error) {

    console.log("========= UPDATE ERROR =========");
    console.log(error);
    console.log(error.message);
    console.log(error.stack);
    console.log("===============================");

    res.status(500).json({
      message: error.message
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

      console.log("All IDs:", await Complaint.find({}, "complaintId").sort({ complaintId: 1 }));

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