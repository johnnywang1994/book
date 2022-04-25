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
  : '/book/Resources'

const state = reactive({
  open: false,
  scale: 1,
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
    'girls-cafe-gun': [
      "0113upd__l2d_356.u",
      "0113upd__l2d_358.u",
      "0113upd__l2d_359.u",
      "0202upd__l2d_345.u",
      "0202upd__l2d_349.u",
      "0202upd__l2d_351.u",
      "0202upd__l2d_355.u",
      "0202upd__l2d_379.u",
      "0202upd__l2d_385.u",
      "0629upd__l2d_362.u",
      "0629upd__l2d_363.u",
      "0828upd__l2d_380.u",
      "0828upd__l2d_381.u",
      "0828upd__l2d_391.u",
      "0911upd__l2d_344.u",
      "0911upd__l2d_348.u",
      "0925upd__l2d_365.u",
      "0925upd__l2d_367.u",
      "10qpt01__l2d_354.u",
      "10qpt01__l2d_355.u",
      "10qpt01__l2d_356.u",
      "10qpt01__l2d_357.u",
      "1119upd__l2d_370.u",
      "12qpt02__l2d_375.u",
      "12qpt03__l2d_376.u",
      "12qpt04__l2d_377.u",
      "12qpt05__l2d_378.u",
      "28__l2d_117.u",
      "28__l2d_119.u",
      "29__l2d_120.u",
      "33__l2d_136.u",
      "34__l2d_137.u",
      "35__l2d_138.u",
      "36__l2d_139.u",
      "3__l2d_31.u",
      "47__l2d_200.u",
      "47__l2d_201.u",
      "47__l2d_202.u",
      "47__l2d_203.u",
      "5__l2d_33.u",
      "6__l2d_34.u",
      "724upd__l2d_383.u",
      "724upd__l2d_385.u",
      "724upd__l2d_386.u",
      "724upd__l2d_387.u",
      "724upd__l2d_388.u",
      "724upd__l2d_389.u",
      "724upd__l2d_390.u",
      "8qpt01__l2d_322.u",
      "8qpt01__l2d_323.u",
      "8qpt01__l2d_324.u",
      "9qpt01__l2d_326.u",
      "9qpt01__l2d_328.u",
      "g10_l2d08.u",
      "g10_l2d26.u",
      "g10_l2d3008.u",
      "g12_l2d00.u",
      "g12_l2d01.u",
      "g12_l2d02.u",
      "g1_l2d00.u",
      "g1_l2d01.u",
      "g1_l2d02.u",
      "g1_l2d03.u",
      "g1_l2d04.u",
      "g1_l2d26.u",
      "g1_l2d29.u",
      "g1_l2d8002.u",
      "g2_l2d17.u",
      "g2_l2d5017.u",
      "g3_l2d04.u",
      "g3_l2d22.u",
      "g3_l2d24.u",
      "g5_l2d03.u",
      "g6_l2d02.u",
      "g6_l2d03.u",
      "g6_l2d5017.u",
      "g7_l2d01.u",
      "g7_l2d02.u",
      "g7_l2d03.u",
      "g7_l2d8002.u",
      "g8_l2d03.u",
      "g8_l2d04.u",
      "g8_l2d12.u",
      "g8_l2d17.u",
      "g8_l2d21.u",
      "g9_l2d00.u",
      "g9_l2d03.u",
      "g9_l2d3008.u",
      "l2d1__l2d_75.u",
      "l2d3__l2d_78.u",
      "l2d4__l2d_182.u",
      "l2d5__l2d_139.u",
      "l2d6__l2d_184.u",
      "l2d7__l2d_76.u",
      "l2d8001.u",
      "newg01__l2d_296.u",
      "swg02__l2d_292.u",
      "swg03__l2d_293.u",
      "tw75__l2d_233.u",
      "tw75__l2d_234.u",
      "xnl2d2__l2d_223.u",
      "xnl2d3__l2d_224.u",
      "ybxd0414__l2d_336.u",
      "ybxd0414__l2d_338.u",
      "ybxd0414__l2d_339.u",
      "yhl2d1__l2d_271.u",
      "zst0518__l2d_360.u",
      "zst0518__l2d_361.u"
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
      "lafei",
      "lingbo",
      "lingbo_10",
      "lisailiu_2",
      "luyijiushi_2",
      "mingshi",
      "nengdai_2",
      "ninghai_4",
      "ougen_5",
      "ouruola_4",
      "pinghai_4",
      "qiye_7",
      "rangbaer_4",
      "sipeibojue_5",
      "taiyuan_2",
      "tierbici_2",
      "weixi_2",
      "weiyan_2",
      "wuqi_2",
      "xixuegui_4",
      "xuefeng_3",
      "xukufu_2",
      "xukufu_3_hx",
      "yichui_2",
      "z23",
      "z46_2",
      "z46_3",
      "z46_4"
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
      "xch001_01",
      "xch001b_01",
      "xch002_01",
      "xch003_01",
      "xch004_01",
      "xch004a_01",
      "xch006_01",
      "xch007_01",
      "xch009_01",
      "xch011_01",
      "xch013_01",
      "xch014_01",
      "xch015_01",
      "xch016_01",
      "xco005_01",
      "xco005a_01",
      "xco008_01",
      "xco009_01",
      "xco010_01",
      "xco011_01",
      "xco011a_01",
      "xco012_01",
      "xco013_01",
      "xco013a_01",
      "xco017_01",
      "xco025_01",
      "xco028_01",
      "xco029_01",
      "xco030_01",
      "xco031_01",
      "xco032_01",
      "xco033_01",
      "xco035_01",
      "xco036_01",
      "xco049_01",
      "xco052_01",
      "xco053_01",
      "xco057_01",
      "xco058_01",
      "xco059_01",
      "xco060_01",
      "xco063_01",
      "xco065_01",
      "xco074_01",
      "xco075_01",
      "xco076_01",
      "xco502_01",
      "ych004_01",
      "ych013_01",
      "yco017_01"
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
