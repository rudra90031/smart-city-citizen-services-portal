const mongoose = require("mongoose");

const billSchema = new mongoose.Schema(
    {
        billId: {
            type: String,
            required: true,
            unique: true,
        },

        citizen: {
            type: String,
            required: true,
        },

        mobile: {
            type: String,
            required: true,
        },

        type: {
            type: String,
            required: true,
        },

        amount: {
            type: Number,
            required: true,
        },

        dueDate: {
            type: Date,
            required: true,
        },

        remarks: {
            type: String,
            default: "",
        },

        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        isPaid: {
            type: Boolean,
            default: false,
        },

        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Bill", billSchema);