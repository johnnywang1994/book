import{_ as t,r as p,o as e,c as o,a as s,d as a,e as c,f as l}from"./app.34c1de08.js";const i={},u=a("h1",{id:"js-literal-\u6A21\u677F\u7DE8\u8B6F",tabindex:"-1"},[a("a",{class:"header-anchor",href:"#js-literal-\u6A21\u677F\u7DE8\u8B6F","aria-hidden":"true"},"#"),c(" Js literal \u6A21\u677F\u7DE8\u8B6F")],-1),r=l(`<p>\u7DE8\u8B6F\u7684\u5DE5\u4F5C\u662F\u7528\u4F86\u7C21\u5316\u66F8\u5BEB\u904E\u7A0B\uFF0C\u6216\u662F\u9032\u884C\u4E00\u4E9B\u5E38\u7528\u529F\u80FD\u7684\u5C01\u88DD\uFF0C\u4EE5\u5229\u958B\u767C\u8005\u4F7F\u7528\u3002</p><p>\u6A21\u677F\u7DE8\u8B6F\u4E3B\u8981\u662F\u8B93\u6211\u5011\u80FD\u5920\u5728\u5B57\u4E32\u5167\uFF0C\u9032\u884C\u4E00\u4E9B\u8B8A\u6578\u66FF\u63DB\u3001\u5224\u65B7\u7684\u904B\u4F5C\uFF0C\u5BE6\u4F5C\u4E0A\u5E38\u7528\u6B63\u5247\u8868\u9054\u5F0F\u53BB\u9032\u884C\u6BD4\u5C0D\u8655\u7406\uFF0C\u800C\u6BD4\u5C0D\u5F8C\u7684\u8655\u7406\u5C31\u662F\u6211\u5011\u672C\u7BC7\u7684\u95DC\u6CE8\u91CD\u9EDE\u3002</p><h2 id="\u7C21\u55AE\u7DE8\u8B6F" tabindex="-1"><a class="header-anchor" href="#\u7C21\u55AE\u7DE8\u8B6F" aria-hidden="true">#</a> \u7C21\u55AE\u7DE8\u8B6F</h2><p>\u5F9E\u7C21\u55AE\u958B\u59CB\uFF0C\u7528\u6700\u76F4\u89BA\u7684\u6BD4\u5C0D\u66FF\u63DB\u4F86\u9032\u884C\uFF1A</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">template</span><span class="token punctuation">(</span><span class="token parameter">str<span class="token punctuation">,</span> data</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> ret <span class="token operator">=</span> <span class="token function">String</span><span class="token punctuation">(</span>str<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">// \u904D\u6B77 key\uFF0C\u66FF\u63DB\u5B57\u4E32</span>
  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> item <span class="token keyword">in</span> data<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>data<span class="token punctuation">.</span><span class="token function">hasOwnProperty</span><span class="token punctuation">(</span>item<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">var</span> re <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">RegExp</span><span class="token punctuation">(</span><span class="token string">&#39;{{&#39;</span> <span class="token operator">+</span> item <span class="token operator">+</span> <span class="token string">&#39;}}&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;g&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      ret <span class="token operator">=</span> ret<span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span>re<span class="token punctuation">,</span> data<span class="token punctuation">[</span>item<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> ret<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u9019\u500B\u65B9\u5F0F\u53EF\u4EE5\u61C9\u7528\u65BC\u4E00\u4E9B\u7C21\u55AE\u7684\u5834\u5408\uFF0C\u4F46\u7576\u9700\u8981\u66F4\u8907\u96DC\u7684\u529F\u80FD\u6642\uFF0C\u5C31\u7121\u6CD5\u4F7F\u7528\u4E86\u3002</p><h2 id="new-function-\u51FD\u6578" tabindex="-1"><a class="header-anchor" href="#new-function-\u51FD\u6578" aria-hidden="true">#</a> new Function \u51FD\u6578</h2><p>\u5C0D\u65BC\u4E0A\u9762\u7684\u6B63\u5247\u6BD4\u5C0D\u7DE8\u8B6F\uFF0C\u5176\u5BE6 ES6 \u672C\u8EAB\u7684 literal template \u5C31\u53EF\u4EE5\u5B8C\u7F8E\u5730\u505A\u5230\u4E86\uFF1A</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">template</span><span class="token punctuation">(</span><span class="token parameter">data</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">Hello </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>data<span class="token punctuation">.</span>name<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">, I am </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>data<span class="token punctuation">.</span>age<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> years old.</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u800C\u9019\u9EBD\u505A\u5C31\u53EF\u4EE5\u652F\u63F4\u4E0A\u9762\u505A\u4E0D\u5230\u7684 <code>data.user.name</code> \u9019\u7A2E\u4E32\u806F\u5BEB\u6CD5\u3002<br> \u73FE\u5728\u6211\u5011\u77E5\u9053\u51FD\u6578\u62FF\u4F86\u8655\u7406\u5B57\u4E32\u5F88\u65B9\u4FBF\uFF0C\u800C JavaScript \u672C\u8EAB\u6709\u4E00\u500B\u51FD\u6578\u7269\u4EF6\u53EB\u505A <code>Function</code> \u6B63\u597D\u9069\u5408\u7528\u4F86\u505A\u9019\u4EF6\u4E8B\uFF0C \u4ED6\u7684\u57FA\u672C\u7528\u6CD5\u5982\u4E0B\uFF1A</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">const</span> fn <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Function</span><span class="token punctuation">(</span><span class="token string">&#39;x&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;y&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;return x + y&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><code>new Function</code> \u53EF\u4EE5\u7528\u4F86\u5275\u9020\u51FD\u6578\uFF0C\u6700\u5F8C\u9762\u63A5\u53D7\u4E00\u500B\u5B57\u4E32\uFF0C\u9032\u884C return \u52D5\u4F5C\u3002\u6211\u5011\u53EF\u4EE5\u5584\u7528\u6B64\u7279\u9EDE\u4F86\u8655\u7406\u6BD4\u5C0D\u5230\u7684\u8CC7\u6599\u9032\u884C\u66FF\u63DB\u3002</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token function-variable function">template</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">str</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> re <span class="token operator">=</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\\{\\{\\s*([^\\}]+)?\\s*\\}\\}</span><span class="token regex-delimiter">/</span><span class="token regex-flags">g</span></span><span class="token punctuation">;</span>
  str <span class="token operator">=</span> str<span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span>re<span class="token punctuation">,</span> <span class="token string">&#39;data.$1&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Function</span><span class="token punctuation">(</span><span class="token string">&#39;data&#39;</span><span class="token punctuation">,</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">return &quot;</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>str<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&quot;;</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token function">t</span><span class="token punctuation">(</span><span class="token string">&#39;Hello {{ name }}&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// \u51FD\u6578\u6703\u56DE\u50B3 return &quot;Hello data.name&quot; </span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u5F88\u660E\u986F\u9019\u6A23\u6703\u8B8A\u6210\u6574\u500B\u5B57\u4E32\u56DE\u50B3\uFF0C\u6211\u5011\u9700\u8981\u9032\u884C\u5340\u5206\uFF0C\u4FEE\u6539\u5982\u4E0B\uFF1A</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token function-variable function">template</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">str</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> re <span class="token operator">=</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\\{\\{\\s*([^\\}]+)?\\s*\\}\\}</span><span class="token regex-delimiter">/</span><span class="token regex-flags">g</span></span><span class="token punctuation">;</span>
  str <span class="token operator">=</span> str<span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span>re<span class="token punctuation">,</span> <span class="token string">&#39;&quot; + data.$1 + &quot;&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Function</span><span class="token punctuation">(</span><span class="token string">&#39;data&#39;</span><span class="token punctuation">,</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">return &quot;</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>str<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&quot;;</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token function">t</span><span class="token punctuation">(</span><span class="token string">&#39;Hello {{ name }}&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// return &quot;Hello &quot; + data.name + &quot;&quot;;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>OK!! \u5230\u9019\u88E1\u5F8C\u5DF2\u7D93\u5B8C\u6210 80% \u4E86\uFF0C\u76EE\u524D\u7DE8\u8B6F\u5B57\u4E32\u8981\u5148\u624B\u52D5\u57F7\u884C\u4E00\u6B21 <code>template</code> \u51FD\u6578\uFF0C\u53EF\u4EE5\u628A\u4ED6\u5C01\u88DD\u5982\u4E0B\u81EA\u52D5\u5316\uFF1A</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token function-variable function">template</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">str</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> re <span class="token operator">=</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\\{\\{\\s*([^\\}]+)?\\s*\\}\\}</span><span class="token regex-delimiter">/</span><span class="token regex-flags">g</span></span><span class="token punctuation">;</span>
  str <span class="token operator">=</span> str<span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span>re<span class="token punctuation">,</span> <span class="token string">&#39;&quot; + data.$1 + &quot;&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Function</span><span class="token punctuation">(</span><span class="token string">&#39;data&#39;</span><span class="token punctuation">,</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">return &quot;</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>str<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&quot;;</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> <span class="token function-variable function">render</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">str<span class="token punctuation">,</span> data</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  str <span class="token operator">=</span> <span class="token function">String</span><span class="token punctuation">(</span>str<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">let</span> fn <span class="token operator">=</span> <span class="token function">template</span><span class="token punctuation">(</span>str<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">return</span> <span class="token function">fn</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token function">render</span><span class="token punctuation">(</span><span class="token string">&#39;Hello {{ name }}&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;Johnny&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// Hello Johnny</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="\u9032\u968E\u5B57\u7B26\u4E32\u8655\u7406" tabindex="-1"><a class="header-anchor" href="#\u9032\u968E\u5B57\u7B26\u4E32\u8655\u7406" aria-hidden="true">#</a> \u9032\u968E\u5B57\u7B26\u4E32\u8655\u7406</h2><p>\u6700\u5F8C\u70BA\u9019\u500B\u7D14\u5B57\u7B26\u4E32\u66FF\u63DB\u51FD\u6578\u52A0\u4E0A\u4E00\u4E9B\u529F\u80FD\uFF0C\u5305\u542B\u8CC7\u6599\u7F3A\u5931\u8655\u7406\u3001\u6BD4\u5C0D emps \u8F38\u51FA</p><h4 id="\u8CC7\u6599\u7F3A\u5931" tabindex="-1"><a class="header-anchor" href="#\u8CC7\u6599\u7F3A\u5931" aria-hidden="true">#</a> \u8CC7\u6599\u7F3A\u5931</h4><p>\u7576\u8CC7\u6599\u7F3A\u5931\u6642\uFF0C\u4E0A\u9762\u7684\u51FD\u6578\u6703\u76F4\u63A5\u986F\u793A undefined \u65BC\u756B\u9762\u4E2D\uFF0C\u53EF\u4EE5\u5728 <code>replace</code> \u66FF\u63DB\u6642\u9032\u884C\u5224\u65B7\uFF1A</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token function-variable function">template</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">str</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> re <span class="token operator">=</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\\{\\{\\s*([^\\}]+)?\\s*\\}\\}</span><span class="token regex-delimiter">/</span><span class="token regex-flags">g</span></span><span class="token punctuation">;</span>
  str <span class="token operator">=</span> str<span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span>re<span class="token punctuation">,</span> <span class="token string">&#39;&quot; + (data.$1 ? data.$1 : &#39;</span><span class="token string">&#39;) + &quot;&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Function</span><span class="token punctuation">(</span><span class="token string">&#39;data&#39;</span><span class="token punctuation">,</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">return &quot;</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>str<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&quot;;</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token comment">// ...</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u73FE\u5728\u8CC7\u6599\u7F3A\u5931\uFF0C\u5C31\u6703\u76F4\u63A5\u8FD4\u56DE\u7A7A\u767D\u4E86\u3002</p><h4 id="\u6BD4\u5C0D-emps-\u8F38\u51FA" tabindex="-1"><a class="header-anchor" href="#\u6BD4\u5C0D-emps-\u8F38\u51FA" aria-hidden="true">#</a> \u6BD4\u5C0D emps \u8F38\u51FA</h4><p>\u70BA\u4E86\u77E5\u9053\u7E3D\u5171\u7DE8\u8B6F\u4E86\u591A\u5C11\u500B\u5C0D\u8C61\uFF0C\u4E14\u5C0D\u8C61\u7684 key \u5206\u5225\u662F\u8AB0\uFF0C\u6211\u5011\u9700\u8981\u5728\u7DE8\u8B6F\u5F8C\u53D6\u5F97\u76F8\u95DC\u7684\u8CC7\u6599\uFF0C\u5BE6\u4F5C\u5982\u4E0B\uFF1A</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token function-variable function">removeWrapper</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">arr</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> ret <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
  arr<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">exp</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    ret<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>exp<span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">[\\{|\\}]</span><span class="token regex-delimiter">/</span><span class="token regex-flags">g</span></span><span class="token punctuation">,</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">trim</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">return</span> ret<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> <span class="token function-variable function">render</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">str<span class="token punctuation">,</span> data</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  str <span class="token operator">=</span> <span class="token function">String</span><span class="token punctuation">(</span>str<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">let</span> exps <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
  <span class="token keyword">const</span> <span class="token function-variable function">template</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">str</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> re <span class="token operator">=</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\\{\\{\\s*([^\\}]+)?\\s*\\}\\}</span><span class="token regex-delimiter">/</span><span class="token regex-flags">g</span></span><span class="token punctuation">;</span>
    exps <span class="token operator">=</span> <span class="token function">removeWrapper</span><span class="token punctuation">(</span>str<span class="token punctuation">.</span><span class="token function">match</span><span class="token punctuation">(</span>re<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// \u63D0\u53D6\u7B26\u5408\u7684\u5B57\u4E32\u5F8C\u79FB\u9664\u5927\u62EC\u865F</span>
    str <span class="token operator">=</span> str<span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span>re<span class="token punctuation">,</span> <span class="token string">&#39;&quot; + data.$1 + &quot;&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Function</span><span class="token punctuation">(</span><span class="token string">&#39;data&#39;</span><span class="token punctuation">,</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">return &quot;</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>str<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&quot;;</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
  <span class="token keyword">let</span> fn <span class="token operator">=</span> <span class="token function">template</span><span class="token punctuation">(</span>str<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">return</span> <span class="token punctuation">{</span>
    exps<span class="token punctuation">,</span>
    <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token function">fn</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token function">render</span><span class="token punctuation">(</span><span class="token string">&#39;Hello {{ name }}&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;Johnny&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">/*
{
  exps: [&#39;name&#39;],
  value: &#39;Hello Johnny&#39;
}
*/</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,26);function k(d,v){const n=p("SocialBlock");return e(),o("div",null,[u,s(n,{hashtags:"javascript,text"}),r,s(n,{hashtags:"javascript,text"})])}const g=t(i,[["render",k],["__file","literal-template.html.vue"]]);export{g as default};