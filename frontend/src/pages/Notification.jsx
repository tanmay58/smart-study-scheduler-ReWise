import { useEffect, useState } from "react";
import api from "../services/api";

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await api.get("/topics");
        const topics = res.data;

        const today = new Date();

        // Create notifications for due topics
        const notifList = topics
          .filter(
            (topic) =>
              topic.nextRevisionDate &&
              new Date(topic.nextRevisionDate) <= today
          )
          .map((topic) => ({
            id: topic._id,
            message: `🔔 Revision reminder sent for "${topic.title}"`,
            date: topic.nextRevisionDate,
          }));

        setNotifications(notifList);
      } catch (err) {
        console.error("Failed to load notifications", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  if (loading) {
    return <p className="text-center mt-10">Loading notifications...</p>;
  }

  return (
    <div className="min-h-screen bg-blue-100 px-6 py-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-900 mb-6">
          🔔 Notifications
        </h1>

        {notifications.length === 0 ? (
          <p className="text-gray-600">No notifications yet 🎉</p>
        ) : (
          <ul className="space-y-4">
            {notifications.map((notif) => (
              <li
                key={notif.id}
                className="bg-white rounded-xl shadow p-4"
              >
                <p className="text-gray-800">{notif.message}</p>
                <p className="text-sm text-gray-500 mt-1">
                  {new Date(notif.date).toLocaleDateString("en-IN", {
                    weekday: "long",
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Notification;
