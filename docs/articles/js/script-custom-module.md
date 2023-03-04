# 如何只用一支 CDN 及 4行設定，讓瀏覽器讀懂 Typescript, React, Vue

<SocialBlock hashtags="javascript,babel,react,vue,typescript" />

## 前言
哈摟大家好，我是前端工程師 Johnny。

今天要來分享一個，我這半年來自己優化、自己用得很爽的開發工具，他叫做 [script-custom-module](https://www.npmjs.com/package/script-custom-module)，剛好最近假日有空，覺得不把它開源分享給大家一起爽，實在太對不起社會大眾，於是就用了上一篇提到的 [tsup](https://johnnywang1994.github.io/book/articles/js/tsup-tutorial.html) 把它包一包丟到 NPM 上了


## 背景介紹
這是一款讓開發者可以快速在瀏覽器端編譯 Typescript, React, Vue 的簡易原型開發工具，不是開發產品用的！！不是開發產品用的！！不是開發產品用的！！很重要必須說三次，在當今所有工具都走向預編譯的年代，瀏覽器端 runtime 編譯看起來很邪門，但本地原型開發的話...就隨便摟，我才不管什麼效能不效能，就只是 Local 開發好用方便就好

雖然像是 Vite 也可以一鍵生成 template 快速開發，但我就是不想裝那坨重力球 `node_modules`，就只為了搞一個 prototype 環境，個人認為實在是非常不值得浪費那記憶體空間，既然現在瀏覽器吃這麼多效能，何不把它好好利用拿來當現成的線上編譯器？？？（誤


## 使用方式

### React
先來看下使用方式吧，只要如下在我們的 `index.html` 加入「1行 CDN + 4行 Config」，我們就完成整個設定了
```html
<!-- index.html -->
<head>
  <script src="https://cdn.jsdelivr.net/npm/script-custom-module/dist/custom-script.global.js"></script>
  <script>
  // initialize custom modules and create importmap
  CustomScript.setup({
    entry: 'src/index.jsx',
    mode: 'react',
  });
  </script>
</head>
<body>
  <div id="app"></div>
</body>
```
接著建立我們的 entry `src/index.jsx`
```js
import React from 'react';
import { createRoot } from 'react-dom/client';

const App = () => {
  return (
    <>
      <h3>Title</h3>
      <p>Content</p>
    </>
  );
};

createRoot(document.getElementById('app')).render(<App />);
```
收工摟～就這樣，歡迎來到瀏覽器大編譯時代，我們成功把瀏覽器變成 webpack 了......


### Vue
Vue 也是一樣方式，只是把 entry 稍微修改下
```html
<!-- index.html -->
<head>
  <script>
  // initialize custom modules and create importmap
  CustomScript.setup({
    entry: 'src/index.js',
    mode: 'vue',
  });
  </script>
</head>
<body>
  <div id="app"></div>
</body>
```
接著是 `src/index.js`
```js
import { createApp } from 'vue';
import App from 'src/App.vue';

createApp(App).mount('#app');
```
最後是 `src/App.vue`
```html
<template>
  <div id="app">
    <Counter />
    <p @click="count += 1">Count: {{ count }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
// import other Vue SFC component
import Counter from 'src/Counter.vue';

const count = ref(0);
</script>
```

### All 模式
如果你實在是想搞大雜燴，一下 react 開發、一下 vue 開發展現神通本領的話，可以使用 `mode: all` 模式
```html
<!-- index.html -->
<head>
  <script>
  // initialize custom modules and create importmap
  CustomScript.setup({
    entry: 'src/index.jsx',
    mode: 'all',
  });
  </script>
</head>
<body>
  <div id="react-app"></div>
  <div id="vue-app"></div>
</body>
```
然後你就可以讓 React, Vue 同時在一個畫面裡 double fly~~
```js
import React from 'react';
import { createRoot } from 'react-dom/client';
import ReactApp from 'src/App.jsx';

import { createApp } from 'vue';
import VueApp from 'src/App.vue';

createRoot(document.getElementById('react-app')).render(<ReactApp />);
createApp(App).mount('#vue-app');
```

<SocialBlock hashtags="javascript,babel,react,vue,typescript" />

## 結語
這工具不建議在正式產品裡使用，除非你真的需要一個在線編譯沒有 server 支援的情境，不然盡量還是以預編譯去開發產品，工具本身只是方便本地開發好玩，今天分享就到這，希望大家會喜歡摟～:))

