import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const AllTopics = () => {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/topics",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setTopics(res.data);
      } catch (err) {
        console.error("Failed to fetch topics", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTopics();
  }, [token]);

  if (loading) {
    return <p className="text-center mt-10">Loading topics...</p>;
  }

  return (
    <div className="min-h-screen bg-blue-50 p-6">
      <div className="max-w-5xl mx-auto bg-white shadow-md rounded-xl overflow-hidden">
        <h1 className="text-3xl font-bold text-blue-700 p-6 border-b">
          All Topics
        </h1>

        {topics.length === 0 ? (
          <p className="text-center text-gray-500 py-6">
            No topics added yet.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-blue-100 text-blue-800">
                <tr>
                  <th className="p-4">#</th>
                  <th className="p-4">Topic</th>
                  <th className="p-4">Created On</th>
                  <th className="p-4">Next Revision</th>
                  <th className="p-4">Status</th>
                </tr>
              </thead>

              <tbody>
                {topics.map((topic, index) => (
                  <tr
                    key={topic._id}
                    className={index % 2 === 0 ? "bg-white" : "bg-blue-50"}
                  >
                    <td className="p-4">{index + 1}</td>
                    <td className="p-4 font-medium">{topic.title}</td>
                    <td className="p-4">
                      {new Date(topic.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-4">
                      {topic.nextRevisionDate
                        ? new Date(topic.nextRevisionDate).toLocaleDateString()
                        : "Completed"}
                    </td>
                    <td
                      className={`p-4 font-semibold ${
                        topic.status === "Done"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {topic.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllTopics;
