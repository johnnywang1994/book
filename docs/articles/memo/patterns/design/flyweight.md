# Flyweight Pattern

<SocialBlock hashtags="design,pattern,flyweight" />


## 前言
大家好，我是 Johnny，今天要紀錄分享的是 Patterns 筆記系列的 `Flyweight Pattern`


## 介紹
`Flyweight Pattern` 是一種在創建大量相似物件時，節省記憶體空間的有效模式。

以下舉例假設我們有個需求，需要建立一個名為 iPhone 的類別，並且透過該類別我們可以產生包含各 iphone 機型資訊的物件
```js
class IPhone {
  constructor(version, memory, isbn) {
    this.version = version;
    this.memory = memory;
    this.isbn = isbn;
  }
}
```
通常情況下，我們希望在相同的 ISBN 編號的情況下，不會重複產生一次相同的 iphone 實例，因此我們透過一個 `createIphone` 方法來創建，並在其中判定該編號是否已經存在，若存在則直接使用之前創建過的物件
```js
const iphones = new Map();

const createIphone = (version, memory, isbn) => {
  const existingIphone = iphones.has(isbn);

  if (existingIphone) {
    return iphones.get(isbn);
  }

  const iphone = new IPhone(version, memory, isbn);
  iphones.set(isbn, iphone);

  return iphone;
};
```

通常情況下這麼做確實可以避免重複創建相同的實例，但對於 iphone 的 `version`, `memory` 等屬性，我們還是會不斷重複創建相同的內容在不同的實例上，也就會導致記憶體持續被佔用，為了避免這種 `共用屬性的重複創建` 狀況，我們可以改寫如下

```js
class IphoneFlyweight {
  constructor(version, memory) {
    this.version = version;
    this.memory = memory;
  }
}

const iphoneFlyweightFactory = (() => {
  const caches = new Map();

  return {
    get(version, memory) {
      const key = `${version}-${memory}`;
      if (!caches.has(key)) {
        caches.set(key, new IphoneFlyweight(version, memory));
      }
      return caches.get(key);
    },
  };
})();

class IPhone {
  constructor(version, memory, isbn) {
    this.type = iphoneFlyweightFactory.get(version, memory);
    this.isbn = isbn;
  }
}
```
透過把共用的一些公共屬性拉出管理，進一步節省整體記憶體的消耗量，也讓每個創建的物件得到最大程度的覆用，改寫後即使我們連續創建 5 台 iphoneX 128g，也不會在每個物件裡產生多餘的重複屬性佔用記憶體空間了
```js
const iphoneX_1 = createIphone('X', '128g', 'x-22345');
const iphoneX_2 = createIphone('X', '128g', 'x-32345');
createIphone('X', '128g', 'x-42345');
createIphone('X', '128g', 'x-52345');
createIphone('X', '128g', 'x-62345');

console.log(iphoneX_1.type === iphoneX_2.type);
// true
```

<SocialBlock hashtags="design,pattern,flyweight" />

## 結論
`Flyweight Pattern` 對於應付容易造成 RAM 資源耗盡的，大量創建物件場景很好用，可有效降低佔用的記憶體空間，上面的範例只是方便展示，實際在 Javascript 中也可以很容易透過 [prototypal inheritance](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain) 來實現，然而隨著現代 RAM 的空間動輒到 GB 等級，使得 `Flyweight Pattern` 漸漸不是這麼地被重視與重要了

今天分享就到這邊，下篇見拉～