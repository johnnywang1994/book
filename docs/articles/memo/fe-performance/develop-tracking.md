# 開發流程、監控體系優化


## 技術選型
- SSR, SSG, CRS, Hybrid...
- JS 現代框架(React, Vue, Angular)
- Dependency(private NPM)
- Local DevTool(自研發前端工具)
- 效果確認(產品、設計師)
- 產品上線(部署系統)


## 開發流程
- FE, BE api schema 制定、共享（Swagger, Postman）
- FE api mock（msw, mockoon）
- FE 切版製作
- FE 交互實現
- FE 自動化測試
- FE code review
- FE 自動化部屬（CI/CD deployment）
- FE 上線即時監控（Sentry, Grafana, GA）

### 自動化測試
- E2E Test：Cypress, Playwright
- Unit Test：Jest, Vitest, Mocha
- API 測試：HttpRunner
- 壓力測試：autocannon

### 提升 code 質量
- code 規範（小組內或團隊內）
- 靜態 code 掃描
- code review
- 閱讀框架核心 source code

### 自動化部屬
- 自動化部屬工具選擇（Github Actions, Gitlab pipeline, DroneCI, CircleCI）
  - Pull Git repo
  - Auto testing, scanning
  - Image build & publish
  - Upload assets to CDN provider
  - Deploy status notification

### 上線即時監控
- 頁面錯誤（JS, API, white page, assets）
- 頁面性能（LighthouseCI）
- 吿警機制