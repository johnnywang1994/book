# Babel7 基本介紹與使用

本篇主要紀錄 Babel 7 的實際安裝，設置等過程，會一路從早期的開始說起。如果你懶得看一堆歷史，也是可以到最下方查看最新配置使用。


## Babel 相關介紹

Babel 主要作為相關 ECMA 相關新語法的一個編譯工具，讓開發者可以使用最新的語法標準來編譯為舊的寫法。

這裡以 webpack + babel 來示範使用與介紹。


## 基本安裝（純語法轉換，syntax not api）

安裝 `babel-loader`, `@babel/core`, `@babel/preset-env`

```bash
$ npm install babel-loader @babel/core @babel/preset-env --save-dev
```

增加 webpack loader

```js
// webpack.config.js
module.exports = {
  module: {
    rules: {
      test: /\.js$/,
      loader: 'babel-loader',
      include: [path.resolve(__dirname, './src')],
    }
  }
}
```

接著配置基本的 babel 設定，配置方式有直接在 loader 的配置，或是使用 .babelrc 進行相關配置。

這邊注意，如果是新版的 babel7 使用 corejs 時，將出現提醒 preset 中的 `modules: false` 配置已廢棄，建議明確指定模組類型並在 `plugins` 中進行引用。例如 `@babel/plugin-transform-modules-commonjs`

```json
// .babelrc
{
  "presets": [
    "@babel/preset-env"
  ]
}
```

以上就完成最基本的 babel 配置（syntax 的部分，但像 `includes` 或 `Object.values` 這種稱為 api ），若需要其他 api 功能請見下方～。


### 進階 polyfill api

上面的 `@babel/preset-env` 其實具有 polyfill 的功能，預設配置如下：

```json
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "useBuiltIns": false, // 這裡預設為 false，也就是不使用相關 polyfill api
      }
    ]
  ]
}
```

若將其設置為 `entry` 表示在入口處手動引入，必須在源碼最上方手動加上如下，這種方式會將整個 polyfill 全部引入

```js
// need @babel/polyfill
import '@babel/polyfill'
```

或是新版的

```js
// need corejs, regenerator-runtime
import 'core-js/stable';
import 'regenerator-runtime/runtime';
```

> 這裡很多人搞不懂，為何又是 `@babel/polyfill` 又有 `core-js` 和 `regenerator-runtime`，其實這在[官方說明](https://github.com/zloirock/core-js#babelpolyfill)裡有提到，簡單講，`@babel/polyfill` 就是包含了另外兩者，只是新版將它拆開處理。（對應到的會是 `core-js@2`，新的 `core-js@3` 新增了物件 api)

最好的方式是將其設置為 `usage`，實現所謂的`按需加載`，當使用到相關新的 api 時，檢測並協助加上 polyfill，減少整個打包後的體積，但因為這種方式 babel 會在每個需要的地方定義一次 helper，造成多處重複的 helper 出現，導致打包體積仍然很大。（解決方式見下方 `@babel/plugin-transform-runtime`）


## 插件安裝

1. @babel/plugin-syntax-dynamic-import

這個插件主要幫助解析動態引入 `import()` 這種寫法，只是幫助解析，不會轉換喔～


2. @babel/plugin-transform-runtime

前面講到 @babel/preset-env 雖然可以實現 polyfill，但卻有個缺點，他的 polyfill 會造成全局污染，是直接在源碼上方 `require` 一個方法，所以 babel 的機制會是直接在對像上添加方法，例如 `includes` 直接掛在 `Array.prototype` 上面，也就容易與一些第三方庫定義的全局方法衝突導致問題，在公認的編程中也是較不推薦修改全局變量的。

為了解決這個問題，`@babel/plugin-transform-runtime` 誕生了，這個插件主要會直接編譯，其實這個插件主要是使用在開發環境，他的另一個兄弟叫做 `@babel/runtime` 則是安裝在正式環境下，詳細區分原因[可見這裡](https://babeljs.io/docs/en/babel-plugin-transform-runtime)，兩者可以說是不可分割的。

而 `@babel/runtime` 是舊的，這個插件包含一些 `babel helper`, `regenerator-runtime`，新的插件命名為 `@babel/runtime-corejs2`, `@babel/runtime-corejs3`，分別另外包含了 `core-js@2`, `core-js@3`，應該是目前更優的解法

**安裝**

```bash
$ npm install @babel/plugin-transform-runtime --save-dev
```

```bash
$ npm install @babel/runtime-corejs3
```

修改 `.babelrc` 設定如下：

> 注意！`@babel/preset-env` 的 `useBuiltIns` 會與 `@babel/plugin-transform-runtime` 的配置發生衝突，避免同時使用兩者進行配置。[看這裡討論](https://github.com/babel/babel/issues/10271#issuecomment-528379505)

```json
{
  "presets": [
    "@babel/preset-env"
  ],
  "plugins": [
    [
      "@babel/plugin-transform-runtime",
      {
        "corejs": 3 // 預設是 false，也就是不使用 api，可以選用 2, 3 不同版本，自動按需編譯
      }
    ]
  ]
}
```

有關於[預設配置](https://babeljs.io/docs/en/babel-plugin-transform-runtime)可到這裡查看


## 結論

實際項目中，只需要使用最後一個 `.babelrc` 配置即可，其他主要是介紹居多，透過回顧整個 babel 的主要脈絡來更清晰自己項目需要使用的是什麼配置，希望大家喜歡～歡迎分享讓更多人一起了解吧！


## 快速解決問題版本

安裝

``` bash
$ npm install babel-loader @babel/core @babel/preset-env @babel/plugin-transform-runtime --save-dev
```

```bash
$ npm install @babel/runtime-corejs3
```

配置

`.babelrc`
```json
{
  "presets": [
    "@babel/preset-env"
  ],
  "plugins": [
    [
      "@babel/plugin-transform-runtime",
      {
        "corejs": 3
      }
    ]
  ]
}
```
