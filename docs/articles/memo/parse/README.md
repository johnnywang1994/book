# Parse Javascript 文檔閱讀筆記

這是一系列閱讀 `Parse Javascript`, `Parse Cloud`, `Parse Server` 的一系列學習筆記，作為學習的紀錄與複習使用，也歡迎有興趣的朋友們看看摟，內容並不會包含所有文檔，主要都是我自己閱讀後認為最重要且必須的部分，剩下的文檔可以實際用到時再深入研究與探索

- [Parse Javascript Guide](https://docs.parseplatform.org/js/guide)



## Objects
- [Saving Object](https://docs.parseplatform.org/js/guide/#saving-objects)
- [Retrieving Object](https://docs.parseplatform.org/js/guide/#retrieving-objects)
- [Updaing Object](https://docs.parseplatform.org/js/guide/#updating-objects)
- [Destroying Object](https://docs.parseplatform.org/js/guide/#destroying-objects)
- [Relational Object](https://docs.parseplatform.org/js/guide/#one-to-one-and-one-to-many-relationships)
- [Data Types](https://docs.parseplatform.org/js/guide/#data-types)



## Querys
- [Basic](https://docs.parseplatform.org/js/guide/#basic-queries)
- [Constraints](https://docs.parseplatform.org/js/guide/#query-constraints)
- [Relational Queries](https://docs.parseplatform.org/js/guide/#relational-queries)
- [Compound Queries](https://docs.parseplatform.org/js/guide/#compound-queries)
- [Aggregate](https://docs.parseplatform.org/js/guide/#aggregate)

> 以下 `key` 表示 object field name
### Query methods(常用部分)
- get(objectId): Promise
- first(): Promise
- find(): Promise
- count(): Promise
- aggregate(pipeline): Promise
- distinct(key): Promise

### Constraints(常用部分)

#### compare 比較
- equalTo(key, value)
- notEqualTo(key, value)
- greaterThan(key, number)
- greaterThanOrEqualTo(key, number)
- lessThan(key, number)
- lessThanOrEqualTo(key, number)

#### count 數量
- limit(number)
- skip([number]): 常用來製作 pagination
- withCount(): query 物件時一併計算總數返回 `count`，較耗效能，不受 limit 數量限制，常用來製作 pagination，如不需返回物件內容僅需要取得數量，推薦使用 query count 方法

#### sort 排序
- ascending(key)
- descending(key)

#### list 清單
- containedIn(key, value[])
- notContainedIn(key, value[])

#### exist 存在值
- exists(key)
- doesNotExist(key)

#### 選取排除欄位
- select(key1, key2, ...keys[])
- exclude(key1, key2, ...keys[])
- include(key or [key1, key2])

#### 比對 query keys
- matchesKeyInQuery(): TODO
- doesNotMatchKeyInQuery()
- matchesQuery(key, keyQuery)
- doesNotMatchQuery(key, keyQuery)



## Relations
- [1 to many](https://docs.parseplatform.org/js/guide/#one-to-many)
- [many to many](https://docs.parseplatform.org/js/guide/#many-to-many)
- [1 to 1](https://docs.parseplatform.org/js/guide/#one-to-one)



## Error Handling
```js
const query = new Parse.Query(Note);
query.get("aBcDeFgH").then((results) => {
  // 這裡不會執行
  alert("Everything went fine!");
}, (error) => {
  // 這裡會執行
  // error 是一個帶著錯誤資訊的 Parse.Error 實例
  if (error.code === Parse.Error.OBJECT_NOT_FOUND) {
    alert("Uh oh, we couldn't find the object!");
  } else if (error.code === Parse.Error.CONNECTION_FAILED) {
    alert("Uh oh, we couldn't even connect to the Parse Cloud!");
  }
});

// or using catch
query.get("aBcDeFgH").then((results) => {
  // ...
}).catch((error) => {
  // ...
});
```

如果像是 `save`, `signUp` 這種針對特定 object 處理的方法，在 error 函數的第一個參數將會是 object，第二個才是 error object

詳細錯誤清單請在[Error Codes 這裡查詢](https://docs.parseplatform.org/js/guide/#error-codes)


## Security

### Parse options
- allowClientClassCreation: `false`
限制 client 端無法 create class，詳情可參考 [Parse Server Configuration](https://github.com/parse-community/parse-server#configuration)

### Class Level Permission
- [Link](https://docs.parseplatform.org/js/guide/#configuring-class-level-permissions)




## Memo

### Subclass
```js
const Monster = Parse.Object.extend("Monster", {
  // Instance methods
  hasSuperHumanStrength: function () {
    return this.get("strength") > 18;
  },
  // Instance properties go in an initialize method
  initialize: function (attrs, options) {
    this.sound = "Rawr"
  }
}, {
  // Class methods
  spawn: function(strength) {
    const monster = new Monster();
    monster.set("strength", strength);
    return monster;
  }
});
```
subclass create 出的 instance 使用 Query 搜尋 className 時並不會是 `SubClass`，Parse 預設還是用原本的 object 進行 query，若需要返回 subclass必須註冊進入 Parse 當中
```js
Parse.Object.registerSubclass('Monster', Monster);
```

### Query on Array
```js
query.equalTo("arrayKey", 2);
```

### Query on String
```js
query.startsWith("someKey", "match value");
query.fullText("someKey", "match fullText"); // case insensitive
```

### Relational Queries

- matchesQuery
取得所有含有 `image` 的 Post 物件中的 Comments
```js
const Post = Parse.Object.extend("Post");
const Comment = Parse.Object.extend("Comment");
const innerQuery = new Parse.Query(Post);
innerQuery.exists("image");
const query = new Parse.Query(Comment);
query.matchesQuery("post", innerQuery);
// comments now contains the comments for posts with images.
const comments = await query.find();
```

- objectId `equalTo` by relational query
```js
const post = new Post();
post.id = "1zEcyElZ80";
query.equalTo("post", post);
```

- `include` to join in other Object
```js
const query = new Parse.Query(Comment);

// Retrieve the most recent ones
query.descending("createdAt");

// Only retrieve the last ten
query.limit(10);

// Include the post data with each comment
query.include("post");
```

### Compound Query
- `or`
```js
const lotsOfWins = new Parse.Query("Player");
lotsOfWins.greaterThan("wins", 150);

const fewWins = new Parse.Query("Player");
fewWins.lessThan("wins", 5);

const mainQuery = Parse.Query.or(lotsOfWins, fewWins);
```
- complex `and`(query itself will act as basic and)
```js
const age16Query = new Parse.Query("User");
age16Query.equalTo("age", 16);

const age18Query = new Parse.Query("User");
age18Query.equalTo("age", 18);

const friends0Query = new Parse.Query("User");
friends0Query.equalTo("friends", 0);

const friends2Query = new Parse.Query("User");
friends2Query.greaterThan("friends", 2);

const mainQuery = Parse.Query.and(
  Parse.Query.or(age16Query, age18Query),
  Parse.Query.or(friends0Query, friends2Query)
);
```

### Aggregate
- group pipeline
Grouping by `name` field, `$` before field name will tell Parse Server its a field name
```js
const pipeline = [
  { group: { objectId: '$score' } }
];
const query = new Parse.Query("User");
const res = await query.aggregate(pipeline)
console.log(res)
```
- project pipeline(`keys`, `select`)
```js
const pipeline = [
  { project: { name: 1 } }
];
```
- match pipeline(`equalTo`)
```js
const pipeline = [
  { match: { name: 'BBQ' } }
];
```