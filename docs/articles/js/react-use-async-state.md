# React useAsyncState 取得最新值

<SocialBlock hashtags="react,javascript,useState,setState,promise" />

## 前言
嗨~大家好，我是 Johnny。最近在研究 React Hooks 的一些底層機制，包含像是狀態更新、生命週期、Hooks 的整個創建到更新的流程(相關文章都記錄在[我的閱讀紀錄](https://johnnywang1994.github.io/book/articles/memo/learning.html#react)的 React 章節中)，而其中最讓我感興趣的是 `useState` 中的`狀態更新機制`


## 目標
當調用如下方式更新狀態時，因為 `setState` 本身是非同步的，React 內部會在 hooks 構建階段才重新取值放到 `memoizedState` 去 render 畫面，在原來的 function 的 scope 中我們拿到的還是舊的值，若我們希望能拿到更新後的狀態做事情時，就必須用 `useEffect` 綁定 deps，當觸發一次 increment 時，在 useEffect 階段才會拿到新的狀態

```js
function App() {
  const [count, setCount] = useState(0)

  const increment = useCallback(() => {
    setCount(c => c + 1)
    console.log(count) // 0
  }, [])

  useEffect(() => {
    console.log('effect trigger', count) // effect trigger 1
  }, [count])

  console.log('rerender')

  return (
    <div>
      <h3 onClick={increment}>Hi, {count}</h3>
    </div>
  )
}
```

上網查了下發現許多解法都是圍繞著過去 class component 時期的 callback，製作像是 `useCallbackState` 這種 hooks 來處理

### 第一種做法 useCallbackState
第一種 callback 的寫法按照上面的 `useEffect` 作法如下
```js
function useCallbackState(initialState) {
  const [state, setState] = useState(initialState)
  const callbackRef = useRef()

  const handleSetState = (updatedState, cb) => {
    callbackRef.current = cb
    setState(updatedState)
  }

  useEffect(() => {
    if (typeof callbackRef.current === 'function') {
      callbackRef.current(state)
      callbackRef.current = undefined
    }
  }, [state])

  return [state, handleSetState]
}
```

使用 `useRef` 把 callback 函數儲存起來，並在 `useEffect` 中調用執行，但這種作法的執行結果如下，可以明顯看到會在 rerender 後才執行

```js
// rerender
// 1
// effect trigger 1
```


### 第二種做法 useCallbackState
為了保證我們的 callback 是在正確的時間點被執行，第二種比起第一種做法：`不必等到狀態 commit 後才執行，能保有更完整的生命週期正確性`

```js
function useCallbackState(initialState) {
  const [state, setState] = useState(initialState)

  const handleSetState = (updatedState, cb) => {
    setState(updatedState)
    setState((prevState) => {
      cb(prevState)
      return prevState
    })
  }

  return [state, handleSetState]
}
```

這個做法是根據[這篇討論](https://stackoverflow.com/a/65757628/10300120)中提到的 `functional setState` 串聯特性，每一個 setState 的 function prevState 都必然是前面狀態更新後的回傳

```js
// 1
// rerender
// effect trigger 1
```

### 第三種作法 useAsyncState

這種作法跟第一種很像，只是把 callback 替換成 promise resolve，並且因為 promise resolve 實際上是比同步執行慢半拍的，所以實際實行時機甚至比其他 useEffect 更晚

```js
function useAsyncState(initialValue) {
  const [state, setState] = useState(initialValue)
  const resolveCb = useRef()

  const handleSetState = (updatedState) => new Promise(
    (resolve, reject) => {
      // force previous promise resolved
      if (typeof resolveCb.current === 'function') {
        resolveCb.current(updatedState)
      }
      resolveCb.current = resolve
      try {
        setState(updatedState)
      } catch(err) {
        resolveCb.current = undefined
        reject(err)
      }
    }
  )

  useEffect(() => {
    if (typeof resolveCb.current === 'function') {
      resolveCb.current(state)
      resolveCb.current = undefined
    }
  }, [state])

  return [state, handleSetState]
}
```

執行順序如下

```js
// rerender
// effect trigger 1
// 1
```


## 結論
- Promise 雖然不會造成 callback hell，但後續動作調用時機會被往後`延到其他 useEffect 之後`
- Callback 分成兩種做法
  - 第一種：傳遞 callback 函數並以 `useRef` 儲存，並在 `useEffect` 中調用執行，這種作法也是等到 `commit` 狀態 `rerender` 後才執行
  - 第二種：運用 `functional setState` 狀態串聯傳遞的原理，連續調用兩次 `setState` 並將 `callback` 在第二次 `setState` 中調用，這種做法不用等到狀態 `commit` 階段 `rerender` 結束，會在 `commit` 狀態前就依序執行

感謝大家觀看，下篇文章見拉大家!~ =V=

<SocialBlock hashtags="react,javascript,useState,setState,promise" />


## 參考
- [how-to-use-setstate-callback-on-react-hooks](https://stackoverflow.com/a/65757628/10300120)