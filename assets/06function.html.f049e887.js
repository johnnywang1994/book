import{_ as s,r as e,o as i,c as l,d as n,e as c,a as t,f as o}from"./app.34c1de08.js";const r={},p=o(`<h1 id="function-\u51FD\u6578" tabindex="-1"><a class="header-anchor" href="#function-\u51FD\u6578" aria-hidden="true">#</a> Function \u51FD\u6578</h1><h2 id="\u57FA\u672C\u8A9E\u6CD5" tabindex="-1"><a class="header-anchor" href="#\u57FA\u672C\u8A9E\u6CD5" aria-hidden="true">#</a> \u57FA\u672C\u8A9E\u6CD5</h2><ul><li><code>return</code> \u9000\u51FA\u51FD\u6578\uFF0C\u51FD\u6578\u4E2D\u6700\u5F8C\u4E00\u884C return \u53EF\u7701\u7565</li><li>\u51FD\u6578\u5B9A\u7FA9\u672C\u8EAB\u4E5F\u662F\u4E00\u500B\u547D\u4EE4\uFF0C\u9664\u975E\u8A9E\u6CD5\u932F\u8AA4\uFF0C\u5426\u5247\u7E3D\u662F\u72C0\u614B\u78BC 0</li><li>\u51FD\u6578\u9808\u5728\u4F7F\u7528\u524D\u5B9A\u7FA9</li></ul><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function-name function">fname</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  commands
  <span class="token builtin class-name">return</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="\u51FD\u6578\u4F7F\u7528" tabindex="-1"><a class="header-anchor" href="#\u51FD\u6578\u4F7F\u7528" aria-hidden="true">#</a> \u51FD\u6578\u4F7F\u7528</h2><p>shell \u51FD\u6578\u53EF\u8996\u70BA\u6307\u4EE4\uFF0C\u57F7\u884C\u51FD\u6578\u548C\u57F7\u884C\u5176\u4ED6\u547D\u4EE4\u662F\u4E00\u6A23\u7684</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>fname <span class="token punctuation">[</span>arguments<span class="token punctuation">..</span>.<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="\u51FD\u6578\u5167\u7684\u8B8A\u6578\u4F4D\u7F6E" tabindex="-1"><a class="header-anchor" href="#\u51FD\u6578\u5167\u7684\u8B8A\u6578\u4F4D\u7F6E" aria-hidden="true">#</a> \u51FD\u6578\u5167\u7684\u8B8A\u6578\u4F4D\u7F6E</h2><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function-name function">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment"># $0 \u4ECD\u7136\u6307\u5411\u8173\u672C\u6587\u4EF6\u540D\u7A31</span>
  <span class="token builtin class-name">echo</span> <span class="token string">&quot;\\<span class="token variable">$0</span> = <span class="token variable">$0</span>&quot;</span>
  <span class="token comment"># \u5176\u5B83\u4F4D\u7F6E\u53C3\u6578\u88AB\u66F4\u65B0\u6210\u51FD\u6578\u8ABF\u7528\u6642\u7684\u53C3\u6578</span>
  <span class="token builtin class-name">echo</span>  <span class="token string">&quot;\u53C3\u6578\u500B\u6578 <span class="token variable">$#</span>, \u5206\u5225\u70BA <span class="token variable">$@</span>&quot;</span>
  <span class="token comment"># \u51FD\u6578\u7684\u540D\u7A31\u5B58\u5728\u74B0\u5883\u8B8A\u6578 FUNCNAME \u4E2D</span>
  <span class="token builtin class-name">echo</span> <span class="token variable">$FUNCNAME</span>
<span class="token punctuation">}</span>

<span class="token comment"># \u7ED9\u9019\u500B\u51FD\u6578\u50B3\u53C3\u57F7\u884C</span>
func <span class="token number">1</span> <span class="token number">2</span> <span class="token number">3</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="\u5C40\u90E8\u8B8A\u6578" tabindex="-1"><a class="header-anchor" href="#\u5C40\u90E8\u8B8A\u6578" aria-hidden="true">#</a> \u5C40\u90E8\u8B8A\u6578</h2><p>\u900F\u904E <code>local</code> \u5728\u51FD\u6578\u5167\u90E8\u5B9A\u7FA9\u5C40\u90E8\u8B8A\u6578</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function-name function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token builtin class-name">local</span> <span class="token assign-left variable">var</span><span class="token operator">=</span><span class="token string">&quot;var in foo&quot;</span>
  bar
<span class="token punctuation">}</span>

<span class="token function-name function">bar</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token builtin class-name">echo</span> <span class="token variable">$var</span>
  <span class="token assign-left variable">var</span><span class="token operator">=</span><span class="token string">&quot;var in bar&quot;</span>
  <span class="token builtin class-name">echo</span> <span class="token variable">$var</span>
<span class="token punctuation">}</span>

<span class="token assign-left variable">var</span><span class="token operator">=</span><span class="token string">&quot;var in global&quot;</span>
foo
<span class="token builtin class-name">echo</span> <span class="token variable">$var</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="reference" tabindex="-1"><a class="header-anchor" href="#reference" aria-hidden="true">#</a> Reference</h2>`,13),u={href:"https://juejin.cn/post/7130983293347954718",target:"_blank",rel:"noopener noreferrer"};function d(v,b){const a=e("ExternalLinkIcon");return i(),l("div",null,[p,n("ul",null,[n("li",null,[n("a",u,[c("Shell \u8173\u672C\u7DE8\u7A0B"),t(a)])])])])}const h=s(r,[["render",d],["__file","06function.html.vue"]]);export{h as default};