import{_ as p,r as e,o as c,c as l,a,d as n,e as s,f as i}from"./app-da643460.js";const u={},r=n("h1",{id:"hooks-pattern",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#hooks-pattern","aria-hidden":"true"},"#"),s(" Hooks Pattern")],-1),k=i(`<h2 id="前言" tabindex="-1"><a class="header-anchor" href="#前言" aria-hidden="true">#</a> 前言</h2><p>大家好，我是 Johnny，今天要紀錄分享的是 Patterns 筆記系列的 <code>Hooks Pattern</code></p><h2 id="介紹" tabindex="-1"><a class="header-anchor" href="#介紹" aria-hidden="true">#</a> 介紹</h2><p>Hooks 作為一個程式設計的模式已經一段時間，但一直以來並沒有受到前端非常大的重視，經由 React 在 v16.8 後引入使用取代傳統的 class component 後逐漸受到重視，許多傳統的設計模式都可以用 Hooks 模式取代</p><p>以下以 React class component, functional component 為例說明為何使用 Hooks 帶來許多好處</p><p>雖然我們能以 functional component 定義組件，但如果需要添加一個狀態切換，我們就必須轉回使用 class 的寫法</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">Button</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token operator">&lt;</span>div className<span class="token operator">=</span><span class="token string">&quot;btn&quot;</span><span class="token operator">&gt;</span>disabled<span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">&gt;</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">class</span> <span class="token class-name">Button</span> <span class="token keyword">extends</span> <span class="token class-name">React<span class="token punctuation">.</span>Component</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">super</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token literal-property property">enabled</span><span class="token operator">:</span> <span class="token boolean">false</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> <span class="token punctuation">{</span> enabled <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>state<span class="token punctuation">;</span>
    <span class="token keyword">const</span> btnText <span class="token operator">=</span> enabled <span class="token operator">?</span> <span class="token string">&quot;enabled&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;disabled&quot;</span><span class="token punctuation">;</span>

    <span class="token keyword">return</span> <span class="token punctuation">(</span>
      <span class="token operator">&lt;</span>div
        className<span class="token operator">=</span><span class="token punctuation">{</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">btn enabled-</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>enabled<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">}</span>
        onClick<span class="token operator">=</span><span class="token punctuation">{</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">setState</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token literal-property property">enabled</span><span class="token operator">:</span> <span class="token operator">!</span>enabled <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">}</span>
      <span class="token operator">&gt;</span>
        <span class="token punctuation">{</span>btnText<span class="token punctuation">}</span>
      <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">&gt;</span>
    <span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>這樣實在很困擾，另外 class 組件在使用上不利於推廣學習，開發者必須首先熟悉 class 相關的語法才能良好的使用，但即使良好使用 class 組件，當組件邏輯變得複雜時，邏輯與狀態之間往往會交錯重疊，導致增加後續閱讀、修改的難度（Vue options 寫法也是類似這樣）</p><h2 id="hooks" tabindex="-1"><a class="header-anchor" href="#hooks" aria-hidden="true">#</a> Hooks</h2><p>Hooks Pattern 提供一個勾子，幫助我們把狀態與組件之間綁定起來，讓 functional 組件可以擺脫無狀態的限制，從而大大增強 functional 組件的使用能力</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">Input</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> <span class="token punctuation">[</span>input<span class="token punctuation">,</span> setInput<span class="token punctuation">]</span> <span class="token operator">=</span> React<span class="token punctuation">.</span><span class="token function">useState</span><span class="token punctuation">(</span><span class="token string">&quot;&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token keyword">return</span> <span class="token operator">&lt;</span>input onChange<span class="token operator">=</span><span class="token punctuation">{</span><span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token function">setInput</span><span class="token punctuation">(</span>e<span class="token punctuation">.</span>target<span class="token punctuation">.</span>value<span class="token punctuation">)</span><span class="token punctuation">}</span> value<span class="token operator">=</span><span class="token punctuation">{</span>input<span class="token punctuation">}</span> <span class="token operator">/</span><span class="token operator">&gt;</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>透過 hooks 我們可以把組件的一些邏輯抽離變成 Custom hooks，在閱讀、維護上都大大強化了，參考如下圖片 <img src="https://res.cloudinary.com/ddxwdqwkr/image/upload/v1641930050/patterns.dev/classicalvshooks2.001.png" alt=""></p><h3 id="其他-hooks" tabindex="-1"><a class="header-anchor" href="#其他-hooks" aria-hidden="true">#</a> 其他 Hooks</h3>`,14),d={href:"https://webpack.js.org/api/compiler-hooks/",target:"_blank",rel:"noopener noreferrer"},v=n("h2",{id:"結論",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#結論","aria-hidden":"true"},"#"),s(" 結論")],-1),h=n("p",null,"整體而言，透過 Hooks Pattern 開發的軟體工具，讓我們在開發的同時，具備完整操控整個應用程式工具流程的能力",-1),m=n("p",null,"React 的 hooks 讓我們在 functional 組件中保存狀態，簡化了傳統 class 組件開發的學習、編寫痛點，並且把邏輯重用的概念發揮到了極致，相關邏輯塊也可以整合在同一個單一 hook 當中提升了可讀性",-1),b=n("p",null,"Webpack 的 Plugin hooks 讓我們具備在 webpack compiler、parser 等等模組中加入額外的邏輯，也是一種把邏輯抽出到單一 hook 中處理的概念，對於整個工具的可擴充性、可維護性也大大的提升",-1),g=n("p",null,"今天學習就到這邊拉，感謝收看，下篇見！",-1);function _(f,y){const t=e("SocialBlock"),o=e("ExternalLinkIcon");return c(),l("div",null,[r,a(t,{hashtags:"design,pattern,hooks"}),k,n("p",null,[s("另外除了 React 之外，hooks 的概念也常用於開發一些底層工具，例如像 Webpack 就提供了多組 plugin 使用的 hooks 讓開發者可以使用與 Webpack 底層同一套的 plugin 生命流程機制去開發客製化的 plugin，可以說 hooks 的應用非常的廣泛，詳情可參考 "),n("a",d,[s("Webpack Plugin - Compiler Hooks"),a(o)])]),a(t,{hashtags:"design,pattern,hooks"}),v,h,m,b,g])}const x=p(u,[["render",_],["__file","hooks.html.vue"]]);export{x as default};