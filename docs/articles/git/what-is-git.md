# Git 版本控制

紀錄學習 git 的筆記跟一些使用想法。


## 推薦學習資源
- [GitHub-Getting started with Git](https://docs.github.com/en/get-started/getting-started-with-git)
- [GitHub-Using Git](https://docs.github.com/en/get-started/using-git)
- [Learn-Git-in-30-days](https://github.com/doggy8088/Learn-Git-in-30-days)
- [Stash-CherryPick](https://juejin.cn/post/7071780876501123085)

## 基礎概念 - unstaged, staged

### Git 是什麼

一種非集中式版本控制的工具，Git 記錄檔案快照，而不是差異，大部份的操作皆可在本地端完成，且通常只增加資料。


### 三種狀態
Git 會把你的檔案標記為三種主要的狀態：已提交（committed）、已修改（modified）及已預存（staged）

  - 已提交：代表這檔案己安全地存在你的本地端資料庫。
  
  - 己修改：代表這檔案已被修改但尚未提交到本地端資料庫。
  
  - 已預存：代表這檔案將會被存到下次你提交的快照中。


### Git 工作流程

  1. 你在你工作目錄修改檔案。(已修改)

  2. 預存檔案，將檔案的快照新增到預存區。(add 加入預存，已預存)

  3. 做提交的動作，這會讓存在預存區的檔案快照永久地儲存在 Git 目錄中。(commit 提交修改，已提交)


## 相關概念

  1. Git分支模型中存在兩個主分支，Master, Develop

  - master：

    Git 中默認的主分支。在 Git 分支開發模型中，master 分支的 HEAD 節點始終處於“準備好進行生產的狀態”，即 master 分支的 HEAD 節點所指向的版本始終是可以用於生產環境的正式版本。當其他分支的代碼版本合併到 master 分支時（隨後打上版本標籤），通常意味著一個新的正式版本已經發布。

  - develop：
  
    HEAD 節點總是指向下一個待發布版本的最新變化。 develop 分支的版本變更通常來源於輔助分支的合併，因此 develop 分支也常被稱為“整合分支”。當 develop 分支達到某一穩定點，可進行新版本的發佈時，develop 分支上的所有變更應該被合併到 master 分支並打上tag標籤

  2. 多 commit，少 push，push 太頻繁容易造成 conflict，少 merge。

  3. 推薦使用 Git Flow

  4. 多使用分支，保持主分支的整潔，
