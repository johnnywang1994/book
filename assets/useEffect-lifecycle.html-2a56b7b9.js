import{_ as n,o as s,c as a,f as e}from"./app-da643460.js";const t={},p=e(`<h1 id="useeffect-的高階封裝範例" tabindex="-1"><a class="header-anchor" href="#useeffect-的高階封裝範例" aria-hidden="true">#</a> useEffect 的高階封裝範例</h1><h2 id="useeffectonce" tabindex="-1"><a class="header-anchor" href="#useeffectonce" aria-hidden="true">#</a> useEffectOnce</h2><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">useEffectOnece</span><span class="token punctuation">(</span><span class="token parameter">effect</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token function">useEffect</span><span class="token punctuation">(</span>effect<span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token comment">// deps 空</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="usemount" tabindex="-1"><a class="header-anchor" href="#usemount" aria-hidden="true">#</a> useMount</h2><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">useMount</span><span class="token punctuation">(</span><span class="token parameter">fn</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token function">useEffectOnce</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token function">fn</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="useunmount" tabindex="-1"><a class="header-anchor" href="#useunmount" aria-hidden="true">#</a> useUnmount</h2><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">useUnmount</span><span class="token punctuation">(</span><span class="token parameter">fn</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> fnRef <span class="token operator">=</span> <span class="token function">useRef</span><span class="token punctuation">(</span>fn<span class="token punctuation">)</span>

  fnRef<span class="token punctuation">.</span>current <span class="token operator">=</span> fn <span class="token comment">// 保持最新</span>

  <span class="token function">useEffectOnce</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> fnRef<span class="token punctuation">.</span><span class="token function">current</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="useasynceffect" tabindex="-1"><a class="header-anchor" href="#useasynceffect" aria-hidden="true">#</a> useAsyncEffect</h2><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">useAsyncEffect</span><span class="token punctuation">(</span><span class="token parameter">effect<span class="token punctuation">,</span> deps</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token function">useEffect</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> e <span class="token operator">=</span> <span class="token function">effect</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token operator">!</span>e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> e<span class="token punctuation">.</span>then <span class="token operator">===</span> <span class="token string">&#39;function&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        Promise<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span>
      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> e
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span> deps<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="useupdateeffect" tabindex="-1"><a class="header-anchor" href="#useupdateeffect" aria-hidden="true">#</a> useUpdateEffect</h2><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">useFirstMountState</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> isFirst <span class="token operator">=</span> <span class="token function">useRef</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span>

  <span class="token keyword">if</span> <span class="token punctuation">(</span>isFirst<span class="token punctuation">.</span>current<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    isFirst<span class="token punctuation">.</span>current <span class="token operator">=</span> <span class="token boolean">false</span>
    <span class="token keyword">return</span> <span class="token boolean">true</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">return</span> isFirst<span class="token punctuation">.</span>current
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">useUpdateEffect</span><span class="token punctuation">(</span><span class="token parameter">effect<span class="token punctuation">,</span> deps</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> isFirstMount <span class="token operator">=</span> <span class="token function">useFirstMountState</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token function">useEffect</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>isFirstMount<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token function">effect</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span> deps<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="usecustomcompareeffect" tabindex="-1"><a class="header-anchor" href="#usecustomcompareeffect" aria-hidden="true">#</a> useCustomCompareEffect</h2><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">useCustomCompareEffect</span><span class="token punctuation">(</span><span class="token parameter">effect<span class="token punctuation">,</span> deps<span class="token punctuation">,</span> depsEqual</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> ref <span class="token operator">=</span> <span class="token function">useRef</span><span class="token punctuation">(</span><span class="token keyword">undefined</span><span class="token punctuation">)</span> <span class="token comment">// 手動維護 deps</span>

  <span class="token comment">// 自定義方法判定，不相同時才修改 deps</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>ref<span class="token punctuation">.</span>current <span class="token operator">||</span> <span class="token operator">!</span><span class="token function">depsEqual</span><span class="token punctuation">(</span>deps<span class="token punctuation">,</span> ref<span class="token punctuation">.</span>current<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    ref<span class="token punctuation">.</span>current <span class="token operator">=</span> deps
  <span class="token punctuation">}</span>

  <span class="token function">useEffect</span><span class="token punctuation">(</span>effect<span class="token punctuation">,</span> ref<span class="token punctuation">.</span>current<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,13),c=[p];function o(u,i){return s(),a("div",null,c)}const r=n(t,[["render",o],["__file","useEffect-lifecycle.html.vue"]]);export{r as default};