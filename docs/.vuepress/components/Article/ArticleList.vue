<script setup>
import { computed } from 'vue'
import { useSidebarItems } from '@vuepress/theme-default/client'

const sidebarItems = useSidebarItems()

const flatChildren = (arr) => {
  const result = [];
  for (let item of arr) {
    if (!!item.children?.length) {
      result.push(...flatChildren(item.children));
      continue;
    }
    result.push(item);
  }
  return result;
};

const routeItems = computed(() => flatChildren(sidebarItems.value));

const newItems = [{
  text: '2024 CSS 年度報告筆記',
  link: '/articles/css/2024-css-report.html',
}, {
  text: '用 Web Container 打造自己的線上 NodeJS 開發環境',
  link: '/articles/js/web-container.html',
}, {
  text: '如何不用 setTimeout 幫 display: none 的 DOM 加動畫',
  link: '/articles/css/starting-style.html',
}, {
  text: '在電腦裡搞一個 RWKV AI 小助手',
  link: '/articles/js/rwkv-intro.html',
}, {
  text: '遊戲 App 素材解包學習紀錄',
  link: '/articles/js/extract-assets-from-app.html'
}, {
  text: '動手自己做一個 ChatGPT UI 工具吧',
  link: '/articles/js/create-own-chatgpt-ui.html'
}, {
  text: 'Create a React Server Components Project without NextJS - 製作一個不依賴 NextJS 的 React Server Components 專案',
  link: '/articles/js/react-rsc-without-nextjs.html',
}];
</script>

<template>
  <div class="blog-article">
    <h2>最新文章</h2>
    <div class="blog-article-list">
      <div v-for="item in newItems" :key="`art_${item.link}`" class="blog-article-item">
        <a :href="`/book${item.link}`" target="_blank">{{ item.text }}</a>
      </div>
    </div>
    <h2>所有文章</h2>
    <div class="blog-article-list">
      <div v-for="item in routeItems" :key="`art_${item.link}`" class="blog-article-item">
        <a :href="`/book${item.link}`" target="_blank">{{ item.text }}</a>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.blog-article-list {
  display: flex;
  flex-direction: column;
  .blog-article-item {
    padding: 4px;
  }
}
</style>