import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle = () => {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative w-12 h-12 rounded-full flex items-center justify-center focus:outline-none transition-colors"
      aria-label="Toggle theme"
    >
      <motion.div
        key={darkMode ? 'moon' : 'sun'}
        initial={{ rotate: 90, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        exit={{ rotate: -90, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="text-2xl"
      >
        {darkMode ? '🌙' : '☀️'}
      </motion.div>
    </button>
  );
};

export default ThemeToggle;
