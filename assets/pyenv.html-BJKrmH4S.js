import{_ as s,c as a,d as e,o as l}from"./app-DZhdvvpJ.js";const i={};function p(t,n){return l(),a("div",null,[...n[0]||(n[0]=[e(`<h1 id="pyenv-with-virtualenv-配置" tabindex="-1"><a class="header-anchor" href="#pyenv-with-virtualenv-配置"><span>Pyenv with virtualenv 配置</span></a></h1><ul><li><a href="https://blog.tarswork.com/zh/post/managing-python-multiple-versions-using-pyenv-virtualenv" target="_blank" rel="noopener noreferrer">Python multi versions</a></li></ul><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line">$ brew <span class="token function">install</span> pyenv</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 查看可安裝的 Python 版本</span></span>
<span class="line">pyenv <span class="token function">install</span> <span class="token parameter variable">--list</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 查看所有已安裝的版本</span></span>
<span class="line">pyenv versions</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 切換 Python 版本</span></span>
<span class="line">pyenv global <span class="token number">3.10</span>.12    對應於全域</span>
<span class="line">pyenv <span class="token builtin class-name">local</span> <span class="token number">3.10</span>.12     對應於當前資料夾</span>
<span class="line">pyenv shell <span class="token number">3.10</span>.12     對應於當前 shell</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>Note</li></ul><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"># Load pyenv automatically by appending</span>
<span class="line"># the following to</span>
<span class="line"># ~/.bash_profile if it exists, otherwise ~/.profile (for login shells)</span>
<span class="line"># and ~/.bashrc (for interactive shells) :</span>
<span class="line"></span>
<span class="line">export PYENV_ROOT=&quot;$HOME/.pyenv&quot;</span>
<span class="line">[[ -d $PYENV_ROOT/bin ]] &amp;&amp; export PATH=&quot;$PYENV_ROOT/bin:$PATH&quot;</span>
<span class="line">eval &quot;$(pyenv init - bash)&quot;</span>
<span class="line"></span>
<span class="line"># Restart your shell for the changes to take effect.</span>
<span class="line"></span>
<span class="line"># Load pyenv-virtualenv automatically by adding</span>
<span class="line"># the following to ~/.bashrc:</span>
<span class="line"></span>
<span class="line">eval &quot;$(pyenv virtualenv-init -)&quot;</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token comment"># 安裝 virtualenv</span></span>
<span class="line">pip3 <span class="token function">install</span> virtualenv</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 建立虛擬環境</span></span>
<span class="line">virtualenv venv</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 啟動環境</span></span>
<span class="line"><span class="token builtin class-name">source</span> venv/bin/activate</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 開發</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 導出依賴套件清單</span></span>
<span class="line">pip3 freeze <span class="token operator">&gt;</span> requirements.txt</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 未來可以使用以下指令將必要套件安裝回來</span></span>
<span class="line">pip3 <span class="token function">install</span> <span class="token parameter variable">-r</span> requirements.txt</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="issues" tabindex="-1"><a class="header-anchor" href="#issues"><span>Issues</span></a></h2><ul><li><a href="https://github.com/pandas-dev/pandas/issues/27532#issuecomment-514044754" target="_blank" rel="noopener noreferrer">No module named &#39;_lzma&#39;</a></li></ul>`,8)])])}const r=s(i,[["render",p]]),d=JSON.parse('{"path":"/articles/memo/python/pyenv.html","title":"Pyenv with virtualenv 配置","lang":"zh-TW","frontmatter":{},"git":{"updatedTime":1748788505000,"contributors":[{"name":"Lindy Liao","username":"","email":"meiliao1207@gmail.com","commits":2}],"changelog":[{"hash":"f01bfa128b4d33fbeddb8abb1697b5391b273d28","time":1748788505000,"email":"meiliao1207@gmail.com","author":"Lindy Liao","message":"UPD"},{"hash":"e7d9452a6d516fa2f2e38774420a0e47673307f2","time":1748368261000,"email":"meiliao1207@gmail.com","author":"Lindy Liao","message":"UPD"}]},"filePathRelative":"articles/memo/python/pyenv.md"}');export{r as comp,d as data};
