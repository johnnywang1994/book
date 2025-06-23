# 如何在 Vuepress 裡快樂寫 React

<SocialBlock hashtags="vuepress,react,plugin,vuepress-plugin" />

Hi 大家好，我是 Johnny，今天這篇主要只是介紹我最近寫的一個 Vuepress Plugin - [vuepress-plugin-react](https://www.npmjs.com/package/vuepress-plugin-react)，針對的是 Vuepress v2(寫這文章時正在 `beta.67` 版本)

## 前言
使用 React 開發以來大概 3年，大致上對 React 稍微比較熟了，最近就開始想用 React 來做些小東西，如果可以一起放到 Blog 中，那該有多好啊～秉持著 Vue, React 都用了 3年左右的經驗，想來搞點好玩的事情～我想「讓 Vuepress 渲染 React component」!!

可惜我在網路上找了半天沒有看到現成的 Vuepress Plugin 可以 import React component 並渲染在 Markdown 裡，不是 Vuepress 依賴版本太舊（v1.0），就是不符合我的使用需求，雖然這麼做對於效能有很大程度的影響，畢竟同時載入兩個框架，但我還是很想在 Vuepress 現有方便的架構上，使用熟悉的 React 開發，不為別的，純屬好玩~!


## 動手實作！
既然目前沒有現成合適的 Plugin 可以用，直接從頭寫一個 Plugin 太費力了，對於一個懶人如我，決定直接找個最接近我心目中的結構來改吧！我選上了 Vuepress 本身官方提供的 [@vuepress/plugin-register-components@next](https://github.com/vuepress/vuepress-next/tree/main/ecosystem/plugin-register-components)

整理一下思路，我們要解決的問題如下
- 處理 JSX import(webpack 透過 `babel-loader`, vite 可以用現成 `@vitejs/plugin-react`)
- 如何掛載 React Component 到 Vuepress
- 透過現成的架構做到批量引入 React component 並註冊到一個統一的入口使用

### 處理 JSX import
在 Vuepress 中使用 ViteBundler，要讓我們可以 import `.jsx` 檔案則需要安裝 `@vitejs/plugin-react`，修改 Vuepress config 如下
```js
import { defineUserConfig } from "vuepress";
import { viteBundler } from "@vuepress/bundler-vite";
import react from "@vitejs/plugin-react";
import ReactPlugin from "vuepress-plugin-react";
import path from 'path';

export default defineUserConfig({
  bundler: viteBundler({
    viteOptions: {
      plugins: [react()],
    },
  }),
});
```

### 渲染 React Component
解決了 jsx import 的問題後，接著需要思考的是：我們的 React Component 該怎麼方便的掛載到畫面上？

我們知道 Vuepress 中的 markdown render 過程是直接透過內建的流程機制管理，對於客製化 Component(非原生 HTML tag) 會首先被解析成 Vue component，而 Vue component 可以在 [client config](https://v2.vuepress.vuejs.org/guide/configuration.html#client-config-file) 中註冊到全局使用

到此思路已經清晰了，如果我們要動手去修改 Vuepress markdown render 的層面（理論上是可行的），但個人認為這麼做的成本太高了，不僅牽涉到更多 Vuepress 底層的架構閱讀與改動，實作難度也會大幅提升，即使完成後的開發體驗上絕對會更絲滑，我決定直接透過現有的 Vue component 註冊機制去註冊一個專門渲染我們 React Component 的組件，透過 Vuepress 對 Vue component 的生命週期控制來完成 React component 的掛載與卸載，對原本 markdown render 的機制破壞度也較小

以下是簡單的實作：

- 寫一個 React component - Counter
```jsx
import { useState } from "react";

const Counter = () => {
  const [count, setCount] = useState(0);
  return (
    <div>
      Count: {count}
      <button onClick={() => setCount(count + 1)}>ADD</button>
    </div>
  );
};

export default Counter;
```
- 寫一個 Vue component  
為求方便，直接寫成 js object 型態方便後續跟其他 JS 檔案做交互，這個 Vue Component 的用途只是一個橋樑，讓我們的 React component 能順利掛載到畫面上，來一個借屍還魂！
```js
import { h, ref, onMounted, onBeforeUnmount } from 'vue';
import { createRoot } from "react-dom/client";

import Counter from './Counter';

const VueReact = {
  setup() {
    const rootRef = ref(null);
    const renderRoot = ref();

    onMounted(() => {
      try {
        renderRoot.value = createRoot(rootRef.value);
        renderRoot.value?.render(<Counter />);
      } catch(err) {
        console.error(err);
      }
    });

    onBeforeUnmount(() => {
      renderRoot.value?.unmount(); // react 18
    });

    return () => h("div", { ref: rootRef });
  }
};

export default VueReact;
```
- 透過 `app.component` 註冊到 `.vuepress/client.js`
```js
import { defineClientConfig } from "@vuepress/client";
import VueReact from './VueReact';

export default defineClientConfig({
  enhance: ({ app }) => {
    app.component('VueReact', VueReact);
  },
})
```
- 接著就可以快樂的在 markdown 裡透過我們的 Vue component 把 react component 借殼上市拉～
```markdown
# 借殼上市的 React Component

<VueReact />
```

### 動態渲染
眼尖的讀者會發現，上面這樣的寫法，難不成我寫一個 React component 都要搞一個空殼 Vue component 嗎？會不會太麻煩了？

所以接下來要做的，就是讓 `VueReact` 具備動態根據需求渲染多種 React Component 的能力
```js
import { h, ref, onMounted, onBeforeUnmount } from 'vue';
import { createRoot } from "react-dom/client";

import Counter from './Counter';

const ReactComponents = {
  // add more components here...
  Counter,
};

const VueReact = {
  props: {
    as: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const rootRef = ref(null);
    const renderRoot = ref();

    // 動態根據傳入的 prop as 決定要渲染的 React component
    const ReactComponent = ReactComponents[props.as];

    onMounted(() => {
      if (!!ReactComponent) {
        try {
          renderRoot.value = createRoot(rootRef.value);
          renderRoot.value?.render(<ReactComponent />);
        } catch(err) {
          console.error(err);
        }
      }
    });

    onBeforeUnmount(() => {
      renderRoot.value?.unmount(); // react 18
    });

    return () => h("div", { ref: rootRef });
  }
};
```
使用時
```markdown
# 借殼上市的 React Component

<VueReact as="Counter" />
```

大功告成拉～我們成功在 Vuepress 裡把 React component 搞上去拉 XD!!


## 實際示範
下面這是一個安裝了 Plugin 後，用 React component render 出來剛剛上面的 Counter 範例
<UseReact as="Counter" />

<div style="margin-bottom: 40px"></div>

<SocialBlock hashtags="vuepress,react,plugin,vuepress-plugin" />

## 結論
大致上的邏輯概念就這樣子=V=，當然實際封裝成 Vuepress Plugin 又是另一回事了，歡迎有興趣了解的直接點擊[查看我的原始碼](https://github.com/johnnywang1994/vuepress-plugin-react/tree/master)，那今天的分享就先到這邊拉～歡迎各位讀者實際安裝 Vuepress 並下載來玩玩看吧！下篇文章見拉

