# 手寫一個可中斷的 delay promise
###### tags: `JS` `Delay` `Promise` `AbortController`

<SocialBlock hashtags="javascript,delay,promise,abort-controller" />

Hi~大家好，我是 Johnny，最近又在網路上閒晃文章時，偶然看到一個在講解 delay 方法的文章，帶著好奇看完後，決定也自己來實際動手寫看看，當然我的版本一定也有些疏漏，還請各位大佬見諒，大家看完後也可以去看看當時我學習的範本喔～（放在文章最後）

那就開始吧

## 我原本的 delay 方法

首先我來還原下我以前常用的 delay 方法

```js
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
```

這是一行式寫法，用起來會像下面這樣

```js
(async () => {
    await delay(1000)
    console.log('Hello')
})()
```

但這種寫法沒辦法模擬返回值以及動態的 delay 時間，只能作為單一延遲的小工具，我們要來讓他更加強壯與強大

## 改寫術之1：指定返回值

為了讓程式碼好讀一些，我們把它改寫成下面這樣

```js
const delay = (ms, { value } = {}) => new Promise((resolve) => {
    setTimeout(() => resolve(value), ms)
})
```

改寫後我們可以像下面這樣指定回傳的值 `value`

```js
(async () => {
    const res = await delay(1000, { value: 'Hello' })
    console.log(res)
})()
```

上面這個範例裡看起來沒啥必要XD，但如果是在其他場景下，我們可以另外封裝成好用的方式，比如說：

```js
function mockResponse(value) {
    return (ms) => delay(ms, { value })
}

const getInfo = mockResponse({
    name: 'Johnny',
    money: 3000,
})

(async () => {
    const info = await getInfo(1000)
    console.log(info)
})()
```

## 改寫術之2：自定義成功或失敗

但每次執行都成功總是怪怪的，總會有那麼幾次 promise 會失敗吧？那我們如何測試失敗的情況呢？可以改寫如下，從外部傳入成功或失敗的條件 `willReject`

```js
const delay = (ms, { value, willReject } = {}) => new Promise((resolve, reject) => {
    setTimeout(() => {
        if (willReject) {
            reject(value)
        } else {
            resolve(value)
        }
    }, ms)
})
```

用起來像這樣

```js
(async () => {
    try {
        const res = await delay(1000, {
            value: 'Hello',
            willReject: true,
        })
        // never go here
        console.log('success', res)
    }
    catch (err) {
        console.log('error', err)
    }
})()
```

## 改寫術之3：動態範圍延遲時間

上面的每次請求延遲時間都是固定的，如果我們想要對不同返回時間去做模擬，就必須再度改寫，但我們又必須維持原來函數的功能可以正常，實現使用如下方式

```js
const randomInteger = (min, max) => Math.floor((Math.random() * (max - min + 1)) + min);

function createDelay() {
    const delay = (ms, { value, willReject } = {}) => new Promise((resolve, reject) => {
        setTimeout(() => {
            if (willReject) {
                reject(value)
            } else {
                resolve(value)
            }
        }, ms)
    })
    delay.range = (min, max, options) => delay(randomInteger(min, max), options)
    return delay;
}

// 最終的 delay
const delay = createDelay()
```

首先把原函數再包裹成一個高階函數 createDelay 使其返回原 delay 函數，接著就可以把隨機延遲時間的邏輯加在該高階函數當中，最終使用起來會像這樣

```js
(async () => {
    const res = await delay.range(500, 4000, { value: 'Hello' })
    console.log(res)
})()
```

## 改寫術之4：提前清除延遲

再來需要處理的是，我們如何在延遲完成前提前清除延遲來執行呢？可以很快地想到使用 setTimeout 來處裡，改寫如下

```js
function createDelay() {
    const delay = (ms, { value, willReject } = {}) => {
        let id = null
        let customResolve = null

        const promise = new Promise((resolve, reject) => {
            customResolve = () => {
                if (willReject) {
                    reject(value)
                } else {
                    resolve(value)
                }
            }
            id = setTimeout(customResolve, ms)
        })
        promise.clear = () => {
            clearTimeout(id)
            id = null
            customResolve()
        }
        return promise
    }

    delay.range = (min, max, options) => delay(randomInteger(min, max), options)
    return delay
}
```

首先把 promise 實例取出，並在他上面添加中斷的方法`clear`，這樣每次呼叫 delay 產生的 promise `clear`都會是個別唯一的，改完之後可以像下面這樣使用

```js
const delay = createDelay()

(async () => {
    const p = delay(2000, { value: 'Hello' })

    setTimeout(() => p.clear(), 300)

    // this will trigger after only in 300ms
    console.log(await p)
})()
```

## 改寫術之5：取消執行

剛剛上面的是提前執行，也就是在延遲時間中提前完成，現在我們要做的是，提前取消執行，也就是終止執行的意思，參考大神寫法使用 `AbortController`，這個是較為新的寫法，已知在 IE 完全不支援，chrome 則是從 66 version 後支援，詳情可以參考 [Can I Use](https://caniuse.com/?search=AbortController)

![](https://caniuse.bitsofco.de/image/AbortController.jpg)

```js
const createAbortError = () => {
    const error = new Error('Delay aborted')
    error.name = 'AbortError'
    return error
}

function createDelay() {
    const delay = (ms, { value, signal, willReject } = {}) => {
        // if already abort
        if (signal && signal.aborted) return Promise.reject(createAbortError())
        let id = null
        let customResolve = null
        let customReject = null

        const signalListener = () => {
            clearTimeout(id)
            customReject(createAbortError())
        }
        const cleanup = () => {
            if (signal) {
                signal.removeEventListener('abort', signalListener)
            }
        }

        if (signal) {
            signal.addEventListener('abort', signalListener, { once: true })
        }

        const promise = new Promise((resolve, reject) => {
            customResolve = () => {
                cleanup()
                if (willReject) {
                    reject(value)
                } else {
                    resolve(value)
                }
            }
            customReject = reject
            id = setTimeout(customResolve, ms)
        })
        promise.clear = () => {
            clearTimeout(id)
            id = null
            customResolve()
        }
        return promise
    }

    delay.range = (min, max, options) => delay(randomInteger(min, max), options)
    return delay
}
```

我們從外部傳入 `signal` 後，監聽他的 `abort`事件，當觸發時我們把倒數關閉，並返回錯誤訊息，使用時會像下面這樣

```js
const abortController = new AbortController()

const delay = createDelay()

(async () => {
    const p = delay(2000, {
        value: 'Hello',
        signal: abortController.signal,
    })

    // error triggered in 1000ms here
    setTimeout(() => abortController.abort(), 1000)

    // never goes here
    console.log(await p)
})()
```

到此結束拉～總結一下學到的一些觀念吧



## 結論

1. 使用高階函數封裝邏輯在現有函數上進行功能加強

2. `AbortController`學習與使用

原版的學習模板在下方，歡迎大家也去看看喔，那今天就帶大家看到這邊，感謝觀賞～下一篇分享見摟=V=

<SocialBlock hashtags="javascript,delay,promise,abort-controller" />

## 參考

- [请手写一个带取消功能的延迟函数](https://juejin.cn/post/7042461373904715812)

- [delay/index.js at main · sindresorhus/delay · GitHub](https://github.com/sindresorhus/delay/blob/main/index.js)