# 你真的懂 Event Loop 嗎

<SocialBlock hashtags="javascript,eventloop" />

##### updated at: 2021-03-26
###### tag `js`, `event loop`, `vanilla js`

"請說說什麼是 Event Loop?" 這句經典的面試題不知道嚇倒了多少人，包括曾經的我自己...，這篇就是本人用來喚醒記憶用的日常 MDN 閱讀筆記，歡迎對這主題"好像懂又好像不懂"的夥伴們一起來深入了解一下吧


## 前言
在開始之前需要先簡單釐清一下概念，我們都知道 Javascript 語言本身是單線程環境，也就是一次只同時處理一件事（call stack），但在瀏覽器中，V8 引擎中 "concurrency model" 並行模型及 "Event Loop" 的概念卻鮮少被提及，因為他是實作在瀏覽器環境的強大功能，而不是被原生的 Javascript ECMAScript 明定規範。

下面馬上來介紹下這幾個幫助 Javascript 更加強大的特性～


## 執行環境 Runtime Concept
在正式講到 Javascript 的 Event Loop 前，我們有必要先了解所謂的`執行環境`，下面圖片參考自 MDN，可以看到共可分為主要三個概念：`Stack`, `Heap`, `Queue`：

![Image from MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Event_loop/the_javascript_runtime_environment_example.svg)

### Stack 堆疊（call stack）
每次呼叫一個函式後，會產生一個包含該函式執行環境參數的 frame，每次呼叫一個新函式就會往 Stack 內疊加，而每當一個函式執行結束後，就會將該函式對應的 frame 從 Stack 中移除，這是作為單線程的 Javascript 的基本特性。
```js
function foo() {
  console.log('foo go');
}

function bar() {
  console.log('bar go');
  return foo();
}

bar();
```
上面範例中，`bar` 呼叫後會往 Stack 裡堆疊一個含有 `bar` 執行環境參數的 frame，而 `bar` 中又呼叫了 `foo`，所以會再往 Stack 裡堆疊一個含有 `foo` 環境的 frame，之後當 `foo` 執行完畢就會從 Stack 中移除該 `foo` 執行的 frame，最後 `bar` 執行完畢移除 `bar` 的 frame。

總結來說，Stack 的功能主要就是紀錄當前環境正在做什麼的一個追蹤序列。

### Heap 堆積
可以把 Heap 想像成一個記憶體，裡面分配儲藏著各種物件，是一個無結構的大區域。

### Queue 佇列
Javascript 執行環境的 Queue 主要基於 `FIFO（First in First Out）`原則執行，裡面裝載著所有待處理的`Task`，每當 Stack 中有空間釋出時，就會從 Queue 中提取一個`Task`進行處理，並將該 Task 中相關聯的所有 function 執行完畢後才會提取下一個。



## Event Loop 事件循環
呈上面的 Queue 概念，因為在實作此一概念的功能時常常以下方的範例方式進行，故被取名為 `Event Loop`:
```js
while (queue.waitForMessage()) {
  queue.processNextMessage();
}
```
如果 Queue 中沒有任何 Task 時，`waitForMessage` 會同步地等待新 task 到來。

以下介紹有關 Event Loop 的幾個特性：

### Run to completion 執行到完成
每個`Task`會在當前 task 處理完成後才處理下一個
 - 優點：分析程式時提供可靠性，可確保程式依序有效的執行不被取代。
 - 缺點：若一個 task 要很久的時間來執行完畢，網頁程式會無法即時處理使用者的基本操作，例如 click 或 scroll。瀏覽器為了避免此問題會跳出`警告提示執行過久`，實作上建議盡可能縮短`task`的執行時間，或是將一個`task`切割成數個執行。

### Adding message 添加訊息

#### Basic
那麼究竟瀏覽器會怎麼添加 Task 呢？在一般狀況下，一個 task 必須同時由兩個部分構成 - `事件觸發`, `事件監聽者`，前者比如常見的點擊事件，而後者比如 `addEventListener`，如果沒有事件監聽者，則該事件就不會形成訊息。或是如常見的 `script` tag 也會添加一個新的 task 進入 queue

#### setTimeout 與誤差
另一個常見的添加訊息方式是 web API 中的 `setTimeout` 等等，當 Javascript 執行時遇到這些 web API 時，就會將第一個參數中指定的動作轉為`訊息`加入瀏覽器 Queue 中，而第二個參數為延遲時間，若當下無其他訊息已在 Queue 裡，則該訊息將在延遲時間過後被立即取出調用。若 Queue 中已有其他訊息，則該訊息必須等到在他之前所添加的其他訊息執行完畢，也因此第二個參數只能表示最短時間，而不是一個精準的時間。

下面範例展示失準的 setTimeout 延遲：
```js
console.log('start');

const now = new Date();

setTimeout(function cb() {
  const local = new Date();
  var i = 0;
  while(i++ < 99999999) { };
  console.log('wait 1:', local - now);
}, 1000);

setTimeout(function cb() {
  const local = new Date();
  console.log('wait 2:', local - now);
}, 1000);

console.log('end');

// start
// end
// wait 1: 1000
// wait 1: 1057
```
可以看到我們使用兩個相同延遲 1000ms 的 setTimeout，可以明顯看到第二個晚了 57ms，該時間就是等待前一個執行完畢的等待時間，雖然看起來差不多，但如果是在 setInterval 的狀況下，誤差就會逐漸擴大。


### Zero delays（零延遲）
「零延遲」並非意味著函式（callback function）會在 0ms 之後立刻被執行。實際延遲狀況會參考佇列中等待的`訊息數量`來決定。
```js
console.log('start');

setTimeout(function cb() {
  console.log('message in callback');
}, 0);

console.log('end');

// start
// end
// message in callback
```
可以看到範例中，即使設定延遲時間為 0，其仍視為新的訊息並必須等待當前訊息執行完畢。


### Never Blocking（絕不阻塞）
事件循環這個模型有一個非常有趣的特色就是預設狀況下永不阻塞，但凡事總有例外，像是 `alert` 或是`同步的 XHR`，好的實作方式是盡力避開他們～



## 實作
上面講了一堆理論，實作上我們該怎麼使用這些特性又是另一個問題，常見進行非同步的方式有幾種，包含最基本的 callback 回調函式，上面講到的 setTimeout，以及現今最流行使用的 promise。

### Callback 回調函式
以下是一個最簡單的點擊事件監聽，我們明確定義了一個添加訊息的方式，當後續按鈕點擊觸發後，瀏覽器就會添加一個 cb 訊息到 Queue 中
```js
document.getElementById('btn').addEventListener('click', function cb() {
  console.log('button clicked');
})
```

### setTimeout
直接使用 web api 添加
```js
setTimeout(function cb() {
  console.log('do something');
}, 1000);
```

### Promise
使用 Promise 物件進行操作，並在 then 中定義回調函式
```js
new Promise(function cb(resolve) {
  console.log('do something - sync');
  resolve();
}).then(() => {
  console.log('do something - async');
})
```

### Micro & Macro queue

上面的回調函式已經很清楚是一個`Task`會添加到 Queue 中，這裡先不討論了，這裡專注討論 setTimeout 與 promise 的差異，相信很多人吃過很多雞但都沒看過雞吧！！...

誒不是！！兩個都用過但其實是有些微差異的，繼續往下看看這個範例，先想想他的輸出順序會是如何？
```js
console.log('start');

new Promise((resolve) => {
  console.log('promise exec');
  resolve();
  console.log('promise after resolve');
}).then(() => {
  console.log('promise then');
})

setTimeout(() => {
  console.log('setTimeout exec');
})

console.log('end');
```
答案是
```js
// start
// promise exec
// promise after resolve
// end
// promise then
// setTimeout exec
```

這邊要介紹一個 micro, macro queue 的概念，在 Javascript 的事件中，分為兩個分類：
  - micro queue: `promise`, `Mutation Observer API`, `queueMicrotask`
  - macro queue(task queue): `setTimeout`, `dom event listener`, `script`

#### **Microtask**
microtask 是ㄧ段函式，並會在當前創造他的 function stack 執行完畢(清空)離開後，並在將控制權限交給 Event Loop 之前執行，如此可確保 microtask 不會影響污染到其他 `script` 的執行，也確保 user agent 不會在 microtask 執行完畢前做出相應的反應。

#### **Macrotask(Task)**
Macrotask 主要與 Microtask 有兩大差異：

1. 每當 Task 執行結束時，Event Loop 會檢查當前 task 是否有明確回傳控制權給其他 javascript code，如果沒有，則會將所有存在 micro queue 中的動作執行，並依此往復執行數次（包含其他事件驅動或 script 回調等等）

2. 即使使用 setTimeout 或 queueMicrotask 一次添加大量 microtask，其也會在下一個 Task 執行前執行完畢，因為 micro queue 會在每個 task 執行後執行並清空，不論在當前 Task 內添加了多少 microtask。


#### 解說答案
```js
// 1
console.log('start');

new Promise((resolve) => {
  // 2
  console.log('promise exec');
  resolve();
  // 3
  console.log('promise after resolve');
}).then(() => {
  // 5
  console.log('promise then');
})

// 6
setTimeout(() => {
  console.log('setTimeout exec');
})

// 4
console.log('end');
```
promise 建立時內部的回調會立即調用，這邊要注意的是 resolve 後並不會停止後續的程式執行，當 end 執行完畢後代表 task 已結束，接著會檢查並調用所有 micro queue 中的 task，當 micro queue 清空後，event loop 提取下一個 Task 執行。



## 結論
本篇主要介紹基礎的 Event Loop 概念，如果你對更深入的差異內容感興趣，可以[前往這裡](https://developer.mozilla.org/en-US/docs/Web/API/HTML_DOM_API/Microtask_guide/In_depth)觀看詳細的解釋。

以下結論重點：

1. Micro Queue 會在每次 Task 執行結束後，全部調用並清空，接著 Event Loop 提取下一個 Task 執行。   
2. Microtask 包含 Promise 的 then, queueMicrotask 等等動作。  
3. Macrotask 包含 Event Callback, setTimeout, script 等等。  

希望大家看完本篇後都能對 Javascript 的 Event Loop 有更深度的了解摟，下次面試官再問也不怕拉～


## References

  - [MDN 並行模型和事件循環](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/EventLoop)
  - [MDN Microtask & Task](https://developer.mozilla.org/en-US/docs/Web/API/HTML_DOM_API/Microtask_guide)


<SocialBlock hashtags="javascript,eventloop" />