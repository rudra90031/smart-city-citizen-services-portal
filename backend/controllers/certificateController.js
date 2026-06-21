const Certificate = require("../models/Certificate");

const createCertificate = async (req, res) => {

    try {

        const applicationId =
            "CERT-" + Date.now().toString().slice(-6);

        const certificate = await Certificate.create({
            user: req.user.id,
            certificateType: req.body.certificateType,
            purpose: req.body.purpose,
            address: req.body.address,
            aadhaarFile: req.body.aadhaarFile,
            supportingFile: req.body.supportingFile,
            applicationId,
        });

        res.status(201).json(certificate);

    } catch (error) {

        res.status(500).json({
            message: "Server Error",
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
            .populate("user", "name email");

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
};