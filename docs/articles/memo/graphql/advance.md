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

## Reference
- [2019 IT 邦幫忙 - Think in GraphQL](https://ithelp.ithome.com.tw/articles/10202596)
