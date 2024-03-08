# Git Rebase 定義分支的參考基準

git rebase 是除了 git merge 之外，另外一種合併分支的手段，但其顧名思義，並不是單純像 git merge 把兩個分支的頭接起來而已，而是針對當前所在分支進行「根部的重新定義」，也就是「移花接木」，rebase 會將當前的分支與目標分支進行比較，找到兩分支過去 commits 中第一個共同的 commit（兩個分支歷史中的重合節點），接著把當前分支整串接到目標分支上

## 基礎指令
假設我們現在的分支叫做 develop，且歷史 commits 為 a-b-c，c 是最新的 commit，而 main 分支上為 a-e-f，則當執行下面指令後，當前 develop 分支的 commits 順序就會變成 a-e-f-b-c，也就是從 a 節點切出來後新增的節點全部被接到 main 最新的 f 節點後面去了
```bash
$ git rebase main
```

### 如果有衝突 conflict 發生
跟 git merge 一樣，git rebase 時也會發生衝突，rebase 衝突發生時，git 會進入 rebase conflict 處理模式，在該模式下需要我們手動去處理衝突，當我們處理完之後，需要執行下列的步驟，讓 git 確認完成 rebase 操作
```bash
$ git add .
$ git rebase --continue
```
而如果我們在處理衝突的過程發現一些疑問，也可以退出並取消這次 rebase 的操作，恢復到 rebase 之前原本當前分支的狀態
```bash
$ git rebase --abort
```

### rebase 時以某個分支為主
若 rebase 時我們非常確定以某個分支的內容為主時，可以加入如下參數來自動解決衝突，假設當前一樣在 develop 分支上
```bash
# 衝突時，develop 內容覆蓋 main 內容
$ git rebase -Xtheirs main
# 衝突時，main 內容覆蓋 develop 內容
$ git rebase -Xours main
```
> 注意！這邊的 theirs, ours 的邏輯與 git merge 時相反，使用時需要特別注意！！


### 合併 commits
- [參考討論內容](https://stackoverflow.com/a/2568581)
rebase 除了最基本的合併分支能力外，還可以用來整理當前分支中的 commits，假設今天我們的歷史為 a-b-c，此時我們想把 b, c 兩個 commits 合併，就可以在分支上執行下面的指令
```bash
$ git rebase --interactive HEAD~2
```
輸入後會跳出一個 commits 整理畫面，類似下面，這邊要注意，與 git log 的順序相反，最新的 commit 在下面
```bash
pick c0bcbdc b
pick cc1d603 c

# Rebase ded59c1..cc1d603 onto ded59c1 (2 commands)
#
# Commands:
# ...
```
此時如果我們把 b 的 pick 標記改成 squash，執行後會跳出錯誤 `Cannot 'squash' without a previous commit`，反而此時我們要把 c 改成 squash，保留 b，執行後會再跳出下面的 commit 內容確認
```bash
# This is a combination of 2 commits.
# The first commit's message is:

b

# This is the 2nd commit message:

c
```
修改成我們要的 commit 訊息後，儲存跳出，就可以看到我們的 b, c commit 被合併成了一個