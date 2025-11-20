/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Source files
  ],
  theme: {
    extend: {
      colors: {
        light: {
          bg: '#f3f4f6',       // soft gray background
          card: '#f9fafb',     // slightly lighter for cards
          text: '#1f2937',     // gray-800 for text
        },
        dark: {
          bg: '#121212',
          card: '#1f1f1f',
          text: '#ffffff',
        },
        cyan: {
          50: '#E0FCFF',
          100: '#BEF8FD',
          200: '#87EAF2',
          300: '#54D1DB',
          400: '#38BEC9',
          500: '#2CB1BC',
          600: '#14919B',
          700: '#0E7C86',
          800: '#0A6C74',
          900: '#044E54',
        },
      },
      fontFamily: {
        sans: ['"Inter"', 'sans-serif'],
        cyber: ['"Orbitron"', 'sans-serif'], // Cyber futuristic font
      },
      boxShadow: {
        'neon-md': '0 4px 20px rgba(0, 255, 255, 0.2)',
        'neon-lg': '0 8px 40px rgba(0, 255, 255, 0.25)',
        'neon-inset': 'inset 0 0 8px rgba(0, 255, 255, 0.3)',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      keyframes: {
        flicker: {
          '0%, 19%, 21%, 23%, 25%, 54%, 56%, 100%': { opacity: 0.99 },
          '20%, 24%, 55%': { opacity: 0.4 },
        },
      },
      animation: {
        flicker: 'flicker 3s linear infinite',
      },
      backgroundImage: {
        'cyber-gradient': 'linear-gradient(135deg, #00fff0 0%, #0ff 100%)',
        'cyber-dark': 'linear-gradient(135deg, #041021, #061024)',
      },
    },
  },
  plugins: [],
};
