# Remote 遠端協同工作 - remote, fetch, pull, push

## 顯示你的遠端

`git remote` 命令可以檢視你已經設定好的遠端版本庫， 它會列出每個遠端版本庫的「簡稱」。

可以指定 `-v` 選項來顯示 Git 用來讀寫遠端簡稱時所用的網址。

```bash
$ git remote
origin

$ git remote -v
origin	https://github.com/schacon/ticgit (fetch)
origin	https://github.com/schacon/ticgit (push)
```

## 新增遠端版本庫

使用 `git remote add <簡稱> <url>` 來新增遠端版本庫。

實作上常用於將本地倉庫推送到雲端倉庫時，先新增遠端版本庫後，再進行 push 指令。

```bash
$ git remote add origin https://github.com/example/test-repo.git
$ git push -u origin master
```

## 刪除遠端版本庫

使用 `git remote rm <簡稱>` 來刪除。刪除前建議先確認目標的位置，避免誤刪

```bash
$ git remote rm test-origin
```


## 遠端獲取或拉取

`git fetch` 這個命令會連到遠端專案，然後從遠端專案中將你還沒有的資料全部拉下來；

注意！`git fetch` 只會下載資料到你的版本庫——它並不會自動合併你的任何工作內容，也不會自動修改你正在修改的東西，

如果目前分支被設定為「追蹤」遠端上的分支，便可使用 `git pull` 命令來自動「獲取」並「合併」那個遠端分支到你目前的分支裡去。

```bash
$ git fetch [remote-name]
```

實際上 `git pull` 就是同時執行了 fetch 跟 merge。

### 同步遠端的 branch 狀態到本地
比如遠端已經把 test 分支刪除了，但本地還留著 `origin/test`，此時用 `git branch -D origin/test` 仍無法移除，就需要使用下面的指令把遠端上的分支狀態改動同步到本地
```bash
$ git fetch --all --prune
```

## 推送到你的遠端

`git push` 只有在你對克隆來源的伺服器有寫入權限，並且在這個當下還沒有其它人推送過，這個命令才會成功；

如果你和其它人同時做了克隆，然後他們先推送到雲端，接著你才推送到雲端，毫無疑問地你的推送會被拒絕；

你必需先拉取他們的工作內容，將其整併到你之前的工作內容，如此你才會被允許推送。

```bash
git push [remote-name] [branch-name]
```