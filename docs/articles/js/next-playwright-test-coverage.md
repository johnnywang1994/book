# 如何在 NextJS 上收集 Playwright E2E 測試 coverage report?
###### tags: `JavaScript`, `NextJS`, `Playwright`, `E2E test`

<SocialBlock hashtags="javascript,nextjs,playwright" />

## 前言
Hi 大家好，我是 Johnny，好久沒有更新文章了呢!

最近有個專案使用 NextJS v15，需要收集 Playwright E2E 測試的 coverage report，甚麼是 coverage report 呢? 簡單說就是記錄你跑的測試覆蓋到多少你寫的大便 code(疑?)，並且細分到各個檔案層級，這個在 unit test 比方說 Jest 時可以很容易透過 configuration 調整輸出的 report 格式，但換到 E2E 測試，比如 Playwright 這樣的框架時，就會稍微比較麻煩一點，因為通常 E2E 會牽涉到各種跳頁的情況，收集覆蓋率時相對複雜很多


## 目前網路上的資料
在網路上針對 NextJS 的 E2E coverage report 相關文章研究後，目前網路上找到的大部分為以下兩種:
- [babel-plugin-istanbul](https://github.com/istanbuljs/babel-plugin-istanbul)(過舊無法使用)
  - 這是一個 Babel 的 Plugin，可以自動幫忙處理收集 coverage report，但因為 NextJS 最新版都已經預設使用 SWC compiler，對於自行切換回 Babel 編譯時可能跳出的 ERROR 就需要自己想辦法去修正，個人使用後發現會出現太多問題，不採用
  - 這裡有一個舊的 [Demo 專案](https://github.com/mxschmitt/playwright-test-coverage)，本篇部分內容為參考此專案實做，主要是了解你的 code coverage 該在甚麼時候開始、結束收集 report，並將 report 寫入檔案中
- [swc-plugin-coverage-instrument](https://github.com/kwonoj/swc-plugin-coverage-instrument)(過新不穩定，說明少，無法使用)
  - 這是目前 SWC 專門收集 coverage 的工具，但筆者在寫這篇文章時使用是無法正常運作，可能未來會有修正吧，但我現在就要用啊!!


## 土法煉鋼
經過各種研究後，最後看來只能自己實作一套了，主要是參考一些舊的文章，並稍微調整後總結如下流程

### 使用 Playwright 官網 Coverage API
- [Link](https://playwright.dev/docs/api/class-coverage)

- 官方範例
```js
const { chromium } = require('playwright');
const v8toIstanbul = require('v8-to-istanbul');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.coverage.startJSCoverage();
  await page.goto('https://chromium.org');
  const coverage = await page.coverage.stopJSCoverage();
  for (const entry of coverage) {
    const converter = v8toIstanbul('', 0, { source: entry.source });
    await converter.load();
    converter.applyCoverage(entry.functions);
    console.log(JSON.stringify(converter.toIstanbul()));
  }
  await browser.close();
})();
```

從以上簡短的範例看起來，我們需要透過 Playwright 的 API 明確告知收集 coverage 的開始、結束點後，將需要的 report 透過 `v8toIstanbul` 轉為 Istanbul 的測試 coverage 格式

#### 最終實作
- 首先安裝 v8-to-istanbul
```bash
$ npm install --save-dev v8-to-istanbul
```
- 接著撰寫 coverage util 工具
```ts
// e2e/utils/coverage.ts
import { test, Page } from '@playwright/test'
import v8toIstanbul from 'v8-to-istanbul'
import * as crypto from 'crypto'
import * as fs from 'fs'
import * as path from 'path'

const istanbulCLIOutput = path.join(process.cwd(), 'temp-coverage')

// put this in playwright.config.ts
export async function prepareCoverage() {
  await fs.promises.mkdir(istanbulCLIOutput, { recursive: true })
}

// put this in each test file
export async function setupTestCoverage() {
  test.beforeEach(async ({ page }) => {
    const testCoverage = new TestCoverage(page)
    await testCoverage.start()
  })

  test.afterEach(async ({ page }) => {
    const testCoverage = new TestCoverage(page)
    await testCoverage.stop()
  })
}

function generateUUID(): string {
  return crypto.randomBytes(16).toString('hex')
}

// see: https://playwright.dev/docs/api/class-coverage
// const coverage = await this.page.coverage.stopJSCoverage()
class TestCoverage {
  constructor(public readonly page: Page) {}

  async start() {
    await this.page.coverage.startJSCoverage({
      resetOnNavigation: false,
      reportAnonymousScripts: false,
    })
  }

  async stop() {
    const coverage = await this.page.coverage.stopJSCoverage()

    // we only needs these files coverage, you may want to change this to `.jsx`, `.js`
    const filteredEntries = coverage.filter(entry =>
      entry.source &&
      (entry.url.endsWith('.tsx') || entry.url.endsWith('.ts')) &&
      !entry.url.includes('node_modules')
    )

    // we write coverage file with await due to CI machine memory limitation
    // prevent Exit Error 137(OOM issue)
    for (let i = 0; i < filteredEntries.length; i ++) {
      const entry = filteredEntries[i]
      try {
        const converter = v8toIstanbul(entry.url, 0, { source: entry.source! })
        await converter.load()
        converter.applyCoverage(entry.functions)
        const coverageJSON = JSON.stringify(converter.toIstanbul())

        await fs.promises.writeFile(
          path.join(istanbulCLIOutput, `playwright_coverage_${generateUUID()}.json`),
          coverageJSON
        )
      } catch (error) {
        console.warn(`Failed to process coverage for ${entry.url}:`, error)
      }
    }
  }
}
```
- 最後我們需要在測試中這樣使用
```ts
import { test } from '@playwright/test';
import { setupTestCoverage } from '~/e2e/utils/coverage'

test.describe('My Super Test', () => {
  // 收集 report
  setupTestCoverage()

  test('use Turquoise as a default background color', async ({ page }) => {
    await page.waitForSelector("text=#1abc9c")
  });

  test('use Red as a background color', async ({ page }) => {
    await page.click("text=Red")
    await page.waitForSelector("text=#e74c3c")
  });
})
```

### 同場加映
如果你的專案像我一樣，需要同時收集 unit test, e2e test 的 coverage report，並且最終合併成為一個 report，那麼請接著往下看

- 安裝 nyc 工具

這是一個幫助合成 test coverage report 的工具，可以根據需求決定要輸出的 report 格式
```bash
$ npm install --save-dev nyc
```
- 設定 nyc configuration
```json
// .nycrc
{
  "all": true,
  "include": [
    "src/**/*.tsx",
    "src/**/*.ts"
  ],
  "exclude": [
    "**/*.config.ts",
    "**/*.config.js",
    "**/*.d.ts",
    "**/app/api/**/*.*",
    "__tests__",
    "tests",
    "e2e"
  ],
  "reporter": [
    "html",
  ]
}
```
- 設定 unit test 工具輸出 coverage 位置(以 Jest 為例)
這邊把原本 unit test 的 final report 輸出到跟前面 E2E 同一個資料夾內
```js
// jest.config.js
const config = {
  coverageDirectory: 'temp-coverage', // same as above e2e output dir
  coverageReporters: [
    'json' // nyc would need json format to merge with other reports
  ]
}
```
- 設定 package.json script
當我們跑完 unit test, e2e test 後，最後執行這個動作就可以將前面所有測試跑完的 coverage report(JSON 格式)整合成一份最終的 coverage report 了!
```json
{
  "create-report": "nyc report -t temp-coverage --report-dir coverage"
}
```

## 結語
雖然上面的實作只能算是一種應急的處置，如果後續有更穩定的工具能夠使用也是可以考慮轉移，但透過實作也希望能讓大家更了解整個 test coverage report 的收集從頭到尾的流程~，今天分享就到這瞜，下一篇文章見拉!

<SocialBlock hashtags="javascript,nextjs,playwright" />