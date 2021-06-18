# Js literal 模板編譯

編譯的工作是用來簡化書寫過程，或是進行一些常用功能的封裝，以利開發者使用。

模板編譯主要是讓我們能夠在字串內，進行一些變數替換、判斷的運作，實作上常用正則表達式去進行比對處理，而比對後的處理就是我們本篇的關注重點。

## 簡單編譯

從簡單開始，用最直覺的比對替換來進行：

```javascript
function template(str, data) {
  let ret = String(str);
  // 遍歷 key，替換字串
  for (let item in data) {
    if (data.hasOwnProperty(item)) {
      var re = new RegExp('{{' + item + '}}', 'g');
      ret = ret.replace(re, data[item]);
    }
  }
  return ret;
}
```

這個方式可以應用於一些簡單的場合，但當需要更複雜的功能時，就無法使用了。


## new Function 函數

對於上面的正則比對編譯，其實 ES6 本身的 literal template 就可以完美地做到了：

```javascript
function template(data) {
  return `Hello ${data.name}, I am ${data.age} years old.`;
}
```

而這麽做就可以支援上面做不到的 `data.user.name` 這種串聯寫法。  
現在我們知道函數拿來處理字串很方便，而 JavaScript 本身有一個函數物件叫做 `Function` 正好適合用來做這件事，
他的基本用法如下：

```javascript
const fn = new Function('x', 'y', 'return x + y');
```

`new Function` 可以用來創造函數，最後面接受一個字串，進行 return 動作。我們可以善用此特點來處理比對到的資料進行替換。

```javascript
const template = function(str) {
  const re = /\{\{\s*([^\}]+)?\s*\}\}/g;
  str = str.replace(re, 'data.$1');
  return new Function('data', `return "${str}";`);
};

t('Hello {{ name }}'); // 函數會回傳 return "Hello data.name" 
```

很明顯這樣會變成整個字串回傳，我們需要進行區分，修改如下：

```javascript
const template = function(str) {
  const re = /\{\{\s*([^\}]+)?\s*\}\}/g;
  str = str.replace(re, '" + data.$1 + "');
  return new Function('data', `return "${str}";`);
};

t('Hello {{ name }}'); // return "Hello " + data.name + "";
```

OK!! 到這裡後已經完成 80% 了，目前編譯字串要先手動執行一次 `template` 函數，可以把他封裝如下自動化：

```javascript
const template = function(str) {
  const re = /\{\{\s*([^\}]+)?\s*\}\}/g;
  str = str.replace(re, '" + data.$1 + "');
  return new Function('data', `return "${str}";`);
};

const render = function(str, data) {
  str = String(str);
  let fn = template(str);
  return fn(data);
};

render('Hello {{ name }}', { name: 'Johnny' });
// Hello Johnny
```

## 進階字符串處理

最後為這個純字符串替換函數加上一些功能，包含資料缺失處理、比對 emps 輸出

#### 資料缺失

當資料缺失時，上面的函數會直接顯示 undefined 於畫面中，可以在 `replace` 替換時進行判斷：

```javascript
const template = function(str) {
  const re = /\{\{\s*([^\}]+)?\s*\}\}/g;
  str = str.replace(re, '" + (data.$1 ? data.$1 : '') + "');
  return new Function('data', `return "${str}";`);
};

// ...
```

現在資料缺失，就會直接返回空白了。


#### 比對 emps 輸出

為了知道總共編譯了多少個對象，且對象的 key 分別是誰，我們需要在編譯後取得相關的資料，實作如下：

```javascript
const removeWrapper = function(arr) {
  let ret = [];
  arr.forEach((exp) => {
    ret.push(exp.replace(/[\{|\}]/g, '').trim());
  });
  return ret;
};

const render = function(str, data) {
  str = String(str);
  let exps = null;
  const template = function(str) {
    const re = /\{\{\s*([^\}]+)?\s*\}\}/g;
    exps = removeWrapper(str.match(re)); // 提取符合的字串後移除大括號
    str = str.replace(re, '" + data.$1 + "');
    return new Function('data', `return "${str}";`);
  };
  let fn = template(str);
  return {
    exps,
    value: fn(data)
  };
};

render('Hello {{ name }}', { name: 'Johnny' });
/*
{
  exps: ['name'],
  value: 'Hello Johnny'
}
*/
```