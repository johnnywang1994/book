# 串接 Sonarcube 筆記
SonarQube 是一款基於 Java 開發的原始碼檢測與品質管理系統，因著 Java 的關係，Server 與 Client 都是跨平台的


## Install
- [Link](https://docs.sonarqube.org/latest/setup/get-started-2-minutes/#Installing%20a%20local%20instance%20of%20SonarQube)
### docker image
```bash
$ docker run -d --name sonarqube -e SONAR_ES_BOOTSTRAP_CHECKS_DISABLE=true -p 9000:9000 sonarqube:latest
```

前往 [http://localhost:9000](http://localhost:9000) 開啟 Web 介面


## 建立 sonarcube 專案
在 sonar 上建立 manual project
1. Create new project - manual
2. 設定 Project key, Display name
3. 產生一組 token 並妥善保存
4. 執行分析專案，此步驟需下載 scanner


## 下載 scanner
根據環境可以[在此](https://docs.sonarqube.org/latest/analysis/scan/sonarscanner/)下載不同的 scanner


## CI 串接

- [Link](https://docs.sonarqube.org/latest/analysis/jenkins/)

以 Github 舉例
- [Github integration](https://docs.sonarqube.org/latest/analysis/github-integration/)

1. 創建 Github App 並安裝到目標專案的 Organization
2. 設定 sonarcube 專案

### Webhooks
加入 PR Webhook

### PR Decoration
sonar.com > Your project > Project Settings > General Settings > Pull Request Decoration

### Quality Profiles
根據專案需求，在設定頁面裡的 `Quality Profiles` 加入對掃描的套用規範
- CSS: sonar way


## 設定 package.json 產生 coverage report
- [javascript-typescript-test-coverage](https://docs.sonarqube.org/latest/analysis/test-coverage/javascript-typescript-test-coverage/)
```json
{
  "scripts": {
    "test:ci": "jest --ci --collectCoverage"
  }
}
```

## 設定 sonar-project.properties

建立專案後，需要產生一組 `sonar_login_token` 使用，並根據[這個教學](https://docs.sonarqube.org/8.9/analysis/analysis-parameters/)進行 sonar 的 project 配置

```bash
sonar.host.url=	http://localhost:9000
sonar.login=your_login_token
sonar.projectBaseDir=./
# sonar 上的專案名稱
sonar.projectKey=your_project_name

# test coverage report 位置
sonar.javascript.lcov.reportPaths=coverage/lcov.info

# scanner 規則設定
sonar.sources=src
sonar.eslint.eslintconfigpath=.eslintrc.js
sonar.typescript.tsconfigPath=tsconfig.json
sonar.coverage.exclusions=**/node_modules/**, **.spec.ts, **.test.ts, **.spec.js, **.test.js, **/*.html, **/next.config.js

# Encoding of the source code. Default is default system encoding
sonar.sourceEncoding=UTF-8

# 專案位置
sonar.analysis.repoLink=path_to_your_repository
```

## 設定 drone.yml

以下範例，配置 jest 產生 report，並接著執行 sonar scan

```yml
kind: pipeline
name: default

trigger:
  branch: ["main", "precommit/*"]
  event: ["push", "pull_request"]

steps:
  - name: prepare
    image: "node:16.13.1"
    commands:
      - "npm run lint"
      - "npm run test:ci"

  - name: sonar-scan
    image: sonarsource/sonar-scanner-cli
    environment:
      SONAR_TOKEN:
        from_secret: sonar_login_token
    commands:
      - "sonar-scanner -Dsonar.pullrequest.key=$DRONE_PULL_REQUEST -Dsonar.pullrequest.branch=$DRONE_SOURCE_BRANCH -Dsonar.pullrequest.base=$DRONE_TARGET_BRANCH"
    depends_on:
      - prepare
```