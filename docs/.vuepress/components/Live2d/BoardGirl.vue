<template>
  <div :style="`position: ${position}`" :class="['board-wrapper', position, state.assist]">
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
    <template v-else>
      <canvas id="board-girl"></canvas>
      <div class="panel">
        Scale<input type="range" min="0.5" max="3.5" step="0.1" v-model="state.scale" />
        <br>
        <div class="call-assist" @click="onClear">
          Clear
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { onMounted, reactive, nextTick, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const props = defineProps({
  position: {
    type: String,
    default: 'fixed'
  },
  size: {
    type: String,
    default: 'auto'
  }
})

const router = useRouter()
const route = useRoute()

const BASE_URL = process.env.NODE_ENV === 'production'
  ? 'https://johnnywang1994.github.io/assets/live2d'
  : '/book/Resources';

const state = reactive({
  open: false,
  scale: 1,
  assist: '',
  project: '',
  assists: {
    demo: ['Hiyori', 'Rice'],
    'girls-frontline': [
      "Aa12_2403",
      "G41",
      "Generalliu_5101",
      "Hk416_3401",
      "Js9mm_4702",
      "K2_3301",
      "Kp31_1103",
      "M4Sopmod_ii_4507",
      "Mk23_3105",
      "Ots14_4501",
      "Pa15_3701",
      "Spitfire_1405"
    ],
    'girls-cafe-gun': [
      "0202upd__l2d_345.u",
      "0202upd__l2d_349.u",
      "0911upd__l2d_344.u",
      "0925upd__l2d_365.u",
      "10qpt01__l2d_355.u",
      "12qpt03__l2d_376.u",
      "28__l2d_119.u",
      "47__l2d_200.u",
      "47__l2d_202.u",
      "47__l2d_203.u",
      "724upd__l2d_388.u",
      "724upd__l2d_389.u",
      "9qpt01__l2d_326.u",
      "g10_l2d08.u",
      "g12_l2d00.u",
      "g12_l2d01.u",
      "g12_l2d02.u",
      "g1_l2d00.u",
      "g1_l2d03.u",
      "g1_l2d04.u",
      "g1_l2d8002.u",
      "g2_l2d17.u",
      "g2_l2d5017.u",
      "g3_l2d04.u",
      "g3_l2d22.u",
      "g3_l2d24.u",
      "g5_l2d03.u",
      "g6_l2d03.u",
      "g7_l2d03.u",
      "g8_l2d03.u",
      "g9_l2d00.u",
      "l2d4__l2d_182.u",
      "l2d6__l2d_184.u",
      "newg01__l2d_296.u",
      "swg02__l2d_292.u"
    ],
    'azue-lane': [
      "daofeng_4",
      "dujiaoshou_4",
      "lafei",
      "taiyuan_2",
      "z46_2"
    ],
    'unknow-brige': [
      "c_3012",
      "c_3023",
      "c_3033",
      "c_3112",
      "c_3123",
      "c_3131",
      "c_3223",
      "c_3231",
      "c_3312",
      "c_3321",
      "c_3323",
      "c_3412",
      "c_5021",
      "c_5131"
    ],
    'sin': [
      "xch006_01",
      "xch013_01",
      "xch016_01",
      "xco005a_01",
      "xco009_01",
      "xco011_01",
      "xco013_01",
      "xco017_01",
      "xco025_01"
    ]
  },
  projects: [
    'demo',
    'girls-frontline',
    'girls-cafe-gun',
    'azue-lane',
    'unknow-brige',
    'sin'
  ]
})

const assistList = computed(() => state.project ? state.assists[state.project] : [])

async function toggleOpen() {
  state.open = !state.open;
  if (state.open) {
    await nextTick()
    showOut()
    router.replace({
      query: {
        project: state.project,
        assist: state.assist
      }
    })
  }
}

async function onClear() {
  router.replace({ query: null })
  window.history.replaceState(null, '', '/book' + route.fullPath.split('?')[0]);
  window.location.reload()
}

function showOut() {
  const { onload, onbeforeunload, onresize, setScale } = window.Live2d({
    el: '#board-girl',
    size: props.size,
    quality: 2,
    resourcesPath: `${BASE_URL}/${state.project}/`,
    modelDir: [state.assist],
    bindFullscreen: true
  })

  onload()

  window.addEventListener('beforeunload', onbeforeunload)
  window.addEventListener('resize', onresize)
  watch(() => state.scale, (newScale) => {
    setScale(newScale)
  })
}

// dynamic import live2d scripts
function loadLive2d() {
  return new Promise((resolve) => {
    const id = 'live2dcubis';
    if (!!document.getElementById(id)) resolve();
    const script = document.createElement('script');
    const script2 = document.createElement('script');
    script.id = id;

    let count = 0;
    const load = () => {
      count++;
      if (count === 2) resolve();
    };
    script.onload = load();
    script2.onload = load();
    script.src = '/book/live2dcubismcore.min.js';
    script2.src = '/book/live2d-bundle-v1.0.js';
    document.head.appendChild(script);
    document.head.appendChild(script2);
  })
}

async function initFromQuery() {
  const { project, assist } = route.query
  await loadLive2d();
  if (state.assists[project] && state.assists[project].includes(assist)) {
    state.project = project
    state.assist = assist
    await nextTick()
    toggleOpen()
  }
}

onMounted(() => {
  initFromQuery()
})
</script>

<style scoped lang="scss">
.board-wrapper {
  margin: 60px auto 80px;
  width: 100%;
  min-height: 500px;
  &.fixed {
    right: 0;
    bottom: 0;
    width: 500px;
    height: 500px;
  }
  canvas {
    width: 100%;
    height: 100%;
  }
  .panel {
    position: absolute;
    right: 0;
    left: 0;
    bottom: 0;
    margin: auto;
    text-align: center;
    min-width: 250px;
    transform: translateY(100%);
    > select {
      width: 80px;
      padding: 6px 0;
      margin-right: 12px;
      border-radius: 10px;
      font-size: 20px;
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
