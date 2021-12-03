# CSS 畫面鎖橫屏時，滾動的問題！！
###### tag `css`, `overflow`, `landscape`

<SocialBlock hashtags="css,overflow,landscape" />

今天這篇主要紀錄日常開發上遇到的一個問題，那就是究竟要怎麼在畫面鎖橫屏的同時，又能讓瀏覽器的滾動事件正確的執行呢？


## 問題重現

在解決問題前，我們必須先重現問題，請將下方的程式碼輸入到您的瀏覽器中。

（建議可以用手機打開看看）

```html
<div id="app">
  Hello World
  <div class="box"></div>
</div>
```

```scss
html {
  // 這邊因為轉向的關係，不能寫死寬高的 % 數，因為 % 數仍是依循 window 的寬高。
  // 必須讓畫面的寬是畫面長邊
  width: 100vmax;
  overflow: hidden; // 穿透 html 來滾動到 #app
  @media (orientation: portrait) {
    transform: rotate(90deg);
    transform-origin: 50vmin 50vmin;
  }
  body {
    margin: 0;
  }
}

#app {
  width: 100%;
  height: 100%;
  overflow: auto; // 希望滾動我們的 #app
  .box {
    height: 1000px;
    background: lightblue;
  }
}
```

我們對 html 設置 css @media 的轉向設定，可以讓畫面在直屏時，將畫面轉向 90 度達到橫屏的效果，但這邊就會發生一個問題，此時如果我們滾動畫面，就會發現實際上滾動還是直的！！

到底為什麼？？


## 分析問題

解決這問題的關鍵在於，瀏覽器在滾動時，到底滾動到了誰？


#### Element 怎麼滾動？

上面提到，`#app` 滾動還是垂直方向的原因是：我們將 html 設置為 `overflow: hidden`，此時滾動事件實際是傳遞到 `#app`，滾動方向就還是根據畫面方向而是直的，這是因為事件傳遞時並不知道我們的 `#app`已經打橫。

#### 預設是 html 滾動？還是 window 滾動？

同樣適用於整份文檔的最外層元素 html，而整個視窗 window 同樣也是一個元素，他的寬高就是我們的螢幕大小，也因此在不設定任何東西狀態下，當 html 元素大於視窗大小時，我們能夠對 window 進行滾動。

上面我們的 `transform-origin` 是 `50vmin` 雖然視覺上是吻合的，但實際這種轉法會讓瀏覽器無法正確判斷元素的長寬，從而導致滾動事件的異常。

#### 分析結論

到這邊，我們已經知道了。

1. 當我們透過 CSS 將 html 元素旋轉 90 度時，其實最外層 window 還是直的，當然滾動的方向仍然是以 window 的方向為主，也就會發生上下滑動畫面，html 元素卻左右滑動的奇特狀況(XD，第一次看到這問題時快笑死)

2. `transform-origin` 必須以完整方式轉向，不能從中心轉。


## 解決辦法

綜合上面分析得出結論，我們必須將瀏覽器的滾動事件傳到對的人身上，我們這邊就不討論 js 的解法了，以純 CSS 進行處理可以更節省更多效能。

#### Step 1. 將 window 下 html 條件鎖住

首先將 html 的寬設為螢幕寬如下，並且根據畫面比例 `orientation` 來設置 `overflow: hidden`，滾動事件也就不會對應觸發在他身上，透過這個方式我們將滾動事件穿透到了 body 上，另外 `transform-origin` 是以左上為圓心完整的打橫，也就可以順利將滾動事件觸發。

```scss
html {
  width: 100vmax;
  @media only screen and (orientation: landscape) {
    overflow-x: hidden;
  }
  @media only screen and (orientation: portrait) {
    overflow-y: hidden;
    // 轉向後移動到對的位置
    transform: rotate(90deg) translateY(-100%);
    transform-origin: top left;
  }
  body {
    // 這裡可以不用設寬高
    margin: 0;
  }
}
```

#### Step 2. 將 #app 維持預設狀態

```scss
// 移除 #app 相關寬高設定，維持自然預設
#app {
  .box {
    height: 1000px;
    background: lightblue;
  }
}
```


## 結論

透過這個問題，又加深了一次整個瀏覽器文檔的理解跟體會，CSS Model Box 概念跟滾動功能息息相關啊～～

以上就是小弟本人親身開發的一些體會，其實本來這問題牽涉到更多東西，例如滾動套件的滾動對象、以及要鎖屏滾動的同時，又要在整個頁面中插入背景圖等等，真的非常混亂，這次的文章主要是將最核心的問題抽離開來講解的，希望各位能夠在遇到時不會慌了手腳哈哈。

本篇純屬個人理解，寫得不好或是不周之處，還請各位大大們不吝賜教拉～^_^

<SocialBlock hashtags="css,overflow,landscape" />