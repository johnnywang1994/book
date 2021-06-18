# Vue component render(testing)

Here you can write vue sfc file in markdown

Following is a demo:

```vue
<template>
  <div class="counter">
    <span @click="count -= 1">-</span>
    <b>{{ count }}</b>
    <span @click="count += 1">+</span>
  </div>
</template>

<script>
const { ref } = Vue;

export default {
  name: 'Counter',
  setup() {
    const count = ref(0);
    return { count };
  },
}
</script>

<style lang="scss">
.counter {
  b {
    display: inline-block;
    width: 50px;
    text-align: center;
  }
  > span {
    font-size: 20px;
    padding: 1px 3px;
    margin: 0 8px;
    border: 1px solid;
    cursor: pointer;
  }
}
</style>
```

Counter-2
```vue
<template>
  <counter />
</template>
```