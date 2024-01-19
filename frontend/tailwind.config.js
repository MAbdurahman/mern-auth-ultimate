/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        heading: ['PT Serif', 'serif'],
        body: ['PT Sans', 'sans-serif'],
        monospace: ['PT Mono', 'monospace']
      },
      colors: {
        primary: "#171717",
        secondary: "#272727",
        "dark-subtle": "rgba(255, 255, 255, 0.5)",
        "light-subtle": "rgba(39, 39, 39, 0.7)",
      },
      keyframes: {
        bounce: {
          'from, to': {transform: 'scale(1, 1)'},
          '25%': {transform: 'scale(0.9, 1.1)'},
          '50%': {transform: 'scale(1.1, 0.9)'},
          '75%': {transform: 'scale(0.95, 1.05)'}
        },
      },
      animation: {
        'notification-bounce': 'bounce 0.5s infinite',
      },
    },
  },
  plugins: [],
}