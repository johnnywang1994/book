import{_ as s,o as n,c as a,e}from"./app.9195bff3.js";const i={},t=e(`<h1 id="git-stash-\u4FDD\u5B58\u7D00\u9304" tabindex="-1"><a class="header-anchor" href="#git-stash-\u4FDD\u5B58\u7D00\u9304" aria-hidden="true">#</a> Git Stash \u4FDD\u5B58\u7D00\u9304</h1><p><code>git stash</code> \u80FD\u7528\u4F86\u8A18\u9304\u7576\u524D\u5DE5\u4F5C\u76EE\u9304\u548C\u7D22\u5F15\u7684\u7576\u524D\u72C0\u614B\uFF0C\u53EF\u4EE5\u8B93\u60A8\u4FDD\u5B58\u7576\u524D\u4FEE\u6539\u5F8C\u66AB\u6642\u8655\u7406\u5176\u4ED6\u4E8B\u9805\uFF0C\u56DE\u5230\u4FEE\u6539\u524D\u7684\u4E7E\u6DE8\u76EE\u9304</p><h2 id="\u7528\u6CD5\u5217\u8868" tabindex="-1"><a class="header-anchor" href="#\u7528\u6CD5\u5217\u8868" aria-hidden="true">#</a> \u7528\u6CD5\u5217\u8868</h2><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment"># \u4FDD\u5B58\u7576\u524D\u672A commit \u7684\u7D00\u9304</span>
<span class="token function">git</span> stash

<span class="token comment"># \u4FDD\u5B58\u7576\u524D\u672A commit \u7684\u7A0B\u5F0F\u78BC\u4E26\u6DFB\u52A0\u5099\u8A3B</span>
<span class="token function">git</span> stash save <span class="token string">&quot;\u5099\u8A3B\u7684\u5167\u5BB9&quot;</span>

<span class="token comment"># \u5217\u51FA stash \u7684\u6240\u6709\u7D00\u9304</span>
<span class="token function">git</span> stash list

<span class="token comment"># \u522A\u9664 stash \u7684\u6240\u6709\u7D00\u9304</span>
<span class="token function">git</span> stash <span class="token function">clear</span>

<span class="token comment"># \u61C9\u7528\u6700\u8FD1\u4E00\u6B21\u7684 stash</span>
<span class="token function">git</span> stash apply

<span class="token comment"># \u61C9\u7528\u6700\u8FD1\u4E00\u6B21\u7684 stash\uFF0C\u96A8\u5F8C\u522A\u9664\u8A72\u7D00\u9304</span>
<span class="token function">git</span> stash pop

<span class="token comment"># \u522A\u9664\u6700\u8FD1\u7684\u4E00\u6B21 stash</span>
<span class="token function">git</span> stash drop
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>$ <span class="token function">git</span> stash list
stash@<span class="token punctuation">{</span><span class="token number">0</span><span class="token punctuation">}</span>: WIP on <span class="token punctuation">..</span>.
stash@<span class="token punctuation">{</span><span class="token number">1</span><span class="token punctuation">}</span>: WIP on <span class="token punctuation">..</span>.
stash@<span class="token punctuation">{</span><span class="token number">2</span><span class="token punctuation">}</span>: On <span class="token punctuation">..</span>.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment"># \u61C9\u7528\u7B2C\u4E8C\u689D stash \u7D00\u9304</span>
$ <span class="token function">git</span> stash apply stash@<span class="token punctuation">{</span><span class="token number">1</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div>`,6),c=[t];function l(d,o){return n(),a("div",null,c)}var u=s(i,[["render",l],["__file","stash.html.vue"]]);export{u as default};
