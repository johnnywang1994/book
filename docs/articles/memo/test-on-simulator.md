# 在 Simulator 上開發測試

這篇筆記主要為紀錄如何在 Mac 環境裡測試 IOS, Android 畫面版面

## IOS
透過 Mac 內建的 xcode simulator 即可，步驟如下：
- 確認 xcode 已安裝
- 打開 xcode 後，點擊畫面左上 `Xcode` => `Open Developer Tool` => `Simulator`
- 把 Simulator 加入到 Dock 中方便下次開啟，或是透過指令 `open -a Simulator` 開啟最近一次開啟的模擬器
- 如果需要在模擬器內連上本機的 `https://localhost/` 則可以將本機信任的 root CA 從鑰匙圈內複製出來後，將該 CA 拖入模擬器中，就可以在模擬器內認證該 Https 憑證了，安裝 App 進行測試也是同樣方式

## Android
透過 Android Studio 進行，步驟如下：
- 確認 Android Studio 已安裝
- 建立一個測試專案 `simulator`
- 打開 Android Studio，點擊上方分頁 `Tools` => `Device Manager`
- 接著可以新增自定義的作業環境版本、手機平板型號等等，建立完成後按下指定模擬器右邊的執行按鈕啟動