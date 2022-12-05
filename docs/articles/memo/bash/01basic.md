# Bash 基礎概念


## 基礎概念
### 退出狀態碼
- value: `0-255`, 0 => 成功
```bash
$ false # true, false 單純返回狀態 0, 1
$ echo $? # $? 紀錄上個指令的執行狀態碼
# 1
```

### document
- `[]` 表示可選
- `|` 表示左右選項互斥
- `<>` 表示實際值替換部分
- `...` 表示可存在多個值
```
git push [--all | --mirror | --tags] [--follow-tags] [--atomic] [-n | --dry-run] [--receive-pack=<git-receive-pack>]
  [--repo=<repository>] [-f | --force] [-d | --delete] [--prune] [-v | --verbose]
  [-u | --set-upstream] [-o <string> | --push-option=<string>]
  [--[no-]signed|--signed=(true|false|if-asked)]
  [--force-with-lease[=<refname>[:<expect>]] [--force-if-includes]]
  [--no-verify] [<repository> [<refspec>...]]
```

### 組合命令
- `;` 可以串接多個命令在一行。需注意，即使前面的指令退出碼不是 0（出錯誤），後面一樣會執行
```bash
$ command1; command2; command3
```
- `&&` 前面執行成功後，才會執行後面
- `||` 前面執行失敗後，才會執行後面
```bash
# if else 效果
$ true && echo true || echo false
```
- `|` pipeline 流水線，可以把前一個指令結束的結果傳給下一個指令
```bash
# history 返回用戶歷史命令
# grep 匹配出只帶有"echo"字的歷史
# less 將過濾後的歷史以滾動查看的方式展示
$ history | grep "echo" | less
```
- `&` 可以開啟子shell來異步執行指令，並返回當前 shell 中，也可以拿來拼接指令
```bash
$ command1 & command2 & command3
# 1, 2 會在背景跑，3 在前台
```
- `{}` 代碼塊，常用在實現多條指令重定向
```bash
$ { echo "file content: "; cat source_file } > target_file
```

### 命令歷史
- `!!` 指代上一條指令
- `!-n` 指代前n條指令
- `!$` 上一條指令的最後一個參數
- `!*` 上一條指令的所有參數
```bash
$ mkdir hello
$ cd !* # = cd hello
```

### 引號
Shell 不存在數據類型（有數組），只有字符串一種值。除了 `$`(變量展開), `(命令替換), \\(轉義) 這些外，其他在雙引號內都為字串



## 命令展開流程
1. `{}`展開：`ab{c?, d*, ef}g` => `abc?g abd*g abefg`
2. `${}`變數展開
3. `$(( expression ))`算式展開
4. `$(command)`or`command`命令結果輸出、替換
5. 單詞分割：把上面的结果根據環境變數 IFS 分割成多个單詞，預設使用空白
6. 文件名展開：含有`* ? []`的文件名模式，展開為匹配的文件名稱，比如下面這樣
```bash
$ git add Documentation/\*.txt
```

### Glob 模式
大括號和文件名展開很常用來匹配文件名，比如 gitignore, Eslint 配置等

|模式|含義、例子|
|--|--|
|`*`|匹配任意字符串（含空串），但是不能跨越目錄層級|
|`**`|匹配任意層級目錄|
|`?`|匹配一個字符|
|`[abc]`|匹配中括號內的字符集合中的一個。排除法用 [^abc] 或 [!abc]|
|`a{b,c*}d`|先展開成模式 abd，ac*d，再分別匹配，只要能滿足一個就算匹配|

> glob 和正則表達容易混淆，但 Glob 專用於匹配文件名，正則為通用字符串匹配工具，可參考阮一峰[命令匹配符教學](https://www.ruanyifeng.com/blog/2018/09/bash-wildcards.html)



## I/O 重定向
Shell 的標準輸入輸出包括 stdin、stdout、stderr，分別對應指令狀態碼 0, 1, 2

### 輸出
使用 `>` 把指令輸出重定向到文件
```bash
$ ls > files
```
若文件不存在會直接創建新的文件
```bash
$ echo "{}" > config.json
```
若文件存在，則會先清空後再寫入，可以用 `>>` 改為 append 在原本內容後添加
```bash
$ ls >> files.txt
```

### 錯誤輸出
使用 `2>` 把錯誤重定向，或是用 `&>` 同時重定向輸出和錯誤輸出
```bash
$ ls 2> ls-err
$ ls &> files
```

### 輸入
輸入重定向用得較少，大多數使用文件當作參數，如下面這樣
```bash
# read-print.sh
$ read var
$ echo $var
```
```bash
$ bash read-print.sh < files.txt
```

### Here 文檔、字符串
Here 文檔允許我们把一段字符串作為輸入源，基本語法如下：
```bash
command << token
# 這裡是內容
text ...
token
```
`token` 只是一個標示，可以是任意值，只要收尾相同即可，內部支援變數展開

常用在長文本的格式的撰寫
```bash
title="Simple HTML"
content="Hello"

# cat 命令預設從標準輸入讀取内容
cat << EOF
<html>
<head>
  <title>
  The title of page:$title
  </title>
</head>
<body>
  $content
</body>
</html>
EOF
```
如果文本較短，也可以用 here字符串
```bash
$ alias echo-hello="bash read-print.sh <<< 'Hello'"
```



## 獲取幫助
### help
查看內建指令的基本用法
```bash
$ help type
$ help ls
```

### man(manual page)
大部分指令帶有使用手冊，詳細描述該指令的用法與參數、作用。
```bash
$ man ls
```

### info
`man`, `help` 相對過時，目前較新的文檔敘述指令為 `info`



## Reference
- [Bash 基礎知識](https://juejin.cn/post/7130982053528469511)