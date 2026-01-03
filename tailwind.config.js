/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: '1rem',
    },
    extend: {
      colors: {
        primary: {
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
        },
        cyan: {
          DEFAULT: '#06b6d4',
          600: '#0891b2'
        },
        rose: {
          DEFAULT: '#ff6b9f'
        },
        neutral: {
          50: '#fafafa',
          100: '#f5f5f5',
          900: '#0b0f1a'
        }
      },
      fontFamily: {
        sans: ['ui-sans-serif', 'system-ui', 'Inter', 'Segoe UI', 'Helvetica', 'Arial'],
      }
    },
  },
  plugins: [],
}

