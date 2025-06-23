# 擺脫 Node modules 地獄，擁抱 Yarn Plug'n'Play(PnP)

嗨大家好，我是 Johnny。這篇主要是研究 `Yarn PnP` 使用方式時紀錄的一個小筆記分享，由於研究時 Yarn 的 stable 版本其實已經到 v3.6.0 了，故此篇是以此版本為前提進行解釋，可能會與其他網路上介紹的 v2.x 版本的說明不太一樣


## Node modules 的問題
一般情況下透過 `yarn install` 安裝 node_modules 時的策略非常簡單，首先用安裝相關依賴並產生一個 `node_modules` 資料夾，接著讓 Node 可以從中獲取想要的依賴，如果在當前路徑下的 `node_modules` 找不到對應依賴，就往上一層級的 `node_modules` 查找，直到找到目標為止，但就會有以下問題：
- node_modules 本身就非常龐大，生成相關依賴的時間佔據了整個 `yarn install` 執行的 70% 時間。即使預先存在安裝了也沒用，因為管理器還是必須將 node_modules 的內容與其應包含的內容進行比較
- 由於生成 node_modules 的過程涉及大量 I/O 操作，包管理器除了進行簡單的文件複製之外，沒有太多餘力來優化這個過程，就算可以在某些情況下，使用`硬鏈接(hardlinks)`或`寫時複製(copy-on-write)`，但在進行一堆系統調用來操作磁盤之前，仍然需要區分文件系統的當前狀態
- 因為 Node 本身沒有 package 的概念，並無法明確知道有哪些依賴檔案會被使用、觸及，這就會導致在某些情況下，你可能會發現程式碼在 development 環境正常運作，但卻在 production 出現錯誤，只因為你忘記在 `package.json` 裡明確列出某個依賴
- 就算在 runtime，Node 的解析過程中，為了確定依賴從哪裡載入，也會涉及到大量 stat 和 readdir 調用，造成大量效能浪費，這也導致 Node 應用在啟動時花費相對多的時間
- node_modules 文件夾的設計本身是不切實際的，它不允許包管理器正確地刪除重複包，儘管可以採用一些算法來優化樹的結構，但還是有漏網之魚的情況發生，不僅導致磁盤空間無端浪費，還導致某些包在內存中被多次實例化



## 什麼是 Yarn PnP
- [Yarn PnP 官網解釋](https://yarnpkg.com/features/pnp)
從 Yarn 2.0 後開始作為預設安裝方式，Yarn PnP 是一種安裝 Node 依賴的一種策略方式，可以讓我們擺脫過去 `node_modules` 地獄，節省磁盤空間的一個有效手段

### 運作機制如下：
- Yarn 會生成單個 `.pnp.cjs` 文件，而不是通常包含各種包副本的 node_modules 文件夾
- `.pnp.cjs` 文件包含各種映射：一邊將包名稱和版本鏈接到其在磁盤上的位置，另一邊將包名稱和版本鏈接到其依賴項列表
- 接著通過這些映射查找表，Yarn 可以立即告訴 Node 在哪裡可以找到它需要訪問的依賴，只要它們是依賴關係樹的一部分，並且只要該文件有加載到您的環境中

### 優點如下：
- 安裝幾乎是即時的。 Yarn 只需要生成一個文本文件（而不是可能生成數萬個）。主要瓶頸只在項目中的依賴項數量，而不是磁盤性能
- 由於 I/O 操作減少，安裝更加穩定可靠，特別是在 Windows 上（批量寫入和刪除文件可能會觸發與 Windows Defender 和類似工具的各種意外交互），I/O 繁重的 node_modules 操作更容易失敗
- 依賴樹的完美優化（又名完美提升）和可預測的包實例化
- 生成的 `.pnp.cjs` 文件可以作為零安裝工作的一部分提交到您的存儲庫，從而無需首先運行 yarn install（比如在 docker build 的過程）
- 更快的應用程序啟動，解析 Node 不必像以前一樣頻繁地迭代文件系統層次結構



## 如何使用 Yarn PnP
在研究的時候查找網路上許多資源圍繞著 v2.x 的文件，我在使用時一直碰到問題，後來發現 v3.6.0 開始有些步驟已經可以直接省略了，使用上非常簡單，先隨便創建進入一個測試專案，接著步驟如下：

### 檢查當前 Yarn 的版本
筆者當下的 Node 版本為 v18，而透過 npm 安裝的 yarn 版本則是 v1.22.19
```bash
$ yarn -v
# 1.22.19
```
因為 PnP 功能是在 v2.0 以上才有，我們需要先將 Yarn 切換到指定版本，這邊為求方便這邊直接把他升到最新穩定版
```bash
$ yarn set version stable
# YN0000: Retrieving https://repo.yarnpkg.com/3.6.0/packages/yarnpkg-cli/bin/yarn.js
# ➤ YN0000: Saving the new release in .yarn/releases/yarn-3.6.0.cjs
# ➤ YN0000: Done in 0s 406ms
```
接著會發現專案資料夾中出現幾個檔案及修改，大致用途如下：
- 自動建立 `.yarn/releases/yarn-3.6.0.cjs`：存放 yarn 對應版本的 script
- 自動建立 `.yarnrc.yml`: 紀錄 yarn 對應版本的 script 位置，詳細可用設定可參考[官網文件](https://yarnpkg.com/configuration/yarnrc)
- 修改 `package.json`: 加入一行 `"packageManager": "yarn@3.6.0"` 紀錄包管理器與版本

### 安裝依賴！
這邊用現成的專案舉例，執行安裝 `yarn install`，安裝完成後又會多出幾個檔案，大致如下：
- 自動建立 `.yarn/cache`: 離線依賴 cache
- 自動建立 `.yarn/unplugged`: 存放透過 `yarn unplug [packageName]` 指令讓某些依賴按照舊的方式生成出來，主要用來測試或調整，測試完畢後可以透過 `yarn unplug --clear [packageName]` 把對應依賴從這邊移除
- 自動建立 `.pnp.cjs`: 儲存依賴映射表
- 自動建立 `.pnp.loader.mjs`: Yarn 順便裝的 experimental ESM loader，暫時不用鳥他

結束收工，會發現我們完全沒有產生 node_modules 拉～

## 關於 ESM loader
- [參考討論串 1](https://github.com/yarnpkg/berry/issues/638)
- [參考討論串 2](https://github.com/yarnpkg/berry/discussions/4044)


## Typescript 支援
由於 Yarn PnP 安裝不會產生 node_modules，也因此在與 typescript 一起使用時，雖然可以正常編譯執行，但在編輯器（VSCode）中會顯示找不到對應模組的 error，可以用以下方式進行處理

### 安裝 Yarn Editor SDKs
- [SDK 相關官方文件](https://yarnpkg.com/getting-started/editor-sdks)
這邊以 VSCode 舉例，執行以下指令後會做兩件事：
- 在專案的 `.yarn/sdks` 中產生當前專案 ts 版本對應的一些 scripts
- 在專案的 `.vscode` 中產生 `settings.json`, `extensions.json`
```bash
$ yarn dlx @yarnpkg/sdks vscode
```

### 將專案以單獨的一個 VSCode 視窗打開
由於 VSCode 目前對於 `typescript.tsdk` 的設定，仍然限制只能套用到 root workspace，且並不支援存在於 multi root workspace 的設定中，即使用 multi root workspace 打開，仍會看到以下錯誤：
```
This setting cannot be applied in this workspace. It will be applied when you open the containing workspace folder directly.
```
所以目前必須在執行上述操作後，將該專案單獨以一個視窗開啟才能正確提示 Typescript 的類型，這是目前使用 Yarn PnP 時的一個痛點，不知道之後 VSCode 團隊會不會把這限制進行調整



## 結論 - 實際測試
筆者實際測試使用 `node:18.4.0-slim` 把一個空的 Vite react app 透過 docker build 出來的 image 大小比較如下：

|REPOSITORY|SIZE|
|--|--|
|傳統方式安裝 node_modules|1.02GB|
|PnP 方式打包|441MB|

可以看到原本透過 `slim` 版本已經把 image size 減少了一部分，現在透過 Yarn PnP 直接把整個 image size 壓縮到剩下一半不到，實在太香拉～不過實際在專案中可能會因為不同場景需要臨時應變，就需要讀者們再多多去摸索嘗試了，這次分享就到這邊拉，希望大家喜歡這次分享，下一篇見摟～=V=


