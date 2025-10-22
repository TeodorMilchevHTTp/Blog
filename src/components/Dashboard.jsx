import AboutMe from './AboutMe';
import Projects from './Projects';
import WebsiteLinks from './WebsiteLinks';
import CurrencyAPI from './CurrencyAPI';
import ThemeToggle from './ThemeToggle';

import { Link } from 'react-router-dom';
import React from 'react';

const Navbar = () => (
  <nav className="flex justify-center space-x-6 mb-8">
    <Link to="/games" className="text-slate-300 hover:text-primary-100 transition">Games</Link>
    <Link to="/projects" className="text-slate-300 hover:text-primary-100 transition">Projects</Link>
    <Link to="/links" className="text-slate-300 hover:text-primary-100 transition">Website</Link>
    <Link to="/login" className="text-slate-300 hover:text-primary-100 transition">Login</Link>
  </nav>
);

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-[#121212] text-gray-800 dark:text-white transition-colors duration-500 px-6 py-12">

      <div className="max-w-4xl mx-auto space-y-16">
        {/* Header */}
        <header className="text-center">
          <div className="flex justify-end mb-4">
            <ThemeToggle />
          </div>
          <h1 className="text-4xl font-extrabold text-primary-100">Welcome to My Coding Portfolio</h1>
          <p className="mt-2 text-slate-500 dark:text-slate-400">Built with React + Tailwind CSS</p>
        </header>

        {/* Navbar */}
        <header>
          <Navbar />
        </header>

        {/* About Me Section */}
        <section className="bg-light-card dark:bg-[#1f1f1f] border border-gray-200 dark:border-white/10 rounded-xl p-6 shadow-lg transition-colors duration-500">
          <AboutMe />
        </section>

        {/* Projects Section */}
        <section className="bg-light-card dark:bg-[#1f1f1f] border border-gray-200 dark:border-white/10 rounded-xl p-6 shadow-lg transition-colors duration-500">
          <Projects />
        </section>

        {/* Currency API Section */}
        <section className="bg-light-card dark:bg-[#1f1f1f] border border-gray-200 dark:border-white/10 rounded-xl p-6 shadow-lg transition-colors duration-500">
          <h2 className="text-2xl font-semibold mb-4 text-primary-100 text-center">Live Exchange Rates</h2>
          <CurrencyAPI />
        </section>

        {/* Website Links Section */}
        <section className="bg-light-card dark:bg-[#1f1f1f] border border-gray-200 dark:border-white/10 rounded-xl p-6 shadow-lg transition-colors duration-500">
          <WebsiteLinks />
        </section>

        {/* Footer */}
        <footer className="text-center pt-12 border-t border-white/20 text-sm text-slate-500">
          &copy; {new Date().getFullYear()} Your Name. All rights reserved.
        </footer>
      </div>
    </div>
  );
};

export default Dashboard;
