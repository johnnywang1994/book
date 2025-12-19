# 為了活久一點，我做了一個 Flex Message HTML 編輯器

<SocialBlock hashtags="line,flex-message,html,flex-html-render" />

## 簡介
好久不見，我是 Johnny，不知道大家有沒有用 LINE LIFF 或 LINE message api 開發過服務? 如果有的話，應該對 Flex Message 不陌生吧! 比起傳統的文字訊息，Flex Message 可以讓我們設計出更豐富、更有互動性的訊息內容，提升使用者體驗。

但經過一段時間的使用後，我覺得現有的 [Flex Message Simulator](https://developers.line.biz/flex-simulator/?status=success) 雖然很好用，但在編輯上還是有些不便之處，例如：

- 編輯 JSON 結構不直觀
- JSON 格式較難閱讀階層關係，也因此在畫面上還需要多一個 tree view 來輔助理解
- 專案裡面如果要動態產生 Flex Message，還是需要手動撰寫 JSON 結構，而 JSON 結構不易閱讀與維護，往往一個稍微複雜好看一點的 flex message 就是一大段 JSON，動輒 200-300行以上，閱讀起來讓人頭很痛，日後維護起來也很麻煩

有鑑於此，為了解決我長期維護 flex message 的困擾，我決定開發一個新的工具 `flex-html-render`，讓開發者可以用 HTML 標記語法來設計 Flex Message，這樣不僅結構清晰易懂，也方便日後維護與動態產生 Flex Message，讓開發者能把更多精力放在業務邏輯上，而不是在撰寫複雜的 JSON 結構上。當然如果公司裡有專門的人會負責設計 Flex Message 的話，這個工具也能讓設計師更容易上手，直接用 HTML 標記語法來設計訊息內容。



## 什麼是 `flex-html-render`?
[flex-html-render](https://www.npmjs.com/package/flex-html-render) 是一個將 HTML 字串轉換為 LINE Flex Message JSON 結構的工具，方便開發者以 HTML 標記語法設計 Flex Message，並自動轉換為 LINE Messaging API 所需的格式。


## 為什麼選擇 HTML?
HTML 是一種廣泛使用的標記語言，具有以下優點：
- 結構清晰：HTML 使用標籤來定義元素，能清楚表達階層關係，讓開發者更容易理解 Flex Message 的結構。
- 易於閱讀與維護：相比 JSON，HTML 的標籤語法更直觀，讓開發者能更輕鬆地閱讀與修改 Flex Message 的內容。
- 廣泛支援：HTML 是網頁開發的基礎，大多數開發者都熟悉 HTML 的語法結構，降低學習成本。
- 動態生成方便：在許多前端框架中，動態生成 HTML 比生成 JSON 更為簡單，這使得在應用程式中動態產生 Flex Message 變得更加容易。


## 如何使用 `flex-html-render`?
1. 安裝套件
```bash
npm install flex-html-render
```

2. 引入並使用
```js
import convertHtmlToFlexMessage from 'flex-html-render';
const htmlString = `
  <bubble>
    <body>
      <box layout="vertical">
        <text>這是一個 Flex Message</text>
      </box>
    </body>
  </bubble>
`;
const flexMessage = convertHtmlToFlexMessage(htmlString);
console.log(JSON.stringify(flexMessage, null, 2));
```

3. 傳送 Flex Message
將產生的 `flexMessage` 傳送給 LINE Messaging API，即可發送 Flex Message 給使用者。


## 線上編輯器
為了讓非開發者的大家更方便地使用 `flex-html-render`，我還開發了一個線上編輯器 [Flex Message HTML Simulator](https://spa.maju-web.club/flex-message-html-simulator/)，可以即時編輯 HTML 並預覽對應的 Flex Message 結構。這個編輯器提供了以下功能：

- 即時預覽: 編輯 HTML 後，立即看到 Flex Message 的視覺效果。(只是模擬，UI 不一定準確，請以實際發送結果為主)
- 轉換結果查看: 輸入 HTML 後，立即看到對應的 Flex Message JSON 結構。

## 結語
希望 `flex-html-render` 能幫助大家更輕鬆地設計與維護 LINE Flex Message，提升開發效率與使用者體驗。如果你有任何建議或回饋，歡迎隨時聯繫我或在 GitHub 上提出 issue。祝大家開發順利，生活愉快！

Johnny
