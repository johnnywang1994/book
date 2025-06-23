import type { Config } from "tailwindcss";

const defaultFontFamily = [
  "Noto Sans TC",
  "PingFang TC",
  "ui-sans-serif",
  "system-ui",
];

const config: Config = {
  // https://tailwindcss.com/docs/configuration#prefix
  prefix: "tw-",
  // https://tailwindcss.com/docs/preflight#disabling-preflight
  corePlugins: {
    preflight: false,
  },
  content: [
    "./docs/.vuepress/components/**/*.vue",
    "./docs/.vuepress/components-react/**/*.jsx",
    "./docs/.vuepress/layout/**/*.vue",
    "./docs/.vuepress/styles/**/*.scss",
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
};
export default config;
