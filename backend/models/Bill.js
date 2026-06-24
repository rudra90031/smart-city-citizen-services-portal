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

    isPaid: {
        type: Boolean,
        default: false,
    },
},
{
    timestamps: true,
}
);

module.exports = mongoose.model("Bill", billSchema);