# React Web3 Storage

<SocialBlock hashtags="react,javascript,web3,web3storage,antd" />

嗨~大家好!我是 Johnny

## 前言
有感於 Web3 技術的蓬勃發展，最近在研究一些 Web3 Storage 的 Client API 後，決定動手練習實作一波，也順便練習使用 React v18(不過其實沒啥用到新 API XDD)

## 介紹
Web3 Storage 是一種分布式去中心化儲存的工具，底層實際整合了 `IPFS`, `FileCoin` 這兩個技術，但對於一般使用者而言，直接使用這兩個技術分常艱難，透過 Web3 Storage 的工具我們可以更方便的使用這兩個技術~

有關 `IPFS` 的介紹可以看這邊 - [IPFS](https://blockcast.it/2019/10/16/let-me-tell-you-what-is-ipfs/)

## 實作 Web3 Storage UI 過程
這次實作的結果在這-[React Web3 Storage UI](https://react-web3-storage.herokuapp.com/)，可以透過輸入在 `Web3.Storage` 官方登入後產生的 `API Token` 使用，或是直接點擊畫面右上的信箱登入，這個信箱登入的串接與官方使用的是同一個 Public Key，帳號本身是共用的~

實作過程因為實在牽涉太多[官方 API](https://web3.storage/docs/)操作，這邊僅簡單介紹最核心的 API 調用

### 首先要安裝官方 API
```bash
$ npm install web3.storage
```

### 產生 Client Instance
```js
import { Web3Storage } from 'web3.storage'

function getAccessToken () {
  return process.env.WEB3STORAGE_TOKEN
}

function makeStorageClient () {
  return new Web3Storage({ token: getAccessToken() })
}
```

### 儲存上傳檔案
透過 `put` 方法上傳檔案後，會獲得一個 cid，而該 cid 就是代表檔案的位置，可以透過這個格式組合出 http url 打開~ `https://dweb.link/ipfs/{cid}`

- [Options](https://web3.storage/docs/reference/js-client-library/#parameters)

```js
// files 可以是多個檔案，options 可以設定是否打包成一個資料夾
async function storeFiles (files) {
  const client = makeStorageClient()
  const cid = await client.put(files, options)
  console.log('stored files with cid:', cid)
  return cid
}
```

### 獲取指定 cid 內檔案
```js
const res = await client.get(rootCid); // Web3Response
const files = await res.files(); // Web3File[]
for (const file of files) {
  console.log(`${file.cid} ${file.name} ${file.size}`);
}
```

### 條列帳號下所有 cid 的清單
```js
// Return the names of 10 uploads
const uploadNames = [];
for await (const item of client.list({ maxResults: 10 })) {
  uploadNames.push(item.name);
}
```

### 刪除 cid 檔案
因為官方目前並未提供 API Token 能力進行檔案的刪除，經過研究後發現，官方的 Web UI 在呼叫 HTTP API 時必須帶著 `Authorization`，而該驗證 `idToken` 是由 `Magic Login` 工具提供，也就表示，如果要刪除檔案，我們必須登入後取得 `idToken` 才能進行操作，也許在未來官方會推出相關的 Delete method 也說不定~


有興趣的朋友們可以參觀[我的源碼](https://github.com/johnnywang1994/react-web3-storage.git)看看瞜~

今天的分享就到這邊，那我們下篇文章見拉~

<SocialBlock hashtags="react,javascript,web3,web3storage,antd" />

## 參考
- [Web3 Storage](https://web3.storage/)
- [Source Code](https://github.com/johnnywang1994/react-web3-storage.git)

