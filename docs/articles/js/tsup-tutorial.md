# 用 tsup 快速建立 Typescript 開發環境

<SocialBlock hashtags="typescript,tsup,esbuild" />

嗨大家，好久不見，我是 Johnny。

今天要介紹給大家一個工具叫做 `tsup`，用來快速搭建 Typescript 開發環境，甚至可以完全零配置，從筆者開始使用觀察到現在兩年了，發現使用人數是逐漸在上升中，故決定寫篇文章來介紹這個好用的工具給大家


## 前言
其實目前已經有蠻多成熟的工具像是 tsc, ts-node, tsc-watch, 甚至是 babel 等等，或是最近比較火熱的 vitejs 等等都可以拿來搭建 typescript 環境

然而這些工具有的需要額外的配置，有的並不是一個專門為了建立 typescript 環境所製成的工具，如果今天單純是需要快速開發特定去用 vite 來做也很奇怪，畢竟 vite 主要還是針對前端開發環境去製作的

## 什麼是 tsup
tsup 是一款讓開發者快速搭建 typescript 編譯開發環境的工具，底層採用 esbuild，也就是跟 vite 相同


## 快速搭建
搭建流程十分簡單，只要安裝完 tsup 後設定好 `scripts`，就能夠馬上開始開發，筆者以一個最基本的 Backend express server 舉例

### 安裝依賴
```bash
$ npm install tsup express @types/express
```

### 開發 Typescript
```ts
import express, { Express } from 'express'

const app: Express = express();

app.get('/', (req, res) => {
  res.json({
    msg: 'tsup good'
  });
})

app.listen(8080)
```

### 加上編譯 script
開發模式下加上了 `--watch`, `--onSuccess` 完成 watch mode 以及 server 重啟的動作
```json
{
  "scripts": {
    "start": "node dist/index.js",
    "dev": "tsup src/index.ts --watch --onSuccess \"npm run start\"",
    "build": "tsup src/index.ts --minify"
  }
}
```

以上！恭喜你完成了零配置的 Typescript 環境搭建，是不是非常簡單！


## 其他內建功能
除了最基本的編譯功能外，tsup 很貼心的提供了許多內建功能，以下列舉一些我覺得很實用的 feature 給大家

- 自動排除依賴：預設 tsup 會幫我們排除 imported packages
- 自動多入口編譯：tsup 可以同時接受多個 entry file 進行編譯
- types 產生：指令加上 `--dts` tsup 會自己幫我們產生 types
- 指定輸出模組類型：指令加上 `--format` 可以指定最終編譯出來的模組類型，可同時輸出多種類型，常見如 `--format esm,cjs,iife`，對於開發 library 來說是不可或缺的
- Minify 輸出結果：加上 `--minify`
- 預設 Treeshaking：預設 esbuild 會自動套用 treeshaking，也可以手動加上 `--treeshake`使用 Rollup 的 treeshaking 模式


## 客製化配置
當然我們可以完全零配置來使用 tsup，但開發總是會有需要客製化的需求，對此 tsup 也提供了很完整的客製化 config 設定方式，不論你是要拿它來開發 library或是 backend server 都非常適合使用，tsup 的 config 檔可以叫下面這些名子在你的資料夾中
- `tsup.config.ts`
- `tsup.config.js`
- `tsup.config.cjs`
- `tsup.config.json`
- `tsup` property in your `package.json`

開發一個 library 的範例如下：
```js
import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm', 'iife'],
  globalName: 'TsupDemo',
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  minify: true,
})
```

詳細設定方式可參考[tsup 官方文件](https://tsup.egoist.dev/#typescript--javascript)

<SocialBlock hashtags="typescript,tsup,esbuild" />


## 結論
這次分享的 tsup 對於常常需要新建開發環境的中小型專案非常方便，通常都不會需要太龐大的客制化設定，但每次都要重新搞一次環境複製貼上也還是很麻煩，tsup 算是這種場景的救星，希望大家都能實際下載用用看，尤其對於 esbuild 的速度，相信用過 Vitejs 的廣大讀者們一定深有感受吧！

那這次的分享就到這拉，感謝大家收看，下篇文章見拉 =V=~

