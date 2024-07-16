# 在 Simulator 上開發測試

這篇筆記主要為紀錄如何在 Mac 環境裡測試 IOS, Android 畫面版面


## simulator 本地 https 開發
- 安裝 xcode 並打開
- 點擊畫面左上 `Xcode` => `Open Developer Tool` => `Simulator`
- 把 Simulator 加入到 Dock 中方便下次開啟，或是透過指令 `open -a Simulator` 開啟最近一次開啟的模擬器
- 透過 mkcert 在本地建立 root 憑證後，印出 CA 憑證
```bash
$ mkcert -install
$ mkcert -CAROOT # /User/xxxx/Library/Application Support/mkcert
```
- 打開憑證資料夾，把 rootCA.pem 拖拉進模擬器畫面中，即可讓模擬器跳過 https 警告



## Android Studio 本地 https 開發
- 安裝 Android Studio 並打開
- 點擊上方分頁 `Tools` => `Device Manager`
- 接著可以新增自定義的作業環境版本、手機平板型號等等，建立完成後按下指定模擬器右邊的執行按鈕啟動
- 點擊 Project 分頁右上設定 `SDK Manager`
- 進入 `Android SDK` 分頁，點擊 `SDK Tools` 安裝 `Android SDK Platform-Tools`
- 複製上方 `Android SDK Location` 並添加到你的 PATH 路徑
```bash

```
- 執行 adb reverse 指令即可將 emulator 中的指定 port forward 到 host 本機的 port
```bash
$ adb reverse tcp:3000 tcp:3000
```
- 若結束開發希望復原
```bash
$ adb reverse --remove tcp:3000 # remove port
$ adb reverse --remove-all
```
- 查看所有 forward list
```bash
$ adb reverse --list
```
- 如果要 forward 443 可能會出現 `Permission Deny` error，可用下方指令重新啟動 adb daemon
```bash
$ adb root
```
- 安裝 apk(比如安裝三星瀏覽器)
```bash
$ adb install my-app.apk
$ adb install -r my-app.apk # 重新安裝
```