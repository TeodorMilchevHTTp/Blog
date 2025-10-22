import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Login = ({ setUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Hardcoded credentials
    if (username === 'blogt' && password === 'blogt') {
      const user = { username, role: 'admin' };
      setUser(user);
      localStorage.setItem('user', JSON.stringify(user));
      navigate('/');
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-[#121212]">
      <form
        onSubmit={handleLogin}
        className="bg-light-card dark:bg-[#1f1f1f] p-8 rounded-xl shadow-lg w-80 space-y-6 text-center"
      >
        <h1 className="text-2xl font-bold text-primary-100">Admin Login</h1>
        {error && <p className="text-red-500 text-sm">{error}</p>}

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-3 rounded border border-gray-300 dark:border-white/20 bg-gray-50 dark:bg-[#1f1f1f] text-gray-900 dark:text-white"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 rounded border border-gray-300 dark:border-white/20 bg-gray-50 dark:bg-[#1f1f1f] text-gray-900 dark:text-white"
        />

        <button
          type="submit"
          className="w-full py-3 bg-primary-600 hover:bg-primary-700 text-white rounded font-semibold transition"
        >
          Login
        </button>

        {/* Back to Dashboard link inside the card */}
        <Link
          to="/"
          className="block w-full mt-3 py-1 bg-primary-600 hover:bg-primary-700 text-white rounded font-semibold text-center transition"
        >
          &larr; Back to Dashboard
        </Link>
      </form>
    </div>
  );
};

export default Login;
