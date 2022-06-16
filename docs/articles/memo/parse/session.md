# Parse Session Object 章節

- [Link](https://docs.parseplatform.org/js/guide/#sessions)

## Property
- sessionToken
- user
- expiresAt

## Invalid Session Token Error
推薦在 parse 中處理錯誤相關內容，方便閱讀、管理與整理
```js
function handleParseError(err) {
  switch (err.code) {
    case Parse.Error.INVALID_SESSION_TOKEN:
      Parse.User.logOut();
      ... // If web browser, render a log in screen
      ... // If Express.js, redirect the user to the log in route
      break;

    ... // Other Parse API errors that you want to explicitly handle
  }
}
```

## Security
所有 Session 物件只能由 user 本人接觸，並且都有`不可修改`的 ACL(read and write by that user only)，可透過 CLPs(Class Level Permissions) 調整 Session 物件的控制權限，詳情可[參考這邊](https://docs.parseplatform.org/js/guide/#session--security)
