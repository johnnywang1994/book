import{_ as p,r as t,o as c,c as i,a as e,d as s,e as n,f as l}from"./app-6147e6e2.js";const o={},u=s("h1",{id:"sass-scss-基礎筆記",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#sass-scss-基礎筆記","aria-hidden":"true"},"#"),n(" Sass, SCSS 基礎筆記")],-1),d=s("h6",{id:"tag-css-scss-basic",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#tag-css-scss-basic","aria-hidden":"true"},"#"),n(" tag "),s("code",null,"css"),n(", "),s("code",null,"scss"),n(", "),s("code",null,"basic")],-1),r=l(`<h2 id="usage" tabindex="-1"><a class="header-anchor" href="#usage" aria-hidden="true">#</a> Usage</h2><h3 id="變數定義" tabindex="-1"><a class="header-anchor" href="#變數定義" aria-hidden="true">#</a> 變數定義</h3><p>雖然 CSS 新的功能已可使用變數機制，但各瀏覽器實作的狀況不同，開發上還是稍微不穩定</p><p>且 scss 不只可使用單值變數，更可以定義 array, map 並使用</p><ul><li><p>nth($list, $index), index($list, val), length($list)</p></li><li><p>map-get($map, $key), map-keys($map), map-values($map)</p></li><li><p>append($list, $val), merge($object, $object) 來添加或覆蓋值</p></li></ul><div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code><span class="token selector">*</span> <span class="token punctuation">{</span>
  <span class="token property">--my-color</span><span class="token punctuation">:</span> red<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">.box</span> <span class="token punctuation">{</span>
  <span class="token property">color</span><span class="token punctuation">:</span> <span class="token function">var</span><span class="token punctuation">(</span>--my-color<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-scss line-numbers-mode" data-ext="scss"><pre class="language-scss"><code><span class="token property"><span class="token variable">$my-color</span></span><span class="token punctuation">:</span> red<span class="token punctuation">;</span>
<span class="token property"><span class="token variable">$sizes</span></span><span class="token punctuation">:</span> 50px<span class="token punctuation">,</span> 100px<span class="token punctuation">,</span> 150px<span class="token punctuation">;</span>
<span class="token property"><span class="token variable">$fonts</span></span><span class="token punctuation">:</span> <span class="token punctuation">(</span><span class="token string">&#39;sm&#39;</span><span class="token punctuation">:</span> 13px<span class="token punctuation">,</span> <span class="token string">&#39;md&#39;</span><span class="token punctuation">:</span> 15px<span class="token punctuation">,</span> <span class="token string">&#39;lg&#39;</span><span class="token punctuation">:</span> 17px<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// reassign value with append&#39;s or merge&#39;s return</span>
<span class="token property"><span class="token variable">$sizes</span></span><span class="token punctuation">:</span> <span class="token function">append</span><span class="token punctuation">(</span><span class="token variable">$sizes</span><span class="token punctuation">,</span> 200px<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token property"><span class="token variable">$fonts</span></span><span class="token punctuation">:</span> <span class="token function">map-merge</span><span class="token punctuation">(</span><span class="token variable">$fonts</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token string">&#39;lg&#39;</span><span class="token punctuation">:</span> 21px<span class="token punctuation">,</span> <span class="token string">&#39;xl&#39;</span><span class="token punctuation">:</span> 27px<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token selector">.box </span><span class="token punctuation">{</span>
  <span class="token property">color</span><span class="token punctuation">:</span> <span class="token variable">$my-color</span><span class="token punctuation">;</span>
  <span class="token property">width</span><span class="token punctuation">:</span> <span class="token function">nth</span><span class="token punctuation">(</span><span class="token variable">$sizes</span><span class="token punctuation">,</span> 1<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 50px</span>
  <span class="token property">font-size</span><span class="token punctuation">:</span> <span class="token function">map-get</span><span class="token punctuation">(</span><span class="token variable">$fonts</span><span class="token punctuation">,</span> <span class="token string">&#39;sm&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 13px</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="簡化父層選取" tabindex="-1"><a class="header-anchor" href="#簡化父層選取" aria-hidden="true">#</a> 簡化父層選取</h3><p>可以簡化傳統 CSS 父層重複出現的繁瑣</p><div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code><span class="token selector">#demo .box</span> <span class="token punctuation">{</span>
  <span class="token comment">/* ... */</span>
<span class="token punctuation">}</span>

<span class="token selector">#demo .box .title</span> <span class="token punctuation">{</span>
  <span class="token comment">/* ... */</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-scss line-numbers-mode" data-ext="scss"><pre class="language-scss"><code><span class="token selector">#demo </span><span class="token punctuation">{</span>
  <span class="token selector">.box </span><span class="token punctuation">{</span>
    <span class="token comment">/* ... */</span>
    <span class="token selector">.title </span><span class="token punctuation">{</span>
      <span class="token comment">/* ... */</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="值計算-加減乘除" tabindex="-1"><a class="header-anchor" href="#值計算-加減乘除" aria-hidden="true">#</a> 值計算(加減乘除)</h3><div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code><span class="token selector">.box</span> <span class="token punctuation">{</span>
  <span class="token property">font-size</span><span class="token punctuation">:</span> <span class="token function">calc</span><span class="token punctuation">(</span>10px * 3<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-scss line-numbers-mode" data-ext="scss"><pre class="language-scss"><code><span class="token selector">.box </span><span class="token punctuation">{</span>
  <span class="token property">font-size</span><span class="token punctuation">:</span> 10px <span class="token operator">*</span> 3<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意，剪法計算方式必須兩邊單位相同，不同時仍需使用 calc</p><div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code><span class="token selector">.title</span> <span class="token punctuation">{</span>
  <span class="token property">font-size</span><span class="token punctuation">:</span> <span class="token function">calc</span><span class="token punctuation">(</span>30px - 20px<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-scss line-numbers-mode" data-ext="scss"><pre class="language-scss"><code><span class="token selector">.title </span><span class="token punctuation">{</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 30px <span class="token operator">-</span> 20px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="function" tabindex="-1"><a class="header-anchor" href="#function" aria-hidden="true">#</a> @function</h3><p>函數概念，通常用來返回一個經過計算或處理後的單值，接受傳入參數。</p><div class="language-scss line-numbers-mode" data-ext="scss"><pre class="language-scss"><code><span class="token comment">// \bpx 轉 rem</span>
<span class="token keyword">@function</span> <span class="token function">pxToRem</span><span class="token punctuation">(</span><span class="token variable">$px</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token property"><span class="token variable">$num</span></span><span class="token punctuation">:</span> <span class="token variable">$px</span> <span class="token operator">/</span> 16px<span class="token punctuation">;</span>
  <span class="token keyword">@return</span> <span class="token variable">#{$num}</span>rem<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="mixin" tabindex="-1"><a class="header-anchor" href="#mixin" aria-hidden="true">#</a> @mixin</h3><p>類似函數，通常用來獲得一系列 CSS 設定，接受傳入參數。</p><p>（相同設定複製一份，表面上會增加 code 量，但經實測，@mixin 較 @extend 具有更好的性能）</p><p>（且當使用 @extend 時，需注意 placeholder 的位置是否會覆蓋到目標）</p><div class="language-scss line-numbers-mode" data-ext="scss"><pre class="language-scss"><code><span class="token keyword">@mixin</span> <span class="token selector">block_reset </span><span class="token punctuation">{</span>
  <span class="token property">margin</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
  <span class="token property">padding</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">@mixin</span> <span class="token function">RWD</span><span class="token punctuation">(</span><span class="token variable">$width</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token atrule"><span class="token rule">@media</span> <span class="token punctuation">(</span><span class="token property">max-width</span><span class="token punctuation">:</span> <span class="token variable">$width</span><span class="token punctuation">)</span></span> <span class="token punctuation">{</span>
    <span class="token keyword">@content</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="extend" tabindex="-1"><a class="header-anchor" href="#extend" aria-hidden="true">#</a> @extend</h3><p>擴展集合，將具有相同設定的目標寫在一起，一次設定，不接受傳入參數。</p><p>通常搭配 placeholder 一起使用，將所有目標具有的相同設定綁定到 placeholder 處設定。</p><div class="language-scss line-numbers-mode" data-ext="scss"><pre class="language-scss"><code><span class="token selector"><span class="token placeholder">%col</span> </span><span class="token punctuation">{</span>
  <span class="token property">position</span><span class="token punctuation">:</span> relative<span class="token punctuation">;</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 100%<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">.box-1 </span><span class="token punctuation">{</span>
  <span class="token keyword">@extend</span> <span class="token placeholder selector">%col</span><span class="token punctuation">;</span>
  <span class="token property">color</span><span class="token punctuation">:</span> red<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.box-2 </span><span class="token punctuation">{</span>
  <span class="token keyword">@extend</span> <span class="token placeholder selector">%col</span><span class="token punctuation">;</span>
  <span class="token property">color</span><span class="token punctuation">:</span> blue<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>To</p><div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code><span class="token selector">.box-1, .box-2</span> <span class="token punctuation">{</span>
  <span class="token property">position</span><span class="token punctuation">:</span> relative<span class="token punctuation">;</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 100%<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.box-1</span> <span class="token punctuation">{</span>
  <span class="token property">color</span><span class="token punctuation">:</span> red<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.box-2</span> <span class="token punctuation">{</span>
  <span class="token property">color</span><span class="token punctuation">:</span> blue<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="if-else-條件判斷" tabindex="-1"><a class="header-anchor" href="#if-else-條件判斷" aria-hidden="true">#</a> if / else 條件判斷</h3><p>CSS 中沒有條件判斷的功能</p><div class="language-scss line-numbers-mode" data-ext="scss"><pre class="language-scss"><code><span class="token keyword">@mixin</span> <span class="token function">ta</span><span class="token punctuation">(</span><span class="token variable">$side</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">@if</span> <span class="token selector"><span class="token variable">$side</span> == l </span><span class="token punctuation">{</span>
    <span class="token property">text-align</span><span class="token punctuation">:</span> left<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">@else if</span> <span class="token selector"><span class="token variable">$side</span> == r </span><span class="token punctuation">{</span>
    <span class="token property">text-align</span><span class="token punctuation">:</span> right<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">@else if</span> <span class="token selector"><span class="token variable">$side</span> == j </span><span class="token punctuation">{</span>
    <span class="token property">text-align</span><span class="token punctuation">:</span> justify<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">@else</span> <span class="token punctuation">{</span>
    <span class="token property">text-align</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="for-each-迴圈" tabindex="-1"><a class="header-anchor" href="#for-each-迴圈" aria-hidden="true">#</a> for / each 迴圈</h3><p>CSS 中沒有迴圈的概念，迴圈在構建 framework 時非常好用</p><div class="language-scss line-numbers-mode" data-ext="scss"><pre class="language-scss"><code><span class="token comment">// @for loop(to 不包含，through 包含)</span>
<span class="token keyword">@for</span> <span class="token variable">$i</span> <span class="token keyword">from</span> 1 <span class="token keyword">through</span> <span class="token selector">11 </span><span class="token punctuation">{</span>
  .offset-<span class="token variable">#{$i}</span>
    <span class="token property">margin-left</span><span class="token punctuation">:</span> 100%/12*<span class="token variable">$i</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-scss line-numbers-mode" data-ext="scss"><pre class="language-scss"><code><span class="token comment">// @each loop - array</span>
<span class="token property"><span class="token variable">$sizes</span></span><span class="token punctuation">:</span> 40px<span class="token punctuation">,</span> 50px<span class="token punctuation">,</span> 80px<span class="token punctuation">;</span>

<span class="token keyword">@each</span> <span class="token selector"><span class="token variable">$size</span> in <span class="token variable">$sizes</span> </span><span class="token punctuation">{</span>
  <span class="token selector">.icon-<span class="token variable">#{$size}</span> </span><span class="token punctuation">{</span>
    <span class="token property">font-size</span><span class="token punctuation">:</span> <span class="token variable">$size</span><span class="token punctuation">;</span>
    <span class="token property">height</span><span class="token punctuation">:</span> <span class="token variable">$size</span><span class="token punctuation">;</span>
    <span class="token property">width</span><span class="token punctuation">:</span> <span class="token variable">$size</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// @each loop - object</span>
<span class="token property"><span class="token variable">$sizes</span></span><span class="token punctuation">:</span> <span class="token punctuation">(</span><span class="token string">&#39;sm&#39;</span><span class="token punctuation">:</span> 40px<span class="token punctuation">,</span> <span class="token string">&#39;md&#39;</span><span class="token punctuation">:</span> 50px<span class="token punctuation">,</span> <span class="token string">&#39;lg&#39;</span><span class="token punctuation">:</span> 80px<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">@each</span> <span class="token selector"><span class="token variable">$key</span>, <span class="token variable">$value</span> in <span class="token variable">$sizes</span> </span><span class="token punctuation">{</span>
  <span class="token selector">.icon-<span class="token variable">#{$key}</span> </span><span class="token punctuation">{</span>
    <span class="token property">font-size</span><span class="token punctuation">:</span> <span class="token variable">$value</span><span class="token punctuation">;</span>
    <span class="token property">height</span><span class="token punctuation">:</span> <span class="token variable">$value</span><span class="token punctuation">;</span>
    <span class="token property">width</span><span class="token punctuation">:</span> <span class="token variable">$value</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="import-引入模組" tabindex="-1"><a class="header-anchor" href="#import-引入模組" aria-hidden="true">#</a> @import 引入模組</h3><p>@import 是讓 Sass 模組化開發最重要的功能之一，在文件開頭引入所需的 variables, mixin 快速進行開發</p><div class="language-scss line-numbers-mode" data-ext="scss"><pre class="language-scss"><code><span class="token keyword">@import</span> <span class="token string">&quot;./base/Base-variable&quot;</span><span class="token punctuation">;</span>
<span class="token keyword">@import</span> <span class="token string">&quot;./base/Base-mixin&quot;</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="at-root-從最上層開始" tabindex="-1"><a class="header-anchor" href="#at-root-從最上層開始" aria-hidden="true">#</a> @at-root 從最上層開始</h3><div class="language-scss line-numbers-mode" data-ext="scss"><pre class="language-scss"><code><span class="token selector">#app </span><span class="token punctuation">{</span>
  <span class="token selector">p </span><span class="token punctuation">{</span>
    <span class="token atrule"><span class="token rule">@at-root</span> .bold &amp;</span> <span class="token punctuation">{</span>
      <span class="token property">color</span><span class="token punctuation">:</span> red<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>編譯結果如下</p><div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code><span class="token selector">.bold #app p</span> <span class="token punctuation">{</span>
  <span class="token property">color</span><span class="token punctuation">:</span> red<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,45);function k(v,m){const a=t("SocialBlock");return c(),i("div",null,[u,d,e(a,{hashtags:"css,scss,basic"}),r,e(a,{hashtags:"css,scss,basic"})])}const h=p(o,[["render",k],["__file","scss-basic.html.vue"]]);export{h as default};
