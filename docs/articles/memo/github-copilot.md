# Github Copilot 使用筆記

本篇爲紀錄使用 VSCode Github Copilot 的相關筆記
- [教學影片](https://github.com/features/copilot/getting-started)
- [教學文件](https://docs.github.com/en/copilot/using-github-copilot/getting-code-suggestions-in-your-ide-with-github-copilot)


## Ghost Text
- `Tab`: 套用全部 ghost text
- `command + ->|<-`: 套用部分, 按下 `Esc` 忽略剩餘部分
- `command + Enter`: 查看所有推薦的 ghost text
- `Alt + [|]`: 切換推薦的 ghost text


## Inline Chat
- `Ctrl + I`: 上方彈出對話視窗，可輸入需求產生 code


## Chat Sidebar
傳統類似 ChatGPT 的聊天視窗

### chat participants
使用 chat participant 將提示範圍限定到特定領域，[所有 Chat participants](https://code.visualstudio.com/docs/copilot/copilot-chat#_chat-participants)
- `@workspace`: 詢問關於你的 workspace 中的 code，當你需要 copilot 全盤了解整個專案設計架構、資料夾結構等等時
- `@vscode`: 詢問關於 vscode 相關設定使用問題時
- `@terminal`: 詢問關於 vscode terminal 相關內容問題時

### Slash commands
使用 Slash commands 避免為常見場景編寫複雜的提示，[所有 Slash commands](https://code.visualstudio.com/docs/copilot/copilot-chat#_slash-commands)
- `/tests`: 對選取的 code 撰寫 unit test
- `/fix`: 對選取的 code 提供 fix 方案
- `/explain`: 對選取的 code 進行說明
- `/clear`: 開始新的對話
- `/`: 列出所有可用的 slash commands
#### Set up a new project
使用 `/new` 進行專案創建
- `/new react app with typescript`
- `/new node.js express server`

### Chat variables
使用 Chat variables 在提示中包含特定上下文, `#file`, `#git`, `#terminalLastCommand`，[所有 Chat variables](https://code.visualstudio.com/docs/copilot/copilot-chat#_chat-variables)
