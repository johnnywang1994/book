# Vuejs 依賴追蹤 2020 版

<SocialBlock hashtags="vue" />

過了一年，使用了下最新 vue-next 後覺得很神奇，剛好看到大神的實踐文章，動手實作後又有了新的想法，本篇是參考新版 Vue3 所製作，並以舊的 Vue2 `defineProperty` 來練習實作相似功能。原文出處是使用新的 Proxy 實作。（概念十分類似）


## Vue3.0 簡單介紹

開始之前先簡單講一下 Vue3.0，主要新增了許多底層 api 供使用者操作，用以構建更加複雜化與巨大的代碼，提升整體代碼的復用性之外，更大幅提升了對於 Typescript 的支持，甚至連效能方面對比於 Vue2 都呈指數型成長，程式碼的動靜差異部分越大，效能提升的越明顯。

其中新版的最主要響應式相關的 api 就是 `reactive`, `computed`, `ref` 等等概念，透過 `reactive` 可以建立一個類似於 Vue2 `data` 的響應式物件，還沒有摸過 Vue-next 的朋友們請先前往[這裡](https://v3.vuejs.org/)看看，對於下面要講的東西會比較好理解喔～

那麼開始吧！


## 物件追蹤 - reactive

首先實踐下 reactive 的部分：

```js
// 儲存已轉換的響應式對象
const proxyCache = new WeakMap();
// 儲存 effect 掛載之暫存
const effectCache = [];
// track 紀錄
const trackMap = new WeakMap();

function isObject(v) {
  return v !== null && typeof v === 'object';
}

function reactive(target) {
  return createReactive(target);
}

function createReactive(target) {
  // 檢查是否為可遍歷物件
  if (!isObject(target)) return target;
  // 檢查是否已是響應式物件
  let observed = proxyCache.get(target);
  if (observed) return target;
  // 遍歷對象
  Object.keys(target).forEach((key) => {
    defineReactive(target, key, target[key]);
  });
  proxyCache.set(target, true);
  return target;
}

function defineReactive(target, key, val) {
  // 遍歷子屬性
  createReactive(val);
  Object.defineProperty(target, key, {
    get() {
      console.log('Get', key);
      return val;
    },
    set(newVal) {
      val = newVal;
      console.log('Set', key);
      // 遍歷新值
      createReactive(val);
    },
  });
}
```

到這邊我們已經可以用 `reactive` 來建立一個響應式對象

```js
const data = reactive({
  name: 'Johnny',
});

console.log(data.name);
// Get name
// Johnny
data.name = 'Kevin';
// Set name
```


## 陣列處理 - Array

熟悉 Vue2 的朋友應該都知道，陣列在某些情況下修改會無法被追蹤到，這是因為我們無法在一開始知道後續會新增或刪除什麼序的緣故，這裡我們改寫對象數組的 `push` 方法以及加入一個 `set` 方法實現

```js
// 改寫數組 push 方法
function setArrayPush(arr, callback = () => {}) {
  Object.defineProperty(arr, 'push', {
    enumerable: false, // 隱藏屬性
    configurable: false,
    writable: false,
    value: function() {
      let n = this.length;
      for (let i = 0, l = arguments.length; i < l; i++, n++) {          
        this[n] = arguments[i];
        callback(this, n);
      }
      return n;
    }
  })
}

// set
// 其實就是剛剛上面的 defineReactive，僅進行接口友善化
function set(target, key, value) {
  return defineReactive(target, key, value);
}
```

然後稍微修改下我們的 `createReactive`

```js
function createReactive(target) {
  if (!isObject(target)) return target;
  let observed = proxyCache.get(target);
  if (observed) return target;
  // 對數組對象修改 push 方法
  if (Array.isArray(target)) {
    setArrayPush(target, function(arr, index) {
      defineReactive(arr, index, arr[index]);
    });
  }
  Object.keys(target).forEach((key) => {
    defineReactive(target, key, target[key]);
  });
  proxyCache.set(target, true);
  return target;
}
```

如此一來我們就可以追蹤到數組對象在 `push` 後新增的屬性摟～

```js
const arr = reactive([1, 2, 3]);
arr.push(4);
data[3] = 1;
// Set 3

set(arr, 3, 4);
arr[3] = 1;
// Set 3
```


## 黑魔法 - effect

Vue3 中最新出現的一個黑魔法函式 `effect`，內部調用的所有依賴會自動被追蹤，並且在改變時執行內部代碼塊。實現如下：

```js
function effect(fn) {
  const effect = createEffect(fn);
  // 調用一次，添加依賴
  effect();
  return effect;
}

function createEffect(fn) {
  const effect = function() {
    // 把自己 (effect) 傳進去掛載
    return runEffect(effect, fn);
  };
  return effect;
}

function runEffect(effect, fn) {
  try {
    // 掛載 effect
    effectCache.push(effect);
    // 添加 effect 到所有依賴中（藉由 reactive 對象屬性的 getter 進行 track)
    return fn();
  } finally {
    // 卸載 effect
    effectCache.pop(effect);
  }
}
```

接著要來實現 getter 掛載 effect 的 `track` 方法

```js
function track(target, key) {
  const effect = effectCache[effectCache.length - 1];
  // 檢查是否有掛載中的 effect
  if (effect) {
    let depsMap = trackMap.get(target);
    if (!depsMap) {
      trackMap.set(target, depsMap = new Map());
    }
    let dep = depsMap.get(key);
    if (!dep) {
      depsMap.set(key, dep = new Set());
    }
    if (!dep.has(effect)) {
      dep.add(effect);
    }
  }
}
```

接著實現 setter 中的 `trigger` 方法，執行對應儲存的所以 effect 

```js
function trigger(target, key) {
  const depsMap = trackMap.get(target);
  // 沒有依賴則結束
  if (!depsMap) return;
  const effects = depsMap.get(key);
  if (effects) {
    effects.forEach(effect => effect());
  }
}
```

最後修改下我們的 `defineReactive`的 getter/setter

```js
function defineReactive(target, key, val) {
  createReactive(val);
  Object.defineProperty(target, key, {
    get() {
      // 掛載 effect 到 target => key 的依賴
      track(target, key);
      return val;
    },
    set(newVal) {
      val = newVal;
      // 調用所有 key 的依賴 effects
      trigger(target, key);
      createReactive(val);
    },
  });
}
```

到這邊，我們可以用 effect 來建立響應式的代碼塊了，範例如下：

```js
const data = reactive([1, 2, 3]);
effect(() => {
  console.log('Effect: ', data[0]);
})
data[0] = 3;
// Effect: 1
// Effect: 3
```


## Computed

computed 的部分其實就是使用到上面完成的 effect 來實現，只是內部需要進行快取跟懶執行，也就是調用 n 次只取值一次，節省效能。

首先來完成 computed 主方法：

```js
function computed(getter) {
  let dirty = true;
  const runner = effect(getter, {
    // lazy 使 effect 不在建立時立即執行
    lazy: true,
    reset() {
      // 依賴改變時，僅執行 reset，不直接取值，當下次調用時才會懶加載取值
      dirty = true;
    }
  });
  let value = null;
  return {
    get value() {
      // 檢查依賴是否改變，未改變則不再取值
      if (dirty) {
        value = runner();
        dirty = false;
      }
      return value;
    }
  };
}
```

接著對應的修改下 `effect` 方法

```js
function effect(fn, options = { lazy: false }) {
  const effect = createEffect(fn);
  // 非懶加載時進行調用
  if (!options.lazy) {
    effect();
  }
  // 掛載 reset 方法到 effect 上，如此可一併被存到依賴之中
  // 後續調用時就不直接調用 effect，而是使用 reset 打開取值的開關
  effect.reset = options.reset;
  return effect;
}
```

最後在 trigger 中進行判斷

```js
function trigger(target, key) {
  const depsMap = trackMap.get(target);
  if (!depsMap) return;
  const effects = depsMap.get(key);
  if (effects) {
    effects.forEach(effect => {
      // 當有 reset 時進行調用，不直接執行 effect
      if (effect.reset) {
        effect.reset();
      } else {
        // 正常調用取值
        effect();
      }
    });
  }
}
```

到這其實已經完成主要的 computed 功能了，範例如下：

```js
const data = reactive({
  name: 'Johnny',
  age: 30
});

const info = computed(() => {
  console.log('Cache');
  return data.name + ' ' + data.age;
});
// 調用 n 次僅取值一次
console.log(info.value);
console.log(info.value);

// Cache
// Johnny 30
// Johnny 30
```

然後這邊就會發現一個問題，如果在 effect 之中使用到了 computed 會怎麼樣？

```js
const data = reactive({
  name: 'Johnny',
  age: 30
});

const info = computed(() => {
  console.log('Cache');
  return data.name + ' ' + data.age;
});

effect(() => {
  console.log('Get value: ', info.value);
});

data.name = 'Johnson';
// 這裡只會執行一次 Cache
```

這裡主要是因為我們 effect 回傳的 runner 在調用後，會將自己掛載到對應的屬性依賴中，但這邊的 `info` 並不是一個 reactive 的物件，他也是由另一個 effect 建立，實際需要添加的依賴應該是原來建立 `info` 這個 computed 中的所有依賴，也因此我們在 computed 的 value getter 中，必須略過原 runner，保留新建立的 effect 在依賴暫存中，並通過原來 computed 的 getter，將新的 effect 直接儲存到原來 getter 內的依賴上。

修改 computed 如下

```js
function computed(getter) {
  let initAttach = false; // 是否已首次取值
  let needCache = true; // 依賴值是否改變
  const runner = effect(getter, {
    lazy: true,
    computed: true,
    reset() {
      needCache = true;
    }
  });
  let value = null;
  return {
    get value() {
      // 取值時是否存在新的 effect，是的話表示此 computed 被用於該新的 effect 中
      const applyNewEffect = effectCache[effectCache.length-1];
      // 首次取值，runner 掛載當前 effect 到所有依賴中
      if (!initAttach) {
        runner()
        initAttach = true;
      // 後續取值，getter 掛載新的 effect 到所有依賴中（繞過 runner，避免掛載覆蓋）
      // 1. 掛載新 effect(將此 computed 對象用於其他 effect 中)
      // 2. 原依賴值改變(getter 內依賴值改變)
      }
      if (applyNewEffect || needCache) {
        value = getter();
        needCache = false;
      }
      return value;
    }
  };
}
```

對應改下 `effect` 跟 `trigger`

```js
function effect(fn, options = { lazy: false }) {
  const effect = createEffect(fn);
  if (!options.lazy) {
    effect();
  }
  effect.computed = options.computed;
  effect.reset = options.reset;
  return effect;
}

function trigger(target, key) {
  const depsMap = trackMap.get(target);
  if (!depsMap) return;
  const effects = depsMap.get(key);
  if (effects) {
    effects.forEach(effect => {
      if (effect.computed) {
        effect.reset();
      } else {
        effect();
      }
    });
  }
}
```

幾番修改後，現在在 effect 使用到 computed 也完全沒問題摟～

簡單使用如下：

```html
<div id="app"></div>
```

```js
const data = reactive({
  name: 'Johnny',
  age: 30,
});

const info = computed(() => {
  return data.name + ' ' + data.age;
});

effect(() => {
  document.getElementById('app').innerHTML = info.value;
});

setTimeout(() => {
  data.name = 'Johnson';
}, 2000);
```

以上就是這次學習的一點紀錄，希望有幫助到大家理解 Vue 的核心響應式原理，也歡迎有興趣的大大們指教瞜～＾＾，以上代碼都有放到我的個人 github 中筆記，也歡迎去看看～[@johnnywang/reactive](https://github.com/johnnywang1994/reactive)

文章參考：
1. [帶你了解 vue-next（Vue 3.0）之 爐火純青](https://juejin.im/post/6850418105500303367)

<SocialBlock hashtags="vue" />