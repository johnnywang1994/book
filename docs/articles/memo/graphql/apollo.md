# Apollo Client

本篇是學習基礎 Apollo Client 時的部分筆記，同樣僅記錄特定我覺得很重要的部分，會根據我實際使用狀況持續增補內容，不會把所有基礎內容都紀錄在這

- [Apollo Client](https://www.apollographql.com/docs/react/)



## Fetch Policy
- [Supported fetch policies](https://www.apollographql.com/docs/react/data/queries/#supported-fetch-policies)
預設 Query 使用的 cache 政策是 `cache-first`，當請求時會先檢查本地 cache，如果存在則直接返回，而不進行 network request，也可以使用 `nextFetchPolicy` 設定第二次後請求的 cache 政策，如下範例總是在第一次時實際進行 network request，並在之後以 cache 返回為主

```js
const { loading, error, data } = useQuery(GET_DOGS, {
  fetchPolicy: 'network-only', // Used for first execution
  nextFetchPolicy: 'cache-first', // Used for subsequent executions
});
```

詳細使用可參考[nextFetchPolicy](https://www.apollographql.com/docs/react/data/queries#nextfetchpolicy)



## Update Local Data
- [Link](https://www.apollographql.com/docs/react/data/mutations#updating-local-data)

### refetching query
```js
// Refetches two queries after mutation completes
const [addTodo, { data, loading, error }] = useMutation(ADD_TODO, {
  refetchQueries: [
    {query: GET_POST}, // DocumentNode object parsed with gql
    'GetComments' // Query name
  ],
});
```

### updating cache directly
include the result from mutation response, `cache` object includes `readQuery/writeQuery`, `readFragment/writeFragment`, `modify`, and `evict` method

```js
const [addTodo] = useMutation(ADD_TODO, {
  update(cache, { data: { addTodo } }) {
    cache.modify({
      fields: {
        todos(existingTodos = []) {
          const newTodoRef = cache.writeFragment({
            data: addTodo,
            fragment: gql`
              fragment NewTodo on Todo {
                id
                type
              }
            `
          });
          return [...existingTodos, newTodoRef];
        }
      }
    });
  }
});
```


## Fragments
```js
fragment NameParts on Person {
  title
  firstName
  middleName
  lastName
}
```
### inline fragments with Unions Interfaces
相關筆記已記錄在 `graphql/advance` 內
```js
query AllCharacters {
  all_characters {

    ... on Character {
      name
    }

    ... on Jedi {
      side
    }

    ... on Droid {
      model
    }
  }
}
```
### possibleTypes
- [Link](https://www.apollographql.com/docs/react/data/fragments#defining-possibletypes-manually)

- 手動定義
```js
const cache = new InMemoryCache({
  possibleTypes: {
    Character: ["Jedi", "Droid"],
    Test: ["PassingTest", "FailingTest", "SkippedTest"],
    Snake: ["Viper", "Python"],
  },
});
```

- [自動產生](https://www.apollographql.com/docs/react/data/fragments#generating-possibletypes-automatically)



## GraphQL query best practices
- [Link](https://www.apollographql.com/docs/react/data/operation-best-practices)

- Name all operations: 命名所有 query, mutation 操作
- Provide variable as arguments: 提供變數作為參數，推薦使用 `$input` 包裹所有參數
- Get data only when/where you need: 只拿你需要用到的資料，發揮 GraphQL 優勢-[declarative data fetching](https://www.apollographql.com/docs/intro/benefits/#graphql-provides-declarative-efficient-data-fetching)
- Use fragments: 使用 fragments 封裝相似欄位字段，但避免過度濫用
- Query separately: 分開 query 全域資料及 user 相關資料，讓 GraphQL 能有效進行獨立 cache 作業，提升效能（千萬別在同一個 query 裡拿一堆不同 type 的東西）
- Add `name`, `version` in client: 在 ApolloClient 初始化時提供 name, version 提升偵錯的效率
```js
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
  name: 'MarketingSite',
  version: '1.2'
});
```



## Cache
- [Link](https://www.apollographql.com/docs/react/caching/overview)

### typePolicies
- [Custom Cache id](https://www.apollographql.com/docs/react/caching/cache-configuration#customizing-cache-ids)

```js
import { makeVar } from '@apollo/client';

export const doneVar = makeVar<string[]>([]);

const cache = new InMemoryCache({
  typePolicies: {
    Product: {
      // In an inventory management system, products might be identified
      // by their UPC.
      keyFields: ["upc"]
    },
    Todo: {
      // custom behavior by field name
      // eg. 可以用客製化的 cache 機制製作 client only 的欄位，並在 query 時標註獲取
      fields: {
        isDone: {
          read(_, { readField }) {
            const objectId = readField('objectId') as string;
            const doneList = doneVar();

            return doneList.includes(objectId);
          },
        }
      }
    }
  }
}
```
- query 獲取 client only 欄位，詳情可參考 [Local Only Field](https://www.apollographql.com/docs/react/local-state/managing-state-with-field-policies/)
```js
const todoItem = gql`
  fragment TodoItem on Todo {
    objectId
    title
    content
    isDone @client
  }
`;
```

### Read/Write Interaction
- [Link](https://www.apollographql.com/docs/react/caching/cache-interaction)

#### Read/Write Query Cache
```js
// Fetch the cached to-do item with ID 5
const { todo } = client.readQuery({
  query: gql`
    query ReadTodo($id: ID!) {
      todo(id: $id) {
        id
        text
        completed
      }
    }
  `,
  variables: { // Provide any required variables here.  Variables of mismatched types will return `null`.
    id: 5,
  },
});

client.writeQuery({
  query: gql`
    query WriteTodo($id: Int!) {
      todo(id: $id) {
        id
        text
        completed
      }
    }`
  ,
  variables: {
    id: 5
  }
  data: { // Contains the data to write
    todo: {
      __typename: 'Todo',
      id: 5,
      text: 'Buy grapes 🍇',
      completed: false
    },
  },
});
```

> Apollo Client 會自動 queries 每個物件的 __typename, 即使你沒有提供在 query 請求中，切記 `不要直接修改返回的對象`，如果有需要更新 cache，請參考[Combining reads and writes](https://www.apollographql.com/docs/react/caching/cache-interaction#combining-reads-and-writes)

當使用 `writeQuery` 時，注意以下提示：
- 任何使用 `writeQuery` 對 cache 資料的改動不會同步到 GraphQL server，重新整理後就會消失
- query 的 shape 不需要跟 GraphQL server 的 schema 相同，可以包含不在 schema 中的欄位

#### Read/Write Fragments
- id: `<__typename>:<id>`
```js
const todo = client.readFragment({
  id: 'Todo:5', // The value of the to-do item's cache ID
  fragment: gql`
    fragment MyTodo on Todo {
      id
      text
      completed
    }
  `,
});

client.writeFragment({
  id: 'Todo:5',
  fragment: gql`
    fragment MyTodo on Todo {
      completed
    }
  `,
  data: {
    completed: true,
  },
});
```

#### Update Query Cache
- [Link](https://www.apollographql.com/docs/react/caching/cache-interaction#using-updatequery-and-updatefragment)
use `updateQuery`, `updateFragment` to combine usage with `read/write`
```js
const query = gql`
  query MyTodoAppQuery {
    todos {
      id
      text
      completed
    }
  }
`;

// Set all todos in the cache as completed
cache.updateQuery({ query }, (data) => ({
  todos: data.todos.map((todo) => ({ ...todo, completed: true }))
}));
```