<template>
  <div class="maju-body">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300">
      <title>maju</title>
      <defs>
        <filter id="svg_26_blur">
        <feGaussianBlur stdDeviation="1" in="SourceGraphic"/>
        </filter>
      </defs>
      <g>
        <title>Layer 1</title>
        <ellipse stroke="#000" stroke-width="3" ry="131.50001" rx="168.5" id="svg_7" cy="152.50001" cx="200.5" fill="none"/>
        <g id="svg_29">
        <ellipse stroke="#000" ry="8" rx="11" id="svg_12" cy="142" cx="187" fill="#fff"/>
        <ellipse stroke="#000" ry="8" rx="11" id="svg_13" cy="142" cx="207" fill="#fff"/>
        <ellipse stroke="#fff" ry="7" rx="8" id="svg_10" cy="135" cx="197" fill="#000"/>
        <ellipse ry="12" rx="11.5" id="svg_16" cy="137" cx="151.5" stroke="#fff" fill="#000"/>
        <ellipse ry="12" rx="11.5" id="svg_17" cy="131" cx="237.5" stroke="#fff" fill="#000"/>
        <line id="svg_18" y2="127" x2="276" y1="129" x1="263" stroke="#fff" fill="none"/>
        <line transform="rotate(-20.8545 272.278 127.418)" stroke="#000000" stroke-width="3" id="svg_20" y2="127.41782" x2="279.29552" y1="127.41782" x1="265.26091" fill="none"/>
        <line transform="rotate(-13.0703 275.337 139.172)" stroke="#000000" stroke-width="3" id="svg_21" y2="139.17196" x2="283.44169" y1="139.17196" x1="267.23275" fill="none"/>
        <line transform="rotate(-9.99311 272.763 150.332)" stroke="#000000" stroke-width="3" id="svg_22" y2="150.33237" x2="280.27288" y1="150.33237" x1="265.25344" fill="none"/>
        <line transform="rotate(8.44841 118.278 139.418)" stroke="#000000" stroke-width="3" id="svg_23" y2="139.41782" x2="125.29552" y1="139.41782" x1="111.26091" fill="none"/>
        <line transform="rotate(-1.92983 118.78 151.468)" stroke="#000000" stroke-width="3" id="svg_24" y2="151.46829" x2="127.29636" y1="151.46829" x1="110.26346" fill="none"/>
        <line transform="rotate(-19.7404 120.288 163.514)" stroke="#000000" stroke-width="3" id="svg_25" y2="163.5141" x2="128.30019" y1="163.5141" x1="112.27496" fill="none"/>
        <ellipse opacity="0.5" filter="url(#svg_26_blur)" ry="16.5" rx="16.5" id="svg_26" cy="136.5" cx="286.5" stroke-width="0" fill="#FFB27C"/>
        <ellipse opacity="0.5" filter="url(#svg_26_blur)" ry="16.5" rx="16.5" id="svg_28" cy="150.5" cx="104.5" stroke-width="0" fill="#FFB27C"/>
        </g>
      </g>
    </svg>
  </div>
</template>

<script>
export default {
  name: 'MajuBody',
};
</script>

<style lang="scss">
.maju-body {
  width: 100%;
  > svg {
    max-width: 100%;
  }
}
</style>
