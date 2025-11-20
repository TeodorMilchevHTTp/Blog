import React, { useState, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Dashboard from './components/Dashboard';
import Games from './components/Games';
import Login from './components/Login';
import CVRequest from './components/CVRequest'
import Links from './components/Links';
import Forum from './components/Forum';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  const location = useLocation();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Load user from localStorage
    const savedUser = localStorage.getItem('user');
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  return (
    <ThemeProvider>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Dashboard user={user} />} />
        <Route path="/games" element={<Games user={user} />} />
        <Route path="/cv" element={<CVRequest />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/links" element={<Links user={user} />} />
        <Route path="/forum" element={<Forum />} />
      </Routes>
    </ThemeProvider>
  );
}

const PageWrapper = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.3 }}
  >
    {children}
  </motion.div>
);

export default App;
