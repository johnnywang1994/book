# 遊戲 App 素材解包學習紀錄

<SocialBlock hashtags="javascript,spine2d,live2d" />

Hi 大家好我是 Johnny，今天這篇是我將手機遊戲素材解包的學習紀錄，實在太愛這款遊戲的角色了（香啊！錢包都課金到空空 QAQ），最終效果可以在[這裡查看](/book/spine/final-gear.html?assist=100010)

> 本篇文章及網站範例僅供教育學習參考使用，請勿違法將解包後獲取的素材轉售販賣


## 背景了解
首先要動手前，需要先了解目前 2D 遊戲市場上的幾種常見技術作法，主要分為兩種技術 Spine2D, Live2D（應該還有別的，但小弟的認知有限只知道這兩種）:

- Spine2D 使用 `.altas`, `.skel` 檔案載入，有時候這兩個文件後面會帶有 `.prefab`, `.asset` 副檔名，不用鳥他直接刪掉副檔名就好，單一物件 runtime 素材結構參考如下
  - `.skel(.prefab|.asset)`: 必要，Skeleton 骨架文件，model 的核心資料，輸出格式可能是體積較小的 binary `.skel` 或 體積較大的 `.json`（遊戲檔案中通常用 `.skel` 減少整體 runtime 下載體積）
  - `.altas(.prefab|.asset)`: 必要，描述貼圖如何佈置應用在 Skeleton 上的文件，根據製作時輸出大小不同，需要使用對應大小的 Texture 貼圖，通常在最上方會紀錄使用貼圖的名稱、尺寸，如果在讀取時貼圖尺寸不吻合 altas 設定可能導致解析錯誤或貼圖套用時跑位
  - `.png`: 必要，Texture 貼圖文件供 `.altas` 使用

- Live2D 主要使用 `.moc3`, `model3.json`, `physics3.json` 載入，單一物件的 runtime 素材結構參考如下，[官方文件在這](https://www.live2d.com/zh-CHS/learn/sample/)
  - `xxx.moc3`: 必要，model 的核心資料
  - `xxx.model3.json`: 必要，model 的設定資料（整合所有素材的描述文件）
  - `xxx.physics3.json`: 必要，model 的物理模擬設定
  - `xxx.png`: 必要，名稱通常叫 texture，為 2D 貼圖素材，通常為 png
  - `xxx.motions.json`: 可能必要（但通常需要，不然就不叫 `Live`2d了吧...），保存 model 中用到的動畫集
  - `xxx.cdi3.json`: 非必要，輔助顯示的文件
  - expresions: 非必要，保存 model 中用到的面部細節，通常為 json
  - sounds: 非必要，保存 model 中使用的聲音檔案

> 兩種技術在素材提取時的操作基本都相同，後面用工具讀取解析步驟不同


## 開始動手提取！
1. 透過模擬器下載遊戲(安裝完成，有些遊戲打開後才下載資源)
2. 用模擬器的檔案管理員打開對應的 apk 內容，需打開 root 權限，可[參考這篇](https://catchtest.pixnet.net/blog/post/32425306-%E5%8F%96%E5%87%BAandroid%E6%89%8B%E9%81%8A%E7%9A%84%E5%9C%96%E7%89%87%E5%90%A7)
3. 提取出模擬器需要的內容，貼到共享資料夾內（本機電腦的某個位置）
4. 下載 AssetStudio，開啟複製出來的 `.ab` 檔案(或`.unity3d`檔案)
5. 開啟後按下 export 輸出內容到指定位置


## Spine2D 文件處理

### 快速開啟瀏覽
如果只是想快速看妹紙，可以直接用 Steam 下載 `Live2DViewerEX` 直接快速引入打開，可[參考這篇](https://www.bilibili.com/read/cv16611529/)

### 讓 SpineWebPlayer 能夠讀取，需把 .skel 轉檔 .json
- 這一步看運氣，需要先確定你的 spine 文件是第幾版本，大版本差異會導致無法讀取
- 假設是跟我一樣 `Spine v3.6.53` 版本，可以透過下面的操作轉換
  1. 找到 export 出來後的 `xxxx.altas.prefab`, `xxxx.skel.prefab` 這類的檔案，並把對應的皮膚圖檔 `xxxx.png`(名稱可以在 altas 那個檔案裡找找)，放到同一個獨立資料夾中(刪掉 .prefab 後綴)
  2. 透過[這個線上工具](https://naganeko.pages.dev/chibi-gif/)轉換，選取對應的所有 `.skel`, `.altas`, `.png`，上傳之前注意人物 scale 需設定為 0.5，否則輸出的 json 讀取後尺寸可能跑掉
  3. 看到預覽後可以簡單調整，確定後點擊 `as is` 按鈕輸出

> 這一步上傳的文件需注意 altas 中紀錄的 texture 圖檔尺寸需與上傳的圖檔相同，不然會跑位，可以用線上工具轉換好貼圖的圖檔尺寸之後再一起上傳

### Spine2D 編輯文件
如果需要編輯 skeleton 文件，需要使用 `Spine2D 3.8` 破解版（或是你有錢也可以直接買正版ＸＤ），並引入剛剛輸出的 `.json` 檔(`.skel` 檔案應該也行，但我因為文件是 3.6 版本，一直讀取失敗所以先轉 json)，接著解析 altas 貼圖，可[參考這篇](https://www.bilibili.com/read/cv18073492/)

### 音頻解析
音頻 ACB 檔案，可以透過 [VGMToolBox](https://sourceforge.net/projects/vgmtoolbox/) 轉換成 HCA 格式，再用 [HCADecoder](https://github.com/Nyagamon/HCADecoder/releases) 轉成 wav 使用


## Live2D 文件處理
太複雜了先不講ＸＤ，只先把一些相關資源放下面


## 相關資源
- [AssetStudio](https://github.com/Perfare/AssetStudio/releases)
- [VGMToolBox](https://sourceforge.net/projects/vgmtoolbox/)
- [HCADecoder](https://github.com/Nyagamon/HCADecoder/releases)

### Spine2D
- [chibi-gif](https://naganeko.pages.dev/chibi-gif/)
- [Spine2d PRO - download](https://www.kadalin.com/software/download-spine-2d-pro-full-version/)
- [SpineWebPlayer - v4 up](https://zh.esotericsoftware.com/spine-player)
- [SpineWidget - under v4](https://github.com/EsotericSoftware/spine-runtimes/blob/3.6/spine-ts/widget/example/index.html)

### Live2D
- [Live2D Cubism Editor](https://www.live2d.com/zh-CHS/cubism/download/editor/)
- [Live2D 官方 Demo - SDK included](https://github.com/Live2D/CubismWebSamples)


<SocialBlock hashtags="javascript,spine2d,live2d" />

## 結論
研究了好幾天終於搞懂解析出了我要的東西！！這篇是一個完全沒相關背景的 app 素材小白一步一步學習的小筆記，偷偷學會不要跟別人講，你也能成為 App 解包大師，今天就講到這摟，下篇文章見拉～
