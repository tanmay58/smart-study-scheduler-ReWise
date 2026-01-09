const cron = require("node-cron");
const Topic = require("../models/Topic");
const sendReminderEmail = require("../utils/sendEmail");

//cron.schedule("* * * * *", async () => { Test schedule (every minute) – kept for demos
  cron.schedule("0 8 * * *", async () => {

  console.log("⏰ Cron running at", new Date().toISOString());

  try {
    const now = new Date();

    const topics = await Topic.find({
      nextRevisionDate: { $lte: now },
      emailNotified: false
    }).populate("user");

    console.log(`🔄 Found ${topics.length} due topic(s)`);

    for (const topic of topics) {
      if (!topic.user || !topic.user.email) {
        console.log("⚠️ Missing user/email for topic", topic._id);
        continue;
      }

      console.log(`📧 Sending reminder email to ${topic.user.email}`);

      await sendReminderEmail(
        topic.user.email,
        "📘 ReWise – Revision Reminder",
        `Time to revise: ${topic.title}`
      );

      topic.emailNotified = true;
      await topic.save();

      console.log(`✅ Email processed for topic: ${topic.title}`);
    }
  } catch (err) {
    console.error("❌ Cron error:", err.message);
  }
});
