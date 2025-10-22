/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",  // Adjust this path to your source files
    
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
      }
    }
  }
},
  plugins: [],
}
