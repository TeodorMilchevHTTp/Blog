import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaPowerOff, FaGithub, FaLinkedin, FaInstagram, FaFacebook } from 'react-icons/fa';

import ThemeToggle from './ThemeToggle';
import Navbar from './Dashboard'; // you may need to export it from Dashboard
import Projects from './Projects';
import CVRequest from './CVRequest';

const Links = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [showCVRequest, setShowCVRequest] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-[#121212] text-gray-800 dark:text-white transition-colors duration-500 px-6 py-12">
      <div className="max-w-4xl mx-auto space-y-16">

        {/* Header */}
        <header className="relative text-center">
          <div className="absolute right-0 top-0 flex items-center space-x-4 p-4">
            <ThemeToggle />
            {user && (
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded font-semibold transition"
              >
                <FaPowerOff size={18} />
              </button>
            )}
          </div>

          <h1 className="text-4xl font-extrabold text-primary-100">Websites I've Built</h1>
          <p className="mt-2 text-slate-500 dark:text-slate-400">
            A showcase of my recent web projects.
          </p>
        </header>

        {/* Navbar */}
        <div className="bg-light-card dark:bg-[#1f1f1f] border border-gray-200 dark:border-white/10 rounded-xl p-4 shadow-lg">
          <Navbar onOpenCV={() => setShowCVRequest(true)} user={user} />
        </div>

        {/* Main content → PROJECTS GRID */}
        <section className="bg-light-card dark:bg-[#1f1f1f] border border-gray-200 dark:border-white/10 rounded-xl p-6 shadow-lg">
          <Projects />
        </section>

        {/* Footer */}
        <footer className="text-center pt-12 border-t border-white/20 text-sm text-slate-500 flex flex-col items-center space-y-2">
          <div>
            © {new Date().getFullYear()} Your Name. All rights reserved.
          </div>

          <div className="flex space-x-4 mt-2 text-gray-600 dark:text-gray-300">
            <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer">
              <FaGithub size={20} className="hover:text-primary-100 transition" />
            </a>
            <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer">
              <FaLinkedin size={20} className="hover:text-primary-100 transition" />
            </a>
            <a href="https://instagram.com/yourusername" target="_blank" rel="noopener noreferrer">
              <FaInstagram size={20} className="hover:text-primary-100 transition" />
            </a>
            <a href="https://facebook.com/yourusername" target="_blank" rel="noopener noreferrer">
              <FaFacebook size={20} className="hover:text-primary-100 transition" />
            </a>
          </div>
        </footer>
      </div>

      {/* CV Modal */}
      {showCVRequest && (
        <div
          onClick={(e) => e.target === e.currentTarget && setShowCVRequest(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
        >
          <div className="relative bg-white dark:bg-[#1f1f1f] rounded-2xl p-8 w-full max-w-md shadow-2xl">
            <button
              onClick={() => setShowCVRequest(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-200 transition"
            >
              ✕
            </button>

            <CVRequest />
          </div>
        </div>
      )}
    </div>
  );
};

export default Links;
