import{_ as i,r as n,o as r,c as o,d as a,e,a as c,f as t}from"./app-da643460.js";const d={},p=t('<h1 id="git-merge-分支合併指令" tabindex="-1"><a class="header-anchor" href="#git-merge-分支合併指令" aria-hidden="true">#</a> Git Merge 分支合併指令</h1><p><code>git merge</code> 是用於從指定的commit(s)合併到當前分支的操作。</p><p>常見有以下三種：</p><ol><li><p>git merge <code>[-n] [--stat] [--no-commit] [--squash] [--[no-]edit] [-s &lt;strategy&gt;] [-X &lt;strategy-option&gt;] [-S[&lt;keyid&gt;]] [--[no-]rerere-autoupdate] [-m &lt;msg&gt;] [&lt;commit&gt;...]</code></p></li><li><p>git merge -m <code>&lt;msg&gt; &lt;commit&gt;....</code></p></li><li><p>git merge --abort</p></li></ol><p>其中一二差別在於添加 <code>msg</code>，第三種僅在合併後導致衝突時使用，將會拋棄合併過程，並嘗試重建合併前的狀態，但是～！當合併開始時，如果存在未 commit 的文件，此指令有可能會無法重現合併前的狀態，特別是這些未 commit 文件在合併過程中將會被修改時。</p><p>使用 <code>git merge</code> 時盡量不要出現未 commit 的文件，如果逼不得已必須先暫存的話，可以使用 <code>git stash</code> 將這些未 commit 文件保存，待處理完 conflick 後，使用 <code>git stash pop</code> 還原出來即可。</p>',6),m=a("code",null,"git stash",-1),l={href:"https://johnnywang1994.github.io/book/articles/git/stash.html",target:"_blank",rel:"noopener noreferrer"},h=t(`<h2 id="分支的基本用法" tabindex="-1"><a class="header-anchor" href="#分支的基本用法" aria-hidden="true">#</a> 分支的基本用法</h2><p>首先，我們假設你正在開發你的專案，並且已經有一些提交（commit）了。</p><p>你決定要修正其中的議題 #53； 要同時新建並切換到新分支，你可以在執行 git checkout 時加上 -b 選項：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">git</span> checkout <span class="token parameter variable">-b</span> iss53
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>你開始開發網站，並做了一些提交；突然網站有一個問題需要立即修正，唯一需要做的只是切換回發佈產品用的 master 分支。</p><p>然而，在切換分支之前，留意一下你的工作目錄或預存區（staging area）裡是否有還沒提交的內容，</p><p>它可能會和你即要檢出的分支產生衝突（conflict），Git 會因此而不讓你切換分支。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">git</span> checkout master
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>接下來開始緊急修正； 讓我們建立一個緊急修正用的分支來進行工作，直到完成它：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">git</span> checkout <span class="token parameter variable">-b</span> hotfix
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="合併分支" tabindex="-1"><a class="header-anchor" href="#合併分支" aria-hidden="true">#</a> 合併分支</h2><p>當你處理修改完後，切回 master 並把 hotfix 分支使用<code>git merge</code>合併進來，再部署到產品上。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">git</span> checkout master
$ <span class="token function">git</span> merge hotfix
Updating f42c576<span class="token punctuation">..</span>3a0874c
Fast-forward
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意合併時有一個「Fast-forward」字眼；由於你要合併的分支 hotfix 所指向的提交超前了 master 提交，</p><p>Git 於是簡單地把分支指標向前推進；換句話說，如果想要合併的提交可以直接往回追溯歷史到目前所在的提交，</p><p>Git 會因為沒有需要合併的工作而簡單地把指標向前推進——這就是所謂的「快進（fast-forward）」。</p><p>在那個超級重要的修正被部署以後，你準備要切回到之前被中斷而正在做的工作；</p><p>然而在那之前，你可以先刪除 hotfix，因為你不再需要它了——master 也指向相同的提交；</p><h2 id="切回到之前用來解決議題-53" tabindex="-1"><a class="header-anchor" href="#切回到之前用來解決議題-53" aria-hidden="true">#</a> 切回到之前用來解決議題 #53</h2><p>這裡值得注意的是之前 hotfix 分支的修改內容尚未包含到 iss53 分支的檔案中；</p><p>如果需要納入那個修正，你可以用 git merge master 把 master 分支合併到 iss53 分支；</p><p>(<code>git merge</code> 後只是指標會連在一起，但若後續再對 master 提交，master 分支仍然會存在並往下個提交推進)</p><p>或者等 iss53 分支完成之後，再將它合併到 master。</p><h2 id="三方合併-three-way-merge-、合併提交-merge-commit" tabindex="-1"><a class="header-anchor" href="#三方合併-three-way-merge-、合併提交-merge-commit" aria-hidden="true">#</a> 三方合併（three-way merge）、合併提交（merge commit）</h2><p>你已經完成了議題 #53 的工作，並準備好將它合併到 master 分支； 要完成這件事，你需要將 iss53 分支合併到 master 分支，</p><p>實際操作和之前合併 hotfix 分支時差不多， 只需切回合併目的地的 master 分支，然後執行 git merge 命令。</p><p>但此時，你的開發歷史是從一個較早的點便開始分離開來，由於目前所在的提交，並不是被合併的分支的直接祖先，</p><p>Git 必需進行一些處理，進行一次簡單的三方合併。</p><p>不同於將分支指標向前推進，Git 會對三方合併後的結果產生一個新的快照，並自動建立一個指向這個快照的提交。</p><p>這個提交被稱為「合併提交（merge commit）」</p>`,30);function g(u,b){const s=n("ExternalLinkIcon");return r(),o("div",null,[p,a("p",null,[e("詳細的 "),m,e(" 指令可以"),a("a",l,[e("參考這邊"),c(s)])]),h])}const f=i(d,[["render",g],["__file","merge.html.vue"]]);export{f as default};