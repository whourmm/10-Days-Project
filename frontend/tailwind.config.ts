import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        athiti: ["Athiti", "sans-serif"],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "custom-white": "#ECECEC",
      },
      backgroundImage: {
        'main-background': "url('/images/BackGround.svg')",
        'logo': "url('/images/Logo.svg')",
        'icon-background' : "url('url('/images/navbar/circle_bee.svg')')",

      },
      fontSize: {
        'xxs': '0.65rem', // Extra small font size
        'xxl': '1.75rem',
      },
      aspectRatio: {
        "tarot-card": "7/12",
      },
    },
  },
  plugins: [],
};
export default config;
