// https://vitepress.dev/guide/custom-theme
import { h } from "vue";
import type { Theme } from "vitepress";
import DefaultTheme from "vitepress/theme";
import VueSocialSharing from "vue-social-sharing";
import SocialBlock from "../components/common/SocialBlock.vue";
import "./style.css";

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    });
  },
  enhanceApp({ app, router, siteData }) {
    // ...apply enhancements for the site.
    app.use(VueSocialSharing);
    app.component("SocialBlock", SocialBlock);
  },
} satisfies Theme;
