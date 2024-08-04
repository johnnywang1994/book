import{_ as s,o as n,c as a,f as e}from"./app-6eac6164.js";const i={},t=e(`<h1 id="git-stash-保存紀錄" tabindex="-1"><a class="header-anchor" href="#git-stash-保存紀錄" aria-hidden="true">#</a> Git Stash 保存紀錄</h1><p><code>git stash</code> 能用來記錄當前工作目錄和索引的當前狀態，可以讓您保存當前修改後暫時處理其他事項，回到修改前的乾淨目錄</p><h2 id="用法列表" tabindex="-1"><a class="header-anchor" href="#用法列表" aria-hidden="true">#</a> 用法列表</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 保存當前未 commit 的紀錄</span>
<span class="token function">git</span> stash

<span class="token comment"># 保存當前未 commit 的程式碼並添加備註</span>
<span class="token function">git</span> stash save <span class="token string">&quot;備註的內容&quot;</span>

<span class="token comment"># 列出 stash 的所有紀錄</span>
<span class="token function">git</span> stash list

<span class="token comment"># 刪除 stash 的所有紀錄</span>
<span class="token function">git</span> stash <span class="token function">clear</span>

<span class="token comment"># 應用最近一次的 stash</span>
<span class="token function">git</span> stash apply

<span class="token comment"># 應用最近一次的 stash，隨後刪除該紀錄</span>
<span class="token function">git</span> stash pop

<span class="token comment"># 刪除最近的一次 stash</span>
<span class="token function">git</span> stash drop
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">git</span> stash list
stash@<span class="token punctuation">{</span><span class="token number">0</span><span class="token punctuation">}</span>: WIP on <span class="token punctuation">..</span>.
stash@<span class="token punctuation">{</span><span class="token number">1</span><span class="token punctuation">}</span>: WIP on <span class="token punctuation">..</span>.
stash@<span class="token punctuation">{</span><span class="token number">2</span><span class="token punctuation">}</span>: On <span class="token punctuation">..</span>.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 應用第二條 stash 紀錄</span>
$ <span class="token function">git</span> stash apply stash@<span class="token punctuation">{</span><span class="token number">1</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div>`,6),c=[t];function l(d,o){return n(),a("div",null,c)}const u=s(i,[["render",l],["__file","stash.html.vue"]]);export{u as default};
