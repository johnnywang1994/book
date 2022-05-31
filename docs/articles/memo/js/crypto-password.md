# Crypto 密碼加密方法

- [CryptoJS](https://cryptojs.gitbook.io/docs/)

前端在傳遞登入等帳號密碼資訊時，若直接將用戶的帳號密碼顯示在 header 中，會有很大的安全風險，這篇提供一個基礎的前端 Crypto 登入加密方法，實際開發上可根據情況進行更複雜的處理，雖然這個加密法也只是讓 Network 中較難直接獲取明碼資訊，但也是一個蠻重要的基礎安全優化步驟

## 加密過程

1. prelogin 由 server 提供 v1, v2

前端請求 prelogin 帶著 id, account 給後端，後端根據 id, account 生成對應的 v1, v2 字串(產生過程就根據安全性要求進行)

#### Request
```json=
{
    "account": "aaa"
    "format": "json"
    "id": 1652864874683
    "app_id": 10100
}
```
#### Response
```json=
{
    "account": "aaa"
    "id": "1652864874683"
    "v1": "UjKNzjDe"
    "v2": "4nnizi8FVFAYs5w2"
}
```

2. 前端根據 v1, v2 加密

前端根據 v1, v2 字串，以 `CryptoJS` 加密，範例中先將原密碼轉為 Hash MD5，接者加入server 給的 v1, v2 字串，讓此次登入密碼變為唯一 secret，接著再用剛剛產生的 secret 以 [AES 對稱加密](https://zh.wikipedia.org/wiki/%E9%AB%98%E7%BA%A7%E5%8A%A0%E5%AF%86%E6%A0%87%E5%87%86) 對 Hashed Md5 密碼加密，採用基本的[電子密碼本（ECB）模式](https://zh.wikipedia.org/zh-tw/%E5%88%86%E7%BB%84%E5%AF%86%E7%A0%81%E5%B7%A5%E4%BD%9C%E6%A8%A1%E5%BC%8F)，最後再從加密後的結果中 parse 出字串狀態

> 注意，預設 CryptoJS 採用的是 CBC mode 加密，比起 ECB 相對較安全，本文僅為示範使用

```javascript
function encryptCryptoJS(password, v1, v2) {
    const passwordMd5 = CryptoJS.MD5(password);
    const passwordKey = CryptoJS.SHA256(
        CryptoJS.SHA256(passwordMd5 + v1) + v2
    );
    let encryptedPassword = CryptoJS.AES.encrypt(
        passwordMd5,
        passwordKey,
        {
          mode: CryptoJS.mode.ECB,
          padding: CryptoJS.pad.NoPadding
        }
    );
    encryptedPassword = CryptoJS.enc.Base64.parse(
        encryptedPassword.toString()
    ).toString(CryptoJS.enc.Hex);
    return encryptedPassword;
}
```

3. login 傳遞帳號和加密後的密碼

將前面 parse 出來的密碼放入真正的 login 請求，後端將根據相似步驟解析，這麼一來在我們的 Network 中就不會直接看到 password 了~

```json=
{
    "account": "aaa"
    "password": "29867ad1117073713a5c22c2e411d3fe"
    "redirect_uri": "xxxxx"
    "format": "json"
    "id": 1652864874798
    "app_id": 10100
}
```


## 學習

### MD5 訊息摘要演算法
`MD5 Hex String`，本身就是一種演算法，能夠將不論多長的字串內容統一轉為 128bit(16bytes) 的 Hash 雜湊值，用於確保資訊傳輸完整一致

#### 優點
- 方便使用
- 一定範圍情況下，可確保資料傳輸正確性

#### 缺點
- 因為多組字串有可能轉換為相同 MD5 Hash，存在碰撞攻擊疑慮，不適合用在安全性認證


### AES 進階加密標準(對稱加密)
用來替代舊的 DES 加密

#### 優點
- 安全性高
- 美國政府認可的機密文件加密規範

#### 缺點
- 機率雖然非常低，但曾被破解的方式為 `Side-channel attack`，或是`中間人攻擊`

```bash
$ openssl aes-256-cbc -in <input> -out <output>
```

### SHA2 - Secure Hash Algorithm 2
其下又可再分為六個不同的演算法標準，SHA-224、SHA-256、SHA-384、SHA-512、SHA-512/224、SHA-512/256

