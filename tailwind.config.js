/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/stories/Examples/**/*.{js,vue}",
    "./src/**/*.{vue,js,ts,jsx,tsx,mdx}"
  ],
  darkMode: ['class', '[data-mode="dark"]'],
  theme: {
    extend: {
        keyframes: {
            slideDown: {
              from: { height: 0 },
              to: { height: 'var(--fb-collapsible-content-height)' },
            },
            slideUp: {
              from: { height: 'var(--fb-collapsible-content-height)' },
              to: { height: 0 },
            },
          },
          animation: {
            slideDown: 'slideDown 300ms cubic-bezier(0.87, 0, 0.13, 1)',
            slideUp: 'slideUp 300ms cubic-bezier(0.87, 0, 0.13, 1)',
          },
    },
  },
  plugins: [
    // require('@tailwindcss/forms'),
  ],
  corePlugins: {
    preflight: false,
  },
  prefix: 'tw-',
}

