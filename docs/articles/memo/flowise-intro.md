# FlowiseAI 使用介紹筆記

<SocialBlock hashtags="javascript,flowise-ai" />

[FlowiseAI](https://github.com/FlowiseAI/Flowise) 是一款開源 LLM AI 工作流程開發工具，透過簡單的 UI 介面，讓用戶自定義複雜的 AI 工作流程

- [FlowiseAI - API Document](https://docs.flowiseai.com/getting-started)


## 安裝使用
- 本地 NPM 安裝
```bash
$ npm install -g flowise
$ npx flowise start
```
- Docker
```bash
# Download source code
$ git clone https://github.com/FlowiseAI/Flowise.git
$ cd ./Flowise/docker
# create .env
$ cp .env.example .env
$ docker compose up
```



## Chatflows 模組介紹

### Chains
#### LLM Chain
- 位置：`Chains - LLM Chain`
- 功能：基礎 LLM 鏈，用以定義一個 LLM 的模組鏈，能夠串接以下模組
  - Language Model: 核心 LLM Model，比如常見的 OpenAI, Ollama, GoogleVertexAI 等
  - Prompt: 比如常見的 instruction prompt 或是 chat prompt
  - Output Parser: 輸出的格式調整工具，比如把文字輸出轉為 JSON 值
  - Input Moderation: 輸出值內容檢查工具，比如常見內容關鍵字過濾機制
- 輸入：可以讀取 user input 到 prompt 當中
- 輸出：結果可以輸出為 LLM Chain 的形式，或是把輸出值傳遞給下一個 Chat Prompt 作為 input

#### Conversation Chain
- 位置：`Chains - Conversation Chain`
- 功能：對話鏈，用以定義一個具備 Memory 能力的模組鏈，能夠串接以下模組
  - Chat Model: 核心 Chat Model，比如常見的 ChatOpenAI, ChatGoogleGenerativeAI, ChatHuggingFace, ChatOllama
  - Memory: 記憶機制模組，常見如 Buffer Memory, Redis-Backed Chat Memory
  - Chat Prompt Template
  - Input Moderation

#### Conversational Retrieval QA Chain
- 位置：`Chains - Conversational Retrieval QA Chain`
- 功能：對話鏈，用以定義一個具備 Retrieval 能力的模組鏈，能夠串接以下模組
  - Chat Model
  - Vector Store Retriever: 向量儲存檢索器，負責將給定的 Document 轉為向量儲存並進行檢索的模組，比如 In-Memory Vector Store
  - Memory
  - Input Moderation
  - Return Source Document(switch)


### Prompts
#### Prompt Template
- 位置：`Prompts - Prompt Template`
- 功能：定義 instruct prompt

#### Chat Prompt Template
- 位置：`Prompts - Chat Prompt Template`
- 功能：定義 Chat Model 的 chat prompt


### Memory
#### Buffer Memory
- 位置：`Memory - Buffer Memory`
- 功能：提供其他需要 memory 的模組 Buffer 記憶功能，為暫時性的，當刪除 chat history 同時被清空

#### Redis-Backed Chat Memory
- 位置：`Memory - Redis-Backed Chat Memory`
- 功能：提供其他需要 memory 的 chat 模組持續記憶功能，為永久性的，即便刪除 chat history 也還是儲存在資料庫中


### Agents
#### Conversational Agent
- 位置：`Agents - Conversational Agent`
- 功能：提供 Chat Model 根據內容執行 Tools 的 agent，能夠串接以下模組
  - Allowed Tools: 串連 agent 可使用的所有工具模組，比如 Calculator, Google Custom Search
  - Chat Model
  - Memory
  - Input Moderation

> 搭配 Retriever 時，會發生 error `Received tool input did not match expected schema`，此時請改為使用 `Conversational Retrieval QA Chain`


### Tools
#### Calculator
- 位置：`Tools - Calculator`
- 功能：提供 agent 關於算數的精準計算能力

#### Google Custom Search
- 位置：`Tools - Google Custom Search`
- 功能：提供 agent 具備使用 Google custom search 的 Internet access 能力

#### Chain Tool
- 位置：`Tools - Chain Tool`
- 功能：提供 agent 根據 chain description 的提示使用此工具，可串連另一個 LLM Chain 處理特定的用戶輸入
  - Return Direct: 如果希望 chain tool 將內容直接回傳，而非經過 agent 整理後才返回可勾選此功能


### Vector Stores
#### In-Memory Vector Store
- 位置：`Vector Stores - In-Memory Vector Store`
- 功能：提供 Retrieval Chain 向量儲存檢索能力，可串連以下工具
  - Document(Loader): 提供向量檢索的 Document 來源，比如 PDF Loader, API Loader
  - Embeddings: 提供向量檢索使用的 Embedding Model，比如 Ollama 的 `nomic-embed-text` model


### Embeddings
#### Ollama Embeddings
- 位置：`Embeddings - Ollama Embeddings`
- 功能：提供 Vector Store 檢索能力的核心 model
> 記得打開 `Use MMap` 選項，避免 [Ollama Embeddings 500 Error](https://github.com/FlowiseAI/Flowise/issues/1940)


### Document Loaders
#### API Loader
- 位置：`Document Loaders - API Loader`
- 功能：提供 API 請求獲取 Document 能力，需串連 Text Splitter 使用
  - Text Splitter: 協助將 Document 文件內容分割的工具，比如 `HtmlToMarkdown Text Splitter`

#### Pdf File
- 位置：`Document Loaders - Pdf File`
- 功能：提供上傳 Pdf 文件獲取 Document，需串連 Text Splitter 使用
  - Text Splitter: 比如 `Recursive Character Text Splitter`


### Text Splitter
#### HtmlToMarkdown Text Splitter
- 位置：`Text Splitter - HtmlToMarkdown Text Splitter`
- 功能：協助將 Document HTML 格式轉為 Markdown 方便檢索查詢

#### Recursive Character Text Splitter
- 位置：`Text Splitter - Recursive Character Text Splitter`
- 功能：協助處理 `\n` 分割文件，當重複出現時遞回處理


### Output Parsers
#### Structured Output Parser
- 位置：`Output Parsers - Structured Output Parser`
- 功能：定義結構化 Output 格式


### Moderation
#### Simple Prompt Moderation
- 位置：`Moderation - Simple Prompt Moderation`
- 功能：定義 DenyList，觸發檢查內容機制，客製化錯誤訊息


### Utilities
#### IfElse Function
- 位置：`Utilities - IfElse Function`
- 功能：根據 LLM Chain 輸出的值傳入的 input 值，輸出 boolean true/false 並觸發相對後續 Chains，連結到 Prompt 上

<SocialBlock hashtags="javascript,flowise-ai" />