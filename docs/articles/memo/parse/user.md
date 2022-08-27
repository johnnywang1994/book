# Parse User Object 章節

- [Link](https://docs.parseplatform.org/js/guide/#users)

## Property
- username(required).
- password(required on signup).
- email(optional).

## Sign up
```js
const user = new Parse.User();
user.set("username", "my name");
user.set("password", "my pass");
user.set("email", "email@example.com");

// other fields can be set just like with Parse.Object
user.set("phone", "415-392-0202");
await user.signUp();
```

## Login
```js
const user = await Parse.User.logIn("myname", "mypass", {
  usePost: true
});
// Do stuff after successful login.
```

### Current User
- [Link](https://docs.parseplatform.org/js/guide/#current-user)
```js
const currentUser = Parse.User.current();
if (currentUser) {
  // do stuff with the user
} else {
  // show the signup or login page
}
```

### Set Current User
```js
Parse.User.become("session-token-here").then(function (user) {
  // The current user is now set to user.
});
```

### Logout
```js
Parse.User.logOut().then(() => {
  const currentUser = Parse.User.current();  // this will now be null
});
```

### Security For Other Objects
對物件添加安全性檢視條件，下面範例對新的 note 添加新創建限制為 current user 的 ACL
- `Parse.ACL`: access control list
- setReadAccess(targetObject, boolean)
- setWriteAccess(targetObject, boolean)
- setPublicReadAccess(boolean)
- setPublicWriteAccess(boolean)
#### 範例
- 直接套用
```js
const Note = Parse.Object.extend("Note");
const privateNote = new Note();
privateNote.set("content", "This note is private!");
privateNote.setACL(new Parse.ACL(Parse.User.current()));
privateNote.save();
```
- 細部添加對象物件
```js
const groupMessage = new Message();
const groupACL = new Parse.ACL();

// userList is an array with the users we are sending this message to.
for (let i = 0; i < userList.length; i++) {
  groupACL.setReadAccess(userList[i], true);
  groupACL.setWriteAccess(userList[i], true);
}
groupMessage.setACL(groupACL);
groupMessage.save();
```
- 複雜場景(新增 post，限制權限在當前用戶，並開放 read 權限公開)
```js
const publicPost = new Post();
const postACL = new Parse.ACL(Parse.User.current());
postACL.setPublicReadAccess(true);
publicPost.setACL(postACL);
publicPost.save();
```

### Linking User
Parse 可使用第三方驗證進行註冊用戶或登入，使用 `linkWith` 方法進行綁定、登入（若第一次呼叫會自動 create user，並返回 userInfo）

- [Link](https://docs.parseplatform.org/js/guide/#signing-up-and-logging-in)

```js
const myAuthData = {
  id: '12345678'  // Required field. Used to uniquely identify the linked account.
};
const user = new Parse.User();
await user.linkWith('providerName', { authData: myAuthData });
```

或是可以在 Parse Server 的 options 提供客製化的 user login module，詳情請[參考這邊](https://docs.parseplatform.org/js/guide/#custom-authentication-module)

```js
const CustomAuth = require('./CustomAuth');

const api = new ParseServer({
  auth: {
    myAuth: {
      module: CustomAuth,
      option1: 'hello',
      option2: 'world',
    }
  }
});

app.use('/parse', api);
```

#### query 進行 select authData 的問題
另外需注意，如果要使用 `select` 取得 `authData` 的話，不能直接 `query.select('authData')`，因為 DB 裡不是存這個欄位名稱，需使用[這裡描述](https://github.com/parse-community/parse-server/pull/2081/files)的 `_auth_data_xxxx`才能拿到，比如 `_auth_data_facebook`