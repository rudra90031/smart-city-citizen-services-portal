const Certificate = require("../models/Certificate");

const createCertificate = async (req, res) => {

    try {
        console.log("REQ BODY =", req.body);
        console.log("REQ FILES =", req.files);

        const applicationId =
            "CERT-" + Date.now().toString().slice(-6);

        const certificate = await Certificate.create({
            user: req.user.id,
            certificateType: req.body.certificateType,
            purpose: req.body.purpose,
            address: req.body.address,
            aadhaarFile:
                req.files?.aadhaarFile?.[0]?.filename || "",

            supportingFile:
                req.files?.supportingFile?.[0]?.filename || "",
            applicationId,
        });

        res.status(201).json(certificate);

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: error.message,
        });
    }

};

const getCertificates = async (req, res) => {

    try {

        const certificates =
            await Certificate.find({
                user: req.user.id,
            });

        res.status(200).json(certificates);

    } catch (error) {

        res.status(500).json({
            message: "Server Error",
        });

    }

};

const getAllCertificates = async (req, res) => {

    try {

        const certificates =
            await Certificate.find()
                .populate("user", "name email")
                .sort({ createdAt: -1 });

        res.status(200).json(certificates);

    } catch (error) {

        res.status(500).json({
            message: "Server Error",
        });

    }

};
const getCertificateById = async (req, res) => {
    try {
        const certificate = await Certificate.findById(req.params.id)
            .populate("user", "name email mobile");
            console.log("USER DATA:", certificate.user);

        res.status(200).json(certificate);
    } catch (error) {
        res.status(500).json({
            message: "Server Error",
        });
    }
};
const updateCertificateStatus = async (req, res) => {
    try {
        const { status, adminRemarks } = req.body;

        const certificate = await Certificate.findByIdAndUpdate(
            req.params.id,
            {
                status,
                adminRemarks,
            },
            { new: true }
        );

        res.status(200).json(certificate);
    } catch (error) {
        res.status(500).json({
            message: "Server Error",
        });
    }
};

module.exports = {
    createCertificate,
    getCertificates,
    getAllCertificates,
    getCertificateById,
    updateCertificateStatus,
};