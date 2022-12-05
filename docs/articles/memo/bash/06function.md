# Function 函數

## 基本語法
- `return` 退出函數，函數中最後一行 return 可省略
- 函數定義本身也是一個命令，除非語法錯誤，否則總是狀態碼 0
- 函數須在使用前定義
```bash
fname() {
  commands
  return
}
```

## 函數使用
shell 函數可視為指令，執行函數和執行其他命令是一樣的
```bash
fname [arguments...]
```

## 函數內的變數位置
```bash
func() {
  # $0 仍然指向腳本文件名稱
  echo "\$0 = $0"
  # 其它位置參數被更新成函數調用時的參數
  echo  "參數個數 $#, 分別為 $@"
  # 函數的名稱存在環境變數 FUNCNAME 中
  echo $FUNCNAME
}

# 给這個函數傳參執行
func 1 2 3
```

## 局部變數
透過 `local` 在函數內部定義局部變數
```bash
foo() {
  local var="var in foo"
  bar
}

bar() {
  echo $var
  var="var in bar"
  echo $var
}

var="var in global"
foo
echo $var
```

## Reference
- [Shell 腳本編程](https://juejin.cn/post/7130983293347954718)
