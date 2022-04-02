# Git Stash 保存紀錄

`git stash` 能用來記錄當前工作目錄和索引的當前狀態，可以讓您保存當前修改後暫時處理其他事項，回到修改前的乾淨目錄


## 用法列表

```bash
# 保存當前未 commit 的紀錄
git stash

# 保存當前未 commit 的程式碼並添加備註
git stash save "備註的內容"

# 列出 stash 的所有紀錄
git stash list

# 刪除 stash 的所有紀錄
git stash clear

# 應用最近一次的 stash
git stash apply

# 應用最近一次的 stash，隨後刪除該紀錄
git stash pop

# 刪除最近的一次 stash
git stash drop
```

```bash
$ git stash list
stash@{0}: WIP on ...
stash@{1}: WIP on ...
stash@{2}: On ...
```

```bash
# 應用第二條 stash 紀錄
$ git stash apply stash@{1}
```