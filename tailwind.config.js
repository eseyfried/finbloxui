/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/stories/Examples/**/*.{js,vue}",
    // "./stories/**/*.{js,ts,jsx,tsx}"
  ],
  darkMode: ['class', '[data-mode="dark"]'],
  theme: {
    extend: {},
  },
  plugins: [],
}

