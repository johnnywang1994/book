## Yarn Plug'n'Play (PnP) 的 VSCode 設定方式

以下兩步驟設定：

1. 產生 VSCode SDK 設定: 執行以下指令在 VSCode 裡設定 Yarn's PnP:

```bash
yarn dlx @yarnpkg/sdks vscode
```

會產生出一個 `.vscode/settings.json` 檔案如下

```json
{
  "search.exclude": {
    "**/.yarn": true,
    "**/.pnp.*": true
  },
  "prettier.prettierPath": ".yarn/sdks/prettier/index.js",
  "typescript.tsdk": ".yarn/sdks/typescript/lib",
  "typescript.enablePromptUseWorkspaceTsdk": true
}
```

2. 選擇 TypeScript SDK 版本

跳出詢問對話，並選擇版本，如果沒有跳過對話，請手動設定如下

- 打開 vscode 指令列 `(Ctrl/Cmd + Shift + P)`.
- 輸入 `TypeScript: Select TypeScript Version....`
- 選擇 `Use Workspace Version` (version 結尾是 `-sdk`).

3. 重新載入 VSCode 視窗（如果有需要的話）

```dotnetcli
Ctrl/Cmd + Shift + P -> Developer: Reload Window
```

參考: [How to configure VSCode to run Yarn 2 (with PnP) powered TypeScript](https://stackoverflow.com/questions/65328123/how-to-configure-vscode-to-run-yarn-2-with-pnp-powered-typescript)
