import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const Signup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: ""
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      const res = await api.post("/auth/register", form);

      // ✅ SUCCESS MESSAGE
      setMessage("Account created successfully. Please login.");

      // ✅ Redirect after 2 seconds
      setTimeout(() => {
        navigate("/login");
      }, 2000);

    } catch (err) {
      setError(
        err.response?.data?.msg || "Signup failed"
      );
    }
  };

  return (
    <div>
      <h2>Create Account</h2>

      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        {/* inputs */}
      </form>
    </div>
  );
};

export default Signup;
