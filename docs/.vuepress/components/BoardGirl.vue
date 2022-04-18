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
        <div class="call-assist" @click="onClear">
          Clear
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { onMounted, reactive, nextTick, computed } from 'vue'
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
  : '/book/Resources'

const state = reactive({
  open: false,
  assist: '',
  project: '',
  assists: {
    demo: ['Hiyori', 'Rice'],
    'girls-frontline': [
      "97type",
      "97type_406",
      "Aa12_2403",
      "Ads_3601",
      "Ak12_2402",
      "Akalfa_4601",
      "Ar15",
      "Browninghp_4602",
      "Carcano1891_2201",
      "Carcano1891_2905",
      "Carcano1938_2202",
      "Carcano1938_2904",
      "Cbjms_2205",
      "Cbjms_3503",
      "Contender_2302",
      "Dsr50_2101",
      "Fn57_2203",
      "G11_4102",
      "G11_9",
      "G36_1904",
      "G36c_1202",
      "G36c_3103",
      "G41",
      "Generalliu_5101",
      "Grizzly",
      "Hk416_3401",
      "Hk416_805",
      "Hkcaws_4003",
      "Js9mm_4702",
      "K2_3301",
      "Kord_5102",
      "Kp31_1103",
      "Kp31_310",
      "Lewis_3502",
      "Lewis_4001",
      "Lewis_5501",
      "LiveroiD_A-Y01",
      "LiveroiD_A-Y02",
      "M1891",
      "M4Sopmod_ii_4507",
      "M950a_4302",
      "M99_3304",
      "Mdr_2603",
      "Mk1",
      "Mk23_3105",
      "Mk23_8",
      "Ots14_3001",
      "Ots14_4501",
      "Ots14_5602",
      "P22_3902",
      "P90_2802",
      "Pa15_3701",
      "Pa15_4202",
      "Pkp_1201",
      "R5rgp_5302",
      "R93_3501",
      "R93_4904",
      "Rfb_1601",
      "Ro635_4504",
      "Sat8_2601",
      "Sl8_4704",
      "Spitfire_1405",
      "Sr3mp_3704",
      "Tabuk_4906",
      "Tac50_2602",
      "Type64-ar_2901",
      "Ump45_3403",
      "Ump9_3404",
      "Vector_1901",
      "Wa2000_1108",
      "Wa2000_306",
      "Wa2000_6",
      "Welrod_1401",
      "Welrod_2103",
      "Zb26_4703"
    ],
    'azue-lane': [
      "abeikelongbi_3",
      "aidang_2",
      "aierdeliqi_4",
      "aierdeliqi_5",
      "ailunsamuna_2_hx",
      "aimierbeierding_2",
      "aisaikesi_4",
      "baerdimo_5",
      "banrenma_2",
      "beierfasite_2",
      "beikaluolaina_2",
      "biaoqiang_3",
      "bisimai_2",
      "boyixi_2",
      "bulaimodun_2",
      "bulaimodun_4",
      "chaijun_3",
      "chuixue_3",
      "dafeng_2",
      "dafeng_4",
      "daofeng_4",
      "dujiaoshou_4",
      "dujiaoshou_6",
      "dunkeerke_2",
      "edu_3",
      "edu_4",
      "huonululu_5",
      "jialisuoniye_3",
      "jialisuoniye_4",
      "junhe_5",
      "lafei"
    ]
  },
  projects: [
    'demo',
    'girls-frontline',
    'azue-lane'
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
  const { onload, onbeforeunload, onresize } = window.Live2d({
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
}

async function initFromQuery() {
  const { project, assist } = route.query
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
  margin: 60px auto;
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
    bottom: 12px;
    margin: auto;
    text-align: center;
    min-width: 250px;
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
