# Prototype Pattern

<SocialBlock hashtags="design,pattern,prototype" />

## 前言
大家好，我是 Johnny，今天要紀錄分享的是 Patterns 筆記系列的 `Prototype Pattern`

## 介紹
Prototype 模式（原型）是一種在多個對象中彼此共享屬性類型的開發方式，prototype 本身在 Javascript 中是一個內建的對象，並且並且能夠讓對象透過 prototype chain（原型鍊）獲取、觸及到。

以下是一個 ES6 class 創建的 Dog 類型
```js
class Dog {
  constructor(name) {
    this.name = name;
  }

  bark() {
    return `Woof!`;
  }
}
```
其中 `constructor` 中文稱作「建構器」，此方法是「初始化」實例的過程，每次呼叫 `new` 進行創建一個新的實例時都會執行一次，而範例中透過 ES6 建立的類型，所有在 class 上掛載的屬性會直接綁定在 `prototype` 上，以下是兩種獲取類型本身或是實例上的 prototype 方法
```js
console.log(Dog.prototype);
// constructor: ƒ Dog(name, breed) bark: ƒ bark()

console.log(dog1.__proto__);
// constructor: ƒ Dog(name, breed) bark: ƒ bark()
```
其中實例上的 `__proto__` 只是一個 reference 指向到原類型的 `prototype`，當我們試圖在實例對象上獲取某不存在的屬性時，就會沿著原型鍊逐層查找

### 繼承
另一個在原型鍊中重要的觀念是「繼承」，方便我們直接將現有的類型進行擴展使用，以下我們建立一個新的 `SuperDog` 類型，讓其繼承自 `Dog`，我們就可以在現有的 Dog 上加入新的功能 `fly`，使 `SuperDog` 實例同時具備 `bark`, `fly` 功能
```js
class SuperDog extends Dog {
  constructor(name) {
    super(name);
  }

  fly() {
    return "Flying!";
  }
}
```
當我們建立了一個 superdog 實例後，其原型鍊關係如下圖
![](https://www.patterns.dev/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fddxwdqwkr%2Fimage%2Fupload%2Ff_auto%2Fv1609056523%2Fpatterns.dev%2FScreen_Shot_2020-12-24_at_1.09.36_PM_isgkmt.png&w=3840&q=75)


### Object.create
另一個關於 prototype 實用的 javascript 方法是 `Object.create`，我們可以透過這個方法快速產生一個指定 prototype 的物件
```js
// 我們定義的 prototype 對象
const dog = {
  bark() {
    return `Woof!`;
  },
};

// 建立一個 pet1 對象，並將其 __proto__ 指向我們的 dog prototype
const pet1 = Object.create(dog);

pet1.bark(); // Woof!

// 打印屬性試試
console.log("pet1 本身的屬性: ", Object.keys(pet1));
console.log("pet1 原型對象上的屬性: ", Object.keys(pet1.__proto__));
```
透過此方法，雖然 `pet1` 本身沒有任何屬性方法，但因為其被指定了 prototype 為 dog 物件，我們依然能夠在其上調用 dog 上的 `bark` 方法


<SocialBlock hashtags="design,pattern,prototype" />

## 結論
透過原型鍊在對象上共用屬性，避免創建許多重複的資料、方法等等，造成記憶體的浪費，實作上算是一個蠻常使用到的基礎模式，推薦詳細往下鑽研閱讀 [MDN 繼承與原型鏈](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Inheritance_and_the_prototype_chain)，今天就分享到這拉，感謝收看 =V=~~
