import{_ as a,r as e,o as l,c as i,d as n,e as o,a as c,f as p}from"./app.33415c31.js";const t={},d=p(`<h1 id="condition-\u6D41\u7A0B\u63A7\u5236" tabindex="-1"><a class="header-anchor" href="#condition-\u6D41\u7A0B\u63A7\u5236" aria-hidden="true">#</a> Condition \u6D41\u7A0B\u63A7\u5236</h1><h2 id="\u9806\u5E8F\u7D50\u69CB" tabindex="-1"><a class="header-anchor" href="#\u9806\u5E8F\u7D50\u69CB" aria-hidden="true">#</a> \u9806\u5E8F\u7D50\u69CB</h2><p>\u9810\u8A2D\u5F9E\u4E0A\u5230\u4E0B\u57F7\u884C\uFF0C\u9664\u975E\u7279\u6B8A\u6307\u4EE4\u4F5C\u7528\uFF0C\u5373\u4F7F\u67D0\u689D\u6307\u4EE4\u7570\u5E38\u4E5F\u6703\u7E7C\u7E8C\u57F7\u884C\uFF0C\u9019\u9EDE\u8207\u5927\u90E8\u5206\u7A0B\u5F0F\u8A9E\u8A00\u932F\u8AA4\u9000\u51FA\u4E0D\u592A\u4E00\u6A23</p><p><code>;</code> \u662F\u7D50\u675F\u6307\u4EE4\u7684\u7B26\u865F\uFF0C\u901A\u5E38\u4EE5\u63DB\u884C\u7701\u7565\u6B64\u7B26\u865F\uFF0C\u7528\u5206\u865F\u53EF\u4EE5\u5728\u4E00\u884C\u5167\u57F7\u884C\u591A\u500B\u6307\u4EE4</p><h2 id="\u689D\u4EF6\u7D50\u69CB" tabindex="-1"><a class="header-anchor" href="#\u689D\u4EF6\u7D50\u69CB" aria-hidden="true">#</a> \u689D\u4EF6\u7D50\u69CB</h2><ul><li><code>&amp;&amp;</code>, <code>||</code> \u7B49\u53EF\u4EE5\u5FEB\u901F\u69CB\u6210\u7C21\u55AE\u7684 if else</li><li><code>if</code>, <code>then</code>, <code>elif</code>, <code>else</code>\uFF0C\u5176\u4E2D <code>if</code>, <code>fi</code> \u70BA\u8D77\u6B62\u6A19\u8A8C\uFF0C\u4E2D\u9593 <code>elif</code>, <code>else</code> \u53EF\u9078</li></ul><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token keyword">if</span> test-commands<span class="token punctuation">;</span> <span class="token keyword">then</span>
    branch-commands<span class="token punctuation">;</span>
<span class="token keyword">elif</span> more-test-commands<span class="token punctuation">;</span> <span class="token keyword">then</span>
    more-brach-commands<span class="token punctuation">;</span>
<span class="token keyword">else</span>
    alternative-commands<span class="token punctuation">;</span>
<span class="token keyword">fi</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>shell \u6C92\u6709\u8868\u9054\u5F0F\u8A9E\u6CD5\uFF0C\u4F7F\u7528\u6307\u4EE4\u57F7\u884C\u7684\u72C0\u614B\u78BC\u9032\u884C\u689D\u4EF6\u5224\u65B7\uFF0C\u6210\u529F\u70BA 0 \u5373 true\uFF0C\u5931\u6557 1 \u5373 false\uFF0C\u7576\u5224\u65B7\u689D\u4EF6\u70BA\u7B97\u6578\u904B\u7B97\u6642\uFF0C\u4E5F\u5E38\u4F7F\u7528\u9019\u7A2E\u7B97\u6578\u8868\u9054\u5F0F <code>(( expr ))</code></p></blockquote><ul><li><code>test</code> \u70BA\u5C08\u9580\u7528\u65BC\u689D\u4EF6\u5224\u65B7\u7684\u6307\u4EE4\uFF0C\u53EF\u4EE5\u900F\u904E\u4E0B\u5217\u65B9\u5F0F\u7C21\u5BEB <ul><li><code>test expr</code> \u57FA\u672C\u4F7F\u7528</li><li><code>[ expr ]</code> \u57FA\u672C\u7C21\u5BEB</li><li><code>[[ expr ]]</code> \u64F4\u5C55\u6B63\u5247\u5339\u914D\u7C21\u5BEB</li></ul></li></ul><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token shebang important">#!/bin/bash</span>

<span class="token assign-left variable">filename</span><span class="token operator">=</span><span class="token variable">$1</span>

<span class="token builtin class-name">echo</span> <span class="token string">&quot;\u67E5\u627E\u6587\u4EF6<span class="token variable">$filename</span>&quot;</span>

<span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token parameter variable">-e</span> <span class="token variable">$filename</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
    <span class="token builtin class-name">echo</span> <span class="token string">&quot;\u6587\u4EF6<span class="token variable">\${filename}</span>\u5B58\u5728&quot;</span>
    <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token parameter variable">-d</span> <span class="token variable">$filename</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
        <span class="token builtin class-name">echo</span> <span class="token string">&quot;\u9019\u662F\u4E00\u500B\u6587\u4EF6\u76EE\u9304&quot;</span>
    <span class="token keyword">elif</span> <span class="token punctuation">[</span> <span class="token parameter variable">-b</span> <span class="token variable">$filename</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
        <span class="token builtin class-name">echo</span> <span class="token string">&quot;\u9019\u662F\u4E00\u500B\u584A\u6587\u4EF6&quot;</span>
    <span class="token keyword">elif</span> <span class="token punctuation">[</span> <span class="token parameter variable">-c</span> <span class="token variable">$filename</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
        <span class="token builtin class-name">echo</span> <span class="token string">&quot;\u9019\u662F\u4E00\u500B\u5B57\u7B26\u6587\u4EF6&quot;</span>
    <span class="token keyword">else</span>
        <span class="token function">ls</span> <span class="token parameter variable">-l</span> <span class="token variable">$filename</span>
    <span class="token keyword">fi</span>
<span class="token keyword">else</span>
    <span class="token builtin class-name">echo</span> <span class="token string">&quot;\u6587\u4EF6<span class="token variable">\${filename}</span>\u4E0D\u5B58\u5728&quot;</span>
<span class="token keyword">fi</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><code>case</code><ul><li>\u4F7F\u7528 glob \u6A21\u5F0F\u5339\u914D\uFF0C\u4E0D\u662F\u6B63\u5247</li><li>\u6A21\u5F0F\u7528\u62EC\u865F\u5305\u88F9\uFF0C\u62EC\u865F\u5DE6\u908A\u7D93\u5E38\u7701\u7565\uFF0C\u53F3\u62EC\u865F\u4E0D\u80FD\u7701\u7565</li><li>\u5B50\u53E5\u5FC5\u987B\u7528 <code>;;</code>,<code>;&amp;</code> \u6216 <code>;;&amp;</code> \u7ED3\u5C3E\uFF08\u4E0D\u53EF\u7701\u7565\uFF09 <ul><li><code>;;</code>: \u540C break</li><li><code>;&amp;</code>: \u7E7C\u7E8C\u57F7\u884C\u4E0B\u500B\u5B50\u53E5\uFF0C\u4E0D\u8AD6\u662F\u5426\u5339\u914D\uFF0C\u540C\u7701\u7565 break \u72C0\u6CC1</li><li><code>;;&amp;</code>: \u7E7C\u7E8C\u5F80\u4E0B\u500B\u5339\u914D\uFF0C\u5C31\u50CF\u6C92\u6709\u5339\u914D\u904E\u4E00\u6A23</li></ul></li><li>\u53EF\u4EE5\u5728\u6700\u5F8C\u4E00\u500B\u5B50\u53E5\u4E2D\u4F7F\u7528\u6A21\u5F0F <code>*</code> \u4F5C\u70BA <code>default</code> \u5206\u652F</li></ul></li></ul><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token keyword">case</span> word <span class="token keyword">in</span>
    <span class="token punctuation">[</span> <span class="token punctuation">[</span><span class="token punctuation">(</span><span class="token punctuation">]</span> glob-pattern  <span class="token punctuation">)</span> commands <span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">]</span>\u2026
<span class="token keyword">esac</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u7BC4\u4F8B</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">cat</span> <span class="token operator">&lt;&lt;</span> <span class="token string">TIP
\u4F60\u6700\u559C\u6B61\u7684\u7A0B\u5F0F\u8A9E\u8A00\u662F\uFF1F
  1) C++
  2) Java
  3) Python
\u8BF7\u8F38\u5165\u5C0D\u61C9\u7684\u6578\u5B57\uFF1A
TIP</span>

<span class="token builtin class-name">read</span> input_num

<span class="token keyword">case</span> <span class="token variable">$input_num</span> <span class="token keyword">in</span>
  <span class="token number">1</span> <span class="token punctuation">)</span>
    <span class="token assign-left variable">lang</span><span class="token operator">=</span><span class="token string">&quot;C++&quot;</span>
    <span class="token builtin class-name">echo</span> <span class="token string">&quot;C++ \u6027\u80FD\u512A\u8D8A\u3002&quot;</span>
    <span class="token punctuation">;</span><span class="token punctuation">;</span>
  <span class="token number">2</span> <span class="token punctuation">)</span>
    <span class="token assign-left variable">lang</span><span class="token operator">=</span><span class="token string">&quot;Java&quot;</span>
    <span class="token builtin class-name">echo</span> <span class="token string">&quot;Java \u795E\u901A\u5EE3\u5927\u3002&quot;</span>
    <span class="token punctuation">;</span><span class="token punctuation">;</span>
  <span class="token number">3</span> <span class="token punctuation">)</span>
    <span class="token assign-left variable">lang</span><span class="token operator">=</span><span class="token string">&quot;Python&quot;</span>
    <span class="token builtin class-name">echo</span> <span class="token string">&quot;Python \u7C21\u55AE\u9AD8\u6548\u3002&quot;</span>
    <span class="token punctuation">;</span><span class="token punctuation">;</span>
  * <span class="token punctuation">)</span>
    <span class="token builtin class-name">echo</span> <span class="token string">&quot;\u7121\u6548\u8F38\u5165&quot;</span>
    <span class="token punctuation">;</span><span class="token punctuation">;</span>
<span class="token keyword">esac</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="\u5FAA\u74B0\u7D50\u69CB" tabindex="-1"><a class="header-anchor" href="#\u5FAA\u74B0\u7D50\u69CB" aria-hidden="true">#</a> \u5FAA\u74B0\u7D50\u69CB</h2><ul><li><code>while</code>: \u7576 <code>test-commands</code> \u6210\u7ACB\uFF0C\u57F7\u884C <code>consequent-commands</code></li></ul><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token keyword">while</span> test-commands<span class="token punctuation">;</span> <span class="token keyword">do</span>
  consequent-commands<span class="token punctuation">;</span>
<span class="token keyword">done</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><code>until</code>: \u57F7\u884C <code>consequent-commands</code>\uFF0C\u76F4\u5230 <code>test-commands</code> \u6210\u7ACB</li></ul><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token keyword">until</span> test-commands<span class="token punctuation">;</span> <span class="token keyword">do</span>
  consequent-commands<span class="token punctuation">;</span>
<span class="token keyword">done</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><code>for...in</code></li></ul><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token keyword">for</span> variable <span class="token punctuation">[</span>in words<span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">do</span>
  commands<span class="token punctuation">;</span>
<span class="token keyword">done</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u7BC4\u4F8B</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token keyword">for</span> <span class="token for-or-select variable">item</span> <span class="token keyword">in</span> A B C D<span class="token punctuation">;</span> <span class="token keyword">do</span>
  <span class="token builtin class-name">echo</span> <span class="token variable">$item</span><span class="token punctuation">;</span>
<span class="token keyword">done</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u9032\u968E\u7528\u6CD5</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token assign-left variable">arr</span><span class="token operator">=</span><span class="token punctuation">(</span><span class="token string">&quot;A&quot;</span> <span class="token string">&quot;B&quot;</span> <span class="token string">&quot;C&quot;</span> <span class="token string">&quot;D&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment"># loop through array element</span>
<span class="token keyword">for</span> <span class="token for-or-select variable">item</span> <span class="token keyword">in</span> <span class="token variable">\${arr<span class="token punctuation">[</span>@<span class="token punctuation">]</span>}</span><span class="token punctuation">;</span> <span class="token keyword">do</span>
  <span class="token builtin class-name">echo</span> <span class="token variable">$arr</span><span class="token punctuation">;</span>
<span class="token keyword">done</span>

<span class="token comment"># loop through array indices</span>
<span class="token comment"># ! \u8868\u793A loop \u5C0D\u8C61\u70BA index</span>
<span class="token comment"># \u4F7F\u7528 0..len \u7684\u65B9\u5F0F\u905E\u8FF4\u4E0D\u9760\u8B5C\uFF0C\u56E0\u70BA bash array \u4E0B\u6A19\u4E0D\u4E00\u5B9A\u9023\u7E8C\u905E\u589E</span>
<span class="token keyword">for</span> <span class="token for-or-select variable">i</span> <span class="token keyword">in</span> <span class="token variable">\${<span class="token operator">!</span>arr<span class="token punctuation">[</span>@<span class="token punctuation">]</span>}</span><span class="token punctuation">;</span> <span class="token keyword">do</span>
  <span class="token builtin class-name">echo</span> <span class="token string">&quot;arr[<span class="token variable">\${i}</span>]=<span class="token variable">\${arr<span class="token punctuation">[</span>i<span class="token punctuation">]</span>}</span>&quot;</span><span class="token punctuation">;</span>
<span class="token keyword">done</span>

<span class="token comment"># \u5927\u62EC\u5F27\u5C55\u958B</span>
<span class="token keyword">for</span> <span class="token for-or-select variable">num</span> <span class="token keyword">in</span> <span class="token punctuation">{</span><span class="token number">1</span><span class="token punctuation">..</span><span class="token number">10</span><span class="token punctuation">}</span><span class="token punctuation">;</span> <span class="token keyword">do</span>
  <span class="token builtin class-name">echo</span> <span class="token variable">$num</span><span class="token punctuation">;</span>
<span class="token keyword">done</span>

<span class="token comment"># \u6587\u4EF6\u540D\u67E5\u8A62\u5C55\u958B</span>
<span class="token keyword">for</span> <span class="token for-or-select variable">js_file</span> <span class="token keyword">in</span> *.js<span class="token punctuation">;</span> <span class="token keyword">do</span>
  <span class="token builtin class-name">echo</span> <span class="token variable">$js_file</span><span class="token punctuation">;</span>
<span class="token keyword">done</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>\u8FF4\u5708\u4F7F\u7528\u8B8A\u6578\u9663\u5217\u6642\u5FC5\u9700\u4EE5 <code>{}</code> \u5305\u88F9\uFF0Cstring, number \u5247\u4E0D\u4E00\u5B9A\u9700\u8981</p></blockquote><ul><li><code>for(( expr1; expr2; expr3 ))</code></li></ul><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token keyword">for</span> <span class="token variable"><span class="token punctuation">((</span> expr1<span class="token punctuation">;</span> expr2<span class="token punctuation">;</span> expr3 <span class="token punctuation">))</span></span><span class="token punctuation">;</span> <span class="token keyword">do</span>
  commands
<span class="token keyword">done</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u7BC4\u4F8B</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token keyword">for</span> <span class="token variable"><span class="token punctuation">((</span> i <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">1</span> <span class="token operator">+</span> <span class="token number">4</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">))</span></span><span class="token punctuation">;</span> <span class="token keyword">do</span>
  <span class="token builtin class-name">echo</span> <span class="token variable">$i</span><span class="token punctuation">;</span>
<span class="token keyword">done</span>
<span class="token comment"># 1234</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="reference" tabindex="-1"><a class="header-anchor" href="#reference" aria-hidden="true">#</a> Reference</h2>`,31),r={href:"https://juejin.cn/post/7130983293347954718",target:"_blank",rel:"noopener noreferrer"};function u(k,v){const s=e("ExternalLinkIcon");return l(),i("div",null,[d,n("ul",null,[n("li",null,[n("a",r,[o("Shell \u8173\u672C\u7DE8\u7A0B"),c(s)])])])])}const b=a(t,[["render",u],["__file","04condition.html.vue"]]);export{b as default};