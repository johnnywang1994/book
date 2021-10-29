# 正則表達式

這篇主要用來記錄我在網路上學習正則的過程中學習的一些筆記跟方法～

內容不包含全部正則的基礎介紹，僅針對個人認為較為重要、特殊、神奇的部分進行記錄



## 重要概念
正則表達式是 `匹配模式`，要馬`匹配字符`，要馬`匹配位置`



## 匹配位置
舉個例子，數字千位數`,`分割就是匹配位置

常見的匹配位置語法有：  
^、$、\b、\B、?=p、(?!p)、(?<=p)、(?<!p)

### ^ - 匹配開頭

### $ - 匹配結尾

### \b - 匹配 block
匹配下列三種位置：
  1. \w 和 \W 之間
  2. ^ 和 \w 之間
  3. \w 和 $ 之間

```js
'file.mp4'.replace(/\b/g, '❤️');
// ❤️file❤️.❤️mp4❤️
```

### (?=p) - 匹配符合 p 格式之前方位置
也稱`正向先行斷言`

```js
'Good Movie'.replace(/(?=Good)/g, '❤️');
// ❤️Good Movie
```

### (?!p) - 匹配符合 (?=p) 以外的位置
也稱`負向先行斷言`

### (?<=p) - 匹配符合 p 格式之後方位置

### (?<!p) - 匹配 (?<=p) 以外的位置

#### 案例

1. 數字千分位分割
匹配每 3 個數字的前方位置，除了開頭以外
```js
'123456789'.replace(/(?!^)(?=(\d{3})+$)/g, ',');
// 123,456,789
```

2. 密碼驗證  
需滿足三個條件
 - 長度介於 6-12 位
 - 由數字、小寫、大寫字母組成
 - 須至少包含兩種字符（數字+小寫, 數字+大寫...）

##### 驗證長度
```js
let regLength = /^[a-zA-Z\d]{6,12}$/;
```

##### 驗證字符種類
有4種排列組合，第四種包含在前三種內可忽略
```js
// 數字+(小寫or大寫)
let reg1 = /((?=.*\d)((?=.*[a-z])|(?=.*[A-Z])))/;
// 小寫+大寫
let reg2 = /(?=.*[a-z])(?=.*[A-Z])/;
// 結合上面兩者
let reg3 = /((?=.*\d)((?=.*[a-z])|(?=.*[A-Z])))|(?=.*[a-z])(?=.*[A-Z])/;
// 加上長度驗證
let regResult = /((?=.*\d)((?=.*[a-z])|(?=.*[A-Z])))|(?=.*[a-z])(?=.*[A-Z])^[a-zA-Z\d]{6,12}$/
```



## 匹配字符

### 模糊匹配
分為橫向、縱向匹配兩種

#### 橫向匹配
包含量詞 ?, +, *, {m,n} 等幾種實現方式

```js
let reg = /ab{2,5}c/g;
let str = 'abc abbc abbbc abbbbc abbbbbc abbbbbbc';

str.match(reg);
// [ 'abbc', 'abbbc', 'abbbbc', 'abbbbbc' ]
```

### 縱向匹配
透過 `字符組` 的方式配對

```js
let reg = /a[123]b/g
let str = 'a0b a1b a2b a3b a4b'

str.match(reg);
// [ 'a1b', 'a2b', 'a3b' ]
```

### 範圍表示法
`[123456abcdefABCDEF] => [1-6a-fA-F]`

### 排除字符組
與原字符組意義相法，將指定字符組作為反向不存在的驗證
`[^abc]`

### 簡寫字符

```js
\d // number
\D // not number
\w // [0-9a-zA-Z_]
\W // [^0-9a-zA-Z_]
\s // [\t\v\n\r\f]
\S // [^\t\v\n\r\f]
.
```

### 量詞

```js
1. {m,} // least m times
2. {m} // m times
3. ? // 0 or 1
4. + // least 1
5. * // least 0
```

### 貪婪匹配, 惰性匹配
正則預設行為`貪婪匹配`，會盡可能多的匹配內容，在量詞後接上一個 `?` 即變化為`惰性匹配`

```js
let regex = /\d{2,5}/g
let string = '123 1234 12345 123456'
// 貪婪匹配
string.match(regex);
// [ 123, 1234, 12345, 12345 ]

// 惰性匹配
let regex2 = /\d{2,5}?/g
string.match(regex2);
// [ 12, 12, 34, 12, 34, 12, 34, 56  ]
```

> 多選分支匹配為`惰性匹配`，當前面匹配成功時即停止，不會將後續分支也匹配

```js
let regex = /good|nice/g;
let string = 'good idea, nice try.';

string.match(regex);
// [ 'good', 'nice' ]
```

```js
let regex = /good|goodbye/g;
let string = 'goodbye~';

string.match(regex);
// ['good']
```

#### 案例

1. HTML string id 匹配
若沒有加上 `?` 惰性匹配，會連後面的 class 一起取出

```js
let regex = /id=".*?"/;
let string = '<div id="container" class="main"></div>';

string.match(regex);
// ['id="container"']
```



## 括號

括號幫助我們對匹配到的東西進行分組，以便後續進行引用、使用

### 分組(Capturing Parentheses)
量詞作用於整體
```js
let reg = /(ab)+/g;
let string = 'ababa abbb ababab';

string.match(reg);
// ["abab", "ab", "ababab"]
```

### 分支結構
類似使用 || 的概念
```js
let reg = /I love (Mama|Dada)/;
```

### match 分組引用
這是括號最強大的功能之一，可以提取匹配的資料進行使用
```js
let reg = /(\d{4})-(\d{2})-(\d{2})/;

'2021-08-14'.match(reg);
// ["2021-08-14", "2021", "08", "14", ...]
```

### replace 資料替換
運用 `$1,$2,...` 的方式對匹配到的資料進行替代
```js
// 1.
let reg = /(\d{4})-(\d{2})-(\d{2})/
'2021-08-14'.replace(reg, '$2/$3/$1');

// 2.
'2021-08-14'.replace(reg, ($0, $1, $2, $3) => {
  return $2 + '/' + $3 + '/' + $1;
})

// 08/14/2021
```

### 非捕獲性括號(Non-Capturing Parentheses)
找出匹配的格式，但不進行記憶

詳情範例請見[MDN-Non-Capturing Parentheses](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Guide/Regular_Expressions#special-non-capturing-parentheses)



## References
本篇文章主要為閱讀此篇文章學習的筆記，也歡迎前往看看原文章喔～

  - [就因为这三个知识点，我彻底学废了"正则表达式"](https://juejin.cn/post/7021672733213720613)
