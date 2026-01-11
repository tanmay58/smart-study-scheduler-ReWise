// 1. Import Dependencies
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// 2. Import Routes
const topicRoutes = require("./routes/topicRoutes");
const authRoutes = require("./routes/authRoutes");

// 3. App Initialization
const app = express();
const PORT = process.env.PORT || 5000;

// 4. Middleware (ORDER MATTERS)
app.use(
  cors({
    origin: [
      "https://smart-study-scheduler-re-wise-9slu7sryh.vercel.app",
      "http://localhost:5173"
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
  })
);

// ✅ VERY IMPORTANT: handle preflight requests
app.options("*", cors());

app.use(express.json());

// 5. API Routes
app.use("/api/auth", authRoutes);
app.use("/api/topics", topicRoutes);

// 6. MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    require("./cron/revisionCron");
  })
  .catch((err) => {
    console.error("❌ DB connection failed", err);
  });

// 7. Root Route
app.get("/", (req, res) => {
  res.send("📘 ReWise Server is running");
});

// 8. Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
