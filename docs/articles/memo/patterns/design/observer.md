# Observer Pattern

<SocialBlock hashtags="design,pattern,observer,rxjs" />


## 前言
大家好，我是 Johnny，今天要紀錄分享的是 Patterns 筆記系列的 `Observer Pattern`


## 介紹
Observer 使我們能夠對物件進行訂閱，當 observable 目標被訂閱物件出現任何事件，能夠對其對應的所有訂閱者 observer 傳遞通知，一個經典的案例就是，當你訂閱的網紅今天發布了最新影片，其所有訂閱者都將馬上收到通知訊息

一個 Observable 物件通常包含以下 3個重要部分：
- `observers`: 訂閱者清單
- `subscribe()`: 訂閱
- `unsubscribe()`: 取消訂閱
- `notify()`: 通知所有訂閱者

根據以上，我們來實際動手試試

```js
class Observable() {
  constructor() {
    this.observers = [];
  }

  subscribe(func) {
    this.observers.push(func);
  }

  unsubscribe(func) {
    this.observers = this.observers.filter(observer => observer !== func);
  }

  notify(data) {
    this.observers.forEach(observer => observer(data));
  }
}
```
接著實際使用看看，我們以 React 作為範例，定義並訂閱兩個函數 logger, toastify，這樣後續我們只需要通知 observable 時就會自動通知這兩個函數執行

```js
import Toast, { toast } from '@/components/Toast';

const toastObservable = new Observable();

function logger(data) {
  console.log(`${Date.now()} ${data}`);
}

function toastify(data) {
  toast(data);
}

observable.subscribe(logger);
observable.subscribe(toastify);

export default function App() {
  function handleClick() {
    observable.notify("User clicked button!");
  }

  function handleToggle() {
    observable.notify("User toggled switch!");
  }

  return (
    <div className="App">
      <Button>Click me!</Button>
      <FormControlLabel control={<Switch />} />
      <ToastContainer />
    </div>
  );
}
```


## Rxjs
一個 Observer Pattern 的經典案例就是有名的 `Rxjs` 套件，在 Rxjs 中的 `Observable` 就是運用這種模式來實作，當然 Rxjs 不只這樣，還提供更多方便的方法與實作，底下是一個經典的範例

```js
import { Observable } from 'rxjs';

const observable = new Observable((subscriber) => {
  subscriber.next(1);
  subscriber.next(2);
  subscriber.next(3);
  setTimeout(() => {
    subscriber.next(4);
    subscriber.complete();
  }, 1000);
});

console.log('just before subscribe');
observable.subscribe({
  next(x) {
    console.log('got value ' + x);
  },
  error(err) {
    console.error('something wrong occurred: ' + err);
  },
  complete() {
    console.log('done');
  },
});
console.log('just after subscribe');
```
上面這段在執行後會得到這樣的結果，其中的 `subscriber` 就是我們的訂閱內容，我們可以透過他取得各個觀察者物件
```
just before subscribe
got value 1
got value 2
got value 3
just after subscribe
got value 4
done
```
對詳細用法有興趣的人，可以參考[Rxjs 官方文件](https://rxjs.dev/)


## 優缺點

### 優點
Observer Pattern 可以強化 `關注點分離`、`單一職責原則`，其中的 observer objects 觀察者對象並不會強綁定在 observable 物件上，能夠被更大程度的重複使用，藉此提高程式碼的可讀性、模組化，其中 observable 物件負責監聽事件，而 observer 則只需要關注在拿到資料後續做事

### 缺點
當 observer 越來越大複雜、observable 訂閱的對象越來越多時，在進行 notify 通知所有訂閱物件時可能會發生效能問題


感謝收看，下篇見拉～

<SocialBlock hashtags="design,pattern,observer,rxjs" />