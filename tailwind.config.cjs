/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#0052CC",
          50: "#F0F6FF",
          100: "#E0EDFF",
          200: "#C2DBFF",
          300: "#8FBFFF",
          400: "#4D9AFF",
          500: "#0052CC",
          600: "#0047B8",
          700: "#003A96",
          800: "#002E78",
          900: "#00235C",
          950: "#001A45",
        },
        surface: "#F9FAFB",
        muted: "#64748B",
      },
      boxShadow: {
        "xs": "0 1px 2px 0 rgba(0, 0, 0, 0.02)",
        soft: "0 2px 16px -2px rgba(0, 0, 0, 0.06)",
        "soft-lg": "0 12px 40px -12px rgba(0, 0, 0, 0.1)",
        "soft-xl": "0 20px 60px -16px rgba(0, 0, 0, 0.12)",
        "inner-soft": "inset 0 1px 3px 0 rgba(0, 0, 0, 0.03)",
      },
      backgroundImage: {
        "hero-gradient": "linear-gradient(180deg, #FAFBFC 0%, #F8F9FA 100%)",
        "cta-gradient": "linear-gradient(135deg, rgba(0, 82, 204, 0.04) 0%, transparent 60%)",
        "card-shine": "linear-gradient(115deg, transparent 40%, rgba(255, 255, 255, 0.4) 50%, transparent 60%)",
      },
      borderRadius: {
        "4xl": "2rem",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        pulse: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.7" },
        },
        "bounce-soft": {
          "0%, 100%": { transform: "translateY(-5%)" },
          "50%": { transform: "translateY(0)" },
        },
        "slide-in-left": {
          "0%": { opacity: "0", transform: "translateX(-20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "slide-in-right": {
          "0%": { opacity: "0", transform: "translateX(20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.9)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "rotate-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "wiggle": {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
        "glow": {
          "0%, 100%": { boxShadow: "0 0 5px rgba(0, 82, 204, 0.2)" },
          "50%": { boxShadow: "0 0 20px rgba(0, 82, 204, 0.4)" },
        },
        "typewriter": {
          "from": { width: "0" },
          "to": { width: "100%" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "float-slow": "float 8s ease-in-out infinite",
        "float-fast": "float 4s ease-in-out infinite",
        fadeUp: "fadeUp 500ms ease-out both",
        fadeIn: "fadeIn 400ms ease-out both",
        shimmer: "shimmer 2s linear infinite",
        pulse: "pulse 2s ease-in-out infinite",
        "bounce-soft": "bounce-soft 2s ease-in-out infinite",
        "slide-in-left": "slide-in-left 500ms ease-out both",
        "slide-in-right": "slide-in-right 500ms ease-out both",
        "scale-in": "scale-in 400ms ease-out both",
        "rotate-slow": "rotate-slow 20s linear infinite",
        wiggle: "wiggle 1s ease-in-out infinite",
        glow: "glow 2s ease-in-out infinite",
      },
      transitionDuration: {
        "250": "250ms",
        "350": "350ms",
      },
      transitionTimingFunction: {
        "smooth": "cubic-bezier(0.4, 0, 0.2, 1)",
        "bounce-soft": "cubic-bezier(0.34, 1.56, 0.64, 1)",
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")],
};
