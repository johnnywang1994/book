# useEffect 的高階封裝範例

## useEffectOnce
```js
function useEffectOnece(effect) {
  useEffect(effect, []) // deps 空
}
```

## useMount
```js
function useMount(fn) {
  useEffectOnce(() => {
    fn()
  })
}
```

## useUnmount
```js
function useUnmount(fn) {
  const fnRef = useRef(fn)

  fnRef.current = fn // 保持最新

  useEffectOnce(() => () => fnRef.current())
};
```

## useAsyncEffect
```js
function useAsyncEffect(effect, deps) {
  useEffect(() => {
    const e = effect()

    if (!!e) {
      if (typeof e.then === 'function') {
        Promise.resolve(e)
      } else {
        return e
      }
    }
  }, deps)
}
```

## useUpdateEffect
```js
function useFirstMountState() {
  const isFirst = useRef(true)

  if (isFirst.current) {
    isFirst.current = false
    return true
  }

  return isFirst.current
}

function useUpdateEffect(effect, deps) {
  const isFirstMount = useFirstMountState();

  useEffect(() => {
    if (!isFirstMount) {
      return effect()
    }
  }, deps)
}
```

## useCustomCompareEffect
```js
function useCustomCompareEffect(effect, deps, depsEqual) {
  const ref = useRef(undefined) // 手動維護 deps

  // 自定義方法判定，不相同時才修改 deps
  if (!ref.current || !depsEqual(deps, ref.current)) {
    ref.current = deps
  }

  useEffect(effect, ref.current)
}
```
