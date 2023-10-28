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

詳細[JSDoc文件連結](https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html)先放在這～

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

/**
 * @type {(number, number) => number}
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
若需要下面這樣 ts 定義動態索引
```ts
// ts
interface MyType {
  name: string;
  [key: string]: any;
}
```
相當於下面這樣（懶得記語法也可以用後面提到的引入 dts 解決）
```js
// jsDoc
/**
 * @typedef {Object.<string,*> & { name: string }} MyType
 */
```
函數也是可以
```js
/**
 * @typedef {(s: string, b: boolean) => number} MyFunc
 */
```



## 進階用法

### 搭配 dts 使用
如果要在 jsDoc 中提示類型錯誤的話，可以在 `tsconfig.json` 中開啟兩個選項，這樣我們在 js 檔案中的 jsDoc 文件也會提示類型錯誤了
```json
{
  "compilerOptions": {
    "allowJS": true, // 允許編譯 JS
    "checkJS": true // 編譯 JS 同時做類型檢查
  },
  "include": [
    "src/**/*.ts",
    "src/**/*.js" // include JS 檔案讓 tsc 編譯
  ]
}
```
接下來，如果我們需要從某一個 dts 文件中引入類型的話也可以使用 `import` 的方式把指定類型引入
```ts
// api.d.ts
export interface ApiResponse {
  msg: string;
}
```
```js
// 全部引入
/** @typedef {import('./api')} */

// 指定引入使用
/** @type {import('./api').ApiResponse} */
const apiResponse = {
  msg: 'success',
};
```

### 導出 declaration 檔案
透過 tsc 編譯同樣能把 jsDoc 定義的類型輸出成 dts 類型檔案
```json
{
  "compilerOptions": {
    "declaration": true
  }
}
```
執行編譯後同樣能產出對應的 dts 檔案，jsDoc 搭配 dts 的優點是，在編譯後檔案原始碼跟原本寫的基本一致
```bash
$ npx tsc
```

### 泛型
jsDoc 甚至支持像 ts 中常用的泛型機制，透過 `@template` 聲明，寫法如下
```js
/**
 * @template T
 * @param {T} x 參數 x
 * @returns {Promise<T>}
 */
function iAmSoShock(x) {
  return Promise.resolve(x)
}
```
或是更複雜的
```js
/**
 * @template P
 * @typedef {P extends Promise<infer T> ? T : never} ValueOfPromise
 */

/**
 * @type {ValueOfPromise<Promise<'hello'>>}
 */
let hello; // hello: 'hello'
```
雖然 jsDoc 是可以做到複雜類型，不過建議這種複雜的東西直接透過 `@type {import('xxx').xxx}` 的方式引入會比較方便管理跟閱讀...

### class 支援
jsDoc 也支持在 class 中使用
```js
/**
 * @template T
 * @extends {Set<T>}
 */
class NameSet extends Set {
  /**
   * @type {string}
   */
  name;

  /**
   * @param {string} name
   * @param {T[]} value
   */
  constructor(name, value) {
    super(value);
    this.name = name;
  }

  /**
   * @returns {T[]}
   */
  toArray() {
    return Array.from(this);
  }
}
```

### enum 類型
enum 其實就是一個 object~，使用上很方便
```js
/** @enum {number} */
const JSDocState = {
  BeginningOfLine: 0,
  SawAsterisk: 1,
  SavingComments: 2,
};

JSDocState.SawAsterisk;
```
但需要注意的是，比起 ts 裡的 enum，jsDoc 裡的 enum 可以是 any 類型，比如 enum函數
```js
/** @enum {(number) => number} */
const MathFuncs = {
  add1: (n) => n + 1,
  id: (n) => -n,
  sub1: (n) => n - 1,
};

MathFuncs.add1;
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

總結 jsDoc 其實在不需要 ts 的情境下，也能很好地做到標註，並定義變數、函數、class、泛型等等，也可以引入使用 dts 用 ts 定義更為複雜的類型，不過比起 ts，jsDoc 會讓你的 js 裡多一大坨註解，可能會有些人不是很愛

所以老實說，如果短時間內無法馬上搭建 Typescript Compiler，或是還在學習中，但又想要試試看類型開發帶來的好處，可以先試試 Jsdoc 我認為也是一個很棒的選擇，用在一些小文檔、舊專案、小專案上非常適合，可以省去搭建編譯器的時間與手續，如果要開發大型應用產品的話，個人還是建議直接使用 Typescript 會比較保險，畢竟編譯器的優勢對於產品來說是比較有保障的

以上就是這次分享的內容拉～希望大家喜歡摟，喜歡的話別忘記幫我分享啊！！感謝大家

<SocialBlock hashtags="javascript,jsdoc,typescript" />

## 參考
- [Jsdoc官方文檔](https://jsdoc.app/index.html)
- [Typescript vs JSDoc for static type checking](https://blog.logrocket.com/typescript-vs-jsdoc-javascript/)