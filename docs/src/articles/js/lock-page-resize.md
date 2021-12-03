# 用 JavaScript 鎖定用戶調整畫面比例

<SocialBlock hashtags="javascript,layout" />

##### updated at: 2021-04-20
###### tag `js`, `lock resize`, `event`

相信各位客官一定都遇過各種 PC 用戶亂調畫面比例導致網頁跑版的問題，或是根本不知道自己畫面有調整過比例的問題...，最近收到了需求就是希望能鎖定瀏覽器中的這個`調整畫面比例`功能。

以下是我自己想出來的解法，如有不週還請見諒～


## 前言
要完成這個需求前，我們要先確認有哪些動作可以調整瀏覽器畫面，再針對各種動作進行阻擋。

主要分為兩種方式滾動:
1. `Ctrl + "+" or "-"`, `Command + "+" or "-"`
2. `Ctrl + "滑鼠滾動"`


## 實作

### 阻擋 Ctrl + "+" or "-"

```js
(function(w, d, c) {
  // 確認 ctrl, command, plus, minus 等的 keycode
  const ctrlKeycode = 17;
  const plusKeycode = 187;
  const minusKeycode = 189;
  const macCommendKeycode = 91;
  let isToolPressed = false;

  // 添加 keydown 事件
  w.addEventListener('keydown', function(e) {
    const { keyCode } = e;
    // 按下 ctrl or command 開啟判斷
    if ([ctrlKeycode, macCommendKeycode].indexOf(keyCode) > -1) {
      isToolPressed = true;
    }
    // 開關開啟，且按下 +, -
    else if (isToolPressed && [macPlusKeycode, macMinusKeycode].indexOf(keyCode) > -1) {
      preventResize(e, c);
      return false;
    }
  })

  // 添加 keyup 事件
  w.addEventListener('keyup', function(e) {
    // 若放開 ctrl or command 關閉判斷
    if ([ctrlKeycode, macCommendKeycode].indexOf(e.keyCode) > -1) {
      isToolPressed = false;
    }
  })

  // 阻擋預設 event action
  function preventResize(e, callback) {
    e.preventDefault();
    isToolPressed = false;
    callback(e);
  }

})(window, document, () => alert('警告你別調整畫面比例！'));
```

### 阻擋 Ctrl + 滑鼠滾輪滾動

這裡一開始我使用 scroll 來阻擋，經測試後確認 scroll 只會在頁面發生滾動後才觸發，但按住 Ctrl 時，滾動不會發生，這裡必須使用一個叫 `mousewheel` 的事件進行處理，這個事件會在任何鼠標滾輪滾動時觸發。

我們修改一下上面

```js
(function(w, d, c) {
  // ...前略
  // 添加 mousewheel 事件
  w.addEventListener('mousewheel', function(e) {
    if (isToolPressed) {
      preventResize(e, c);
      return false;
    }
  })

  function preventResize(e, callback) {
    // ...
  }

})(window, document, () => alert('警告你別調整畫面比例！'));
```

到這邊會發現，為何在 windows 系統上似乎不起作用，經過嘗試確認後，似乎對 window, html, body 等外層不起作用，必須對內部元素監聽才行，利用事件冒泡的原理由下阻擋事件傳遞出去，假設你東西都包在一個叫 `#root` 的元素內。

```js
(function(w, d, c) {
  // ...前略
  // 添加 mousewheel 事件掛在內部元素上
  d.getElementById('#root').addEventListener('mousewheel', function(e) {
    if (isToolPressed) {
      preventResize(e, c);
      return false;
    }
  })

  function preventResize(e, callback) {
    // ...
  }

})(window, document, () => alert('警告你別調整畫面比例！'));
```

以上就完成最基本的 PC 縮放鎖定拉～～


## 結論
雖然阻止用戶調整畫面比例不是一個推薦的作法，最好的方法還是將 rwd 做到極致，而不是添加一些強制措施，另外這種做法也只能阻止用戶在你的網頁調整，他還是可以在其他頁面裡調整完再去你的頁面啊ＸＤＤ～～

好拉，主要是介紹一些實作功能的小技巧跟知識，實用度不是很高ＸＤ，我們下次見拉～

<SocialBlock hashtags="javascript,layout" />