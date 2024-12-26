# 2024 CSS 年度報告筆記
###### tags: `CSS` `report` `2024`

<SocialBlock hashtags="css,report,2024" />

大家好～今天來個久違的 2024 CSS report 大補帖，好久沒有做 CSS 相關的系列了，時間都被 JS 吸乾拉～，今天要來一次把過去幾年 2022-2024 年的 3年中，重要的 CSS 革命性更新功能惡補及記錄下來!

因為是累積了 3年的份量，且我實在懶得切分成好幾篇文章紀錄（不想一直換頁找東西），所以整個新功能內容非常長，建議分批觀看，避免學習過多消化不良

> 注意！以下介紹的所有 feature，有些還在實驗開發階段，在正式環境使用之前，請確保前往相關 CSS 瀏覽器相容性查詢網站確認是否穩定可用！


## Layout

### Sub Grid
當使用 `display: grid` 時，只有直接指定的元素本身會成為網格區塊。這些元素的子元素則仍以正常流程顯示，雖然我們能夠再加入更多層 grid 子層，但這些子元素的 grid 與父層之間的 grid 並沒有關聯參照的能力，會導致子元素 grid 與父元素之間版面對齊的困難

如果在 grid-template-columns、grid-template-rows 或兩者上設定 subgrid，則 nested grid 將使用在父級上定義的軌道，而不是建立一個新的 grid

如下使用 `grid-template-columns: subgrid` 並且巢狀網格跨越父 grid 的三個列軌道，則巢狀網格將具有與父網格大小相同的三個列軌道
```html
<div class="grid">
  <div class="item">
    <div class="subitem"></div>
  </div>
</div>

<style>
.grid {
  border: 2px solid #f76707;
  border-radius: 5px;
  background-color: #fff4e6;
}

.item {
  border: 2px solid #ffa94d;
  border-radius: 5px;
  background-color: #ffd8a8;
  color: #d9480f;
}

.subitem {
  background-color: rgb(40, 240, 83);
}

.grid {
  display: grid;
  grid-template-columns: repeat(9, 1fr);
  grid-template-rows: repeat(4, minmax(100px, auto));
}

.item {
  display: grid;
  grid-column: 2 / span 4;
  grid-row: 2 / 4;
  grid-template-columns: subgrid;
  grid-template-rows: repeat(3, 80px);
}

.subitem {
  grid-column: 1 / span 2;
  grid-row: 1 / 3;
}
</style>
```

> 注意，行編號在 subgrid 中會重新計算，因此 `1 / span 2` 是從子 grid 中的 1 開始算起


### text-wrap
作為網頁切版主力的前端，過去在控制文字換行時常常手忙腳亂，一查就會跳出 word-break、word-wrap、overflow-wrap，頓時不知道到底要用哪個來做到需求（索幸全部亂加一通），以後可以透過 `text-wrap` 輕鬆讓瀏覽器自己去控制元素內文字的換行及美化方式！
- 排版改進，例如跨標題的行長度更加平衡
- 一種完全關閉文字換行的方法
```css
text-wrap: wrap;
text-wrap: nowrap;
text-wrap: balance;
text-wrap: pretty;
text-wrap: stable;
```

> 詳細想知道怎麼更好處理文字換行可以[參考這篇](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_text/Wrapping_breaking_text)


### @container query
類似於 `@media` 的能力，差別在 `@media` 針對 browser screen size，而 `@container` 針對 element size，總共有如下三種屬性
- `container-type`、`container-name`、`container`，其中 container 是另外兩個的簡寫
  - container: `<container-name> / <container-type>`
  - container-type: normal, size, inline-size, scroll-state
  - container-name: 取你喜歡的名子

```css
/* 當 component 元素寬度大於 350px 時套用樣式 */
.component {
  max-width: 400px;
  height: 200px;
  background: red;
  container: fancy / inline-size;
}

@container fancy (inline-size > 350px) {
  a {
    color: green;
  }
}
```

### @layer - Cascade Layers
使用 CSS 時如果稍不注意，很容易發生樣式互相覆蓋的問題，或是必須使用 @important 去強制改寫覆蓋優先級，但更容易導致維護困難，此時就可以使用 `@layer` 定義層級的優先關係，方便後續管理，使用方式如下

- 預先定義好層級關係，層級定義越下面的優先，此處即使 B 層級中使用了 id selector，但因為 C 層級位於更下方，具有更高優先級，所以最終會是 green 而不是 blue 套用
```html
<div id="app"></div>

<style>
@layer A, B, C;

@layer A {
  div {
    background-color: red;
  }
}

@layer B {
  #app {
    background-color: blue;
  }
}

@layer C {
  div {
    background-color: green;
  }
}
</style>
```

### Media Query Ranges
過去在設定 `@media` 的大小範圍時常常需要像下面這樣，結合 min-width, max-width 使用，既沒有效率也很冗長
```css
@media (max-width: 750px) {
	/* */
}
@media (min-width: 750px) {
  /* */
}
@media (min-width: 375px) and (max-width: 750px) {
  /* */
}
```
現在可以寫成這樣
```css
@media (width <= 750px) {
	/* */
}
@media (width >= 750px) {
  /* */
}
@media (375px <= width <= 750px) {
  /* */
}
```

### Media Query Update
更新媒體查詢讓我們能根據用戶裝置的螢幕刷新率提供不同的樣式套用，格式如下
- none, slow, fast
```css
@media (update: < none | slow | fast >) {
  /* styles to apply if the update frequency of the output device is a match */
}
```
```css
@keyframes jiggle {
  from {
    transform: translateY(0);
  }

  to {
    transform: translateY(25px);
  }
}

@media (update: fast) {
  p {
    animation: 1s jiggle linear alternate infinite;
  }
}
```

### Media Query Scripting
過去我們需要使用 html 的 nojs script 來判斷環境是否支援 javascript，而在 CSS 中我們可以透過 `@media` 輕鬆做到，格式如下
```css
@media (scripting: < none, initial-only, enabled >) {
  /* styles to apply in specific script support environment */
}
```


### @scope
`@scope` 讓我們能選擇特定 DOM 子樹中的元素，精確定位元素範圍，而無需編寫難以覆蓋的過於特定的選擇器，並且不會將選擇器與 DOM 結構耦合得太緊密，格式如下
```css
@scope (scope root) to (scope limit) {
  rulesets
}
```
- 假設我們有一個 DOM 結構，並且需要指定 section.article-body 中的 img 添加樣式，我們可能會寫成
  - `.feature > .article-body > img`: 這樣寫太特定，導致後續樣式難以覆蓋，並且與 DOM 結構耦合過高，後續調整結構後必須相應來調整 CSS 否則會出問題
  - `.feature img`: 這樣寫太鬆散，會匹配到所有 image
```html
<article class="feature">
  <section class="article-hero">
    <img />
  </section>
  <section class="article-body">
    <h3></h3>
    <p></p>
    <img />
    <figure>
      <img />
      <figcaption></figcaption>
    </figure>
  </section>
</article>
```
此時就可以用 `@scope` 改寫如下，指定起點範圍是 .article-body，終點（不包含其中）figure，我們就可以只匹配到 .article-body 中的 img，而不包含到 figure 裡的 img，提升了匹配的效率與彈性
```css
@scope (.article-body) to (figure) {
  img {
    border: 5px solid black;
    background-color: goldenrod;
  }
}
```


### Anchor Positioning 錨點定位
- [MDN Document](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_anchor_positioning)
此功能讓開發者能精準設定兩個元素的相對位置，使用 anchor-name、position-anchor 及 position-area 快速定位元素位置

下面範例文字是在圖片之前，但透過錨點定位到圖片下方居中
```html
<span class="anchor-el">Pretty Girl</span>
<img class="anchor-to" src="img.jpg" />

<style>
.anchor-to {
  anchor-name: --myimg;
  width: 200px;
}

.anchor-el {
  position: fixed;
  position-anchor: --myimg;
  position-area: bottom center;
}
</style>
```


## Animations

### @property - Custom Property 自定義屬性
- [MDN Document](https://developer.mozilla.org/en-US/docs/Web/CSS/@property)
`@property` rule 讓開發者可以直接在樣式表中註冊自訂屬性，無需執行任何 JavaScript，允許對屬性`類型檢查`和`約束`、設定`預設值`以及定義自訂屬性是否可以`繼承值`，自定義屬性名稱以 `--` 開頭，後面跟著使用者定義的名稱，且需要`區分大小寫`
```css
@property --rotation {
  syntax: "<angle>";
  inherits: false;
  initial-value: 45deg;
}
```
- 以下範例，定義了兩個 custom 屬性 --item-size, --item-color，後者沒有自動繼承父層
```css
@property --item-size {
  syntax: "<percentage>";
  inherits: true;
  initial-value: 40%;
}

@property --item-color {
  syntax: "<color>";
  inherits: false;
  initial-value: "aqua";
}

.container {
  display: flex;
  height: 200px;
  border: 1px dashed black;

  /* 父元素設定 custom property values */
  --item-size: 20%;
  --item-color: orange;
}

/* 子元素設定 custom properties */
.item {
  width: var(--item-size);
  height: var(--item-size);
  background-color: var(--item-color);
}

/* 個別設定子元素 custom property values */
.two {
  --item-size: initial;
  --item-color: inherit;
}

.three {
  /* 不合法值 */
  --item-size: 1000px;
  --item-color: xyz;
}
```


### Transition Behavior 離散屬性動畫
- [MDN Document](https://developer.mozilla.org/en-US/docs/Web/CSS/transition-behavior)
- `transition-behavior: normal | allow-discrete;`
這個屬性可以讓元素屬性具有在兩個或以上的狀態間變化的能力，例如 display, content-visibility 可以在 50% 處過度屬性，而不總是 0, 100%

### @starting-style
這個屬性主要針對元素進入畫面時套用樣式，除了元素初次渲染以外，由 `display: none` 切換顯示的元素也可以使用，透過 `@starting-style` 搭配上面的 `transition-behavior: allow-discrete` 我們可以製作一個簡單的元素原生 fade in/out 效果如下，不再需要 setTimeout 手動處理了：

```jsx
function App() {
  const [show, setShow] = useState(true);
  return (
    <div>
      <div id="box" className={show ? '' : 'hide'}></div>
      <button onClick={() => setShow(!show)}>Toggle</button>
    </div>
  );
}
```

```css
#box {
  width: 50px;
  height: 50px;
  background: red;
  transition-property: display, opacity;
  transition-duration: 250ms;
  transition-behavior: allow-discrete;
}

#box.hide {
  display: none;
  opacity: 0;
}

@starting-style {
  #box {
    opacity: 0;
  }
}
```

### overlay 屬性
- [MDN Document](https://developer.mozilla.org/en-US/docs/Web/CSS/overlay)
- `overlay: auto|none;`
這個屬性指定元素是否已 top layer 的形式出現（比如 popover 及 dialog 元素），使用時需搭配上面提到的 `transition-behavior: allow-discrete;` 才能製作 overlay 的 transition 效果，要注意的是 overlay 只能由瀏覽器設定，開發者樣式無法更改任何元素的overlay 值

### 高度 transition
有兩種方式做到，一個是使用 `interpolate-size`，第二種是透過 `calc-size()`，其中第二種在使用時預設會自動套用 `interpolate-size: allow-keywords` 的效果
#### interpolate-size
可以選擇在 root 上全局開啟功能，或是針對特定 scope 套用
```css
:root {
  interpolate-size: allow-keywords;
}
/* or */
main {
  interpolate-size: allow-keywords;
}
```
之後就可以在全局或指定 scope 中使用 height transition
```html
<section tabindex="0">
  <header>
    <h2>Tanuki</h2>
  </header>
  <main>
    <p>Tanuki is the silent phantom of MDN.</p>
    <ul>
      <li><strong>Height</strong>: 3.03m</li>
      <li><strong>Weight</strong>: 160kg</li>
      <li><strong>Tech Fu</strong>: 7</li>
      <li><strong>Bad Jokes</strong>: 9</li>
    </ul>
  </main>
</section>

<style>
section {
  height: 2.5rem;
  overflow: hidden;
  transition: height ease 1s;
}

section:hover,
section:focus {
  height: max-content;
}
</style>
```

#### calc-size([calc-size-basis], [calc-sum])
- [MDN Document](https://developer.mozilla.org/en-US/docs/Web/CSS/calc-size)
這個函數允許我們使用內建尺寸進行運算（比如 auto, fix-content, max-content），常見的 `calc()` 函數不支援這個功能。
```css
/* Pass a value through calc-size() */
calc-size(auto, size)
calc-size(fit-content, size)

/* Perform a calculation */
calc-size(min-content, size + 100px)
calc-size(fit-content, size / 2)

/* Calculation including a function */
calc-size(auto, round(up, size, 50px))

.container:hover p {
  height: calc-size(min-content, size + 200px);
}
```


### CSS Cross-Document View Transitions 過場動畫
跨文檔的視圖過渡 (View Transitions) 讓我們能輕易在不同 document page 之間套用轉場動畫，詳細設定可透過 js 進行更精準控制，會另一篇介紹 [View Transitions - 認識並使用原生 document 轉場效果](../js/view-transition.html)

- 最簡單的方式，只要兩個 page 是在同源的情況下（same-origin）
```css
@view-transition {
  navigation: auto;
}
```


### CSS Scroll-Driven Animations 滾動驅動動畫
- [MDN Document](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_scroll-driven_animations)
  - [animation-timeline](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-timeline)
  - [JS ScrollTimeline](https://developer.mozilla.org/en-US/docs/Web/API/ScrollTimeline)
與後續會介紹的 JS 的 ScrollTimeline 有關，這邊是介紹透過純 CSS 的 `animation-timeline` 對滾動元素添加動畫

- 指定特定滾動元素 `scroll-timeline-name` 定義一個 scroll timeline 名稱，再透過 `animation-timeline` 指定動畫的元素套用某個 scroll-timeline，也可以直接使用 `scroll()` 建立匿名 scroll timeline 使用，這個情況下預設 `scroll()` 等於 `scroll(block nearest)`
```html
<div id="container">
  <div id="square"></div>
  <div id="stretcher"></div>
</div>

<style>
#container {
  position: relative;
  height: 300px;
  overflow-y: scroll;
  scroll-timeline-name: --squareTimeline;
}

#stretcher {
  height: 600px;
}

#square {
  background-color: deeppink;
  width: 100px;
  height: 100px;
  margin-top: 100px;
  animation-name: rotateAnimation;
  animation-duration: 1ms; /* Firefox requires this to apply the animation */
  animation-direction: alternate;
  animation-timeline: --squareTimeline; /* Named */
  /* or */
  animation-timeline: scroll(); /* Anonymous */

  position: absolute;
  bottom: 0;
}

@keyframes rotateAnimation {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
```

- 全畫面滾動套用使用則設定 `view-timeline-name`，或是用 `view()` 匿名定義立即使用
```css
svg {
  animation: scrollin linear;
  view-timeline-name: --subjectReveal;
  animation-timeline: --subjectReveal;
  /* or */
  animation-timeline: view();
}

@keyframes scrollin {
  0% {
    scale: 1;
  }
  50% {
    scale: 10;
  }
  80%,
  100% {
    scale: 800;
  }
}
```


## Pseudo-classes

### :has(selector)
接受一個 selector，並給有匹配子元素的父類樣式
- 匹配包含 a 子元素的 div 元素
```css
div:has(a) {
  color: blue;
}
```

### :nth-child(nth [of complex-selector-list]?)
透過加入 `of`，可以在進行 nth filter 前先篩選一次，比如下方將 .note 的元素先過濾出後才進行 nth 內容樣式套用
```jsx
function App() {
  return (
    <ul>
      {Array(20).fill(1).map((_, i) => (
        <li className={i <= 10 ? 'noted' : ''}>{i + 1}</li>
      ))}
    </ul>
  );
}
```
```css
li:nth-child(even of .noted) {
  background-color: tomato;
}
```

### :user-valid 和 :user-invalid
兩者行為類似 :valid 和 :invalid，但只有在使用者進行交互後才會匹配檢查，至此再也不用自己追蹤輸入狀態進行手動檢查拉！～
```css
input:user-valid,
select:user-valid,
textarea:user-valid {
  --state-color: green;
  --bg: linear-gradient(45deg in oklch, lime, #02c3ff);
}

input:user-invalid,
select:user-invalid,
textarea:user-invalid {
  --state-color: red;
  --bg: linear-gradient(15deg in oklch, #ea00ff, #ffb472);
}
```


## Components
### popover
這個組件在之前的文章中有詳細介紹，有興趣的可以前往看看 [來試用看看原生 Web Popover API](../js/popover-api.html)

### select 分隔線
現在可以在 select 中使用 `<hr>` 渲染分隔線，比如
```html
<select name="majors" id="major-select">
  <option value="">Select a favorite feature</option>
  <hr>
  <optgroup label="Foundations">
    <option value="trig">Trigonometric functions</option>
    <option value="nth">Complex nth-* selection</option>
    <option value="nesting">Nesting</option>
    <option value="subgrid">Subgrid</option>
    <option value="mq-ranges">Media query range syntax</option>
  </optgroup>
  <optgroup label="Typography">
    <option value="initial-letter">Initial-letter</option>
    <option value="text-wrap-b-p">Text-wrap: balance / pretty</option>
  </optgroup>
  <optgroup label="Color">
    <option value="color-4">CSS Color level 4</option>
    <option value="color-mix">Color-mix function</option>
    <option value="rcs">Relative color syntax</option>
  </optgroup>
  <optgroup label="Responsive Design">
    <option value="cq">Size container queries</option>
    <option value="sq">Style container queries</option>
    <option value="has">:has() selector</option>
  </optgroup>
</select>
```

### Exclusive Accordion 獨家手風琴
`<details>` 給一個 name 屬性即可讓相同 name 值的 details 元素彼此連動，當開啟其中一個時，已開啟的分頁將會被自動關閉

```html
<details name="my-accordion">
  <summary>Summary 1</summary>
  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
</details>

<details name="my-accordion" open>
  <summary>Summary 2</summary>
  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
</details>

<details name="my-accordion">
  <summary>Summary 3</summary>
  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
</details>
```

### 客製化 details 元素樣式
現在可以對 details 元素加上自定義樣式調整外觀
- `::marker` 隱藏 detail 的 icon
```css
::marker {
  content: '';
}
```
- `[open]` 設定打開的樣式
```css
details[open] p {
  color: red;
}
```
- `::details-content` 設定開啟時效果，以下搭配前面學到的 interpolate-size 及 transition-behavior 就可以製作出一款堪用的原生獨家手風琴配上開闔的動畫
```css
:root {
  interpolate-size: allow-keywords;
}

details[open] p {
  color: red;
}

details::details-content {
  height: 0;
  overflow: hidden;
  transition-property: height, content-visibility;
  transition-behavior: allow-discrete;
  transition-duration: 0.5s;
}

details[open]::details-content {
  height: auto;
}
```


## JS related

### View Transitions
除了上面提到的 CSS 畫面轉場效果，更多進階內容將涉及 Javascript，獨立一篇記錄在這[View Transitions - 認識並使用原生 document 轉場效果](../js/view-transitions.html)

### ScrollTimeline
此 API 可以讓開發者獲取元素的滾動進度，結合 JS Animate 或 CSS Animation 做到將動畫與滾動進度綁定的效果，內容涉及較長，詳細可參考這篇 [MDN - ScrollTimeline](https://developer.mozilla.org/en-US/docs/Web/API/ScrollTimeline)



## Others

### Nested CSS 嵌套
這在過去使用 SASS 的年代想都不敢想，原生 CSS 居然能支援嵌套語法！！
```css
.blog {
  position: relative;
  padding: 1rem;

  .blog-item {
    width: 100%;
    & span {
      font-size: 1rem;
    }
  }
}
```


### Accent Color
`accent-color` 可以調整指定區塊內的表單預設樣式
```jsx
<ul className="component" style={{ accentColor: 'red' }}>
  <li>
    <input type="checkbox" checked />
  </li>
  <li>
    <input type="radio" checked />
  </li>
  <li>
    <input type="range" />
  </li>
  <li>
    <progress value="0.8"></progress>
  </li>
</ul>
```

### CSS Function
除了過去的 css function 之外，還新增了 color-mix(), sin(), cos(), tan(), asin(), acos(), atan(), atan2()，以及擴展了一些過去的函數比如 rgb()、hsl()、hwb()
- color-mix: 混色功能
```css
.text {
  color: color-mix(in lch, purple 50%, plum 50%);
  color: color-mix(in lch, plum, purple);
}
```
- 三角函數相關 sin(), cos()...，加強 CSS 動畫計算能力
```css
div.box-1 {
  transform: rotate(atan2(3, 4)); /* atan2(y, x) */
}
```


## References
- [CSS 和網頁版 UI 最新動態：2024 年 I/O 大會重點回顧](https://developer.chrome.com/blog/new-in-web-ui-io-2024)
- [為何我放棄 SASS 轉用原生 CSS](https://juejin.cn/post/7350209063520600102)
- [2023 年 CSS 新特性大盤點](https://www.51cto.com/article/776131.html)