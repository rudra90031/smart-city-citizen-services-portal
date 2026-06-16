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

    const complaints = await Complaint.find({
      user: req.user.id,
    });

    res.status(200).json(complaints);

  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};
module.exports = {
  createComplaint,
  getComplaints,
};