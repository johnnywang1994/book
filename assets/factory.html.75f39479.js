import{_ as p,r as e,o as c,c as o,a,d as n,e as t,f as i}from"./app.33415c31.js";const l={},u=n("h1",{id:"factory-pattern",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#factory-pattern","aria-hidden":"true"},"#"),t(" Factory Pattern")],-1),k=i(`<h2 id="\u524D\u8A00" tabindex="-1"><a class="header-anchor" href="#\u524D\u8A00" aria-hidden="true">#</a> \u524D\u8A00</h2><p>\u5927\u5BB6\u597D\uFF0C\u6211\u662F Johnny\uFF0C\u4ECA\u5929\u8981\u7D00\u9304\u5206\u4EAB\u7684\u662F Patterns \u7B46\u8A18\u7CFB\u5217\u7684 <code>Factory Pattern</code></p><h2 id="\u4ECB\u7D39" tabindex="-1"><a class="header-anchor" href="#\u4ECB\u7D39" aria-hidden="true">#</a> \u4ECB\u7D39</h2><p><code>Factory Pattern</code> \u662F\u6307\u6211\u5011\u53EF\u4EE5\u4F7F\u7528\u4E00\u500B factory \u51FD\u6578\u4F86\u5275\u5EFA\u65B0\u7269\u4EF6\uFF0C\u800C\u4E0D\u900F\u904E <code>new</code> \u95DC\u9375\u5B57\uFF0C\u4E00\u500B\u6700\u7C21\u55AE\u7684\u7BC4\u4F8B\u5982\u4E0B</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token function-variable function">createUser</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token punctuation">{</span> firstName<span class="token punctuation">,</span> lastName<span class="token punctuation">,</span> email <span class="token punctuation">}</span></span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">(</span><span class="token punctuation">{</span>
  firstName<span class="token punctuation">,</span>
  lastName<span class="token punctuation">,</span>
  email<span class="token punctuation">,</span>
  <span class="token function">fullName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token keyword">this</span><span class="token punctuation">.</span>firstName<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token keyword">this</span><span class="token punctuation">.</span>lastName<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u900F\u904E\u5BE6\u4F5C\u4E00\u500B factory \u51FD\u6578\uFF0C\u8B93\u6211\u5011\u80FD\u5FEB\u901F\u5275\u5EFA\u8A31\u591A\u5305\u542B\u76F8\u540C\u5C6C\u6027\u7684\u7269\u4EF6\uFF0C\u589E\u52A0\u7A0B\u5F0F\u78BC\u7684\u8986\u7528\u548C\u7D44\u7E54\u80FD\u529B</p><p>\u4F46\u5728 javascript \u4E2D\uFF0C\u5DE5\u5EE0\u6A21\u5F0F\u4E3B\u8981\u63CF\u8FF0\u4E00\u500B\u4E0D\u4F7F\u7528 new \u95DC\u9375\u5B57\u8FD4\u56DE\u7269\u4EF6\u7684\u51FD\u6578\uFF0C\u4F46\u5728\u8A31\u591A\u72C0\u6CC1\u4E0B\uFF0C\u5275\u5EFA\u65B0\u7684 instance \u6BD4\u6BCF\u6B21\u5275\u5EFA\u65B0\u7684 object \u66F4\u80FD\u7BC0\u7701\u5167\u5B58\u7A7A\u9593</p><h2 id="\u5EF6\u4F38\u5B78\u7FD2" tabindex="-1"><a class="header-anchor" href="#\u5EF6\u4F38\u5B78\u7FD2" aria-hidden="true">#</a> \u5EF6\u4F38\u5B78\u7FD2</h2><p>\u4E0A\u9762\u7684\u7BC4\u4F8B\u4E3B\u8981\u504F\u5411\u65BC\u7C21\u55AE\u5DE5\u5EE0\u7684\u57FA\u672C\u4ECB\u7D39\uFF0C\u7576\u6211\u5011\u4ECA\u5929\u8981\u65B0\u589E\u4E00\u500B\u985E\u5225\u6642\u5FC5\u9808\u4E0D\u65B7\u4FEE\u6539\u6211\u5011\u7684\u985E\u5225\u5DE5\u5EE0\uFF0C\u6839\u64DA SOLID \u4E2D\u7684\u958B\u653E\u5C01\u9589\u539F\u5247\uFF0C\u6211\u5011\u5E0C\u671B\u6DFB\u52A0\u985E\u5225\u6642\u4E0D\u5FC5\u6BCF\u6B21\u90FD\u4FEE\u6539\u6211\u5011\u7684\u5DE5\u5EE0\u908F\u8F2F\uFF0C\u56E0\u6B64\u5BE6\u969B\u5DE5\u5EE0\u6A21\u5F0F\u53C8\u53EF\u4EE5\u5EF6\u4F38\u51FA <code>\u5DE5\u5EE0\u65B9\u6CD5</code>\u3001<code>\u62BD\u8C61\u5DE5\u5EE0</code> \u5169\u7A2E</p><h3 id="\u7C21\u55AE\u5DE5\u5EE0" tabindex="-1"><a class="header-anchor" href="#\u7C21\u55AE\u5DE5\u5EE0" aria-hidden="true">#</a> \u7C21\u55AE\u5DE5\u5EE0</h3><p>\u4EE5\u4E0B\u662F\u4E00\u500B\u7C21\u55AE\u5DE5\u5EE0\u7684\u7BC4\u4F8B\uFF0C\u900F\u904E <code>PersonFactory</code> \u6211\u5011\u53EF\u4EE5\u5EFA\u69CB\u4E0D\u540C\u985E\u5225\u7684\u7269\u4EF6\uFF0C\u4F46\u6BCF\u6B21\u6DFB\u52A0\u65B0\u985E\u5225\u6642\u90FD\u5FC5\u9808\u5BE6\u969B\u4FEE\u6539\u6211\u5011\u7684\u5DE5\u5EE0\u65B9\u6CD5</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">FatPerson</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>intro <span class="token operator">=</span> <span class="token string">&#39;\u9AD4\u91CD\u904E\u91CD\u7684\u4EBA&#39;</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token function">getSick</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;\u7CD6\u5C3F\u75C5\u3001\u9AD8\u8840\u58D3\u3001\u4E2D\u98A8\u3001\u814E\u7D50\u77F3\u3001\u75DB\u98A8&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">SlimPerson</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>intro <span class="token operator">=</span> <span class="token string">&#39;\u82D7\u689D\u7684\u4EBA&#39;</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token function">getSick</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;\u8CA7\u8840\u3001\u9AA8\u6298\u3001\u5167\u51FA\u8840\u3001\u4F4E\u8840\u58D3\u3001\u6688\u53A5&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">NormalPerson</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>intro <span class="token operator">=</span> <span class="token string">&#39;\u5065\u5EB7\u7684\u6B63\u5E38\u4EBA&#39;</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token function">getSick</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;\u7121\u7279\u6B8A\u597D\u767C\u75BE\u75C5&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// \u5DE5\u5EE0\u65B9\u6CD5</span>
<span class="token keyword">var</span> <span class="token function-variable function">PersonFactory</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">type</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">switch</span> <span class="token punctuation">(</span>type<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">case</span> <span class="token string">&#39;fat&#39;</span><span class="token operator">:</span>
      <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">FatPerson</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">case</span> <span class="token string">&#39;slim&#39;</span><span class="token operator">:</span>
      <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">SlimPerson</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">default</span><span class="token operator">:</span>
      <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">NormalPerson</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="\u5DE5\u5EE0\u65B9\u6CD5" tabindex="-1"><a class="header-anchor" href="#\u5DE5\u5EE0\u65B9\u6CD5" aria-hidden="true">#</a> \u5DE5\u5EE0\u65B9\u6CD5</h3><p>\u900F\u904E\u9810\u5148\u88FD\u4F5C\u5DE5\u5EE0\u65B9\u6CD5\u7684\u65B9\u5F0F\uFF0C\u628A\u5BE6\u969B\u5EFA\u69CB\u7684\u5BE6\u4F5C\u6D41\u7A0B\u8F49\u8B93\u51FA\u53BB\uFF0C\u5047\u8A2D\u6211\u5011\u5728\u958B\u767C\u4E00\u6B3E\u904A\u6232\uFF0C\u6B63\u5728\u5BE6\u4F5C\u4E00\u500B\u5275\u5EFA\u89D2\u8272\u7269\u4EF6\u7684\u5DE5\u5EE0\u65B9\u6CD5\uFF0C\u5BE6\u969B\u7BC4\u4F8B\u5982\u4E0B</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token comment">// \u5DE5\u5EE0\u65B9\u6CD5</span>
<span class="token keyword">class</span> <span class="token class-name">CharacterFactory</span> <span class="token punctuation">{</span>
  <span class="token function">createCharacter</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span><span class="token string">&#39;\u6B64\u65B9\u6CD5\u50C5\u4F9B\u7E7C\u627F\u4F7F\u7528\uFF0C\u4E0D\u80FD\u76F4\u63A5\u8ABF\u7528&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">MapCharacterFactory</span> <span class="token keyword">extends</span> <span class="token class-name">CharacterFactory</span> <span class="token punctuation">{</span>
  <span class="token function">createCharacter</span><span class="token punctuation">(</span><span class="token parameter">type</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>type <span class="token operator">===</span> <span class="token string">&#39;sword&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">SwordsMan</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>type <span class="token operator">===</span> <span class="token string">&#39;magic&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">MagicMan</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// \u7269\u4EF6\u985E\u5225</span>
<span class="token keyword">class</span> <span class="token class-name">Character</span> <span class="token punctuation">{</span>
  <span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span><span class="token string">&#39;\u6B64\u65B9\u6CD5\u50C5\u4F9B\u7E7C\u627F\u4F7F\u7528\uFF0C\u4E0D\u80FD\u76F4\u63A5\u8ABF\u7528&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">SwordsMan</span> <span class="token keyword">extends</span> <span class="token class-name">Character</span> <span class="token punctuation">{</span>
  <span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;\u6211\u662F\u62FF\u528D\u7684\u52C7\u58EB&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">MagicMan</span> <span class="token keyword">extends</span> <span class="token class-name">Character</span> <span class="token punctuation">{</span>
  <span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;\u6211\u662F\u62FF\u6CD5\u6756\u7684\u52C7\u58EB&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u4E0A\u65B9\u7684\u7BC4\u4F8B\u53EF\u4EE5\u8B93\u6211\u5011\u4E0D\u65B7\u5275\u5EFA\u65B0\u7684 MapCharacterFactory \u7E7C\u627F\u985E\u5225\uFF0C\u800C\u4E0D\u5FC5\u518D\u76F4\u63A5\u4FEE\u6539\u6211\u5011\u7684 <code>CharacterFactory</code> \u5DE5\u5EE0</p><h3 id="\u62BD\u8C61\u5DE5\u5EE0" tabindex="-1"><a class="header-anchor" href="#\u62BD\u8C61\u5DE5\u5EE0" aria-hidden="true">#</a> \u62BD\u8C61\u5DE5\u5EE0</h3><p>\u4E0A\u9762\u7684\u5DE5\u5EE0\u65B9\u6CD5\u5DF2\u7D93\u53EF\u4EE5\u89E3\u6C7A\u5927\u90E8\u5206\u5834\u666F\u554F\u984C\uFF0C\u4F46\u5982\u679C\u4ECA\u5929\u6211\u5011\u8981\u8A2D\u8A08\u4E00\u6B3E\uFF0C\u6839\u64DA\u904A\u6232\u5730\u5716\u4E0D\u540C\uFF0C\u53EF\u4EE5\u9078\u7528\u7684\u89D2\u8272\u4E5F\u4E0D\u540C\u7684\u9700\u6C42\u6642\uFF0C\u4E0A\u9762\u7684\u5DE5\u5EE0\u65B9\u6CD5\u5C31\u6703\u8B8A\u5F97\u96E3\u4EE5\u8ABF\u6574\uFF0C\u53EF\u80FD\u5FC5\u9808\u76F4\u63A5\u8907\u88FD\u6574\u4EFD\u4FEE\u6539\uFF0C\u6B64\u6642\u6211\u5011\u53EF\u4EE5\u628A\u6574\u500B\u5DE5\u5EE0\u65B9\u6CD5\u62BD\u8C61\u5316\uFF0C\u63D0\u5347\u6574\u500B\u67B6\u69CB\u7684\u8986\u7528\u80FD\u529B</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token comment">// \u7269\u4EF6\u985E\u5225\uFF0C\u8207\u4E0A\u65B9\u5DE5\u5EE0\u65B9\u6CD5\u76F8\u540C</span>
<span class="token keyword">class</span> <span class="token class-name">Character</span> <span class="token punctuation">{</span>
  <span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span><span class="token string">&#39;\u6B64\u65B9\u6CD5\u50C5\u4F9B\u7E7C\u627F\u4F7F\u7528\uFF0C\u4E0D\u80FD\u76F4\u63A5\u8ABF\u7528&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">SwordsMan</span> <span class="token keyword">extends</span> <span class="token class-name">Character</span> <span class="token punctuation">{</span>
  <span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;\u6211\u662F\u62FF\u528D\u7684\u52C7\u58EB&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">MagicMan</span> <span class="token keyword">extends</span> <span class="token class-name">Character</span> <span class="token punctuation">{</span>
  <span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;\u6211\u662F\u62FF\u6CD5\u6756\u7684\u52C7\u58EB&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// \u65B0\u589E Enemy \u985E\u5225</span>
<span class="token keyword">class</span> <span class="token class-name">Enemy</span> <span class="token punctuation">{</span>
  <span class="token function">attack</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span><span class="token string">&#39;\u6B64\u65B9\u6CD5\u50C5\u4F9B\u7E7C\u627F\u4F7F\u7528\uFF0C\u4E0D\u80FD\u76F4\u63A5\u8ABF\u7528&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">Dog</span> <span class="token keyword">extends</span> <span class="token class-name">Enemy</span> <span class="token punctuation">{</span>
  <span class="token function">attack</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;\u760B\u72D7\u54AC\u4EBA\u62C9\uFF01&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// \u62BD\u8C61\u5DE5\u5EE0\u985E\u5225</span>
<span class="token keyword">class</span> <span class="token class-name">MapFactory</span> <span class="token punctuation">{</span>
  <span class="token function">createCharacter</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span><span class="token string">&#39;\u6B64\u65B9\u6CD5\u50C5\u4F9B\u7E7C\u627F\u4F7F\u7528\uFF0C\u4E0D\u80FD\u76F4\u63A5\u8ABF\u7528&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token function">createEnemy</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span><span class="token string">&#39;\u6B64\u65B9\u6CD5\u50C5\u4F9B\u7E7C\u627F\u4F7F\u7528\uFF0C\u4E0D\u80FD\u76F4\u63A5\u8ABF\u7528&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// \u5BE6\u4F5C\u5730\u5716\u7684\u76F8\u95DC\u529F\u80FD</span>
<span class="token keyword">class</span> <span class="token class-name">NewYorkFactory</span> <span class="token keyword">extends</span> <span class="token class-name">MapFactory</span> <span class="token punctuation">{</span>
  <span class="token function">createCharacter</span><span class="token punctuation">(</span><span class="token parameter">type</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>type <span class="token operator">===</span> <span class="token string">&#39;sword&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">SwordsMan</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>type <span class="token operator">===</span> <span class="token string">&#39;magic&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">MagicMan</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  <span class="token function">createEnemy</span><span class="token punctuation">(</span><span class="token parameter">type</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>type <span class="token operator">===</span> <span class="token string">&#39;dog&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Dog</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u6B64\u6642\u5982\u679C\u6211\u5011\u8981\u958B\u767C\u53E6\u4E00\u5F35\u5168\u65B0\u5730\u5716\u7684\u89D2\u8272\u5DE5\u5EE0\uFF0C\u53EF\u4EE5\u76F4\u63A5\u7E7C\u627F\u4E26\u5275\u5EFA\u4E00\u500B\u5C08\u5C6C\u65BC\u8A72\u5730\u5716\u7684\u6574\u5957\u529F\u80FD\uFF0C\u800C\u4E0D\u5FC5\u6771\u62FC\u897F\u6E4A\uFF0C\u4E26\u4E14\u7576\u5F8C\u7E8C\u9700\u8981\u6DFB\u52A0\u529F\u80FD\u6642\uFF0C\u4E5F\u53EF\u4EE5\u5728\u5404\u5730\u5716\u4E2D\u81EA\u7531\u8ABF\u6574\u4E0D\u5F71\u97FF\u5230\u6574\u500B\u62BD\u8C61\u5DE5\u5EE0\uFF0C\u89E3\u6C7A\u4E86\u5DE5\u5EE0\u65B9\u6CD5\u7684\u7F3A\u9EDE</p>`,20),r=n("h2",{id:"\u7D50\u8AD6",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#\u7D50\u8AD6","aria-hidden":"true"},"#"),t(" \u7D50\u8AD6")],-1),d=n("p",null,"\u5DE5\u5EE0\u6A21\u5F0F\u975E\u5E38\u5403\u91CD OOP \u7684\u958B\u767C\u601D\u8003\u8DDF\u7D93\u9A57\uFF0C\u4EE5\u7D50\u8AD6\u4F86\u8AAA\uFF0C\u5DE5\u5EE0\u6A21\u5F0F\u5E6B\u52A9\u958B\u767C\u8005\u66F4\u597D\u5730\u7BA1\u7406\u8207\u5EFA\u69CB\u95DC\u806F\u6027\u7269\u4EF6\u7684\u80FD\u529B\uFF0C\u8B93\u7269\u4EF6\u4E4B\u9593\u7684\u95DC\u4FC2\u53EF\u4EE5\u7528\u76F8\u5C0D\u6709\u898F\u7BC4\uFF0C\u537B\u4FDD\u6301\u4E00\u5B9A\u5F48\u6027\u7684\u6A21\u5F0F\u904B\u884C\uFF0C\u4F46\u4E5F\u9808\u6CE8\u610F\u5DE5\u5EE0\u6A21\u5F0F\u76E1\u91CF\u4E0D\u8981\u8D85\u904E 3 \u5C64\uFF0C\u96A8\u8457\u7E7C\u627F\u7684\u5C64\u6B21\u589E\u52A0\uFF0C\u5C07\u6703\u986F\u8457\u7684\u589E\u52A0\u958B\u767C\u3001\u9664\u932F\u96E3\u5EA6",-1),v=n("p",null,"\u4ECA\u5929\u5C31\u5148\u4ECB\u7D39\u5230\u9019\u62C9\uFF5E\u611F\u8B1D\u5927\u5BB6\u6536\u770B\uFF0C\u4E0B\u7BC7\u518D\u898B\u62C9\uFF01=V=",-1);function m(b,y){const s=e("SocialBlock");return c(),o("div",null,[u,a(s,{hashtags:"design,pattern,factory"}),k,a(s,{hashtags:"design,pattern,factory"}),r,d,v])}const h=p(l,[["render",m],["__file","factory.html.vue"]]);export{h as default};