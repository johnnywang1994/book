# RO - rAthena, Hercules 版本介紹


本篇記錄 RO 仙境傳說私服研究的筆記，純作為教育用途，本人在這方面是菜鳥，如有理解謬誤還請見諒

仙境傳說遊戲本體分為幾個發展時期，主要是 prere, renew 復興版本等，差異最主要是職業二轉、三轉、四轉的開放


## Hercules 版本
此版本遊戲內容普遍被認為較舊，優點是整體技術穩定性比 rathena 高，如果沒有特別要求跟上官方進度的可以考慮

### 架構
使用 [Laragon](https://laragon.org/) 整合一系列的 DB, Apache 等等技術，讓想在本地單機遊玩的玩家可以快速一鍵搭起服務，對只想在本地回味的初學者友善，使用流程大致如下

- 在下載的 Hercules 版本的資料夾中找到 `laragon.exe` 並啟動，會開啟一個 panel 視窗，點擊左邊的 `start all` 啟動所有需要的服務
- 開啟 `emulator` 資料夾中的 `run-server.bat` 腳本，會依序啟動以下幾個 server 的執行檔(依賴關係)，並開啟三個終端機視窗
  - `login-server.exe`
  - `char-server.exe`
  - `map-server.exe`
- 如果 emulator 資料夾中沒有以上三個 server，可能需要使用 Visual Studio 的編譯桌面 APP 功能編譯出執行檔，可參考隔壁 rathena 文件中的這篇 [Install on Windows](https://github.com/rathena/rathena/wiki/Install-on-Windows)
- 最後前往 `ro-client` 或是 `kRO` 等放置客戶端工具的資料夾(需要對應的版本，至少不要差太多版本)，開啟 `2019-06-05fRagexe_patched.exe` 或類似的執行檔開始遊玩


## rAthena 版本
- [rAthena](https://github.com/rathena/rathena)
此版本內容通常跟官方比較緊，但技術穩定度比 Hercules 低些，使用時除非具備一定的 Docker 知識，可以使用 docker-compose 快速部屬，但對不懂得初學者門檻較高，無法像 Hercules 那樣無腦部屬

### Windows 架構
- 可參考官方文件 [Install on Windows](https://github.com/rathena/rathena/wiki/Install-on-Windows)

### Docker 架構
- 可參考官方文件 [Install on Docker](https://rathena.github.io/user-guides/installing/docker/)
- 確保本地已安裝 Docker
- 在下載的 rAthena 版本的資料夾中開啟 `tools/docker`
- 執行 `docker-compose up`，第一次會自動搭起資料庫及 server，並跳出 exit code 0，關閉後再次執行 `docker-compose up` 即可啟動環境，需要注意 `sql-files` 裡面資料庫初始化的動作只有在第一次執行 up 指令時建立 volumes，第二次就不會再次建立，如果同時在測試多個不同版本的 rAthena 專案需要特別留意，避免資料庫異常導致啟動失敗
- 與 Hercules 版本最後步驟相同