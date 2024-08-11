import daisyui from "daisyui";
import Typography from "@tailwindcss/typography";
import Scrollbar from "tailwind-scrollbar";

/** @type {import("tailwindcss").Config} */
export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  plugins: [
    daisyui,
    Typography(),
    Scrollbar({
      nocompatible: true,
      preferredStrategy: "pseudoelements",
    }),
  ],
  future: {
    hoverOnlyWhenSupported: true,
  },
  daisyui: {
    themes: [
      {
        light: {
          primary: "#43bfde",
          "primary-content": "#ffffff",
          secondary: "#000000",
          "secondary-content": "#ffffff",
          accent: "#43bfde",
          "accent-content": "#ffffff",
          neutral: "#dcdcdc",
          "neutral-content": "#525252",
          "base-100": "#ffffff",
          "base-200": "#eeeeee",
          "base-300": "#cbcbcb",
          "base-content": "#141414",

          "--rounded-box": "1.5rem",
          "--rounded-btn": "1.5rem",
          "--rounded-badge": "0.75rem",
          "--animation-btn": "0.25s",
          "--animation-input": "0.2s",
          "--btn-focus-scale": "0.95",
          "--border-btn": "1px",
          "--tab-border": "1px",
          "--tab-radius": "0.5rem",
        },
      },
    ],
  },
};
