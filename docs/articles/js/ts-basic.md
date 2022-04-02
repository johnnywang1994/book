# TypeScript 基礎篇

<SocialBlock hashtags="typescript,basic" />

此篇文章為看完阮一封前輩的教學後隨手筆記，供日後快速複習使用。


## 原始類型

`string`, `number`, `boolean`, `null`, `undefined`, `Symbol`

```ts
// 已知
const str : string = 'Hello World';

// 未知預期
let num = <unknown> getNumber();
// 已知預期
num = <number> getNumber();

// 返回數字的函數
function getNumber(): number {
  return 30;
};

// 無返回值函數
function count(): void {
  console.log(1 + 3);
}
```


## 任意值 any

普通類型的變數，不能在運算中改變類型

  1. 一個 any，可以對他做任何操作，返回的內容都是任意值
  2. 當變量未被明確指定類型值且宣告時沒有值時，預設是 any

```ts
let someText : any = 30; // 若此設 number 將報錯
someText = 'someText'; // error
```


## 類型推論

當沒有明確指定類型，會自動依照此規則推斷出一個類型

```ts
let typeS = 'seven';
typeS = 10; // 這邊因初始有給值為 string，自動推斷為 string 類型

let typeA;
typeA = 'six';
typeA = 30; // 這邊初始沒有值，推斷為 any
```


## 聯合類型

表示取值可為多種類型中的一種，使用 `|` 分隔多個類型

```ts
let unionC: string | number = 'Ray';
unionC = 100;

function getLength(something: string | number): number {
  return something.length; // 只能訪問聯合類型所共有的屬性 error
}
```


## 對象的類型 - 接口(Interface)

常用於對對象 形狀(Shape) 的描述

  1. 接口一般首字大寫
  2. 在屬性名後加上 `?` 配置「可選」屬性，加強對象類型的彈性
  3. 可允許任意屬性，但其他屬性必須是該任意屬性類型的子類型
  4. 屬性名前加上 `readonly` 標記「只讀」屬性

```ts
interface Person {
  readonly id: number;
  name: string;
  age?: number; // 此 age 為可選屬性
  [prop: string]: any; // 此 prop 為任意屬性字串，並接受任意類型
  // [prop: string]: string; // 因任意屬性為字串類型值，上方 age 將不可為 number
}

let tom: Person = {
  id: 3387,
  name: 'Tom',
  // age: 30,
};
// 此約束了 Tom 必須與 Person 保持形狀一致。（多或少都不行）

// 無法在初始化後修改只讀屬性 error
tom.id = 4069;
```

也可以定義函數的 interface 或是子屬性為函數

```ts
interface MyFunction {
  (a: number): void;
}

interface MyObject {
  jump: (a: number) => void;
}
```


## 陣列的類型

有多種定義方式

  1. 類型 + 中括號
  2. 陣列泛型 (Array)
  3. interface 描述
  4. 類數組（IArguments, NodeList, HTMLCollection, Element...）

```ts
// 1.
const myArr: number[] = [1, 2, 3];
myArr.push('4'); // 相關方法也會自動檢查 error

// 2.
const myArr2: Array<number> = [1, 2, 3];
myArr2[2] = '3'; // error

// 3.
interface NumberArray {
  [index: number]: number,
}
const myArr3: NumberArray = [1, 2, 3];

// 4. 內建類數組接口
function sum() {
  let args: IArguments = arguments;
}
```

關於其他內建物件[可查看這](https://willh.gitbook.io/typescript-tutorial/basics/built-in-objects)。


## 函數的類型

分為聲明式、表達式，函數具有輸入與輸出，需把兩者都考慮到

  1. 聲明式
  2. 表達式
    - 必須將左側變數也加上定義，注意！不要混淆了 TS 的 => 跟 ES6 的 =>
    - 因容易混淆，盡量少用
  3. 接口定義
  4. 使用 ? 標記「可選」參數，其後不能有其他必選參數
  5. 參數默認值 => 具默認值得參數會自動變為「可選」
  6. rest 參數可用 any[] 陣列類型定義
  7. 重載：允許函數接受不同數量類型的參數時，做出不同的處理

```ts
// 1.
function sumFn(x: number, y: number): number {
  return x + y;
}

sumFn(1); // error
sumFn(1, 2, 3); // error

// 2.
const sumFnEx: (x: number, y: number) => number = function(x: number, y: number): number {
  return x + y;
}

// 3.
interface Isum {
  (x: number, y: number): number;
}

const mySum: Isum = function(x: number, y: number): number {
  return x + y;
}

// 4. & 5.
function buildName(
  firstName: string,
  lastName?: string,
  age: number = 30
): string
{
  return `${firstName} ${lastName}, now age ${age}`;
}
buildName('johnny');

// 6.
function push(array: any[], ...items: any[]) {
  items.forEach(item => {
    array.push(item);
  });
}

// 7.
// 必須定義數字進數字出，使用重載先行精確定義函數，最後進行函數邏輯實現
function reverse(x: number): number;
function reverse(x: string): string;
function reverse(x: number | string): number | string {
  if (typeof x === 'number') {
    return Number(x.toString().split('').reverse().join(''));
  } else if (typeof x === 'string') {
    return x.split('').reverse().join('');
  }
  return 0;
}
```


## 類型斷言 - Type Assertion

用以手動指定一值的類型，因在 react 的 tsx(jsx 的 ts 版本)，使用的是以 “值 as 類型” 的方式區隔，故建議都使用這種方式避免混淆

  1. 使用聯合類型時，有時必須在還不確定類型時訪問特定類型屬性
    - 使用時必須小心，避免在斷言後直接調用屬性，因編譯時會通過，但運行時會掛
  2. 父類別繼承關係斷言
  3. "XXX as any" 是解決 TS 類型問題的`最後手段，非必要盡量少用`
  4. `斷言補強`（對於返回 any 類型的舊代碼，可以在調用返回後明確斷言他的類型）
  5. 類型斷言`只會在編譯時有效`，對實際編譯後的代碼不具任何影響
  6. 類型聲明比類型斷言更加嚴格，`盡量都先使用聲明式`

```ts
// 1.
interface Cat {
  name: string;
  run(): void;
}

interface Fish {
  name: string;
  swim(): void;
}

function getName(animal: Cat | Fish) {
  // 此時因 Cat 不具有 swim 屬性會報錯
  // if (typeof animal.swim === 'function') {
  if (typeof (animal as Fish).swim === 'function') {
    console.log('Is a fish');
  } else {
    // ...
  }
}

// 2.
class ApiError extends Error {
  code: number = 0;
}

class HttpError extends Error {
  statusCode: number = 200;
}

function isApiError(error: Error): boolean {
  if (typeof (error as ApiError).code === 'number') {
    return true;
  }
  return false;
}

// 3.
// 對 any 類型訪問任何屬性都是合法的，但這是最終手段
window.foo = 1; // error
(window as any).foo = 1;

// 4.
function getCache(key: string): any {
  return (window as any).cache[key];
}

interface Cat {
  name: string;
  run(): void;
}

// 類型斷言
const tomCat = getCache('tom') as Cat;
// 類型聲明(較為嚴格)
// const tomCat: Cat = getCache('tom');
tomCat.run();
```


## 聲明文件

使用第三方庫時，必須引用他的聲明文件，以提供對應的類型檢查

  - [聲明語法清單](https://ts.xcatliu.com/basics/declaration-files.html)
  - [聲明文件搜尋](https://microsoft.github.io/TypeSearch/)

通常會把聲明語句放入單獨文件中，eg. jQuery.d.ts

  1. `declare var/let/const`
  2. `declare namespace` 創建命名空間，避免 `interface` 造成全局污染，使用該命名空間下的接口時也要加上該命名名稱
  3. 詳細不同庫的聲明文件，推薦使用 `@types` 統一管理，直接安裝如 `npm install @types/jquery --save-dev`，透過 `@types` 安裝的聲明文件，若為全局聲明則不用再進行任何配置
  4. NPM 中的聲明文件必須透過 `export` 和 `import` 才能在模組內使用

```ts
// 1. 以 jQuery 舉例
declare const jQuery: (selector: string) => any;

// 2. 舉例，僅示意
declare namespace Vue {
  function component(name: string, data: any): any;
  function mixin(data: any): void;
}
```

### 宣告合併

以 jQuery 舉例，他既是一個函式，可以直接被呼叫，又是一個物件，擁有子屬性，那麼我們可以組合多個宣告語句，它們會不衝突的合併起來。

```ts
declare function jQuery(selector: string): any;
declare namespace jQuery {
  function ajax(url: string, settings?: any): void;
}
```

<SocialBlock hashtags="typescript,basic" />