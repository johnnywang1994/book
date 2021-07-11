# JS 實戰開發特殊小技巧

本篇主要記錄一些開發 js 時的一些小技巧筆記～


## 清空和截短數组

除了常見的 slice, splice 以外，我們可以使用 length 操作

```js
const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];

arr.length = 5;
console.log(arr) //[1, 2, 3, 4, 5]
arr.length = 0; // 清空
```


## 條件短路

> 需注意 eslint 可能限制

```js
if (hungry) {
  goToFridge();
}

hungry && goToFridge();
```


## 逗號運算符

二元運算符，它能先執行運算符左側的操作數，然後再執行右側的操作數，最後返回右側操作數的值。

```js
function myFunc () {
  var x = 0;

  return (x += 1, x); // the same as return ++x;
}
```


## 快速移除重複項

使用 Set 物件的不重複特性與數組解構

```js
const removeDuplicate = (arr) => [...new Set(arr)];
let myFruit = removeDuplicate(['apple', 'apple', 'banana']);
console.log(myFruit); // ['apple', 'banana']
```


## 取消選取、防止複製

```html
<body onselectstart="return false">
```


## 不允許貼上

```html
<input onpaste="return false" />
```


## 防複製、剪下

```html
<p oncopy="return false" oncut="return false">Content cant be copy</p>
```


