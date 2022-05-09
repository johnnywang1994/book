# React 18 - Concurrent Features Memo

這篇是我在學習 React 18 的 Concurrent Features 過程中一些筆記的紀錄，供日後複習或是快速查看參考用~


## Key Features

### Auto Batching
批次處理，雖然 v16 時就有相關功能，但對於像 timeouts, promises, native event handlers 等非 React 事件是不會處理的，但在 v18 後不論在哪，都會自動合併(實測發現 v17 時，下面範例就已經有合併了)

```js
function App() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    let i = 0;
    while (i++ < 10) {
      setTimeout(() => {
        setCount(count + 1);
        console.log('in', count);
      })
    }
    console.log('after', count)
  }

  console.log('out', count)

  return <div onClick={handleClick}>Hello World, {count}</div>
}

// after 0
// out 1
// in 0
// out 1
// in 0
```

針對特殊場景 v18 後可使用 `React.flushSync` 進行同步取值，其原理主要就是依靠`React事件優先級`的設定來調配

```js
ReactDOM.flushSync(() => {
  this.setState(({ count }) => ({ count: count + 1 }));
});
```


### Transition
這個 Transition 要注意不是 Vuejs 裡的那個，而是針對耗時阻塞的結果進行特別處理，讓真正重要緊急的畫面更新優先的一個機制，實現的原理也是進行優先級的定義，在 `startTransition` 時會將優先級調低，確保其中的任務以較低的優先級更新，而 `useTransition` 則是以 `useState`, `startTransition` 維護一個 `isPending` 狀態，並以普通、transition 兩種優先級調用 `setPending`，確保了 isPending 會在 startTransition 內部工作結束後才更新為 false。

詳細可[參考這篇講解](https://juejin.cn/post/7095185674151821348#heading-6)

#### startTransition
```js
import { startTransition } from 'react';

// Urgent
setSliderValue(input);

// Mark any state updates inside as transitions
startTransition(() => {
  // Transition: Show the results
  setGraphValue(input);
});
```

#### useTransition
```js
import { useTransition } from 'react';

const [isPending, startTransition] = useTransition();

return isPending && <Spinner />
```

與傳統 `setTimeout / throttle / debounce` 優化的區別如下

- 執行時機  
  `setTimout/throttle/debounce` 均為異步執行，而transition為`同步執行`，因此會比他們更早的觸發更新調度，在性能較好時可能在同一幀完成更新，而這種情況在比如throttle中被強制拉大，比如100ms
- 交互體驗  
  不管是延遲還是減頻，當真正觸發更新，如果渲染時間比較久，依然會發生界面卡頓，而通過transition觸發的更新並不會阻塞用戶界面，能夠一直保持響應
- 精確控制  
  需要額外實現loading控制，而且往往不夠精確，現在transition內部會為我們自動維護這個loading狀態，並且足夠精確

#### useDeferredValue
透過 `useTransition` 我們可以標記優先級低的更新動作，但如果具體不確定會怎麼更新狀態，則可以在最一開始定義狀態時就透過 `useDeferredValue` 標記他

```js
import { useDeferredValue } from 'react';

const Comp = (input) => {
  const graphValue = useDeferredValue(input);
  // ...updating depends on graphValue
};
```


### Root API
初始化的部分 v18 開始有了改動如下

```js
import * as ReactDOMClient from 'react-dom/client';
import App from 'App';

const container = document.getElementById('app');

// Create a root.
const root = ReactDOMClient.createRoot(container);

// Initial render: Render an element to the root.
root.render(<App />);
```
