# GraphQL Memo

這邊會記錄一些我在學習 GraphQL 時的一些個人心得跟想法～

## 幫助記憶

### field 與 type 到底差別在哪裡
field 是組成 Object Type 的欄位， type 為 field 展現的資料格式

### Schema 欄位不是直接跟 DB Table 欄位對應，可以根據需要調整
聽起來像廢話，但一開始學習時有可能搞不太懂而以為 Schema 必須照著 DB Table 設計走，`query` 像是 rest api 裡的 `get` 方法，我們可以根據需求決定具體給出什麼欄位讓使用者能夠獲得資料，比如常見的 `User` 雖然 DB 裡會存有 `password` 欄位，但我們不會希望 Client 端能夠 query 得到它，此時就不必在 `User` 的 Schema

```js
type User {
  id: ID!
  name: String!
  email: String!
}
```

### Authentication vs Authorizaion 差別
Authentication 處理的是登入問題，如果登入失敗那就是 Authentication 「認證」的問題 ; Authoriaction 處理的是權限問題，如果登入者或 guest 要進行一項不屬於他權限允許的操作，那就會引發 Authorizaion 「授權」問題。

