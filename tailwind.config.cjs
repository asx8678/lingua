/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#0052CC",
          50: "#E6F0FF",
          100: "#CCE0FF",
          200: "#99C2FF",
          300: "#66A3FF",
          400: "#3385FF",
          500: "#0052CC",
          600: "#0047B3",
          700: "#003D99",
          800: "#003380",
          900: "#002966",
        },
        surface: "#F8FAFC",
      },
      boxShadow: {
        soft: "0 10px 40px -10px rgba(2, 6, 23, 0.1)",
        "soft-lg": "0 20px 50px -15px rgba(2, 6, 23, 0.12)",
      },
      backgroundImage: {
        "hero-gradient": "linear-gradient(160deg, #f8fafc 0%, #f1f5f9 40%, #ffffff 100%)",
        "cta-gradient": "linear-gradient(135deg, rgba(0, 82, 204, 0.08) 0%, rgba(0, 82, 204, 0.03) 50%, white 100%)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        float: "float 7s ease-in-out infinite",
        fadeUp: "fadeUp 600ms ease-out both",
        shimmer: "shimmer 2.2s linear infinite",
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")],
};
