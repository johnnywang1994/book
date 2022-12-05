# Operation 算數表達式
- 自增減：`i++`, `i--`, `++i`, `--i`
- 正負：`+i`, `-i`
- 基本運算：`+ - \* / %`
- 賦值：`= += -=`
- 比較：`== != > < <= >=`
- 邏輯運算：`! && ||`
- 三元運算：`expr1 ? expr2 : expr3`

> 邏輯運算、比較運算中，0 表示 true, 1 表示 false

## 使用方式
- 算式展開 `$(( expression ))`
```bash
sum=$((1+1)); echo $sum
```
- `let` 命令
```bash
let sum=1+1; echo $sum
```
或是用 `let` 簡寫
```bash
((sum=1+1)); echo $sum
```
> `(( expr ))` 和 `let expr` 指令會在結果不為 0 時，返回狀態碼 0，反之則狀態碼 1。
```bash
if (( 1 )); then
  echo $?
  echo true
else
  echo $?
  echo false
fi
```

## Reference
- [Shell 腳本編程](https://juejin.cn/post/7130983293347954718)
