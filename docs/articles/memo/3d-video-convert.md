# 3D 影片轉碼教學

本篇記錄如何用最傳統方式轉碼 blueray 影片為假 3D SBS 影片

## 安裝 MeGUI
- 下載後，點選上方 Tools > AVS Script Creator，選擇你要轉碼的影片，選擇 File Indexer
- 結束後會產生一個 .avs 檔案，這個檔案就是你要轉碼的影片的索引檔

## 調整 avs 檔案
- 在輸出的 .avs 檔案中，加入以下程式碼後保存：

- 基礎版
```
# --- 請保留上面原本的所有程式碼，在最底下直接換行貼上這段 ---

# 1. 將上面讀取好的影片畫面設定為我們 3D 要用的變數
video = last

# 2. 定義左眼與右眼 (複製右眼並讓它延遲 2 格畫面，製造動態 3D 時間差)
left  = video.ConvertToYV12()
right = video.DeleteFrame(0).DeleteFrame(0).ConvertToYV12()

# 3. 將兩眼畫面各橫向擠壓 50%，並水平拼接成標準的 Half SBS
StackHorizontal(left.HorizontalReduceBy2(), right.HorizontalReduceBy2())
```

- [進階版](https://gist.github.com/LunNova/2409659)
```
# --- 請保留上面 MeGUI 自動產生的影片讀取前幾行代碼 ---
# --- 從這裡開始把原本的影片導入這套進階 3D 運算中 ---

factor3D = 20 # 縮小此數值（例如 15）會增強 3D 深度，但太大可能會有鬼影

# 將 MeGUI 自動讀好的影片傳入進階 3D 變數
video2d = last

# 轉為 RGB32 格式以利後續的寬度像素運算
video2d = ConvertToRGB32(video2d)

# 取得影片的原始長寬
videoW = width(video2d)
videoH = height(video2d)

# 💡 使用 Round() 強制四捨五入成整數，並確保數值為偶數，解決 MP4 報錯問題
ResW   = Round(videoW + (videoW / factor3D))
ResH   = Round(videoH + (videoH / factor3D))
ResW   = (ResW % 2 == 0) ? ResW : ResW + 1
ResH   = (ResH % 2 == 0) ? ResH : ResH + 1

video2d = LanczosResize(video2d, videoW, videoH)
CropW   = Round((ResW - videoW) / 2)
CropW   = (CropW % 2 == 0) ? CropW : CropW + 1

# 關鍵點：創造左右眼畫面並實施 1 幀的時間差
f1 = video2d
f2 = DeleteFrame(video2d, 0)

# 對右眼畫面進行拉伸與位移裁剪
f1 = LanczosResize(f1, ResW, ResH)
f1 = Crop(f1, 0, 0, videoW, videoH)

# 對左眼畫面進行拉伸與位移裁剪
f2 = LanczosResize(f2, ResW, ResH)
f2 = Crop(f2, CropW, 0, videoW, videoH)

# 合成 Full SBS (左右全寬度)
Full_SBS = StackHorizontal(f2, f1)

# 最終步驟：將其左右橫向擠壓 50%，輸出成標準的「Half SBS」
Half_SBS = Full_SBS.HorizontalReduceBy2()

# 💡 修正點 2：回到 MeGUI 最愛的 YV12 八位元色彩空間，保證 MP4 順利封裝不跳錯誤
Half_SBS = ConvertBits(Half_SBS, 8)
Half_SBS = ConvertToYV12(Half_SBS)

return Half_SBS
```
- AI 強化版
```
# --- 請保留上面 MeGUI 自動產生的影片讀取前幾行代碼 ---
# --- 從這裡開始導入【高清晰、強深度超頻版】3D 運算 ---

factor3D  = 18    # 🔥 深度超頻：數值從 25 降到 16，強制拉開左右眼位移，3D 立體感會暴增！
delay_frame = 1   # 幀數延遲：維持 2 幀的黃金時間差

video2d = last
video2d = ConvertToRGB32(video2d)

videoW = width(video2d)
videoH = height(video2d)

# 1. 精確計算偶數像素，確保 100% 不報錯
ResW   = Round(videoW + (videoW / factor3D))
ResH   = Round(videoH + (videoH / factor3D))
ResW   = (ResW % 2 == 0) ? ResW : ResW + 1
ResH   = (ResH % 2 == 0) ? ResH : ResH + 1
CropW   = Round((ResW - videoW) / 2)
CropW   = (CropW % 2 == 0) ? CropW : CropW + 1

# 2. 🔥 徹底移除糊化的 Merge 函數，直接原汁原味提取時間差影格，確保畫面絕對清晰
f1 = video2d
f2 = (delay_frame == 1) ? DeleteFrame(video2d, 0) : DeleteFrame(video2d, 0).DeleteFrame(0)

# 3. 🔥 將原本的 LanczosResize 升級為更高畫質、帶有邊緣銳化效果的「Spline36Resize」
# 這能大幅修正轉檔後畫面變糊的問題，讓哈利波特的衣服紋理、魔杖細節更銳利
f1 = Spline36Resize(f1, ResW, ResH)
f1 = Crop(f1, 0, 0, videoW, videoH)

f2 = Spline36Resize(f2, ResW, ResH)
f2 = Crop(f2, CropW, 0, videoW, videoH)

# 4. 色彩微調（只做微幅對比拉開，不影響畫質）
f1 = f1.ConvertToYV12().Tweak(cont=1.05)
f2 = f2.ConvertToYV12().Tweak(cont=1.05)

# 5. 合成並輸出標準 Half SBS
Full_SBS = StackHorizontal(f2, f1)
Half_SBS = Full_SBS.HorizontalReduceBy2()

# 6. 還原標準編碼格式輸出
Half_SBS = ConvertBits(Half_SBS, 8)
Half_SBS = ConvertToYV12(Half_SBS)

return Half_SBS
```

- 回到 MeGUI，點擊 AviSynth Script，選擇你剛剛修改好的 .avs 檔案，然後點擊 OK
- 跳出預覽應該就會是雙畫面，關閉預覽
- 點選 Video 區塊右下方的 Queue，開始轉碼，根據影片長度可能需要 30min-1hr 以上，請耐心等待


## 加回 Audio
- 轉碼完成後，會產生一個新的雙畫面 .mkv 檔案，這個檔案是沒有聲音的
- 點選上方 Tools > Muxer > MKV Muxer，選擇你剛剛轉好的 .mkv 檔案，然後選擇前面第一步產生的 .aac 音訊檔案，點擊 Queue