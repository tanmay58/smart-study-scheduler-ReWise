const mongoose = require("mongoose");

const topicSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },

  description: String,

  subject: String,

  difficulty: {
    type: String,
    enum: ["Easy", "Medium", "Difficult"],
    required: true
  },

  status: {
    type: String,
    enum: ["Pending", "Completed"],
    default: "Pending"
  },

  createdAt: {
    type: Date,
    default: Date.now
  },

  nextRevisionDate: {
    type: Date
  },

  revisionSchedule: {
    type: [Date],
    default: []
  },

  revisionHistory: [
    {
      date: Date,
      note: String
    }
  ],

  emailNotified: {
    type: Boolean,
    default: false
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true
  }
});

module.exports = mongoose.model("Topic", topicSchema);
