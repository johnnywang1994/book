import{_ as c,r as t,o as l,c as i,a,d as n,e as s,f as u}from"./app-5f5a908c.js";const r={},k=n("h1",{id:"純-css-實作星球環繞動畫效果",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#純-css-實作星球環繞動畫效果","aria-hidden":"true"},"#"),s(" 純 CSS 實作星球環繞動畫效果")],-1),d=n("h6",{id:"tags-css-animation-transform",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#tags-css-animation-transform","aria-hidden":"true"},"#"),s(" tags: "),n("code",null,"CSS"),s(),n("code",null,"animation"),s(),n("code",null,"transform")],-1),v=n("p",null,"Hi 大家好，今天要來介紹一個很酷炫的特效 - 『星球環繞效果』",-1),m={href:"https://juejin.cn/post/6987043290444988424",target:"_blank",rel:"noopener noreferrer"},b=n("p",null,[s("經過我魔改操作後，實際製作的動畫效果如下，主要是結合了 css 的 "),n("code",null,"transform"),s(" 效果搭配之前學習過的 "),n("code",null,"box-shadow"),s(" 製作太空星星群的效果，讓原本的星球動畫更佳真實逼真，另外也把原文中的星球運行軌道變成"),n("code",null,"多軌道不同時差"),s("的方式，歡迎有興趣玩玩的朋友實際動手試試看喔～")],-1),g=n("h2",{id:"成果-demo",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#成果-demo","aria-hidden":"true"},"#"),s(" 成果 Demo")],-1),f=u(`<h2 id="sourcecode" tabindex="-1"><a class="header-anchor" href="#sourcecode" aria-hidden="true">#</a> SourceCode</h2><div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code><span class="token comment">&lt;!-- 主場景 --&gt;</span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>scene<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
  <span class="token comment">&lt;!-- 星星群 --&gt;</span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>star small<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>star big<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>

  <span class="token comment">&lt;!-- 星球群 --&gt;</span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>planet<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
    <span class="token comment">&lt;!-- 地球軌道 --&gt;</span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>road earth<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>ball<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
    <span class="token comment">&lt;!-- 木星軌道 --&gt;</span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>road jupiter<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>ball<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>

  <span class="token comment">&lt;!-- 太陽本人 --&gt;</span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>sun<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-scss line-numbers-mode" data-ext="scss"><pre class="language-scss"><code><span class="token keyword">@use</span> <span class="token string">&quot;sass:math&quot;</span><span class="token punctuation">;</span>

<span class="token keyword">@function</span> <span class="token function">randomNum</span><span class="token punctuation">(</span><span class="token variable">$max</span><span class="token punctuation">,</span> <span class="token property"><span class="token variable">$min</span></span><span class="token punctuation">:</span> 0<span class="token punctuation">,</span> <span class="token property"><span class="token variable">$u</span></span><span class="token punctuation">:</span> 1<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">@return</span> <span class="token punctuation">(</span><span class="token variable">$min</span> <span class="token operator">+</span> <span class="token function">random</span><span class="token punctuation">(</span><span class="token variable">$max</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">*</span> <span class="token variable">$u</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">@function</span> <span class="token function">shadowSet</span><span class="token punctuation">(</span><span class="token variable">$n</span><span class="token punctuation">,</span> <span class="token variable">$size</span><span class="token punctuation">,</span> <span class="token property"><span class="token variable">$w</span></span><span class="token punctuation">:</span> 500<span class="token punctuation">,</span> <span class="token property"><span class="token variable">$h</span></span><span class="token punctuation">:</span> 500<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token property"><span class="token variable">$shadow</span></span> <span class="token punctuation">:</span> 0 0 0 0 #fff<span class="token punctuation">;</span>

  <span class="token keyword">@for</span> <span class="token variable">$i</span> <span class="token keyword">from</span> 0 <span class="token keyword">through</span> <span class="token selector"><span class="token variable">$n</span> </span><span class="token punctuation">{</span>
    <span class="token property"><span class="token variable">$x</span></span><span class="token punctuation">:</span> <span class="token function">randomNum</span><span class="token punctuation">(</span><span class="token variable">$w</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token property"><span class="token variable">$y</span></span><span class="token punctuation">:</span> <span class="token function">randomNum</span><span class="token punctuation">(</span><span class="token variable">$h</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token property"><span class="token variable">$scale</span></span><span class="token punctuation">:</span> <span class="token function">randomNum</span><span class="token punctuation">(</span><span class="token variable">$size</span><span class="token punctuation">)</span> <span class="token operator">/</span> 10<span class="token punctuation">;</span>

    <span class="token property"><span class="token variable">$shadow</span></span><span class="token punctuation">:</span> <span class="token variable">$shadow</span><span class="token punctuation">,</span> <span class="token variable">#{$x}</span>px <span class="token variable">#{$y}</span>px 0 <span class="token variable">#{$scale}</span>px <span class="token function">rgba</span><span class="token punctuation">(</span>255<span class="token punctuation">,</span> 255<span class="token punctuation">,</span> 255<span class="token punctuation">,</span> 0.8<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">@return</span> <span class="token variable">$shadow</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token atrule"><span class="token rule">@keyframes</span> planet-rotate</span> <span class="token punctuation">{</span>
  <span class="token selector">0% </span><span class="token punctuation">{</span>
    <span class="token comment">// 執行順序：右到左，先旋轉，再壓縮</span>
    <span class="token property">transform</span><span class="token punctuation">:</span> <span class="token function">rotateZ</span><span class="token punctuation">(</span>30deg<span class="token punctuation">)</span> <span class="token function">scaleY</span><span class="token punctuation">(</span>0.5<span class="token punctuation">)</span> <span class="token function">rotateZ</span><span class="token punctuation">(</span>0<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token selector">100% </span><span class="token punctuation">{</span>
    <span class="token property">transform</span><span class="token punctuation">:</span> <span class="token function">rotateZ</span><span class="token punctuation">(</span>30deg<span class="token punctuation">)</span> <span class="token function">scaleY</span><span class="token punctuation">(</span>0.5<span class="token punctuation">)</span> <span class="token function">rotateZ</span><span class="token punctuation">(</span>360deg<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token atrule"><span class="token rule">@keyframes</span> self-rotate</span> <span class="token punctuation">{</span>
  <span class="token selector">0% </span><span class="token punctuation">{</span>
    <span class="token comment">// 相反解鎖：先拉長，抵銷旋轉</span>
    <span class="token property">transform</span><span class="token punctuation">:</span> <span class="token function">rotateZ</span><span class="token punctuation">(</span>0<span class="token punctuation">)</span> <span class="token function">scaleY</span><span class="token punctuation">(</span>2<span class="token punctuation">)</span> <span class="token function">rotateZ</span><span class="token punctuation">(</span>-30deg<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token selector">100% </span><span class="token punctuation">{</span>
    <span class="token property">transform</span><span class="token punctuation">:</span> <span class="token function">rotateZ</span><span class="token punctuation">(</span>-360deg<span class="token punctuation">)</span> <span class="token function">scaleY</span><span class="token punctuation">(</span>2<span class="token punctuation">)</span> <span class="token function">rotateZ</span><span class="token punctuation">(</span>-30deg<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token atrule"><span class="token rule">@keyframes</span> sun-shine</span> <span class="token punctuation">{</span>
  <span class="token selector">0% </span><span class="token punctuation">{</span>
    <span class="token property">filter</span><span class="token punctuation">:</span> <span class="token function">brightness</span><span class="token punctuation">(</span>0.9<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token selector">50% </span><span class="token punctuation">{</span>
    <span class="token property">filter</span><span class="token punctuation">:</span> <span class="token function">brightness</span><span class="token punctuation">(</span>1.1<span class="token punctuation">)</span> <span class="token function">drop-shadow</span><span class="token punctuation">(</span>0 0 30px #ffc200<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token selector">100% </span><span class="token punctuation">{</span>
    <span class="token property">filter</span><span class="token punctuation">:</span> <span class="token function">brightness</span><span class="token punctuation">(</span>0.9<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token atrule"><span class="token rule">@keyframes</span> star-move</span> <span class="token punctuation">{</span>
  <span class="token selector">0% </span><span class="token punctuation">{</span>
    <span class="token property">transform</span><span class="token punctuation">:</span> <span class="token function">translateX</span><span class="token punctuation">(</span>0<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token selector">100% </span><span class="token punctuation">{</span>
    <span class="token property">transform</span><span class="token punctuation">:</span> <span class="token function">translateX</span><span class="token punctuation">(</span>-500px<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token selector">.scene </span><span class="token punctuation">{</span>
  <span class="token property">position</span><span class="token punctuation">:</span> relative<span class="token punctuation">;</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 100%<span class="token punctuation">;</span>
  <span class="token property">aspect-ratio</span><span class="token punctuation">:</span> 1 <span class="token operator">/</span> 1<span class="token punctuation">;</span>
  <span class="token property">background</span><span class="token punctuation">:</span> black<span class="token punctuation">;</span>
  <span class="token property">overflow</span><span class="token punctuation">:</span> hidden<span class="token punctuation">;</span>
  <span class="token selector">.star </span><span class="token punctuation">{</span>
    <span class="token property">background</span><span class="token punctuation">:</span> white<span class="token punctuation">;</span>
    <span class="token property">border-radius</span><span class="token punctuation">:</span> 9999px<span class="token punctuation">;</span>
    <span class="token selector"><span class="token parent important">&amp;</span>.small </span><span class="token punctuation">{</span>
      <span class="token property">width</span><span class="token punctuation">:</span> 1px<span class="token punctuation">;</span>
      <span class="token property">height</span><span class="token punctuation">:</span> 1px<span class="token punctuation">;</span>
      <span class="token property">box-shadow</span><span class="token punctuation">:</span> <span class="token function">shadowSet</span><span class="token punctuation">(</span>500<span class="token punctuation">,</span> 10<span class="token punctuation">,</span> 2000<span class="token punctuation">,</span> 1000<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token property">animation</span><span class="token punctuation">:</span> star-move 60s linear infinite<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token selector"><span class="token parent important">&amp;</span>.big </span><span class="token punctuation">{</span>
      <span class="token property">width</span><span class="token punctuation">:</span> 2px<span class="token punctuation">;</span>
      <span class="token property">height</span><span class="token punctuation">:</span> 2px<span class="token punctuation">;</span>
      <span class="token property">box-shadow</span><span class="token punctuation">:</span> <span class="token function">shadowSet</span><span class="token punctuation">(</span>200<span class="token punctuation">,</span> 10<span class="token punctuation">,</span> 2000<span class="token punctuation">,</span> 1000<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token property">animation</span><span class="token punctuation">:</span> star-move 80s linear infinite<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token selector">.planet </span><span class="token punctuation">{</span>
  <span class="token property">position</span><span class="token punctuation">:</span> absolute<span class="token punctuation">;</span>
  <span class="token property">top</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
  <span class="token property">left</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
  <span class="token property">right</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
  <span class="token property">bottom</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
  <span class="token property">margin</span><span class="token punctuation">:</span> auto<span class="token punctuation">;</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 100%<span class="token punctuation">;</span>
  <span class="token property">height</span><span class="token punctuation">:</span> 100%<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">.road </span><span class="token punctuation">{</span>
  <span class="token property">position</span><span class="token punctuation">:</span> absolute<span class="token punctuation">;</span>
  <span class="token property">top</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
  <span class="token property">left</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
  <span class="token property">right</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
  <span class="token property">bottom</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
  <span class="token property">margin</span><span class="token punctuation">:</span> auto<span class="token punctuation">;</span>
  <span class="token property">color</span><span class="token punctuation">:</span> #888<span class="token punctuation">;</span>
  <span class="token selector"><span class="token parent important">&amp;</span>.earth </span><span class="token punctuation">{</span>
    <span class="token property">width</span><span class="token punctuation">:</span> 60%<span class="token punctuation">;</span>
    <span class="token property">height</span><span class="token punctuation">:</span> 60%<span class="token punctuation">;</span>
    <span class="token property">border</span><span class="token punctuation">:</span> 1px solid currentColor<span class="token punctuation">;</span>
    <span class="token property">border-radius</span><span class="token punctuation">:</span> 9999px<span class="token punctuation">;</span>
    <span class="token property">animation</span><span class="token punctuation">:</span> planet-rotate 6s linear infinite<span class="token punctuation">;</span>
    <span class="token selector">.ball </span><span class="token punctuation">{</span>
      <span class="token property">position</span><span class="token punctuation">:</span> absolute<span class="token punctuation">;</span>
      <span class="token property">left</span><span class="token punctuation">:</span> <span class="token function">calc</span><span class="token punctuation">(</span>50% <span class="token operator">-</span> 15px<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token property">top</span><span class="token punctuation">:</span> -15px<span class="token punctuation">;</span>
      <span class="token property">width</span><span class="token punctuation">:</span> 30px<span class="token punctuation">;</span>
      <span class="token property">height</span><span class="token punctuation">:</span> 30px<span class="token punctuation">;</span>
      <span class="token property">background</span><span class="token punctuation">:</span> <span class="token function">linear-gradient</span><span class="token punctuation">(</span>to top<span class="token punctuation">,</span> #6fa8ea 10%<span class="token punctuation">,</span> #008cff 50%<span class="token punctuation">,</span> #6fa8ea 90%<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token property">border-radius</span><span class="token punctuation">:</span> 9999px<span class="token punctuation">;</span>
      <span class="token property">animation</span><span class="token punctuation">:</span> self-rotate 6s linear infinite<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  <span class="token selector"><span class="token parent important">&amp;</span>.jupiter </span><span class="token punctuation">{</span>
    <span class="token property">width</span><span class="token punctuation">:</span> 100%<span class="token punctuation">;</span>
    <span class="token property">height</span><span class="token punctuation">:</span> 100%<span class="token punctuation">;</span>
    <span class="token property">border</span><span class="token punctuation">:</span> 1px solid currentColor<span class="token punctuation">;</span>
    <span class="token property">border-radius</span><span class="token punctuation">:</span> 9999px<span class="token punctuation">;</span>
    <span class="token property">animation</span><span class="token punctuation">:</span> planet-rotate 72s linear infinite<span class="token punctuation">;</span>
    <span class="token selector">.ball </span><span class="token punctuation">{</span>
      <span class="token property">position</span><span class="token punctuation">:</span> absolute<span class="token punctuation">;</span>
      <span class="token property">left</span><span class="token punctuation">:</span> <span class="token function">calc</span><span class="token punctuation">(</span>50% <span class="token operator">-</span> 30px<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token property">top</span><span class="token punctuation">:</span> -30px<span class="token punctuation">;</span>
      <span class="token property">width</span><span class="token punctuation">:</span> 60px<span class="token punctuation">;</span>
      <span class="token property">height</span><span class="token punctuation">:</span> 60px<span class="token punctuation">;</span>
      <span class="token property">background</span><span class="token punctuation">:</span> <span class="token function">linear-gradient</span><span class="token punctuation">(</span>to top<span class="token punctuation">,</span> #ff6f00 10%<span class="token punctuation">,</span> #d43100 50%<span class="token punctuation">,</span> #ff6f00 90%<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token property">border-radius</span><span class="token punctuation">:</span> 9999px<span class="token punctuation">;</span>
      <span class="token property">animation</span><span class="token punctuation">:</span> self-rotate 72s linear infinite<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token selector">.sun </span><span class="token punctuation">{</span>
  <span class="token property">position</span><span class="token punctuation">:</span> absolute<span class="token punctuation">;</span>
  <span class="token property">top</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
  <span class="token property">left</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
  <span class="token property">right</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
  <span class="token property">bottom</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
  <span class="token property">margin</span><span class="token punctuation">:</span> auto<span class="token punctuation">;</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 120px<span class="token punctuation">;</span>
  <span class="token property">height</span><span class="token punctuation">:</span> 120px<span class="token punctuation">;</span>
  <span class="token property">border-radius</span><span class="token punctuation">:</span> 9999px<span class="token punctuation">;</span>
  <span class="token property">background</span><span class="token punctuation">:</span> #ffc200<span class="token punctuation">;</span>
  <span class="token property">animation</span><span class="token punctuation">:</span> sun-shine 8s linear infinite<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>以上，希望大家會喜歡這種小動畫系列ＸＤ，算是週末無聊晚上製作的一些小玩意，那我們下次見拉～</p>`,4),h=n("h2",{id:"參考",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#參考","aria-hidden":"true"},"#"),s(" 參考")],-1),y={href:"https://juejin.cn/post/6987043290444988424",target:"_blank",rel:"noopener noreferrer"};function x(_,w){const p=t("SocialBlock"),e=t("ExternalLinkIcon"),o=t("Article-CssPlanet");return l(),i("div",null,[k,d,a(p,{hashtags:"css,animation,transform,star,planet"}),v,n("p",null,[s("因為本篇是在看到"),n("a",m,[s("這篇文章"),a(e)]),s("後，我在學習後自己延伸一個隨性與應用實作筆記，相關實作細節就不重複介紹了，有興趣的可以看原文章我覺得解釋的非常不錯～")]),b,g,a(o),f,a(p,{hashtags:"css,animation,transform,star,planet"}),h,n("ul",null,[n("li",null,[n("a",y,[s("CSS 動畫實現星球環繞效果"),a(e)])])])])}const $=c(r,[["render",x],["__file","css-planet.html.vue"]]);export{$ as default};
