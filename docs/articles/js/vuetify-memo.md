# 學習 Vuetify 的一些筆記

## 安裝

- [Installation](https://vuetifyjs.com/en/getting-started/installation/)

### CDN
```html
<link href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900" rel="stylesheet">
<link href="https://cdn.jsdelivr.net/npm/@mdi/font@6.x/css/materialdesignicons.min.css" rel="stylesheet">
<link href="https://cdn.jsdelivr.net/npm/vuetify@2.x/dist/vuetify.min.css" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/vuetify@2.x/dist/vuetify.js"></script>

<script>
  new Vue({
    el: '#app',
    vuetify: new Vuetify(),
  })
</script>
```


## 基礎

### Global 配置
`Vuetify.config` 進行配置全局設定

### Breakpoints
- [Breakpoints](https://vuetifyjs.com/en/features/breakpoints)

```html
<template>
  <v-dialog :fullscreen="$vuetify.breakpoint.mobile">
    ...
  </v-dialog>
</template>
```

```js
import Vue from 'vue'
import Vuetify from 'vuetify/lib'

export default new Vuetify({
  breakpoint: {
    mobileBreakpoint: 'sm' // This is equivalent to a value of 960
  },
})
```

個別組件可以覆蓋

```html
<template>
  <v-banner mobile-breakpoint="1024">
    ...
  </v-banner>
</template>
```

### Icons
- [Icons](https://vuetifyjs.com/en/features/icon-fonts/)
- [Icons Search](https://vuetifyjs.com/en/features/icon-fonts/#material-design-icons)

### I18n
- [I18n](https://vuetifyjs.com/en/features/internationalization/)

### Presets
- [Presets](https://vuetifyjs.com/en/features/presets/)

### SASS Variables
- [SASS Variables](https://vuetifyjs.com/en/features/sass-variables)
- [SASS Varialbe Search](https://vuetifyjs.com/en/features/sass-variables/#variable-api)

### Scrolling
- [Scrolling](https://vuetifyjs.com/en/features/scrolling/)

## 組件