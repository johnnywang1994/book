# 問題修正紀錄

## UI

### Scroll
- [移動端滾動穿透問題](https://github.com/pod4g/tool/wiki/%E7%A7%BB%E5%8A%A8%E7%AB%AF%E6%BB%9A%E5%8A%A8%E7%A9%BF%E9%80%8F%E9%97%AE%E9%A2%98)


## Chrome
- [Image CORS error in Chrome](https://www.hacksoft.io/blog/handle-images-cors-error-in-chrome)


## Samsung
- 當圖片的 url 是透過 "createObjectURL" 產生時，Samsung Browser 無法長按下載圖片（選單中沒有下載按鈕），需使用 base64 格式或是 http 協議才可以
- [Samsung Browser Night mode issue 導致 UI 色彩被強制改變造成異常](https://www.ctrl.blog/entry/samsung-internet-night-mode.html)
- 預設狀態 Input element 的 keyboard 事件 `event.code` 為空值，需明確指定 `enterKeyHint` 比如 `enterKeyHint="search"`，並透過 `event.key` 判斷按鍵，如果沒有設定 enterKeyHint，則 `event.key` 會是 `Unidentified`


## Sonarcube
- [Main Branch does not reflect latest analyses](https://community.sonarsource.com/t/main-branch-does-not-reflect-latest-analyses/63352)
  可能因為 Github push event 被設定或判定成 pull request 導致 main branch 沒有被正確解析

## Docker
- [Windows系統使用docker部署mongo報錯：Operation not permitted](https://www.twblogs.net/a/5d5e9ebfbd9eee5327fdb364)
- [Mac M1 晶片 Mysql 錯誤 Error:no matching manifest for linux/arm64/v8 in the manifest list entries](https://chilunhuang.github.io/posts/8942/)

## Google GTM Related
- [GTM Tag not triggered](https://stackoverflow.com/questions/44665284/does-it-matter-if-gtm-is-capturing-a-click-event-as-gtm-click-rather-than-gtm-li)

## Computed
- [WSL hostname](https://www.codewrecks.com/post/general/wsl-hostname/)

## Webpack
- [Can't import the named export from non EcmaScript module (only default export is available)](https://github.com/vuejs/pinia/issues/675#issuecomment-919544784)


## Nextjs
- [Nextjs Jest with svgr/webpack component issue](https://github.com/gregberge/svgr/issues/83)
- [Next13 Image 組件安全性問題](https://www.assetnote.io/resources/research/digging-for-ssrf-in-nextjs-apps)
- [Next v13.5.1~14.2.9 pageProps json issue](https://github.com/henrycjchen/x-now-route-matches-demo/tree/main)
  - input `curl -v http://localhost:3000/demo2 -H "x-now-route-matches: 1"`, will starts returning `Cache-Control: s-maxage=1, stale-while-revalidate`.
  - This json-format html page would got cached mistakenly and cause user info leak to other users. And since the page is still html, the cached page would also hurt SEO for Google.
  - `?__nextDataReq=1` in Next server url would return pageProps from Nextjs server, make sure you really need SSR, since these may cause some security issue if you did not aware of this.


## Vite
- [Wasmer JS in Vite not being recognized](https://github.com/vitejs/vite/issues/17334#issuecomment-2142804097)


## TailwindCSS
- [TailwindCSS v3.3.2 fix "too mant open files" issue](https://www.reddit.com/r/nextjs/comments/16bk7xj/error_emfile_too_many_open_files_tailwind/)

## MongoDB
- [Read, Write Stream 分離導致的讀取問題](https://www.mongodb.com/docs/manual/core/read-isolation-consistency-recency/#causal-consistency)

## Nginx
- [Nginx returning 500 for POST FormData Request](https://stackoverflow.com/questions/57340193/nginx-returning-500-for-post-image-request-with-django-rest-framework)


## Wsl Pyenv
