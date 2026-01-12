const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const topicRoutes = require("./routes/topicRoutes");

const app = express();
const PORT = process.env.PORT || 10000;

app.use(express.json());

app.use(
  cors({
    origin: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/topics", topicRoutes);

app.get("/", (req, res) => {
  res.send("📘 ReWise Backend Running");
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    require("./cron/revisionCron");
  })
  .catch((err) => {
    console.error("❌ DB connection failed", err);
  });

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
