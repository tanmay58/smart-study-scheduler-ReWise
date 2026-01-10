import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await api.post("/auth/register", formData);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.error || "Signup failed");
    }
  };

  return (
    <div className="mt-10 max-w-md mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Create Account</h2>
      {error && <p className="text-red-500">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="username" onChange={handleChange} placeholder="Username" className="border p-2 w-full" />
        <input name="email" onChange={handleChange} placeholder="Email" className="border p-2 w-full" />
        <input name="password" type="password" onChange={handleChange} placeholder="Password" className="border p-2 w-full" />

        <button className="bg-blue-500 text-white px-4 py-2 rounded w-full">
          Sign Up
        </button>
      </form>

      <p className="mt-4 text-center">
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default Signup;
