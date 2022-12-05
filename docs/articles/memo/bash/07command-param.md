# Command Line Params 指令列參數處理

## shift 指令
用於從左邊刪掉 n 個位置的參數，

```bash
shift [n] # n 預設為 1
```
範例
```bash
# bash hello.sh 1 2 3
echo $* # 1 2 3
shift 2
echo $* # 3
```
或是製作一個執行子指令的工具入口
```bash
sub_cmd=$1;
shift
/utility_path/bin/$sub_cmd "$@"
```


## 選項解析
shell 本身不區分參數中的選項、非選項，必須在腳本內去解析，常見三種方式：
- 手動解析：簡單腳本狀況下可行，複雜度越高，解析成本會指數上升
- 內建指令 `getops`：推薦，遵守 POSIX 規範，但僅支援短選項
- 外部命令 `getop`：linux 指令，可以解析長選項

底下為 `getops` 使用範例

### getops
```bash
getops optstring name [arg ...]
```
- optstring: 選項描述，`"ab:c"` 表示期望 `"-a -b bvalue -c"`，`b`後的`:`表示一個選項值

在 `while` 循環中使用，每次解析一個選項
- 如果解析到一個選項，該選項會保存在變數 $name 中，退出碼為 0
- 解析到不存在的選項，$name 返回 `?`，退出碼仍然為 0
- 解析到第一個非選項時，退出碼為 1，退出循環

> 命令使用了兩個隱式變量`$OPTIND` (OPTion INDex) 和 `$OPTARG` (OPTion ARGument)。
- `$OPTIND` 記錄了下次解析的位置（從 1 開始），在每次執行腳本時被設置為 1，並在解析後累加。
- `$OPTARG` 記錄了當前選項對應的值（如果存在）

```bash
# -c confirm 二次確認
# -m message 必須，刪除備註，儲存在 log 中
confirm=0

while getopts "cm:" option; do
  case $option in
    c) confirm=1 ;;
    m) message="$OPTARG" ;;
    ?) echo "參數錯誤"; exit 1 ;;
  esac
done

shift $(($OPTIND-1)) # 去除參數中已解析的部分

files=$@
default_message="刪除檔案 $files"

if (( $confirm )); then
  read -p "是否確認刪除文件 $files (Y/N):" confirmed
  if [[ $confirmed == [^yY] ]]; then # 如果不是 y、Y 則退出
    exit 1;
  fi
fi

if rm $files; then
  echo "log: ${message:-$default_message}" >> log.txt
fi
```

## Reference
- [Shell 腳本編程](https://juejin.cn/post/7130983293347954718)
