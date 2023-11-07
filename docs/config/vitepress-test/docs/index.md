---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "Johnny Wang Blog"
  text: "前端工程師 Johnny 的 Coding 日記"
  tagline: "Welcome! Here is my personal blog"
  image:
    src: https://raw.githubusercontent.com/jwlearn1994/image-uploader/main/others/myblog/me2.jpeg
    alt: JohnnyWang
  actions:
    - text: Lets Go! →
      link: /articles/
      type: primary
---

<script setup>
import HomeFeatures from './.vitepress/components/home/HomeFeatures.vue'
</script>

<HomeFeatures />
