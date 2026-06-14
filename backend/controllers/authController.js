const User = require("../models/User");

const registerUser = async (req, res) => {
    try {
        const { name, email, mobile, password } = req.body;

        if (!name || !email || !mobile || !password) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        res.status(201).json({
            message: "User Registered Successfully",
            user: {
                name,
                email,
                mobile
            }
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

        res.status(200).json({
            message: "Login Successful",
            email
        });

    } catch (error) {
        res.status(500).json({
            message: "Server Error"
        });
    }
};

module.exports = {
    registerUser,
    loginUser
};
