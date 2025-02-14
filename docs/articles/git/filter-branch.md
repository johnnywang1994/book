# Git Filter Branch

這個指令可以針對所有 branch 檔案做一系列操作進行修改

> 針對大型 git repo 有已知的效能問題，使用時需要特別注意，或是提前做好檔案備份，因為使用此指令操作後，相關檔案很可能無法還原

```bash
$ git filter-branch --tree-filter "<command>"
```

## 操作範例
### 從所有歷史紀錄中，刪除指定檔案
這邊使用 `-f` 強制操作，因為 filter-branch 預設會拒絕對名稱為 refs/original/ 開頭的目錄檔案進行操作
```bash
$ git filter-branch -f --tree-filter "rm -f config/database.yml"
# 移除備份點
$ rm .git/refs/original/refs/heads/master
```
此操作後，還需要搭配 git reflog 紀錄刪除才能真正把 `.git` 中的歷史資訊全部清除，以下是簡化操作，詳細說明請見 `reflog` 章節
```bash
$ git reflog expire --all --expire=now
$ git fsck --unreachable
$ git gc --prune=now
```

> 另外需注意，Windows 系統複製路徑會是 `config\database.yml` 以 `\` 連接路徑，可能導致 git filter-branch 後方 rm 對象找不到而失敗