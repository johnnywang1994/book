# Git 檔案比對與差異 - diff

## 四種常用的比對方式

![](https://i.stack.imgur.com/y8gFk.png)

1. git diff

比對「工作目錄」與「索引」之間的差異，常用在 `git add .` 之前查看確認修改了哪些東西，實務上常常會在 commit 之前執行多次 `git add .`，此指令專門應對於此種場景，可以確認每次 add 前關於「本次內容」目前「索引」中的差異

2. git diff [commit-id]

比對「工作目錄」與「指定 commit 物件裡的那個 tree 物件」，最常使用 `git diff HEAD`，需注意此比對方式不會比對到「索引」中的內容

3. git diff --staged/--cached [commit-id](預設 HEAD)

比對「索引」與「指定 commit 物件裡的那個 tree 物件」

> --staged 只是 --cached 的別名

4. git diff [commit-id-1] [commit-id-2]

比對兩個指定的 commit 物件裡的 tree 物件，最常用 `git diff HEAD^ HEAD`，代表【最新版的前一版】與【最新版】之間的差異

