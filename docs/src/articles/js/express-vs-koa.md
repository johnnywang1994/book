# NodeJS 輕量開發框架 Expressjs 與 Koa2 的區別
###### tags: `JS` `Nodejs` `Expressjs` `Koa2`

<SocialBlock hashtags="javascript,Nodejs,Expressjs,Koa2" />

相信 Nodejs 小粉絲一定很好奇，到底 Koa2 跟 Express 差在哪？為何尤雨溪會選擇 Koa2 作為 Vite 的 server 使用而不是廣為人知的老大哥 Express 呢？

今天這篇就來一探究竟 Express 與 Koa2 有什麼區別吧！（這篇只是客觀分析喔～大家別戰起來！）


## 市場定位
要了解兩個工具之間的區別，最重要的是先了解他們的目標定位，就來看看各自官網怎麼描述吧

先來看一下 Express

  1. 最小又靈活的 Node.js Web 應用程式架構
  2. 大量的 HTTP 公用程式方法與中介軟體供您支配，能夠快速又輕鬆的建立完整的 API。
  3. 提供精簡的基礎 Web 應用程式特性，又不使您所認識及喜好的 Node.js 失色

再來是 Koa

  1. 由原班 Express 開發團隊打造的新一代網頁開發框架
  2. 目標打造一個更輕量且高效穩定的網頁應用程式與 API 開發工具
  3. async, await 取代傳統回調，大大增加錯誤處理能力
  4. Koa 沒有在其核心中捆綁任何中間件，提供了一套優雅的方法，使編寫服務器變得快速而愉快

總結來說，Koa 的某些定位與 Express 非常接近，都是一款輕量、高效的框架，畢竟開發團隊就是同一群人，但 Koa 顯然是針對 Express 的一些弱項進行優化後的版本，所以某些方面來說，Express 更貼近原生 Nodejs，專注處理 route 的部分，Koa 則類似於精簡優化過的 Express，但也因此 Koa 的 API 比起 Express 而言，與原生 Nodejs API 有一些差別

有關 Koa 的第四點，是因為過去 Express即使沒有添加任何 middleware，內部就會預設有兩個中間件了，對於「輕量」這一點來說，Koa 完全沒有多餘的中間件負擔，但對於抽象 API 這一點來說，Express 則較為貼近原生 Nodejs


## 建立 Server
對於一些基礎 api 除了寫法上的差別外，整體概念是非常像的

```js
// express
const express = require('express');
const app = express();

app.use((req, res, next) => {
  res.send('Hello');
});

app.listen(3000);
```

```js
// koa
const Koa = require('koa');
const app = new Koa();

app.use((ctx, next) => {
  ctx.body = 'Hello';
});

app.listen(3000);
```


## Request/Response

**在 Express 中**  
`request`, `response` 是獨立開來分別給開發者使用的，並且 `req`, `res` 僅僅是原生 Nodejs 的 HTTP 物件包裝，所以可以直接調用原生 method 都沒問題，根據[官網的解釋](https://expressjs.com/zh-tw/4x/api.html#req)

> The req object is an enhanced version of Node’s own request object and supports all built-in fields and methods.

**在 Koa 中**  
Koa 將 `request`, `response` 放在內部維護的 `ctx` 中，每一次請求都會產生一個全新的 `ctx` 物件，為了方便使用，`ctx` 內許多 key 會直接幫助開發者指向正確的位置，比如說 `ctx.get`, `ctx.set` 分別代理的是 `ctx.request.get`, `ctx.response.set`，詳細可以[參考官網](https://koajs.com/#context)

但因為 Koa 是對於原生 HTTP 物件進行抽象的關係，使用原生像是 `ctx.response.setHeader` 就會出現錯誤，而 Express 則可以正確執行 `res.setHeader`。



## 設置 logger
想要設定一個 logger 時，乍看用到的 API 其實是非常相似的，但可以很明顯看出 Express, Koa 在 middleware 這一塊裡有個明顯的差異，導致 Express 在做這種功能時綁手綁腳

```js
// Express
const express = require('express');
const app = express();

// logger

app.use((req, res, next) => {
  next();
  const rt = res.get('X-Response-Time');
  console.log(`${req.method} ${req.url} - ${rt}`);
});

// x-response-time

app.use((req, res, next) => {
  const start = Date.now();
  next();
  const ms = Date.now() - start;
  // 這邊會噴錯，因為 next 已經 res.send 完畢
  // Cannot set headers after they are sent to the client
  res.set('X-Response-Time', `${ms}ms`);
});

// response

app.use(async (req, res) => {
  res.send('Hello World');
});

app.listen(3000);
```

```js
// Koa
const Koa = require('koa');
const app = new Koa();

// logger

app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.get('X-Response-Time');
  console.log(`${ctx.method} ${ctx.url} - ${rt}`);
});

// x-response-time

app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  // ctx.set is alias for ctx.response.set
  // 這裡沒問題，ctx.body 不會阻斷這邊繼續執行
  ctx.set('X-Response-Time', `${ms}ms`);
});

// response

app.use(async ctx => {
  ctx.body = 'Hello World';
});

app.listen(3000);
```

> 在 Express 中，如果呼叫了 `res.send`，則請求到該 middleware就會將 header 送出，而在 Koa 中，即使呼叫了 `ctx.body`，後續 middleware 中還是可以對 header 進行調整修正，因為實際上 Koa 還沒有真正返回請求，一直到所有 middleware 都依序執行完畢才會返回


那到底在 Express 中我們要怎麼做到 response duration 的功能呢？必須借助套件 [on-headers](https://www.npmjs.com/package/on-headers) 的幫助，監聽 write header 的動作，並在 write 之前進行計算

```js
const express = require('express');
const onHeaders = require('on-headers');
const app = express();

// logger

app.use((req, res, next) => {
  next();
  const rt = res.get('X-Response-Time');
  console.log(`${req.method} ${req.url} - ${rt}`);
});

// x-response-time

app.use((req, res, next) => {
  const startAt = new Date().getTime();

  onHeaders(res, () => {
    const diff = new Date().getTime();
    var time = diff - startAt;
    if (res.get('X-Response-Time')) return;
    res.set('X-Response-Time', `${time}ms`);
  });

  next();
});

// response

app.use(async (req, res) => {
  res.send('Hello World');
});

app.listen(3000);
```

是不是覺得有點矇啊...，為了一個感覺很基本的功能居然要這樣大費周章，當然你要存全域變數去做也是可以拉



## Middleware 中間件

中間件算是 Express 的某些情況下的劣勢，具體比較是怎麼樣呢，我們來看看

### Express 同步
首先拿一個正常情況下的 express 中間件情況

```js
const express = require('express');
const app = express();

app.use((req, res, next) => {
  console.log('1st middleware start');
  next();
  console.log('1st middleware end');
});

app.use((req, res, next) => {
  console.log('2nd middleware start');
  next();
  console.log('2nd middleware end');
});

app.get('/api/test', (req, res) => {
  console.log('trigger /api/test');
  res.status(200).send('hello')
});

app.listen(3000);
```

#### RESULT
上面對 `/api/test` 請求時會得出下面的結果，符合預期，下面接著看看非同步時的結果

```
1st middleware start
2nd middleware start
trigger /api/test
2nd middleware end
1st middleware end
```

### Express 非同步
稍微修改下上面的，加入了 `sleep` 的非同步等待

```js
const express = require('express');
const app = express();

const sleep = (ms) => new Promise((res) => setTimeout(() => {
  console.log('sleep timeout...');
  res();
}, ms));

app.use(async (req, res, next) => {
  console.log('1st middleware start');
  await next();
  console.log('1st middleware end');
});

app.use(async (req, res, next) => {
  console.log('2nd middleware start');
  await next();
  console.log('2nd middleware end');
});

app.get('/api/test', async (req, res) => {
  console.log('trigger /api/test');
  await sleep(2000); // 加入非同步的等待
  res.status(200).send('hello');
});

app.listen(3000);
```

#### RESULT
可以看到即使我們幫前幾個 middleware 的 next 加上 await，但這結果明顯亂了套，我們預期的是 sleep 後才跑到 2nd, 1st 中間件的 end，結果卻是其他後續 middleware 被提前調用了，原因是 express 的 next 函數並沒有包裝為 Promise，也就不支援 `await`

> 雖然這不影響最終返回的結果，但對於某些會被執行順序影響的結果而言就會有影響了，比如上面那種紀錄 response duration 的中間件，面對非同步請求時如果沒有妥善處理就會導致一些問題

```
1st middleware start
2nd middleware start
trigger /api/test
2nd middleware end
1st middleware end
sleep timeout...
```

### Express 中間件邏輯
會發生上面這種怪事，相信眼尖的人應該已經知道為什麼了，這主要是 express 的中間件在當初設計上的一個小瑕疵，上面的中間件經過拆解後實際會像下面這樣執行，`next` 函數的設計是關鍵

```js
((req, res) => {
  console.log('1st middleware start');
  ((req, res) => {
    console.log('2nd middleware start');
    // 可以看到，這裡的非同步函數是被包裹起來執行的，也因此後續的中間件行為並不會等待他的結果返回
    // 且因為 next 沒有被 Promise 包裹
    (async(req, res) => {
      console.log('trigger /api/test');
      await sleep(2000);
      res.status(200).send('hello')
    })(req, res)
    console.log('2nd middleware end');
  })(req, res)
  console.log('1st middleware end');
})(req, res)
```

相信看到這大家就能理解為何會出現像上面那種奇怪的打印結果了吧～，其實當初 express 會這麼設計也不是不能理解，畢竟設計當時應該還無法遇見現在 `async`, `await` 這麼流行吧

接下來我們看看新的小老弟 Koa2 是如何優雅地處理中間件的吧


### Koa2 中間件邏輯

Koa2 處理中間件邏輯的部分是一個獨立的包[koa-compose](https://github.com/koajs/compose/blob/master/index.js)，其實就只有一個檔案在處理，真的是非常精煉...下面一起看看他的源碼怎麼做吧

```js
function compose (middleware) {
  if (!Array.isArray(middleware)) throw new TypeError('Middleware stack must be an array!')
  for (const fn of middleware) {
    if (typeof fn !== 'function') throw new TypeError('Middleware must be composed of functions!')
  }

  return function (context, next) {
    // last called middleware #
    let index = -1
    return dispatch(0)

    // dispatch 返回都是 Promise
    function dispatch (i) {
      if (i <= index) return Promise.reject(new Error('next() called multiple times'))
      index = i
      let fn = middleware[i]
      // 完成遍歷時，自動改為調用 next
      if (i === middleware.length) fn = next
      // fn 不存在時，完成任務，返回 Promise
      if (!fn) return Promise.resolve()
      // 掛載 Promise 執行，傳入執行下一個 middleware 的 next dispatch
      try {
        return Promise.resolve(fn(context, dispatch.bind(null, i + 1)))
      } catch (err) {
        return Promise.reject(err)
      }
    }
  }
}
```

可以看到 Koa2 的 compose 就是透過閉包和遞迴的性質來一層一層處理 middleware，且每一個 next 都是返回 Promise，也就直接支援進行 `await` 處理


## 結論
總結來說，Express 與 Koa2 的差別在於，對基礎開發 API 設計的方式一個更貼近原生，一個更講究方便，並且在 middleware 的處理上，Express 屬於直線執行，Koa2 則採用 stack 的洋蔥執行方式，以目前主流 `async`, `await` 來說，Express 也是可以使用，只是在某些場景下會顯得比較棘手，不知道大家在瞭解了兩者的差別後，有什麼想法呢？

不管怎樣，最重要的還是開發者自由心證拉～，希望大家都能找到自己最愛的開發框架摟，畢竟開發就是用自己最擅長，最喜歡的工具就對了=V=，今天寫到這了，感謝大家觀看，覺得內容不錯也歡迎分享出去讓更多人看看吧


<SocialBlock hashtags="javascript,Nodejs,Expressjs,Koa2" />

## 參考

- [再也不怕面试官问你express和koa的区别了](https://juejin.cn/post/6844903968041091080)
- [Koajs 官網](https://koajs.com/)
- [Expressjs 官網](https://expressjs.com/zh-tw/4x/api.html)
- [Expressjs response-time source code](https://github.com/expressjs/response-time)