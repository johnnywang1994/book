import{_ as p,r as e,o,c,a,d as n,e as t,f as l}from"./app.33415c31.js";const i={},u=n("h1",{id:"module-pattern",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#module-pattern","aria-hidden":"true"},"#"),t(" Module Pattern")],-1),r=l(`<h2 id="\u524D\u8A00" tabindex="-1"><a class="header-anchor" href="#\u524D\u8A00" aria-hidden="true">#</a> \u524D\u8A00</h2><p>\u5927\u5BB6\u597D\uFF0C\u6211\u662F Johnny\uFF0C\u4ECA\u5929\u8981\u7D00\u9304\u5206\u4EAB\u7684\u662F Patterns \u7B46\u8A18\u7CFB\u5217\u7684 <code>Module Pattern</code></p><h2 id="\u4ECB\u7D39" tabindex="-1"><a class="header-anchor" href="#\u4ECB\u7D39" aria-hidden="true">#</a> \u4ECB\u7D39</h2><p>Module \u6A21\u5F0F\u662F\u4E00\u7A2E\u5C07\u7A0B\u5F0F\u78BC\u62C6\u5206\u7684\u57FA\u790E\u6A21\u5F0F\uFF0C\u5728 Javascript \u7684 ES2015 Modules \u662F\u4E00\u5957\u5167\u5EFA\u7684\u6A21\u7D44\u5316\u65B9\u5F0F\uFF0C\u4EE5\u4E0B\u662F\u4E00\u500B\u5E38\u898B\u7684 <code>math.js</code> \u6A21\u7D44\uFF0C\u900F\u904E <code>export</code> \u5C07\u591A\u500B\u51FD\u6578\u4F5C\u70BA\u6A21\u7D44\u7684\u65B9\u6CD5\u8F38\u51FA</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token comment">// math.js</span>
<span class="token keyword">const</span> privateValue <span class="token operator">=</span> <span class="token string">&quot;This is a value private to the module!&quot;</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">add</span><span class="token punctuation">(</span><span class="token parameter">x<span class="token punctuation">,</span> y</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> x <span class="token operator">+</span> y<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">multiply</span><span class="token punctuation">(</span><span class="token parameter">x</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> x <span class="token operator">*</span> <span class="token number">2</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">subtract</span><span class="token punctuation">(</span><span class="token parameter">x<span class="token punctuation">,</span> y</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> x <span class="token operator">-</span> y<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">square</span><span class="token punctuation">(</span><span class="token parameter">x</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> x <span class="token operator">*</span> x<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> add<span class="token punctuation">,</span> multiply<span class="token punctuation">,</span> subtract<span class="token punctuation">,</span> square <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;./math.js&quot;</span><span class="token punctuation">;</span>

<span class="token comment">/* Error: privateValue is not defined */</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>privateValue<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u900F\u904E\u6A21\u7D44\u5316\u7684\u65B9\u5F0F\uFF0C\u6211\u5011\u53EF\u4EE5\u4FDD\u8B49\u4E00\u4E9B\u6A21\u7D44\u5167\u7684\u8B8A\u6578\u4E0D\u6703\u4E92\u76F8\u6C61\u67D3</p><h3 id="export-default" tabindex="-1"><a class="header-anchor" href="#export-default" aria-hidden="true">#</a> export default</h3><p><code>export default</code> \u662F\u4E00\u7A2E\u5167\u5EFA\u7684 export \u55AE\u4F4D</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">function</span> <span class="token function">add</span><span class="token punctuation">(</span><span class="token parameter">x<span class="token punctuation">,</span> y</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> x <span class="token operator">+</span> y<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">multiply</span><span class="token punctuation">(</span><span class="token parameter">x</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> x <span class="token operator">*</span> <span class="token number">2</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">subtract</span><span class="token punctuation">(</span><span class="token parameter">x<span class="token punctuation">,</span> y</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> x <span class="token operator">-</span> y<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">square</span><span class="token punctuation">(</span><span class="token parameter">x</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> x <span class="token operator">*</span> x<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>default \u95DC\u9375\u5B57\u662F\u4F5C\u70BA\u9810\u8A2D\u8F38\u51FA\u7684\u5C0D\u8C61</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">import</span> add<span class="token punctuation">,</span> <span class="token punctuation">{</span> multiply<span class="token punctuation">,</span> subtract<span class="token punctuation">,</span> square <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;./math.js&quot;</span><span class="token punctuation">;</span>

<span class="token function">add</span><span class="token punctuation">(</span><span class="token number">7</span><span class="token punctuation">,</span> <span class="token number">8</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">multiply</span><span class="token punctuation">(</span><span class="token number">8</span><span class="token punctuation">,</span> <span class="token number">9</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">subtract</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">square</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u6216\u662F\u6211\u5011\u53EF\u4EE5\u900F\u904E <code>import * as xxx</code> \u7684\u65B9\u5F0F\uFF0C\u5C07\u6240\u6709\u6A21\u7D44\u8F38\u51FA\u6574\u5408\u70BA\u4E00\u9AD4\u9032\u884C\u4F7F\u7528</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token operator">*</span> <span class="token keyword">as</span> math <span class="token keyword">from</span> <span class="token string">&quot;./math.js&quot;</span><span class="token punctuation">;</span>

math<span class="token punctuation">.</span><span class="token function">default</span><span class="token punctuation">(</span><span class="token number">7</span><span class="token punctuation">,</span> <span class="token number">8</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
math<span class="token punctuation">.</span><span class="token function">multiply</span><span class="token punctuation">(</span><span class="token number">8</span><span class="token punctuation">,</span> <span class="token number">9</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
math<span class="token punctuation">.</span><span class="token function">subtract</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
math<span class="token punctuation">.</span><span class="token function">square</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="dynamic-import" tabindex="-1"><a class="header-anchor" href="#dynamic-import" aria-hidden="true">#</a> Dynamic Import</h3><p>\u5728 js \u7576\u4E2D\uFF0C\u9664\u4E86\u900F\u904E <code>import X from &#39;xxx&#39;;</code> \u9032\u884C\u6A21\u7D44\u5F15\u7528\uFF0C\u4E5F\u53EF\u4EE5\u900F\u904E <code>import()</code> \u95DC\u9375\u5B57\uFF0C\u5C0D\u6A21\u7D44\u9032\u884C\u52D5\u614B\u7684\u5F15\u5165\uFF0C\u63D0\u5347\u6A21\u7D44\u8F09\u5165\u7684\u9748\u6D3B\u5EA6\u53CA\u8F09\u5165\u6548\u7387</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">import</span><span class="token punctuation">(</span><span class="token string">&quot;module&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">module</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  module<span class="token punctuation">.</span><span class="token function">default</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  module<span class="token punctuation">.</span><span class="token function">namedExport</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// Or with async/await</span>
<span class="token punctuation">(</span><span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> module <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token keyword">import</span><span class="token punctuation">(</span><span class="token string">&quot;module&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  module<span class="token punctuation">.</span><span class="token function">default</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  module<span class="token punctuation">.</span><span class="token function">namedExport</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u7576\u7136\u4E5F\u53EF\u4EE5\u5C0D\u5716\u7247\u9032\u884C\u52D5\u614B\u8F09\u5165</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">import</span> React <span class="token keyword">from</span> <span class="token string">&quot;react&quot;</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">DogImage</span><span class="token punctuation">(</span><span class="token parameter"><span class="token punctuation">{</span> num <span class="token punctuation">}</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> <span class="token punctuation">[</span>src<span class="token punctuation">,</span> setSrc<span class="token punctuation">]</span> <span class="token operator">=</span> React<span class="token punctuation">.</span><span class="token function">useState</span><span class="token punctuation">(</span><span class="token string">&quot;&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token keyword">async</span> <span class="token keyword">function</span> <span class="token function">loadDogImage</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> res <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token keyword">import</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">../assets/dog</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>num<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">.png</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">setSrc</span><span class="token punctuation">(</span>res<span class="token punctuation">.</span>default<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">return</span> src <span class="token operator">?</span> <span class="token punctuation">(</span>
    <span class="token operator">&lt;</span>img src<span class="token operator">=</span><span class="token punctuation">{</span>src<span class="token punctuation">}</span> alt<span class="token operator">=</span><span class="token string">&quot;Dog&quot;</span> <span class="token operator">/</span><span class="token operator">&gt;</span>
  <span class="token punctuation">)</span> <span class="token operator">:</span> <span class="token punctuation">(</span>
    <span class="token operator">&lt;</span>div className<span class="token operator">=</span><span class="token string">&quot;loader&quot;</span><span class="token operator">&gt;</span>
      <span class="token operator">&lt;</span>button onClick<span class="token operator">=</span><span class="token punctuation">{</span>loadDogImage<span class="token punctuation">}</span><span class="token operator">&gt;</span>Click to load image<span class="token operator">&lt;</span><span class="token operator">/</span>button<span class="token operator">&gt;</span>
    <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">&gt;</span>
  <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,19),d=n("h2",{id:"\u7D50\u8AD6",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#\u7D50\u8AD6","aria-hidden":"true"},"#"),t(" \u7D50\u8AD6")],-1),k=n("p",null,"\u900F\u904E module \u6A21\u7D44\u5316\u7684\u958B\u767C\u65B9\u5F0F\uFF0C\u6211\u5011\u53EF\u4EE5\u5F88\u8F15\u6613\u7684\u62C6\u5206\u7A0B\u5F0F\u78BC\uFF0C\u4E26\u4E14\u964D\u4F4E\u7A0B\u5F0F\u78BC\u7684\u547D\u540D\u6C61\u67D3\uFF0CJS \u7531\u65BC\u6B77\u53F2\u5305\u88B1\u56E0\u7D20\uFF0C\u5F9E\u6700\u65E9\u7684 AMD \u6A21\u7D44\uFF08RequireJS\uFF09\u5230\u5F8C\u4F86 Nodejs \u5927\u884C\u5176\u9053\u6642\u7684 CommonJS\uFF0C\u5230\u5F8C\u4F86\u5927\u5BB6\u900F\u904E Webpack \u628A ESM \u8A9E\u6CD5\u8F49\u70BA Nodejs \u5F8C\u6253\u5305\u6210\u700F\u89BD\u5668 JS\uFF0C\u5230\u73FE\u5728\u539F\u751F JS \u700F\u89BD\u5668\u7684 ESM\uFF08ViteJS\uFF09\uFF0C\u8981\u628A\u6574\u500B JS \u6A21\u7D44\u5316\u6B77\u53F2\u8B1B\u5B8C\u5BE6\u5728\u592A\u591A\u5167\u5BB9\uFF0C\u6B61\u8FCE\u6709\u8208\u8DA3\u7684\u5925\u4F34\u52D5\u624B\u6DF1\u5165\u77AD\u89E3\u645F\uFF5E\u4ECA\u5929\u5C31\u4ECB\u7D39\u5230\u9019\u908A\uFF0C\u4E0B\u6B21\u898B\u62C9=V=.",-1);function v(m,b){const s=e("SocialBlock");return o(),c("div",null,[u,a(s,{hashtags:"design,pattern,module"}),r,a(s,{hashtags:"design,pattern,module"}),d,k])}const h=p(i,[["render",v],["__file","module.html.vue"]]);export{h as default};