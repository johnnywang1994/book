# Singleton Pattern

<SocialBlock hashtags="design,pattern,singleton" />

## 前言
大家好，我是 Johnny，今天要紀錄分享的是 Patterns 筆記系列的 `Singleton Pattern`


## 介紹
Singletons 是一個可以初始化一次，通用於全局的類別。因其實例可以在整個程式中使用，故常常用於保存全局狀態。

> 從程式開始生命週期所創造的這一個實例，理論上到應用程式結束生命週期都只存在這一個


## 違反 Singleton 的 Counter
一個 singleton 類別只可以被初始化一次，兩個 counter 實例並不相同
```javascript
class Counter {
  getInstance() {
    return this;
  }
}

const counter1 = new Counter();
const counter2 = new Counter();

console.log(counter1.getInstance() === counter2.getInstance());
// false
```


## Pure Javascript 實現 Singleton
為了保證實例是唯一的，我們可以把初始化的實例對象和狀態保存在外部變數中，並透過 `Object.freeze` 鎖定我們實例的屬性避免被外部意外覆寫
```javascript
let instance;
let counter = 0;

class Counter {
  constructor() {
    if (instance) {
      throw new Error('You can only create one instance!');
    }
    instance = this;
  }

  getCount() {
    return counter;
  }

  increment() {
    return ++counter;
  }

  decrement() {
    return --counter;
  }

  getInstance() {
    return this;
  }
}

const singletonCounter = Object.freeze(new Counter());
export default singletonCounter;
```
但這麼寫也有缺點，我們必須把所有狀態移出類別定義，造成外部狀態的污染，為了避免這個狀況我們可以透過使用 [Private class features](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Private_class_fields)，把類別相關的狀態直接寫在類別中，並且對外部訪問進行阻絕，這個功能是目前原生 javascript 所支援的特性

改寫後如下
```javascript
class Counter {
  static #instance; // static 是靜態屬性，掛載於類別本身而不是實例，這裡為靜態隱私屬性
  #counter = 0;

  constructor() {
    if (Counter.#instance) {
      throw new Error('You can only create one instance!');
    }
    Counter.#instance = this;
  }

  getCount() {
    return this.#counter;
  }

  increment() {
    return ++this.#counter;
  }

  decrement() {
    return --this.#counter;
  }

  getInstance() {
    return Counter.#instance;
  }
}

const singletonCounter = Object.freeze(new Counter());
export default singletonCounter;
```
到此我們完成了一個 overkill 的搞笑 Counter...為何這麼說呢？我們繼續看下去


## 評價 Singleton
透過限制類別的初始化次數在 1 次，可以減少整體應用程式的記憶體使用量，然而 `Singleton` 可以被視為一種反模式，並且完全不必要在 Javascript 中使用。比起其他像是 C++, Java 等，必須先建立一個類別，再透過類別去建立對應的物件，我們在 Javascript 中我們完全可以直接建立一個物件使用。


## Javascript 中的物件
上面的例子在 Javascript 中完全過度複雜化了，畢竟透過 Javascript 可以非常快速地直接建立一個唯一的物件

```javascript
const singletonCounter = Object.freeze((() => {
  let counter = 0;

  const instance = {
    getCount() {
      return counter;
    },
    increment() {
      return ++counter;
    },
    decrement() {
      return --counter;
    },
  };

  return {
    get instance() {
      return instance;
    },
  };
})());

export default singletonCounter;
```
上面範例我們透過 IIFE 建立一個隔離外部環境的作用域，省略了多餘的手動初始化步驟，並將相關狀態保存於其中，而實例本身就直接被回傳出來，在 IIFE 執行完畢的同時，唯一的實例就已經被創建

換成這種寫法除了更直覺容易使用之外，也能夠更高度的客制化內部邏輯，畢竟 IIFE 內部就是單純的函數環境，而 class 類別則需要仰賴相關 feature 的支援度，相比之下 IIFE 在 Singleton 模式下的實現相容度、靈活度都大大提升


## Lazy Singleton
把上面範例改成懶加載，當沒有用到這個模組時節省記憶體用量
```javascript
const singletonCounter = Object.freeze((() => {
  let counter = 0;
  let instance;

  const initialize = () => {
    instance = {
      getCount() {
        return counter;
      },
      increment() {
        return ++counter;
      },
      decrement() {
        return --counter;
      },
    };
  };

  return {
    get instance() {
      if (!instance) {
        initialize();
      }
      return instance;
    },
  };
})());
```

<SocialBlock hashtags="design,pattern,singleton" />

## 結論
總結 Singleton Patterns 具有以下優點
- 節省記憶體空間的使用
- 避免重複初始化、釋放物件，提高效能
- 物件的唯一性，保證程式狀態的一致性

缺點如下
- 較難進行測試，狀態無法隔離
- 隱藏的狀態相依關係

綜合評斷來看，Singleton Pattern 適合用在狀態不可重複、條件變動較少的情境（測試情境不會出現太多情境，否則會較難測試），比如環境變數初始化、登入身份驗證（只有登入、登出兩種狀態）等等

感謝收看，下一篇見拉～
