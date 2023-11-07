# 史上最簡單的 Webpack 5 教學

<SocialBlock hashtags="javascript,webpack,vue,react,module-federation" />

## 前言

今天這篇主題算是朋友們敲碗許久，但我一直有一個心理陰影不敢觸碰的一個主題，畢竟解說這個主題的大佬真的非常多，也非常詳細，實在是不敢獻醜，但想了想，還是決定希望能跨出這一步，用我自己的方式跟理解來說明一遍。

一直以來 Webpack 被很多人詬病很難學、門檻高、難以理解，所以我希望能用更簡單易懂的方式讓新手都能快速了解 Webpack 的整個全貌。

## 什麼是 Webpack

根據官網的說明就這樣一句話：  
`webpack is a static module bundler for modern JavaScript applications`（現代 Javascript 靜態模組打包工具）

不用想得太複雜，其實就是`將平常撰寫的 Javascript 套用模組化的開發方式後打包（把你程式碼全部塞在一起）的工具`，當然對於一些優化場景會再將程式碼拆分開來 `Code Splitting`，但那又是另一件事了

## 為何需要 Webpack

可能有些朋友會好奇：阿本來就是全部寫在一起了，我幹嘛再去用一個工具把他綁在一起？其實 Webpack 的主要意義並不單單只是`打包`，而是前一句`套用模組化的開發方式`

Webpack 真正的價值是在於讓傳統瀏覽器還沒有 `ESModule` 的年代，可以在本地使用模組化的開發體驗，優化整個開發的品質與可維護性，並且透過 `Nodejs` 的編譯能力，發展出各式的編譯功能，比如 `Sass`, `Typescript` 等等，更進一步提升了整個前端的開發能力，可以說像 `Webpack`，或是更早以前的 `Gulp`, `Grunp` 等等工具把前端開發往另一個層次提升了

## 安裝 Webpack

透過 npm 進行安裝，通常會同時安裝 `webpack`, `webpack-cli` 這兩個，後者提供方便的指令列命令讓我們能方便的配置在 `package.json` 的 `scripts` 中

```bash
$ npm install --save-dev webpack webpack-cli
```

接著在專案目錄下新增一個 `webpack.config.js` 這個檔案名稱是 `webpack-cli` 預設會去搜索使用的，如果需要更改配置的路徑，可以使用 `--config` 這個參數指定

安裝完成後來配置一下 `package.json`，`--watch` 參數會自動監聽我們的入口文件（包含依賴）變化重新再編譯一次內容

```json
{
    "scripts": {
        "dev": "webpack --watch"
    }
}
```

## Webpack 核心 Concepts

![截圖 2022-03-14 下午4.48.50.png](https://raw.githubusercontent.com/jwlearn1994/image-uploader/main/2022/03/14-16-51-08-%E6%88%AA%E5%9C%96%202022-03-14%20%E4%B8%8B%E5%8D%884.48.50.png)

如上圖所示，Webpack 核心主要包含五大元素，接下來會一個一個帶大家認識他們

## Mode

告訴 Webpack 當前針對的編譯情景是正式、開發模式，這個值會讓 Webpack 採取不同的編譯策略，或是給其他 Plugins 讀取使用

- available values: `production`, `development`, `none`

```js
module.exports = {
    mode: 'development',
};
```

## Entry

告訴 Webpack 編譯的入口位置，支援多入口配置

### Single entry

```js
module.exports = {
    entry: './path/to/my/entry/file.js'
}
```

### Multi entry

```js
module.exports = {
    entry: {
        app: './src/app.js',
        adminApp: './src/adminApp.js'
    }
}
```

## Plugins

一個 Webpack 編譯流程中可以有很多 plugins，而 plugin 能讓開發者在 Webpack 的整個編譯階段配置不同的操作，比如提前處理操作特定輸出 disk 的檔案或是配置一些實用的工具在編譯的過程中，值得一提的是，Webpack 本身整個編譯過程也是建立在同樣的這個 Plugin 系統架構底下，可以說 `Plugins` 是構成整個 Webpack 的骨幹要素

底下是一個套用 `html-webpack-plugin` 的範例

```js
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    plugins: [new HtmlWebpackPlugin({
        template: './path/to/my/index.html'
    })]
}
```

## Loaders

一個 Webpack 編譯流程中可以有很多 loaders，而每個 loader 是作為對不同模組進行客製化編譯流程的轉譯器，並且 loaders 彼此之前具有先後關係，對於同一類型的檔案可以套用多個 loaders，每一個 loader 編譯後會將結果送到下一個 loader 進行處理直到沒有下一個為止

底下是一個套用 `css-loader`, `style-loader`的範例，範例中的編譯順序是由下而上，也就是從陣列的後方往前走

```js
module.exports = {
    module: {
        rules: [
            {
                test: /.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                ]
            }
        ]
    }
}
```

## Output

告訴 Webpack 如何將編譯後的檔案輸出到 disk（主機位置）中。

### 單一輸出

```js
module.exports = {
    output: {
        path: __dirname + '/dist',
        filename: 'bundle.js'
    }
}
```

### 多檔案輸出

```js
module.exports = {
    entry: {
        app: './src/app.js',
        adminApp: './src/adminApp.js'
    },
    output: {
        path: __dirname + '/dist',
        filename: '[name].js'
    }
}
```

到此我們理解了 Webpack 中最核心的幾個概念了，現在就可以開始來實際動手來寫一些簡單的範例摟～

## Webpack Modules

那哪寫東西可以被 Webpack 視為一個 module 處理呢? 以下是一些常用的

- ES2015 import
- CJS require
- AMD define & require
- css @import
- url() & img src

## Module Resolution

Webpack 使用 [enhanced-resolve](https://www.npmjs.com/package/enhanced-resolve) 來處理檔案路徑

```js
// Absolute path
import '/local/home/abpath/file'
import 'C:\\Users\\me'
```

```js
// Relative path
import '../local/home/repath/file'
import './file'
```

```js
// Module path
import 'module'
import 'module/lib/file'
```

## Tree Shaking

所謂 tree-shaking 顧名思義就是將我們的樹上無用的葉片模組搖落、摘除得這麼一個機制，也稱作 `**dead-code elimination**`，大致的流程如下：

1. 靜態解析：relies on the static structure of `ES2015` syntax(export, import)

2. 標註：use optimization.usedExports to `mark dead code`

3. 移除：use `TerserPlugin` to remove dead code(or UglifyPlugin…etc)

標註前後對比如下圖

![](https://raw.githubusercontent.com/jwlearn1994/image-uploader/main/2022/04/tree-shaking-mechanism.JPG)

而對於開發者來說，我們更需要專注在 1. 2 這兩個部分，盡量使用靜態解析的方式，讓工具能正確完成標註多餘程式碼的話，後續移除就交給相關套件去實現就行了，所以實作上我們更關注以下幾點：

1. 避免不必要的變數附值
   
   ![](https://github.com/jwlearn1994/image-uploader/blob/main/2022/04/unused-value-assignment.JPG?raw=true)

2. 注意使用 **@babel/preset-env modules** 設定，導致無法使用靜態解析
   
   ![](https://github.com/jwlearn1994/image-uploader/blob/main/2022/04/babel-mistake-modules.JPG?raw=true)

3. 盡量避免使用 `export default`，這將導致所有 default 中的相關功能無法正確被摘除
   
   ![](https://github.com/jwlearn1994/image-uploader/blob/main/2022/04/export-default-mistake.JPG?raw=true)

## Module Federation

在 Webpack 5 中加入的新功能，大概定義如下

- Multiple separate builds should form a single application
- Separate builds should not have dependencies between each other, so they can be developed and deployed individually
- This is often known as `Micro-Frontends`, but is not limited to that

從定義可以知道是一種讓應用程式拆解遷移使用的一個技術，可以讓元件複用性大幅提升，觀念上會有 Host, Remote 兩個對象，使用如下方式在構建專案時就需要事先定義好各自的關係

![](https://raw.githubusercontent.com/jwlearn1994/image-uploader/main/2022/04/module-federation-demo.JPG)



官網也有給不錯的範例可以直接觀看

- [See Online Demo](https://stackblitz.com/github/webpack/webpack.js.org/tree/master/examples/module-federation?terminal=start&terminal=)

## 動手實踐

礙於篇幅關係，相關練習會放到([我的 Github 小號](https://github.com/jwlearn1994/webpack5-demo)) 中，想看看具體怎麼使用的童鞋可以去看看收藏摟，主要範例會包含以下清單：

- Basic - 基本 js 編譯打包

- Babel - 基本 js 安裝 `babel-loader` 編譯打包

- CSS - 搭配 `style-loader`, `css-loader` 處理 `.css` 檔案

- HTML - 搭配 `html-webpack-plugin`, `webpack-dev-server` 啟動開發伺服器與 html 模板

- React - 安裝 `@babel/preset-react` , `react`, `react-dom`, `styled-components` 編譯 `jsx`

- Vue - 安裝 `vue`, `@vue/compiler-sfc`, `vue-loader` 處理 Vue Single File 編譯

- Vue Ts - 安裝 `typescript`, `ts-loader` 編譯 Typescript

- Vue Ts Eslint - 安裝 `eslint` 編譯 Typescript，並使用 eslint 除錯

- Module Federation - 配置基礎 React, Vue 專案並實現 Module Federation 基本配置

## 

## 進階實踐

如果你看完以上範例還是不過癮，歡迎看看進階實踐，動手實現一個簡易版本的 Bundler 試試吧~ 絕對成就感滿滿，毫無頭緒的話，也可以參考我的實現版本玩玩看喔!

**[GitHub - jwlearn1994/tiny-bundler: A practice to create static module bundler](https://github.com/jwlearn1994/tiny-bundler)**



## 結論

其實學習 Webpack 的過程中能夠學到非常多的知識，不論是 Nodejs 的使用或架構面的學習都對日常開發非常有幫助，學習 Webpack 的過程很艱辛，但一步一步學起來的成就感是很難用言語形容

希望大家都能上手並愛上 Webpack，雖然相比於 Vite, Snowpack 等等又潮又香的 `ESModule` 新技術正在逐漸搶佔各大論壇版面，Webpack 的許多實踐與概念仍然是非常有參考價值的，在追隨潮流的同時，不仿回頭看看這個編譯界的老大哥吧～

今天就分享到這邊摟，謝謝大家收看～我們下篇文章再見拉！=V=

<SocialBlock hashtags="javascript,webpack,vue,react,module-federation" />

## 參考

- [Webpack Documentation](https://webpack.js.org/)
