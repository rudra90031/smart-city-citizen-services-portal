const authRoutes = require("./routes/authRoutes");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");
const { protect } = require("./middleware/authMiddleware");
const complaintRoutes = require("./routes/complaintRoutes");
const certificateRoutes = require("./routes/certificateRoutes");
const billRoutes = require("./routes/billRoutes");
const emailRoutes = require("./routes/emailRoutes");
const notificationRoutes=require("./routes/notificationRoutes");
const adminDashboardRoutes = require("./routes/adminDashboardRoutes");
const adminAuthRoutes = require("./routes/adminAuthRoutes");
const path = require("path");

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/api/test", (req, res) => {
  res.json({
    message: "Backend Connected Successfully",
  });
});
app.get("/api/profile", protect, (req, res) => {
  res.json({
    message: "Protected Route Accessed",
    user: req.user,
  });
});
app.use(
    "/api/certificates",
    certificateRoutes
);
app.use("/api/email", emailRoutes);

app.use(

    "/api/notifications",

    notificationRoutes

);
app.use(
    "/api/admin",
    adminAuthRoutes
);

app.use(
    "/api/admin/dashboard",
    adminDashboardRoutes
);

app.use(
  "/uploads",
  express.static(
    path.join(__dirname, "uploads")
  )
);
app.use(
  "/uploads",
  express.static("uploads")
);
app.use("/api/bills", billRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/complaints", complaintRoutes);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
