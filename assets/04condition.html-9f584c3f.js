import{_ as a,r as e,o as l,c as i,d as n,e as o,a as c,f as p}from"./app-fc6c1b2a.js";const t={},d=p(`<h1 id="condition-流程控制" tabindex="-1"><a class="header-anchor" href="#condition-流程控制" aria-hidden="true">#</a> Condition 流程控制</h1><h2 id="順序結構" tabindex="-1"><a class="header-anchor" href="#順序結構" aria-hidden="true">#</a> 順序結構</h2><p>預設從上到下執行，除非特殊指令作用，即使某條指令異常也會繼續執行，這點與大部分程式語言錯誤退出不太一樣</p><p><code>;</code> 是結束指令的符號，通常以換行省略此符號，用分號可以在一行內執行多個指令</p><h2 id="條件結構" tabindex="-1"><a class="header-anchor" href="#條件結構" aria-hidden="true">#</a> 條件結構</h2><ul><li><code>&amp;&amp;</code>, <code>||</code> 等可以快速構成簡單的 if else</li><li><code>if</code>, <code>then</code>, <code>elif</code>, <code>else</code>，其中 <code>if</code>, <code>fi</code> 為起止標誌，中間 <code>elif</code>, <code>else</code> 可選</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token keyword">if</span> test-commands<span class="token punctuation">;</span> <span class="token keyword">then</span>
    branch-commands<span class="token punctuation">;</span>
<span class="token keyword">elif</span> more-test-commands<span class="token punctuation">;</span> <span class="token keyword">then</span>
    more-brach-commands<span class="token punctuation">;</span>
<span class="token keyword">else</span>
    alternative-commands<span class="token punctuation">;</span>
<span class="token keyword">fi</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>shell 沒有表達式語法，使用指令執行的狀態碼進行條件判斷，成功為 0 即 true，失敗 1 即 false，當判斷條件為算數運算時，也常使用這種算數表達式 <code>(( expr ))</code></p></blockquote><ul><li><code>test</code> 為專門用於條件判斷的指令，可以透過下列方式簡寫 <ul><li><code>test expr</code> 基本使用</li><li><code>[ expr ]</code> 基本簡寫</li><li><code>[[ expr ]]</code> 擴展正則匹配簡寫</li></ul></li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token shebang important">#!/bin/bash</span>

<span class="token assign-left variable">filename</span><span class="token operator">=</span><span class="token variable">$1</span>

<span class="token builtin class-name">echo</span> <span class="token string">&quot;查找文件<span class="token variable">$filename</span>&quot;</span>

<span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token parameter variable">-e</span> <span class="token variable">$filename</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
    <span class="token builtin class-name">echo</span> <span class="token string">&quot;文件<span class="token variable">\${filename}</span>存在&quot;</span>
    <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token parameter variable">-d</span> <span class="token variable">$filename</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
        <span class="token builtin class-name">echo</span> <span class="token string">&quot;這是一個文件目錄&quot;</span>
    <span class="token keyword">elif</span> <span class="token punctuation">[</span> <span class="token parameter variable">-b</span> <span class="token variable">$filename</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
        <span class="token builtin class-name">echo</span> <span class="token string">&quot;這是一個塊文件&quot;</span>
    <span class="token keyword">elif</span> <span class="token punctuation">[</span> <span class="token parameter variable">-c</span> <span class="token variable">$filename</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
        <span class="token builtin class-name">echo</span> <span class="token string">&quot;這是一個字符文件&quot;</span>
    <span class="token keyword">else</span>
        <span class="token function">ls</span> <span class="token parameter variable">-l</span> <span class="token variable">$filename</span>
    <span class="token keyword">fi</span>
<span class="token keyword">else</span>
    <span class="token builtin class-name">echo</span> <span class="token string">&quot;文件<span class="token variable">\${filename}</span>不存在&quot;</span>
<span class="token keyword">fi</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><code>case</code><ul><li>使用 glob 模式匹配，不是正則</li><li>模式用括號包裹，括號左邊經常省略，右括號不能省略</li><li>子句必须用 <code>;;</code>,<code>;&amp;</code> 或 <code>;;&amp;</code> 结尾（不可省略） <ul><li><code>;;</code>: 同 break</li><li><code>;&amp;</code>: 繼續執行下個子句，不論是否匹配，同省略 break 狀況</li><li><code>;;&amp;</code>: 繼續往下個匹配，就像沒有匹配過一樣</li></ul></li><li>可以在最後一個子句中使用模式 <code>*</code> 作為 <code>default</code> 分支</li></ul></li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token keyword">case</span> word <span class="token keyword">in</span>
    <span class="token punctuation">[</span> <span class="token punctuation">[</span><span class="token punctuation">(</span><span class="token punctuation">]</span> glob-pattern  <span class="token punctuation">)</span> commands <span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">]</span>…
<span class="token keyword">esac</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>範例</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">cat</span> <span class="token operator">&lt;&lt;</span> <span class="token string">TIP
你最喜歡的程式語言是？
  1) C++
  2) Java
  3) Python
请輸入對應的數字：
TIP</span>

<span class="token builtin class-name">read</span> input_num

<span class="token keyword">case</span> <span class="token variable">$input_num</span> <span class="token keyword">in</span>
  <span class="token number">1</span> <span class="token punctuation">)</span>
    <span class="token assign-left variable">lang</span><span class="token operator">=</span><span class="token string">&quot;C++&quot;</span>
    <span class="token builtin class-name">echo</span> <span class="token string">&quot;C++ 性能優越。&quot;</span>
    <span class="token punctuation">;</span><span class="token punctuation">;</span>
  <span class="token number">2</span> <span class="token punctuation">)</span>
    <span class="token assign-left variable">lang</span><span class="token operator">=</span><span class="token string">&quot;Java&quot;</span>
    <span class="token builtin class-name">echo</span> <span class="token string">&quot;Java 神通廣大。&quot;</span>
    <span class="token punctuation">;</span><span class="token punctuation">;</span>
  <span class="token number">3</span> <span class="token punctuation">)</span>
    <span class="token assign-left variable">lang</span><span class="token operator">=</span><span class="token string">&quot;Python&quot;</span>
    <span class="token builtin class-name">echo</span> <span class="token string">&quot;Python 簡單高效。&quot;</span>
    <span class="token punctuation">;</span><span class="token punctuation">;</span>
  * <span class="token punctuation">)</span>
    <span class="token builtin class-name">echo</span> <span class="token string">&quot;無效輸入&quot;</span>
    <span class="token punctuation">;</span><span class="token punctuation">;</span>
<span class="token keyword">esac</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="循環結構" tabindex="-1"><a class="header-anchor" href="#循環結構" aria-hidden="true">#</a> 循環結構</h2><ul><li><code>while</code>: 當 <code>test-commands</code> 成立，執行 <code>consequent-commands</code></li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token keyword">while</span> test-commands<span class="token punctuation">;</span> <span class="token keyword">do</span>
  consequent-commands<span class="token punctuation">;</span>
<span class="token keyword">done</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><code>until</code>: 執行 <code>consequent-commands</code>，直到 <code>test-commands</code> 成立</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token keyword">until</span> test-commands<span class="token punctuation">;</span> <span class="token keyword">do</span>
  consequent-commands<span class="token punctuation">;</span>
<span class="token keyword">done</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><code>for...in</code></li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token keyword">for</span> variable <span class="token punctuation">[</span>in words<span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">do</span>
  commands<span class="token punctuation">;</span>
<span class="token keyword">done</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>範例</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token keyword">for</span> <span class="token for-or-select variable">item</span> <span class="token keyword">in</span> A B C D<span class="token punctuation">;</span> <span class="token keyword">do</span>
  <span class="token builtin class-name">echo</span> <span class="token variable">$item</span><span class="token punctuation">;</span>
<span class="token keyword">done</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>進階用法</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token assign-left variable">arr</span><span class="token operator">=</span><span class="token punctuation">(</span><span class="token string">&quot;A&quot;</span> <span class="token string">&quot;B&quot;</span> <span class="token string">&quot;C&quot;</span> <span class="token string">&quot;D&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment"># loop through array element</span>
<span class="token keyword">for</span> <span class="token for-or-select variable">item</span> <span class="token keyword">in</span> <span class="token variable">\${arr<span class="token punctuation">[</span>@<span class="token punctuation">]</span>}</span><span class="token punctuation">;</span> <span class="token keyword">do</span>
  <span class="token builtin class-name">echo</span> <span class="token variable">$arr</span><span class="token punctuation">;</span>
<span class="token keyword">done</span>

<span class="token comment"># loop through array indices</span>
<span class="token comment"># ! 表示 loop 對象為 index</span>
<span class="token comment"># 使用 0..len 的方式遞迴不靠譜，因為 bash array 下標不一定連續遞增</span>
<span class="token keyword">for</span> <span class="token for-or-select variable">i</span> <span class="token keyword">in</span> <span class="token variable">\${<span class="token operator">!</span>arr<span class="token punctuation">[</span>@<span class="token punctuation">]</span>}</span><span class="token punctuation">;</span> <span class="token keyword">do</span>
  <span class="token builtin class-name">echo</span> <span class="token string">&quot;arr[<span class="token variable">\${i}</span>]=<span class="token variable">\${arr<span class="token punctuation">[</span>i<span class="token punctuation">]</span>}</span>&quot;</span><span class="token punctuation">;</span>
<span class="token keyword">done</span>

<span class="token comment"># 大括弧展開</span>
<span class="token keyword">for</span> <span class="token for-or-select variable">num</span> <span class="token keyword">in</span> <span class="token punctuation">{</span><span class="token number">1</span><span class="token punctuation">..</span><span class="token number">10</span><span class="token punctuation">}</span><span class="token punctuation">;</span> <span class="token keyword">do</span>
  <span class="token builtin class-name">echo</span> <span class="token variable">$num</span><span class="token punctuation">;</span>
<span class="token keyword">done</span>

<span class="token comment"># 文件名查詢展開</span>
<span class="token keyword">for</span> <span class="token for-or-select variable">js_file</span> <span class="token keyword">in</span> *.js<span class="token punctuation">;</span> <span class="token keyword">do</span>
  <span class="token builtin class-name">echo</span> <span class="token variable">$js_file</span><span class="token punctuation">;</span>
<span class="token keyword">done</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>迴圈使用變數陣列時必需以 <code>{}</code> 包裹，string, number 則不一定需要</p></blockquote><ul><li><code>for(( expr1; expr2; expr3 ))</code></li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token keyword">for</span> <span class="token variable"><span class="token punctuation">((</span> expr1<span class="token punctuation">;</span> expr2<span class="token punctuation">;</span> expr3 <span class="token punctuation">))</span></span><span class="token punctuation">;</span> <span class="token keyword">do</span>
  commands
<span class="token keyword">done</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>範例</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token keyword">for</span> <span class="token variable"><span class="token punctuation">((</span> i <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">1</span> <span class="token operator">+</span> <span class="token number">4</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">))</span></span><span class="token punctuation">;</span> <span class="token keyword">do</span>
  <span class="token builtin class-name">echo</span> <span class="token variable">$i</span><span class="token punctuation">;</span>
<span class="token keyword">done</span>
<span class="token comment"># 1234</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="reference" tabindex="-1"><a class="header-anchor" href="#reference" aria-hidden="true">#</a> Reference</h2>`,31),r={href:"https://juejin.cn/post/7130983293347954718",target:"_blank",rel:"noopener noreferrer"};function u(k,v){const s=e("ExternalLinkIcon");return l(),i("div",null,[d,n("ul",null,[n("li",null,[n("a",r,[o("Shell 腳本編程"),c(s)])])])])}const b=a(t,[["render",u],["__file","04condition.html.vue"]]);export{b as default};
