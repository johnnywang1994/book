## Git 基礎使用 - init, clone, add, commit, status, log

### 建立 local 倉庫

`git init` 將會建立一個名為 `.git` 的子資料夾，其中包含 Git 所有必需的倉儲檔案，

如果你的專案資料夾原本已經有檔案（不是空的），那麼建議你應該馬上追蹤這些原本就有的檔案，然後進行第一次提交。

```bash
$ git init
```


### clone 現有倉庫

`git clone` 這指令將會建立名為「test_1」的資料夾，並在這個資料夾下初始化一個 `.git` 資料夾，從遠端倉儲拉取所有資料，

並且取出（checkout）專案中最新的版本。

```bash
$ git clone https://github.com/example/test_1
```


### 檢查檔案狀態

`git status` 用來偵測哪些檔案處在什麼樣的狀態下的主要工具

```bash
$ git status
```

後綴加上 `-s` 或 `--short` 可以簡化輸出內容，

未追蹤的新檔案在開頭被標示為 ??、被加入預存區的新檔案被標為 A、已修改檔案則是 M 等等。


### 開始追蹤、預存檔案

`git add` 是一個多重用途的指令——用來「開始追蹤」檔案、「預存」檔案以及做一些其它的事，

像是「標記合併衝突（merge-conflicted）檔案為已解決」。比起「把這個檔案加進專案」，

把它想成「把檔案內容加入下一個提交中」會比較容易理解。 

```bash
$ git add [filename]
```

當你在 add 預存檔案後，對已預存的檔案進行其他修改，此時在用 `git status` 查看，會發現他同時出現在已預存、未預存中，

切記！如果你在 git add 後修改檔案，你必需再次執行 git add 來預存最新版的檔案。


### 忽略不需要的檔案

通常你會有一類檔案不想讓 Git 自動加入，也不希望它們被顯示為未追蹤，這些通常是自動產生的檔案，

例如：日誌檔案或者編譯系統產生的檔案；在這情況下，你可以新建一個名為 .gitignore 的檔案，

在該檔中列舉符合這些檔名的模式（pattern）。

```bash
$ cat .gitignore
node_modules
dist
```


### 提交修改

現在你的預存區已被建構成你想要的，你可以開始提交你的變更；記住：任何未預暫存的檔案——新增的、已修改的，

自從你編輯它們卻尚未用 git add 預存的檔案將不會納入本次的提交中。

```bash
$ git commit
```

這麼做會啟動你選定的編輯器，並請求輸入該次提交的內容，實作上，常會加入後綴 `-m` 直接添加。

```bash
$ git commit -m "Init repo"
```

如果你想跳過預存區，Git 提供了一個簡易的捷徑， 在 `git commit` 命令加上 `-a` 選項，

使 Git 在提交前自動預存所有已追蹤的檔案，讓你略過 git add 步驟。很方便，但請小心，有時候它會納入你並不想要的變更。

```bash
$ git commit -a -m "Init repo"
```


### 檢視提交的歷史記錄

專案目錄內執行 `git log` 將以反向的時間順序列出版本庫的提交歷史記錄——也就是說最新的提交會先被列出來。

  - `-p`：最有用的選項之一，用來顯示每筆提交所做的修改內容。

  - `-2`：限制只輸出最後兩筆提交內容。

  - `--oneline`：壓縮紀錄為一行，對於檢視大量的提交時很有用。

  - `--graph`：會附加一個還不錯的 ASCII 圖形用來顯示分支及合併的歷史。

常使用以下指令綜觀整個歷史紀錄

```bash
$ git log --color --decorate --oneline --graph
```


## Alias 別名

如果你懶得輸入完整的 Git 指令，你可以輕易的使用 git config 來替指令設定別名。

```bash
$ git config --global alias.co checkout
$ git config --global alias.br branch
$ git config --global alias.ci commit
$ git config --global alias.st status
```

能用來創造一些你覺得應該存在的指令。 舉例來說，為了提高查看 log graph 的方便性，你可以加入你自己的 graph 別名：

```bash
$ git config --global alias.graph 'log --oneline --graph'
```
