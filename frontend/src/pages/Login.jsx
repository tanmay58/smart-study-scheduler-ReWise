import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await api.post("/auth/login", formData);
      login(res.data.token, res.data.user);
      navigate("/");
    } catch {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="mt-10 max-w-md mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Login</h2>
      {error && <p className="text-red-500">{error}</p>}

      <form onSubmit={handleLogin} className="space-y-4">
        <input name="email" onChange={handleChange} placeholder="Email" className="border p-2 w-full" />
        <input name="password" type="password" onChange={handleChange} placeholder="Password" className="border p-2 w-full" />
        <button className="bg-green-500 text-white px-4 py-2 rounded w-full">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
