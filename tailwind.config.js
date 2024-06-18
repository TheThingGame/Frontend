/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        error: 'rgb(254 242 242 / 1)',
        textError: 'rgb(185 28 28 / 1)'
      }
    },
  },
  plugins: [require('@tailwindcss/forms'),function({ addUtilities }) {
    addUtilities({
      '.dialog-backdrop::backdrop': {
        'background': 'rgba(0, 0, 0, 0.3)',
      },
    }, ['responsive', 'hover'])
  },],
}

