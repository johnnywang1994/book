# Parse Cloud Code 章節

- [Link](https://docs.parseplatform.org/cloudcode/guide/)

預設來說，Parse Cloud 環境入口為 `./cloud/main.js`，路徑可以透過 parse server options 設定

## Cloud Functions
- [Link](https://docs.parseplatform.org/cloudcode/guide/#cloud-functions)
Cloud Function 定義由 `Parse.Cloud.define` 處理，因為是在 Parse 環境下，所以可以直接調用 Parse 相關功能，比如下面範例
### 創建 Cloud Code Function
```js
Parse.Cloud.define('averageStars', async (request) => {
  const query = new Parse.Query('Review');
  query.equalTo('movie', request.params.movie);
  const results = await query.find();
  let sum = 0;
  for (let i = 0; i < results.length; ++i) {
    sum += results[i].get("stars");
  }
  return sum / results.length;
});
```
### 執行 Cloud Code Function
```js
const params =  { movie: "The Matrix" };
const ratings = await Parse.Cloud.run("averageStars", params);
```

### Request 物件
- params: 傳進 function 的參數
- user: 當前調用的 User
- master: 是否透過 `masterKey` 調用

### 限制條件
限制傳入參數必須有 movie，並且只有登入用戶能調用此 function
```js
Parse.Cloud.define("averageStars", async (request) => {
  // ...same above
},{
  fields : ['movie'],
  requireUser: true
});
```
#### 常見 options
- requireMaster
- requireUser
- validateMasterKey
- fields
- requireAnyUserRoles
- requireAllUserRoles
- requireUserKeys

更多限制方式可[參考這邊](https://docs.parseplatform.org/cloudcode/guide/#more-advanced-validation)

#### Validation 函數檢驗
當一般 options 無法滿足你的檢驗需求時，你可以傳入一個 function 對其進行更詳細的檢驗，也提升檢驗邏輯的複用能力
```js
const validationRules = request => {
  if (request.master) {
    return;
  }
  if (!request.user || request.user.id !== 'masterUser') {
    throw 'Unauthorized';
  }
}

Parse.Cloud.define('adminFunction', request => {
  // do admin code here, confident that request.user.id is masterUser, or masterKey is provided
}, validationRules)

Parse.Cloud.define('adminFunctionTwo', request => {
  // do admin code here, confident that request.user.id is masterUser, or masterKey is provided
}, validationRules)
```
- validation 函數會在 Cloud Code Function 前執行，可以使用 async 或 promise 型態的檢驗函數，但盡量確保檢驗過程的簡短，讓 Cloud Code Function 能更快被執行



## Cloud Jobs
- [Link](https://docs.parseplatform.org/cloudcode/guide/#cloud-jobs)

有時您想執行長時間運行的函數，並且不想等待回應。Cloud Jobs 就是為此而生的。

### 創建 Job
```js
Parse.Cloud.job("myJob", (request) =>  {
  // params: 傳入參數
  // headers: 觸發 job 的請求 headers
  // log: 傳入 request 的 logger
  // message: 更新 job 狀態的函數
  const { params, headers, log, message } = request;
  message("I just started");
  return doSomethingVeryLong(request);
});
```

### 執行 Job
執行 Job 必須以 `master` 權限進行，注意 url 結構是以綁定的 parse server 位置中的
  - `/[parse-mount-path]/jobs/[job-name]`
```bash
curl -X POST -H 'X-Parse-Application-Id: appId' -H 'X-Parse-Master-Key: masterKey' https://my-parse-server.com/parse/jobs/myJob
```

### 查看 Job
在 Parse Dashboard 中能夠查看，或是使用 `masterKey` 對 `_JobStatus` class 進行 query



## Save Triggers
- [Link](https://docs.parseplatform.org/cloudcode/guide/#save-triggers)
當我們想對資料格式做些特殊處理時，如果每一次都要單獨寫一遍非常無意義，此時可以使用 `save triggers` 對資料的寫入前、寫入後做特定的處理

### validation
以下範例在寫入評價前檢查 `stars` 數量是否 valid
```js
Parse.Cloud.beforeSave('Review', (request) => {
  // ...
}, {
  fields: {
    stars : {
      required:true,
      options: stars => {
        return stars >= 1 && stars =< 5;
      },
      error: 'Your review must be between one and five stars'
    }
  }
})
```
如果函數拋出異常，Review 對象將不會被保存，客戶端會報錯。如果沒有拋出任何東西，對象將被正常保存。

### modifying
或是在資料儲存寫入前進行修改，以下範例確保存入的 `comment` 欄位長度在 140 字元內
```js
Parse.Cloud.beforeSave("Review", (request) => {
  // original: 保存物件原本的值，若為新物件則為不存在
  // object: 即將保存的物件
  const { object, original } = request
  const comment = object.get("comment");
  if (comment.length > 140) {
    // Truncate and add a ...
    object.set("comment", comment.substring(0, 137) + "...");
  }
});
```

### predefined class
對於 Parse 預定義的內建 class，請直接傳入 `Parse.User` 這種方式，而不是字串
```js
Parse.Cloud.beforeSave(Parse.User, async (request) => {
  // code here
},
  // Validation Object or Validation Function
)
```

### afterSave
前面都是在儲存前做事情，我們也可以使用 `afterSave` 在物件存入後進行操作，通常用於較為`冗長的操作`，不希望此操作影響到物件儲存的情況下可以考慮使用，例如下面範例在 `Comment` 物件存入後，對所屬的 `Post` 物件 comment 欄位加值
```js
Parse.Cloud.afterSave("Comment", (request) => {
  const query = new Parse.Query("Post");
  query.get(request.object.get("post").id)
    .then(function(post) {
      post.increment("comments");
      return post.save();
    })
    .catch(function(error) {
      console.error("Got an error " + error.code + " : " + error.message);
    });
});
```
> 上面的動作實際上在完成前就會先返回使用者，即使在 `post.save()` 時發生錯誤，用戶也不會被通知，錯誤可以在 Cloud Code Log 中看到，為了在 afterSave 處理程序完成之前回應客戶端，您的處理程序可能不可返回 promise，並且不要使用 async/await。

### Context
context 是一個讓開發者能在不同時機使用的物件空間，context 會從 `beforeSave` 處理程序傳遞到 `afterSave` 處理程序。



## Delete Triggers
- [Link](https://docs.parseplatform.org/cloudcode/guide/#delete-triggers)
在刪除物件之前運行自定義 Cloud Code。您可以使用 `beforeDelete` 方法執行此操作。

### beforeDelete
以下範例在刪除 `Album` 物件之前，檢查其中是否還有 photos 存在，當錯誤拋出時，album 將不會被誤刪除
```js
Parse.Cloud.beforeDelete("Album", async ({ object }) => {
  const query = new Parse.Query("Photo");
  query.equalTo("album", object);
  const count = await query.count({useMasterKey:true})
  if (count > 0) {
    throw "Can't delete album if it still has photos.";
  }
});
```

### afterDelete
以下範例在刪除 `Post` 後，需要一次將 post 的 `Comment` 全部刪除
```js
Parse.Cloud.afterDelete("Post", ({ object }) => {
  const query = new Parse.Query("Comment");
  query.equalTo("post", object);
  // 這邊不使用 async/await 可以加快回應使用者的時間，此操作不影響使用者後續動作
  query.find()
    .then(Parse.Object.destroyAll)
    .catch((error) => {
      console.error("Error finding related comments " + error.code + ": " + error.message);
    });
});
```



## Find Triggers
- [Link](https://docs.parseplatform.org/cloudcode/guide/#find-triggers)
在某些情況下，可能希望轉換傳入查詢、添加額外或增加默認限制

### beforeFind or afterFind
```js
// Properties available
Parse.Cloud.beforeFind('MyObject', (req) => {
  let query = req.query; // the Parse.Query
  let user = req.user; // the user
  let triggerName = req.triggerName; // beforeFind
  let isMaster = req.master; // if the query is run with masterKey
  let isCount = req.count; // if the query is a count operation
  let logger = req.log; // the logger
  let installationId = req.installationId; // The installationId
});
```

```js
// Returning a different query
Parse.Cloud.beforeFind('MyObject', (req) => {
  let query = req.query;
  let otherQuery = new Parse.Query('MyObject');
  otherQuery.equalTo('key', 'value');
  return Parse.Query.or(query, otherQuery);
});
```


## Security
要覆蓋對象和類訪問權限，您可以設置 `useMasterKey: true` 如果請求接受主密鑰選項，但需要注意，使用 master 權限卉返回物件所有資源，在將其發送到客戶端之前，您可能希望刪除客戶端不應訪問的物件屬性。

```js
query.find({ useMasterKey: true });
```

## Config
默認情況下，Parse Config 參數可以公開讀取，如果參數包含不應向客戶端公開的敏感信息，則可能不希望這樣做

```js
// 藉由添加 requireMasterKey 在 Config 欄位，可以添加 master 權限的 config 設定
const config = await Parse.Config.get({useMasterKey: true});
const privateParam = config.get("privateParam");
```