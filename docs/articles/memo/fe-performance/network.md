# Server 與 Network 優化

## CDN 優化
- 提升網站資源穩定度、安全性、速度

### CDN cache
- 三級緩存：Browser local cache、CDN Edge node cache、CDN source site cache
- 緩存時間：過短則頻繁訪問源檔案，導致負載訪問慢，過長則文件更新慢，本地文件無法及時更新，需綜合業務內容考慮
- 不同靜態資源類型緩存時間：
  - HTML: 3min
  - JS/CSS: 10min, 1day, 30day

```nginx
http {
  server {
    listen 80;
    server_name 123.com;

    location ~* \.(jpg|jpeg|png|gif|bmp|png|webp) {
      expires 30d;
    }
  }
}
```

## DNS 域名優化
瀏覽器併發數限制，前端可分佈設置多個域名，比如
  - 用戶訪問：Java, PHP API
  - 頁面樣式：HTML/CSS/JS
  - 圖片：jpg, png, gif...


## HTTP 請求優化
- 使用 CSS Sprite
- image 使用 DataURL, Web Font
- JS/CSS file 合併
- API 合併
- API cache
- static assets cache(icon)


## Server 緩存
- Expires:
  - 在 response header 中帶入，格式為日期、時間，表在此時間後 cache 過期
  - 無效的日期，比如 0，代表過去的日期，即該資源已過期
  - 如果在 `Cache-Control` header 設置 `max-age`, `s-max-age`，則 Expires 將被忽略
  - `Expires: Tue, 17 Dec 2019 07:01:44 GMT`
- Cache-Control:
  - 單向，request 中的指令，不一定被包含在 response 中
  - `Cache-Control: max-age=<seconds>` 設定緩存最大週期，超過則過期，與 Expires 的絕對時間不同，此為`相對於請求的時間`
- Etag:
  - 是 `HTTP 資源特定版本的標示符`，讓 cache 更高效、節省帶寬，若內容不變，則 server 不需要發送完整 response，若資源改變，Etag 可避免變動的資源更新互相覆蓋
  - 若給定 URL 的資源變動，一定要生成新的 Etag 值，類似於指紋，也可能被某些 Server 用於跟蹤，比較 Etag 可快速確定資源是否改變，但也可能被跟蹤 Server 永久存留
  - `Etag: 5c6cc12-1d45`
- Last-Modified:
  - 包含 source server 認定資源的最後修改日期、時間，用來判斷接收到的、緩存的資源是否一致，因精確度比 ETag 低，主要作為備用手段
  - `Last-Modified: Web, 20 Feb 2019 03:40:02 GMT`
- Date:
  - 包含 message 的創建日期、時間
  - `Date: Web, 20 Feb 2019 03:40:02 GMT`
- Status:
  - HTTP response 狀態碼，指示特定請求是否成功完成，主要分為 5類：
    - 訊息：`100-199`
    - 成功：`200-299`
    - 重導向：`300-399`
    - Client端錯誤：`400-499`
    - Server端錯誤：`500-599`

## gzip 壓縮
- 文本壓縮 HTML/CSS/JS
- 非文本不壓縮 Image
- Nginx(`gzip on`)
- Apache(`AddOutputFilterByType`)
- 透過 response header `Content-Encoding: gzip`，代表 server 已開啟 gzip


## HTTP2 優化
- [Link](https://www.youtube.com/watch?v=zoCcPJc54r8)
- 二進制傳輸資料，`保護網站安全`
- 允許透過一個 http2 連結發起多個請求，`降低 server 壓力`
- Header 壓縮，傳輸體積小，`提升網站訪問速度`
- server 推送，server 可更快把資源推送給客戶端

### Nginx 啟用 HTTP2
- 升級 openssl version
- 重新編譯
  - cd nginx-xxxx
  - ./configure --with-http_ssl_module --with-http_v2_module
  - make && make install
- 驗證：瀏覽器下查看有沒有小綠鎖
- 瀏覽器請求：`protocol h2`
- nginx config `listen 443 ssl http2`