# CSS: mix-blend-mode 屬性混合圖層動畫
###### tags: `CSS` `Animation`

### 背景

前端工作上，常使用到一些動畫效果，除了使用 `@keyframes` 製作簡單動畫外，也會使用例如`background-position: -800px 0;` 搭配 `animation: XX 2s step(10) infinite` 等來將動畫以 frame 的方式進行處理，或是使用 JavaScript 的 requestAnimationFrame 製作，但今天要分享的是一種特殊使用場景＿使用 gif 疊加圖層製作。

### 範例

主要使用的是 CSS 的 `mix-blend-mode` 屬性，它能夠對圖層進行混合處理，而此一特性，正好可用來將 gif 的黑色背景去除，從而達到類似 png 的透明效果。

```htmlmixed=
<div class="bg">
  <img src="XX.gif" />
</div>
```

```css
.bg {
  background: url('XX.png');
  img {
    mix-blend-mode: color-dodge; // 混合模式
  }
}
```

以上最後會將 bg 內的 img 進行圖層混合， `color-dodge` 為加亮功能，正好去除 gif 黑色底，讓 gif 就像 png 一般疊加在背景上，卻又能進行動畫的效果。


### 注意點

* `mix-blend-mode` 除了直接加在 img 標籤的 CSS 設定上以外，假如需要將較深層的圖片混合到外部背景之類的狀況下，可以在外部背景的區塊加上此屬性進行混合，但需注意，當對整個區塊混合時，內部所有節點會視為一個整體而一起被混入，有時會造成畫面渲染的顯示異常。
* 需要混合的圖層必須在同一個元素區塊的子節點中，背景若設定在單獨被 fixed 的圖層，則該背景將無法與其他圖層混合導致問題。
* 使用時需注意圖層之間 z-index 的設定會影響圖層疊加的順序