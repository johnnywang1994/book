# Mixin Pattern

<SocialBlock hashtags="design,pattern,mixin" />

## 前言
大家好，我是 Johnny，今天要紀錄分享的是 Patterns 筆記系列的 `Mixin Pattern`

## 介紹
Mixin 模式是一種讓我們不透過「繼承」，在另一個類別或對象上添加屬性、方法的開發方式，而 mixin 本身無法直接使用，假設我們有個 `Dog` 類別定義如下
```js
class Dog {
  constructor(name) {
    this.name = name;
  }
}
```
我們希望此類別不只是只有一個 name 屬性，一種方法是直接添加在目標上，但這邊我們透過建立一個如下 mixin 對象
```js
const dogFunctionality = {
  bark: () => console.log("Woof!"),
  wagTail: () => console.log("Wagging my tail!"),
  play: () => console.log("Playing!"),
};
```
透過 `Object.assign` 方法，我們可以手動將 dogFunctionality mixin 上的屬性方法添加到 `Dog` 類別的 prototype 上
```js
class Dog {
  constructor(name) {
    this.name = name;
  }
}

const dogFunctionality = {
  bark: () => console.log("Woof!"),
  wagTail: () => console.log("Wagging my tail!"),
  play: () => console.log("Playing!"),
};

// 把 dogFunctionality 上的方法添加到 Dog prototype
Object.assign(Dog.prototype, dogFunctionality);
```
接著我們就可以在 Dog 實例上，快樂的調用 mixin 中添加的功能摟
```js
const pet1 = new Dog("Daisy");

pet1.name; // Daisy
pet1.bark(); // Woof!
pet1.play(); // Playing!
```

### mixin 繼承
雖然 mixin 不是透過繼承添加功能，但 mixin 對象本身可以繼承功能自另一個 mixin！～注意下面有兩種方法，擇一就好
```js
const animalFunctionality = {
  walk: () => console.log("Walking!"),
  sleep: () => console.log("Sleeping!"),
};

const dogFunctionality = {
  bark: () => console.log("Woof!"),
  wagTail: () => console.log("Wagging my tail!"),
  play: () => console.log("Playing!"),
  walk() {
    super.walk();
  },
  sleep() {
    super.sleep();
  },
  // 1. add to __proto__
  __proto__: animalFunctionality,
};

// 2. add animalFunctionality to dogFunctionality
Object.assign(dogFunctionality, animalFunctionality);
Object.assign(Dog.prototype, dogFunctionality);
```
我們添加一個 `animalFunctionality` mixin，並讓 `dogFunctionality` 去繼承它，接著我們就可以在 `Dog` 實例上調用摟！～
```js
const pet1 = new Dog("Daisy");

console.log(pet1.name);
pet1.bark();
pet1.play();
pet1.walk();
pet1.sleep();
```

<SocialBlock hashtags="design,pattern,mixin" />

## 結論
### 優點
添加功能非常方便，以非破壞性、無結構層級關係的方式添加

### 缺點
- 隱式依賴：因為 mixin 是在「其他某處」把功能加上，很容易導致依賴不容易被發覺與查找，導致後續維護上的麻煩
- 名稱衝突：因為 mixin 在添加功能時不會明確比對功能名稱，也容易導致各 mixin 間的功能因為衝突而導致預期外的錯誤發生
- 依賴複雜度：因為 mixin 太容易添加功能，也容易導致過度添加依賴而快速增大程式的複雜度

雖然 mixin 看似很方便，但其實其中暗藏許多陷阱，以至於許多知名框架都棄用了這種開發模式，今天就分享到這拉，下一篇見～～