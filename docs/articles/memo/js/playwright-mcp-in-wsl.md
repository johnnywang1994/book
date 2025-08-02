# VSCode 中使用 Playwright MCP 在 WSL 中配置

## Install @playwright/mcp in WSL2
- Install
```bash
# 安裝依賴
$ npx playwright install-deps
# 安裝 browsers
$ npx playwright install
```
- 取得 browsers 路徑
```bash
$ npx playwright install --list
# Playwright version: 1.51.1
#   Browsers:
#     /home/johnny/.cache/ms-playwright/chromium-1161
#     /home/johnny/.cache/ms-playwright/chromium_headless_shell-1161
#     /home/johnny/.cache/ms-playwright/ffmpeg-1011
#   References:
#     /home/johnny/Cline/MCP/github.com/pashpashpash/mcp-webresearch/node_modules/playwright-core
```
- 找到資料夾中有 `chrome` 可執行檔的位置，配置 mcp server config 如下(wsl playwright mcp 可能直找不到安裝的瀏覽器執行路徑，需另外手動指定)
```json
{
  "servers": {
    "playwright": {
			"type": "stdio",
			"command": "npx",
			"args": [
				"@playwright/mcp@latest",
				"--isolated",
				"--headless",
				"--executable-path",
				"/home/{user-name}/.cache/ms-playwright/chromium-1181/chrome-linux/chrome"
			]
		}
  }
}
```

- 測試範例
```
去 https://www.gamekee.com/ba 頁面執行以下動作

1. 找到【學生圖鑑】區塊，點擊右側的【更多】按鈕
2. 找到【學生圖鑑】區塊，點擊區塊內圖片列表的第一個 item，等待頁面跳轉並載入完成
3. 使用 selector `$('.base-box .base-header .base-header-l .role-skill .role-box .name[data-v-6461bf66]')[0]` 找尋元素並取得其 innerText 給我
```