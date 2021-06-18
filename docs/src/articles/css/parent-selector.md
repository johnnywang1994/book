# SCSS Parent Selector

##### updated at: 2021-03-17
###### tag `css`, `scss`, `parent-selector`, `@at-root`


前端工程師對以下需求一定很熟悉：

當添加 `bold` class 給 `parent` 時，該如何添加 styles 給 `Hello World`

```html
<!-- normal -->
<div class="parent">
  <div class="child"><span>Hello World<span></div>
</div>

<!-- bold -->
<div class="parent bold">
  <div class="child"><span>Hello World<span></div>
</div>
```

## 作法

### 添加獨立的 css

```css
.parent .child span {
  font-size: 16px;
}

/* 分開寫 */
.parent.bold .child span {
  font-weight: bold;
}
```

這個做法雖然可以，但長遠來看，我們必須將相同對象的 style 分開寫，並不利於長期維護

### 使用 scss 封裝

```scss
.parent {
  .child span {
    font-size: 16px;
  }
  /* 雖然較好，但還是分開寫 */
  &.bold .child span {
    font-weight: bold;
  }
}
```

此方法雖然看起來封裝了，也比前一個利於維護，但對於目標 `span` 而言還是分開寫的

### 使用 scss @at-root 規則

scss 的 `@at-root` 規則會將當前指標指向 root 環境，詳細使用方式可見[scss @at-root](https://sass-lang.com/documentation/at-rules/at-root)，如以下範例：

```scss
.parent {
  .child {
    // 1. 後方不接 selector，開放 root
    @at-root {
      span {
        font-size: 16px;
      }
    }
    // 2. 後方接 selector
    @at-root span {
      font-size: 16px;
    }
  }
}

// compile to
span {
  font-size: 16px;
}
```

但這種方式如果要做上面的需求，我們必須 hardcore，雖然做到了想要的效果（放在一起），但每次都必須手動把整個 path 寫一遍是一件危險的事情。

```scss
.parent {
  .child {
    span {
      font-size: 16px;
      // 一起寫，但使用不方便
      @at-root .parent.bold .child span {
        font-weight: bold;
      }
    }
  }
}
```

### mixin 解法

我們使用 scss 的 [Parent Selector](https://sass-lang.com/documentation/style-rules/parent-selector) 來幫助我們上面 hardcore 的部分

```scss
@mixin attach-root($new-class) {
  $current-selector: &; // array
  $new-selector: []; // new array

  @each $item in $current-selector {
    $first-node: nth($item, 1);
    $appended-node: $first-node + $new-class;
    $new-item: set-nth($item, 1, $appended-node); // replace target node
    $new-selector: append($new-item, $new-selector);
  }

  @at-root #{$new-selector} {
    @content;
  }
}
```

上面主要是將 parent selector `&`儲存為變數，並替換第一個 node selector，加上指定 class 後再重新組回去，最後再用 `@at-root` 重新放回原位置。

使用如下：

```scss
.parent {
  .child {
    span {
      font-size: 16px;
      // 一起寫，好用
      @include attach-root('.bold') {
        font-weight: bold;
      }
    }
  }
}

// compile to
.parent .child span {
  font-size: 16px;
}
.parent.bold .child span {
  font-weight: bold;
}
```


## Conclusion

本篇主要講到兩個 scss 蠻特別的規則 `@at-root`, `parent-selector`，這兩個東西雖然看似不知道可以幹嘛，但實際上非常有用～，上面的 mixin 只要稍作修改就能夠變成更萬能的工具摟～（這部分留給讀者自行嘗試拉～）

以上感謝大家觀看，下次見

##### 文章參考自：[Add class to the most outer selector using Sass mixin](https://pantaley.com/blog/Add-class-to-the-most-outer-selector-using-Sass-mixin/)