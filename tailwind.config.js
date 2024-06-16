/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-400": "hsl(259, 100%, 65%)",
        "primary-200": "hsl(0, 100%, 67%)",
        "of-white": "hsl(0, 0%, 94%)",
        "light-grey": "hsl(0, 0%, 86%)",
        "smoke-grey": "hsl(0, 1%, 44%)",
        "of-black": "hsl(0, 0%, 8%)",
      },
      fontFamily: {
        poppins: ['"Poppins", sans-serif'],
      },
      borderRadius: {
        calculator: [".5rem .5rem 8.875rem .5rem"],
      },
      width: {
        small: "22.125rem",
        medio: "32.5rem",
        large: "37.5rem",
      },
    },
  },
  plugins: [],
};
