# 瀏覽器即 IDE！純前端打造 AI Sandbox：Maju Studio (Public) 實戰與 WebContainer 應用

<SocialBlock hashtags="javascript,webcontainer,ai,sandbox,frontend,indexeddb" />

## 前言
Hi! 大家好，我是 Johnny! 最近在重構舊版 maju-gpt 時，我偶然想到一個好玩的點子：何不將 AI Agent 與 WebContainer 結合，打造一個完全跑在瀏覽器裡、零伺服器運算成本的在線 IDE？於是 Public Studio 就誕生了！

## 為什麼想做純前端的 AI Studio？
過去我們在做 AI Coding Assistant 或 Sandbox（沙盒預覽）時，傳統架構通常是這樣的：
1. **後端容器負擔重**：要在伺服器上開 Docker、虛擬機或管理微型容器池，維護成本高昂，且伺服器資源很容易被惡意腳本或無窮迴圈吃垮。
2. **API Token 費用驚人**：若由站長自掏腰包提供全套雲端 AI 代理與伺服器運算，流量稍大錢包就會抗議。
3. **隱私與安全疑慮**：使用者的專案原始碼、自訂 Prompt 與私有 API Key 都需要傳送到後端儲存或中轉。

既然現代瀏覽器效能已經如此強悍，何不實踐 **Client-Only（純客戶端）+ BYOK（Bring Your Own Key）** 架構？使用者自備 API Key，所有檔案讀寫、編譯打包與 AI Agent 的 Tool Calling 迴圈通通在瀏覽器本機端執行，伺服器只負責靜態資產配送！

---

## 核心技術堆疊與架構解析

Maju Public Studio 的底層技術組合非常有趣，主要由以下四個核心要素構成：

```
+-------------------------------------------------------------+
|                     Browser (Client-Side)                   |
|                                                             |
|  +--------------------+             +--------------------+  |
|  | usePublicStudio    | Tool Calls  |   WebContainer     |  |
|  | Agent (LLM Loop)   | ----------->|   (Node.js WASM)   |  |
|  +--------------------+             +--------------------+  |
|            |                                   |            |
|            v                                   v            |
|  +--------------------+             +--------------------+  |
|  |  IndexedDB (idb)   |             |  Vite Dev Server   |  |
|  |  Storage & State   |             |  & Iframe Preview  |  |
|  +--------------------+             +--------------------+  |
+-------------------------------------------------------------+
```

### 1. WebContainer API：把 Node.js 搬進瀏覽器
專案核心使用 StackBlitz 的 `@webcontainer/api`。它利用 WebAssembly (WASM) 與現代瀏覽器的底層能力，在沙盒環境內模擬完整的 POSIX 檔案系統、Process 執行程序與 TCP 網路堆疊。

* **名詞解釋**：
  * **WebContainer**：由 StackBlitz 開發的技術，允許在瀏覽器分頁中直接啟動完整的 Node.js runtime，可執行 `npm install`、`npm run dev` 等指令而無需遠端伺服器。
  * **WebAssembly (WASM)**：一種低階的二進位指令格式，使高階語言（如 C/C++、Rust、Go）編譯出的程式碼能在瀏覽器中以接近原生速度執行。
* **參考連結**：
  * [WebContainer 官方技術文件](https://webcontainers.io/)
  * [MDN WebAssembly 介紹](https://developer.mozilla.org/en-US/docs/WebAssembly)

### 2. 純前端 AI Agent 迴圈 (Client-Side Tool Calling)
不同於一般前後端分離的 Agent 架構，`usePublicStudioAgent` 直接在前端管理對話與工具呼叫迴圈（Function Calling Loop）：
* 支援 OpenRouter、OpenAI、Groq、DeepSeek 等任何相容 OpenAI 協定的端點。
* Agent 自帶沙盒檔案工具：`list_sandbox_files`、`read_sandbox_file`、`write_sandbox_files`、`delete_sandbox_files`、`run_sandbox_command`。
* **即時活動反饋 (Tool Activity Indicator)**：在 Agent 思考與呼叫工具時，前端對話視窗會即時呈現「讀取檔案中」、「正在寫入 src/main.js」、「執行 npm run dev」等狀態卡片，且不會將這些運作細節持久化到歷史訊息中，避免污染下文視窗（Context Window）。

### 3. IndexedDB (`idb`) 大容量工作區持久化
早期版本曾使用 `localStorage` 存放工作區檔案，但隨著前端框架專案擴充，檔案很容易突破瀏覽器單一 Origin 5MB 的硬性配額（跳出 `QuotaExceededError`）。
因此重構至 **IndexedDB**：
* 每個 Workspace 獨立存儲為一筆 Record，徹底解除儲存上限（支援數百 MB 到數 GB）。
* 檔案更新時僅單筆寫入，大幅提升效能並消除全量序列化的卡頓感。

---

## 基本操作與工作流

在 Maju Public Studio 開發一個前端小專案的流程非常直覺：

### 步驟 1：設定 Provider 與 API Key
進入 Public Studio 後，在側邊欄填入自備的金鑰與模型名稱：
* **Provider**：選擇 OpenRouter、OpenAI、Groq 或 DeepSeek。
* **API Key**：輸入個人金鑰（僅存於瀏覽器本地記憶體與本地設定中）。
* **Model**：使用者填入支援的各種主力模型（例如 `gpt-5.6-sol`）。

### 步驟 2：提出需求，由 Agent 自動操作沙盒
你可以直接用自然語言下達指令：
> 「幫我把首頁改成一個帶有深色模式切換功能的待辦清單 (Todo List)，使用 Tailwind CSS 樣式。」

Agent 會依序進行：
1. 呼叫 `list_sandbox_files` 了解當前 Vite 專案結構。
2. 呼叫 `read_sandbox_file` 讀取 `src/main.js` 與 `package.json`。
3. 呼叫 `write_sandbox_files` 重寫或建立新檔案。
4. 若需要安裝依賴，主動調用 `run_sandbox_command` 執行 `npm install`。(跑完記得按下「Restart」重啟更新預覽畫面)

### 步驟 3：即時預覽與匯出
* **即時熱重載 (HMR)**：右側預覽畫面直接掛載 Vite 的本地伺服器，檔案寫入時自動重新渲染。
* **內建 Terminal**：下方整合了 `@xterm/xterm`，隨時可檢視編譯日誌或手動執行 shell 指令。
* **匯出 ZIP**：滿意成果後，一鍵將整份工作區打包下載成 `.zip` 檔案至本機。

---

## 工具實用之處與價值

| 比較項目 | 傳統雲端 AI IDE | Maju Public Studio (純前端) |
| :--- | :--- | :--- |
| **伺服器維護成本** | 高（需維護容器叢集、VM、網路頻寬） | **零成本**（純靜態網頁託管即可運行） |
| **使用者隱私** | 原始碼與金鑰需上傳至伺服器端 | **最高**（僅使用者與所選 LLM API 通訊） |
| **環境啟動速度** | 需等待遠端容器冷啟動（10~30 秒） | **極速**（瀏覽器載入後數秒內可用） |
| **資安風險隔離** | 需防範惡意容器逃逸與提權攻擊 | **沙盒防護**（天然受限於瀏覽器安全邊界） |

---

## 需特別注意的使用規範與限制

在享受純前端便利的同時，開發與使用上也有幾點必須注意的規範：

### 1. 安全標頭限制 (COOP & COEP)
WebContainer 底層重度依賴 `SharedArrayBuffer`，因此託管該頁面的 HTTP 伺服器必須配置以下回應標頭，否則無法啟動：
```http
Cross-Origin-Embedder-Policy: require-corp
Cross-Origin-Opener-Policy: same-origin
```

### 2. 沙盒路徑嚴格驗證 (Path Safety)
為防止路徑混亂與意外越界，沙盒環境內的所有檔案路徑皆有嚴格約束：
* 必須為標準相對路徑（例如 `src/App.vue`、`vite.config.js`）。
* 禁止包含路徑穿越（`../`）。
* 不得直接以絕對路徑 `/` 或 `./` 作為開頭，且禁止操作 `node_modules/` 與 `.git/` 的直接映射。
系統在前端實作了容錯正規化（Normalize）機制，自動清除模型常見的誤綴前綴。

### 3. 原生二進位擴充套件限制
WebContainer 畢竟運行在 WASM 之上，**無法執行包含原生 C/C++ 編譯（Native C++ Addons / node-gyp）的 npm 套件**。建議使用純 JavaScript / TypeScript 或已有 WASM 版本的套件（例如 Vite、esbuild-wasm、Tailwind CSS）。

### 4. 瀏覽器資料保存
所有程式碼存放在瀏覽器的 IndexedDB 中。若使用者清理瀏覽器快取、使用無痕模式（Incognito）或硬碟空間不足，資料可能會遺失。完成重要的原型開發後，請務必點擊 **「下載 ZIP」** 備份專案。

---

## 總結
這次重構 Maju GPT 順便打造出了一個完全純前端的 AI Sandbox，以後隨時用手機就能在任何地方玩轉 prototype 了!

* **優缺點分析**：
  * **優點**：架構極簡、零後端營運成本、開箱即用、資料隱私安全極佳，特別適合個人開發者或社群作為快速 PoC 與 UI 原型實驗場。
  * **缺點**：受限於 WebContainer 能力，無法執行複雜的原生二進位模組或重度後端資料庫；首次載入需下載 Node.js 執行期與套件快取。
* **注意事項**：伺服器必須正確設定 COOP/COEP 標頭；提醒使用者定期匯出 ZIP 檔以防瀏覽器快取被清空。

> WebContainer 僅供個人開發與測試使用，請勿在未經官方授權的情況下用於生產商業環境，若用戶因個人不當使用導致損失，本專案不承擔任何相關法律責任。


## 參考資料來源
- [StackBlitz WebContainers 官方文件](https://webcontainers.io/)
- [MDN 官方文件：Cross-Origin-Embedder-Policy (COEP)](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cross-Origin-Embedder-Policy)
- [MDN 官方文件：IndexedDB API 指南](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API)
- [idb - NPM 官方套件介紹](https://www.npmjs.com/package/idb)
- [maju-gpt-ui GitHub 開源儲存庫](https://github.com/johnnywang1994/maju-gpt-ui)
