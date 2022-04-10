# Vuex 學習筆記

<SocialBlock hashtags="vuejs,vuex" />

本篇是我的對 Vue2 時期的 Vuex 學習筆記，會與 Redux 做比較，互相比對增加記憶效果。



## Store, State 的建立

首先講講建立store 的方式，先說 Redux：

```js
import { createStore } from 'redux'

const todoStore = createStore(reducer, initState);
```

Vuex：

```js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  // ...
})
```

Redux 是使用 reducer 去創建不同的 store，並分開維護管理每個 store。

Vuex 的 mutations 就是 Redux 的 reducer，裡面的 mutation 其實就是 reducer 裡判斷的 action type，state 就是 createStore 的第二個參數，也就是初始化的 InitState。



## Getters

接收兩個參數處理：

1. state: 局部 state

2. getters: 局部 getters

```js
const store = new Vuex.Store({
  state: {
    name: 'Johnny',
    age: 30
  },
  getters: {
    info: (state, getters) => {
      return state.name + ' ' + state.age;
    }
  }
});
```



## Reducer 與 Mutations

基本上兩者是一樣的東西，都是根據傳入的action去進行行為。

並且也都建議不要直接對原 state 操作，而是透過創建新對象處理，並最後覆蓋舊的。

```js
// Redux Reducer
import { createStore } from 'redux'

const reducer = (state, action) => {
  const newTodos = [...state.todos]; // 以新對象取代舊對象，後續都操作新對象，而不直接動舊對象，todos 是個數組

  switch (action.type) {
    case 'add_item':
      newTodos.push(action.text);
      state.todos = newTodos;
    case 'del_item':
      newTodos.splice(action.index, 1);
      state.todos = newTodos;
    default:
      return state;
  }
}

const store = createStore(reducer, []);

// Vuex Mutations
// 其實對象以外的東西可以直接修改，但不直接修改舊對象是個好習慣...
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const mutations = {
  add_item(state, action) {
    const newTodos = [...state.todos];
    newTodos.push(action.text);
    state.todos = newTodos;
  },
  del_item(state, action) {
    const newTodos = [...state.todos];
    newTodos.splice(action.index, 1);
    state.todos = newTodos;
  }
};

const store = new Vuex.Store({
  mutations
})
```



## 觸發修改 state

觸發方面，Redux 是使用 store.dispatch(action) 的方式：

將 action 丟給 初始化的 reducer 去依照 type 判斷處理動作。

```js
todoStore.dispatch({
  type: 'add_item',
  amount: 10
});
```

Vuex 則是使用 store.commit(action) 或在組建中的 this.$store.commit(action) 來去做處理，

而 Vuex 也可以用字串方式選擇取用 mutation：

```js
store.commit({
  type: 'add_item',
  amount: 10
});

// OR

store.commit('add_item', {
  amount: 10
});
```



## Mutations VS. Actions 

前者導致的所有狀態變更都必須在呼叫後結束，意即同步動作。

若需使用非同步調用，請使用後者。

前面講到觸發調用修改 state 時，redux 使用 dispatch(action) 的方式，其實在 Vuex 中也可以。

調用 Vuex 的 Actions 的方式跟 Redux 一樣，使用 store.dispatch(mutation名稱, payload)。

```js
const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment (state) {
      state.count++
    }
  },
  actions: {
    increment(context, payload) {
      // 此處的 context 就是 store 本身的複製體
      // 因此也可以使用如 context.state, context.getters 之類的來獲取 state, getters
      context.commit('increment', payload)
    },
    // 可簡化為
    increment({ commit }, payload) {
      commit('increment', payload)
    }
  }
})
```

使用 Actions 的時機最常見的為，調用 API 的時候，需要同步處理資料，並判斷不同回應去處理不同的 mutation運作。

抑或是直接設定 Action 返回一個 Promise 對象，方便後續調用使用處理異步請求。



## Modules 模組分割

Vuex 允許分割模組，每個模組擁有自己的 state, mutations, getters, actions

```js
const moduleA = {
  state: { ... },
  mutations: { ... },
  actions: { ... },
  getters: { ... }
}

const moduleB = {
  state: { ... },
  mutations: { ... },
  actions: { ... }
}

const store = new Vuex.Store({
  modules: {
    a: moduleA,
    b: moduleB
  }
})

store.state.a // -> moduleA 的 state
store.state.b // -> moduleB 的 state
```

在模組中的getter 第三個參數指向 rootState

```js
const moduleA = {
  // ...
  getters: {
    sum: (state, getters, rootState) {
      // ...
    }
  }
}
```

合併的 store 可以直接取得各模組中的getters, mutations, actions 等，但對於模組內的 state 必須由

個別模組名稱進入取得，或是透過 getters 將模組內的資料暴露出去讀取，但只能讀，若需要修改模組內 state 

還是必須調用模組內的 mutations 或 actions。



## 目錄架構官方提醒

1. 應用層級的狀態應該集中到單個 store 對象中。

2. 提交 mutation 是更改狀態的唯一方法，並且這個過程是同步的。

3. 異步邏輯都應該封裝到action裡面。



## Input 使用 v-model 綁定 Vuex 數據

v-model 會試圖直接修改 obj.message，而不透過 mutation。

```html
<input v-model="obj.message">
```

使用 Vuex 思維處理，給 input 對象綁定 value，並監聽 input or change 事件調用 action 修改對應內容。

```html
<input :value="message" @input="updateMessage">
```

```js
// ...
computed: {
  ...mapState({
    message: state => state.obj.message
  })
},
methods: {
  updateMessage (e) {
    this.$store.commit('updateMessage', e.target.value)
  }
}
```

但這麼做不僅麻煩，更失去 v-model 的一些好用的效果，所以我們其實也可以使用 computed 計算屬性的getter, setter。

```html
<input v-model="message">
```

```js
// ...
computed: {
  message: {
    get () {
      return this.$store.state.obj.message
    },
    set (value) {
      this.$store.commit('updateMessage', value)
    }
  }
}
```

<SocialBlock hashtags="vuejs,vuex" />