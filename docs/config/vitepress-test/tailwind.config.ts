import type { Config } from "tailwindcss";

const defaultFontFamily = [
  "Noto Sans TC",
  "PingFang TC",
  "ui-sans-serif",
  "system-ui",
];

const config: Config = {
  prefix: "tw-",
  content: [
    "./docs/.vitepress/**/*.js",
    "./docs/.vitepress/**/*.vue",
    "./docs/.vitepress/**/*.ts",
  ],
  theme: {
    fontFamily: {
      sans: defaultFontFamily,
    },
    extend: {
      height: {
        unset: "unset",
      },
      colors: {
        vue: {
          green: "#3eaf7c",
        },
        vc: {
          blue: "var(--vp-c-brand-1)",
        },
      },
    },
  },
  plugins: [],
  options: {
    safelist: ["html", "body"],
  },
};
export default config;
