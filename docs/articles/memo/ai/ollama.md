# Ollama 筆記

## 修改 model 參數
Add "options": { "num_ctx": 8192} to the call you are making to the API. Alternatively,, create a new model with the default context size that you want:
- Copy the Modelfile of the model you want to modify
```bash
ollama show --modelfile phi3:14b-medium-128k-instruct-q4_K_M > Modelfile
```
- add params into modelfile you just copied
```
PARAMETER num_ctx 8192
```
- Create the new model based on the modified Modelfile
```bash
ollama create phi3:14b-medium-128k-instruct-8k-q4_K_M -f Modelfile
```


## VSCode Copilot 相關設定
### Windows WSL 環境(ollama 裝在 windows 上)
- 打開 windows 環境變數設定，新增變數 `OLLAMA_HOST` 為 `0.0.0.0`，讓 WSL 可以連接到 Windows 上的 Ollama 服務
- 打開 windows CMD，輸入 `ipconfig`，找到 Windows 的 IP 位址比如 ` 172.21.192.1`，記下來
- 在 VSCode 的 Copilot 設定中，新增 Ollama 的模型設定，將 `apiBase` 設定為例如 `http://172.21.192.1:11434`