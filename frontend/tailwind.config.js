/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,jsx,mdx}',
    './components/**/*.{js,jsx,mdx}',
    './app/**/*.{js,jsx,mdx}',
    './src/**/*.{js,jsx,mdx}',
    './globals.css',
  ],
  theme: {
    extend: {
      colors: {
        practoBlue: '#2563eb',
        lightBlue: '#e0f2ff',
        darkText: '#1e293b',
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
