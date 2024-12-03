import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        blue0: "var(--blue0)",
        blue1: "var(--blue1)",
        blue2: "var(--blue2)",
        blue3: "var(--blue3)",
        blue4: "var(--blue4)",
        blue5: "var(--blue5)",
      },
      fontSize:{
        large: "40px",
        medium: "24px",
        small: "16px"
      },
      fontFamily:{
        robFont: "var(--roboto)"
      },
    },
  },
  plugins: [],
} satisfies Config;
