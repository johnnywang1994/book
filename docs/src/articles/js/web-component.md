# Web Component 學習筆記

Web component 不是一個框架，只是一種新的瀏覽器底層 API，允許使用者創造可重用的自定義組件。


## 技術架構

主要包含三大部分，分別如下：

  1. Custom elements:
  
  > 由一系列的 APIs 組成，允許用戶自定義組件，並可重複使用於後續開發。

  2. Shadow DOM

  > 由一系列的 APIs 組成，可以對指定 DOM 節點添加 shadow，使其從與原 document 分離渲染，達到組件私有化。

  3. HTML templates

  > `template`, `slot` 標籤，讓使用者定義可重複用的模板，該模板本身會被隱藏而不會顯示。


## 運用練習

#### Custom Element

Syntax:  
`customElements.define(name, constructor, options);`

每個 custom element 都是一個由 HTMLElement 繼承的類，定義之後可以使用 `new` 來創建新的 element，或是直接在 html 中插入。

```javascript
// 創建 Custom Element
class MyButton extends HTMLElement {
  constructor() {
    // 一定要先繼承
    super();
    // this 指向創建的 dom 節點
    this.innerHTML = '<button>按鈕</button>';
  }
}

customElements.define('my-button', MyButton);
```

如上即簡單創建了一個元素，後續可以像原生標籤一樣使用如下：

```html
<div id="app">
  <my-button></my-button>
</div>
```


#### Shadow Root

Syntax:  
`var shadowroot = element.attachShadow({ mode: 'open' });`

對指定元素添加 shadow，該 shadow 位在指定元素中，其中所包含的所有節點將私有化，內部樣式不會影響到外部。具體實踐如下：

```javascript
class MyButton extends HTMLElement {
  constructor() {
    super();
    // 創建 this 內部的 shadow root
    const shadowRoot = this.attachShadow({
      mode: true
    });
    // 將所有對 this 的動作轉為對 shadow root 進行
    shadowRoot.innerHTML = '<button>按鈕</button>';
  }
}
```

打開 console 將看到如下的節點

```html
<my-button>
  #shadow-root(open)
    <button>按鈕</button>
</my-button>
```


#### HTML templates

Syntax:
```html
<template id="my-temp">
  <div>
    <h3>Default Title</h3>
    <p>Default Content</p>
  </div>
</template>
```

可以簡單定義如上後，將其運用在 custom element 中：

```javascript
customElements.define('my-element', 
  class extends HTMLElement {
    constructor() {
      super();
      const template = document.querySelector('#my-temp');
      const templateContent = template.content;
      this.appendChild(templateContent.cloneNode(true));
    }
  }
)
```

## 進階-屬性監聽 observedAttributes

Web component 有提供許多底層調用的 API，讓用戶能夠具有高度使用的彈性，其中一個好用的功能就是屬性值監聽，藉由監聽屬性，進而在屬性被改變時調用對應的動作。

首先使用 `observedAttributes` 來定義需要被監聽的屬性隊列，之後在 `attributeChangedCallback` 這個方法裡定義屬性改變時調用的回調函數。

```javascript
class MyText extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = '這是隱藏內容';
  }

  static get observedAttributes() {
    return ['hide'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'hide') {
      if (newValue === 'true') {
        this.style.display = 'none';
      } else {
        this.style.display = null;
      }
    }
  }
}
customElements.define('my-text', MyText);
```

```html
<my-text hide="true"></my-text>
```
