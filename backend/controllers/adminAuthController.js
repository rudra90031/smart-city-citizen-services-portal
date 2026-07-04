const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// ================= REGISTER ADMIN =================

exports.registerAdmin = async (req, res) => {

    try {

        const {
            setupKey,
            name,
            email,
            phone,
            password
        } = req.body;

        if (setupKey !== "SMARTCITY2026") {

            return res.status(403).json({
                message: "Invalid Setup Key"
            });

        }

        const adminExists = await Admin.findOne({
            email
        });

        if (adminExists) {

            return res.status(400).json({
                message: "Admin already exists"
            });

        }

        const hashedPassword = await bcrypt.hash(
            password,
            10
        );

        const admin = await Admin.create({

            name,
            email,
            phone,
            password: hashedPassword,
            role: "Admin"

        });

        res.status(201).json({

            message: "Admin Created Successfully",

            admin: {

                id: admin._id,
                name: admin.name,
                email: admin.email

            }

        });

    }

    catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// ================= LOGIN =================

exports.loginAdmin = async (req, res) => {

    try {

        const { email, password } = req.body;

        const admin = await Admin.findOne({
            email
        });

        if (!admin) {

            return res.status(400).json({
                message: "Invalid Email"
            });

        }

        const isMatch = await bcrypt.compare(
            password,
            admin.password
        );

        if (!isMatch) {

            return res.status(400).json({
                message: "Invalid Password"
            });

        }

        const token = jwt.sign(
            {
                id: admin._id,
                role: admin.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d"
            }
        );

        res.status(200).json({

            token,

            admin: {

                id: admin._id,
                name: admin.name,
                email: admin.email,
                phone: admin.phone,
                role: admin.role

            }

        });

    }

    catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// ================= PROFILE =================

exports.getProfile = async (req, res) => {

    try {

        const admin = await Admin.findById(req.admin.id).select("-password");

        res.status(200).json(admin);

    }

    catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// ================= UPDATE =================

exports.updateProfile = async (req, res) => {

    try {

        const { name, email, phone } = req.body;

        const admin = await Admin.findById(req.admin.id);

        admin.name = name;
        admin.email = email;
        admin.phone = phone;

        await admin.save();

        res.status(200).json({

            message: "Profile Updated",

            admin

        });

    }

    catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// ================= PASSWORD =================

exports.changePassword = async (req, res) => {

    try {

        const { currentPassword, newPassword } = req.body;

        const admin = await Admin.findById(req.admin.id);

        const match = await bcrypt.compare(
            currentPassword,
            admin.password
        );

        if (!match) {

            return res.status(400).json({

                message: "Current Password Incorrect"

            });

        }

        admin.password = await bcrypt.hash(
            newPassword,
            10
        );

        await admin.save();

        res.status(200).json({

            message: "Password Changed"

        });

    }

    catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};