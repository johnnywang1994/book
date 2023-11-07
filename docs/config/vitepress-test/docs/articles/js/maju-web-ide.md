# 關於我的 Side project - Maju Web Editor

<SocialBlock hashtags="javascript,typescript,esmodule,runtime,editor" />

嗨大家好，我是 Johnny。

最近剛好在公司內部分享完有關 `URL.createObjectURL` 的內容，想起被我塵封已經的 [script-custom-module](https://www.npmjs.com/package/script-custom-module) 套件，距離我當時做完這套件也已經過了一段時間了

這是一個讓開發者可以在瀏覽器端動態編譯 html, css, react, vue 的小工具，完全不需要任何 webpack, rollup 配置，純粹的 native esmodule，不過目前就真的只適合在本地開發 prototype 使用，畢竟動態編譯所有文件這種事非常消耗網頁效能，在講求 runtime 預編譯或甚至無編譯的主流架構下是邪門歪道～

不過當時製作時並沒有加入遞回解析文件的能力，必須把所有模組都寫在 index.html 中，實在是不方便，雖然我曾經有念頭想幫他改造一波，但請恕小弟不才時間不夠ＸＤ，這次直接燃燒週末 24 小時，首先把 script-custom-module 做為基礎改造一波後，並接著對網頁編輯器做了一個大改版，歡迎有興趣試用的朋友們從下方連結前往喔～


## Maju 網頁編輯器
這個 `Maju 網頁編輯器` 的起源是我個人想做一個小的 side project 開始，於是就覺得模仿 `Codepen` 那樣做看看，但做的過程真的遇到很多困難，也嘗試失敗了好多次，於是就誕生了第一版

- [第一版連結 - JW Editor](https://maju-ide.herokuapp.com/)

包含了最基本的網頁三劍客編輯器 `html`, `scss`, `javascript`，並且會把編輯器內容自動儲存在用戶的 `localStorage` 中，還具備全螢幕、下載檔案、清除內容、變更字體大小等等功能。

但這編輯器還是不能直接寫 react, vue 這種酷炫用法，於是在一通鑽研後，又誕生了第二版，這個第二版有個特別的地方，那就是透過前面提到的 [script-custom-module](https://www.npmjs.com/package/script-custom-module) 製作，可以支援 react, vue3 的編譯（用法請參考套件文件內），但缺點也很明顯，就是無法在編輯器中開啟多個 js 檔案編輯，只能在單一窗口下編輯總是少了點樂趣

- [第二版連結 - Maju Editor](https://www.maju-web.club/local)

所以最終，「全新宇宙無敵霹靂」第三版迷你編輯器登場拉～這一版當中不僅讓開發者可以像在 `codesandbox` 那樣新增刪除檔案，還能將檔案互相 import 使用，大大增加開發的方便性，需要 import 第三方套件也能直接在 `index.html` 中自由發揮，說是像 `codesandbox`，但由於是在 local 編譯，編輯完簡直是瞬間就編譯完成，比 `codesandbox` 快不知道多少，簡直就是我心目中完美的線上編輯器啊！！～～希望大家也會喜歡摟（之所有一直提 codesandbox 是因為我其實很愛用，但就是每次編輯個小東西都要等半天這點很賭爛...）

- [第三版連結 - Maju IDE Vue template](https://www.maju-web.club/plus/?cacheId=vue)
- [第三版連結 - Maju IDE React template](https://www.maju-web.club/plus/?cacheId=react&template=react)

## Maju IDE 用法
- BaseURL: `https://www.maju-web.club/plus/`
- query:
  - cacheId: 當前使用的 cache id，對應讀取 localStorage 的某個 cache key，若不存在暫存則會以預設 vue 或是指定的 template 創建新 cache
  - template: 預設為 `vue`, 也可以使用 `react`，在第一次進入新建 cache id 時才會套用，若 cache id 已經有內容存在 localStorage 中則會被忽略


<SocialBlock hashtags="javascript,typescript,esmodule,runtime,editor" />

## 結論
感謝這次公司內部分享作為一個契機，推動我把之前研究的一些東西又拿出來玩味了一遍ＸＤ，順便強化了編譯的效率採用 concurrent 的方式編譯 Nested Dependency，蠻不錯的體驗，隱約聽到我的肝在哭泣...先去睡個覺補眠了各位，下次見拉～

