import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Login = ({ setUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Hardcoded credentials
    if (username === "blogt" && password === "blogt") {
      const user = { username, role: "admin" };
      setUser(user);
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-[#121212] p-4">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md bg-white dark:bg-[#1f1f1f] p-8 rounded-2xl shadow-lg space-y-6"
      >
        <h1 className="text-2xl font-bold text-primary-100 text-center">
          Admin Login
        </h1>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 rounded-lg border border-gray-300 dark:border-white/20 bg-gray-50 dark:bg-[#1f1f1f] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-100"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded-lg border border-gray-300 dark:border-white/20 bg-gray-50 dark:bg-[#1f1f1f] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-100"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-semibold transition"
        >
          Login
        </button>

        <Link
          to="/"
          className="block w-full py-3 mt-2 bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-900 dark:text-white rounded-lg text-center font-semibold transition"
        >
          &larr; Back to Dashboard
        </Link>
      </form>
    </div>
  );
};

export default Login;
