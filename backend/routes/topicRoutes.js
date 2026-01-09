const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Topic = require("../models/Topic"); // ✅ MISSING IMPORT FIXED

const {
  createTopic,
  getTopics,
  updateTopic,
  deleteTopic,
  markRevised
} = require("../controllers/topicController");

// ⚠️ TEMP TEST ROUTE — REMOVE AFTER CRON TEST
router.post("/force-due/:id", auth, async (req, res) => {
  try {
    const topic = await Topic.findOne({
      _id: req.params.id,
      user: req.user.id
    });

    if (!topic) {
      return res.status(404).json({ error: "Topic not found" });
    }

    topic.nextRevisionDate = new Date(Date.now() - 60000); // 1 min past
    topic.emailNotified = false;

    await topic.save();

    res.json({ message: "Topic forced due", topic });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to force topic due" });
  }
});

// 🔐 Main routes
router.post("/", auth, createTopic);
router.get("/", auth, getTopics);
router.put("/:id", auth, updateTopic);
router.delete("/:id", auth, deleteTopic);
router.post("/revise/:id", auth, markRevised);

module.exports = router;
