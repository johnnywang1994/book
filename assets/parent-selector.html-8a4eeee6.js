import{_ as o,r as c,o as l,c as i,a,d as n,e as s,f as t}from"./app-d4cd373e.js";const u={},r=n("h1",{id:"scss-parent-selector",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#scss-parent-selector","aria-hidden":"true"},"#"),s(" SCSS Parent Selector")],-1),d=n("h6",{id:"tag-css-scss-parent-selector-at-root",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#tag-css-scss-parent-selector-at-root","aria-hidden":"true"},"#"),s(" tag "),n("code",null,"css"),s(", "),n("code",null,"scss"),s(", "),n("code",null,"parent-selector"),s(", "),n("code",null,"@at-root")],-1),k=t(`<p>前端工程師對以下需求一定很熟悉：</p><p>當添加 <code>bold</code> class 給 <code>parent</code> 時，該如何添加 styles 給 <code>Hello World</code></p><div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code><span class="token comment">&lt;!-- normal --&gt;</span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>parent<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>child<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>span</span><span class="token punctuation">&gt;</span></span>Hello World<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>span</span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>

<span class="token comment">&lt;!-- bold --&gt;</span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>parent bold<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>child<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>span</span><span class="token punctuation">&gt;</span></span>Hello World<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>span</span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="作法" tabindex="-1"><a class="header-anchor" href="#作法" aria-hidden="true">#</a> 作法</h2><h3 id="添加獨立的-css" tabindex="-1"><a class="header-anchor" href="#添加獨立的-css" aria-hidden="true">#</a> 添加獨立的 css</h3><div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code><span class="token selector">.parent .child span</span> <span class="token punctuation">{</span>
  <span class="token property">font-size</span><span class="token punctuation">:</span> 16px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">/* 分開寫 */</span>
<span class="token selector">.parent.bold .child span</span> <span class="token punctuation">{</span>
  <span class="token property">font-weight</span><span class="token punctuation">:</span> bold<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>這個做法雖然可以，但長遠來看，我們必須將相同對象的 style 分開寫，並不利於長期維護</p><h3 id="使用-scss-封裝" tabindex="-1"><a class="header-anchor" href="#使用-scss-封裝" aria-hidden="true">#</a> 使用 scss 封裝</h3><div class="language-scss line-numbers-mode" data-ext="scss"><pre class="language-scss"><code><span class="token selector">.parent </span><span class="token punctuation">{</span>
  <span class="token selector">.child span </span><span class="token punctuation">{</span>
    <span class="token property">font-size</span><span class="token punctuation">:</span> 16px<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token comment">/* 雖然較好，但還是分開寫 */</span>
  <span class="token selector"><span class="token parent important">&amp;</span>.bold .child span </span><span class="token punctuation">{</span>
    <span class="token property">font-weight</span><span class="token punctuation">:</span> bold<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此方法雖然看起來封裝了，也比前一個利於維護，但對於目標 <code>span</code> 而言還是分開寫的</p><h3 id="使用-scss-at-root-規則" tabindex="-1"><a class="header-anchor" href="#使用-scss-at-root-規則" aria-hidden="true">#</a> 使用 scss @at-root 規則</h3>`,11),v=n("code",null,"@at-root",-1),m={href:"https://sass-lang.com/documentation/at-rules/at-root",target:"_blank",rel:"noopener noreferrer"},b=t(`<div class="language-scss line-numbers-mode" data-ext="scss"><pre class="language-scss"><code><span class="token selector">.parent </span><span class="token punctuation">{</span>
  <span class="token selector">.child </span><span class="token punctuation">{</span>
    <span class="token comment">// 1. 後方不接 selector，開放 root</span>
    <span class="token atrule"><span class="token rule">@at-root</span></span> <span class="token punctuation">{</span>
      <span class="token selector">span </span><span class="token punctuation">{</span>
        <span class="token property">font-size</span><span class="token punctuation">:</span> 16px<span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// 2. 後方接 selector</span>
    <span class="token atrule"><span class="token rule">@at-root</span> span</span> <span class="token punctuation">{</span>
      <span class="token property">font-size</span><span class="token punctuation">:</span> 16px<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// compile to</span>
<span class="token selector">span </span><span class="token punctuation">{</span>
  <span class="token property">font-size</span><span class="token punctuation">:</span> 16px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>但這種方式如果要做上面的需求，我們必須 hardcore，雖然做到了想要的效果（放在一起），但每次都必須手動把整個 path 寫一遍是一件危險的事情。</p><div class="language-scss line-numbers-mode" data-ext="scss"><pre class="language-scss"><code><span class="token selector">.parent </span><span class="token punctuation">{</span>
  <span class="token selector">.child </span><span class="token punctuation">{</span>
    <span class="token selector">span </span><span class="token punctuation">{</span>
      <span class="token property">font-size</span><span class="token punctuation">:</span> 16px<span class="token punctuation">;</span>
      <span class="token comment">// 一起寫，但使用不方便</span>
      <span class="token atrule"><span class="token rule">@at-root</span> .parent.bold .child span</span> <span class="token punctuation">{</span>
        <span class="token property">font-weight</span><span class="token punctuation">:</span> bold<span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="mixin-解法" tabindex="-1"><a class="header-anchor" href="#mixin-解法" aria-hidden="true">#</a> mixin 解法</h3>`,4),h={href:"https://sass-lang.com/documentation/style-rules/parent-selector",target:"_blank",rel:"noopener noreferrer"},g=t(`<div class="language-scss line-numbers-mode" data-ext="scss"><pre class="language-scss"><code><span class="token keyword">@mixin</span> <span class="token function">attach-root</span><span class="token punctuation">(</span><span class="token variable">$new-class</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token property"><span class="token variable">$current-selector</span></span><span class="token punctuation">:</span> &amp;<span class="token punctuation">;</span> <span class="token comment">// array</span>
  <span class="token property"><span class="token variable">$new-selector</span></span><span class="token punctuation">:</span> []<span class="token punctuation">;</span> <span class="token comment">// new array</span>

  <span class="token keyword">@each</span> <span class="token selector"><span class="token variable">$item</span> in <span class="token variable">$current-selector</span> </span><span class="token punctuation">{</span>
    <span class="token property"><span class="token variable">$first-node</span></span><span class="token punctuation">:</span> <span class="token function">nth</span><span class="token punctuation">(</span><span class="token variable">$item</span><span class="token punctuation">,</span> 1<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token property"><span class="token variable">$appended-node</span></span><span class="token punctuation">:</span> <span class="token variable">$first-node</span> <span class="token operator">+</span> <span class="token variable">$new-class</span><span class="token punctuation">;</span>
    <span class="token property"><span class="token variable">$new-item</span></span><span class="token punctuation">:</span> <span class="token function">set-nth</span><span class="token punctuation">(</span><span class="token variable">$item</span><span class="token punctuation">,</span> 1<span class="token punctuation">,</span> <span class="token variable">$appended-node</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// replace target node</span>
    <span class="token property"><span class="token variable">$new-selector</span></span><span class="token punctuation">:</span> <span class="token function">append</span><span class="token punctuation">(</span><span class="token variable">$new-item</span><span class="token punctuation">,</span> <span class="token variable">$new-selector</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token atrule"><span class="token rule">@at-root</span> <span class="token variable">#{$new-selector}</span></span> <span class="token punctuation">{</span>
    <span class="token keyword">@content</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面主要是將 parent selector <code>&amp;</code>儲存為變數，並替換第一個 node selector，加上指定 class 後再重新組回去，最後再用 <code>@at-root</code> 重新放回原位置。</p><p>使用如下：</p><div class="language-scss line-numbers-mode" data-ext="scss"><pre class="language-scss"><code><span class="token selector">.parent </span><span class="token punctuation">{</span>
  <span class="token selector">.child </span><span class="token punctuation">{</span>
    <span class="token selector">span </span><span class="token punctuation">{</span>
      <span class="token property">font-size</span><span class="token punctuation">:</span> 16px<span class="token punctuation">;</span>
      <span class="token comment">// 一起寫，好用</span>
      <span class="token keyword">@include</span> <span class="token function">attach-root</span><span class="token punctuation">(</span><span class="token string">&#39;.bold&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token property">font-weight</span><span class="token punctuation">:</span> bold<span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// compile to</span>
<span class="token selector">.parent .child span </span><span class="token punctuation">{</span>
  <span class="token property">font-size</span><span class="token punctuation">:</span> 16px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.parent.bold .child span </span><span class="token punctuation">{</span>
  <span class="token property">font-weight</span><span class="token punctuation">:</span> bold<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="conclusion" tabindex="-1"><a class="header-anchor" href="#conclusion" aria-hidden="true">#</a> Conclusion</h2><p>本篇主要講到兩個 scss 蠻特別的規則 <code>@at-root</code>, <code>parent-selector</code>，這兩個東西雖然看似不知道可以幹嘛，但實際上非常有用～，上面的 mixin 只要稍作修改就能夠變成更萬能的工具摟～（這部分留給讀者自行嘗試拉～）</p><p>以上感謝大家觀看，下次見</p>`,7),f={id:"文章參考自-add-class-to-the-most-outer-selector-using-sass-mixin",tabindex:"-1"},_=n("a",{class:"header-anchor",href:"#文章參考自-add-class-to-the-most-outer-selector-using-sass-mixin","aria-hidden":"true"},"#",-1),x={href:"https://pantaley.com/blog/Add-class-to-the-most-outer-selector-using-Sass-mixin/",target:"_blank",rel:"noopener noreferrer"};function y(w,$){const p=c("SocialBlock"),e=c("ExternalLinkIcon");return l(),i("div",null,[r,d,a(p,{hashtags:"css,scss"}),k,n("p",null,[s("scss 的 "),v,s(" 規則會將當前指標指向 root 環境，詳細使用方式可見"),n("a",m,[s("scss @at-root"),a(e)]),s("，如以下範例：")]),b,n("p",null,[s("我們使用 scss 的 "),n("a",h,[s("Parent Selector"),a(e)]),s(" 來幫助我們上面 hardcore 的部分")]),g,n("h5",f,[_,s(" 文章參考自："),n("a",x,[s("Add class to the most outer selector using Sass mixin"),a(e)])]),a(p,{hashtags:"css,scss"})])}const S=o(u,[["render",y],["__file","parent-selector.html.vue"]]);export{S as default};
