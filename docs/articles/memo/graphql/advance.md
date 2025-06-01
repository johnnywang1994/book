# GraphQL 學習筆記 - 進階篇

## Custom Scalar
當應用程式越來越複雜後，預設 GraphQL 提供的 Scalar Type `Int`, `Float`, `String`, `Boolean`, `ID` 會漸漸無法真實檢驗資料類型，有跟沒有一樣，此時可以透過客製化 GraphQL 的 scalar 來增強這功能，當然也能安裝其他工具套件幫忙喔～

### Date 實作範例
- `name` (Required) Scalar Type 名稱 (需對上 schema 定義時的名稱)
- `description` (Optional) Scalar Type 介紹
- `serialize(value)` (Required) Server 回覆給 Client 的值。
  > 當 Server 在 Resolver 處理完資料輸出時，會將結果以 `value` 傳進來，而 serialize 決定最後輸出的值。需注意！這邊輸出的值的型別只要是 JSON 格式允許的值都行，如 Int, String, Object, Array 等等。
- `parseValue(value)` (Required) Client 傳給 Server 的值， `value` 會從 variables 中獲得。
- `parseLiteral(ast)` (Required) Client 傳給 Server 的值， ast 會從 query 字串中解析出來，而 ast 的值是一個 AST 格式的 Object，舉個例子如下

```js
import { gql } from 'apollo-server'

const schema = gql(`
  scalar Date
`)
```

```js
import { GraphQLScalarType } from 'graphql'
import { Kind } from 'graphql/language'

const resolvers = {
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    serialize(value) {
      return value.getTime(); // value sent to the client
    },
    parseValue(value) {
      return new Date(value); // value from the client
    },
    parseLiteral(ast) {
      // 從前端 query 字串進來的 input
      // 這邊僅接受輸入進來的是 Int 值
      if (ast.kind === Kind.INT) {
        return new Date(parseInt(ast.value, 10)); // ast value is always in string format
      }
      return null;
    },
  })
}
```

### 外部套件 @okgrow/graphql-scalars
schema 部分一樣需要自行定義，resolver 直接引入就完成了！
```js
import { DateTime } from '@okgrow/graphql-scalars';

const resolvers = {
  DateTime,
}
```


## Interface
- [Link](https://ithelp.ithome.com.tw/articles/10207038)

### 範例
今天有個貼文功能如下
```js
type Post {
  id: ID!
  author: User!
  title: String
  body: String
}

type User {
  id: ID!
  name: String
  avatarUrl: String
  friends: [User]
}

type Query {
  post(id: ID!): Post
}
```
查詢 post 的作者 query 請求如下
```js
query {
  post(id: 1) {
    author {
      name
    }
  }
}
```

但如果今天要加入一個 `粉絲專頁` 功能，而粉絲專頁也可以新增貼文，schema 如下，原本的 `Post.author` 顯然無法同時滿足這兩個 type，此時就可以利用 `interface` 的多型處理

```js
type FanPage {
  id: ID!
  name: String
  avatarUrl: String
  likeGivers: [User]
}
```
定義共同的部分進行多型的 `implements`，並將 `Post.author` 給予該 `interface`
```js
type Post {
  id: ID!
  author: Charater!
  title: String
  body: String
}

interface Character {
  id: ID!
  name: String
  avatarUrl: String
}

type User implements Character{
  id: ID!
  name: String
  avatarUrl: String
  friends: [User]
}

type FanPage implements Character {
  id: ID!
  name: String
  avatarUrl: String
  likeGivers: [User]
}
```
套用了 interface 的 `author` field 就可以根據情況取得不同的 type 進行展開
```js
query {
  post(id: 1) {
    author {
      name
      ...on User {
        friends {
          name
        }
      }
      ...on FanPage {
        likeGivers {
          name
        }
      }
    }
  }
}
```
這樣 GraphQL 就會判斷，如果作者是 `User Type` 那就會進入 ...on User 並回傳其中的 fields ，如果是 FanPage Type 那就會進入 ...on FanPage 並回傳其中的 fields 。

> `...on SpcificType { ... }` 叫做 `inline fragment`

### 實作 interface
若今天我們需要直接在 query 中返回 interface， 必需明確指定 `Object Type` 的名稱，如下面範例我們在 Query 中的 animal field 返回了 interface

```js
interface Animal {
  name: String
}

type Bird implements Animal {
  name: String
  wingSpanLength: Int
}

type Monkey implements Animal {
  name: String
  armSpanLength: Int
}

type Query {
  animal(name: String): Animal
  animals: [Animal]
}
```
我們需要在 `resolver` 中定義
```js
const animals = [
  { name: 'Chiken Litte', wingSpanLength: 10 },
  { name: 'Goku', armSpanLength: 20 },
  { name: 'King Kong', armSpanLength: 200 }
];

const resolvers = {
  Animal: {
    // 一定要實作這一個特殊 field
    __resolveType(obj, context, info) {
      // obj 為該 field 得到的資料
      if (obj.wingSpanLength) {
        // 回傳相對應得 Object type 名稱
        return 'Bird';
      }

      if (obj.armSpanLength) {
        return 'Monkey';
      }

      return null;
    }
  },
  Query: {
    animal: (root, { name }) => animals.find(animal => animal.name === name),
    animals: () => animals
  }
};
```


## Node Interface Pattern
實作起來很簡單，但概念卻很重要，在大型的 `GraphQL Schema` 中，一般會推薦所有主要商業邏輯物件都要實作 `Node interface type`，因為通常這些物件在 `database` 中都有 `id` ，實作 `Node interface type` 可以明確告訴 Client 這是一個重要概念的物件，並且可透過 id 的操作來做 caching 及 batching。
```js
interface Node {
  "ID of the object"
  id: ID!
}

type User implements Node {
  id: ID!
  ...
}

type Post implements Node {
  id: ID!
  ...
}
```
甚至能當成強大的 id 搜尋功能，可以根據需要進行 `inline fragment` 查找各種 type 的物件目標
```js
type Query {
  node(id: ID!): Node
  nodes(ids: [ID!]): [Node]!
}
```

## Union
Interface type 與 Union type 很常搞混，以下是 Union type 的範例
```js
union Result = Book | Author

type Book {
  title: String
}

type Author {
  name: String
}

type Query {
  search(contains: String!): [Result]
}
```
> 實作 Interface type 的 type 都有一些共通 fields (強制要定義)，而在 Union type 範疇裡的 type 則不必有共通 fields

兩者的相似之處在於最終回傳時一定要是一個實際的 type ，不能傳回 interface 或 union type 的資料。

接著看看 resolver 的部分

```js
const authors = [{ name: 'John' }, { name: 'Mary' }];
const books = [{ title: 'Journey to the West' }, { title: 'Mary Loves Me' }]
const resolvers = {
  Result: {
    // 一定要實作這一個特殊 field
    __resolveType(obj, context, info){
      // obj 為該 field 得到的資料
      if(obj.name){
        // 回傳相對應得 Object type 名稱
        return 'Author';
      }

      if(obj.title){
        return 'Book';
      }

      return null;
    },
  },
  Query: {
    search: (root, { body }) =>
      [
        ...authors.filter(author => author.name.includes(body)),
        ...books.filter(book => book.title.includes(body))
      ]
  },
};
```
### Inline fragment with Union type
```js
query {
  search(contains: "Mary") {
    ... on Author {
      name
    }
    ... on Book {
      title
    }
  }
}
```

## Interface & Union 的使用
大多數情況下比較少用到，除非真的有必要時才會使用，除了增加開發者的心智負擔外，也會導致後端整個複雜度的指數提升，通常還是先以 type 及 enum 嘗試實作，真的有必要時才使用 interface, union

可以參考 [Github GraphQL API Explorer](https://docs.github.com/en/graphql/overview/explorer) 實際看看使用的場境學習～

## Reference
- [2019 IT 邦幫忙 - Think in GraphQL](https://ithelp.ithome.com.tw/articles/10202596)
