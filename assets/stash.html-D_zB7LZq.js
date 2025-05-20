import{_ as n,c as a,d as e,o as i}from"./app-BrOWnwog.js";const l={};function t(c,s){return i(),a("div",null,s[0]||(s[0]=[e(`<h1 id="git-stash-保存紀錄" tabindex="-1"><a class="header-anchor" href="#git-stash-保存紀錄"><span>Git Stash 保存紀錄</span></a></h1><p><code>git stash</code> 能用來記錄當前工作目錄和索引的當前狀態，可以讓您保存當前修改後暫時處理其他事項，回到修改前的乾淨目錄</p><h2 id="用法列表" tabindex="-1"><a class="header-anchor" href="#用法列表"><span>用法列表</span></a></h2><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code><span class="line"><span class="token comment"># 保存當前未 commit 的紀錄</span></span>
<span class="line"><span class="token function">git</span> stash</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 保存當前未 commit 的程式碼並添加備註</span></span>
<span class="line"><span class="token function">git</span> stash save <span class="token string">&quot;備註的內容&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 列出 stash 的所有紀錄</span></span>
<span class="line"><span class="token function">git</span> stash list</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 刪除 stash 的所有紀錄</span></span>
<span class="line"><span class="token function">git</span> stash <span class="token function">clear</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 應用最近一次的 stash</span></span>
<span class="line"><span class="token function">git</span> stash apply</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 應用最近一次的 stash，隨後刪除該紀錄</span></span>
<span class="line"><span class="token function">git</span> stash pop</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 刪除最近的一次 stash</span></span>
<span class="line"><span class="token function">git</span> stash drop</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code><span class="line">$ <span class="token function">git</span> stash list</span>
<span class="line">stash@<span class="token punctuation">{</span><span class="token number">0</span><span class="token punctuation">}</span>: WIP on <span class="token punctuation">..</span>.</span>
<span class="line">stash@<span class="token punctuation">{</span><span class="token number">1</span><span class="token punctuation">}</span>: WIP on <span class="token punctuation">..</span>.</span>
<span class="line">stash@<span class="token punctuation">{</span><span class="token number">2</span><span class="token punctuation">}</span>: On <span class="token punctuation">..</span>.</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code><span class="line"><span class="token comment"># 應用第二條 stash 紀錄</span></span>
<span class="line">$ <span class="token function">git</span> stash apply stash@<span class="token punctuation">{</span><span class="token number">1</span><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div>`,6)]))}const o=n(l,[["render",t]]),d=JSON.parse('{"path":"/articles/git/stash.html","title":"Git Stash 保存紀錄","lang":"zh-TW","frontmatter":{},"git":{"updatedTime":1648521821000,"contributors":[{"name":"johnnywang1994","username":"johnnywang1994","email":"johnny29621189@kimo.com","commits":2,"url":"https://github.com/johnnywang1994"}],"changelog":[{"hash":"71ccb7693345c8ddc2f554e00f8a0ce73af2b783","time":1648521821000,"email":"johnny29621189@kimo.com","author":"johnnywang1994","message":"UPD: upgrade to v2"},{"hash":"4f6b4a1132d02dee2dd7a88840addd4028265b72","time":1647334152000,"email":"johnny29621189@kimo.com","author":"johnnywang1994","message":"UPD: add git stash"}]},"filePathRelative":"articles/git/stash.md"}');export{o as comp,d as data};
