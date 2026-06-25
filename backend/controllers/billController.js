const Bill = require("../models/Bill");
const User = require("../models/User");

exports.getBills = async (req, res) => {
    try {
        const bills = await Bill.find().populate("user", "_id name email mobile");

        res.status(200).json(bills);
    } catch (err) {
        res.status(500).json(err);
    }
};

exports.createBill = async (req, res) => {
    try {

        const {
            citizen,
            mobile,
            type,
            amount,
            dueDate,
            remarks
        } = req.body;
        console.log(req.body);

        console.log("Citizen:", citizen);
        console.log("Mobile:", mobile);

        const foundUser = await User.findOne({
            name: citizen,
            mobile: mobile
        });

        console.log("Found User:", foundUser);

        if (!foundUser) {
            return res.status(404).json({
                message: "User not found. Check citizen name and mobile number."
            });
        }

        const count = await Bill.countDocuments();

        const bill = await Bill.create({
            billId: `BL-${String(count + 1).padStart(3, "0")}`,
            citizen,
            mobile,
            type,
            amount,
            dueDate,
            remarks,
            userId: foundUser._id,
            user: foundUser._id
        });

        res.status(201).json(bill);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: error.message
        });

    }
};

exports.updateBill = async (req, res) => {
    try {
        const bill = await Bill.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.status(200).json(bill);
    } catch (error) {
        res.status(500).json(error);
    }
};

exports.payBill = async (req, res) => {
    try {

        const bill = await Bill.findById(req.params.id);

        if (!bill) {
            return res.status(404).json({
                message: "Bill not found"
            });
        }

        bill.isPaid = true;

        await bill.save();

        res.status(200).json({
            message: "Payment Successful",
            bill
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

exports.deleteBill = async (req, res) => {
    try {
        await Bill.findByIdAndDelete(req.params.id);

        res.status(200).json({
            message: "Bill Deleted",
        });
    } catch (error) {
        res.status(500).json(error);
    }
};