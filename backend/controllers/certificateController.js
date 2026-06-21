const Certificate = require("../models/Certificate");

const createCertificate = async (req, res) => {

    try {

        const certificate = await Certificate.create({
            user: req.user.id,
            applicationId: `CERT-${Date.now()}`,
            certificateType: req.body.certificateType,
            purpose: req.body.purpose,
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

module.exports = {
    createCertificate,
    getCertificates,
    getAllCertificates,
};