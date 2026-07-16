const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
    try {
        const { name, email, mobile, password } = req.body;

        if (!name || !email || !mobile || !password) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({
                message: "User already exists",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            mobile,
            password: hashedPassword,
        });

        res.status(201).json({
            message: "User Registered Successfully",
            user,
        });

    } catch (error) {
        res.status(500).json({
            message: "Server Error"
        });
    }
};
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: "User not found",
            });
        }

        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid Password",
            });
        }

        const token = jwt.sign(
            {
                id: user._id,
                role: user.role,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d",
            }
        );

        res.status(200).json({
            message: "Login Successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                mobile: user.mobile,
                profilePic: user.profilePic,
                role: user.role,
            },
        });

    } catch (error) {
        res.status(500).json({
            message: "Server Error",
        });
    }
};
const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({
            message: "Server Error",
        });
    }
};

const updateProfile = async (req, res) => {

    try {

        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.mobile = req.body.phone || user.mobile;

        if (req.file) {
            user.profilePic = `/uploads/${req.file.filename}`;
        }

        await user.save();

        res.status(200).json({
            id: user._id,
            name: user.name,
            email: user.email,
            mobile: user.mobile,
            profilePic: user.profilePic,
            role: user.role,
        });

    } catch (error) {

        res.status(500).json({
            message: "Server Error",
        });

    }

};

module.exports = {
    registerUser,
    loginUser,
    getProfile,
    updateProfile,
};