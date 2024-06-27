/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      textColor: {
        main: 'rgb(var(--foreground-rgb))',
        secondary: 'rgb(var(--background-rgb))'
      },
      backgroundColor: {
        main: 'rgb(var(--background-rgb))',
        secondary: 'rgb(var(--foreground-rgb))'
      }
    }
  },
  plugins: []
}
