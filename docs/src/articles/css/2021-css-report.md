# 2021 CSS 年度報告筆記
###### tags: `CSS` `report` `2021`

<SocialBlock hashtags="css,report,2021" />

大家好～今天來介紹一些最近網上大大們關於 css 年度報告後的一些我覺得比較特別的屬性筆記，內容會以我個人主觀經驗來認定，並給出我的想法與分析

## Layout

### Flex

這還是持續為當今切版使用主流，畢竟支援度就是比較高一些

### Grid

這個屬性從我認識他到現在兩年多過去，各家瀏覽器支援度還是沒有 Flex 來得高，但總體來說仍是一個「可以用」且有其「存在價值」的屬性

比如對於某些用 Flex 難以處理的切版，使用 Grid 可以更好地進行處理，如下面範例中的 `repeat(3, 1fr 2fr)` 這種具有某些規律，但又具有相異結構的切版就很適合使用，或是要針對每一個內部元素進行 col, row 位置大小設定時，可以使用 `grid-column-start`, `grid-column-end` 等屬性進行細部處理

雖然我個人幾乎沒有在用 Orz...，畢竟工作上會遇到像下面這種神奇排版的機會真的不多

[範例](https://www.w3schools.com/css/css_grid.asp)

```scss
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr 2fr);
  .col {
    border: 1px solid;
  }
}
```

### Multi-Column

這個屬性支援度非常高，對於一些需要大量文字排版切版時可以大大省去切版的力氣，非常推薦給需要處理大量文字切版的前端使用

[範例](https://www.w3schools.com/cssref/tryit.asp?filename=trycss3_column-rule)

```scss
.newspaper {
  column-count: 3;
  column-gap: 40px;
  column-rule: 4px double #ff00ff;
}
```

### Position Sticky

這屬性跟 Grid 支援度差不多，對於一些較舊的瀏覽器版本確實要考慮一下，但這屬性確實拯救了無數前端童鞋們，最經典的應用就是在網站 Nav 導覽列的固定在上場景

```scss
nav {
  position: sticky;
  top: 0;
}
```


### Aspect-Ratio

這個屬性雖然目前支援度還不太行，但它可以很方便地幫助我們對圖片、影片等等需要保持尺寸比例的物件進行設定，範例如下

- 假設我們需要對 iframe 畫面設定尺寸

```html
<div class="yt-wrapper">
  <iframe></iframe>
</div>
```

```scss
.yt-wrapper {
  position: relative;
  width: 300px;
  overflow: hidden;
  aspect-ratio: 16 / 9; // 16:9
  iframe {
    position: absolute;
    width: 100%;
    height: 100%;
  }
}
```


### Content Visibility

這個屬性主要用來提升頁面渲染的效率，可以讓指定元素在用戶瀏覽到之前先不進行渲染作業，等到需要時再進行運算處理，藉此加快畫面渲染速度

> 缺點!!!!除了目前支援度還不太行，並且如果頁面需要點擊滾動到指定位置的功能時，**不適當的添加此屬性可能會導致滾動功能異常**（之前做一頁式 SPA 踩過的雷），因為這個設定會讓元素延遲渲染，間接導致滾動時的位置運算異常，因為在滾動前、後畫面渲染的頁面高度如果會不一樣，就會出事

個人建議要使用此屬性還是可以的，畢竟瀏覽器不支援時不會有什麼大問題，若是支援那正好可以加快頁面渲染效率，只需要特別注意上面提到的滾動問題即可

```scss
img {
  content-visibility: auto;
}
```

## Graph/Image

### Object Fit

這個屬性看過的人應該很多，實際用起來非常像 background-size 的配置，傳統上如果我們寫死一個圖片寬高不吻合原尺寸，圖片將會變形，加上這個屬性後可以讓圖片維持原比例並根據需要截斷超出的部分等等功能

```scss
img {
  width: 300px;
  height: 200px;
  object-fit: contain; // 自行縮放至完整顯示
}
```

### Clip Path

這個屬性可裁剪元素的可見範圍，且裁剪的形狀是任意形狀！也沒有對定位有任何要求限制，幾乎是製作網頁動畫必備的屬性之一，托網路神人的福，現在我們可以用下面這網站快速生成想要的形狀

- [範例](https://www.cssportal.com/css-clip-path-generator/)

### Mix Blend Mode

這屬性除了用在各種圖層疊加外，也很常用在 gif 動畫之中，作為 sprite animation 的替代品是個不錯的選擇(前提是你不需要對該動畫有細部的控制時...)

```scss
.container {
  background-image: linear-gradient(90deg, #fff 49.9%, #000 50%);
  h1 {
    font-size: 100px;
    color: #fff;
    mix-blend-mode: difference;
  }
}
```

### Filter

濾鏡效果幾乎已經深入網頁開發的方方面面了，舉凡高對比、灰階、亮度、陰影、模糊等等都可以做到

```scss
.my-img {
  filter: constrast(1.3);
}
```

### Perspective

透視，主要在製作 CSS 3D 動畫時使用，用來設定使用者視角與頁面畫布之間的距離

- [範例](https://developer.mozilla.org/en-US/docs/Web/CSS/perspective)

### Intrinsic Sizing

內在尺寸，支援度也不錯，用來設定元素「內部」內容的尺寸，相比於 width, height 則是外部尺寸，這個可以應用在一個很常見的場景，比如一個外部限制了寬度，但內層的 h1 元素卻想要維持一行，傳統可能就要設定一個 width 給 h1，並且限制文字斷行行為

```scss
// 傳統
.container {
  width: 50px;
  h1 {
    white-space: nowrap;
    border: 1px solid;
  }
}
```

但這種做法 h1 只是文字超出 container，他的 border 卻沒有跟著內容變大，此時就可以應用這個 Intrinsic Sizing 概念改為如下

```scss
.container {
  width: 50px;
  h1 {
    width: max-content;
    border: 1px solid;
  }
}
```

此時可以看到 h1 的寬度是照著內部內容完全縮放了，只需注意，IE 不支援這屬性～

- [範例](https://developer.mozilla.org/en-US/docs/Web/CSS/max-content)


## Interactive

### Scroll Snap

滾動捕捉效果，支援度也還行，在很多輪播套件中常常看到，可以讓滾動的效果卡點在某些位置加強體驗

- [範例](https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-snap-type)

### Overscroll Behavior

這屬性用來設定當指定元素滾動到達其底部時的行為，通常是用來限制元素不要在滾動完畢後帶動整個畫面的滾動效果，比如側邊滑塊 menu 就是一個經典的場景，可以讓滑動不會穿透到整個 body

缺點是支援度還不是非常理想，大約 76%，不過他的支援度，理論上不會影響太多功能面的關鍵東西

```scss
.slide-menu {
  overscroll-behavior-y: contain;
}
```

### Touch Action

用來設定用戶如何操控觸摸螢幕的區域，常用在移動端設備上，例如設定水平輪播滑動時，避免觸發垂直滑動

```scss
.image-carousel {
  width: 100%;
  height: 150px;
  touch-action: pan-y pinch-zoom;
}
```

或是用來禁用 IOS 的畫面縮放效果

```scss
*:not(input, textarea, select) {
  touch-action: pan-x pan-y;
}
```

### Pointer Events

用來設定用戶操控鼠標進行的事件，比如禁用一個元素的點擊可以用

```scss
.no-click {
  pointer-events: none;
}
```


## Others

### Line Clamp

這個屬性算是蠻常用的，支援度也很高，主要用來設定容器最大可容納行數，通常跟 `display: -webkit-box;` 一起使用

> 注意使用時需限制元素高度

```scss
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  -webkit-box-pack: start;
  word-break: break-word;
  overflow: hidden;
}
```

### CSS Variable

CSS 原生支援的變數相信大家都知道，這個變數的作用域甚至可以讓我們做到許多好用的抽象效果

比如我們可以預先定義一組 class 包含變數，此時變數是未定義的

```scss
.color-mixin {
  color: var(--color);
}
```

接著套用到我們的目標元素

```html
<p class="my-font color-mixin">Hello World</p>
```

最後在指定的 scope 內定義 mixin 用到的變數即可

```scss
.my-font {
  --color: red;
}
```

### Supports

這個 css at-rule 可以用來檢測環境是否支援指定的功能，比如檢測是否支援自定義變數等等，詳細可參考範例

> 注意，此功能 IE 完全不支援

- [範例](https://developer.mozilla.org/en-US/docs/Web/CSS/@supports)

```scss
@supports (--foo: bar) {
  body {
    color: var(--my-color);
  }
}
```

### Contain

這個屬性是用來隔離元素渲染的機制，可以指定不同的面向進行隔離，優化網頁的渲染效能，依照嚴謹程度可以分成 `strict`, `content`, `none` 三方案，這三方案只能選其中之一，或是手動進行不同面向的多選設定 `layout`, `size`, `paint`, `style`

當設定的內容超出其範圍時，會直接被瀏覽器捨棄而不會渲染，比起傳統的 `overflow: hidden` 即使看不到還是渲染，這個隔離是會將元素與其他元素間進行「次元切割」XD

- [範例](https://developer.mozilla.org/en-US/docs/Web/CSS/contain)

> 使用 `contain: strict;` 需注意元素消失的狀況，因為其包含隔離 `size`，若沒有明確設定該元素高度，他將不繼承父層高度而消失，此情況建議使用 `contain: content;` 隔離 `layout paint` 就好

```scss
.my-container {
  contain: 'content';
}
```

### Will Change

這個屬性可以告訴瀏覽器元素哪些東西在未來可能會變動，讓瀏覽器能在屬性變動時快速調用 GPU 幫你做處理，而不會突然變動只能臨時調用 CPU 費時費工又容易掉幀，使用上非常簡單，只需要給屬性名稱即可

支援度也還算高的了，有 96%

> 使用上有點難度，一般直接寫在默認樣式裡是沒用的，可以用 js 或是 css 的動作時加上

```scss
.will-change {
	transition: transform 0.3s;
}
.will-change:hover {
	will-change: transform;
}
.will-change:active {
	transform: scale(1.5);
}
```

### CSS Function

這個相信很多朋友已經在使用了，像是 calc(), min(), max(), attr() 等等都是非常好用的 css function，不同 function 支援度不太一樣，建議使用前確認下

```scss
.container {
  .col {
    width: calc(100% / 3);
  }
  .my-img {
    width: min(100px, 20vh, 30vw); // 取相對小
  }
}
```

以上就是這次看網上大大的總結跟我自己的一些小感想，謝謝大家～

喜歡的話可以幫我分享瞜

<SocialBlock hashtags="css,report,2021" />

## 參考
- [看完了 2021 CSS 年度报告，我学到了啥？](https://juejin.cn/post/7043577751344775176#heading-38)
