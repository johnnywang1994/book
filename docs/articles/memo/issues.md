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

## Nextjs
- [Nextjs Jest with svgr/webpack component issue](https://github.com/gregberge/svgr/issues/83)