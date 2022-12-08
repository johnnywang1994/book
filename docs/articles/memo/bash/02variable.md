# Variable 變數
普通變數無需聲明，使用時直接赋值即可
```bash
$ variable=value # = 左右無空格
```
`命令替换`語法能把命令的輸出附给變數
```bash
$ files=`ls`
```
使用變數
```bash
$ echo $files
$ echo "${files}_end" # 這裡大括弧是必須的
```
作用域分為三種
- 環境變數  
  能在當前 shell 及其子 shell 中使用，使用 `declare -x` 或 `export` 導出
- 全局變數  
  只能在當前 shell 進程内使用，預設。
- 局部變數  
  只能在函數内使用，使用命令 `local` 聲明

## declare
變數除了保存值以外，還可能綁定某些屬性，比如只讀、數值、作用域等等
```bash
declare -r CONST_INT=2 # 只讀變數，同 readonly 命令聲明的變數
declare -i a_int=3 # 數字類型變數
declare -x ENV_VAR=value # 環境變數
declare -a arr=(1 2) # 一般數組
declare -A map_arr=([a]=1 [b]=2) # 下標為字符串的數組
```

## set/unset
當一個變數被賦值時，就稱為 set，而 set 不接參數會輸出所有參數
```bash
$ temp_var=test
$ set|grep temp # temp_var=test
$ unset temp_var
$ set|grep temp # undefined
```

## 位置變數、特殊變數
- `$0`: 表示用戶當前的 shell，或是當前執行腳本名稱
- `$N`(N>0): 表示執行腳本或函數時的第 N 個參數
- `$#`: 執行腳本或函數時的參數個數
- `$@`: 執行腳本時的參數，等效於 `"$1" "$2" ... "$N"`
- `$*`: 執行腳本時的參數，等效於 `$1 $2 ... $N`，是一個整體
- `$?`: 上一指令的退出狀態碼

## printenv [env-name]
查看環境變數
```bash
$ printenv PATH
```

## 變數展開
除了基本的 `${variable}`，多用在腳本撰寫中，還有以下三種
- `${#variable}`：展開變數內容長度、數組長度
- `${variable:-default}`：為變數定義預設值，若該變數為空則展開為預設值
- `${variable:offset:length}`：字符串or數組切片

## 子shell
執行腳本或 bash 命令時，會創建一個子shell，子shell 會繼承父shell 的環境變數（不包括普通變數），子shell 中設置的環境變數不會影響到父shell。


## Array 陣列
### 創建陣列
- 直接聲明
```bash
arr=(element1 element2 element3)
```
- 下標指定聲明
```bash
arr=([1]=element1 element2 [4]=element)
```
- 直接指定(自動創建)
```bash
arr[0]=element1
```
- 單純初始化
```bash
declare -a arr
```

### 獲取元素
```bash
arr[0]=value
echo ${arr[0]}
```

### 數組長度
```bash
echo ${#arr[@]}
# or
echo ${#arr[*]}
```
但要注意，bash 數組更像是 map，沒有要求下標連續，如下
```bash
arr=(1 2 [4]=4)
echo ${#arr2[@]}
# 3
```

### 數組遍歷
`${arr[@]}` 展開數組全部元素，注意是否加引號
```bash
pets=("a cat" "a dog")

for pet in "${pets[@]}"; do
  echo $pet;
done
# a cat
# a dog

# 不加引號，會以空格分割
for pet in ${pets[@]}; do
  echo $pet;
done
# a
# cat
# a
# dog
```
遍歷 indices
```bash
for i in "${!arr[@]}"; do
  echo "arr[${i}]=${arr[i]}";
done
```

### 數組切片
數組切片與字符串子串語法類似。

`${arr[@]:offset:len}`，表示從 arr[offset] 開始，長度為 len 的數組，其中 offset 可以是負數，len 省略則表示到數組結尾
```bash
arr=(0 1 2 3 4 a b c d)

echo ${arr[@]:4}
# 4 a b c d

echo ${arr[@]:4:2}
# 4 a

# offset 為負時，注意前面需要加空格
echo ${arr[@]: -4: 2}
# a b
```

### 數組增刪
往後新增元素
```bash
arr+=(new1 new2)
```
結合切片使用
```bash
# push
arr=("${arr[@]}" value1 value2)
# unshift
arr=(value1 value2 "${arr[@]}")
# insert（在下標從0開始且連續的前提下）
arr=("${arr[@]:0:2}" value1 value2 "${arr[@]:2}")
# remove（在下標從0開始且連續的前提下）
arr=("${arr[@]:0:2}" "${arr[@]:3}")

# delete array
unset arr
# delete item
unset arr[2]
```

### 關聯數組
使用字符串作為下標，普通數組是`數字: 字符`，關聯數組是`字符: 字符`映射，更通用的 map 結構
```bash
declare -A ass_arr=(["white"]="#fff" ["green"]="#0f0")
echo ${ass_arr["white"]} # #fff
```
> 如果執行時報錯 `declare -A: invalid option`，請透過 `bash --version` 檢查一下 bash 版本，可能需要更新環境的 bash 版本才支援此功能（似乎 4.x 以上才支援）


## References
- [Bash 基礎知識](https://juejin.cn/post/7130982053528469511)
- [Bash 數組介紹](https://juejin.cn/post/7120225811050790919)
