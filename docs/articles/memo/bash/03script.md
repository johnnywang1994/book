# Script 腳本撰寫

## Hello Shell
拿一個基本的 `hello.sh` 為例
```bash
#!/bin/bash

echo "Hello Shell!"
```

`#!` 稱為shebang 指令，指定運行該腳本的解析器，預設使用 `/bin/sh`，所有語言中通用，JS, Python 撰寫如下
```bash
#! /usr/bin/env node
# JS

#! /usr/bin/env python3
# PY3
```
因為這些腳本解析器位置不固定，使用 `/usr/bin/env` 可以找到系統安裝的路徑相容性較佳

### 腳本執行
1. 直接調用，需要有文件執行權限，必須有路徑前綴，否則會被視為命令執行，但 PATH 變數不包含當前目錄，出於安全考量
```bash
# 給所有用戶添加執行權限
$ chmod 755 hello.sh
$ ./hello.sh # 注意這裡 ./ 是必須的
```
2. 指定解析器調用，不需要有文件執行權限，路徑前綴也不是必須，文件內 shebang 指令將被忽略
```bash
$ bash ./hello.sh
```
3. 作為命令執行
- 第一種方法是把腳本放到 PATH 變數包含的目錄下執行，推薦 `/usr/local/bin`
```bash
$ mv hello.sh /usr/local/bin/hello
$ hello
# hello
```
- 第二種是透過 `ln` 創建文件軟連結
```bash
$ ln -s ./hello.sh /usr/local/bin/hello
```
- 第三種更推薦的是使用別名 `alias`
```bash
# `pwd` 展開為當前 alias 設定時的路徑位置
$ alias hello="bash `pwd`/hello.sh"
$ alias | grep hello
# hello='bash /Users/johnnywang/Desktop/Johnny/hello.sh'
$ hello
# Hello Shell!
```


## 輸入輸出
主要透過三個內建指令：

### 輸出
- `echo`: 打印內容到標準輸出
- `printf`: 格式化輸出，使用方式[參考這裡](https://www.runoob.com/linux/linux-shell-printf.html)
```bash
$ printf "保留2位小數：Pi= %1.2f" $PI
# 3.14
```

### 輸入
- `read`: 從標準輸入讀取用戶輸入
```bash
$ read -p "請輸入姓名" name
$ read name1 name2 < file.txt
```


## 正則表達式
Bash 的正則分為兩種，基礎(BRE)、拓展(ERE)，很多地方預設使用 BRE

### grep 指令
文本匹配工具，以行為單位打印符合匹配模式的整行文字內容
```bash
$ grep [options] [pattern] [file ...]
```
範例
```bash
grep -i hello hello.sh
# echo "Hello Shell!"
```
如果不輸入文件，會從標準輸入讀取內容，因此常用在 pipeline 中作為搭配其他指令使用的結果過濾工具
```bash
history | grep "echo"
```


## Reference
- [Shell 腳本編程](https://juejin.cn/post/7130983293347954718)
