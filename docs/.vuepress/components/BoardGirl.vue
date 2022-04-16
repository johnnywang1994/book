<template>
  <div :style="`position: ${position}`" :class="['board-wrapper', state.assist]">
    <div class="panel" v-if="!state.open">
      <select v-model="state.project">
        <option
          v-for="project in state.projects"
          :key="`project_${project}`"
          :value="project"
        >{{ project }}</option>
      </select>
      <select v-show="state.project" v-model="state.assist">
        <option
          v-for="assist in assistList"
          :key="`assist_${assist}`"
          :value="assist"
        >{{ assist }}</option>
      </select>
      <div class="call-assist" @click="toggleOpen">
        呼叫助理
      </div>
    </div>
    <canvas v-else id="board-hiyori"></canvas>
  </div>
</template>

<script setup>
import { onMounted, reactive, nextTick, computed } from 'vue'

defineProps({
  position: {
    type: String,
    default: 'fixed'
  }
})

const state = reactive({
  open: false,
  assist: '',
  project: '',
  assists: {
    demo: ['Hiyori', 'Rice'],
    'girls-frontline': ['97type', '97type_406', 'Aa12_2403', 'Ads_3601']
  },
  projects: [
    'demo',
    'girls-frontline',
  ]
})

const assistList = computed(() => state.project ? state.assists[state.project] : [])

async function toggleOpen() {
  state.open = !state.open;
  if (state.open) {
    await nextTick()
    showOut()
  }
}

function showOut() {
  const { onload, onbeforeunload, onresize } = window.Live2d({
    el: '#board-hiyori',
    size: 'auto',
    resourcesPath:
      `https://johnnywang1994.github.io/assets/live2d/${state.project}/`,
    modelDir: [state.assist],
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
    min-width: 250px;
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
