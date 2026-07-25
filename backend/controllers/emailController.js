const transporter = require("../config/emailConfig");
const User = require("../models/User");
const generateEmailTemplate = require("../utils/emailTemplate");
const path = require("path");

// Send Email to Specific User
exports.sendToUser = async (req, res) => {
  try {
    const { email, subject, message } = req.body;

    if (!email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const html = generateEmailTemplate({
      subject,
      message,
      userName: user.name,
      portalLink: "http://localhost:5173",
      servicesLink: "http://localhost:5173/services",
    });

    await transporter.sendMail({
      from: `"Smart City Administration" <${process.env.EMAIL_USER}>`,
      to: email,
      subject,
      html,
      
    });

    res.json({
      success: true,
      message: "Email sent successfully",
    });

  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: "Failed to send email",
    });
  }
};


// Send Email to All Users
exports.sendToAllUsers = async (req, res) => {

  try {

    const { subject, message } = req.body;

    if (!subject || !message) {

      return res.status(400).json({
        success: false,
        message: "Subject and Message are required"
      });

    }

    const users = await User.find();

    for (const user of users) {

      const html = generateEmailTemplate({
        subject,
        message,
        userName: user.name,
        portalLink: "http://localhost:5173",
        servicesLink: "http://localhost:5173/services",
      });

      await transporter.sendMail({
        from: `"Smart City Administration" <${process.env.EMAIL_USER}>`,
        to: user.email,
        subject,
        html,
        
      });

    }

    res.json({

      success: true,
      message: `Email sent to ${users.length} users successfully.`

    });

  }

  catch (err) {

    console.log(err);

    res.status(500).json({

      success: false,
      message: "Failed to send emails"

    });

  }

};