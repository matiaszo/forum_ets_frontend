import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        fadeInDown: "fadeInDown 0.3s ease-out forwards",
      },
      keyframes: {
        fadeInDown: {
          "0%": { opacity: "0", transform: "translateY(-50px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      colors: {
        blue0: "var(--blue0)",
        blue1: "var(--blue1)",
        blue2: "var(--blue2)",
        blue3: "var(--blue3)",
        blue4: "var(--blue4)",
        blue5: "var(--blue5)",
        alice: "var(--alice)",
        black: "var(--black)",
        'scrollbar-thumb': '#888888', 
        'scrollbar-track': '#f1f1f1',
      },
      scrollbar: ['rounded'],
      fontSize:{
        large: "40px",
        medium: "24px",
        small: "16px"
      },
      fontFamily:{
        robFont: "var(--roboto)"
      },
      screens: {
        'ml': '900px',
      }
    },
  },
  plugins: [require('tailwind-scrollbar')],
} satisfies Config;

