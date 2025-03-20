import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      '.scrollbar-hide': {
      /* Firefox */
      'scrollbar-width': 'none',
      /* IE and Edge */
      '-ms-overflow-style': 'none',
      /* Chrome, Safari and Opera */
      '&::-webkit-scrollbar': {
        display: 'none'
      }
    },
      fontFamily: {
        athiti: ["Athiti", "sans-serif"],
        "fredericka-the-great": ["Fredericka the Great", "cursive"],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "custom-white": "#ECECEC",
        "jet": "#2E2E2E",
        "pink" : "#FF2D55",
        "green" : "#34C759",
        "blue" : "#34C759",
        "orange" : "#FF9500",
        "yellow" : "#FFCC00",
        "purple" : "#AF52DE",
        "cosmic-latte" : "#FAF3E0",
        "vidva" : "#8B2332",
        "raw-umber" : "#885E3C" 
      },
      backgroundImage: {
        'desktop-background': "url('/svgs/bg-tile.svg')",
        'main-background': "url('/images/BackGround.svg')",
        'logo': "url('/images/Logo.svg')",
        'icon-background' : "url('url('/images/navbar/circle_bee.svg')')",
      },
      backgroundSize: {
        'full': 'cover',
        'auto': 'auto',
        'custom-size': '200% 100%',
        // Add more custom sizes if needed
      },
      backgroundPosition: {
        'bottom-4': 'center bottom 1rem',
        'top-center': 'center top',
        // Add more custom positions if needed
      },
      fontSize: {
        'xxs': '0.65rem', // Extra small font size
        'xxl': '2.00rem',
        'md' : '1.40rem',
        'tag' : '1.2rem',
        'header' : '2.5rem',
      },
      aspectRatio: {
        "tarot-card": "7/12",
      },
      lineHeight: {
        // Custom line height values
        'extra-tight': '1.1',
        'tight': '1.25',
        'normal': '1.5',
        'loose': '1.75',
        'extra-loose': '2',
      },
      animation: {
        'spin-y-3': 'spin-y-3 2s ease-in-out forwards',
      },
      keyframes: {
        'spin-y-3': {
          '0%': { transform: 'rotateY(0deg)' },
          '100%': { transform: 'rotateY(1080deg)' },
        },
      },
      transitionDuration: {
        '2000': '2000ms',
      },
    },
  },
  plugins: [],
};
export default config;
