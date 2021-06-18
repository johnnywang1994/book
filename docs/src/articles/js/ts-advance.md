# TypeScript 進階篇(未完)

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

  1. 訪問或修改已知索引的元素時，對得到正確的類型
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

**未完待續**
