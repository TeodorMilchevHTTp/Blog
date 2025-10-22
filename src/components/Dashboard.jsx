import AboutMe from './AboutMe';
import Projects from './Projects';
import WebsiteLinks from './WebsiteLinks';
import CurrencyAPI from './CurrencyAPI';
import ThemeToggle from './ThemeToggle';
import { FaPowerOff } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Navbar = () => (
  <nav className="flex justify-center space-x-24">
    <Link to="/games" className="text-gray-800 dark:text-slate-300 hover:text-primary-100 transition">
      Games
    </Link>
    <Link to="/projects" className="text-gray-800 dark:text-slate-300 hover:text-primary-100 transition">
      Projects
    </Link>
    <Link to="/links" className="text-gray-800 dark:text-slate-300 hover:text-primary-100 transition">
      Website
    </Link>
    <Link to="/login" className="text-gray-800 dark:text-slate-300 hover:text-primary-100 transition">
      Login
    </Link>
  </nav>
);

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

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
          <h1 className="text-4xl font-extrabold text-primary-100">Welcome to My Coding Portfolio</h1>
          <p className="mt-2 text-slate-500 dark:text-slate-400">Built with React + Tailwind CSS</p>
        </header>

        {/* Navbar */}
        <div className="bg-light-card dark:bg-[#1f1f1f] border border-gray-200 dark:border-white/10 rounded-xl p-4 shadow-lg transition-colors duration-500">
          <Navbar />
        </div>

        {/* Sections */}
        <section className="bg-light-card dark:bg-[#1f1f1f] border border-gray-200 dark:border-white/10 rounded-xl p-6 shadow-lg transition-colors duration-500">
          <AboutMe />
        </section>
        <section className="bg-light-card dark:bg-[#1f1f1f] border border-gray-200 dark:border-white/10 rounded-xl p-6 shadow-lg transition-colors duration-500">
          <Projects />
        </section>
        <section className="bg-light-card dark:bg-[#1f1f1f] border border-gray-200 dark:border-white/10 rounded-xl p-6 shadow-lg transition-colors duration-500">
          <CurrencyAPI />
        </section>
        <section className="bg-light-card dark:bg-[#1f1f1f] border border-gray-200 dark:border-white/10 rounded-xl p-6 shadow-lg transition-colors duration-500">
          <WebsiteLinks />
        </section>

        <footer className="text-center pt-12 border-t border-white/20 text-sm text-slate-500">
          &copy; {new Date().getFullYear()} Your Name. All rights reserved.
        </footer>
      </div>
    </div>
  );
};

export default Dashboard;
