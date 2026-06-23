/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'sys-neon': '#00f3ff',
        'sys-indigo': '#4f46e5',
        'sys-dark': '#0f172a',
        'sys-darker': '#020617',
        'sys-light': '#f8fafc',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
      }
    },
  },
  plugins: [],
}
