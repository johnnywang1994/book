# Git Tag 標籤 - tag

## 列出你的標籤

`git tag` 這個指令將依字母序列出所有標籤；


## 建立新的標籤

Git 主要使用兩種類型的標籤：輕量級標籤和有註解的標籤。

建立標籤時，同時指定 `-a [tagname]` 及 `-m [comment]` 指定一個標籤訊息：

  - 輕量級：

```bash
$ git tag v0.1.1
```

  - 註解標籤：

```bash
$ git tag -a v1.4 -m "my version 1.4"
```


## 刪除標籤

簡單加上後綴 `-d [tagname]` 就可以移除標籤了。

```bash
$ git tag -d v1.0.s
```


## 分享標籤

`git push` 指令預設不會傳送本地標籤到遠端，如果要推送標籤，必須像分享遠端分支一樣執行，

`git pull` 指令則會拉取遠端標籤。

```bash
$ git push origin [tagname]`
```

如果想要一次推送很多標籤，也可以在使用 `git push` 指令的時候加上 `--tags` 選項，

這將會把你所有不在伺服器上面的標籤傳送給遠端伺服器。

```bash
$ git push origin --tags
```


## 檢出標籤

在 Git 中你不能真的檢出一個標籤，因為它們並不能像分支一樣四處移動。

如果你希望工作目錄和版本庫中特定的標籤版本完全一樣，你可以在該標籤上建立一個新分支：

```bash
git checkout -b version2 v2.0.0
```
