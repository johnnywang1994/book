# Git 分支

Git 分支其實只是一個指向某提交的可移動輕量級指標， Git 預設分支名稱是 master，

隨著不斷地製作提交，master 分支會為你一直指向最後一個提交， 它在每次提交的時候都會自動向前移動。


## 查看分支

`git branch` 不加任何參數，你將會得到所有分支的簡易清單

```bash
$ git branch
  iss53
* master
  testing
```

  - `-v`：查看各分支最後一個提交內容

  - `--merged`, `--no-merged`：從清單中篩選出已經合併或尚未合併到目前分支的分支。

```bash
$ git branch -v
  iss53   93b412c fix javascript issue
* master  7a98805 Merge branch 'iss53'
  testing 782fd34 add scott to the author list in the readmes
```


## 建立一個新的分支

`git branch [new branch name]` 建立一個新的、可移動的指標，在目前提交上新建一個指標。二個分支都指向同一系列的提交歷史

此命令只是建立一個新的分支，並不會切換過去。

```bash
$ git branch testing
```

Git 它保存了一個名為 HEAD 的特別指標，會指向你當前所在的分支，你可藉此知道你目前在哪個分支上工作。


## 刪除一個分支

加上後綴 `-d [branch name]` 可以刪除指定分支，注意，刪除只是移除分支名稱，該分支內的提交仍然存在於 Git 紀錄中。

```bash
$ git branch -d testing
```


## 在分支之間切換

`git checkout` 切換到一個已經存在的分支，這會移動 HEAD 並指向 testing 分支。

```bash
$ git checkout testing
```

這條命令做了兩件事， 它把 HEAD 指標移過去並指向 testing 分支，然後把工作目錄中的檔案換成 testing 分支所指向的快照內容；

加上後綴 `-b [new branch name]` 可以在創建新分支的同時切換 HEAD 指標。

```bash
$ git checkout -b testing
```
