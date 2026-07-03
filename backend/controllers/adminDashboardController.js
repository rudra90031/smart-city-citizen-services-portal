const Complaint = require("../models/Complaint");
const Certificate = require("../models/Certificate");
const Bill = require("../models/Bill");

const getDashboardStats = async (req, res) => {
    try {

        const totalComplaints = await Complaint.countDocuments();

        const pendingComplaints = await Complaint.countDocuments({
            status: "Pending"
        });

        const inProgressComplaints = await Complaint.countDocuments({
            status: "In Progress"
        });

        const resolvedComplaints = await Complaint.countDocuments({
            status: "Resolved"
        });

        const rejectedComplaints = await Complaint.countDocuments({
            status: "Rejected"
        });

        const pendingCertificates = await Certificate.countDocuments({
            status: "Pending"
        });

        const approvedCertificates = await Certificate.countDocuments({
            status: "Approved"
        });

        const rejectedCertificates = await Certificate.countDocuments({
            status: "Rejected"
        });

        const totalBills = await Bill.countDocuments();

        const paidBills = await Bill.countDocuments({
            isPaid: true
        });

        const unpaidBills = await Bill.countDocuments({
            isPaid: false
        });

        const paidBillsData = await Bill.find({
            isPaid: true
        });

        const totalRevenue = paidBillsData.reduce(
            (sum, bill) => sum + bill.amount,
            0
        );

        const streetLight = await Complaint.countDocuments({
            category: "Street Light"
        });

        const roadDamage = await Complaint.countDocuments({
            category: "Road Damage"
        });

        const waterSupply = await Complaint.countDocuments({
            category: "Water Supply"
        });

        const garbageCollection = await Complaint.countDocuments({
            category: "Garbage Collection"
        });

        res.status(200).json({

            totalComplaints,
            pendingComplaints,
            inProgressComplaints,
            resolvedComplaints,
            rejectedComplaints,

            pendingCertificates,
            approvedCertificates,
            rejectedCertificates,

            totalBills,
            paidBills,
            unpaidBills,

            totalRevenue,

            streetLight,
            roadDamage,
            waterSupply,
            garbageCollection

        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

module.exports = {
    getDashboardStats
};