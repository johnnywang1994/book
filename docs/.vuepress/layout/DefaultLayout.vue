<template>
  <ParentLayout>
    <template #page>
      <div class="theme-project-content">
        <Content />
      </div>
    </template>
  </ParentLayout>
</template>

<script>
import ParentLayout from '@vuepress/theme-default/layouts/Layout.vue'

export default {
  components: {
    ParentLayout
  }
}
</script>
