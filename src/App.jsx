import React, { useState, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Dashboard from './components/Dashboard';
import Games from './components/Games';
import Login from './components/Login';
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
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageWrapper><Dashboard user={user} /></PageWrapper>} />
          <Route path="/games" element={<PageWrapper><Games user={user} /></PageWrapper>} />
          <Route path="/login" element={<PageWrapper><Login setUser={setUser} /></PageWrapper>} />
        </Routes>
      </AnimatePresence>
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
