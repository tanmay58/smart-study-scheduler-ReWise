import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [dueTopics, setDueTopics] = useState([]);
  const [upcomingTopics, setUpcomingTopics] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const res = await api.get("/topics");
        const topics = res.data;

        const today = new Date();
        const due = [];
        const upcoming = [];

        topics.forEach((topic) => {
          if (!topic.nextRevisionDate) return;

          const revisionDate = new Date(topic.nextRevisionDate);
          revisionDate <= today ? due.push(topic) : upcoming.push(topic);
        });

        setDueTopics(due);
        setUpcomingTopics(upcoming);
      } catch (err) {
        console.error("Failed to load topics", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTopics();
  }, []);

  const handleMarkRevised = async (id) => {
    try {
      await api.post(`/topics/revise/${id}`);
      window.location.reload();
    } catch (err) {
      alert("Failed to mark revised");
    }
  };

  if (loading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-blue-100 px-6 py-10">
      <div className="max-w-5xl mx-auto space-y-10">

        {/* WELCOME SECTION */}
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-blue-900">
            👋 Welcome {user?.username}
          </h1>

          <p className="mt-4 text-lg text-gray-700 max-w-3xl">
            ReWise helps you remember what you study for the long term.
            Add topics you study, choose difficulty, and get smart revision
            reminders using spaced repetition.
          </p>
        </div>

        {/* ADD TOPIC CARD */}
        <div
          onClick={() => navigate("/add-topic")}
          className="cursor-pointer bg-white rounded-2xl shadow p-8 hover:shadow-lg transition max-w-md"
        >
          <div className="text-6xl mb-4">➕</div>
          <h2 className="text-2xl font-semibold text-blue-700">
            Add New Topic
          </h2>
          <p className="text-gray-600 mt-2">
            Add what you studied today and let ReWise schedule your revisions.
          </p>
        </div>

        {/* DUE REVISIONS */}
        <div className="bg-white rounded-2xl shadow p-8">
          <h2 className="text-2xl font-semibold text-red-600 mb-4">
            📌 Due Revisions (Today)
          </h2>

          {dueTopics.length === 0 ? (
            <p className="text-gray-500">No due revisions 🎉</p>
          ) : (
            <ul className="space-y-4">
              {dueTopics.map((topic) => (
                <li
                  key={topic._id}
                  className="flex justify-between items-center bg-red-50 p-4 rounded-xl"
                >
                  <div>
                    <p className="text-lg font-medium">{topic.title}</p>
                    <p className="text-sm text-gray-600">
                      Difficulty: {topic.difficulty}
                    </p>
                  </div>

                  <button
                    onClick={() => handleMarkRevised(topic._id)}
                    className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                  >
                    Mark Revised
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* UPCOMING REVISIONS */}
        <div className="bg-white rounded-2xl shadow p-8">
          <h2 className="text-2xl font-semibold text-blue-600 mb-4">
            📅 Upcoming Revisions
          </h2>

          {upcomingTopics.length === 0 ? (
            <p className="text-gray-500">No upcoming revisions</p>
          ) : (
            <ul className="space-y-4">
              {upcomingTopics.map((topic) => (
                <li
                  key={topic._id}
                  className="bg-blue-50 p-4 rounded-xl"
                >
                  <p className="text-lg font-medium">{topic.title}</p>
                  <p className="text-sm text-gray-600">
                    Next revision on{" "}
                    {new Date(topic.nextRevisionDate).toLocaleDateString(
                      "en-IN",
                      {
                        weekday: "long",
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      }
                    )}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>

      </div>
    </div>
  );
};

export default Home;
