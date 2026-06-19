const mongoose = require("mongoose");

const certificateSchema = new mongoose.Schema(
{
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    certificateType: {
        type: String,
        required: true,
    },

    purpose: {
        type: String,
        required: true,
    },

    status: {
        type: String,
        default: "Pending",
    },

    adminRemarks: {
        type: String,
        default: "",
    },
},
{
    timestamps: true,
}
);

module.exports = mongoose.model(
    "Certificate",
    certificateSchema
);