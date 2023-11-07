import { defineConfig } from "vitepress";
import { description } from "../../package.json";
import sidebar from "./sidebar";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Johnny Wang Blog",
  description,
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
  themeConfig: {
    logo: "https://vuejs.org/images/logo.png",
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      { text: "Articles", link: "/articles/" },
    ],

    sidebar: sidebar,

    socialLinks: [
      { icon: "github", link: "https://github.com/johnnywang1994" },
    ],

    footer: {
      message: `
        Made by johnnywang with ❤️
        <br>
        <span>Contact Me:</span>
        <a href="mailto:wangjohnny1994@gmail.com">wangjohnny1994@gmail.com</a>
      `,
    },
  },
  lastUpdated: true,
});
