# 靜態資源優化


## 圖片
### jpg, png, gif, webp 應用場景
- jpg: 顏色豐富照片、banner 圖、結構不規則圖形
- png: 純色、透明、線條、圖標、邊緣清晰
- gif: 動圖、圖標
- webp: 圖形、半透明圖

### 響應式圖片(srcset)
```html
<img srcset="img-320w.jpg,img-640w.jpg 2x, img-960w.jpg 3x" />
```

### 逐步載入
- LQIP(low quality image placeholder)、SQIP(SVG quality image placeholder)

### Server Side 自動圖片優化(尺寸、格式、壓縮)



## 文件
### HTML
- 減少 Nested HTML
- 減少 DOM

### CSS
- 放置 header 頭部
- 減少 expensive 屬性（偽類：`nth-child`，定位：`position: fixed`）
- 減少樣式層級（`div ul li span i { color: red; }`）
- 避免使用內存佔用過多的屬性（`text-indent: -99999px`）
- 避免使用耗電量大的屬性（CSS 3D Transform, CSS3 Transition, Opacity）
- 盡量避免使用 CSS expression
  - `background-color: expression((new Date()).getHours()%2 ? "#FFF" : "#000"  )`
- 盡量避免使用通配 selector（`ul > li`）
- 盡量避免類正則的 selector（`*= |= ^= $=`）
- 使用 external CSS，減少 `@import`
- 字體部署在 CDN 上，或用 base64 保存在 CSS 中，透過 localStorage 進行 cache
- 盡量避免 CSS 同時動畫、延遲動畫初始化、結合 SVG


### JS
- 當需要時再優化
- 考慮可維護性（考慮整個團隊）
- 放 body 尾部避免阻塞渲染
- 盡量使用 id selector
- 避免使用 eval
- 使用事件節流、委託
- 避免大量 JS 動畫
- 盡量使用 CSS3, Canvas 動畫
- 合理使用 requestAnimationFrame 取代 setTimeout, setInterval
- cache DOM
- cache AJAX

### Cache
- Cookie: 會話管理
- sessionStorage: 頁面應用間傳值
- localStorage: 緩存靜態文件CSS/JS、緩存不常變更的 API data、儲存地理位置資訊、
- indexedDB: 客戶端大量結構化資料儲存、離線使用、少修改常訪問

### 避免重繪
- 避免使用 Table、Float 佈局
- 圖片盡量設置 width, height
- 使用 viewport 限制螢幕縮放級別
- 避免頻繁操作 DOM, style 屬性（一次性操作較好，現代框架 diff 算法主要就在做這件事）
- 使用 fragment，避免在 DOM tree 直接操作

### 打包優化
- 定位大體積 module（安裝分析套件）
- 刪除沒用到的依賴
- production 依賴與 dev 環境分離
- 避免使用造成 tree shaking 失敗的語法（`export default`）
