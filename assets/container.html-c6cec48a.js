import{_ as p,r as o,o as e,c,a,d as n,e as t,f as i}from"./app-da643460.js";const u={},l=n("h1",{id:"container-presentational-component",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#container-presentational-component","aria-hidden":"true"},"#"),t(" Container/Presentational Component")],-1),r=i(`<h2 id="前言" tabindex="-1"><a class="header-anchor" href="#前言" aria-hidden="true">#</a> 前言</h2><p>大家好，我是 Johnny，今天要紀錄分享的是 Patterns 筆記系列的 <code>Container/Presentational Pattern</code></p><h2 id="介紹" tabindex="-1"><a class="header-anchor" href="#介紹" aria-hidden="true">#</a> 介紹</h2><p><code>Container/Presentational Pattern</code> 是透過明確區分 view 關注點分離，其中：</p><ul><li>Presentational Components: 關注於「HOW」顯示資料，由外部給予資料，並輸出 UI</li><li>Container Components: 關注於「WHAT」資料需要給予用戶使用，主要獲取資料，並控制資料的下放位置</li></ul><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> useState<span class="token punctuation">,</span> useEffect <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;react&#39;</span><span class="token punctuation">;</span>

<span class="token comment">// Presentational</span>
<span class="token keyword">function</span> <span class="token function">DogImages</span><span class="token punctuation">(</span><span class="token parameter"><span class="token punctuation">{</span> dogs <span class="token punctuation">}</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> dogs<span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">dog<span class="token punctuation">,</span> i</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token operator">&lt;</span>img src<span class="token operator">=</span><span class="token punctuation">{</span>dog<span class="token punctuation">}</span> key<span class="token operator">=</span><span class="token punctuation">{</span>i<span class="token punctuation">}</span> alt<span class="token operator">=</span><span class="token string">&quot;Dog&quot;</span> <span class="token operator">/</span><span class="token operator">&gt;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// Container</span>
<span class="token keyword">function</span> <span class="token function">DogImagesContainer</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> <span class="token punctuation">[</span>dogs<span class="token punctuation">,</span> setDogs<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token function">useState</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token function">useEffect</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token function">fetch</span><span class="token punctuation">(</span><span class="token string">&quot;https://dog.ceo/api/breed/labrador/images/random/6&quot;</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter">res</span> <span class="token operator">=&gt;</span> res<span class="token punctuation">.</span><span class="token function">json</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter"><span class="token punctuation">{</span> message <span class="token punctuation">}</span></span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token function">setDogs</span><span class="token punctuation">(</span>message<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token keyword">return</span> <span class="token punctuation">(</span>
    <span class="token operator">&lt;</span>DogImages dogs<span class="token operator">=</span><span class="token punctuation">{</span>dogs<span class="token punctuation">}</span> <span class="token operator">/</span><span class="token operator">&gt;</span>
  <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="結合-hooks-使用" tabindex="-1"><a class="header-anchor" href="#結合-hooks-使用" aria-hidden="true">#</a> 結合 hooks 使用</h2><p>透過 hooks 我們可以快速取代這種模式，或是將這種模式運用得更高效</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> useState<span class="token punctuation">,</span> useEffect <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;react&#39;</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">function</span> <span class="token function">useDogImage</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> <span class="token punctuation">[</span>dogs<span class="token punctuation">,</span> setDogs<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token function">useState</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token function">useEffect</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token function">fetch</span><span class="token punctuation">(</span><span class="token string">&quot;https://dog.ceo/api/breed/labrador/images/random/6&quot;</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter">res</span> <span class="token operator">=&gt;</span> res<span class="token punctuation">.</span><span class="token function">json</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter"><span class="token punctuation">{</span> message <span class="token punctuation">}</span></span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token function">setDogs</span><span class="token punctuation">(</span>message<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token keyword">return</span> dogs<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> useDogImages <span class="token keyword">from</span> <span class="token string">&#39;./useDogImages&#39;</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">function</span> <span class="token function">DogImages</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> dogs <span class="token operator">=</span> <span class="token function">useDogImages</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token keyword">return</span> dogs<span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">dog<span class="token punctuation">,</span> i</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token operator">&lt;</span>img src<span class="token operator">=</span><span class="token punctuation">{</span>dog<span class="token punctuation">}</span> key<span class="token operator">=</span><span class="token punctuation">{</span>i<span class="token punctuation">}</span> alt<span class="token operator">=</span><span class="token string">&quot;Dog&quot;</span> <span class="token operator">/</span><span class="token operator">&gt;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,10),k=n("h2",{id:"結論",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#結論","aria-hidden":"true"},"#"),t(" 結論")],-1),d=n("p",null,"雖然目前 hooks 可以直接取代這種模式，但在大型專案中，透過把資料獲取位置以及使用位置區分開來，不僅可以提高 component 的複用性，也可以讓資料獲取的能力抽離到 hooks 中提升邏輯的複用性，在實作上可以提升整個程式碼的架構品質",-1),v=n("p",null,"今天分享就到這拉～下篇見！=V=",-1);function m(g,h){const s=o("SocialBlock");return e(),c("div",null,[l,a(s,{hashtags:"design,pattern,container,presentational"}),r,a(s,{hashtags:"design,pattern,container,presentational"}),k,d,v])}const f=p(u,[["render",m],["__file","container.html.vue"]]);export{f as default};