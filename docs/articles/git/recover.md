# Git 基礎復原指令 - restore

## git commit --amend

此操作通常發生在當你太早提交（commit），接著才發現忘了加入某些檔案，或者寫錯了提交訊息； 

如果你想要重新提交，你可以在提交命令上使用 --amend 選項：

```bash
$ git commit --amend
```

這個命令會再次把預存區（staging area）拿來提交，如果自從上次提交以來你沒有做過任何檔案修改（例如：在上一次提交後，馬上執行此命

令），那麼整個快照看起來會與上次提交的一模一樣，唯一有可能更動的是提交訊息。

同樣用來提交訊息的文字編輯器會先啟動，並且已填好上一次提交的訊息內容； 你可以像往常一樣編輯這些訊息，接著它會覆蓋掉上一次的提交。

如果你提交後才意識到你想要把某些忘記預存（stage）的修改也一併加入到上一個提交中，你可以這樣做：

```bash
$ git commit -m 'initial commit'
$ git add [filename]
$ git commit --amend
```

最終只會得到一個提交——第二次的提交取代了第一次提交的結果。


## git restore [filename]

此操作將已修改檔案的修改內容完全重置，注意！是未預存的已修改檔案，謹慎使用！

```bash
git restore index.html
```

  - `--staged`：此後綴加入後針對已預存檔案，移出預存區。


## git reset [commit Hash]

回溯到指定的提交位置，但在該提交後所做的所有變更，仍然會存在，只是會變為 unstaged 狀態。

```bash
$ git reset 6951639
```

此時若使用 `git checkout` 前往其他分支，因為是 unstaged 未追蹤狀態，Git 會允許切換分支，因此就能把所有回溯的變更，

一次攜帶到另一個分支中。

```bash
$ git checkout master
```

