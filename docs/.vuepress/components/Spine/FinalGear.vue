<template>
  <div :style="`position: ${position}`" :class="['board-wrapper', position, state.assist]">
    <div class="board-girl-wrapper">
      <div v-show="state.open" id="board-girl" :style="{ transform: `scale(${state.scale})` }"></div>
    </div>

    <div class="panel" v-if="!state.open">
      <select v-model="state.assist">
        <option
          v-for="assist in state.assists"
          :key="`assist_${assist}`"
          :value="assist"
        >{{ assist }}</option>
      </select>
      <div class="call-assist" @click="toggleOpen">
        呼叫助理
      </div>
    </div>
    <template v-else>
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
import { onMounted, reactive, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const props = defineProps({
  position: {
    type: String,
    default: 'fixed'
  },
})

const router = useRouter()
const route = useRoute()

const BASE_URL = process.env.NODE_ENV === 'production'
  ? 'https://johnnywang1994.github.io/assets/spine/gear'
  : 'https://johnnywang1994.github.io/assets/spine/gear'
  // : '/book/Resources/spine/gear';

const state = reactive({
  open: false,
  scale: 1,
  assist: '',
  assists: [
    "100010",
    "100011",
    "100012",
    "100015",
    "100093",
    "100111",
    "100123",
    "100201",
    "100202",
    "100204",
    "100206",
    "100211",
    "100212",
    "100213",
    "100242",
    "100243",
    "100283",
    "100293",
    "100310",
    "100311",
    "100320",
    "100321",
    "100322",
    "100323",
    "100324",
    "100325",
    "100326",
    "100335",
    "100343",
    "100351",
    "100352",
    "100361",
    "100362",
    "100363",
    "100370",
    "100372",
    "100373",
    "100431",
    "100433",
    "100434",
    "100461",
    "100462",
    "100472",
    "100491",
    "100500",
    "100501",
    "100502",
    "100503",
    "100510",
    "100520",
    "100521",
    "100522",
    "100523",
    "100540",
    "100541",
    "100550",
    "100553",
    "100560",
    "100561",
    "100562",
    "100563",
    "100564",
    "100600",
    "100650",
    "100670",
    "100671",
    "100672",
    "100673",
    "100683",
    "100700",
    "100701",
    "100702",
    "100703",
    "100704",
    "100722",
    "100740",
    "100741",
    "100781",
    "100782",
    "100801",
    "100804",
    "100810",
    "100811",
    "100812",
    "100813",
    "100820",
    "100821",
    "100822",
    "100823",
    "100824",
    "100830",
    "100832",
    "100833",
    "100834",
    "100840",
    "100851",
    "100852",
    "100861",
    "100862",
    "100872",
    "100910",
    "100911",
    "100912",
    "100940",
    "100941",
    "100942",
    "100960",
    "100961",
    "100980",
    "100990",
    "101010",
    "101020",
    "101050",
    "101051",
    "101061",
    "101062",
    "101063",
    "101080",
    "101081",
    "101082",
    "101084",
    "101160",
    "101161",
    "101162",
    "101163",
    "101172",
    "101173",
    "101190",
    "101201",
    "101240",
    "101280",
    "101281",
    "101480",
    "101490",
    "101511",
    "101600",
    "101711",
    "101722",
    "101771",
    "101790",
    "101792",
    "101800",
    "101811",
    "101840",
  ],
});

async function toggleOpen() {
  state.open = !state.open;
  if (state.open) {
    await nextTick()
    showOut()
    router.replace({
      query: {
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
  const getOptions = (id) => ({
    json: `${BASE_URL}/${id}/Pilot_${id}.json`,
    atlas: `${BASE_URL}/${id}/Pilot_${id}.atlas`, // atlas name must match your png name
    tryAnimations: ['idle4', 'idle2', 'idle'],
    backgroundColor: "#00000000",
    // scale: 0.2
  });
  new spine.SpineWidget('board-girl', getOptions(state.assist));
}

// dynamic import Spine Widget scripts
function loadSpineWidget() {
  return new Promise((resolve) => {
    const id = 'spine-widget';
    if (!!document.getElementById(id)) resolve();
    const script = document.createElement('script');
    script.id = id;

    script.onload = () => resolve();
    script.src = '/book/spine-widget-v3.6.js';
    document.head.appendChild(script);
  })
}

async function initFromQuery() {
  const { assist } = route.query
  await loadSpineWidget();
  if (state.assists.includes(assist)) {
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
  display: flex;
  flex-direction: column;
  margin: 60px auto 80px;
  width: 100%;
  min-height: 500px;
  &.fixed {
    right: 0;
    bottom: 0;
    width: 500px;
    height: 500px;
  }
  .board-girl-wrapper {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    overflow: hidden;
    #board-girl {
      flex-grow: 1;
    }
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