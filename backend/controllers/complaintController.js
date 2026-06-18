const Complaint = require("../models/Complaint");

const createComplaint = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      location,
    } = req.body;

    const complaint = await Complaint.create({
      user: req.user.id,
      title,
      description,
      category,
      location,
    });

    res.status(201).json({
      message: "Complaint Submitted Successfully",
      complaint,
    });

  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};
const getComplaints = async (req, res) => {
  try {

    console.log("Logged In User:", req.user.id);

    const complaints = await Complaint.find({
      user: req.user.id,
    });

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
    );

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
module.exports = {
    createComplaint,
    getComplaints,
    getComplaintById,
};