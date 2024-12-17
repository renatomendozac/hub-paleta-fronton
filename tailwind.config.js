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
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(-24px)' },
          '100%': { opacity: '1', transform: 'translateY(0px)', visibility: 'visible' }
        },
        fadeOut: {
          '0%': { opacity: '1', transform: 'translateY(0)', display: 'block' },
          '100%': { opacity: '0', transform: 'translateY(-24px)', visibility: 'hidden' }
        }
      },
      animation: {
        fadeIn: 'fadeIn 0.5s ease-out forwards',
        fadeOut: 'fadeOut 0.5s ease-out forwards'
      }
    }
  },
  plugins: []
}
