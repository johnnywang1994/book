# 來試用看看原生 Web Popover API

<SocialBlock hashtags="web-api,popover,javascript,dialog,modal" />

Hi 大家好，我是 Johnny，各位前端工程師們日常工作中一定瘋狂遇到各種 Dialog, Modal, Popover 等等彈出訊息、視窗的功能吧？還在擔心每次專案要用哪個 Library 實作或是自己手刻嗎？

今天就來介紹一個好玩的 Web API 叫做「Popover API」，可以快速讓前端使用原生的 web api 做到過去類似的彈出視窗功能


## 什麼是 Popover API？
Popover API 為開發人員提供「標準」、「一致」、「靈活」的機制，用於在其他頁面內容之上顯示彈出內容。

網頁開發中，有兩種常見的方法可以在其他內容之上顯示內容
- modal
  - 顯示彈出視窗時，頁面的其餘部分將呈現非互動狀態，直到彈出視窗已關閉
- non-modal
  - 顯示彈出視窗時可以與頁面的其餘部分進行交互

**使用 Popover API 建立的 Popover 始終是 non-modal 的**


## 如何使用 Popover API?
### Basic Usage
- button 元素
    - `popovertarget`: 彈出元素的 `id`
- popover 元素
    - 設定 `id`
    - 設定屬性 `popover`(元素將在頁面載入時套用 `display: none` 隱藏)

```jsx
<button popovertarget="mypopover">Toggle the popover</button>
<div id="mypopover" popover="auto">Popover content</div>
```
預設情況下，按鈕的行為為 toggle，或者我們可以使用屬性指定操作開啟、關閉 `popovertargetaction`
```jsx
<button popovertarget="mypopover" popovertargetaction="show">
  Show
</button>
<button popovertarget="mypopover" popovertargetaction="hide">
  Hide
</button>
<div id="mypopover" popover="manual">
  Popover content
</div>
```

### Popover auto state
當 popover 元素設定為 popover 或 popover="auto" 時
- 可以透過`點擊彈出框外部來隱藏`彈出框
- 透過瀏覽器特定的機制關閉，例如按`Esc`鍵。
- 一次只能顯示一個彈出視窗 - 當已經顯示一個彈出視窗時顯示第二個彈出視窗將隱藏第一個彈出視窗

### Popover manual state
當設定 popover="manual" 時
- 無法像 auto state 時透過點擊外部或 Esc 鍵關閉
- 可以一次顯示多個獨立的彈出窗口


## 如何用 Javascript 控制 popover？
使用這 3 種方法以 Javascript 控制彈出視窗狀態
- `HTMLElement.showPopover()` 顯示 popover
- `HTMLElement.hidePopover()` 隱藏 popover.
- `HTMLElement.togglePopover()` toggle popover.
```jsx
const handleToggle = (event) => {
  const popover = document.getElementById("mypopover");
  if (popover.matches(":popover-open")) {
    popover.hidePopover();
  } else {
    popover.showPopover();
  }
  // or
  popover.togglePopover();
};
```

> `popover.matches(":popover-open")` 檢查很重要，避免在嘗試顯示已顯示的彈出視窗或隱藏已隱藏的彈出視窗時引發錯誤


## 如何設計 Popover 樣式？
- `:popover-open` 表示處於顯示狀態的 popover 元素（即具有 popover 屬性的元素）
- `::backdrop` 偽元素是直接放置在頂層顯示彈出框元素後面的全螢幕元素
```css
#mypopover:popover-open {
  width: 200px;
  height: auto;
  position: absolute;
  inset: unset;
  bottom: 12px;
  right: 12px;
  margin: 0;
  padding: 4px 8px;
  border-radius: 6px;
}

#mypopover::backdrop {
  background-color: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(3px);
}
```


## 如何替 Popover 加上動畫？
- [animating_popovers](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API/Using#animating_popovers)
這部分稍微複雜點，可以參考官方文件說明，簡單講就是透過 `@starting-style` 屬性，讓 `display: none` 能在顯示、隱藏的狀態間進行過渡，具體可參考我的另一篇文章專門說明[如何不用 setTimeout 幫 display: none 的 DOM 加動畫](/articles/css/starting-style.html)
```css
#mypopover {
  width: 200px;
  height: auto;
  position: absolute;
  inset: unset;
  bottom: 12px;
  right: 12px;
  margin: 0;
  padding: 4px 8px;
  border-radius: 6px;
  /* animate */
  opacity: 0;
  transform: scaleY(0);
  transition:
    opacity 0.7s,
    transform 0.7s,
    overlay 0.7s allow-discrete,
    display 0.7s allow-discrete;
}

#mypopover:popover-open {
  opacity: 1;
  transform: scaleY(1);
}

@starting-style {
  #mypopover:popover-open {
    opacity: 0;
    transform: scaleY(0);
  }
}

#mypopover::backdrop {
  background-color: rgba(0, 0, 0, 0);
  backdrop-filter: blur(0px);
  transition:
    display 0.7s allow-discrete,
    overlay 0.7s allow-discrete,
    background-color 0.7s;
}

#mypopover:popover-open::backdrop {
  background-color: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(3px);
}

@starting-style {
  #mypopover:popover-open::backdrop {
    background-color: rgba(0, 0, 0, 0);
    backdrop-filter: blur(0px);
  }
}
```

<SocialBlock hashtags="web-api,popover,javascript,dialog,modal" />

## 結論
這次介紹了原生的 Web Popover API，雖然目前各瀏覽器支援度還需要驗證，但使用起來還是蠻方便的，如果只是在製作一些小專案或測試時可以使用看看，快速完成相關的功能，今天介紹就到這拉～下篇文章見=V=
