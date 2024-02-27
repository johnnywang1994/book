import{_ as s,r as e,o as i,c as l,d as n,e as c,a as t,f as o}from"./app-4f8ac264.js";const r={},p=o(`<h1 id="function-函數" tabindex="-1"><a class="header-anchor" href="#function-函數" aria-hidden="true">#</a> Function 函數</h1><h2 id="基本語法" tabindex="-1"><a class="header-anchor" href="#基本語法" aria-hidden="true">#</a> 基本語法</h2><ul><li><code>return</code> 退出函數，函數中最後一行 return 可省略</li><li>函數定義本身也是一個命令，除非語法錯誤，否則總是狀態碼 0</li><li>函數須在使用前定義</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function-name function">fname</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  commands
  <span class="token builtin class-name">return</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="函數使用" tabindex="-1"><a class="header-anchor" href="#函數使用" aria-hidden="true">#</a> 函數使用</h2><p>shell 函數可視為指令，執行函數和執行其他命令是一樣的</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>fname <span class="token punctuation">[</span>arguments<span class="token punctuation">..</span>.<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="函數內的變數位置" tabindex="-1"><a class="header-anchor" href="#函數內的變數位置" aria-hidden="true">#</a> 函數內的變數位置</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function-name function">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment"># $0 仍然指向腳本文件名稱</span>
  <span class="token builtin class-name">echo</span> <span class="token string">&quot;\\<span class="token variable">$0</span> = <span class="token variable">$0</span>&quot;</span>
  <span class="token comment"># 其它位置參數被更新成函數調用時的參數</span>
  <span class="token builtin class-name">echo</span>  <span class="token string">&quot;參數個數 <span class="token variable">$#</span>, 分別為 <span class="token variable">$@</span>&quot;</span>
  <span class="token comment"># 函數的名稱存在環境變數 FUNCNAME 中</span>
  <span class="token builtin class-name">echo</span> <span class="token variable">$FUNCNAME</span>
<span class="token punctuation">}</span>

<span class="token comment"># 给這個函數傳參執行</span>
func <span class="token number">1</span> <span class="token number">2</span> <span class="token number">3</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="局部變數" tabindex="-1"><a class="header-anchor" href="#局部變數" aria-hidden="true">#</a> 局部變數</h2><p>透過 <code>local</code> 在函數內部定義局部變數</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function-name function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="reference" tabindex="-1"><a class="header-anchor" href="#reference" aria-hidden="true">#</a> Reference</h2>`,13),d={href:"https://juejin.cn/post/7130983293347954718",target:"_blank",rel:"noopener noreferrer"};function u(v,b){const a=e("ExternalLinkIcon");return i(),l("div",null,[p,n("ul",null,[n("li",null,[n("a",d,[c("Shell 腳本編程"),t(a)])])])])}const h=s(r,[["render",u],["__file","06function.html.vue"]]);export{h as default};
