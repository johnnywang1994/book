<template>
  <div class="iframe-wrapper">
    <iframe :src="src" :title="title" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen frameborder="0"></iframe>
  </div>
</template>

<script>
export default {
  props: ['src', 'title'],
};
</script>

<style lang="scss" scoped>
.iframe-wrapper {
  position: relative;
  width: 100%;
  &::before {
    content: '';
    display: block;
    width: 100%;
    padding-top: calc(9 / 16 * 100%);
  }
  iframe {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
  }
}
</style>
