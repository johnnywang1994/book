import{_ as o,o as r,c,d as e,e as t}from"./app-da643460.js";const s={},a=e("h1",{id:"core-decorators-source-code-深入理解實現",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#core-decorators-source-code-深入理解實現","aria-hidden":"true"},"#"),t(" Core Decorators Source code 深入理解實現")],-1),d=e("p",null,"Hi 大家好，我是 Johnny，今天要帶大家來看一個相對於 functional 而言較為沒這麼為人所知的東西-decorator，中文名叫裝飾器",-1),n=e("ul",null,[e("li",null,"在寫入 descriptor 前必須確保在此之前的其他 decorator getter 已經完成觸發調用，否則當前 defineProperty 執行後，會被前面的其他 decorator getter 執行時覆蓋掉導致當前 decorator 不會執行")],-1),_=[a,d,n];function l(i,u){return r(),c("div",null,_)}const f=o(s,[["render",l],["__file","core-decorators-source-code.html.vue"]]);export{f as default};