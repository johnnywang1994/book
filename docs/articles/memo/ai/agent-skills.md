# Agent Skill Guideline

- [Agent Skills open format](https://agentskills.io/home)
- [Claude Code Skills introduction](https://code.claude.com/docs/en/skills)


## 放置位置
每個 Skill 都應該放在 `skills` 目錄下的一個獨立子目錄中，子目錄名稱應與 Skill 的 name 相同。例如，如果 Skill 名稱為 `my-skill`，則應該放在 `skills/my-skill/` 目錄下。
- `.agents/skills/roll-dice/SKILL.md`
- `.claude/skills/roll-dice/SKILL.md`

```
my-skill/
├── SKILL.md           # Main instructions (required)
├── template.md        # Template for Claude to fill in
├── examples/
│   └── sample.md      # Example output showing expected format
└── scripts/
    └── validate.sh    # Script Claude can execute
```


## 基本組成
- formatter header — 以 `---` 開始和結束的 YAML 格式區塊，包含以下字段：
	- `name` — 必填，Skill 名稱，必須跟 folder name 吻合A short identifier for the skill. Must match the folder name.
	- `description` — 必填，Skill 描述，告訴代理何時使用此技能。這是代理決定是否啟用它的依據。
	- `argument-hint` - 選填，提供給代理的提示，幫助它理解如何使用技能的參數。這些提示可以是關於參數類型、格式或範圍的建議，以確保代理在執行技能時能夠正確地處理輸入。
	- `disable-model-invocation` - 選填，默認為 false。設置為 true 後，當代理啟用此技能時，不會將技能的主體內容加載到上下文中。這意味著代理將無法直接訪問技能的指令，除非明確指定執行該技能。
	- `user-invocable` - 選填，默認為 true。設置為 false 後，技能無法直接被用戶通過特定指令（如 `/explain-code`）來啟用，除非Agent 匹配技能描述。
	- `allowed-tools` - 選填，指定一個工具列表，這些工具將在技能啟用時自動可用，無需額外授權。
	- `model` - 選填，指定一個或多個模型名稱在技能啟用時使用。
	- `context` - 選填，設置為 fork 以在分支的子代理上下文中運行。

- The body —  Skill 的主要指令，代理在啟用此技能時會遵循這些指令。例如，代理會被指示使用終端命令生成隨機數，並根據用戶的請求替換骰子的面數。


## Skill 運作方式
- `Discovery探索` — 當聊天會話開始時，Agent 掃描默認的技能目錄並找到了你的技能。只讀取了名稱和描述，以此判斷何時該技能可能相關與被使用。若是明確透過 `/explain-code` 這樣的指令來詢問，則會直接啟用相關技能。
- `Activation啟動` — 當你詢問後，代理將你的問題與技能描述匹配，並將完整的 SKILL.md 主體加載到 Context 上下文中。
- `Execution執行` — Agent 遵循主體中的指令，根據你的請求執行 Skill 內完整的主命令內容。

