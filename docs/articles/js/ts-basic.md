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

用以手動指定一值的類型，因在 react 的 tsx(jsx 的 ts 版本)，使用的是以 "值 as 類型" 的方式區隔，故建議都使用這種方式避免混淆

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


## 滿足類型 - Satisfies
用以手動指定一值滿足的類型，使用方式為 "值 satisfies 類型"，與前面 `as` 類型斷言不同，`as` 有強制的意思且會造成編譯器錯誤判讀內容，`satisfies` 則更彈性，以下為兩者簡單比較:
||as|satisfies|
|--|--|--|
|類型判斷|手動|自動|
|檢查強度|強制|靈活|
|編譯誤判|高|低|

接下來是簡單的範例，先提供背景類型
```ts
type Colors = 'red' | 'green' | 'blue';
type RGB = [red: number, green: number, blue: number];
```

- 類型判斷
通常在使用聯合類型時，值不確定是某一個類型，因此必須手動判斷，否則會報錯，如下範例，即使你確定 green 就是 `string`，仍然需要手動去檢查，非常麻煩
```ts
// 變量類型標註
const palette: Record<Colors, string | RGB> = {
  red: [255, 0, 0],
  green: '#00ff00',
  blue: [0, 0, 255],
};

// Property 'toUpperCase' does not exist on type 'string | RGB'
palette.green.toUpperCase();

// 手動檢查，解決
if (typeof palette.green === 'string') {
  palette.green.toUpperCase();
}
```
使用 `as const` 可以解決這問題，但同時會造成其他問題，因為 as const 會將值變為 readonly，且 as const 只會推論類型為其值本身，而非寬域吻合
```ts
// as const
const palette = {
  red: [255, 0, 0],
  green: '#00ff00',
  blue: [0, 0, 255],
} as const;

// 解決
palette.green.toUpperCase();
// Cannot assign to 'green' because it is a read-only property.
palette.green = '#dddddd';
```
使用 `satisfies` 則完美解決上述問題，在維持類型推論正確的情況下，給予最大的靈活彈性
```ts
// satisfies
const palette = {
  red: [255, 0, 0],
  green: '#00ff00',
  blue: [0, 0, 255],
} satisfies Record<Colors, string | RGB>;

palette.green.toUpperCase();
```

- 編譯誤判
```ts
const palette: Record<Colors, string | RGB> = {
  red: [255, 0, 0],
  green: '#00ff00',
  blue: [0, 0, 255],
};

// 實際值為 string，此處仍通過編譯，無錯誤
(palette.green as RGB).join();
```

總結 satisfies 有以下幾個好處
- 保證值的類型正確性
- 使用時，正確推論出值的類型，即使是聯合類型
- 以值本身為優先，而非類型

### 搭配 as const，宣告值唯讀
類型標註與 as const 搭配時，as const 會被類型標注覆蓋導致失去作用
```ts
interface Result {
	retCode: 200 | 404 | 500
}

const responseTableData: Result = {
	retCode: 200
} as const;

// 被類型標注覆蓋無作用，不會顯示唯讀錯誤
responseTableData.retCode = 404;
```
如果一定要使用類型標注處理唯讀，可以用 `Readonly`，或是用這邊的 `satisfies` 處理
```ts
const responseTableData: Readonly<Result> = {
	retCode: 200
} as const;
// or
const responseTableData = {
	retCode: 200
} as const satisfies Result;

// Cannot assign to 'retCode' because it is a read-only property.
responseTableData.retCode = 404;
```
### 其他常見使用範例
- 臨時且方便的類型推斷
```ts
const student = {
    name: 'Johnny',
    age: 30,
    company: 'line',
    mail: 'johnny@test.com'
} satisfies Record<string, string | number>;

student.age.toFixed();
```
- 特殊類型檢查唯讀
```ts
interface RouteRow {
	path: string
	component: any
  name?: string
  redirect?: string
}

const routes = [
	{
		path: '/',
		component: 'main'
	},
	{
		path: '/login',
		component: 'login'
	}
] as const satisfies RouteRow[]
```
- 配合 never 進行檢查
```ts
type ButtonTypes = 'primary' | 'error';

function getButtonStyle(t: ButtonTypes) {
  switch (t) {
    case "primary":
      console.log(123);
      break
    // case "error":
    //   console.log(123);
    //   break;
    default: {
      // Type 'string' does not satisfy the expected type 'never'
      t satisfies never;
    }
  }
}
```


<SocialBlock hashtags="typescript,basic" />