import{_ as n,c as e,e as a,o as i}from"./app-BnHDXxj0.js";const l={};function d(v,s){return i(),e("div",null,[...s[0]||(s[0]=[a(`<h1 id="_3d-影片轉碼教學" tabindex="-1"><a class="header-anchor" href="#_3d-影片轉碼教學"><span>3D 影片轉碼教學</span></a></h1><p>本篇記錄如何用最傳統方式轉碼 blueray 影片為假 3D SBS 影片</p><h2 id="安裝-megui" tabindex="-1"><a class="header-anchor" href="#安裝-megui"><span>安裝 MeGUI</span></a></h2><ul><li>下載後，點選上方 Tools &gt; AVS Script Creator，選擇你要轉碼的影片，選擇 File Indexer</li><li>結束後會產生一個 .avs 檔案，這個檔案就是你要轉碼的影片的索引檔</li></ul><h2 id="調整-avs-檔案" tabindex="-1"><a class="header-anchor" href="#調整-avs-檔案"><span>調整 avs 檔案</span></a></h2><ul><li><p>在輸出的 .avs 檔案中，加入以下程式碼後保存：</p></li><li><p>基礎版</p></li></ul><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"># --- 請保留上面原本的所有程式碼，在最底下直接換行貼上這段 ---</span>
<span class="line"></span>
<span class="line"># 1. 將上面讀取好的影片畫面設定為我們 3D 要用的變數</span>
<span class="line">video = last</span>
<span class="line"></span>
<span class="line"># 2. 定義左眼與右眼 (複製右眼並讓它延遲 2 格畫面，製造動態 3D 時間差)</span>
<span class="line">left  = video.ConvertToYV12()</span>
<span class="line">right = video.DeleteFrame(0).DeleteFrame(0).ConvertToYV12()</span>
<span class="line"></span>
<span class="line"># 3. 將兩眼畫面各橫向擠壓 50%，並水平拼接成標準的 Half SBS</span>
<span class="line">StackHorizontal(left.HorizontalReduceBy2(), right.HorizontalReduceBy2())</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><a href="https://gist.github.com/LunNova/2409659" target="_blank" rel="noopener noreferrer">進階版</a></li></ul><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"># --- 請保留上面 MeGUI 自動產生的影片讀取前幾行代碼 ---</span>
<span class="line"># --- 從這裡開始把原本的影片導入這套進階 3D 運算中 ---</span>
<span class="line"></span>
<span class="line">factor3D = 20 # 縮小此數值（例如 15）會增強 3D 深度，但太大可能會有鬼影</span>
<span class="line"></span>
<span class="line"># 將 MeGUI 自動讀好的影片傳入進階 3D 變數</span>
<span class="line">video2d = last</span>
<span class="line"></span>
<span class="line"># 轉為 RGB32 格式以利後續的寬度像素運算</span>
<span class="line">video2d = ConvertToRGB32(video2d)</span>
<span class="line"></span>
<span class="line"># 取得影片的原始長寬</span>
<span class="line">videoW = width(video2d)</span>
<span class="line">videoH = height(video2d)</span>
<span class="line"></span>
<span class="line"># 💡 使用 Round() 強制四捨五入成整數，並確保數值為偶數，解決 MP4 報錯問題</span>
<span class="line">ResW   = Round(videoW + (videoW / factor3D))</span>
<span class="line">ResH   = Round(videoH + (videoH / factor3D))</span>
<span class="line">ResW   = (ResW % 2 == 0) ? ResW : ResW + 1</span>
<span class="line">ResH   = (ResH % 2 == 0) ? ResH : ResH + 1</span>
<span class="line"></span>
<span class="line">video2d = LanczosResize(video2d, videoW, videoH)</span>
<span class="line">CropW   = Round((ResW - videoW) / 2)</span>
<span class="line">CropW   = (CropW % 2 == 0) ? CropW : CropW + 1</span>
<span class="line"></span>
<span class="line"># 關鍵點：創造左右眼畫面並實施 1 幀的時間差</span>
<span class="line">f1 = video2d</span>
<span class="line">f2 = DeleteFrame(video2d, 0)</span>
<span class="line"></span>
<span class="line"># 對右眼畫面進行拉伸與位移裁剪</span>
<span class="line">f1 = LanczosResize(f1, ResW, ResH)</span>
<span class="line">f1 = Crop(f1, 0, 0, videoW, videoH)</span>
<span class="line"></span>
<span class="line"># 對左眼畫面進行拉伸與位移裁剪</span>
<span class="line">f2 = LanczosResize(f2, ResW, ResH)</span>
<span class="line">f2 = Crop(f2, CropW, 0, videoW, videoH)</span>
<span class="line"></span>
<span class="line"># 合成 Full SBS (左右全寬度)</span>
<span class="line">Full_SBS = StackHorizontal(f2, f1)</span>
<span class="line"></span>
<span class="line"># 最終步驟：將其左右橫向擠壓 50%，輸出成標準的「Half SBS」</span>
<span class="line">Half_SBS = Full_SBS.HorizontalReduceBy2()</span>
<span class="line"></span>
<span class="line"># 💡 修正點 2：回到 MeGUI 最愛的 YV12 八位元色彩空間，保證 MP4 順利封裝不跳錯誤</span>
<span class="line">Half_SBS = ConvertBits(Half_SBS, 8)</span>
<span class="line">Half_SBS = ConvertToYV12(Half_SBS)</span>
<span class="line"></span>
<span class="line">return Half_SBS</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>AI 強化版</li></ul><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"># --- 請保留上面 MeGUI 自動產生的影片讀取前幾行代碼 ---</span>
<span class="line"># --- 從這裡開始導入【高清晰、強深度超頻版】3D 運算 ---</span>
<span class="line"></span>
<span class="line">factor3D  = 18    # 🔥 深度超頻：數值從 25 降到 16，強制拉開左右眼位移，3D 立體感會暴增！</span>
<span class="line">delay_frame = 1   # 幀數延遲：維持 2 幀的黃金時間差</span>
<span class="line"></span>
<span class="line">video2d = last</span>
<span class="line">video2d = ConvertToRGB32(video2d)</span>
<span class="line"></span>
<span class="line">videoW = width(video2d)</span>
<span class="line">videoH = height(video2d)</span>
<span class="line"></span>
<span class="line"># 1. 精確計算偶數像素，確保 100% 不報錯</span>
<span class="line">ResW   = Round(videoW + (videoW / factor3D))</span>
<span class="line">ResH   = Round(videoH + (videoH / factor3D))</span>
<span class="line">ResW   = (ResW % 2 == 0) ? ResW : ResW + 1</span>
<span class="line">ResH   = (ResH % 2 == 0) ? ResH : ResH + 1</span>
<span class="line">CropW   = Round((ResW - videoW) / 2)</span>
<span class="line">CropW   = (CropW % 2 == 0) ? CropW : CropW + 1</span>
<span class="line"></span>
<span class="line"># 2. 🔥 徹底移除糊化的 Merge 函數，直接原汁原味提取時間差影格，確保畫面絕對清晰</span>
<span class="line">f1 = video2d</span>
<span class="line">f2 = (delay_frame == 1) ? DeleteFrame(video2d, 0) : DeleteFrame(video2d, 0).DeleteFrame(0)</span>
<span class="line"></span>
<span class="line"># 3. 🔥 將原本的 LanczosResize 升級為更高畫質、帶有邊緣銳化效果的「Spline36Resize」</span>
<span class="line"># 這能大幅修正轉檔後畫面變糊的問題，讓哈利波特的衣服紋理、魔杖細節更銳利</span>
<span class="line">f1 = Spline36Resize(f1, ResW, ResH)</span>
<span class="line">f1 = Crop(f1, 0, 0, videoW, videoH)</span>
<span class="line"></span>
<span class="line">f2 = Spline36Resize(f2, ResW, ResH)</span>
<span class="line">f2 = Crop(f2, CropW, 0, videoW, videoH)</span>
<span class="line"></span>
<span class="line"># 4. 色彩微調（只做微幅對比拉開，不影響畫質）</span>
<span class="line">f1 = f1.ConvertToYV12().Tweak(cont=1.05)</span>
<span class="line">f2 = f2.ConvertToYV12().Tweak(cont=1.05)</span>
<span class="line"></span>
<span class="line"># 5. 合成並輸出標準 Half SBS</span>
<span class="line">Full_SBS = StackHorizontal(f2, f1)</span>
<span class="line">Half_SBS = Full_SBS.HorizontalReduceBy2()</span>
<span class="line"></span>
<span class="line"># 6. 還原標準編碼格式輸出</span>
<span class="line">Half_SBS = ConvertBits(Half_SBS, 8)</span>
<span class="line">Half_SBS = ConvertToYV12(Half_SBS)</span>
<span class="line"></span>
<span class="line">return Half_SBS</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>回到 MeGUI，點擊 AviSynth Script，選擇你剛剛修改好的 .avs 檔案，然後點擊 OK</li><li>跳出預覽應該就會是雙畫面，關閉預覽</li><li>點選 Video 區塊右下方的 Queue，開始轉碼，根據影片長度可能需要 30min-1hr 以上，請耐心等待</li></ul><h2 id="加回-audio" tabindex="-1"><a class="header-anchor" href="#加回-audio"><span>加回 Audio</span></a></h2><ul><li>轉碼完成後，會產生一個新的雙畫面 .mkv 檔案，這個檔案是沒有聲音的</li><li>點選上方 Tools &gt; Muxer &gt; MKV Muxer，選擇你剛剛轉好的 .mkv 檔案，然後選擇前面第一步產生的 .aac 音訊檔案，點擊 Queue</li></ul>`,14)])])}const p=n(l,[["render",d]]),r=JSON.parse('{"path":"/articles/memo/3d-video-convert.html","title":"3D 影片轉碼教學","lang":"zh-TW","frontmatter":{},"git":{"updatedTime":1793116588000,"contributors":[{"name":"JohnnyWang","username":"JohnnyWang","email":"johnny29621189@kimo.com","commits":1,"url":"https://github.com/JohnnyWang"}],"changelog":[{"hash":"aa2432db93d1172f2de2aa1134511f56aea2fbbf","time":1793116588000,"email":"johnny29621189@kimo.com","author":"JohnnyWang","message":"UPD"}]},"filePathRelative":"articles/memo/3d-video-convert.md"}');export{p as comp,r as data};
