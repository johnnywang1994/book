# React Styled-JSX

這篇是紀錄使用 Vite 配置 `styled-jsx` 基礎安裝與使用方式的筆記，因為最新 v5.0 版本似乎有 `__dirname` 問題，本篇以 v4.0.1 使用，後續如果有修正這個問題再進行更新，主要核心功能是不影響的


## Install

```bash
$ npm install --save styled-jsx
```

```json
// babel.config.json
{
  "plugins": ["styled-jsx/babel"]
}
```

若使用 typescript 需要引入相關 `<style> tag jsx attribute` 的類型設定

```json
// tsconfig.json
{
  "include": [
    "node_modules/styled-jsx/index.d.ts"
  ]
}
```


## Sass 支援
安裝 [@styled-jsx/plugin-sass](https://www.npmjs.com/package/@styled-jsx/plugin-sass) 及 `sass`，配置 `babel.config.json` 如下

```json
{
  "plugins": [
    ["styled-jsx/babel", {
      "optimizeForSpeed": true,
      "plugins": [
        ["@styled-jsx/plugin-sass", {
          "sassOptions": {
            "includePaths": ["./src/styles"]
          }
        }]
      ]
    }]
  ]
}
```


## 使用心得

### 優點
- Nextjs 開箱即用，配置簡單
- Style 撰寫規則簡單，props 傳入方式非常直覺，就寫在組件內
- 預設自動完成 scoped className hash，設定 `global` 優雅，只需要一個屬性切換

### 缺點
- 動態樣式必須放在組件內，相對較難覆用或移植使用，這點跟 Vue 的 style tag 類似
- 最新 v5.0 版跟 Vite 不相容，__dirname 環境變數會噴錯，必須使用 v4.0.1