# Sass, SCSS 基礎筆記



## Usage


### 變數定義

雖然 CSS 新的功能已可使用變數機制，但各瀏覽器實作的狀況不同，開發上還是稍微不穩定

且 scss 不只可使用單值變數，更可以定義 array, map 並使用

  - nth($list, $index), index($list, val), length($list)
  
  - map-get($map, $key), map-keys($map), map-values($map)

  - append($list, $val), merge($object, $object) 來添加或覆蓋值

```css
* {
  --my-color: red;
}

.box {
  color: var(--my-color);
}
```

```scss
$my-color: red;
$sizes: 50px, 100px, 150px;
$fonts: ('sm': 13px, 'md': 15px, 'lg': 17px);

// reassign value with append's or merge's return
$sizes: append($sizes, 200px);
$fonts: map-merge($fonts, ('lg': 21px, 'xl': 27px));

.box {
  color: $my-color;
  width: nth($sizes, 1); // 50px
  font-size: map-get($fonts, 'sm'); // 13px
}
```


### 簡化父層選取

可以簡化傳統 CSS 父層重複出現的繁瑣

```css
#demo .box {
  /* ... */
}

#demo .box .title {
  /* ... */
}
```

```scss
#demo {
  .box {
    /* ... */
    .title {
      /* ... */
    }
  }
}
```


### 值計算(加減乘除)

```css
.box {
  font-size: calc(10px * 3);
}
```

```scss
.box {
  font-size: 10px * 3;
}
```

注意，剪法計算方式必須兩邊單位相同，不同時仍需使用 calc

```css
.title {
  font-size: calc(30px - 20px);
}
```

```scss
.title {
  width: 30px - 20px;
}
```


### @function

函數概念，通常用來返回一個經過計算或處理後的單值，接受傳入參數。

```scss
// px 轉 rem
@function pxToRem($px) {
  $num: $px / 16px;
  @return #{$num}rem;
}
```


### @mixin

類似函數，通常用來獲得一系列 CSS 設定，接受傳入參數。

（相同設定複製一份，表面上會增加 code 量，但經實測，@mixin 較 @extend 具有更好的性能）

（且當使用 @extend 時，需注意 placeholder 的位置是否會覆蓋到目標）

```scss
@mixin block_reset {
  margin: 0;
  padding: 0;
}

@mixin RWD($width) {
  @media (max-width: $width) {
    @content
  }
}
```


### @extend

擴展集合，將具有相同設定的目標寫在一起，一次設定，不接受傳入參數。

通常搭配 placeholder 一起使用，將所有目標具有的相同設定綁定到 placeholder 處設定。

```scss
%col {
  position: relative;
  width: 100%;
}

.box-1 {
  @extend %col;
  color: red;
}
.box-2 {
  @extend %col;
  color: blue;
}
```

To

```css
.box-1, .box-2 {
  position: relative;
  width: 100%;
}
.box-1 {
  color: red;
}
.box-2 {
  color: blue;
}
```


### if / else 條件判斷

CSS 中沒有條件判斷的功能

```scss
@mixin ta($side) {
  @if $side == l {
    text-align: left;
  }
  @else if $side == r {
    text-align: right;
  }
  @else if $side == j {
    text-align: justify;
  }
  @else {
    text-align: center;
  }
}
```


### for / each 迴圈

CSS 中沒有迴圈的概念，迴圈在構建 framework 時非常好用

```scss
// @for loop(to 不包含，through 包含)
@for $i from 1 through 11 {
  .offset-#{$i}
    margin-left: 100%/12*$i
}
```

```scss
// @each loop - array
$sizes: 40px, 50px, 80px;

@each $size in $sizes {
  .icon-#{$size} {
    font-size: $size;
    height: $size;
    width: $size;
  }
}

// @each loop - object
$sizes: ('sm': 40px, 'md': 50px, 'lg': 80px);

@each $key, $value in $sizes {
  .icon-#{$key} {
    font-size: $value;
    height: $value;
    width: $value;
  }
}
```


### @import 引入模組

@import 是讓 Sass 模組化開發最重要的功能之一，在文件開頭引入所需的 variables, mixin 快速進行開發

```scss
@import "./base/Base-variable";
@import "./base/Base-mixin";
```


### @at-root 從最上層開始

```scss
#app {
  p {
    @at-root .bold & {
      color: red;
    }
  }
}
```

編譯結果如下

```css
.bold #app p {
  color: red;
}
```
