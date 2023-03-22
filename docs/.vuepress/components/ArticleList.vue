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
  text: '用 tsup 快速建立 Typescript 開發環境',
  link: '/articles/js/tsup-tutorial.html',
}, {
  text: '開發 Email EDM 你可以更輕鬆',
  link: '/articles/js/edm-generator.html',
}, {
  text: '關於我的 Side project - Maju Web Editor',
  link: '/articles/js/maju-web-ide.html',
}, {
  text: '什麼是真相，真相是什麼',
  link: '/articles/daily/2022/the-truth.html',
}, {
  text: '身為一位歷史觀察者（文長慎入）',
  link: '/articles/daily/2022/as-an-observer.html',
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