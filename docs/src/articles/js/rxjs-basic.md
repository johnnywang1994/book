# Rxjs 學習筆記

本篇紀錄學習 Rxjs 的相關筆記內容，供日後複習使用，主要以基礎知識開始。


## 什麼是 Rxjs

Rxjs 就像是處理 event 的 lodash，提供使用者對於非同步或同步事件的操作處理。傳統上 javascript 為 pull 系統，也就是 function 回傳給使用者值，被動取值，function 並不知道何時使用者需要。而 promise 就是一種 push 系統，我們事先註冊一個回調動作，在 promise 完成後，會自動將值傳回並處理回調的內容，而 Observable 的概念也是 push 系統，但是其為 lazy 的調用，不像 promise 會在創建後立即執行，Observable 創建後並不會做任何動作，當使用者訂閱的同時，才會去進行處理取值。


主要為分為幾個單元：

1. Observable

為一可調用的事件邏輯集合，定義之後可以使用 subscribe 進行訂閱

2. Observer

裝載回調的容器，定義三種包括 next, error, complete 等回調，可在 subscribe 時傳入，提供 Observable 調用。

3. Operator

純函數，方便讓使用者以函數式編程進行事件邏輯的處理，包括 `map`,`filter`,`concat`,`reduce`,`first`,`last` 等等。

4. Subscription

subscribe 後回傳的執行，主要用於取消 Observable 之執行


## Observable

建立 Observable 的方式主要有兩種，第一種是直接 new 一個，第二種是使用 `create operator` 如 `of`,`from`,`interval` 等等進行創建。 

```js
import { Observable } from 'rxjs';

const observable = new Observable((subscriber) => {
  subscriber.next(1);
  subscriber.next(2);
  subscriber.next(3);
});
```

調用 Observable，使用 subscribe，其中接受一組 observer 包含回調事件。

```js
observable.subscribe({
  next(x) { console.log('got value ' + x); },
  error(err) { console.error('something wrong occurred: ' + err); },
  complete() { console.log('done'); }
});
```

當在 observable 中調用 `error` 或 `complete` 回調後，其後的所有動作都將不再被執行：

```js
const observable = new Observable((subscriber) => {
  subscriber.next(1);
  subscriber.next(2);
  subscriber.complete();
  subscriber.next(3); // 這裡不會被執行
});
```


## Operator

operator 就是一個函數，因為有的需要傳入動作，有些不用，所以總是以調用的方式進行串接，主要分為 `Pipeable` 及 `Creation` 兩種：

 - Pipeable：`map`, `filter` 等等，主要接收一個 Observable 並進行處理後回傳新的，因此操作後不影響原來的Observable，且對新的 Observable 訂閱一樣效果。
 - Creation: `of`, `from`, `interval` 等等，用以快速創建一個新的 Observable。

```js
import { of } from 'rxjs';
import { map } from 'rxjs/operators';

map(x => x * x)(of(1, 2, 3)).subscribe((y) => {
  console.log(y);
});
```

但當需要串接多個 operator 時，就會很容易變成這樣，可讀性非常的差。

```js
op4()(op3()(op2()(op1()(obs))));
```

也因此一般不會如上面那樣使用，我們用使用 `pipe` 這個 operator進行串接如下：

```js
obs.pipe(
  op1(),
  op2(),
  op3(),
  op3(),
);
```

### pipe

官方推薦必用如下：
> As a stylistic matter, op()(obs) is never used, even if there is only one operator; obs.pipe(op()) is universally preferred


### Higher-order Observables

高階 Observable 是 Observable 中又有 Observable，此時會需要做 flattening 的動作將其回歸正常的狀態，常見的 `flattening operators` 包含：`concatAll`,`mergeAll`,`switchAll`,`exhaust`

由於 Operator 種類非常之多，官方提供了一個目錄清單查詢使用 [清單在這](https://rxjs-dev.firebaseapp.com/guide/operators)



## Subscription

是一個一次性資源物件，最主要具有 `unsubscribe` 這個方法，進行資源的清除動作。並且可以使用 `add` 方法，將多個 subscriptions 合併後一起進行移除

```js
const subscription = observable1.subscribe(x => console.log('first: ' + x));
const childSubscription = observable2.subscribe(x => console.log('second: ' + x));
 
subscription.add(childSubscription);
 
setTimeout(() => {
  // Unsubscribes BOTH subscription and childSubscription
  subscription.unsubscribe();
}, 1000);
```
