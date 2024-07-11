/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      colors: {
        green: {
          200: '#a7f3d0',
          500: '#10b981',
        },
        red: {
          200: '#fecaca',
          500: '#ef4444',
        },
        yellow: {
          500: '#f59e0b',
        },
        gray: {
          300: '#d1d5db',
          500: '#6b7280',
        },
        custom: {
          white: '#EEEDEB',
          peach: '#E6B9A6',
          gray: '#939185',
          blue: '#2F3645',
        },
      },
    },
  },
  plugins: [],
}

