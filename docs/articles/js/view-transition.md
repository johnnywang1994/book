# View Transitions - 認識並使用原生 document 轉場效果

<SocialBlock hashtags="javascript,css,transition,animation,document" />

## 背景
Hi 大家好，我是 Johnny，今天要介紹一個瀏覽器原生的畫面轉場效果 API，本篇是閱讀國外的文章 [WICG/view-transitions](https://github.com/WICG/view-transitions/blob/main/explainer.md) 後的相關筆記記錄


## 介紹
過去我們需要透過 SPA 搭配 CSS Transition, Animation 等以複雜的手段來實現少量的轉場動畫，但實際上使用時可能會採用最小化的方式，因為實際製作這些效果需要花費高昂的時間成本，然而新的轉場效果功能透過 `document.startViewTransition` 即可讓瀏覽器協助實現 document 之間切換的轉場效果

```js
function spaNavigate(data) {
  // Fallback for browsers that don't support this API:
  if (!document.startViewTransition) {
    updateTheDOMSomehow(data);
    return;
  }
  document.startViewTransition(() => updateTheDOMSomehow(data));
}
```

## 結構
呼叫 API 後會擷取頁面的目前狀態。包括截取螢幕截圖，這是異步的，因為它發生在事件循環的渲染步驟中，當完成後會再呼叫 callback 函數 updateTheDOMSomehow，此時 render 流程會被暫停，直到 callback 執行完畢並更新 DOM 後，API 會擷取頁面的新狀態，並建構一個像這樣的偽元素樹，動畫完成後，::view-transition 將被刪除，顯示下面的最終狀態

```
::view-transition
└─ ::view-transition-group(root)
   └─ ::view-transition-image-pair(root)
      ├─ ::view-transition-old(root)
      └─ ::view-transition-new(root)
```

## 直接用 CSS 套用轉場效果
上面所有的偽元素都可以用 CSS 來定位，因此可以直接由 CSS Animation 進行控制，底下是一個 [Material Design 的範例](https://material.io/design/motion/the-motion-system.html#shared-axis)
```css
@keyframes fade-in {
  from { opacity: 0; }
}

@keyframes fade-out {
  to { opacity: 0; }
}

@keyframes slide-from-right {
  from { transform: translateX(30px); }
}

@keyframes slide-to-left {
  to { transform: translateX(-30px); }
}

::view-transition-old(root) {
  animation: 90ms cubic-bezier(0.4, 0, 1, 1) both fade-out,
    300ms cubic-bezier(0.4, 0, 0.2, 1) both slide-to-left;
}

::view-transition-new(root) {
  animation: 210ms cubic-bezier(0, 0, 0.2, 1) 90ms both fade-in,
    300ms cubic-bezier(0.4, 0, 0.2, 1) both slide-from-right;
}
```
## 分離拆分獨立的多個轉場元素
如果某些畫面中的元素並不希望跟著進行轉場效果（比如 Header），此時可以使用 `view-transition-name` 把元素獨立出來，需要注意獨立的過渡元素需要設定 `contain: layout|paint`，並避免 fragment，如此該元素才可以被作為獨立單元處理

```css
.header {
  view-transition-name: header;
  contain: layout;
}
.header-text {
  view-transition-name: header-text;
  contain: layout;
}
```
設定後畫面中的過度元素會被拆成 3個部分 root, header, header-text，產生如下對應結構：
```
::view-transition
├─ ::view-transition-group(root)
│  └─ ::view-transition-image-pair(root)
│     ├─ ::view-transition-old(root)
│     └─ ::view-transition-new(root)
│
├─ ::view-transition-group(header)
│  └─ ::view-transition-image-pair(header)
│     ├─ ::view-transition-old(header)
│     └─ ::view-transition-new(header)
│
└─ ::view-transition-group(header-text)
   └─ ::view-transition-image-pair(header-text)
      ├─ ::view-transition-old(header-text)
      └─ ::view-transition-new(header-text)
```
## 轉場元素不需要是相同的元素
前面舉例中這些元素，在 DOM 更改之前和之後是相同的元素，但其實也可以在不同的情況下創建過渡，來看一個點擊縮圖顯示的範例：
- 添加一個 `view-transition-name` 到預覽圖上
```css
.full-embed {
  view-transition-name: full-embed;
  contain: layout;
}
```
- 按一下縮圖時，可以動態指定一個 view-transition-name，僅在轉換期間有效
```js
thumbnail.onclick = () => {
  thumbnail.style.viewTransitionName = "full-embed";

  document.startViewTransition(() => {
    thumbnail.style.viewTransitionName = "";
    updateTheDOMSomehow();
  });
};
```
這樣即使是兩個完全不同的元素，我們也能將兩者透過動態綁定 view-transition-name 來達到一樣的效果
## 轉場元素不需要在轉場前後都存在
如果一個元素只在新的狀態中存在也是可以的，此時對應轉場元素的 `::view-transition-old` 不存在，`::view-transition-group` 不會套用動畫，直接套用最終的元素位置

## 框架相容性
可以參考這裡的 [Preact 範例](https://github.com/jakearchibald/http203-playlist/blob/main/src/shared/utils.ts#L53)

## 效能考量
`::view-transition-group` 預設會對 width, height 套用動畫，這意味著動畫會在 main thread 上運行，但是否要使用 width, height 進行動畫取決於開發者，比如在圖片 4:3 轉場為 16:9 的情境中，可以使用 `object-fit` 或 `object-position` 達到相同的效果而不使用 width/height

view transition 本身是能夠在 main thread 之外運行的，但如果開發者添加了需要 layout 的內容（例如 border），動畫將回退使用 main thread

## 錯誤處理
在執行 document.startViewTransition 中的 callback 前，此 API 就會對環境條件進行錯誤檢查，比如出現重複的 view-transition-name 或某個元素是 Fragmented，如果有任何錯誤，callback 仍然會執行，畢竟 DOM 的更新更加重要，但會同時報出 `ready promise on the returned ViewTransition` 告警，這也是為何 document.startViewTransition() 接受的是一個 callback function

假如 API 不是以 callback 方式實作，比如下方案例：

```js
// Not the real API, just an alternative example:
const transition = new ViewTransition();
await transition.prepare();
await updateTheDOMSomehow();
transition.ready();
```
如果以非 callback 實作，在 updateTheDOMSomehow() 拋出錯誤，transition.ready 將永遠不會被調用，因此 API 將處於不知道 DOM 更改是否失敗的狀態，callback 模式避免了這個問題——我們可以看到拋出的錯誤，並快速放棄 Transition

## 完整預設樣式

```css
::view-transition {
  /* Aligns this element with the "snapshot viewport". This is the viewport when all retractable */
  /* UI (like URL bar, root scrollbar, virtual keyboard) are hidden. */
  position: fixed;
  top: -10px;
  left: -15px;
}

::view-transition-group(*) {
  /*= Styles for every instance =*/
  position: absolute;
  top: 0px;
  left: 0px;
  will-change: transform;
  pointer-events: auto;

  /*= Styles generated per instance =*/

  /* Dimensions of the new element */
  width: 665px;
  height: 54px;

  /* A transform that places it in the viewport position of the new element. */
  transform: matrix(1, 0, 0, 1, 0, 0);

  writing-mode: horizontal-tb;
  animation: 0.25s ease 0s 1 normal both running
    page-transition-group-anim-main-header;
}

@keyframes page-transition-group-anim-main-header {
  from {
    /* Dimensions of the old element */
    width: 600px;
    height: 40px;

    /* A transform that places it in the viewport position of the old element. */
    transform: matrix(2, 0, 0, 2, 0, 0);
  }
}

::view-transition-image-pair(*) {
  /*= Styles for every instance =*/
  position: absolute;
  inset: 0px;

  /*= Styles generated per instance =*/
  /* Set if there's an old and new image, to aid with cross-fading.
     This is done conditionally as isolation has a performance cost. */
  isolation: isolate;
}

::view-transition-old(*) {
  /*= Styles for every instance =*/
  position: absolute;
  inset-block-start: 0px;
  inline-size: 100%;
  block-size: auto;
  will-change: opacity;

  /*= Styles generated per instance =*/

  /* Set if there's an old and new image, to aid with cross-fading.
     This is done conditionally as isolation has a performance cost. */
  mix-blend-mode: plus-lighter;

  /* Allows the image to be the layout size of the element,
     but allow overflow (to accommodate ink-overflow)
     and underflow (cropping to save memory) in the image data. */
  object-view-box: inset(0);

  animation: 0.25s ease 0s 1 normal both running blink-page-transition-fade-out;
}

@keyframes page-transition-fade-out {
  from {
    opacity: 0;
  }
}

@keyframes page-transition-fade-in {
  to {
    opacity: 0;
  }
}
```

## Future
此 API 在文章撰寫時仍處於開發階段，未來可能仍有相關改動，詳細可[參考這邊](https://github.com/WICG/view-transitions/blob/main/explainer.md#future-work)

<SocialBlock hashtags="javascript,css,transition,animation,document" />