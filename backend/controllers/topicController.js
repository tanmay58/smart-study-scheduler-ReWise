const Topic = require("../models/Topic");

// Spaced Repetition Schedules
const spacedRepetitionSchedules = {
  Easy: [2, 4, 7, 15, 30],
  Medium: [1, 3, 7, 14, 30],
  Hard: [1, 2, 5, 10, 20, 30]
};

// Create Topic
const createTopic = async (req, res) => {
  try {
    const { title, description, subject, difficulty } = req.body;

    const schedule =
      spacedRepetitionSchedules[difficulty] ||
      spacedRepetitionSchedules.Medium;

    const revisionSchedule = schedule.map(days =>
      new Date(Date.now() + days * 24 * 60 * 60 * 1000)
    );

    const newTopic = new Topic({
      title,
      description,
      subject,
      difficulty,
      user: req.user.id,
      revisionSchedule,
      currentRevisionIndex: 0,
      nextRevisionDate: revisionSchedule[0],
      status: "Active"
    });

    await newTopic.save();

    res.status(201).json(newTopic);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Topic creation failed" });
  }
};

// Get User Topics
const getTopics = async (req, res) => {
  try {
    const topics = await Topic.find({ user: req.user.id }).sort({
      nextRevisionDate: 1
    });

    res.json(topics);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch topics" });
  }
};

// Update Topic
const updateTopic = async (req, res) => {
  try {
    const updated = await Topic.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ error: "Topic not found" });
    }

    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Update failed" });
  }
};

// Delete Topic
const deleteTopic = async (req, res) => {
  try {
    const deleted = await Topic.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id
    });

    if (!deleted) {
      return res.status(404).json({ error: "Topic not found" });
    }

    res.json({ message: "Topic deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Delete failed" });
  }
};

// Mark Topic as Revised
const markRevised = async (req, res) => {
  try {
    const topic = await Topic.findOne({
      _id: req.params.id,
      user: req.user.id
    });

    if (!topic) {
      return res.status(404).json({ error: "Topic not found" });
    }

    // Prevent re-revising completed topics
    if (topic.status === "Completed") {
      return res.status(400).json({
        error: "Topic already completed"
      });
    }

    // Save revision history
    topic.revisionHistory.push({
      date: new Date(),
      note: req.body.note || "Revised"
    });

    // Move to next revision
    topic.currentRevisionIndex += 1;

    if (
      topic.currentRevisionIndex < topic.revisionSchedule.length
    ) {
      topic.nextRevisionDate =
        topic.revisionSchedule[topic.currentRevisionIndex];
    } else {
      topic.nextRevisionDate = null;
      topic.status = "Completed";
    }

    await topic.save();

    res.json({
      message: "Revision marked successfully",
      topic
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Failed to mark revision"
    });
  }
};

// EXPORTS
module.exports = {
  createTopic,
  getTopics,
  updateTopic,
  deleteTopic,
  markRevised
};
