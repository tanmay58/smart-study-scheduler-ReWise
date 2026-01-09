import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const AddTopic = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    subject: "",
    difficulty: "Medium",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await api.post("/topics", formData);

      // Redirect after successful creation
      navigate("/");
    } catch (err) {
      setError("Failed to add topic. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-10 max-w-lg mx-auto bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4 text-blue-700">
        ➕ Add New Topic
      </h2>

      {error && <p className="text-red-500 mb-3">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <input
          name="title"
          placeholder="Topic Title"
          value={formData.title}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />

        {/* Description */}
        <textarea
          name="description"
          placeholder="Short description"
          value={formData.description}
          onChange={handleChange}
          className="border p-2 w-full"
          rows={3}
          required
        />

        {/* Subject */}
        <input
          name="subject"
          placeholder="Subject (e.g. React, DSA)"
          value={formData.subject}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />

        {/* Difficulty */}
        <select
          name="difficulty"
          value={formData.difficulty}
          onChange={handleChange}
          className="border p-2 w-full"
        >
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700"
        >
          {loading ? "Adding..." : "Add Topic"}
        </button>
      </form>
    </div>
  );
};

export default AddTopic;
