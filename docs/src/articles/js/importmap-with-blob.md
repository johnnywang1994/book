# 在瀏覽器中直接 import Vue SFC 開發起來

<SocialBlock hashtags="javascript,esmodule,import,vue" />

今天這篇是一個看到大佬文章後的研究文，主題是有關於如何在同一份 html 內使用 import 來引入同一份文件下的其他模組，看完真的是跪了，真的是非常騷的操作，本篇會簡單說明大綱並加上一些我自己的實現，原文詳細內容[請見這邊](https://juejin.cn/post/7070339012933713956)


## 背景

現代瀏覽器大部分都支援 ESModule 了，然而撇除像 Vite, Snowpack 這樣在 server 環境代為編譯的工具外，在使用 pure ESModule 開發時，我們無法直接引入在同一份文件下的其他模組，比如下面

```html
<script type="module" id="foo">
export default {
  value: 'hello'
};
</script>
<script type="module" id="bar">
import foo from 'foo';

console.log(foo.value);
</script>
```

雖然在開發伺服器環境下，我們可能不需要這樣使用，可以直接透過 import 絕對路徑取得模組，但在像是 codepen 或是自己玩玩的小專案時，我們不一定可以把模組拆開來放到其他路徑上，這時這種 `inline es module` 的使用就可以派上用場了


## 想法探討

在實現上我們會遇到幾個問題

1. 如果使用原生的 `type="module"` 會直接被瀏覽器解析，我們希望能統一處理這些特殊 inline module，可以使用客製化的 script type，這邊使用 `type="inline-module"` 來標記

2. 受限於 pure ESModule 必須使用 url 引入這個特點，我們需要把 inline 的 module 內容轉成 url 後，對該轉換後的 url 進行 import 來達成，此時可以借助 `Blob` 的神奇力量來將文字內容轉換為 url 的形式

### 實現文字轉為 url 的部分
```js
function getBlobURL(content, type = 'text/javascript') {
  const blob = new Blob([content], { type });
  return URL.createObjectURL(blob);
}
```

3. 完成後我們需要判斷我們的 `inline-module` 究竟內部有沒有東西，還是他有 `src` 需要進一步對內容進行請求，在拿到內容後使用上面的函數來將內容轉為 url，這樣後續我們在使用時只需要 import 那個 blobUrl 就可以使用該模組了


## 初步實現

以了想法後開始動手實際實現一下功能吧！因為是初步實現，可以先以達成目的為優先，後續再慢慢來優化

```js
// 存放經由 blob 轉換後的模組 url 路徑
const blobUrlMap = {};

// 我們的主角～
async function inlineImport(moduleId) {
  let blobUrl;

  if (moduleId in blobUrlMap) {
    // 解析過的直接拿
    blobUrl = blobUrlMap[moduleId];
  } else {
    // 還沒解析的進行轉換
    const module = document.querySelector(`script[type="inline-module"]${moduleId}`);
    if (module) {
      blobUrl = getBlobURL(module.innerHTML);
      blobUrlMap[moduleId] = blobUrl;
    }
  }

  if (blobUrl) {
    // 動態載入
    const result = await import(blobUrl);
    return result;
  }
  return null;
}
```

上面的實現，主要是根據我們前面的想法一步一步實現出來，從我們的客製化模組內取得文字內容後，交給 Blob 轉為 Url 並儲存進暫存當中，最後透過動態 import 的方式將內容取出

實際用用看

```html
<script type="inline-module" id="foo">
  export default {
    value: 'foo'
  }
</script>
<script src="easy-core.js"></script>
<script type="module">
  const foo = (await inlineImport('#foo')).default;
  console.log(foo);
</script>
```

可以在 console 看到正確印出了 `{ value: 'foo' }`，大功告成～



還沒還沒，都實現到這邊了，怎麼可以不往下繼續深入優化一波？

到這邊，我們來整理下有哪些可以執行的優化看看：

1. 動態 inlineImport 希望能改成靜態的 `import xxx from 'xxx'`
2. 內容除了 `innerHTML`，也希望可以加入 `src` 從外部載入


## 優化-1 靜態載入

這裡可以使用 `importmap` 這個上網查了下居然已經存在一小段時間的東西（沒啥人知道的感覺，畢竟沒怎麼看到討論），使用原生 esmodule 時，我們必須引入完整的路徑網址，但 CDN 路徑往往很長，如果每次要使用都重新寫一遍真的很痛苦，`importmap` 顧名思義就是讓我們能用一個 map 來映射對照到指定的路徑去，這樣在使用時我們就不必每次都輸入很長的網址

使用範例像是這樣，是不是非常精簡？

```html
<script type="importmap">
  {
    "imports": {
      "vue": "https://unpkg.com/vue@3/dist/vue.esm-browser.js"
    }
  }
</script>

<script type="module">
import {createApp} from 'vue';
</script>
```

但要特別注意的是，`importmap` 有兩個限制

1. 必須在所有 `import` 發生前先定義，如果有任何 `import` 在他前面已經執行的話，就會出現錯誤
2. 一個 html 目前只支援一個 `importmap`，多個出現時會跳出錯誤提示

礙於這個限制可能會導致一些開發上的困擾，我們可以用 js 動態產生 `importmap`，並建立一個客製化 importmap 的機制 `inline-module-importmap`

```js
const currentScript = document.currentScript || document.querySelector('script');

const map = { imports: {} };

function getBlobURL(content, type = 'text/javascript') {
  const blob = new Blob([content], { type });
  return URL.createObjectURL(blob);
}

function setupInlineModule() {
  // 取得所有 inline-module
  const modules = document.querySelectorAll('script[type="inline-module"]');
  let importMap = {};

  [...modules].forEach((module) => {
    const { id } = module;
    if (id) {
      // 取得所有 inline-module 的 blobUrl 並儲存
      importMap[id] = getBlobURL(module.innerHTML);
    }
  })

  // 檢查是否已存在 importmap
  const importMapEl = document.querySelector('script[type="importmap"]');
  if (importMapEl) {
    throw Error('importmap already defined');
  }

  // 檢查是否有自定義的 importmap
  const externalMapEl = document.querySelector('script[type="inline-module-importmap"]');
  if (externalMapEl) {
    const externalMap = JSON.parse(externalMapEl.textContent);
    Object.assign(map.imports, externalMap.imports);
  }

  // 合併提取出的所有 import url 到 map 當中
  Object.assign(map.imports, importMap);

  // 將 importmap 動態插入 document
  const mapEl = document.createElement('script');
  mapEl.setAttribute('type', 'importmap');
  mapEl.textContent = JSON.stringify(map);
  currentScript.after(mapEl);
}

setupInlineModule();
```

動態產生 importmap 後我們就可以使用靜態 import 如下了！

```html
<script type="inline-module-importmap">
  {
    "imports": {
      "vue": "https://unpkg.com/vue@3/dist/vue.esm-browser.js"
    }
  }
</script>

<script type="inline-module" id="foo">
  export default {
    value: 'foo'
  }
</script>

<script src="inline-module-core.js"></script>

<script type="module">
  // const foo = (await inlineImport('#foo')).default;
  import foo from 'foo';
  console.log(foo);
</script>
```

到此大部分的問題都被解決了，只需要注意我們的 `inline-module-core.js` 必須在所有 `inline-module` 之後載入，並在其他原生 `module` 載入前套用即可



## 結論

到此我們的主要事項已經達成，可以在瀏覽器內快樂調用我們的模組了，當然除此之外，我們其實可以把 `Blob` 發揮更淋漓盡致，直接把編譯搬到瀏覽器中都沒有問題了（千萬別用在正式產品，直接在客戶端編譯實際上是非常損耗效能的，這個技術主要只是拿來好玩用～）

由於篇幅關係，剩餘的優化部分可以前往我的 [Source Code](https://github.com/johnnywang1994/script-custom-module) 內觀賞 XD，包含 Loader 機制實現、Vue SFC 編譯、React JSX 編譯、SCSS 編譯等等功能都在源碼中實現

最後還是要特別感謝原文的大佬講解非常仔細，讓我學習到非常多，也歡迎有興趣看看的童鞋們幫我前往點個讚瞜～謝謝大家=V=

<SocialBlock hashtags="javascript,esmodule,import,vue" />


## 參考
- [分享小技巧：实现在浏览器中import内联JS模块](https://juejin.cn/post/7070339012933713956)
- [Vue Loader](https://github.com/vuejs/vue-loader)
