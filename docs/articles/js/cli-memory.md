# 打破 Agent 健忘症！打造 Local-First 的 AI Agent 長期記憶庫：cli-memory 實戰指南

<SocialBlock hashtags="javascript,ai,agent,memory,rag" />

## 前言
> Hi 大家好，我是 Johnny！好久沒寫文了，這次要開箱我自己開發的 Local-First 長期記憶工具 `cli-memory`。現在它支援開箱即用免設定、Daemon 背景加速與 Supersede 歷史汰換，幫你的 Agent 裝上永不遺忘的超強大腦！

## 為什麼 AI Agent 需要獨立的長期記憶庫？
相信大家在玩 OpenCode、Claude Code 或 GitHub Copilot 這些 AI Agent 時，一定都遇到過這些讓人翻白眼的痛點：
1. **Context Window 限制與成本**：把大把大把的歷史紀錄都塞進對話視窗，不僅 Token 燒得快，Agent 還常常會「注意力不集中」（Lost in the Middle）。
2. **每次開新對話都變陌生人**：重新開一個對話 Session 後，Agent 就把你的寫碼風格、專案偏好或之前的技術決策忘得一乾二淨。
3. **雲端隱私疑慮**：如果把個人偏好、私有專案結構或敏感資訊丟到第三方的記憶雲端服務，難免會擔心資安和隱私外洩。

身為一個「Agent 魔法後端工程師」（本質是前端 XD），我一直在找完全符合我使用場景的記憶工具。既然市面上找不到完美的，我就索性自己開發了這個 `cli-memory`！它完全採用 **Local-First**（在地優先）架構，把所有記憶存放在你的本機，安全、省錢又快速！

---

## 核心架構、混合檢索與全新的二層記憶分級

為了讓 Agent 既能聰明地記住事情，又不會被一堆廢話淹沒，`cli-memory` 在底層設計了很完善的檢索與生命週期機制：

### 1. 主題隔離 (Topic Partitioning)
每一個記憶讀寫都必須指定 `topicKey`（例如 `coding`、`health`、`project-x`）。不同的領域分開儲存，這樣搜尋時才不會產生跨主題的「精神分裂」。

### 2. 語意 + 全文混合檢索 (Hybrid Search)
單純的向量搜尋有時會漏掉精確的專有名詞，而全文檢索（FTS）又缺乏語意理解。所以我實作了混合檢索：
* 同時跑向量與全文搜尋，再用 **RRF (Reciprocal Rank Fusion)** 演算法把排名融合成一個最完美的結果。
* 接著針對結果進行二次重排（Reranking），把 **Importance**（重要度）、**Recency**（新鮮度衰減）與 **Access Frequency**（存取頻率）通通算進去，調配出最佳的 `hybridScore`！

```
Score = RRF_Score × Importance_Weight × Confidence_Weight × Recency_Weight × Access_Weight
```

### 3. 全新推出：二層記憶分級 (Memory Tiers)
為了解決記憶庫隨著時間變得太臃腫，我們引入了邏輯雙層架構：
- **Working Memory** (工作記憶，重要度 0-6)：適合記錄臨時上下文、單次對話的次要事實。
- **Long-term Memory** (長期記憶，重要度 7-10)：只有重要度 7 以上的黃金記憶，才會在搜尋時被優先召回。
這能幫我們有效過濾雜訊，同時保留歷史檢索的彈性。

* **名詞解釋**：
  * **Local-First (在地優先)**：一種架構原則，強調資料儲存和計算都在使用者本地端完成，不依賴雲端，兼顧隱私與零網路延遲。
  * **RRF (Reciprocal Rank Fusion)**：一種很酷的檢索排名演算法，能把多個搜尋器（例如向量搜尋與關鍵字搜尋）回傳的排名名單，完美綜合成一個最終排名。
  * **LanceDB**：輕量級、免架設伺服器的嵌入式向量資料庫，讀寫速度超級快，非常適合本機端應用。
* **參考連結**：
  * [LanceDB 官方文件](https://lancedb.github.io/lancedb/)
  * [維基百科：混合檢索概念](https://en.wikipedia.org/wiki/Hybrid_search)

---

## 全新三大亮點功能解析

這次更新，我特別針對使用體驗、效能和記憶維護開發了三大超強亮點功能，絕對會讓你用得更爽快：

### 亮點 1：開箱即用 (Zero-Configuration Out-of-the-Box) 🚀
以前的版本，大家必須先在本機安裝並啟動 Ollama、還要手動拉取 `nomic-embed-text` 模型，老實說步驟真的有點多。
現在全新版本**內建了 Transformers 引擎**（使用 `onnx-community/embeddinggemma-300m-ONNX` 模型）。
**在你第一次執行任何指令時，它就會自動在背景幫你下載並快取好模型，完全免設定、免裝第三方工具！** 實現真正的「一鍵安裝，開箱即用」！

### 亮點 2：歷史保留汰換 (Supersede) 🔄
當我們以前記錄的偏好或事實改變了，要怎麼辦？如果只是直接 Update（更新），我們會失去歷史軌跡；如果重複儲存，Agent 又會精神分裂。
於是我設計了全新的 `supersede` 機制：
* **保留舊記憶**：舊的記憶不會被刪除，而是會被標記為過期（Superseded）。
* **寫入新記憶**：同時寫入最新、最正確的事實，並將新舊記憶關聯在一起。
* **精準搜尋**：預設的語意搜尋只會回傳 `active`（當前有效）的記憶，完全不浪費 Context！但如果你想追溯歷史，也可以手動加上 `--status active,superseded`，非常彈性！

### 亮點 3：Daemon 背景加速模式 (Daemon Mode) ⚡
因為每次呼叫 CLI 都要重新加載 Node.js 執行期跟本地的 ONNX 模型，密集呼叫時難免會有一點啟動延遲。
現在你可以一鍵啟動背景 Daemon 守護進程：
```bash
cli-memory serve --daemon
```
這會啟動一個本機常駐服務。後續你的 CLI 或是 Agent 進行 `call` 呼叫時，**會自動偵測並複用這個熱啟動的 Daemon 進行模型推理與檢索**，速度直接起飛！最貼心的是，如果一段時間沒人呼叫，它還會自動釋放記憶體（Idle Unload），完全不佔用你的本機資源。

---

## 實戰教學：三步驟為你的 Agent 裝上大腦

### 步驟 1：安裝與自動初始化
你只需要有 Node.js 環境，全域安裝後直接呼叫，它就會自動下載模型並儲存第一筆記憶：
```bash
# 全域安裝 cli-memory
npm install -g cli-memory

# 首次測試：儲存一筆偏好
cli-memory store "使用者偏好採用 TypeScript 搭配 Functional Programming 風格" --topic coding --memory-type Preference --importance 8
```

### 步驟 2：一鍵安裝 Agent Skill
`cli-memory` 提供一鍵安裝 Skill 的懶人腳本，目前原生支援 OpenCode、Claude Code、Codex 與 GitHub Copilot：
```bash
cli-memory skill install opencode
```
這會自動在 Agent 的 Skill 指引裡寫入最佳設定，讓 Agent 在每次對話前主動先搜尋、並在對話結束後自動整理記憶！

### 步驟 3：體驗 Supersede 與 Daemon
1. **啟動背景 Daemon 加速**：
   ```bash
   cli-memory serve --daemon
   ```
2. **測試語意搜尋**：
   ```bash
   cli-memory search "TypeScript" --topic coding
   ```
3. **體驗 Supersede 汰換記憶**（假設原本紀錄的 ID 為 `mem_001`）：
   ```bash
   # 汰換舊記憶，寫入新偏好
   cli-memory supersede mem_001 "使用者現在全面改用 Rust 進行後端開發" --topic coding --importance 9
   ```

---

## Agent 自動化串接：JSON-RPC 工具呼叫

對於 AI Agent 來說，它更習慣在背景呼叫結構化的 `cli-memory call` 機器介面來跟記憶庫對話：

```bash
# Agent 在背景自動寫入並標記汰換
cli-memory call supersede-memory '{
  "topicKey": "coding",
  "oldId": "mem_001",
  "content": "使用者現在全面改用 Rust 進行後端開發",
  "memoryType": "Preference",
  "importance": 9
}'

# Agent 進行語意檢索
cli-memory call search-memories '{
  "topicKey": "coding",
  "query": "開發語言偏好",
  "limit": 3
}'
```

---

## 總結

* **優缺點分析**：
  * **優點**：100% Local-First，隱私滿分、資料安全；內建 ONNX 引擎實現了真正的「零設定開箱即用」；全新的 `supersede` 機制完美搞定記憶時序衝突；`serve --daemon` 背景模式大幅提升了密集的 CLI 回應速度。
  * **缺點**：首次執行需要下載大約 300MB 的 ONNX 模型文件；本機向量計算會短暫佔用 CPU（不過 Daemon 有閒置自動卸載機制，所以不用太擔心）。
* **注意事項**：
  * 如果你在寫一些自動化指令或頻繁讓 Agent 寫入記憶，強烈建議一定要開 `serve --daemon` 模式，不然每次重新載入進程會多花幾秒。
  * 使用 `supersede` 時記得給對 `oldId`，這樣記憶的歷史時序鏈結才會是完整的。

最後，這款 `cli-memory` 本身也是我業餘時間跟 OpenCode Agent 共同開發出來的產物。如果你也想擺脫每次開新對話都要重教 AI 的困擾，歡迎試用看看、甚至來 GitHub 留顆 Star 喔！XD


<SocialBlock hashtags="javascript,ai,agent,memory,rag" />

## 參考資料來源
- [cli-memory GitHub 專案庫](https://github.com/johnnywang1994/cli-memory)
- [LanceDB 官方文件](https://lancedb.github.io/lancedb/)
- [ONNX Runtime 官方網站](https://onnxruntime.ai/)
- [Hugging Face Transformers.js 說明](https://huggingface.co/docs/transformers.js/)
