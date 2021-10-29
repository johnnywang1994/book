# Sass, SCSS Built-In-Modules 內建模組與函數
###### tag `css`, `scss`, `build-in-modules`, `map`, `list`

scss 函數就像其他語言一樣可以將一段邏輯抽象提出，並回傳一個值（list, map, string...），本篇主要紀錄當前最新版本的 scss 相關內建操作函數作為個人閱讀文檔的筆記

建議讀者閱讀如果要測試時，請確認您的 scss 版本是否須更新～感恩

> 本篇不包含 math 模組，相關 math 操作請見[官方說明](https://sass-lang.com/documentation/modules/math)


## 內建函數
內建函數包含以下幾種，`部分`可以直接在 scss 中使用不需另外引入，其他不在預設引入的模組必須手動引入


### String
1. unquote/quote  
對值移除/添加`最外層`引號，

```scss
// 使用 unquote 可以將內部字串保留，間接使用 pure css 函數
// 直接使用 min 會被 scss 判定為使用 scss 的函數而不是 css 的
p {
  font-size: unquote("min(13px, 20px)");
}
```

2. percentage  
將單位相同的數值轉為百分比

```scss
$value: 0.2;
$perc: percentage($value);
// $perc: 20%
```

3. random($value)  
產出範圍在 1 - $value 範圍的隨機數字，預設上限為 100

```scss
$number: random(30) + px;
// 1px - 30px
```

4. to-upper-case($value)

5. to-lower-case($value)

6. unique-id()
創建一組 unique id 字串


### Color
1. mix($color1, $color2, $proportion)  
混合色

2. invert($color)  
反相色

3. scale-color($color, $[key]: $value)/color.scale($color, $[key]: $value)  
調整指定 $color 的參數，建議都使用此 function 進行操作，避免使用 $darken, $desaturate 等操作
$amount 介於 0%-100%，主要是減少 hsl 中 lightness 的 `%`，所以不一定 100% 才是全黑

```scss
p {
  color: scale-color(red, $lightness: -50%);
}
// 等於
p {
  color: darken(red, 50%); // red 50% 就全黑了
}
```

```scss
p {
  color: scale-color(red, $saturation: -30%);
}
// 等於降低飽和
p {
  color: desaturate(red, 50%);
}ㄒ
```


### List
1. append($content, $list, $separator: auto)  
將指定內容加入指定 list 中

$separator: `comma`, `space`

```scss
$list: 10px;
$new-list: append(20px 30px, $list);
// 10px 20px 30px
```

2. index($list, $value)  
取得指定 list 中的值位置，不存在時回傳為 `null`

```scss
$border-style-index: index(1px solid red, solid);
// 2
```

3. join($list1, $list2, $separator: auto, $bracketed: auto)  
合併兩個指定 list 為一個

> 因為一個值會被視為單元素的 list，所以用 join 對一個值處理也可以成功，但不推薦這樣用，可能造成不必要的問題，建議一律使用 append 對單值操作，join 對 list 合併操作

```scss
$new-list: join(10px 20px, 30px 40px); // 10px 20px 30px 40px
$new-list-2: join(10px, 20px); // 10px 20px
```

4. length($list)  
取得指定 list 長度，或是 map 物件的 pair 數量

```scss
$max: length(10px 20px); // 2
$map-max: length(($width: 10px, $height: 20px)); // 2
```

5. nth($list, $n)  
取得 list 指定位置的值，當 $n 是負值時從尾部往前查找，查找位置不存在時會噴錯

```scss
$first: nth(10px 12px 16px, 1); // 10px
$last: nth(10px 12px 16px, -1); // 16px
```

6. set-nth($list, $n, $value)  
取代 list 指定位置的值並回傳新 list，同樣支援負數位置

```scss
$list: 10px 20px 30px;
$new-list: set-nth($list, 1, 5px);
// 5px 20px 30px
```

7. zip($lists...)  
合併複數個 list 唯一個，以相同位置進行合併，與 join 直接合併不同，當 list 數量不同時，僅將存在的部分合併回傳

```scss
$border-width: 10px 20px 30px;
$border-style: solid dot dashed;
$border: zip(border-width, $border-style);
// 10px solid, 20px dot, 30px dashed
```


### Map
在下面你會看到 `map.xxx`, `map-xxx`，這兩者主要差別在於直接使用或是引入 map 使用，部分函數可以直接透過 `map-xxx` 的方式使用不需引入，但有些必須手動引入 map 模組調用

1. map-get($map, $key, $keys...)  
取得 map 中指定 key 的值

```scss
$font-weights: (
  "regular": 400,
  "medium": 500,
  "bold": 700
);

$font-medium: map-get($font-weights, "medium");
// 500
```

nested 結構

```scss
$fonts: (
  "Helvetica": (
    "weights": (
      "regular": 400,
      "medium": 500,
      "bold": 700
    )
  )
);

$regular: map-get($fonts, "Helvetica", "weights", "regular");
```

2. map.set($map, $key, $value)
or map.set($map, $keys..., $key, $value)  
對指定 map 中的 key 值設置值，回傳新的 map

```scss
$font-weights: ("regular": 400, "medium": 500, "bold": 700);

@debug map.set($font-weights, "regular", 300);
// ("regular": 300, "medium": 500, "bold": 700)
```

3. map-has-key($map, $key, $keys...)  
回傳 $map 是否包含有指定 $key 值

```scss
$has-regular: map-has-key($font-weights, "regular"); 
// true
```

4. map-merge($map1, $map2)  
map 淺層合併

```scss
$light-weights: ("lightest": 100, "light": 300);
$heavy-weights: ("medium": 500, "bold": 700);

map.merge($light-weights, $heavy-weights);
```

5. map.deep-merge($map1, $map2)  
map 深度合併，與 `merge` 類似，但會往深度的 map 進行合併

```scss
$helvetica-light: (
  "weights": (
    "lightest": 100,
    "light": 300
  )
);
$helvetica-heavy: (
  "weights": (
    "medium": 500,
    "bold": 700
  )
);

$helvetica: map.deep-merge($helvetica-light, $helvetica-heavy);
```

6. map-remove($map, $key1, $key2, ...)
將指定 keys 從 $map 中移除並回傳新的 map

```scss
$font-weights: ("regular": 400, "medium": 500, "bold": 700);

@debug map.remove($font-weights, "regular");
// ("medium": 500, "bold": 700)
@debug map.remove($font-weights, "regular", "bold");  
// ("medium": 500)
@debug map.remove($font-weights, "bolder");
// ("regular": 400, "medium": 500, "bold": 700)
```

7. map.deep-remove($map, $key, $keys...)
- 當 $keys 不存在時，行為與 map-remove 相同。
- 當 $keys 存在時為往下層查詢並刪除找到的深層 key

```scss
$fonts: (
  "Helvetica": (
    "weights": (
      "regular": 400,
      "medium": 500,
      "bold": 700
    )
  )
);

@debug map.deep-remove($fonts, "Helvetica", "weights", "regular");
// (
//   "Helvetica": (
//     "weights: (
//       "medium": 500,
//       "bold": 700
//     )
//   )
// )
```

8. map-keys($map)  
回傳 $map 包含的所有 key 值為 list

```scss
$font-weight-keys: map-keys($font-weights);
// "regular", "medium", "bold"
```

9. map-values($map)
回傳一個包含所有 $map 中值的 list

```scss
$font-weights: ("regular": 400, "medium": 500, "bold": 700);

@debug map.values($font-weights);
// 400, 500, 700
```


## 客制函數
透過 `@function` 定義一組函數，`@return` 回傳值，舉例實現 `math.pow` 如下：

```scss
@function pow($base, $exponents) {
  $raised: 1;

  @for $i from 1 through $exponents {
    $raised: $raised * $base;
  }

  @return $raised;
}
```


## Reference
  - [sass- Built-In Modules](https://sass-lang.com/documentation/modules)