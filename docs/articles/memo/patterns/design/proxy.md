# Proxy Pattern

<SocialBlock hashtags="design,pattern,proxy" />

## 前言
大家好，我是 Johnny，今天要紀錄分享的是 Patterns 筆記系列的 `Proxy Pattern`


## 介紹
所謂 Proxy 即是代理，而 Proxy Pattern 討論到對物件進行代理，我們不直接對目標進行操作，而是透過代理間接來操作目標，而透過代理可以讓我們對於物件的操作能力進一步提升，比如常見基本的取值、賦值動作等

假設我們有一個物件
```js
const person = {
  name: "John Doe",
  age: 42,
  nationality: "American"
};
```
在 javascript 中透過 `Proxy` 操作，可以把目標物件作為目標後，產生一個代理物件
```js
const person = {
  name: "John Doe",
  age: 42,
  nationality: "American"
};
// 給定一個目標，產生出一個代理物件
const personProxy = new Proxy(person, {});
```
其中 `Proxy` 類的第二個參數代表 `handler`，我們可以在其中去定義「對物件的特定操作」進行類似監聽的行為，雖然可以在 handler 內定義的動作類別非常多，最常用的還是 `get`, `set` 這兩個，其中 `get` 在我們對物件取值時觸發，`set` 則是賦值時觸發，下面是一個基本的範例

```js
const personProxy = new Proxy(person, {
  get(obj, prop) {
    console.log(`屬性 ${prop} 的值是 ${obj[prop]}`);
  },
  set(obj, prop, value) {
    console.log(`屬性 ${prop} 從 ${obj[prop]} 變更為 ${value}`);
    obj[prop] = value;
    return true;
  },
});

const name = personProxy.name; // 屬性 name 的值是 John Doe
personProxy.age = 43; // 屬性 age 從 42 變更為 43
console.log(name); // undefined
```

## 常見用途

### Validation 驗證
一個常見的 Proxy 用途是對於物件中某些值的驗證，比如下面這樣
```js
const personProxy = new Proxy(person, {
  get: (obj, prop) => {
    if (!obj[prop]) {
      console.log("Oops.. 該屬性似乎不存在於此物件中");
    } else {
      console.log(`屬性 ${prop} 的值是 ${obj[prop]}`);
    }
  },
  set: (obj, prop, value) => {
    if (prop === "age" && typeof value !== "number") {
      console.log(`屬性 age 必須是 number`);
    } else if (prop === "name" && value.length < 2) {
      console.log(`請提供一個合法的名子`);
    } else {
      console.log(`屬性 ${prop} 從 ${obj[prop]} 變更為 ${value}.`);
      obj[prop] = value;
    }
  }
});
```


## Reflect
Javascript 中提供了一個原生物件 `Reflect`，透過他我們可以更方便的對物件進行 Proxy 操作，在過去我們必須自己對 obj 進行系列操作，而 `Reflect` 則提供了與 Proxy 中我們使用的方法相同的方法名稱，比如 `Reflect.get()`,  `Reflect.set()`，並且接收相同的 Props，如此我們就不用自己對原來的一些物件操作進行手動處理，透過 `Reflect` 可以快速做到我們對原本物件的操作行為
```js
const personProxy = new Proxy(person, {
  get: (obj, prop) => {
    console.log(`屬性 ${prop} 的值是 ${Reflect.get(obj, prop)}`);
  },
  set: (obj, prop, value) => {
    console.log(`屬性 ${prop} 從 ${obj[prop]} 變更為 ${value}`);
    Reflect.set(obj, prop, value);
  }
});
```


## Vue Proxy Reactive
相信前端工程師都知道 Vue 框架，而 Vue3.x 實際上也使用到了 Proxy Pattern 在核心的響應式模組當中，當我們在對 vue 的響應式物件取值、賦值時，實際是對代理的物件進行操作，而 Vue 則替我們在 Proxy 物件中定義一系列的魔術操作，簡化後可以簡單表現如下：（詳細可以參考我的 [Vue 源碼解析相關文章](https://johnnywang1994.github.io/book/articles/js/vue-dep-tracking-2020.html)）
```js
const original = {
  msg: 'Good morning',
};

const deps = {};

function appendDep() {}
function triggerDep() {}

function reactive(target) {
  return new Proxy(target, {
    get: (obj, prop) => {
      // 添加對象依賴
      appendDep(obj, prop);
      return Reflect.get(obj, prop);
    },
    set: (obj, prop, value) => {
      Reflect.set(obj, prop);
      // 觸發依賴更新
      triggerDep(obj, prop);
      return true;
    },
  })
}
```

<SocialBlock hashtags="design,pattern,proxy" />

## 結論
Proxy Pattern 是一個很強大的模式，除了可以用在檢驗值以外，甚至格式、通知、除錯都有相應的應用場景，但同樣的，能力越強責任越大，雖然他很強大，但過度使用呼叫 Proxy handler 也很容易造成應用程式的效能問題，使用上需要謹慎使用，避免過度添加 handler 導致程式崩潰

感謝收看，下一篇見拉～