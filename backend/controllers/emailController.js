const EmailLog = require("../models/EmailLog");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
    },
});

// GET ALL NOTIFICATIONS
const getNotifications = async (req, res) => {
    try {

        const notifications = await EmailLog
            .find()
            .sort({ createdAt: -1 });

        res.json(notifications);

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }
};

// SEND NOTIFICATION
const sendNotification = async (req, res) => {

    try {

        const {
            recipient,
            email,
            subject,
            message
        } = req.body;

        const emailLog = await EmailLog.create({

            recipient,
            email,
            subject,
            message

        });

        if (recipient === "specific" && email) {

            await transporter.sendMail({

                from: process.env.EMAIL,

                to: email,

                subject,

                text: message

            });

        }

        res.json({

            message: "Email Sent Successfully",

            emailLog

        });

    }

    catch (err) {

        console.log(err);

        res.status(500).json({

            message: err.message

        });

    }

};

module.exports = {

    getNotifications,
    sendNotification

};