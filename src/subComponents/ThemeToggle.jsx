import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

const ThemeToggle = () => {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`relative w-14 h-14 rounded-full flex items-center justify-center border-2 ${
        darkMode
          ? "border-cyan-500 bg-gradient-to-tr from-black/60 to-[#041022]"
          : "border-pink-400 bg-gradient-to-tr from-white/60 to-[#f0f8ff]"
      } shadow-neon hover:shadow-neonHover transition-all duration-300`}
      aria-label="Toggle theme"
    >
      <motion.div
        key={darkMode ? "moon" : "sun"}
        initial={{ rotate: 90, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        exit={{ rotate: -90, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className={`text-2xl ${darkMode ? "text-cyan-300" : "text-pink-500"}`}
      >
        {darkMode ? "🌙" : "☀️"}
      </motion.div>
    </button>
  );
};

export default ThemeToggle;
