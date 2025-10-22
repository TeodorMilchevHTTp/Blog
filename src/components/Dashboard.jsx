import AboutMe from './AboutMe';
import Projects from './Projects';
import WebsiteLinks from './WebsiteLinks';
import { Link } from 'react-router-dom';
import CurrencyAPI from './CurrencyAPI';
import React, { useState } from 'react';


//Navbar component could be added here for better structure
const Navbar = () => (
  <nav className="flex justify-center space-x-6 mb-8">
    <Link to="/games" className="text-slate-300 hover:text-primary-100 transition">Games</Link>
    <Link to="/projects" className="text-slate-300 hover:text-primary-100 transition">Projects</Link>
    <Link to="/links" className="text-slate-300 hover:text-primary-100 transition">Website</Link>
    <Link to="/login" className="text-slate-300 hover:text-primary-100 transition">Login</Link>
  </nav>
)

const Dashboard = () => {
  return (
    <div className="min-h-screen parallax-bg bg-gradient-to-br from-[#1b2d24] via-[#22362c] to-[#16231c] text-white px-6 py-12">
      <div className="max-w-4xl mx-auto space-y-16">
        <header className="text-center">
          <h1 className="text-4xl font-extrabold text-primary-100">Welcome to My Coding Portfolio</h1>
          <p className="mt-2 text-slate-400">Built with React + Tailwind CSS</p>
        </header>
        <header>
          <Navbar />
        </header>
        <AboutMe />
        <Projects />
        <section className="bg-[#1f2e26] border border-white/10 rounded-xl p-6 shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-primary-100 text-center">Live Exchange Rates</h2>
          <CurrencyAPI />
        </section>
        <WebsiteLinks />

        
        
        <footer className="text-center pt-12 border-t border-white/20 text-sm text-slate-500">
          &copy; {new Date().getFullYear()} Your Name. All rights reserved.
        </footer>
      </div>
    </div>
  );
};

export default Dashboard;
