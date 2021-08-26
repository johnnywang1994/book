# Safari 使用 animation 時動態產生 rem 的坑
###### tags: `CSS` `rem` `animation`

本篇誕生於同事日常開發動畫時遇到的問題，覺得是個不錯的主題，記錄下來：

主要需求很簡單，就只是使用 `@keyframes` 對元素進行上下懸浮的效果。並且浮動的長度單位使用的是動態生成的 rem。

> 動態生成 rem 的意思是，使用 js 並根據畫面螢幕尺寸變化，動態調整 `html` 的 `font-size` 大小，並在內部都使用 rem 來作為大小長度等尺寸依賴，藉此達到整體畫面文字圖片比例的自適應。

## 方法一

第一種作法如下：

```html
<div id="demo">元素</div>
```

```scss
// 假設當前畫面 html font-size 是 100px，並且會隨著畫面放大縮小而變大變小
html {
  font-size: 100px;
}

#id {
  position: absolute;
  top: 0.3rem;
  animation: floating 1s linear infinite;
}

@keyframes floating {
  from {
    top: 0.28rem;
  }
  to {
    top: 0.32rem;
  }
}
```

我們預期元素會在 0.28 ~ 0.32rem 的範圍內上下浮動。實際開啟瀏覽器也確實沒有問題。

但是！！，如果只是這麼簡單就不用這篇記錄了，當使用 `Safari` 瀏覽器開啟時，會發現只有一開始進入畫面時會是正確的位置，之後不論畫面放大縮小，懸浮位置似乎不會隨著畫面放大或縮小而調整。

照理來說，流程應該像下面這樣：

> 畫面 resize -> rem 動態變大或變小 -> animation 計算變化 -> 元素位置修正

但事與願違，他就是跑到一個很怪。

**發生原因**

經測試後了解發生原因是因為 `Safari` 會將靜態 CSS 的尺寸快取起來，頁面第一次載入後，為了提升效能，`Safari` 把一些靜態 CSS 快取起來，加快下次載入的速度，而所謂的 `靜態 CSS` 究竟包括了哪些？對，這就是本篇重點！！對於 CSS 來說，哪些是動態資源、哪些是靜態資源必須特別加以分辨。

上面的 `top` 屬性在 CSS 中，就屬於靜態資源，只會經過一次的瀏覽器計算，並且被快取起來，但製作動畫時，我們希望的是在每次畫面調整後，都能自動適應，並且維持最佳效能的東西，當今天只要定位元素時，就是使用靜態資源的時機; 但製作動畫時，如果使用靜態資源，會造成整個 CSS 的整個重新畫面渲染，這又牽涉到了 CSS 渲染重繪的分層 layout 概念。

> 段落大意：動畫使用動態資源，定位使用靜態資源。

## 方法二

方法二就是使用 CSS `transform` 來進行，當使用 `transform` 時，我們會利用 scale, translate, rotate 等等 CSS **`函數`** 來計算動畫屬性，而這個函數，在 CSS 中會動態求值，也因此可以解決這個快取問題。

改寫如下：

```scss
@keyframes floating {
  from {
    transform: translateY(-0.02rem);
  }
  to {
    transform: translateY(0.02rem);
  }
}
```

使用一樣的 rem 來設定，但這次不論畫面怎麼 resize，瀏覽器都能完美的呈現動畫該有的效果尺寸。

