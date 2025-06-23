# React forwardRef 使用筆記

## 如何給 fallback 即使父層沒有傳遞 ref object
1. 最基本的方式，使用 `||` 判斷
```js
const Child = React.forwardRef((props, forwardedRef) => {
  const fallbackRef = useRef(null)
  const ref = forwardedRef || fallbackRef

  useEffect(() => {
    console.log(ref.current)
  }, [ref])

  return <div ref={ref}>...</div>
})
```

2. 使用 lazy useState，這種方式比較推薦，不會在每次 render Child 時都產生一個多餘的 ref object
```js
const Child = React.forwardRef((props, forwardedRef) => {
  const [ref] = useState(() => forwardedRef || React.createRef())

  useEffect(() => {
    console.log(ref.current)
  }, [ref])

  return <div ref={ref}>...</div>
})
```
甚至可以封裝成一個簡單的 custom hook
```js
function useFallbackRef(forwardedRef) {
  return useState(() => forwardedRef || React.createRef())[0]
}
```