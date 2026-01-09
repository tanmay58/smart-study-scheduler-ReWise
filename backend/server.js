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

// 4. Middleware
app.use(cors());
app.use(express.json());

// 5. API Routes
app.use("/api/topics", topicRoutes);
app.use("/api/auth", authRoutes);

// 6. MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("✅ MongoDB connected");

    // 🔔 Start cron AFTER DB is ready
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
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
