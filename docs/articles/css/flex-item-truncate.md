# CSS: Flex 文字省略號為何需要 `min-w-0`
###### tags: `CSS` `Layout` `Flexbox`

<SocialBlock hashtags="css,flexbox,layout" />

### 背景

在做列表、卡片、訊息列這類常見 UI 時，通常會用 `flex` 排版：左邊放 icon / avatar，右邊放標題與描述。
文字太長時，我們也很自然會在文字節點加上 `truncate`（ellipsis）。

但實務上常遇到一個「看起來很像壞掉」的狀況：
`truncate` 明明有加，文字卻完全不省略，反而把整個區塊撐開。

### 範例

以下是一個常見結構：父層固定寬度，左圖右文，右側用 `flex-1` 撐滿。

```html
<div class="w-[300px] flex px-4 py-2 bg-gray-500">
  <img
    class="w-12 h-12 mr-3 rounded-[8px]"
    src="..."
  />
  <div class="flex-1 flex flex-col justify-center">
    <h4 class="flex items-center text-l font-semibold">
      <span class="truncate">ADAM STORE 亞果元素-蝦皮官方旗艦店</span>
    </h4>
  </div>
</div>
```

---

#### 原因

關鍵點在 **flex item 的預設最小寬度**。

在 Flexbox 裡，flex item 預設是：
- `min-width: auto`

而 `auto` 在 flex 情境下的行為，會讓元素的最小寬度趨近於「內容本身的最小需求寬度（min-content）」。
配上 `truncate` 內含的 `white-space: nowrap` 後，文字的 min-content 幾乎等於「整段文字完整寬度」。

結果就是：
- 右側那個 `flex-1` 的容器 不願意被壓縮
- 沒有真正產生 overflow
- `text-overflow: ellipsis` 沒機會觸發
- `truncate` 看起來像失效

---

#### 解法原理：讓 flex item 允許被壓縮

只要在「包含文字的第一層 flex item」加上 min-w-0：

```html
<div class="min-w-0 flex-1 flex flex-col justify-center">
  <h4 class="flex items-center text-l font-semibold">
    <span class="truncate">ADAM STORE 亞果元素-蝦皮官方旗艦店</span>
  </h4>
</div>
```

`min-w-0` 等同於 `min-width: 0`，讓這個 flex item 的最小寬度變成 0，允許這個 flex item 的寬度被壓縮到比內容更小

此時 layout 才會如預期發生：
1. 父層固定寬度

2. 左側圖片吃掉固定空間

3. 右側被分配剩餘空間，且可被壓縮

4. 文字超出 → overflow 出現

5. `truncate` 才能畫出 ellipsis

---

#### 注意點
- `min-w-0` 要加在「會被 flex 壓縮的那層」上，通常是 flex-1 那個第一層容器，而不是文字的 span。

- 若中間還包了多層 flex / grid，可能每一層都在當 flex item，此時同樣要檢查是否需要一路補上 `min-w-0`。

- 反過來說，如果你刻意希望內容不要被壓縮（例如要完整顯示一行 SKU），那麼保留預設 `min-width: auto` 反而是合理選擇。

<SocialBlock hashtags="css,flexbox,layout" />

