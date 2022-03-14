# 原生 Javascript 的類型標註工具 JSDoc 
###### tags: `JS` `JSDoc` `Typescript` `Type Check`

<SocialBlock hashtags="javascript,jsdoc,typescript" />

## 前言

我們知道 Javascript 本身作為一款弱型別的語言，對於變數、函數、類別等等的類型標註能力是十分薄弱的，也因此出現像 Typescript 這樣的超集來協助補全 Javascript 的弱點，然而究竟原生 Javascript 是不是除了用 Typescript 以外就沒其他辦法拯救了呢？

嘿嘿當然不是拉～，今天就要來介紹一款 JavaScript 的類型標註語言工具 - JSDoc！其實它的誕生時間在 1999 年，可說是非常資深的工具，目前是第三版


## 安裝

現代 IDE 編輯器像是 Vscode 等等應該都內部支援他的 comment 標註語法了，使用上可直接書寫，但如果需要生成靜態文檔則必須安裝 jsdoc 的工具如下：

```
$ npm install -g jsdoc
```

或是局部安裝

```
$ npm install --save-dev jsdoc
```


## 基礎用法

### 變數類型

可以用 `@type` 來定義變數的類型，類型語法用 `{}` 包裹，裡面可以使用 `string`, `number`, `boolean`, `function`, `Object`, `Array` 等等

```js
/**
 * @type {number}
 */
var FOO = 1

/**
 * @type {function(number, number): number}
 */
function test(a, b) {
  return a + b;
}
```


### Function 函數

函數可以用前面的 `@type` 或是用下面這種較為詳細的寫法，甚至可以給予 `@example` 讓使用者能快速了解如何使用

```js
/**
 * Sum two number
 * @param {number} a: number a
 * @param {number} b: number b
 * @return {number} sum result
 * @example test(1, 2)
 */
function test(a, b) {
  return a + b;
}
```

### Types 語法規則

`{}`中的一些常用語法規則，詳細用法可[參考這裡](https://jsdoc.app/tags-type.html)

```js
/**
 * @param {string=} n - optional
 * @param {string} [n] - optional
 * @param {(string|number)} n - multi types
 * @param {*} n - any type
 * @param {...string} n - repeatable args
 * @param {string} [n="hi"] - optional with default
 * @param {string[]} n - Array of strings
 * @return {Promise<string[]>} n - Promise fulfilled by array of strings
 */
```

### 類型定義

有時候我們可能需要重複使用類似形態的資料結構類型，此時就可以用 `@typedef` 進行定義，類似於 Typescript 裡的 `interface`, `type` 的用法

```js
/**
 * @typedef {object} ApiResponse
 * @property {object} data - data of api
 * @property {number} status - status of api
 */

/** @type {ApiResponse} */
const res = {
  status: 200,
  data: {},
};
```

如果嫌棄上面這種冗長的 `@property` 寫法，jsdoc 也提供簡便的快速定義簡寫，效果是一樣的

```js
/**
 * @typedef {{ data: object, status: number }} ApiResponse
 */
```

另外如果我們需要從某一個文件中引入類型的話也可以使用下面這種方式把指定類型引入近來

```js
/** @typedef {import('./api')} */
```


## 生成文檔

全局安裝的話只需要，預設會在資料夾下產出一包 `out`，裡面就是文檔的 html 文件了～

```
$ jsdoc my-file.js
```

如果想要切換輸出位置也可以

```
$ jsdoc my-file.js -d docs
```


## 結論

老實說，如果短時間內無法馬上搭建 Typescript Compiler，或是還在學習中，但又想要試試看類型開發帶來的好處，可以先試試 Jsdoc 我認為也是一個很棒的選擇，用在一些小文檔、舊專案、小專案上非常適合，可以省去搭建編譯器的時間與手續，但如果要開發大型應用產品的話，個人還是建議直接使用 Typescript 會比較保險，畢竟編譯器的優勢對於產品來說是比較有保障的

以上就是這次分享的內容拉～希望大家喜歡摟，喜歡的話別忘記幫我分享啊！！感謝大家

<SocialBlock hashtags="javascript,jsdoc,typescript" />

## 參考
- [Jsdoc官方文檔](https://jsdoc.app/index.html)
- [Typescript vs JSDoc for static type checking](https://blog.logrocket.com/typescript-vs-jsdoc-javascript/)