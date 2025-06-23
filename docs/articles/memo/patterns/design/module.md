# Module Pattern

<SocialBlock hashtags="design,pattern,module" />

## 前言
大家好，我是 Johnny，今天要紀錄分享的是 Patterns 筆記系列的 `Module Pattern`

## 介紹
Module 模式是一種將程式碼拆分的基礎模式，在 Javascript 的 ES2015 Modules 是一套內建的模組化方式，以下是一個常見的 `math.js` 模組，透過 `export` 將多個函數作為模組的方法輸出

```js
// math.js
const privateValue = "This is a value private to the module!";

export function add(x, y) {
  return x + y;
}

export function multiply(x) {
  return x * 2;
}

export function subtract(x, y) {
  return x - y;
}

export function square(x) {
  return x * x;
}
```

```js
import { add, multiply, subtract, square } from "./math.js";

/* Error: privateValue is not defined */
console.log(privateValue);
```
透過模組化的方式，我們可以保證一些模組內的變數不會互相污染


### export default
`export default` 是一種內建的 export 單位
```js
export default function add(x, y) {
  return x + y;
}

export function multiply(x) {
  return x * 2;
}

export function subtract(x, y) {
  return x - y;
}

export function square(x) {
  return x * x;
}
```
default 關鍵字是作為預設輸出的對象
```js
import add, { multiply, subtract, square } from "./math.js";

add(7, 8);
multiply(8, 9);
subtract(10, 3);
square(3);
```
或是我們可以透過 `import * as xxx` 的方式，將所有模組輸出整合為一體進行使用
```js
import * as math from "./math.js";

math.default(7, 8);
math.multiply(8, 9);
math.subtract(10, 3);
math.square(3);
```

### Dynamic Import
在 js 當中，除了透過 `import X from 'xxx';` 進行模組引用，也可以透過 `import()` 關鍵字，對模組進行動態的引入，提升模組載入的靈活度及載入效率
```js
import("module").then((module) => {
  module.default();
  module.namedExport();
});

// Or with async/await
(async () => {
  const module = await import("module");
  module.default();
  module.namedExport();
})();
```
當然也可以對圖片進行動態載入
```js
import React from "react";

export function DogImage({ num }) {
  const [src, setSrc] = React.useState("");

  async function loadDogImage() {
    const res = await import(`../assets/dog${num}.png`);
    setSrc(res.default);
  }

  return src ? (
    <img src={src} alt="Dog" />
  ) : (
    <div className="loader">
      <button onClick={loadDogImage}>Click to load image</button>
    </div>
  );
}
```

<SocialBlock hashtags="design,pattern,module" />

## 結論
透過 module 模組化的開發方式，我們可以很輕易的拆分程式碼，並且降低程式碼的命名污染，JS 由於歷史包袱因素，從最早的 AMD 模組（RequireJS）到後來 Nodejs 大行其道時的 CommonJS，到後來大家透過 Webpack 把 ESM 語法轉為 Nodejs 後打包成瀏覽器 JS，到現在原生 JS 瀏覽器的 ESM（ViteJS），要把整個 JS 模組化歷史講完實在太多內容，歡迎有興趣的夥伴動手深入瞭解摟～今天就介紹到這邊，下次見拉=V=.