# Vue、React 使用心得分享(文長慎入)

<SocialBlock hashtags="vue,react,state,effect,sourcecode" />


## 前情提要
- 過去主要以 Vue 開發，目前專案使用 React
- React 的 class 和 functional 組件在狀態更新這部分有一些區別，底下以 functional 為主進行探討

| 目標 | Vue | React |
| -------- | -------- | -------- |
| render | template, render function, JSX | JSX |
| state | ref, reactive | useRef, useState, useReducer |
| cache | computed | useMemo, useCallback, useEvent |
| effect | watch, watchEffect | useEffect |
| global | provide, inject | createContext, useContext |

## Lifecycle

### Mount
```javascript
// Vue
onMounted(() => {
    // ...
});

// React
useEffect(() => {
    // ...
}, [])
```

### Unmount
```javascript
// Vue
onBeforeUnmount(() => {
    // ...
});

// React
useEffect(() => {
    return () => {
        // ...
    }
}, [])
```

### Update
```javascript
// Vue
onUpdated(() => {
    // ...
});

// React
useEffect(() => {
    // ...
})
```

### Async mount
```javascript
// Vue
onMounted(async () => {
    // ...
})

// React
useEffect(() => {
    (async () => {
        // ...
    })();
}, [])
```


## Loop Nodes
### Vue
```html
<template>
    <ul>
        <li v-for="item in list" :key="item.id">
            {{ item.text }}
        </li>
    </ul>
</template>

<script setup>
const list = $ref([
    { id: 1, text: 'a' },
    { id: 2, text: 'b' },
]);
</script>
```
### React
```jsx
const Component = () => {
    const [list] = useState([
        { id: 1, text: 'a' },
        { id: 2, text: 'b' },
    ]);
    return (
        <ul>
            {
                list.map((item) => (
                    <li key={item.id}>
                        {item.text}
                    </li>
                ))
            }
        </ul>
    );
}
```


## Condition
### Vue
```html
<template>
    <div v-if="show">
        Hello World
    </div>
</template>

<script setup>
const show = $ref(false);
</script>
```
### React
```jsx
const Component = () => {
    const [show] = useState(false);
    return show ? <div>Hello World</div> : <></>;
};
```


## Data Binding
### Vue
```html
<template>
    <input v-model="text" />
</template>

<script setup>
const text = $ref('');
</script>
```
### React
```jsx
const Component = () => {
    const [text, setText] = useState(false);
    return (
        <input value={text} onChange={(e) => setText(e.target.value)} />
    )
};
```


## Props
### Vue
```html
<template>
    <input
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
    />
</template>

<script setup>
defineProps(['modelValue']);
defineEmits(['update:modelValue']);
</script>
```
### React
```jsx
const Component = ({ value, onChange }) => {
    return (
        <input value={value} onChange={onChange} />
    )
};
```



## States

### Vue
- [Vue3 compile online](https://sfc.vuejs.org/)
- [Reactivity Transform](https://github.com/vuejs/rfcs/discussions/369)
```html
<template>
    <div id="app" @click="increment">
        Count: {{ count }}
    </div>
</template>

<script setup>
import { watchEffect } from 'vue';

const count = $ref(0);

const increment = () => {
    count += 1;
    console.log('event scope: ', count);
};

watchEffect(() => {
    console.log('trigger effect: ', count);
});

console.log('setup');
</script>
```

#### 首次載入
```
trigger effect 0
setup
```

#### 更新
```
event scope 1
trigger effect 1
```


### React
- [React compile online](https://babeljs.io/repl)
```jsx
import { useState, useEffect, useCallback } from 'react';

const App = () => {
    const [count, setCount] = useState(0);

    const increment = useCallback(() => {
        setCount((prevCount) => prevCount + 1);
        console.log('event scope: ', count);
    }, [count]);

    useEffect(() => {
        console.log('trigger effect: ', count);
    }, [count]);

    console.log('render');

    return (
        <div id="app" onClick={increment}>
            Count: {count}
        </div>
    );
};
```

#### 首次載入
```
render
trigger effect 0
```

#### 更新
```
event scope 0
render
trigger effect 1
```


## 狀態更新追蹤
Vue 狀態更新的方式是以高細粒度的依賴追蹤模式，針對用到 state 的地方進行精準刷新，而 React 比較偏向以 component 為單位來狀態比對重組重繪，這跟兩個框架底層的實作方式不同也有關係

### 同樣都是 hooks 寫法

#### Vue 在狀態更新後
setup 不會重新跑一次（函數、狀態構建），hooks 只在 setup function 裡初始化一次，後續更新由 render function 再次執行構建出新 VDom 進行 diff 更新，與 React Class Component 的模式較為類似

#### React 在狀態更新後(functional)
因為 functional component 本身既是 setup，也是 render function，而狀態是由 hooks 在 mount, update 兩種不同時刻分別進行初始化以及對比更新


## 結論

兩個框架都有各自的優勢跟弱勢，使用的時機也都有各自適合的場景，切換使用時只需要多加留意特別容易出問題的地方，其實都是很好的工具！

|  | Vue | React |
| -------- | -------- | -------- |
| diff | 雙向對比 | 單向對比 |
| API | 方便多元 | 核心複用 |
| 官方生態 | 較多 | 較少 |
| 開源生態 | 較少 | 較多 |
| 學習資源 | 官方文件 | 網路文章 |
| 穩定度 | v3 部分相容 v2 | 核心穩定 |
| 相容 TS | 相容 | 相容 |
| 寫法規範 | 標準統一 | 彈性 |


<SocialBlock hashtags="vue,react,state,effect,sourcecode" />

## 延伸研究：簡易重現對比（僅供參考）

### Vue
```javascript
const state = reactive({
    name: 'Johnny'
});

// 因為在 Proxy getter 中會自動 track effect 內用到的狀態，不需要明確定義依賴
watchEffect(() => {
    console.log(state.name);
});

// 後續更新狀態時，自動觸發 Proxy setter 中綁定的對應屬性所有 effects
state.name = 'Kevin';
```

```javascript
// 暫存當前待追蹤 effects 的容器
const effectContainer = [];
// 追蹤對象的 effects mapping 容器
const trackMap = new WeakMap();

function track(target, key) {
  const effect = effectContainer.at(-1);
  if (effect) {
    let depsMap = trackMap.get(target);
    if (!depsMap) {
      trackMap.set(target, (depsMap = new Map()));
    }
    let dep = depsMap.get(key);
    if (!dep) {
      depsMap.set(key, (dep = new Set()));
    }
    if (!dep.has(effect)) {
      dep.add(effect);
    }
  }
}

function trigger(target, key) {
  const depsMap = trackMap.get(target);
  if (!depsMap) return;
  const effects = depsMap.get(key);
  if (effects) {
    effects.forEach((effect) => effect());
  }
}

function reactive(target) {
    return new Proxy(target, {
        // 當狀態被 access 時，自動追蹤依賴並儲存起來
        get(obj, key) {
            track(obj, key);
            return typeof obj[key] === 'object'
                ? reactive(obj[key])
                : Reflect.get(target, key)
        },
        // 當狀態被 update 時，自動觸發依賴更新
        set(obj, key, newVal) {
            const t = Reflect.set(obj, key, newVal);
            trigger(obj, key);
            return t;
        }
    })
}

// effect 執行前會將動作先暫存起來，後續執行 side effect 時會自動綁定自己到對應的狀態上
// 結束後需要從暫存中移除
function runEffect(effect, fn) {
    try {
        effectContainer.push(effect);
        return fn();
    } finally {
        effectContainer.pop(effect);
    }
}

function watchEffect(fn) {
    const effect = () => runEffect(effect, fn);
    effect();
    return effect;
}
```

### React
- [ReactFiberHooks](https://github.com/facebook/react/blob/main/packages/react-reconciler/src/ReactFiberHooks.new.js)
```javascript
function App() {
    const [count, setCount] = useState(0);

    console.log('render', count);
    current = this;

    return {
        update() {
            setCount(c => c + 1);
            console.log('event scope: ', count);
        },
    };
}

const app1 = render(App);
const app2 = render(App);
app1.update();
app1.update();
app2.update();

app1.render();
app2.render();
```

```javascript
const CurrentDispatcher = {
    current: null,
};

const ContextOnlyDispatcher = {
    useState: throwInvalidHookError,
};

const HooksDispatcherOnMount = {
    useState: mountState,
};

const HooksDispatcherOnUpdate = {
    useState: updateState,
};

const Fiber = () => ({
    current: null,
    workInProgress: {
        alternate: null,
    },
});

let currentlyRenderingFiber = null;
let currentHook = null;
let workInProgressHook = null;

function throwInvalidHookError() {
    throw Error('Invalid hook call.');
}

function render(Component) {
    const fiber = Fiber();
    const { current, workInProgress } = fiber;
    const children = renderWithHooks(current, workInProgress, Component);
    fiber.current = children;
    return {
        render() {
            const { current, workInProgress } = fiber;
            return renderWithHooks(current, workInProgress, Component);
        },
        ...children,
    };
}

function renderWithHooks(current, workInProgress, Component) {
    currentlyRenderingFiber = workInProgress;

    // 重置 hooks 狀態
    workInProgress.memoizedState = null;
    workInProgress.updateQueue = null;

    // 根據 current 存在判斷處於 mount, update 階段，給予 dispatcher
    CurrentDispatcher.current = current === null
        ? HooksDispatcherOnMount
        : HooksDispatcherOnUpdate;

    // 實際調用執行 functional 組件
    const children = Component();

    // 組件 hooks 執行結束，替換 dispatcher
    CurrentDispatcher.current = ContextOnlyDispatcher;

    // 重置全局共用狀態
    currentlyRenderingFiber = null;
    currentHook = null;
    workInProgressHook = null;

    return children;
}

function mountWorkInProgressHook() {
    const hook = {
        memoizedState: null,
        queue: null,
        next: null,
    };
    // mount 組件內第一個 hook
    if (workInProgressHook === null) {
        currentlyRenderingFiber.memoizedState = workInProgressHook = hook;
        // 這一步用來補全 fiber 紀錄的 alternate 屬性用於後續 update
        // https://github.com/facebook/react/blob/main/packages/react-reconciler/src/ReactFiberHooks.new.js#L664
        currentlyRenderingFiber.alternate = {
            memoizedState: hook,
        };
    } else {
        // 首先將當前 workInProgressHook.next 設為新的 hook
        // 接著替換 workInProgressHook 為此新 hook 接續下去
        workInProgressHook = workInProgressHook.next = hook;
    }

    return workInProgressHook;
}

function updateWorkInProgressHook() {
    let nextCurrentHook;
    if (currentHook === null) {
        const current = currentlyRenderingFiber.alternate.memoizedState;
        if (current !== null) {
            nextCurrentHook = current;
        } else {
            nextCurrentHook = null;
        }
    } else {
        nextCurrentHook = currentHook.next;
    }

    currentHook = nextCurrentHook;
    const newHook = {
        memoizedState: currentHook.memoizedState,
        queue: currentHook.queue,
        next: null,
    };
    // update 組件內第一個 hook
    if (workInProgressHook === null) {
        currentlyRenderingFiber.memoizedState = workInProgressHook = newHook;
    } else {
        workInProgressHook = workInProgressHook.next = newHook;
    }
    return workInProgressHook;
}

function dispatchAction(fiber, queue, action) {
    const update = {
        action,
        next: null,
    };
    const pending = queue.pending;
    // hook first update
    if (pending === null) {
        update.next = update;
    } else {
        update.next = pending.next;
        pending.next = update;
    }
    queue.pending = update;
}

function mountState(initialState) {
    const hook = mountWorkInProgressHook();
    if (typeof initialState === 'function') {
        initialState = initialState();
    }
    hook.memoizedState = initialState;
    const queue = (hook.queue = {
        pending: null,
        dispatch: null,
        lastRenderedState: initialState,
    });

    const dispatch = (queue.dispatch = (dispatchAction.bind(
        null,
        currentlyRenderingFiber,
        queue,
    )));
    return [hook.memoizedState, dispatch];
}

function updateState() {
    const hook = updateWorkInProgressHook();
    const queue = hook.queue;
    const pendingQueue = queue.pending;

    let first = pendingQueue.next;
    var state = hook.memoizedState;
    var update = first;

    do {
        const action = update.action;
        state = typeof action === 'function' ? action(state) : action;
        update = update.next;
    } while (update !== null && update !== first);

    hook.memoizedState = state;

    const dispatch = queue.dispatch
    return [hook.memoizedState, dispatch];
}

function useState(initialState) {
    const dispatcher = CurrentDispatcher.current;
    return dispatcher.useState(initialState);
}

function useEffect(fn, deps) {
    const dispatcher = CurrentDispatcher.current;
    return dispatcher.useEffect(fn, deps);
}
```
