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
  text: '從 Mock Service Worker 源碼中學習',
  link: '/articles/js/learn-from-msw-source-code.html',
}, {
  text: '快速上手 NextJS v13 - Data Fetching, Caching, Revalidating 篇',
  link: '/articles/js/next13-intro-datafetching.html',
}, {
  text: "擺脫 Node modules 地獄，擁抱 Yarn Plug'n'Play(PnP)",
  link: '/articles/js/yarn-pnp.html',
}, {
  text: 'Rendering Patterns 渲染模式介紹',
  link: '/articles/memo/patterns/render/introduction.html',
}, {
  text: '快速上手 NextJS v13 - 基礎觀念 AppRouter 篇',
  link: '/articles/js/next13-intro-approuter.html',
}, {
  text: '用 Socket.io 搭配 Matterjs 製作一款 Real-Time Canvas 聊天室（文長慎入）',
  link: '/articles/js/maju-chat-game.html',
}, {
  text: '用 tsup 快速建立 Typescript 開發環境',
  link: '/articles/js/tsup-tutorial.html',
}, {
  text: '關於我的 Side project - Maju Web Editor',
  link: '/articles/js/maju-web-ide.html',
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