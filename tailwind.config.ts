import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#080b11",
        card: "rgba(17, 25, 40, 0.75)",
        artifact: {
          gold: "#f59e0b",
          orange: "#ea580c",
          indigo: "#6366f1",
          violet: "#8b5cf6",
          dark: "#0b0f19",
          border: "rgba(255, 255, 255, 0.08)",
          hoverBorder: "rgba(255, 255, 255, 0.15)",
        }
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "artifact-glow": "linear-gradient(to bottom right, #6366f1, #ea580c)",
        "gold-glow": "linear-gradient(to right, #f59e0b, #ea580c)",
        "purple-glow": "linear-gradient(to right, #8b5cf6, #d946ef)",
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 6s ease-in-out infinite",
        "glow-pulse": "glow 4s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        glow: {
          "0%, 100%": { opacity: "0.6", filter: "drop-shadow(0 0 15px rgba(99, 102, 241, 0.4))" },
          "50%": { opacity: "1", filter: "drop-shadow(0 0 25px rgba(234, 88, 12, 0.6))" },
        }
      }
    },
  },
  plugins: [],
};
export default config;
