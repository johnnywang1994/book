import{_ as i,r as d,o as c,c as o,d as a,e,a as n,f as l}from"./app-da643460.js";const r={},t=l(`<h1 id="script-腳本撰寫" tabindex="-1"><a class="header-anchor" href="#script-腳本撰寫" aria-hidden="true">#</a> Script 腳本撰寫</h1><h2 id="hello-shell" tabindex="-1"><a class="header-anchor" href="#hello-shell" aria-hidden="true">#</a> Hello Shell</h2><p>拿一個基本的 <code>hello.sh</code> 為例</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token shebang important">#!/bin/bash</span>

<span class="token builtin class-name">echo</span> <span class="token string">&quot;Hello Shell!&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>#!</code> 稱為shebang 指令，指定運行該腳本的解析器，預設使用 <code>/bin/sh</code>，所有語言中通用，JS, Python 撰寫如下</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token shebang important">#! /usr/bin/env node</span>
<span class="token comment"># JS</span>

<span class="token comment">#! /usr/bin/env python3</span>
<span class="token comment"># PY3</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>因為這些腳本解析器位置不固定，使用 <code>/usr/bin/env</code> 可以找到系統安裝的路徑相容性較佳</p><h3 id="腳本執行" tabindex="-1"><a class="header-anchor" href="#腳本執行" aria-hidden="true">#</a> 腳本執行</h3><ol><li>直接調用，需要有文件執行權限，必須有路徑前綴，否則會被視為命令執行，但 PATH 變數不包含當前目錄，出於安全考量</li></ol><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 給所有用戶添加執行權限</span>
$ <span class="token function">chmod</span> <span class="token number">755</span> hello.sh
$ ./hello.sh <span class="token comment"># 注意這裡 ./ 是必須的</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2"><li>指定解析器調用，不需要有文件執行權限，路徑前綴也不是必須，文件內 shebang 指令將被忽略</li></ol><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">bash</span> ./hello.sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol start="3"><li>作為命令執行</li></ol><ul><li>第一種方法是把腳本放到 PATH 變數包含的目錄下執行，推薦 <code>/usr/local/bin</code></li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">mv</span> hello.sh /usr/local/bin/hello
$ hello
<span class="token comment"># hello</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>第二種是透過 <code>ln</code> 創建文件軟連結</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">ln</span> <span class="token parameter variable">-s</span> ./hello.sh /usr/local/bin/hello
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li>第三種更推薦的是使用別名 <code>alias</code></li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># \`pwd\` 展開為當前 alias 設定時的路徑位置</span>
$ <span class="token builtin class-name">alias</span> <span class="token assign-left variable">hello</span><span class="token operator">=</span><span class="token string">&quot;bash <span class="token variable"><span class="token variable">\`</span><span class="token builtin class-name">pwd</span><span class="token variable">\`</span></span>/hello.sh&quot;</span>
$ <span class="token builtin class-name">alias</span> <span class="token operator">|</span> <span class="token function">grep</span> hello
<span class="token comment"># hello=&#39;bash /Users/johnnywang/Desktop/Johnny/hello.sh&#39;</span>
$ hello
<span class="token comment"># Hello Shell!</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="輸入輸出" tabindex="-1"><a class="header-anchor" href="#輸入輸出" aria-hidden="true">#</a> 輸入輸出</h2><p>主要透過三個內建指令：</p><h3 id="輸出" tabindex="-1"><a class="header-anchor" href="#輸出" aria-hidden="true">#</a> 輸出</h3>`,22),p=a("li",null,[a("code",null,"echo"),e(": 打印內容到標準輸出")],-1),u=a("code",null,"printf",-1),h={href:"https://www.runoob.com/linux/linux-shell-printf.html",target:"_blank",rel:"noopener noreferrer"},v=l(`<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token builtin class-name">printf</span> <span class="token string">&quot;保留2位小數：Pi= %1.2f&quot;</span> <span class="token variable">$PI</span>
<span class="token comment"># 3.14</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="輸入" tabindex="-1"><a class="header-anchor" href="#輸入" aria-hidden="true">#</a> 輸入</h3><ul><li><code>read</code>: 從標準輸入讀取用戶輸入</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token builtin class-name">read</span> <span class="token parameter variable">-p</span> <span class="token string">&quot;請輸入姓名&quot;</span> name
$ <span class="token builtin class-name">read</span> name1 name2 <span class="token operator">&lt;</span> file.txt
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="正則表達式" tabindex="-1"><a class="header-anchor" href="#正則表達式" aria-hidden="true">#</a> 正則表達式</h2><p>Bash 的正則分為兩種，基礎(BRE)、拓展(ERE)，很多地方預設使用 BRE</p><h3 id="grep-指令" tabindex="-1"><a class="header-anchor" href="#grep-指令" aria-hidden="true">#</a> grep 指令</h3><p>文本匹配工具，以行為單位打印符合匹配模式的整行文字內容</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">grep</span> <span class="token punctuation">[</span>options<span class="token punctuation">]</span> <span class="token punctuation">[</span>pattern<span class="token punctuation">]</span> <span class="token punctuation">[</span>file <span class="token punctuation">..</span>.<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>範例</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">grep</span> <span class="token parameter variable">-i</span> hello hello.sh
<span class="token comment"># echo &quot;Hello Shell!&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>如果不輸入文件，會從標準輸入讀取內容，因此常用在 pipeline 中作為搭配其他指令使用的結果過濾工具</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">history</span> <span class="token operator">|</span> <span class="token function">grep</span> <span class="token string">&quot;echo&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="reference" tabindex="-1"><a class="header-anchor" href="#reference" aria-hidden="true">#</a> Reference</h2>`,14),b={href:"https://juejin.cn/post/7130983293347954718",target:"_blank",rel:"noopener noreferrer"};function m(g,k){const s=d("ExternalLinkIcon");return c(),o("div",null,[t,a("ul",null,[p,a("li",null,[u,e(": 格式化輸出，使用方式"),a("a",h,[e("參考這裡"),n(s)])])]),v,a("ul",null,[a("li",null,[a("a",b,[e("Shell 腳本編程"),n(s)])])])])}const x=i(r,[["render",m],["__file","03script.html.vue"]]);export{x as default};