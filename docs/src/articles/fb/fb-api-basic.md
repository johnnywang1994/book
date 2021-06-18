# FB API 學習筆記

FB API 目前來到 v4.0，測試使用盡量推薦使用 https 環境練習，本人練習使用 webpack-dev-server

的 https 來進行測試。

FB API 是圍繞在他應用程式周邊的一些功能群，故在使用這些功能群之前，我們必須有以下幾個基本準備：

1. FB 帳號(申請成為開發者)
2. 註冊建立應用程式(取得appID)
3. 引用 FB SDK(才能調用)

這邊從第三點開始說明：



## 引用 FB SDK

首先在頁面輸入如下代碼：

```js
// 這段一定要有，初始化用
window.fbAsyncInit = function () {
  FB.init({
    appId: '你建立的應用程式編號',
    cookie: true,
    xfbml: true,
    version: 'v4.0'
  });
  FB.AppEvents.logPageView();
  // 後續調用 FB 功能必須用 FB 這個參數，必須在這裡面調用，否則會報錯
};

// FB CDN, 這段也可以用下面 html 的方式引用
(function(d, s, id){
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) {return;}
  js = d.createElement(s); js.id = id;
  js.src = "https://connect.facebook.net/zh_TW/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
```

或在 html 中引用 FB CDN

```html
<script async defer src="https://connect.facebook.net/zh_TW/sdk.js"></script>
```



## FB 登入與登出

**登入狀態檢查**

首先第一個最重要的就是登入，操作如下：

```js
window.fbAsyncInit = function () {
  // ...
  FB.getLoginStatus(function(res) {
    console.log(res);
    // 這邊可以做一些判斷登入的邏輯
  });
};
```

調用 api 檢查用戶登入狀態，詳細回傳資料請看官網說明。

https://developers.facebook.com/docs/facebook-login/web#loginbutton



**登入方法**

主要有兩種，一種使用 FB 提供的登入按鈕，請在這取得代碼

https://developers.facebook.com/docs/facebook-login/web/login-button

```html
<div class="fb-login-button" data-width="" data-size="small" data-button-type="continue_with" data-auto-logout-link="true" data-use-continue-as="true"></div>
```

第二種使用 FB SDK 指令 login 進行登入，如下範例

```js
FB.login(function(res){
  // handle the response 
});
```

如需要訪問權限，參考如下：

```js
FB.login(function(response) {
  // handle the response
}, {scope: 'public_profile,email'});
```

典型的訪問登入判斷如下：

```js
FB.login(function(response) {
  if (response.status === 'connected') {
    // 登入 FB 與您的網站
  } else {
    // 用戶可能未登入或無法辨認
  }
});
```


**登出方法**

```js
FB.logout(function(response) {
  // Person is now logged out
});
```



## FB 分享按鈕

跟登入一樣，分兩種，第一種是FB提供的分享按鈕，第二種是自定義分享事件使用。


**官網FB分享按鈕**

官網網址：https://developers.facebook.com/docs/plugins/share-button?locale=zh_TW

官網提供的分享按鈕，只需設定網址即可使用

範例：
```js
<div class="fb-share-button" data-href="https://example.com/" data-layout="button_count" data-size="small"><a target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fjohnnywang.tw%2F&amp;src=sdkpreparse" class="fb-xfbml-parse-ignore">分享</a></div>
```


**客制 FB 分享按鈕**

客制行為可以分為兩種，建議使用第一種官方 api 操作較有保障，但要記住，使用官方 api 都一定要記得引用 cdn 初始化才能使用。

1. 使用官方分享 api

官方說明：https://developers.facebook.com/docs/sharing/reference/share-dialog

範例：
```js
FB.ui({
  method: 'share',
  href: 'https://developers.facebook.com/docs/',
}, function(res){});
```

其中官方的範例有個特別好用的功能，分享後他會回傳一個 response，並可藉由該response判斷用戶是否有成功分享。

範例
```js
FB.ui({
  method: 'share',
  display: 'popup',
  href: 'https://developers.facebook.com/docs/'
}, function(response){
  if (response === void 0) {
    // share failed
  } else {
    // share success
  }
});
```


2. 偷吃步方法

使用官方提供的按鈕時，可以發現到該按鈕最後會有個 href 連結為 https://www.facebook.com/sharer/sharer.php，

其中後面帶入 ?u= 就可以接上分享的網址了，包裝後的事件如下：

```js
function fbShare(url) {
  var fb_share_url = encodeURIComponent(url);
  window.open('https://www.facebook.com/sharer/sharer.php?u=' + fb_share_url, '_blank', config='height=500,width=500,top=200,left=300');
  return false;
}
```

```html 
<div onclick="fbShare()"></div>
```

這個方法主要適用於短期使用，不需要引用 FB cdn 以及 appID 就可以使用，相當方便於隨時插入於網站中，

用戶處於未登入狀態的話，他也會自動請求用戶進行登入分享。



## FB 按讚功能

官方：https://developers.facebook.com/docs/plugins/like-button

可自訂是否需要同步開啟分享按鈕。(data-share="false" 就可以了)

```html
<div class="fb-like" data-href="https://developers.facebook.com/docs/plugins/" data-width="" data-layout="standard" data-action="like" data-size="small" data-show-faces="false" data-share="true"></div>
```



## FB 粉絲專頁功能

官方：https://developers.facebook.com/docs/plugins/page-plugin

```html
<div class="fb-page" data-href="https://www.facebook.com/facebook" data-tabs="timeline" data-width="" data-height="" data-small-header="true" data-adapt-container-width="true" data-hide-cover="false" data-show-facepile="true"><blockquote cite="https://www.facebook.com/facebook" class="fb-xfbml-parse-ignore"><a href="https://www.facebook.com/facebook">Facebook</a></blockquote></div>
```



## FB 留言板功能

官方：https://developers.facebook.com/docs/plugins/comments

```html
<div class="fb-comments" data-href="https://developers.facebook.com/docs/plugins/comments#configurator" data-width="" data-numposts="5"></div>
```



## 內嵌功能

FB 還提供貼文、影片、留言等的內嵌功能，供用戶將 FB 的相關內容插入網站之中。

相關文檔請參考：https://developers.facebook.com/docs/plugins
