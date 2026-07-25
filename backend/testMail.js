require("dotenv").config();

const transporter = require("./config/emailConfig");

async function testMail() {
  try {
    await transporter.verify();
    console.log("✅ Gmail Connected Successfully");
  } catch (err) {
    console.error("❌ Connection Failed");
    console.log(err);
  }
}

testMail();