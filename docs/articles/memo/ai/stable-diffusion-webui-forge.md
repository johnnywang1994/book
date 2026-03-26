# Stable Diffusion WebUI Forge 分享

---

## 介紹
Forge 版本是基於 AUTOMATIC1111 的加強版，重點在「更快、更穩、更好用」。

- **效能**：整合 xFormers、Flash Attention，VRAM 利用率更佳，批次出圖速度提升。
- **穩定**：修正原版常見的崩潰與記憶體洩漏問題，支援長時間跑批。
- **好用**：內建 ControlNet、區域提示 (Regional Prompter) 等常用插件，UI 保持一致。
- **跨平台**：Windows / Linux / macOS (含 Apple Silicon Metal) 均可使用。

----

### 什麼是 AUTOMATIC1111
- 最受歡迎的 Stable Diffusion 圖形化前端，提供 txt2img、img2img、ControlNet、插件與主題等完整生態。
- 特色在「易用 + 高擴充性」：clone 後執行 `webui.sh` 就能開跑，並可在 Extensions 市集安裝上百種社群插件。
- Forge 在此基礎上改進效能與穩定性，並內建常用優化，讓新手少踩雷、老手更高效。

---

## 安裝（使用 uv 管理 Python）
前置需求：Git、可用的 GPU 驅動 (NVIDIA CUDA 12.x 或 Apple Metal)；其餘由 uv 處理。

----

#### 1. 取得程式碼
```bash
git clone https://github.com/lllyasviel/stable-diffusion-webui-forge.git
cd stable-diffusion-webui-forge
```

----

#### 2. 建立隔離環境並指定 Python 版本 (建議 3.11)
```bash
curl -LsSf https://astral.sh/uv/install.sh | sh
uv venv --python 3.11 --seed .venv
source .venv/bin/activate
```

----

#### 3. MacOS 沒有 CUDA，修改 `webui-user.sh` 啟動參數
```bash
export COMMANDLINE_ARGS="\
--skip-torch-cuda-test \
--opt-sdp-attention
"
```

#### 4. 安裝與啟動
```bash
./webui.sh
```

----

#### 5. 常見排錯
  - CLIP 無法透過 pip 下載時：改手動安裝。步驟：
```
    1) 用瀏覽器下載 `https://github.com/openai/CLIP/archive/d50d76daa670286dd6cacf3bcd80b5e4823fc8e1.zip` 並解壓。
    2) 在解壓後的資料夾裡找到名稱為 clip 的 folder，複製到 `.venv/lib/python3.11/site-packages` 裡。
    3) 確認 `site-packages/clip/__init__.py` 存在後再執行 `./webui.sh`，安裝流程會直接使用本地版本。
```

----

  - `ValueError: numpy.dtype size changed...`：Torch 與 NumPy 版本不匹配。
```
    1) 確認已啟用 `.venv`。
    2) 重新安裝 NumPy：`uv pip install --force-reinstall "numpy==1.26.4"`（PyTorch 2.1/2.2 常用）；若仍出錯，改裝 `numpy==2.0.1` 配合較新版 Torch。
    3) 若 NumPy 調整後 Torch 壞掉，重裝：`uv pip install --force-reinstall torch torchvision`。
```
  - 生成黑圖：
```
    - 多半是 VAE 損壞或沒載入，改選內建 `vae-ft-mse-840000-ema-pruned.ckpt` 或重新下載模型/VAE。
    - Apple M-series 若出現黑圖，啟動加入 `--no-half` 或在設定關閉「Upcast cross attention」。
    - 低步數 + 高 CFG 也可能導致飽和，嘗試步數 20、CFG 6–8，改用 Euler a / DPM++ SDE。
```

---

### 什麼是 VAE？
VAE（Variational Autoencoder）負責把潛空間特徵還原成可見影像，決定色彩、對比與細節風格。更換 VAE 可微調畫面質感，例如偏寫實或動漫。若 VAE 缺失或損壞，可能出現黑圖或嚴重偏色。

在 SD 推理時，UNet 先生成潛空間特徵，VAE 解碼器再把潛特徵轉回 RGB；因此 VAE 的品質直接影響最終色彩/細節。

---

### 什麼是 ControlNet？
ControlNet 是給 Stable Diffusion 加「條件控制」的模組，讓生成結果服從外部引導（姿態、邊緣、深度、法線、分割等）。
- **原理**：在 UNet 旁增加可學習的分支接收控制圖，與主網路特徵相疊，既保留生成能力又跟隨控制訊號。
- **用途**：固定構圖或姿態、把草圖/線稿轉高質感圖、依深度/分割精準上色。
- **常見模型**：Canny、OpenPose、Depth、Lineart、Seg、IP Adapter (ADE20K/COCO)。

---

## 模型下載
- CivitAI 是目前最豐富的模型資源庫，下載喜歡的模型，主要有寫實風、動漫風等等
- 範例使用
  - [Meinamix v11](https://civitai.com/api/download/models/119057?type=Model&format=SafeTensor&size=pruned&fp=fp16)
  - [Meinamix v11 InPaint](https://civitai.com/api/download/models/120702?type=Model&format=SafeTensor&size=pruned&fp=fp16)
  - [vae-ft-mse-840000-ema-pruned](https://huggingface.co/stabilityai/sd-vae-ft-mse-original/blob/main/vae-ft-mse-840000-ema-pruned.safetensors)
  - [ControlNet v1.1 Depth](https://huggingface.co/lllyasviel/ControlNet-v1-1/blob/main/control_v11f1p_sd15_depth.pth)

---

## 使用方法

#### **文生圖 (txt2img)**：
- 選模型 → 輸入 Prompt / Negative Prompt → 設步數 & CFG → Generate。
  - [Demo prompt](https://replicate.com/asiryan/meina-mix-v11/examples)

---

#### **圖生圖 (img2img)**：
- 上傳參考圖 → 設降噪強度 (0.3–0.6 保持構圖) → 出圖。
- **性能優化**：
 - Resolution 過大可用 `--medvram` 或 `--lowvram`，必要時關閉多餘插件。
- **批次任務**：Batch/Script 面板可一次跑多 Prompt，適合找風格或量產。

----

- **ControlNet / 區域提示**：在面板下方開啟，指定骨架/草圖/深度，或用區域遮罩精準控構圖。

---

#### **圖生圖-改圖 (img2img-inpaint)**：

- Inpaint 針對特定畫布區塊進行局部重繪，根據重繪結果與原圖的差異，調整對應的重繪強度

---

## 結束
Forge 讓 WebUI 更快、更穩且開箱即用的插件更齊全，適合日常創作與批次產出。
想試玩的話，只需 clone、跑一次 `webui.sh`，就能開始玩摟。感謝觀看！


