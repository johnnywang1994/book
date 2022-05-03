# Cypress Vue

本篇以 vite 為基底進行 cypress 測試安裝與範例筆記

## 安裝

檢查前，可以先確認[環境依賴](https://docs.cypress.io/guides/continuous-integration/introduction#Machine-requirements)


```bash
$ yarn add cypress @cypress/vue@next @cypress/vite-dev-server -D
```

```json
// https://docs.cypress.io/guides/getting-started/installing-cypress#Opening-Cypress
{
  "scripts": {
    "test:e2e": "cypress open",
    "test:unit": "cypress open-ct"
  }
}
```

```js
// https://www.npmjs.com/package/@cypress/vite-dev-server/v/2.2.1
// cypress/plugins/index.js
const path = require('path')
const { startDevServer } = require('@cypress/vite-dev-server')

module.exports = (on, config) => {
  on('dev-server:start', async (options) => startDevServer({
    options,
    viteConfig: {
      configFile: path.resolve(__dirname, '..', '..', 'vite.config.ts'),
    },
  }))

  return config
}
```

> 若使用 [Windows WSL2](https://docs.microsoft.com/en-us/windows/wsl/install) 安裝，需先確認 WSL 版本為 2，若為 1 則無法正確啟動，詳細安裝流程可參考[官網說明](https://docs.cypress.io/guides/getting-started/installing-cypress#Windows-Subsystem-for-Linux)


