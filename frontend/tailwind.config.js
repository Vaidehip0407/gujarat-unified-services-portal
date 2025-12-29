/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Gujarat Theme Colors
        primary: {
          50: '#ECFDF5',
          100: '#D1FAE5',
          200: '#A7F3D0',
          300: '#6EE7B7',
          400: '#34D399',
          500: '#047857', // Main Emerald Green
          600: '#065F46',
          700: '#064E3B',
          800: '#022C22',
          900: '#014737',
        },
        secondary: {
          50: '#EFF6FF',
          100: '#DBEAFE',
          200: '#BFDBFE',
          300: '#93C5FD',
          400: '#60A5FA',
          500: '#1E40AF', // Navy Blue
          600: '#1E3A8A',
          700: '#1D4ED8',
          800: '#1E40AF',
          900: '#172554',
        },
        accent: {
          500: '#DC2626', // Gujarat Red
          600: '#B91C1C',
        },
        gujarat: {
          green: '#047857',
          blue: '#1E40AF',
          red: '#DC2626',
          gold: '#F59E0B',
          cream: '#ECFDF5',
          forest: '#064E3B',
        }
      },
    },
  },
  plugins: [],
}
