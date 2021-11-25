# Pinia - Vuex 的後繼者

大家好，今天要來介紹一款 Vue 的 State Management 套件 - [Pinia](https://pinia.esm.dev/)，即將在不久的將來（或是已經）能夠取代 Vuex，為何這麼說呢？

## Pinia vs. Vuex

首先可以看看 [Pinia 官網對比 Vuex](https://pinia.esm.dev/introduction.html#comparison-with-vuex-3-x-4-x) 的簡要敘述如下

- 移除 Mutations
- Typescript 不再需要多餘的 types 來包裝
- 不再需要引入各種 magic string，直接引入函數，享受自動補全帶來的快樂
- 不再需要動態註冊模組，預設都是動態註冊
- 拋棄 Nested Module，在保持模組互相引入的前提下，採用 Flat Module，甚至可以進行 `circular dependencies` 讓兩模組互相調用（需注意可能產生無限迴圈）
- 無需 namespaced，所有模組都已自動 namespaced

看到這是不是很興奮！長久以來被詬病的 mutations 居然移除拉～其實作者就是經過多方的用戶回饋後決定這些改動，接下來一起來看看具體該怎麼用吧


## Install

1. 安裝 pinia

```bash
$ yarn add pinia
```

2. 創建 pinia

與 Vuex 不同，因為 pinia 是預設動態創建模組，我們可以先註冊完 app 後再來寫模組具體內容

**store/index.js**
```js
import { createPinia } from 'pinia';

// 創建 pinia
const pinia = createPinia();

export default pinia;
```

> 需注意，Vue2 使用時需要額外引入 `PiniaVuePlugin`，具體如下

```js
import { createPinia, PiniaVuePlugin } from 'pinia';

Vue.use(PiniaVuePlugin);
const pinia = createPinia();

export default pinia;
```

**main.js**
```js
import { createApp } from 'vue';
import App from './App.vue';
import pinia from './store';

const app = createApp(App);

// 綁定 pinia 到 app
app.use(pinia);

app.mount('#app');
```

Vue2 註冊方式則跟 vuex 相同

```js
import Vue from 'vue';
import App from './App.vue';
import pinia from './store';

new Vue({
  pinia,
  render: (h) => h(App),
}).$mount('#app');
```

3. 創建 Module

引入 `defineStore` 方法，Options 與 Vuex 除了 mutations 以外基本相同，包含 `state`, `getters`, `actions`

**store/main.js**

```js
import { defineStore } from 'pinia';

// 這邊 defineStore 會自動動態註冊模組，回傳值為 hook function
export const useStore = defineStore('Main', {
  // 注意 state 是一個 function，推薦使用 arrow function
  // 可幫助 typescript 更好進行類型推斷
  state: () => ({
    APILoading: false,
    counter: 1,
  }),
  getters: {},
  actions: {},
})
```


## Usage 組件內使用

這邊先以 vue3 為使用範例

### State

**App.vue**
```js
// 引入 defineStore 回傳的 hook
import { useStore } from './store/main';

export default {
  setup() {
    // store 物件是 reactive，注意不可直接解構
    const store = useStore();

    return {
      store,
    };
  },
}
```

#### **解構 store**
因為 store 是個 reactive 物件，如果需要解構，可使用 `storeToRefs` 進行解構

```js
import { storeToRefs } from 'pinia';
import { useStore } from './store/main';

export default {
  setup() {
    const store = useStore();

    // refs
    const { APILoading } = storeToRefs(store);

    return {
      APILoading,
    };
  },
}
```

#### **Options API Support**
引入 `mapState` 可以像 Vuex 一樣註冊到 options API，但不用 magic string，而是注入 hook function 即可

```js
import { mapState } from 'pinia';
// 引入 hook
import { useStore } from './store/main';

export default {
  computed: {
    // 可透過 this.counter 取得狀態
    ...mapState(useStore, ['counter']),
    // 與上方相同，但註冊為 this.storeCounter
    ...mapState(useStore, {
      storeCounter: 'counter',
      // 也可以 function 直接取得 store 進行複雜處理
      double: store => store.counter * 2,
      // 一樣可正確註冊，但 typescript 會無法正確自動推斷類型
      magicValue(store) {
        return store.someGetter + this.counter + this.double;
      },
    }),
  },
};
```

如果需要可在 store 外部改變 state 時（例如你在做表單），可以使用 `mapWritableState`，但無法使用 function 的方式註冊

```js
import { mapWritableState } from 'pinia';
import { useStore } from './store/main';

export default {
  computed: {
    // this.counter++
    ...mapWritableState(useStore, ['counter']),
  },
};
```

#### $patch 改動狀態
比起直接修改狀態，也可以透過 $patch 統一進行狀態修改

```js
store.$patch({
  counter: store.counter + 1,
})
// or
store.$patch((state) => {
  state.counter += 1;
})
```


### Getters

getters 與 Vuex 相同，第一個 args 為 state

```js
export const useStore = defineStore('main', {
  state: () => ({
    counter: 1,
  }),
  getters: {
    // 可用箭頭函數
    doubleCount: (state) => state.counter * 2,
    // this 指向 store 本身
    doubleCountPlusOne() {
      return this.doubleCount + 1;
    },
  },
});
```

組件內使用可直接透過 store 拿

```js
export default {
  setup() {
    const store = useStore();

    store.counter = 3
    store.doubleCount // 6
  }
}
```

#### **Options API Support**
一樣使用 `mapState` 在 options 中註冊 getters

```js
import { mapState } from 'pinia';
import { useStore } from './store/main';

export default {
  computed: {
    ...mapState(useStore, ['doubleCount']),
  },
}
```


### Actions

actions 就像組件中的 methods，且支援 async function，跟 state, getters 相同，透過 `this` 可以調用取得

```js
export const useStore = defineStore('main', {
  state: () => ({
    counter: 0,
  }),
  actions: {
    increment() {
      this.counter++;
    },
    randomizeCounter() {
      this.counter = Math.round(100 * Math.random());
    },
  },
})
```

#### **調用**

```js
import { useStore } from './store/main';

export default {
  setup() {
    const store = useStore();
    store.increment();
  },
}
```

#### **Options API Support**
與 Vuex 相同可透過 `mapActions` 註冊

```js
import { mapActions } from 'pinia';
import { useStore } from './store/main';

export default {
  methods: {
    ...mapActions(useStore, ['increment']),
  },
}
```

#### **Subscribe actions**
可使用 `$onAction` 監聽 action 的調用，詳細可參考[官方說明](https://pinia.esm.dev/core-concepts/actions.html#subscribing-to-actions)

```js
// 回傳 unsubscribe 函數
const unsubscribe = store.$onAction(({ name, after, onError }) => {
  if (name === 'increment') {
    const startTime = Date.now();

    // after 會在 action 調用完全返回後才執行
    // 會等待所有回傳的 promise
    after((result) => {
      console.log(
        `Finished "${name}" after ${
          Date.now() - startTime
        }ms.\nResult: ${result}.`
      );
    });

    // onError 會在 action 報錯時調用
    onError((error) => {
      console.warn(
        `Failed "${name}" after ${Date.now() - startTime}ms.\nError: ${error}.`
      )
    })
  }
})

// 可手動移除監聽
unsubscribe();
```

如果在組件中調用 $onAction，則預設會在組件 unmounted 時移除監聽，如果要維持不被移除，則可以傳入第二個參數為 `true`，則該 subscribe 將不被自動移除

```js
export default {
  setup() {
    const store = useStore()

    // 這個 subscription 在 component unmounted 後仍會被保持
    store.$onAction(callback, true)
  },
}
```



## Usage 組件外使用

組件外使用須特別注意調用時機，由於 pinia 的 store 完全依賴主核心 pinia 的安裝，需要確保所有 store hook 調用在 pinia 註冊在 app 後

```js
import pinia from 'pinia';
import { createApp } from 'vue';
import App from './App.vue';
import { useStore } from './store/main';

const pinia = createPinia();
const app = createApp(App);

// 先註冊
app.use(pinia);

// 後調用
const store = useStore();
```

但刻意處理這種調用時機是非常累人的，建議都一律在函數 function 中調用即可保證 pinia 正確安裝完成

```js
import { createRouter } from 'vue-router'

const router = createRouter({
  // ...
});

// X: 在函數外調用
const store = useStore();

router.beforeEach((to, from, next) => {
  // O: 在函數中調用
  const store = useStore();
})
```

### Circular Dependency
大部分場景下這是會爆掉的，但 pinia 讓兩個組件之間可以彼此調用，只是需要特別注意可能的 side effect，不要同時呼叫彼此具有依賴關係的 action, getter 就沒問題

**store/main.js**
```js
import { defineStore } from 'pinia';
import { useCount } from './count';

// X: 這裡呼叫 hook 會噴掉，因為 pinia 尚未註冊在 app 中
const Count = useCount();

export const useMain = defineStore('main', {
  state: () => ({
    name: 'Main',
  }),
  actions: {
    showName() {
      // O: 在 action 中調用
      const Count = useCount();
      Count.name; // Count
    },
  },
});
```

**store/count.js**
```js
import { defineStore } from 'pinia';
import { useMain } from './main';

export const useMain = defineStore('count', {
  state: () => ({
    name: 'Count'
  }),
  actions: {
    showName() {
      const Main = useMain();
      Main.name; // Main
    },
  },
});
```


## Composing Store
Pinia 建立模組的方式，除了傳統的 Vuex Options 模式外，還提供了原生 Vue3 的 Composition 模式

使用方式很簡單，把原本 Options 的參數改由 function 傳入，並在最後回傳所有東西即可，就像在組件中使用 setup 函數一樣，這種寫法提供了更為彈性的編寫風格，可以最大化狀態管理的靈活度，缺點也是顯而易見的，不當使用時是有可能會造成維護上寫法的混亂

```js
const useStore = defineStore('main', () => {
  const counter = ref(0);

  function increment() {
    counter.value += 1;
  }

  return {
    counter,
    increment,
  }
})
```

> 這種寫法需要特別注意當模組彼此調用時的情況

```js
const useA = defineStore('a', () => {
  const b = useB();

  // X: 此處會報錯，因為 b 裡也同時讀取了 a.name
  b.name;

  function showName() {
    // O: 在 actions 或 getters 中讀取是沒問題的
    const bName = b.name;
  }

  return {
    name: ref('I am A'),
  }
});

const useB = defineStore('b', () => {
  const a = useA();

  // X: 此處會報錯，因為 a 裡也同時讀取了 b.name
  a.name;

  return {
    name: ref('I am B'),
  }
});
```


以上就是本次開箱 Pinia 的主要功能，進入 v2.0.0 後內部引用 vue-demi 正式同時支援 Vue2, Vue3，雖然知名度尚不如目前 Vuex，但相信不久後 Pinia 將會正式被推薦取代 Vuex

下次見拉～=V=

