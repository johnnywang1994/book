import{_ as e,o as a,c as s,f as n}from"./app-da643460.js";const i={},d=n(`<h1 id="git-分支" tabindex="-1"><a class="header-anchor" href="#git-分支" aria-hidden="true">#</a> Git 分支</h1><p>Git 分支其實只是一個指向某提交的可移動輕量級指標， Git 預設分支名稱是 master，</p><p>隨著不斷地製作提交，master 分支會為你一直指向最後一個提交， 它在每次提交的時候都會自動向前移動。</p><h2 id="查看分支" tabindex="-1"><a class="header-anchor" href="#查看分支" aria-hidden="true">#</a> 查看分支</h2><p><code>git branch</code> 不加任何參數，你將會得到所有分支的簡易清單</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">git</span> branch
  iss53
* master
  testing
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><p><code>-v</code>：查看各分支最後一個提交內容</p></li><li><p><code>--merged</code>, <code>--no-merged</code>：從清單中篩選出已經合併或尚未合併到目前分支的分支。</p></li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">git</span> branch <span class="token parameter variable">-v</span>
  iss53   93b412c fix javascript issue
* master  7a98805 Merge branch <span class="token string">&#39;iss53&#39;</span>
  testing 782fd34 <span class="token function">add</span> scott to the author list <span class="token keyword">in</span> the readmes
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="建立一個新的分支" tabindex="-1"><a class="header-anchor" href="#建立一個新的分支" aria-hidden="true">#</a> 建立一個新的分支</h2><p><code>git branch [new branch name]</code> 建立一個新的、可移動的指標，在目前提交上新建一個指標。二個分支都指向同一系列的提交歷史</p><p>此命令只是建立一個新的分支，並不會切換過去。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">git</span> branch testing
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>Git 它保存了一個名為 HEAD 的特別指標，會指向你當前所在的分支，你可藉此知道你目前在哪個分支上工作。</p><h2 id="刪除一個分支" tabindex="-1"><a class="header-anchor" href="#刪除一個分支" aria-hidden="true">#</a> 刪除一個分支</h2><p>加上後綴 <code>-d [branch name]</code> 可以刪除指定分支，注意，刪除只是移除分支名稱，該分支內的提交仍然存在於 Git 紀錄中。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">git</span> branch <span class="token parameter variable">-d</span> testing
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="在分支之間切換" tabindex="-1"><a class="header-anchor" href="#在分支之間切換" aria-hidden="true">#</a> 在分支之間切換</h2><p><code>git checkout</code> 切換到一個已經存在的分支，這會移動 HEAD 並指向 testing 分支。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">git</span> checkout testing
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>這條命令做了兩件事， 它把 HEAD 指標移過去並指向 testing 分支，然後把工作目錄中的檔案換成 testing 分支所指向的快照內容；</p><p>加上後綴 <code>-b [new branch name]</code> 可以在創建新分支的同時切換 HEAD 指標。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">git</span> checkout <span class="token parameter variable">-b</span> testing
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>還原指定檔案版本，例如誤刪或是改壞某個特定檔案，又不想把整個紀錄 reset 回去時，可以執行如下動作，這段指令的意思是把 master 分支中最新版的 test.js 給還原</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">git</span> checkout master test.js
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="以某遠端倉庫位置建立新分支" tabindex="-1"><a class="header-anchor" href="#以某遠端倉庫位置建立新分支" aria-hidden="true">#</a> 以某遠端倉庫位置建立新分支</h2><p>假如當前 git 中包含 remote - origin, test，可以透過如下指令切換建立一個 remote test 的分支內容</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">git</span> checkout <span class="token parameter variable">-b</span> <span class="token punctuation">[</span>branch-name<span class="token punctuation">]</span> <span class="token punctuation">[</span>remote/branch<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,27),t=[d];function c(r,l){return a(),s("div",null,t)}const h=e(i,[["render",c],["__file","branch.html.vue"]]);export{h as default};