# Subtree 子樹

這篇稍微難度較高，如果對於 Git 基礎還未完全掌握的朋友們，強烈建議先把 Git 基礎的操作知識熟悉後再學習這章節～

子樹顧名思義就是在本來 Git 項目中，插入另一個 Git 項目的概念，藉此達到拆分維護發布等等功能，相關的技術還有 [SubModules-子模組](https://blog.puckwang.com/posts/2020/git-submodule-vs-subtree/) 可以參考這篇講得很完整


## 從遠端分支拉取建立 subtree

從遠端來建立本地 subtree 的指令如下，這會把遠端倉庫的指定分支內容加入到當前專案的指定路徑位置，並且自動提交一個 commit 在原專案中

```bash
$ git subtree add --prefix=[sub-folder-path] [remote-url] [remote-branch] 
```

## 將本地 subtree 推送到遠端分支

從本地將 subtree 內容推上遠端，這個指令會把本地關於指定路徑的 commit 過濾出來後推送出去

```bash
$ git subtree push --prefix=[sub-folder-path] [remote-url] [remote-branch] 
```


## 從遠端分支拉取更新本地 subtree

此命令會把遠端分支的內容更新到本地已建立的指定 subtree 上

```bash
$ git subtree pull --prefix=[sub-folder-path] [remote-url] [remote-branch] 
```

> 這邊 pull 時，如果本地對應 prefix 不是透過 `subtree add` 建立，將會發生`fatal: 拒絕合併無關的歷史` 的問題，通常會發生在 `subtree push` 時，指定內容不是透過 `subtree add` 建立

> 因為對 git 來說，如果跳過 `subtree add` 的步驟，git 將無法得知本地倉庫有這個子樹的存在， `subtree push` 並不會對本地 commit 加入子樹，只會單純把部分 commit 推送出去，事後 `subtree pull` 時 git 會把整個專案 commit 拿去比對就會出錯，建議不論遠端是否為空專案，都先以 `subtree add` 加入子樹後再進行 `subtree push, pull` 的操作比較不容易發生問題

* 有時候就是已經開發到一半才想要把內容拆分建立新的 repo 時怎辦？

其實也不是完全沒救，可以先把本地指定位置的內容 `subtree push` 到遠端儲存，然後刪除本地的內容並下一個 commit，接著再使用 `subtree add` 重新把剛剛推送的內容給拉回來就行了，只是歷史紀錄看起來就會稍微醜一點

