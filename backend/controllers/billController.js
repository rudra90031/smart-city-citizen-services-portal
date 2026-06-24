const Bill = require("../models/Bill");

exports.getBills = async (req, res) => {
    try {
        const bills = await Bill.find();
        res.status(200).json(bills);
    } catch (error) {
        res.status(500).json(error);
    }
};

exports.createBill = async (req, res) => {
    try {
        const bill = await Bill.create(req.body);
        res.status(201).json(bill);
    } catch (error) {
        res.status(500).json(error);
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