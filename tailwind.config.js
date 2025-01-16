/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    safelist: [
      'bg-blue-300',
      'bg-gray-300',
      'cursor-pointer',
      'text-sm',
      'rounded-full',
      'px-4',
      'py-2',
      'font-semibold',
    ],
    container: {
      padding: {
        md: "10rem",
      },
    },
  },
  plugins: [],
};