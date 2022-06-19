# GraphQL 學習筆記 - 基礎篇

## 介紹
GraphQL 是一種為 API 設計的資料查詢(修改)的語言，使得 client 端可以使用更直覺且彈性的語法來取得或修改資料。
Facebook 為了因應跨裝置及開發 News Feed 功能而開發

### 輪廓
流程由上到下
- Schema: Server 端撰寫的一個規範
- Query: Client 端根據 Schema 規範撰寫的 query 請求
- Server Response: Server 根據 query 請求返回給 Client 端資料

#### Schema
```js
type Query {
  hello: String!
}
```

#### Query
```js
query {
  hello
}
```

#### Server Response
```json
{
  "data": {
    "hello": "world"
  }
}
```

### 優點
- 精準資料取得
- 程式即文檔
- 前端控制權提升
- 強型別

### 缺點
- 過於自由、規範少
- 學習成本
- Server Side Caching 實作複雜



## 生態圈
GraphQL 生態圈非常大，基本上你能想到的語言都支援，這邊主要以 `Javascript` 來說明，可以參考[官網 Javascript 清單](https://graphql.org/code/#javascript)，除了原生的以外，最著名的大概就是 `Apollo Server/Client`，主要是內部時做了很多知名 Nodejs Framework 的相容層，讓開發者能夠更快將 GraphQL 與原來熟悉的技術做結合使用
- [Apollo Server](https://www.apollographql.com/docs/apollo-server/)
- [Apollo Client](https://www.apollographql.com/docs/react/)
- [其他生態系統介紹](https://ithelp.ithome.com.tw/articles/10202144)


## 基礎 Query
![](https://i.imgur.com/jz0e8ea.png)

### Object vs Scalar
在使用 query 時需要注意，type 分為 `Object Type`, `Scalar Type`，前者在 query 取得時必須展開，後者則不需要，例如下面範例中 `User` 就是一個 `Object Type`，而 `String` 則是 `Scalar Type`

```js
type User {
  id: ID!
  name: String
}

"Query 是最上層的"
type Query {
  hello: String
  me: User
}
```

在進行 query 時，必須要把 `Object Type` 明確展開

```js
query {
  hello
  me {
    id
    name
  }
}
```

### 原理
query 進行時，實際上是使用 HTTP `Post` method 把 query 請求轉為 header 字串送到 Server，Server 收到後會解析成 `AST` 格式，並且驗證欄位，只有 `解析`, `驗證` 都通過後才會正式進行 `執行`


## Apollo Server 基礎
以下是 Apollo Server 最基本的建立方式，若想看看一個基礎 [GraphQL Blog 範例](https://github.com/jwlearn1994/graphql-blog-demo)，可以點連結參考看看

```js
const { ApolloServer, gql } = require('apollo-server');

// 1. GraphQL Schema 定義
const typeDefs = gql`
  type Query {
    "A simple type for getting started!"
    hello: String
  }
`;

// 2. Resolvers 是一個會對照 Schema 中 field 的 function map ，讓你可以計算並回傳資料給 GraphQL Server
const resolvers = {
  Query: {
    // 需注意名稱一定要對到 Schema 中 field 的名稱
    hello: () => 'world'
  }
};

// 3. 初始化 Web Server ，需傳入 typeDefs (Schema) 與 resolvers (Resolver)
const server = new ApolloServer({
  // Schema 部分
  typeDefs,
  // Resolver 部分
  resolvers
});

// 4. 啟動 Server
server.listen().then(({ url }) => {
  console.log(`? Server ready at ${url}`);
});
```


## Reference
- [2019 IT 邦幫忙 - Think in GraphQL](https://ithelp.ithome.com.tw/articles/10202596)