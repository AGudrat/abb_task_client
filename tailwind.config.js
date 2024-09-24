/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");
module.exports = {
  mode: "jit",
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/ui/**/*.{js,ts,jsx,tsx,mdx}",
    // "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    screens: {
      xs: "430px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1440px",
      "3xl": "1728px",
      nav: "1040px",
    },
    container: () => {
      return {
        padding: {
          DEFAULT: "16px",
          xs: "16px",
          sm: "32px",
          md: "48px",
          lg: "48px ",
          xl: "64px ",
          "2xl": "80px ",
        },
      };
    },
    extend: {
      backgroundImage: {
        'custom-gradient': 'linear-gradient(to right, #1d3951, #1d384f, #1e374d, #1e364b, #1e3549, #1f3448, #1f3346, #203245, #213044, #222f42, #232d41, #242c3f)',
      },
      height: {
        'screen-minus-32': 'calc(100vh - 32px)',
      },
      keyframes: {
        moveRight: {
          "0%": { transform: "translateX(100%)", opacity: 0.5 },
          "100%": { transform: "translateX(0)", opacity: 1 },
        },
        slideIn: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        slideOut: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(120%)' },
        },
      },
      animation: {
        moveRight: "moveRight 0.5s linear",
        slideIn: 'slideIn 0.5s ease-out forwards',
        slideOut: 'slideOut 0.5s ease-in forwards',
      },
      fontSize: {
        xs: "12px",
        sm: "14px",
        base: "16px",
        lg: "18px",
        xl: "20px",
        "2xl": "24px",
        "3xl": "30px",
        "4xl": "36px",
      },
      spacing: {
        128: "32rem",
        144: "36rem",
      },
      colors: {
        black:"#302c34",
        'black-light':"#403444",
        text: "#212529",
        borderColor: "#E5E6EB",
        gray: "#9CA3AF",
        light: "#9CA3AF",
      },
      borderRadius: {
        s: "10px",
        "4xl": "2rem",
      },
    },
  },
  plugins: [
    {
      tailwindcss: {},
      "postcss-import": {},
      "postcss-preset-env": {
        features: { "nesting-rules": false },
      },
    },
  ],
};
