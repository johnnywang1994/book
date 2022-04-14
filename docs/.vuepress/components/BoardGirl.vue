<template>
  <div :style="`position: ${position}`" :class="['board-wrapper', assist]">
    <div class="panel" v-if="!open">
      <select v-model="assist">
        <option value="Hiyori">Hiyori</option>
        <option value="Rice">Rice</option>
      </select>
      <div class="call-assist" @click="toggleOpen">
        呼叫助理
      </div>
    </div>
    <canvas v-else id="board-hiyori"></canvas>
  </div>
</template>

<script setup>
import { onMounted, ref, nextTick } from 'vue'

defineProps({
  position: {
    type: String,
    default: 'fixed'
  }
})

const open = ref(false)
const assist = ref('Hiroyi')

async function toggleOpen() {
  open.value = !open.value;
  if (open.value) {
    await nextTick()
    showOut()
  }
}

function showOut() {
  const { onload, onbeforeunload, onresize } = window.Live2d({
    el: '#board-hiyori',
    size: 'auto',
    resourcesPath: '/book/Resources/',
    modelDir: [assist.value],
    bindFullscreen: true
  })

  onload()

  window.addEventListener('beforeunload', onbeforeunload)
  window.addEventListener('resize', onresize)
}
</script>

<style scoped lang="scss">
.board-wrapper {
  right: 0;
  bottom: 0;
  &.Hiyori {
    width: 300px;
    height: 500px;
  }
  &.Rice {
    width: 500px;
    height: 500px;
  }
  .panel {
    position: absolute;
    right: 12px;
    bottom: 12px;
    width: 250px;
    > select {
      width: 80px;
      padding: 6px 0;
      margin-right: 12px;
      border-radius: 10px;
      cursor: pointer;
      user-select: none;
    }
  }
  .call-assist {
    display: inline-block;
    padding: 8px 25px;
    color: #fff;
    background: rgb(210, 175, 0);
    border-radius: 10px;
    cursor: pointer;
    font-weight: bold;
    user-select: none;
    &:hover {
      background: rgb(227, 189, 0);
    }
  }
}
</style>
