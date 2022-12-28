# Hooks Pattern

<SocialBlock hashtags="design,pattern,hooks" />

## 前言
大家好，我是 Johnny，今天要紀錄分享的是 Patterns 筆記系列的 `Hooks Pattern`


## 介紹
Hooks 作為一個程式設計的模式已經一段時間，但一直以來並沒有受到前端非常大的重視，經由 React 在 v16.8 後引入使用取代傳統的 class component 後逐漸受到重視，許多傳統的設計模式都可以用 Hooks 模式取代

以下以 React class component, functional component 為例說明為何使用 Hooks 帶來許多好處

雖然我們能以 functional component 定義組件，但如果需要添加一個狀態切換，我們就必須轉回使用 class 的寫法
```js
function Button() {
  return <div className="btn">disabled</div>;
}
```
```js
export default class Button extends React.Component {
  constructor() {
    super();
    this.state = { enabled: false };
  }

  render() {
    const { enabled } = this.state;
    const btnText = enabled ? "enabled" : "disabled";

    return (
      <div
        className={`btn enabled-${enabled}`}
        onClick={() => this.setState({ enabled: !enabled })}
      >
        {btnText}
      </div>
    );
  }
}
```
這樣實在很困擾，另外 class 組件在使用上不利於推廣學習，開發者必須首先熟悉 class 相關的語法才能良好的使用，但即使良好使用 class 組件，當組件邏輯變得複雜時，邏輯與狀態之間往往會交錯重疊，導致增加後續閱讀、修改的難度（Vue options 寫法也是類似這樣）


## Hooks
Hooks Pattern 提供一個勾子，幫助我們把狀態與組件之間綁定起來，讓 functional 組件可以擺脫無狀態的限制，從而大大增強 functional 組件的使用能力
```js
function Input() {
  const [input, setInput] = React.useState("");

  return <input onChange={(e) => setInput(e.target.value)} value={input} />;
}
```
透過 hooks 我們可以把組件的一些邏輯抽離變成 Custom hooks，在閱讀、維護上都大大強化了，參考如下圖片
![](https://res.cloudinary.com/ddxwdqwkr/image/upload/v1641930050/patterns.dev/classicalvshooks2.001.png)

### 其他 Hooks
另外除了 React 之外，hooks 的概念也常用於開發一些底層工具，例如像 Webpack 就提供了多組 plugin 使用的 hooks 讓開發者可以使用與 Webpack 底層同一套的 plugin 生命流程機制去開發客製化的 plugin，可以說 hooks 的應用非常的廣泛，詳情可參考 [Webpack Plugin - Compiler Hooks](https://webpack.js.org/api/compiler-hooks/)

<SocialBlock hashtags="design,pattern,hooks" />

## 結論
整體而言，透過 Hooks Pattern 開發的軟體工具，讓我們在開發的同時，具備完整操控整個應用程式工具流程的能力

React 的 hooks 讓我們在 functional 組件中保存狀態，簡化了傳統 class 組件開發的學習、編寫痛點，並且把邏輯重用的概念發揮到了極致，相關邏輯塊也可以整合在同一個單一 hook 當中提升了可讀性

Webpack 的 Plugin hooks 讓我們具備在 webpack compiler、parser 等等模組中加入額外的邏輯，也是一種把邏輯抽出到單一 hook 中處理的概念，對於整個工具的可擴充性、可維護性也大大的提升

今天學習就到這邊拉，感謝收看，下篇見！
