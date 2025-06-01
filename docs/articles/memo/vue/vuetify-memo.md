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


## 常用組件列表
- [Application](https://vuetifyjs.com/en/components/application/)
  - v-app
  - v-main
  - v-footer
  - v-app-bar
  - v-navigation-drawer
- [Grid](https://vuetifyjs.com/en/components/grids/)
  - v-container
  - v-row
  - v-col
  - v-spacer
- [Alert](https://vuetifyjs.com/en/components/alerts/)
  - v-alert
- [Avatar](https://vuetifyjs.com/en/components/avatars/)
  - v-avatar
- [Button](https://vuetifyjs.com/en/components/buttons/)
  - v-btn
  - v-btn-toggle
- [Card](https://vuetifyjs.com/en/components/cards/)
  - v-card
  - v-card-title
  - v-card-text
  - v-card-subtitle
  - v-card-actions
- [Chip](https://vuetifyjs.com/en/components/chips/)
  - v-chip
- [Date Picker](https://vuetifyjs.com/en/components/date-pickers/)
  - v-date-picker
- [Dialog](https://vuetifyjs.com/en/components/dialogs)
  - v-dialog
- [Divider](https://vuetifyjs.com/en/components/dividers/)
  - v-divider
- [Hover](https://vuetifyjs.com/en/components/hover/)
  - v-hoevr
- [Icon](https://vuetifyjs.com/en/components/icons/)
  - v-icon
- [Image](https://vuetifyjs.com/en/components/images/)
  - v-img
- [Lazy](https://vuetifyjs.com/en/components/lazy)
  - v-lazy
- [Forms](./)
  - [Form](https://vuetifyjs.com/en/components/forms/)
    - v-form
  - [Autocomplete](https://vuetifyjs.com/en/components/autocompletes/)
    - v-autocomplete
  - [Checkbox](https://vuetifyjs.com/en/components/checkboxes/)
    - v-checkbox
    - v-simple-checkbox
  - [Combobox](https://vuetifyjs.com/en/components/combobox/)
    - v-combobox
  - [File Input](https://vuetifyjs.com/en/components/file-inputs/)
    - v-file-input
  - [Input](https://vuetifyjs.com/en/components/inputs/)
    - v-input
  - [OTP Input](https://vuetifyjs.com/en/components/otp-input/)
    - v-otp-input
  - [Overflow buttons](https://vuetifyjs.com/en/components/overflow-btns/)
    - v-overflow-btn
  - [Radio buttons](https://vuetifyjs.com/en/components/radio-buttons/)
    - v-radio
    - v-radio-group
  - [Range Sliders](https://vuetifyjs.com/en/components/range-sliders/)
    - v-range-slider
  - [Selects](https://vuetifyjs.com/en/components/selects/)
    - v-select
  - [Slider](https://vuetifyjs.com/en/components/sliders/)
    - v-slider
  - [Switches](https://vuetifyjs.com/en/components/switches/)
    - v-switch
  - [Textareas](https://vuetifyjs.com/en/components/textareas/)
    - v-textarea
  - [Text Fields](https://vuetifyjs.com/en/components/text-fields/)
    - v-text-field
- [List](https://vuetifyjs.com/en/components/lists/)
  - v-list
  - v-list-group
  - v-list-item
  - v-list-item-action
  - v-list-item-action-text
  - v-list-item-avatar
  - v-list-item-content
  - v-list-item-group
  - v-list-item-icon
  - v-list-item-subtitle
  - v-list-item-title
- [Menu](https://vuetifyjs.com/en/components/menus/)
  - v-menu
- [Overlay](https://vuetifyjs.com/en/components/overlays/)
  - v-overlay
- [Progress Circular](https://vuetifyjs.com/en/components/progress-circular/)
  - v-progress-circular
- [Progress Linear](https://vuetifyjs.com/en/components/progress-linear/)
  - v-progress-linear
- [Rating](https://vuetifyjs.com/en/components/ratings/)
  - v-rating
- [Responsive](https://vuetifyjs.com/en/components/aspect-ratios/)
  - v-responsive
- [Sheet](https://vuetifyjs.com/en/components/sheets/)
  - v-sheet
- [Skeleton Loader](https://vuetifyjs.com/en/components/skeleton-loaders)
  - v-skeleton-loader
- [Snackbar](https://vuetifyjs.com/en/components/snackbars/)
  - v-snackbar
- [Stepper](https://vuetifyjs.com/en/components/steppers/)
  - v-stepper
  - v-stepper-content
  - v-stepper-header
  - v-stepper-items
  - v-stepper-step
- [Subheader](https://vuetifyjs.com/en/components/subheaders/)
  - v-subheader
- [Tables](./)
  - [Data Iterator](https://vuetifyjs.com/en/components/data-iterators/)
    - v-data-iterator
  - [Simple Table](https://vuetifyjs.com/en/components/simple-tables/)
    - v-simple-table
  - [Data Table](https://vuetifyjs.com/en/components/data-tables/)
    - v-data-table
    - v-data-table-header
    - v-data-footer
    - v-edit-dialog
    - v-simple-checkbox
- [Tabs](https://vuetifyjs.com/en/components/tabs)
  - v-tabs
  - v-tab
  - v-tabs-items
  - v-tab-item
  - v-tabs-slider
- [Tooltip](https://vuetifyjs.com/en/components/tooltips/)
  - v-tooltip
- [Virtual Scroll](https://vuetifyjs.com/en/components/virtual-scroller/)
  - v-virtual-scroll


## 特殊組件列表
- [Badge](https://vuetifyjs.com/en/components/badges)
  - v-badge
- [Bottom Navigation](https://vuetifyjs.com/en/components/bottom-navigation)
  - v-bottom-navigation
- [Bottom Sheet](https://vuetifyjs.com/en/components/bottom-sheets)
  - v-bottom-sheet
- [Breadcrumbs](https://vuetifyjs.com/en/components/breadcrumbs/)
  - v-breadcrumbs
  - v-breadcrumbs-item
- [Calendar](https://vuetifyjs.com/en/components/calendars/)
  - v-calendar
  - v-calendar-daily
  - v-calendar-monthly
  - v-calendar-weekly
- [Carousel](https://vuetifyjs.com/en/components/carousels/)
  - v-carousel
  - v-carousel-item
- [Color Picker](https://vuetifyjs.com/en/components/color-pickers/)
  - v-color-picker
- [Expansion Panel](https://vuetifyjs.com/en/components/expansion-panels/)
  - v-expansion-panels
  - v-expansion-panel
  - v-expansion-panel-header
  - v-expansion-panel-content
- [Group](./)
  - [Button Group](https://vuetifyjs.com/en/components/button-groups/)
    - v-btn-toggle
  - [Chip Group](https://vuetifyjs.com/en/components/chip-groups/)
    - v-chip-group
  - [Item Group](https://vuetifyjs.com/en/components/item-groups/)
    - v-item-group
    - v-item
  - [List Group](https://vuetifyjs.com/en/components/list-item-groups/)
    - v-list-group
    - v-list-item-group
  - [Slide Group](https://vuetifyjs.com/en/components/slide-groups/)
    - v-slide-group
    - v-slide-item
  - [Windows](https://vuetifyjs.com/en/components/windows/)
    - v-window
    - v-window-item
- [Pagination](https://vuetifyjs.com/en/components/paginations/)
  - v-pagination
- [Parallax](https://vuetifyjs.com/en/components/parallax/)
  - v-parallax
- [Time Picker](https://vuetifyjs.com/en/components/time-pickers)
  - v-time-picker
- [Toolbar](https://vuetifyjs.com/en/components/toolbars/)
  - v-toolbar
  - v-toolbar-items
  - v-toolbar-title
- [Timeline](https://vuetifyjs.com/en/components/timelines/)
  - v-timeline
  - v-timeline-item
- [TreeView](https://vuetifyjs.com/en/components/treeview/)
  - v-treeview


### 載入狀態
```html
<v-progress-circular
  indeterminate
  color="grey lighten-5"
></v-progress-circular>
```

```html
<v-text-field
  color="success"
  loading
  disabled
></v-text-field>
```

### Overlay
- [With hover](https://vuetifyjs.com/en/components/overlays/#advanced)
```html
<v-overlay
  :absolute="absolute"
  :opacity="0.5"
  :value="overlay"
>
  <v-btn
    color="success"
    @click="overlay = false"
  >
    Hide Overlay
  </v-btn>
</v-overlay>
```


## API
- [$vuetify](https://vuetifyjs.com/en/api/vuetify/)