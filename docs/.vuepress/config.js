import { defineUserConfig } from "vuepress";
import path from "path";

import react from "@vitejs/plugin-react";
import { viteBundler } from "@vuepress/bundler-vite";
import { defaultTheme } from '@vuepress/theme-default';
import { registerComponentsPlugin } from "@vuepress/plugin-register-components";
import { searchPlugin } from "@vuepress/plugin-search";
import ReactPlugin from "vuepress-plugin-react";
import MermaidPlugin from "./plugins/mermaid";
import sidebarConfig from "./sidebar";
import { description } from "../../package";

export default defineUserConfig({
  base: "/book/",
  lang: "zh-TW",
  title: "Johnny Wang Blog",
  description: description,

  head: [
    ["meta", { name: "theme-color", content: "#3eaf7c" }],
    ["meta", { name: "apple-mobile-web-app-capable", content: "yes" }],
    [
      "meta",
      { name: "apple-mobile-web-app-status-bar-style", content: "black" },
    ],
    [
      "meta",
      {
        name: "og:image",
        content:
          "https://raw.githubusercontent.com/jwlearn1994/image-uploader/main/2022/04/learn-to-code.jpeg",
      },
    ],
    // gtag.js
    // already load with GTM tag
    // [
    //   "script",
    //   { src: "https://www.googletagmanager.com/gtag/js?id=G-B1QJSJW3P3" },
    // ],
    // google adsense
    [
      "script",
      {
        src: "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5050343387449103",
        crossorigin: "anonymous",
      },
    ],
  ],

  bundler: viteBundler({
    viteOptions: {
      plugins: [react()],
    },
    vuePluginOptions: {},
  }),
  // theme: '@vuepress/theme-default',
  theme: defaultTheme({
    logo: "https://vuejs.org/images/logo.png",
    home: "/",
    repo: "johnnywang1994/book",
    repoLabel: "johnnywang/book",
    editLink: false,
    lastUpdated: true,
    navbar: [
      {
        text: "Articles",
        link: "/articles/",
      },
      {
        text: "Project",
        link: "/project/",
      },
      {
        text: "Live2d",
        link: "/live2d/",
      },
    ],
    sidebarDepth: 1,
    sidebar: sidebarConfig,
  }),

  /**
   * Apply plugins
   *
   * Ref：https://v2.vuepress.vuejs.org/zh/reference/plugin/register-components.html
   */
  plugins: [
    registerComponentsPlugin({
      componentsDir: path.resolve(__dirname, "./components"),
    }),
    searchPlugin({
      locales: {
        "/": {
          placeholder: "Search",
        },
      },
      searchMaxSuggestions: 10,
      isSearchable: (page) => page.path !== "/",
    }),
    MermaidPlugin(),
    ReactPlugin({
      name: "UseReact",
      componentsDir: path.resolve(__dirname, "./components-react"),
    }),
  ],
});
