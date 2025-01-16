# Nginx JS module 基本使用筆記

大家好！我是 Johnny，今天要介紹一個已存在一段時間，但卻很少被提及的 Nginx 模組 「NJS」


## 基本介紹
NJS 是 Nginx 的動態模組，一個 Javascript 的子集，符合 ES5 及部分 ES6 擴充，能用 JS 語法擴充 Nginx 內建功能，主要由 `ngx_http_js_module`, `ngx_stream_js_module` 這兩個模組構成，具備下列功能

- 在 request 到達更上游 server 前，進行複雜的`存取控制`和`安全檢查`
- 操作 response headers
- 編寫靈活的非同步內容處理程序、過濾器等

## 使用方式
透過 `load_module` 引入上述模組，並在 nginx 配置中，引用指定的 js file function 處理請求
> 需要放在任何 server、location 或其他上下文塊以外。在主配置文件的 http 上下文之外，才能在 Nginx 啟動時載入

## 配置範例 main.js
```js
function summary(r) {
  // 設置 response header
  r.headersOut['Content-Type'] =
    'application/json';

  r.return(200, JSON.stringify({
    uri: r.uri,
    method: r.method,
    host: r.headersIn.host,
    remoteAddress: r.remoteAddress,
    requestHeaders: r.headersIn,
    responseHeaders: r.headersOut,
    args: r.args,
  }));
}

export default { summary }
```

## 配置範例 nginx.conf
```conf
# 載入 njs 模組
load_module modules/ngx_http_js_module.so;

events {}

http {
  # 設定 js 文件位置
  js_path "/etc/nginx/njs/";
  # 引入 js 文件到 main 變數
  js_import main from main.js;

  server {
    listen 80;
    location / {
      # 設置由 js_content 的 main.summary 方法處理請求
      js_content main.summary;
    }
  }
}
```

## 結論
以前只知道 Nginx 可以寫 Lua 來對細部設定進行調整，現在連 Javascript 都能直接在 Nginx 中使用，看來大 Javascript 時代真的要統一江湖了...