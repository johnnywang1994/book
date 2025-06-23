# Factory Pattern

<SocialBlock hashtags="design,pattern,factory" />

## 前言
大家好，我是 Johnny，今天要紀錄分享的是 Patterns 筆記系列的 `Factory Pattern`


## 介紹
`Factory Pattern` 是指我們可以使用一個 factory 函數來創建新物件，而不透過 `new` 關鍵字，一個最簡單的範例如下
```js
const createUser = ({ firstName, lastName, email }) => ({
  firstName,
  lastName,
  email,
  fullName() {
    return `${this.firstName} ${this.lastName}`;
  }
});
```
透過實作一個 factory 函數，讓我們能快速創建許多包含相同屬性的物件，增加程式碼的覆用和組織能力

但在 javascript 中，工廠模式主要描述一個不使用 new 關鍵字返回物件的函數，但在許多狀況下，創建新的 instance 比每次創建新的 object 更能節省內存空間


## 延伸學習
上面的範例主要偏向於簡單工廠的基本介紹，當我們今天要新增一個類別時必須不斷修改我們的類別工廠，根據 SOLID 中的開放封閉原則，我們希望添加類別時不必每次都修改我們的工廠邏輯，因此實際工廠模式又可以延伸出 `工廠方法`、`抽象工廠` 兩種

### 簡單工廠
以下是一個簡單工廠的範例，透過 `PersonFactory` 我們可以建構不同類別的物件，但每次添加新類別時都必須實際修改我們的工廠方法
```js
class FatPerson {
  constructor() {
    this.intro = '體重過重的人';
  }

  getSick() {
    console.log('糖尿病、高血壓、中風、腎結石、痛風');
  }
}

class SlimPerson {
  constructor() {
    this.intro = '苗條的人';
  }

  getSick() {
    console.log('貧血、骨折、內出血、低血壓、暈厥');
  }
}

class NormalPerson {
  constructor() {
    this.intro = '健康的正常人';
  }

  getSick() {
    console.log('無特殊好發疾病');
  }
}

// 工廠方法
var PersonFactory = function(type) {
  switch (type) {
    case 'fat':
      return new FatPerson();
    case 'slim':
      return new SlimPerson();
    default:
      return new NormalPerson();
  }
}
```

### 工廠方法
透過預先製作工廠方法的方式，把實際建構的實作流程轉讓出去，假設我們在開發一款遊戲，正在實作一個創建角色物件的工廠方法，實際範例如下
```js
// 工廠方法
class CharacterFactory {
  createCharacter() {
    throw new Error('此方法僅供繼承使用，不能直接調用');
  }
}

class MapCharacterFactory extends CharacterFactory {
  createCharacter(type) {
    if (type === 'sword') {
      return new SwordsMan();
    } else if (type === 'magic') {
      return new MagicMan();
    }
  }
}

// 物件類別
class Character {
  getName() {
    throw new Error('此方法僅供繼承使用，不能直接調用');
  }
}

class SwordsMan extends Character {
  getName() {
    console.log('我是拿劍的勇士');
  }
}

class MagicMan extends Character {
  getName() {
    console.log('我是拿法杖的勇士');
  }
}
```
上方的範例可以讓我們不斷創建新的 MapCharacterFactory 繼承類別，而不必再直接修改我們的 `CharacterFactory` 工廠


### 抽象工廠
上面的工廠方法已經可以解決大部分場景問題，但如果今天我們要設計一款，根據遊戲地圖不同，可以選用的角色也不同的需求時，上面的工廠方法就會變得難以調整，可能必須直接複製整份修改，此時我們可以把整個工廠方法抽象化，提升整個架構的覆用能力
```js
// 物件類別，與上方工廠方法相同
class Character {
  getName() {
    throw new Error('此方法僅供繼承使用，不能直接調用');
  }
}

class SwordsMan extends Character {
  getName() {
    console.log('我是拿劍的勇士');
  }
}

class MagicMan extends Character {
  getName() {
    console.log('我是拿法杖的勇士');
  }
}

// 新增 Enemy 類別
class Enemy {
  attack() {
    throw new Error('此方法僅供繼承使用，不能直接調用');
  }
}

class Dog extends Enemy {
  attack() {
    console.log('瘋狗咬人拉！');
  }
}

// 抽象工廠類別
class MapFactory {
  createCharacter() {
    throw new Error('此方法僅供繼承使用，不能直接調用');
  }
  createEnemy() {
    throw new Error('此方法僅供繼承使用，不能直接調用');
  }
}

// 實作地圖的相關功能
class NewYorkFactory extends MapFactory {
  createCharacter(type) {
    if (type === 'sword') {
      return new SwordsMan();
    } else if (type === 'magic') {
      return new MagicMan();
    }
  }
  createEnemy(type) {
    if (type === 'dog') {
      return new Dog();
    }
  }
}
```
此時如果我們要開發另一張全新地圖的角色工廠，可以直接繼承並創建一個專屬於該地圖的整套功能，而不必東拼西湊，並且當後續需要添加功能時，也可以在各地圖中自由調整不影響到整個抽象工廠，解決了工廠方法的缺點

<SocialBlock hashtags="design,pattern,factory" />

## 結論
工廠模式非常吃重 OOP 的開發思考跟經驗，以結論來說，工廠模式幫助開發者更好地管理與建構關聯性物件的能力，讓物件之間的關係可以用相對有規範，卻保持一定彈性的模式運行，但也須注意工廠模式盡量不要超過 3 層，隨著繼承的層次增加，將會顯著的增加開發、除錯難度

今天就先介紹到這拉～感謝大家收看，下篇再見拉！=V=
