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