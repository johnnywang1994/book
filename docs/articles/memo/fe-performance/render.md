# 頁面渲染架構優化


## 瀏覽器頁面渲染流程
- Browser 解析 HTML => 生成 DOM tree
- Browser 解析 CSS => 生成 CSSOM(Object Model) tree
- JS 透過 DOM API, CSSOM API 操作 DOM tree, CSSOM tree
- Browser 將 DOM tree, CSSOM tree 合成 Render tree
- `Layout`: Browser 根據 Render tree 進行 reflow 計算每個元素尺寸、位置等幾何資訊
- `Painting`: Browser Render tree 及 reflow 獲得的幾何資訊，得到每個元素的絕對像素
- `Displaying`: Browser 將像素發給 GPU 圖形處理器，展示在畫面上

### 回流、重繪
- 回流(reflow)：指瀏覽器 render engine 根據元素尺寸、位置、顯示屬性重新計算頁面排版、佈局
- 重繪(repaint)：指瀏覽器 render engine 根據顯示屬性（顏色、文字大小）重新繪製元素，不影響尺寸、位置



## 頁面渲染架構
- SSR: Server 端渲染（身份驗證、SEO、安全性）
- SSG: Build Time 預渲染（靜態內容網站、內容少變動）
- CSR: Client 端渲染（動態交互、核心業務）
- Hybrid: Server with Client 端渲染（避免 CSR 白屏、增強 SEO、安全性）

> 各有優劣，架構選擇上需根據業務形式、團隊規模、技術水平等綜合考量決定



## 頁面載入策略優化
- 懶加載（延遲載入）：指長網頁中延遲載入某些元素（image/JS/CSS file 或特定函數等），減少首屏無效的資源載入浪費，常見許多第三方工具
- 預加載：指讓瀏覽器預先載入某些資源（image/JS/CSS），後續使用時就可以直接從 cache 中讀取，減少使用時的讀取等待時間
- 預渲染：對大型專案來說，在懶加載組件之前，可能還有其他依賴的懶加載組件或資料需要載入，用戶還是需要時間等待載入，另一種預加載組件的方式就是「預渲染」，在頁面中渲染組件但不顯示，而是先隱藏，等到要使用時才顯示
- 按需加載：現代打包工具內建支援 dynamic import，甚至可按需載入 api 資料結合本地 cache

### 預加載常用實現方式
```html
<img src="https://demo.com/xxx.jpg" style="display: none" />
<link rel="preload" as="style" href="src.style.css" />
<link rel="prefetch" href="src/image.png" />
<link rel="dns-prefetch" href="https://my.com" />
<link ref="preconnect" href="https://my.com" crossorigin />
```
```js
const img = new Image();
img.src = "https://demo.com/xxx.jpg";
```

### 預渲染常用實現方式
```html
<link rel="prerender" href="https://my.com" />
```



## PWA Progressive Web App 原生應用
- 預緩存資源、秒開頁面
- 降低網路依賴
- 沈浸式體驗
- 離線推送訊息
### 條件
- HTTPS
- Service Worker
- App Manifest
- 離線推送(optional)



## API 優化
- API 合併：將多個 api 和第三方服務統一使用一個集群調用，減少頁面 api 請求數量
- API 上 CDN：性能考慮，把不需要實時更新的 api 同步至 CDN，等內容變更後再自動同步到 CDN 上
- API 降級：核心 API 降級，用基礎 API 進行業務實現（預設 fallback 的備份資料）
- API 緩存
  - AJAX/fetch 緩存：前端 request 時帶上 "cache" 字頭，依賴瀏覽器本身 cache 機制
  - 本地緩存：優先使用 localStorage 中的緩存

