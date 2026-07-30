# 打破 Agent 健忘症！打造 Local-First 的 AI Agent 長期記憶庫：cli-memory 實戰指南

## 前言
Hi 大家好，我是現在在當 Agent 魔法後端工程師的前端工程師 Johnny，好久沒寫文章了，最近一直在學習 AI 相關的工具和使用，Agent 讓我從前端直接變成了全端，這次要分享的是我最近自己開發來用的 NPM `cli-memory` 工具，幫助 AI Agent 擁有跨 Session 的長期記憶能力，不然每次和 agent 聊天後，都要自己手動告訴 agent 幫我記錄在某某 markdown 或是讓我複製自己貼到筆記本裡，有了這工具後只要一個 prompt 就能讓 agent 記住你想要的資訊，並且在下次對話時自動幫你回想起來


在做之前我看了下市面上大部分的 memory 工具，不是 mcp 就是雲端的 memory，真的沒有完全吻合我的使用場景的工具 Orz，考慮到效能和隱私的問題，索性我就自己開發了這個工具，完全 Local-First，所有記憶資料都儲存在本機磁碟，並且使用向量檢索和全文檢索混合的方式來確保召回精準度。

## 為什麼 AI Agent 需要獨立的長期記憶庫？

在使用 LLM (Large Language Model) 驅動的 Agent（如 OpenCode、Claude Code、GitHub Copilot 等）時，開發者常遇到以下痛點：
1. **Context Window 限制與成本**：把所有歷史紀錄都丟進對話視窗，不僅消耗龐大 Token，還容易造成對話品質下降（Context Rot）。
2. **跨 Session 狀態遺失**：重啟 Agent 或開新對話後，Agent 無法記得使用者的寫碼風格、專案偏好或歷史決策。
3. **雲端隱私疑慮**：將個人偏好、私有專案架構或敏感資訊上傳至第三方記憶雲端服務，存在資安風險。

有些 Agent 內建記憶機制，比如 Claude，但很多都只是在本地端透過 markdown 保留文本的方式，隨著專案體積變大、歷史迭代以後，這個記憶會變得臃腫不堪，也徒增上下文的成本空間。

`cli-memory` 採用 **Local-First** 理念設計，結合 **LanceDB** 本地向量資料庫與 **Ollama** 本地 Embedding 模型，所有記憶資料完全儲存在本機磁碟，兼具隱私、效能與高檢索精準度。

### 為什麼選擇 CLI / CLI-Skill 架構而非 MCP (Model Context Protocol)？

雖然近期 MCP (Model Context Protocol) 相當流行，但 `cli-memory` 選擇以 **CLI + Agent Skill** 作為主要介面，核心優勢包括：
1. **跨 Agent 廣泛相容**：並非所有 CLI 終端 Agent 或自訂工具都原生支援 MCP 協定，但**幾乎所有 AI Agent 都具備執行 Shell 指令與讀取 Skill 指引的能力**。
2. **無須常駐與極低開銷**：MCP 往往需要常駐 Daemon 或維護長連線，若 Server 異常容易導致 Agent 卡死；CLI 指令為隨用即發（Ephemeral）程序，零背景負擔。
3. **Unix 哲學與彈性串接**：CLI 天然支援 Shell Pipe (`|`)、檔案重導向與自動化腳本。配合 `cli-memory call` 結構化 JSON 介面，不管是人類手動維護或是 Agent 自動化呼叫都非常直覺。

* **名詞解釋**：
  * **Local-First (在地優先)**：軟體架構設計原則，強調資料優先存放在使用者本機裝置，無須依賴外部雲端伺服器即可正常運作。
  * **MCP (Model Context Protocol)**：由 Anthropic 推出的開放標準協定，用於連接 AI 模型與外部資料源或工具服務。
  * **LanceDB**：輕量級、高效能的嵌入式向量資料庫 (Vector Database)，支援高效的向量相似度搜尋與全文檢索。
  * **Vector Embedding (向量嵌入)**：將文字轉換成高維度數值向量的技術，能讓電腦計算文字之間的「語意相似度」，而非僅比對字面關鍵字。
* **參考連結**：
  * [LanceDB 官方文件](https://lancedb.github.io/lancedb/)
  * [Ollama 官方網站](https://ollama.com/)
  * [Model Context Protocol (MCP) 官方文件](https://modelcontextprotocol.io/)

---

## 核心架構與混合檢索 (Hybrid Search) 機制

為了確保 Agent 既能精準召回記憶，又不會被低品質的垃圾訊息淹沒，`cli-memory` 實作了完整的記憶生命週期與檢索機制：

### 1. 主題隔離 (Topic Partitioning)
每一個記憶讀寫都必須指定 `topicKey`（例如 `health`、`career`、`project-x`）。不同的主題領域分開儲存，確保檢索時不會產生跨領域的干擾。

### 2. 語意 + 全文混合檢索 (Hybrid Search & Reranking)
單純的向量搜尋（Vector Search）有時會漏掉精確的專有名詞，而全文檢索（FTS）又缺乏語意理解能力。`cli-memory` 採用混合檢索策略：
* 先同時進行向量與全文搜尋，並透過 RRF (Reciprocal Rank Fusion) 演算法結合排名。
* 針對結果進行二次重排 (Reranking)，結合 **Importance (重要度)**、**Confidence (信心度)**、**Recency (新鮮度衰減)** 與 **Access Frequency (存取頻率)** 算出最終的 `hybridScore`。

```
Score = RRF_Score × Importance_Weight × Confidence_Weight × Recency_Weight × Access_Weight
```

```markdown
+------------------+     +--------------------+
|  Vector Search   |     | Full-Text Search   |
| (Ollama Embed)   |     |    (LanceDB FTS)   |
+--------+---------+     +---------+----------+
         |                         |
         +------------+------------+
                      |
                      v
      +-------------------------------+
      | Reciprocal Rank Fusion (RRF)  |
      +---------------+---------------+
                      |
                      v
      +-------------------------------+
      |   Multi-Factor Reranking      |
      | (Importance/Recency/Access)   |
      +---------------+---------------+
                      |
                      v
      +-------------------------------+
      |    Ranked Memory Results      |
      +-------------------------------+
```

### 3. 持久化寫入關卡 (Durable Write Gate)
為了防止大量一次性的聊天廢話污染記憶庫，`cli-memory` 預設限制只有重要度 `importance >= 7` 的資訊才能寫入持久化資料庫，有效過濾雜訊。

### 4. 智慧生命週期 (Memory Lifecycle)
提供多種記憶維護工具：
* **Extract / Capture**：從對話文本中自動拆解出句子級候選記憶，並賦予類型與重要度評分。
* **Consolidate / Merge**：自動計算相似記憶並進行合併，消除重複內容。
* **Reflect**：針對特定 Topic 自動提煉與生成摘要總結（Reflection）。
* **Prune**：自動清除低重要度或過期的舊記憶。

---

## 實戰教學：為你的 Agent 裝上長期記憶

### 步驟 1：安裝與環境設定

首先確保本機已安裝 Node.js (>= 18) 以及正在運作的 [Ollama](https://ollama.com/) 服務（並已下載 `nomic-embed-text` embedding 模型）：

```bash
# 下載 Embedding 模型
ollama pull nomic-embed-text

# 全域安裝 cli-memory
npm install -g cli-memory
```

### 步驟 2：一鍵安裝 Agent Skill

`cli-memory` 內建一鍵 Skill 安裝工具，支援 OpenCode、Claude Code、Codex、GitHub Copilot 等 Agent：

```bash
cli-memory skill install opencode
```

安裝後重啟 Agent，Agent 便會自動載入 `cli-memory` Skill 指引，在後續對話中自動進行記憶搜尋與儲存。

### 步驟 3：基本 CLI 操作

你也可以直接透過命令列手動操作記憶：

```bash
# 儲存一條偏好記憶
cli-memory store "使用者偏好使用 TypeScript 並採用 Functional Programming 風格" --topic coding --memory-type Preference --importance 8

# 搜尋記憶
cli-memory search "TypeScript" --topic coding

# 檢索上下文 (Anchor + Follow-up 雙階段檢索)
cli-memory retrieve-context "程式風格偏好" --topic coding

# 啟動 Web 管理介面與 REST API
cli-memory serve
```

執行 `cli-memory serve` 後，瀏覽器開啟 `http://127.0.0.1:3456` 即可使用內建的 React Web Admin Console 視覺化瀏覽、編輯與檢索所有主題記憶。

---

## Agent 自動化串接：JSON-RPC 工具呼叫

Agent 在背景可透過 `cli-memory call` 執行結構化的 JSON 機器介面：

```bash
# Agent 儲存記憶範例
cli-memory call store-memory '{"topicKey":"coding","content":"專案採用 Vitest 作為單元測試框架","memoryType":"Fact","importance":8}'

# Agent 查詢記憶範例
cli-memory call search-memories '{"topicKey":"coding","query":"測試框架","limit":5}'
```

這種結構化的介面能讓 Agent 在回答使用者問題前，自動先召回相關領域的歷史偏好與決策，達成真正的跨 Session 無縫銜接。

---

## 總結

這次 cli-memory 本身也是我業餘使用 opencode agent 打造的，從需求分析、架構設計、程式開發到測試與部署，都是透過 agent 與我協作完成的。透過這個實戰案例，也學到了許多 agent 與 LLM 的應用開發技巧，並且實際解決了跨 Session 記憶的痛點。也歡迎有興趣試用的讀者們玩玩看摟～馬上體驗一毛錢不花的極致隱私 agent long term 記憶體驗 XD(廣告)

* **優缺點分析**：
  * **優點**：100% Local-First 保障個人資料與隱私；採用 Vector + FTS 混合檢索搭配多因子重排，召回精準度高；具備寫入過濾關卡與自動整合機制，記憶庫不易膨脹腐敗；提供一鍵 Agent Skill 安裝與視覺化 Web 控制台。
  * **缺點**：依賴本機執行 Ollama 與 Embedding 模型，需佔用少量本機運算資源與磁碟空間；預設不支援多裝置間的雲端即時同步（但支援 JSON 匯出與匯入）。
* **注意事項**：
  * 首次使用前必須先啟動 Ollama 並完成 `ollama pull nomic-embed-text`。
  * 建議依據不同的專案或生活領域劃分明確的 `topicKey`，維持記憶庫的組織性。

## 參考資料來源
- [cli-memory GitHub 專案庫](https://github.com/johnnywang1994/cli-memory)
- [LanceDB 官方文件](https://lancedb.github.io/lancedb/)
- [Ollama 官方網站](https://ollama.com/)
- [nomic-embed-text Embedding 模型](https://ollama.com/library/nomic-embed-text)
