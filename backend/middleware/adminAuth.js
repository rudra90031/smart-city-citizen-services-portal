const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

const adminAuth = async (req, res, next) => {

    try {

        let token = req.headers.authorization;

        if (!token) {

            return res.status(401).json({
                message: "No token provided"
            });

        }

        token = token.split(" ")[1];
        console.log("TOKEN:", token);

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        console.log("DECODED:", decoded);

        

        const admin = await Admin.findById(decoded.id).select("-password");
        console.log("ADMIN:", admin);

        if (!admin) {

            return res.status(401).json({
                message: "Admin not found"
            });

        }

        req.admin = admin;

        next();

    }

    catch (error) {

        console.log("ADMIN AUTH ERROR:", error);

        res.status(401).json({
            message: "Unauthorized",
            error: error.message,
        });

    }

};

module.exports = adminAuth;