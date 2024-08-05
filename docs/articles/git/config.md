# Git 設定 - config

關於 git 的設定主要分為 global, local 設定，預設透過 init 建立 repo 時會套用 global設定


## 使用者名稱、密碼

```bash
$ git config --global user.name "helloman"
$ git config --global user.email "hello@google.com"
```

## 驗證設定

```bash
$ git config --global credential.helper "osxkeychain"
```


## Alias 別名

如果你懶得輸入完整的 Git 指令，你可以輕易的使用 git config 來替指令設定別名。

```bash
$ git config --global alias.co checkout
$ git config --global alias.br branch
$ git config --global alias.ci commit
$ git config --global alias.st status
```

能用來創造一些你覺得應該存在的指令。 舉例來說，為了提高查看 log graph 的方便性，你可以加入你自己的 graph 別名：

```bash
$ git config --global alias.graph 'log --oneline --graph'
```

## 首次推送 push 時錯誤
`error: RPC failed; HTTP 400 curl 22 The requested URL returned error: 400`，主因是專案太久沒提交，導致一次性提交的內容太大，超過預設最大 cache 字節數（預設為 1M），此時可以使用如下指令調整上限：
```bash
# 調整上限為 50MB
$ git config http.postBuffer 524288000
```

> 當然最好是每天都推送，盡量不要一次提交太多內容