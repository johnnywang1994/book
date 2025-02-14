# Git Reflog 指令紀錄

## 基礎指令
詳細顯示你每個指令的 SHA-1 值，通常用在查找某些 Git 歷史指令紀錄
```bash
$ git reflog
d3f40c0 (HEAD -> main) HEAD@{0}: checkout: moving from 895ed93 to main
895ed93 HEAD@{1}: checkout: moving from 107e82a to 895ed93
107e82a HEAD@{2}: checkout: moving from main to 107e82a
d3f40c0 (HEAD -> main) HEAD@{3}: reset: moving to HEAD
```

假如我們用 git reset 後找不到原本的 commit 時，就可以透過 git reflog 找到，並用 `git reset d3f40c0 --hard` 回到某個紀錄上

## 清除歷史指令紀錄
預設要等 30天，reflog 紀錄才會過期並消失，如果想要立刻馬上讓操作紀錄過期，可以透過以下指令列集
```bash
# 使 reflog 紀錄過期
$ git reflog expire --all --expire=now
# 查看紀錄是否已 unreachable
$ git fsck --unreachable
# 啟動 Git 回收機制清除垃圾
$ git gc --prune=now
# 查看是否已清空
$ git fsck
```
