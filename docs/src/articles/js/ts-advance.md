# TypeScript 進階篇

<SocialBlock hashtags="typescript,advance" />

此篇文章為看完阮一封前輩的教學後隨手筆記，供日後快速複習使用。


## 類型別名

用來給一個類型取新名子，常用於聯合類型

```ts
type Name = string;
type NameResolver = () => string;
type NameOrResolver = Name | NameResolver;

function getName(x: NameOrResolver) {
  if (typeof x === 'string') {
    return x;
  }
  return x();
}
```


## 字符串字面類型

限定取值只限於特定字串中的一個

```ts
type EventNames = 'click' | 'scroll' | 'mousemove';
function handleEvent(el: Element, event: EventNames) {
  // do something
}

handleEvent(document.getElementById('hello') as Element, 'scroll');
handleEvent(document.getElementById('hello') as Element, 'jump'); // error
```


## 元組

陣列合併了相同類型的對象，元組合併了不同類型的對象

  1. 訪問或修改已知索引的元素時，會得到正確的類型
  2. 初始化時必須包含所有內部元素，除非該元素為「可選」

```ts
const john: [string, number] = ['John', 30];
let kevin: [string, number?];

// 1.
john[0] = 'johnny dept';
john[1] = '100'; // error

// 2.
kevin = ['Kevin']; // 初始化有少東西也會報錯，這裡 age 是可選所以不會錯
```

### 越界

當新增超出原本元祖上限的元素時，它的型別會被限制為元組中每個型別的聯合型別

```ts
let tom: [string, number] = ['Tom', 25];
tom.push('male');
tom.push(true);
// 類型 'boolean' 的引數不可指派給類型 'string | number' 的參數。
```


## 類別 Class

由於類別主要基礎都跟 ES6 中的類別概念雷同，此不贅述，僅從 ES7 提案新的功能部分說明。

### 實例屬性
ES7 提案中可以直接在類別裡面定義實例屬性

```ts
class Animal {
  name = 'Jack';
}
```

### 靜態屬性 static

```ts
class Animal {
  static num = 42;
}
```

### 類別屬性定義

另外，TypeScript 可以使用三種訪問修飾符（Access Modifiers），分別是 public、private 和 protected。

  - `public` 修飾的屬性或方法是公有的，可以在任何地方被訪問到。（預設）
  - `private` 修飾的屬性或方法是私有的，不能在宣告它的類別的外部訪問
  - `protected` 修飾的屬性或方法是受保護的，和 private 類似，但在子類別中是允許被訪問的

```ts
class Animal {
  private name;
  public constructor(name) {
    this.name = name;
  }
}

let dog = new Animal('Cute');
console.log(dog.name); // 'name' 是私用屬性，只可從類別 'Animal' 中存取。
dog.name = 'Tom'; // 'name' 是私用屬性，只可從類別 'Animal' 中存取。
```

> 需注意 `private` 在編譯後的代碼中並沒有被限制，僅會在編譯時提示。

```js
// 編譯後
var Animal = /** @class */ (function () {
    function Animal(name) {
        this.name = name;
    }
    return Animal;
}());
var dog = new Animal('Cute');
console.log(dog.name); // Cute
dog.name = 'Tom';
```

  - `readonly` 只讀屬性關鍵字，只允許出現在屬性宣告或索引簽名中，若與其他訪問修飾符同時存在的話，需要寫在其後面。


### 抽象類別

`abstract` 用於定義抽象類別和其中的抽象方法，其不允許被實例化。

```ts
// 抽象類別，不允許被直接實例化
abstract class Animal {
  public name;
  public constructor(name) {
    this.name = name;
  }
  public abstract sayHi(); // 抽象方法，須在子類別中被定義
}

let a = new Animal('Jack'); // 無法建立抽象類別的執行個體。ts(2511)
```

```ts
class Cat extends Animal {
  public eat() {
    console.log(`${this.name} is eating.`);
  }
}

let cat = new Cat('Tom'); 
// 非抽象類別 'Cat' 未實作從類別 'Animal' 繼承而來的抽象成員 'sayHi'。ts(2515)
```

> 需注意，即使是`抽象類別，一樣會出現在編譯的結果當中`。



## 類別與介面 Class & interface

### 類別實現介面 class implements interface
有時候不同類別之間可以有一些共有的特性，這時候就可以把特性提取成介面（interfaces），並用 implements 關鍵字來讓類別實現。

假設我們有兩個客戶的模組都分別需要加入聊天室功能，這時就可以考慮將聊天室功能提取出去作為一個介面，讓兩個類別去實現它。

```ts
interface Chatroom {
  connect();
}

class Customer {}

class CustomA extends Customer implements Chatroom {
  connect() {
    console.log('welcome to A');
  }
}

class CustomB extends Customer implements Chatroom {
  connect() {
    console.log('welcome to B');
  }
}
```

一個類別可以實現多個介面：

```ts
interface Chatroom {
  connect();
}

interface Shop {
  buy();
}

class Customer {}

class Custom extends Customer implements Chatroom, Shop {
  connect() {
    console.log('welcome~');
  }
  buy() {
    console.log('buy successful');
  }
}
```

還有更多介面與類別之間的繼承方式[可見這裏](https://willh.gitbook.io/typescript-tutorial/advanced/class-and-interfaces#jie-mian-ji-cheng-jie-mian)



## 泛型

泛型（Generics）是指在定義函式、介面或類別的時候，不預先指定具體的型別，而在使用的時候再指定型別的一種特性。

### 基礎使用

舉個例子，我們需要製作一個產生相同內容的陣列函數：

```ts
function createArray(length: number, value: any): Array<any> {
  return Array(length).fill(value);
}
```

上面這段在編譯上完全不會有問題，但會有個明顯的缺陷，我們的 `value` 實際應該跟輸出的元素為相同型別，但卻沒有非常精確的進行匹配，而是用 `any` 取代。

此時我們來試試使用泛型：

```ts
function createArray<T>(length: number, value: T): Array<T> {
  return Array(length).fill(value);
}
```

上例中，我們在函式名後添加了 `<T>`，其中 `T` 用來指代任意輸入的型別，在後面的輸入 `value: T` 和輸出 `Array<T>` 中即可使用了。

接著在呼叫時，我們可以明確定義傳入的型別，或是什麼都不加完全依靠型別推論來推算。

```ts
createArray(3, 'x'); // ['x', 'x', 'x']
```

### 多型別

```ts
function swap<T, U>(tuple: [T, U]): [U, T] {
  return [tuple[1], tuple[0]];
}

swap([7, 'seven']); // ['seven', 7]
```


### 泛型約束
使用泛型變數的時候，由於事先不知道它是哪種型別，所以不能隨意的操作它的屬性或方法

```ts
function someFunc<T>(arg: T): T {
  console.log(arg.length);
  return arg;
}
// 類型 'T' 沒有屬性 'length'。ts(2339)
```

由於泛型 T 不一定包含屬性 `length`，編譯時會出錯。

此時我們可以對泛型進行約束，使用 `extends` 限制該泛型為包含 `length` 屬性的變數介面。

```ts
interface Lengthwise {
  length: number;
}

function someFunc<T extends Lengthwise>(arg: T): T {
  console.log(arg.length);
  return arg;
}

// 此時若呼叫時傳入參數不包含 length 則會報錯
loggingIdentity(7);
// 類型 'number' 的引數不可指派給類型 'Lengthwise' 的參數。ts(2345)
```


### 泛型介面
使用含有泛型的介面來定義函式的介面：

```ts
interface CreateArrayFunc {
  <T>(length: number, value: T): Array<T>;
}

let createArray: CreateArrayFunc;
createArray = function<T>(length: number, value: T): Array<T> {
  return Array(length).fill(value);
}

createArray(3, 'x');
```

甚至，我們可以把泛型引數提前到介面名上

```ts
interface CreateArrayFunc<T> {
  (length: number, value: T): Array<T>;
}

// 注意，此時需要給定介面 1 個型別引數
// 泛型類型 'CreateArrayFunc<T>' 需要 1 個型別引數。ts(2314)
let createArray: CreateArrayFunc<any>;
createArray = function<T>(length: number, value: T): Array<T> {
  return Array(length).fill(value);
}

createArray(3, 'x');
```


### 泛型引數的預設型別
在 TypeScript 2.3 以後，我們可以為泛型中的型別引數指定預設型別。

```ts
// 給定預設引數型別
interface CreateArrayFunc<T = any> {
  (length: number, value: T): Array<T>;
}

// 當沒有明確給定引數型別時，將以預設型別推算
let createArray: CreateArrayFunc;
createArray = function<T>(length: number, value: T): Array<T> {
  return Array(length).fill(value);
}

createArray(3, 'x');
```


## 常用技巧

### 提取變數型別

使用 `typeof` 提取變數型別

```ts
let a = 123;
let b = { x: 0, y: 1 };

type A = typeof a; // number
type B = typeof b; // { x: number, y: number }
```


### 綁定函數 this 指標
綁定函數 `this` 在第一個參數上，[詳見參考](https://www.typescriptlang.org/docs/handbook/functions.html#this)

> 此僅在編譯階段檢查，實際編譯後並不會綁定

```ts
const obj = {
  say(name: string) {
    console.log('Hello: ', name);
  },
};

function test(this: typeof obj, str: string) {
  console.log(this.say(str));
}
```


### 索引變數

```ts
interface A {
  [key: string]: any;
}

// in 表示遍歷，子屬性可包含 'a', 'b', 'c'，型別為: string
type B = {
  [key in 'a' | 'b' | 'c']: string;
}
```


### 內建類型
Typescript 有內建許多好用的類型供開發者直接使用

#### Record
產生一個 key: K, value: T 型別的對象類型

```ts
// keyof any 包含: string | number | symbol
type Record<K extends keyof any, T> = {
  [P in K]: T
}

const foo: Record<string, boolean> = {
  a: true
};

const bar: Record<'x' | 'y', number> = {
  x: 1,
  y: 2
};
```

#### Partial
使 T 的所有屬性為可選

```ts
type Partial<T> = {
  [P in keyof T]?: T[P]
}

interface Foo {
  a: string;
  b: number;
}

const foo: Partial<Foo> = {
  b: 2 // `a` 非必要
}
```


#### Required
與 Partial 相反，將所有 T 的屬性變為必要

#### Readonly
使 T 所有屬性變為只讀

#### Pick
從 T 中選擇一些屬性使用，該屬性來自於 K

```ts
type Pick<T, K extends keyof T> = {
  [P in K]: T[P]
}

interface Foo {
  a: string;
  b: number;
  c: boolean;
}

const foo: Pick<Foo, 'b' | 'c'> = {
  b: 1,
  c: false
};
```

#### Exclude
排除掉 T 中包含在 U 裡的類型

```ts
// 如果 T 是 U 的子類型，返回 never, 否則返回 T
type Exclude<T, U> = T extends U ? never : T

// 只能為 a, c
let foo: Exclude<'a' | 'b' | 'c', 'b'> = 'a'
foo = 'c'
```

#### Extract
與 Exclude 相反，提取 T 中能赋值给 U 的類型

```ts
// 如果 T 是 U 的子類型，返回 T，否則返回 never
type Extract<T, U> = T extends U ? never : T

// 只能為 b
let foo: Extract<'a' | 'b' | 'c', 'b'> = 'b'
```


#### Parameters
根據函數的參數返回對應的 Tuple 類型

```ts
type Parameters<T extends (...args: any) => any> =
  T extends (...args: infer P) => any ? P : never

type Foo = (a: string, b: number) => void
const a: Parameters<Foo> = ['a', 1] // [string, number]
```

#### ReturnType

```ts
type ReturnType<T extends (...args: any) => any> =
  T extends (...args:any) => infer R ? R : any

type Foo = () => boolean
const a: ReturnType<Foo> = true // 返回 boolean 型別
```


## 參考文章

1. [TypeScript 新手指南](https://willh.gitbook.io/typescript-tutorial/)
2. [TypeScript 實踐與技巧](https://juejin.cn/post/6873080212675166215#heading-15)

<SocialBlock hashtags="typescript,advance" />