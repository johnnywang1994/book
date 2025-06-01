# Promise 相關知識

<SocialBlock hashtags="javascript,promise" />

紀錄 Promise 相關學習基礎與進階應用注意事項。

Promise 是一個異步(非同步)的原生 WEB API，提供開發者控制非同步操作的需求，基礎概念很簡單，但實際用的時候，卻會常常遇到許多問題，本篇紀錄一些底層理解跟常見問題。



## 知識概念

Promise 是一個原生物件，使用時會先進行實例化，並同時傳入一個 function 在實例化的同時執行，該 function 提供兩個回調使用，分別是 resolve, reject，依照開發者的調用將當前 promise 實例狀態由 pending 轉為 fullfilled 或 rejected 狀態。

```js
var promise = new Promise(function(resolve, reject) {
  if (2 > 1) {
    resolve();
  } else {
    reject();
  }
});
```

在調用 resolve 或 reject 後，promise 會分別接著執行後續的 then 或 catch 中的動作，這兩個都是 promise 的方法，提供開發者進行串接。

1. **then**

  - 當 promise 實例中沒有調用 resolve 回調時，即不會執行該 promise 後續的任何 then 動作。
  - 當 then 接收的東西不是 function 時，會建立一個新的 promise，並接收前一個 promise 的狀態獨立執行，該獨立的 promise 中 resolve 回傳的東西，不會影響原本最初的 promise resolve回傳。
  - 當 then 接收 function，但沒有 return 時，則內部執行的結果，即無法傳遞到下一個 then 中。

2. **catch**

  - 當 catch 被調用後，promise 內部錯誤即被攔截，其後任何 then 或 catch 將不會收到任何內容。



## 常見使用問題

1. 穿透問題

當 then 中直接放入一個 promise 時，會被建立為新的 promise 獨立執行，即不會影響原本 promise 的內部值傳遞。
故這邊最後還是會得到最開始的回傳值。

```js
var p1 = () => new Promise((resolve) => {
  console.log('p1');
  resolve('A');
});

var p2 = () => new Promise((resolve) => {
  console.log('p2');
  resolve('B');
});

var p3 = () => new Promise((resolve) => {
  console.log('p3');
  resolve('C');
});

p1().then(p2()).then(res => console.log(res));
// p1
// p2
// p3
// A
```

2. 未知回傳

當 then 的 function 裡面沒有 return 任何東西時，下一個 then 中將無法取得任何東西。使用時要記得在 then 中傳回結果，除非後續已經沒有需要用到任何結果。

```js
p1().then(function() { p2() }).then(res => console.log(res));
// p1
// p2
// undefined
```

3. 非同步控制問題(與 1. 的狀況相同)

當 then 裡面不是 function 時，新建立的 promise 因為本質上和原 promise 沒有關係，故不會依序執行，如果 p2 必須等待 p1 完成後執行，則不可直接傳入 then 中。

```js
var p1 = () => new Promise((resolve) => {
  setTimeout(() => {
    console.log('p1');
    resolve('A');
  }, 1000);
});

p1().then(p2()).then(res => console.log(res));
// p2
// p1
// 'A'
```

此時必須改為下方寫法，在 function 中使用該 promise 。如此 p2 就會等待 p1 執行完成。

```js
p1().then(function() { p2() }).then(res => console.log(res));
// p1
// p2
// undefined
```

上面這樣我們在執行 p2 後就斷開 promise 的狀態了，若需要做到非同步佇列效果，我們需要將 promise 在 then 中 return 傳到下個 then 之中，則每個非同步動作都將按照我們呼叫的順序，依序完成。

```js
p1().then(function() { return p2() }).then(function() { return p3() }).then(res => console.log(res));
// p1
// p2
// p3
// 'C'
```

到這邊會發現，如果我們有很多非同步函數需要依序執行時，使用 promise 將非常的肥大且複雜，彈性也被限制住，故一般不建議使用 promise 進行多個非同步動作的控制排序等，而會使用 es7 的 async/await 來取代這部分，promise 主要應用於針對非同步內部執行邏輯的細節去進行設定，而不是用在控制流程上。

<SocialBlock hashtags="javascript,promise" />