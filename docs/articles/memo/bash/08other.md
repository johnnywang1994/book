# 其他常用技巧、指令

此為持續更新的學習筆記紀錄，關於基礎的部分請前往前面章節閱讀


## 字串
### 隨機字串
```bash
# 8 位字串
echo $RANDOM | md5sum | cut -c 1-8
# or for MacOS
echo $RANDOM | md5 | cut -c 1-8

# 8 位數字
echo $RANDOM | cksum |cut -c 1-8
# 0-9
echo random=$((RANDOM % 10))

# uuid
uuidgen
```

### 壓縮 json 檔
其實不算是 bash，透過一行 python 達成
```bash
python -c 'import json, sys;json.dump(json.load(sys.stdin), sys.stdout)' < index.json
```


## 日期
### 當前時間
```bash
DATE=$(date +%F_%T)
# 2022-12-06_11:50:17
```


## 變數
### 檢查變數值為空
```bash
var=""
if [ -z "$var" ]; then
  echo "empty"
fi
```


## 運算
- [計算機 bc 指令](https://blog.gtwang.org/linux/linux-bc-command-tutorial-examples/)
### 取得小數運算
hero 字符串
```bash
bc -l <<< "100/3"
# 33.33333333333333333333
```
pipeline 傳遞
```bash
echo "100/3" | bc -l
# 33.33333333333333333333
```


## 查詢
### 查詢歷史
```bash
history | grep "echo" | less
```

### 查詢 macbook ip
```bash
ifconfig en0 | grep inet | awk '{print $2}' | tail -1
```


## 檔案
### 檔案存在且大小大於 0 備份
```bash
DATE=$(date +%F_%T)
USER_FILE=user.txt
if [ -s $USER_FILE ]; then
  mv $USER_FILE ${USER_FILE}-${DATE}.bak
  echo "$USER_FILE exist, rename to ${USER_FILE}-${DATE}.bak"
fi
```

### 檢查檔案是否為軟連結（symbolic link
指令 `ls -l` 返回結果中檔案開頭為 `l` 的就是軟連結
```bash
ls -l ./java
```

### 查詢當前資料夾內是軟連結的檔案
會遞迴往下層尋找
```bash
find . -type l -ls
```
只尋找當前位置一層
```bash
find . -maxdepth 1 -type l -ls
```

### 刪除軟連結
```bash
unlink symbolic_link
```


## 輸出
### &>/dev/null 無底洞
- [參考](https://www.796t.com/content/1550134446.html)
```bash
for USER in user{1..10}; do
  if id $USER &>/dev/null; then
    echo "$USER User already exists!"
  else
    PASS=$(echo $RANDOM | md5 |cut -c 1-8)
    echo $PASS
  fi
done
```

### 輸出 ls 為 json 格式
```bash
ls | awk '{print $0","}' | xargs | awk '{print "["$0"]"}' > index
```


## 函數
### 加總
```bash
# sumlist 1 2 3 => 6
sumlist() {
  local count=0
  for num in $@; do
    (( count+=$num ))
  done
  echo $count
}
```

### 取小數位
```bash
# parseFloat 10/2 => 5.00
# parseFloat 10/2 0 => 5
# parseFloat 10/3 3 => 3.333
parseFloat() {
  local user_float=$2
  local float="${user_float:-2}"
  echo $(echo "scale=$float;$1" | bc -l)
}
```