# Git Merge 分支合併指令

`git merge` 是用於從指定的commit(s)合併到當前分支的操作。

常見有以下三種：

  1. git merge `[-n] [--stat] [--no-commit] [--squash] [--[no-]edit] [-s <strategy>] [-X <strategy-option>] [-S[<keyid>]] [--[no-]rerere-autoupdate] [-m <msg>] [<commit>...]`

  2. git merge -m `<msg> <commit>....`

  3. git merge --abort

其中一二差別在於添加 `msg`，第三種僅在合併後導致衝突時使用，將會拋棄合併過程，並嘗試重建合併前的狀態，但是～！當合併開始時，如果存在未 commit 的文件，此指令有可能會無法重現合併前的狀態，特別是這些未 commit 文件在合併過程中將會被修改時。

使用 `git merge` 時盡量不要出現未 commit 的文件，如果逼不得已必須先暫存的話，可以使用 `git stash` 將這些未 commit 文件保存，待處理完 conflick 後，使用 `git stash pop` 還原出來即可。

詳細的 `git stash` 指令可以[參考這邊](https://johnnywang1994.github.io/book/articles/git/stash.html)


## 分支的基本用法

首先，我們假設你正在開發你的專案，並且已經有一些提交（commit）了。

你決定要修正其中的議題 #53； 要同時新建並切換到新分支，你可以在執行 git checkout 時加上 -b 選項：

```bash
$ git checkout -b iss53
```

你開始開發網站，並做了一些提交；突然網站有一個問題需要立即修正，唯一需要做的只是切換回發佈產品用的 master 分支。

然而，在切換分支之前，留意一下你的工作目錄或預存區（staging area）裡是否有還沒提交的內容，

它可能會和你即要檢出的分支產生衝突（conflict），Git 會因此而不讓你切換分支。

```bash
$ git checkout master
```

接下來開始緊急修正； 讓我們建立一個緊急修正用的分支來進行工作，直到完成它：

```bash
$ git checkout -b hotfix
```


## 合併分支

當你處理修改完後，切回 master 並把 hotfix 分支使用`git merge`合併進來，再部署到產品上。

```bash
$ git checkout master
$ git merge hotfix
Updating f42c576..3a0874c
Fast-forward
```

注意合併時有一個「Fast-forward」字眼；由於你要合併的分支 hotfix 所指向的提交超前了 master 提交，

Git 於是簡單地把分支指標向前推進；換句話說，如果想要合併的提交可以直接往回追溯歷史到目前所在的提交，

Git 會因為沒有需要合併的工作而簡單地把指標向前推進——這就是所謂的「快進（fast-forward）」。

在那個超級重要的修正被部署以後，你準備要切回到之前被中斷而正在做的工作； 

然而在那之前，你可以先刪除 hotfix，因為你不再需要它了——master 也指向相同的提交； 


## 切回到之前用來解決議題 #53

這裡值得注意的是之前 hotfix 分支的修改內容尚未包含到 iss53 分支的檔案中；

如果需要納入那個修正，你可以用 git merge master 把 master 分支合併到 iss53 分支；

(`git merge` 後只是指標會連在一起，但若後續再對 master 提交，master 分支仍然會存在並往下個提交推進)

或者等 iss53 分支完成之後，再將它合併到 master。


## 三方合併（three-way merge）、合併提交（merge commit）

你已經完成了議題 #53 的工作，並準備好將它合併到 master 分支； 要完成這件事，你需要將 iss53 分支合併到 master 分支，

實際操作和之前合併 hotfix 分支時差不多， 只需切回合併目的地的 master 分支，然後執行 git merge 命令。

但此時，你的開發歷史是從一個較早的點便開始分離開來，由於目前所在的提交，並不是被合併的分支的直接祖先，

Git 必需進行一些處理，進行一次簡單的三方合併。

不同於將分支指標向前推進，Git 會對三方合併後的結果產生一個新的快照，並自動建立一個指向這個快照的提交。

這個提交被稱為「合併提交（merge commit）」
