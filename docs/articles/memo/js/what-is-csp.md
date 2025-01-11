# CSP (Content Security Policy) 是什麼？


<SocialBlock hashtags="javascript,header,xss,csp,content-security-policy" />

大家好！我是 Johnny，今天要來介紹一個很重要，但卻很常被忽略的東西，叫做 Content Security Policy


## 基本介紹
是一個用來控制我們網站允許載入文件資源的功能，特別是 JavaScript 資源(或是常見 CSS style 資源)，用以最大程度防禦，比如跨站腳本（XSS）攻擊之類的狀況


## 使用方式
CSP 基本使用方式如下，在 browser response header 中設置 `Content-Security-Policy`
```http
Content-Security-Policy: default-src 'self';
  img-src 'self' example.com
```
- `default-src` 告知 browser 只能載入 same-origin 文件，除非有另外設定
- `img-src` 告知 browser 可載入 same-origin 及來自 example.com 的文件
- 除了上述兩個指令外，還有比如 script-src, style-src, connect-src 等多種針對不同內容的指令可使用


## CSP Nonce 是什麼？
nonce 是 server 針對每個 request 所動態產生的一個隨機字串，並將其使用於 script-src, style-src 指令中，同時把其放在 script, style tag 上
```http
Content-Security-Policy:
script-src 'nonce-416d1177-4d12-4e3b-...'
```
```html
<script
  src="..."
  nonce="416d1177-4d12-4e3b-..."
></script>
```
當 browser 載入 script, style tag 時會拿 nonce 屬性值去比對 header 上的 nonce，相同時才將文件載入


## CSP Hashes 是什麼？
類似 nonce 的 hash 值，用於保證 script 文件完整性，由 server 算法產生後放入 header，及 script tag 的 `integrity` 屬性中
```http
Content-Security-Policy:
script-src 'sha256-ex2O7MW...' 'sha256-H/eahV...'
```
```html
<script integrity="sha256-ex2O7MW..."></script>
<script integrity="sha256-H/eahV..."></script>
```
- 每個 script 有獨立的 hash 值
- 與 nonce 不同，hash 的 CSP header 及 integrity 兩者都可以是靜態的，更適合用在依賴純 client-side 渲染的靜態頁面中


## strict-dynamic 是什麼？
假如我們有個 `main.js`，並在其中動態載入了另一個 `main2.js`，但只有 main.js 有加上 `integrity` 屬性，此時因為 main2.js 沒有 hash 將無法被載入，為了解決這種 strict 模式下的第三方額外資源載入問題，可使用 `strict-dynamic` 指令
```http
Content-Security-Policy:
  script-src 'sha256-gEh1+8U...'
  strict-dynamic
```
特別適合用在網站有使用第三方 script 時（比如 Google GA, LINE Liff SDK 等等）


<SocialBlock hashtags="javascript,header,xss,csp,content-security-policy" />

## 結論
實際深入使用 CSP 後才會知道，其實網站有很多資源載入的動作需要特別注意設定，當我們在開發網站時，保持高度的警戒意識才能讓使用我們網站的用戶受到更好的保障，也才能避免因為開發者的一時偷懶、疏忽而導致無法挽回的客戶信任流失，下次開發網站時也試試看能不能在你的網站中加上 CSP 吧！