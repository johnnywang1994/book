# Git Crypt 使用筆記

## 安裝
- MacOS
```bash
$ brew install git-crypt
```
- Windows([下載 git-crypt.exe](https://gitee.com/pharaoh/git-crypt-win))


## 使用步驟
1. 初始化
```bash
$ git-crypt init
```

2. 查看加密狀態
```bash
$ git-crypt status
```

3. `.gitattributes` 指定加密文件
```
secret.properties filter=git-crypt diff=git-crypt
```

> 添加到 `.gitattributes` 之前，提交的紀錄中機密檔案並不會被加密，請確保在提交機密內容前添加到 gitattributes 中

4. 建立機密檔案 `secret.properties` 並提交，此時本地仍然可以正常看到解密後的內容，但透過 `git-crypt status` 會顯示為 `encrypted: secret.properties`
```env
mysql.ip=locahost
mysql.port=3306
```

5. 匯出 git-crypt 的 key 另外保存，以利後續共享給專案成員解密使用
```bash
$ git-crypt export-key git-crypt.key
```

6. 將 `git-crypt.key` 檔案加入 `.gitignore` 中避免誤將 key 上傳

7. 解鎖 clone 下來的專案內容 (從協作者那取得 git-crypt.key)
```bash
$ git-crypt unlock ./git-crypt.key
```