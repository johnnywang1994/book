# Condition 流程控制


## 順序結構
預設從上到下執行，除非特殊指令作用，即使某條指令異常也會繼續執行，這點與大部分程式語言錯誤退出不太一樣

`;` 是結束指令的符號，通常以換行省略此符號，用分號可以在一行內執行多個指令


## 條件結構
- `&&`, `||` 等可以快速構成簡單的 if else
- `if`, `then`, `elif`, `else`，其中 `if`, `fi` 為起止標誌，中間 `elif`, `else` 可選
```bash
if test-commands; then
    branch-commands;
elif more-test-commands; then
    more-brach-commands;
else
    alternative-commands;
fi
```
> shell 沒有表達式語法，使用指令執行的狀態碼進行條件判斷，成功為 0 即 true，失敗 1 即 false，當判斷條件為算數運算時，也常使用這種算數表達式 `(( expr ))`
- `test` 為專門用於條件判斷的指令，可以透過下列方式簡寫
  - `test expr` 基本使用
  - `[ expr ]` 基本簡寫
  - `[[ expr ]]` 擴展正則匹配簡寫
```bash
#!/bin/bash

filename=$1

echo "查找文件$filename"

if [ -e $filename ]; then
    echo "文件${filename}存在"
    if [ -d $filename ]; then
        echo "這是一個文件目錄"
    elif [ -b $filename ]; then
        echo "這是一個塊文件"
    elif [ -c $filename ]; then
        echo "這是一個字符文件"
    else
        ls -l $filename
    fi
else
    echo "文件${filename}不存在"
fi
```
- `case`
  - 使用 glob 模式匹配，不是正則
  - 模式用括號包裹，括號左邊經常省略，右括號不能省略
  - 子句必须用 `;;`,`;&` 或 `;;&` 结尾（不可省略）
    - `;;`: 同 break
    - `;&`: 繼續執行下個子句，不論是否匹配，同省略 break 狀況
    - `;;&`: 繼續往下個匹配，就像沒有匹配過一樣
  - 可以在最後一個子句中使用模式 `*` 作為 `default` 分支
```bash
case word in
    [ [(] glob-pattern  ) commands ;;]…
esac
```
範例
```bash
cat << TIP
你最喜歡的程式語言是？
  1) C++
  2) Java
  3) Python
请輸入對應的數字：
TIP

read input_num

case $input_num in
  1 )
    lang="C++"
    echo "C++ 性能優越。"
    ;;
  2 )
    lang="Java"
    echo "Java 神通廣大。"
    ;;
  3 )
    lang="Python"
    echo "Python 簡單高效。"
    ;;
  * )
    echo "無效輸入"
    ;;
esac
```


## 循環結構
- `while`: 當 `test-commands` 成立，執行 `consequent-commands`
```bash
while test-commands; do
  consequent-commands;
done
```
- `until`: 執行 `consequent-commands`，直到 `test-commands` 成立
```bash
until test-commands; do
  consequent-commands;
done
```
- `for...in`
```bash
for variable [in words]; do
  commands;
done
```
範例
```bash
for item in A B C D; do
  echo $item;
done
```
進階用法
```bash
arr=("A" "B" "C" "D");

# loop through array element
for item in ${arr[@]}; do
  echo $arr;
done

# loop through array indices
# ! 表示 loop 對象為 index
# 使用 0..len 的方式遞迴不靠譜，因為 bash array 下標不一定連續遞增
for i in ${!arr[@]}; do
  echo "arr[${i}]=${arr[i]}";
done

# 大括弧展開
for num in {1..10}; do
  echo $num;
done

# 文件名查詢展開
for js_file in *.js; do
  echo $js_file;
done
```
> 迴圈使用變數陣列時必需以 `{}` 包裹，string, number 則不一定需要

- `for(( expr1; expr2; expr3 ))`
```bash
for (( expr1; expr2; expr3 )); do
  commands
done
```
範例
```bash
for (( i = 1; i < 1 + 4; i++ )); do
  echo $i;
done
# 1234
```


## Reference
- [Shell 腳本編程](https://juejin.cn/post/7130983293347954718)
