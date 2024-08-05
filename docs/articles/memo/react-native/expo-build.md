# Expo Build

[Development build](https://docs.expo.dev/tutorial/eas/configure-development-build) 是我們專案的調試版本。它針對創建應用程式時的快速迭代進行了最佳化

> 如果您熟悉 Expo Go，請將開發版本視為 Expo Go 的可定製版本，該版本是根據專案而獨一無二的


## Development build
### 1. Install expo-dev-client
- manifest URL 包含 expo-development-client 以及 app scheme
- 開發伺服器現在顯示 development build（而不是 Expo Go）
```bash
$ npx expo install expo-dev-client
```
> 但此時因為還沒有任何 development build 安裝在裝置、模擬機上，所以此時還無法真正打開 project

### 2. Initialize a development build
- Install [EAS CLI](https://www.npmjs.com/package/eas-cli)
```bash
$ npm install -g eas-cli
```
- Log in or [sign up](https://expo.dev/signup) for an Expo account
```bash
$ eas login
$ eas whoami # your-username
```
- 針對新專案，第一步是初始化 project 並連結到 EAS servers，此指令會做以下的事情：
  - 透過輸入 Expo 帳戶憑證來要求驗證帳戶擁有者，並詢問我們是否要建立新的 EAS 項目
  - 建立 EAS 專案並提供該專案的鏈接，我們可以在 Expo dashboard 中開啟該連結
  - 產生一個唯一的 projectId，並將該 EAS 專案連結到我們開發電腦上的範例應用程式
  - 修改 `app.json` 以包含 `extra.eas.projectId` 並使用建立的唯一 ID 更新其值
```bash
$ eas init
```
```json
{
  "extra": {
    "eas": {
      "projectId": "0cd3da2d-xxx-xxx-xxx-xxxxxxxxxx"
    }
  }
}
```

### 3. Configure project for EAS Build
- set up our project for EAS Build
  - 提示選擇平台：Android、iOS 或全部。
  - 使用以下預設配置在專案目錄的根目錄中建立 eas.json
```bash
$ eas build:configure
```
```json
{
  "cli": {
    "version": ">= 8.0.0"
  },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "preview": {
      "distribution": "internal"
    },
    "production": {}
  },
  "submit": {
    "production": {}
  }
}
```
> `eas.json` 是不同 build 設定檔的集合。每個設定檔都採用不同的配置進行定制，以產生特定的 build。這些設定檔還可以包括 Android 或 iOS 平台特定的設定。
  - `developmentClient` 為 true 時，會使用 `expo-dev-client`，提供開發工具並產生用於設備或模擬器/模擬器安裝的建置工件
  - `distribution` 配置為 internal 表示我們希望在內部共享 build（而不是將其上傳到應用程式商店）


## IOS Simulator build
iOS 模擬器的開發版本以 `.app` 格式生成，與 iOS 裝置不同。

### 1. 新增 ios 模擬器 build config
在 `eas.json` 中，新增一個名為 `ios-simulator` 的新設定，其屬性為 ios.simulator 屬性。將其值設為 true，對於開發構建，必須在設定檔中定義 `developmentClient` 和 `distribution` 屬性。為了避免冗餘，我們可以直接 extend `development` 的配置文件
```json
{
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "ios-simulator": {
      "ios": {
        "extends": "development",
        "simulator": true
      }
    }
  }
}
```

### 2. 建立 development build
執行 build 指令如下後，會發生下列反應
- 提示詢問您希望的 iOS bundle 標識符是什麼？按下 return 鍵選擇預設值。將在 app.json 中加入 `ios.bundleIdentifier`。
- 確認後，EAS Build 會加入 queue，並且 EAS CLI 會提供一個 link，可以在 Expo Dashboard 上查看 build 詳細信息並跟踪進度
```bash
$ eas build --platform ios --profile ios-simulator
```
> `ios.bundleIdentifier` 是我們應用程式的唯一名稱。如果我們現在發布我們的應用程序，Apple App Store 將使用此屬性及其值來識別商店中的應用程式。此表示法定義為 `host.owner.app-name`。例如，我們的範例應用程式有 `com.owner.stickersmash`，其中 `com.owner` 是域名，`stickersmash` 是我們的應用程式名稱

### 3. 開啟
在終端機中 build 完成後，EAS CLI 會詢問我們是否要在 iOS 模擬器上執行 build。
> 也可以使用 Expo Orbit 來安裝開發版本。從 Expo Dashboard 上的「build artifact」中，按一下「使用 Expo Orbit 開啟」以在 iOS 模擬器上安裝開發版本

### 4. 啟動 Dev Server 開啟 IOS 模擬機
```bash
$ npx expo start
```


## IOS build
- [Tutorial](https://docs.expo.dev/tutorial/eas/ios-development-build-for-devices/)

### 快速流程大綱
- 需要 [Apple Developer Account](https://developer.apple.com/account)
- 開啟 [Developer Mode](https://docs.expo.dev/guides/ios-developer-mode/) 且為 iOS 16 或更高版本
- 註冊裝置，產生、下載並安裝 [Provisioning profile](https://docs.expo.dev/app-signing/app-credentials/#provisioning-profiles) 到裝置中
  - 註冊裝置：`eas device:create`，選擇 Websites 會提供一個註冊裝置的連結
  - 下載並安裝 Provisioning profile：在裝置的網頁瀏覽器上，打開上一個步驟中提供的連結，然後點擊`下載設定檔`按鈕
- 確保 developmentClient 在 `eas.json` 中為 true，執行 `eas build --platform ios --profile development`
  - 提示詢問「選擇用於臨時建造的設備」。這是關鍵部分，這就是為什麼之前必須註冊一個設定檔。可以在此處選擇一個或所有已註冊的設備，然後按 return 鍵稍後在這些設備上安裝該版本

### 安裝
- [Expo Orbit](https://expo.dev/orbit) 允許在 iOS 裝置上無縫安裝開發版本。要使用此方法：
  - 使用 USB 將我們的 iOS 裝置連接到我們的開發人員機器
  - 打開 Orbit 功能表列應用程式
  - 在 Orbit 應用程式中選擇設備
- 或是使用「Build Artifact」中的 Install 按鈕會產生一個二維碼以方便安裝
- 啟動 dev server: `npx expo start`