import{_ as p,r as o,o as e,c,a as s,d as a,e as i,f as t}from"./app-da643460.js";const l={},u=a("h1",{id:"mixin-pattern",tabindex:"-1"},[a("a",{class:"header-anchor",href:"#mixin-pattern","aria-hidden":"true"},"#"),i(" Mixin Pattern")],-1),k=t(`<h2 id="前言" tabindex="-1"><a class="header-anchor" href="#前言" aria-hidden="true">#</a> 前言</h2><p>大家好，我是 Johnny，今天要紀錄分享的是 Patterns 筆記系列的 <code>Mixin Pattern</code></p><h2 id="介紹" tabindex="-1"><a class="header-anchor" href="#介紹" aria-hidden="true">#</a> 介紹</h2><p>Mixin 模式是一種讓我們不透過「繼承」，在另一個類別或對象上添加屬性、方法的開發方式，而 mixin 本身無法直接使用，假設我們有個 <code>Dog</code> 類別定義如下</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">Dog</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter">name</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我們希望此類別不只是只有一個 name 屬性，一種方法是直接添加在目標上，但這邊我們透過建立一個如下 mixin 對象</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> dogFunctionality <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token function-variable function">bark</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&quot;Woof!&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token function-variable function">wagTail</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&quot;Wagging my tail!&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token function-variable function">play</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&quot;Playing!&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>透過 <code>Object.assign</code> 方法，我們可以手動將 dogFunctionality mixin 上的屬性方法添加到 <code>Dog</code> 類別的 prototype 上</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">Dog</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter">name</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> dogFunctionality <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token function-variable function">bark</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&quot;Woof!&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token function-variable function">wagTail</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&quot;Wagging my tail!&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token function-variable function">play</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&quot;Playing!&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token comment">// 把 dogFunctionality 上的方法添加到 Dog prototype</span>
Object<span class="token punctuation">.</span><span class="token function">assign</span><span class="token punctuation">(</span><span class="token class-name">Dog</span><span class="token punctuation">.</span>prototype<span class="token punctuation">,</span> dogFunctionality<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接著我們就可以在 Dog 實例上，快樂的調用 mixin 中添加的功能摟</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> pet1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Dog</span><span class="token punctuation">(</span><span class="token string">&quot;Daisy&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

pet1<span class="token punctuation">.</span>name<span class="token punctuation">;</span> <span class="token comment">// Daisy</span>
pet1<span class="token punctuation">.</span><span class="token function">bark</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// Woof!</span>
pet1<span class="token punctuation">.</span><span class="token function">play</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// Playing!</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="mixin-繼承" tabindex="-1"><a class="header-anchor" href="#mixin-繼承" aria-hidden="true">#</a> mixin 繼承</h3><p>雖然 mixin 不是透過繼承添加功能，但 mixin 對象本身可以繼承功能自另一個 mixin！～注意下面有兩種方法，擇一就好</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> animalFunctionality <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token function-variable function">walk</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&quot;Walking!&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token function-variable function">sleep</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&quot;Sleeping!&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> dogFunctionality <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token function-variable function">bark</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&quot;Woof!&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token function-variable function">wagTail</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&quot;Wagging my tail!&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token function-variable function">play</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&quot;Playing!&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token function">walk</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">super</span><span class="token punctuation">.</span><span class="token function">walk</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token function">sleep</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">super</span><span class="token punctuation">.</span><span class="token function">sleep</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token comment">// 1. add to __proto__</span>
  <span class="token literal-property property">__proto__</span><span class="token operator">:</span> animalFunctionality<span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token comment">// 2. add animalFunctionality to dogFunctionality</span>
Object<span class="token punctuation">.</span><span class="token function">assign</span><span class="token punctuation">(</span>dogFunctionality<span class="token punctuation">,</span> animalFunctionality<span class="token punctuation">)</span><span class="token punctuation">;</span>
Object<span class="token punctuation">.</span><span class="token function">assign</span><span class="token punctuation">(</span><span class="token class-name">Dog</span><span class="token punctuation">.</span>prototype<span class="token punctuation">,</span> dogFunctionality<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我們添加一個 <code>animalFunctionality</code> mixin，並讓 <code>dogFunctionality</code> 去繼承它，接著我們就可以在 <code>Dog</code> 實例上調用摟！～</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> pet1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Dog</span><span class="token punctuation">(</span><span class="token string">&quot;Daisy&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>pet1<span class="token punctuation">.</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span>
pet1<span class="token punctuation">.</span><span class="token function">bark</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
pet1<span class="token punctuation">.</span><span class="token function">play</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
pet1<span class="token punctuation">.</span><span class="token function">walk</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
pet1<span class="token punctuation">.</span><span class="token function">sleep</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,16),r=t('<h2 id="結論" tabindex="-1"><a class="header-anchor" href="#結論" aria-hidden="true">#</a> 結論</h2><h3 id="優點" tabindex="-1"><a class="header-anchor" href="#優點" aria-hidden="true">#</a> 優點</h3><p>添加功能非常方便，以非破壞性、無結構層級關係的方式添加</p><h3 id="缺點" tabindex="-1"><a class="header-anchor" href="#缺點" aria-hidden="true">#</a> 缺點</h3><ul><li>隱式依賴：因為 mixin 是在「其他某處」把功能加上，很容易導致依賴不容易被發覺與查找，導致後續維護上的麻煩</li><li>名稱衝突：因為 mixin 在添加功能時不會明確比對功能名稱，也容易導致各 mixin 間的功能因為衝突而導致預期外的錯誤發生</li><li>依賴複雜度：因為 mixin 太容易添加功能，也容易導致過度添加依賴而快速增大程式的複雜度</li></ul><p>雖然 mixin 看似很方便，但其實其中暗藏許多陷阱，以至於許多知名框架都棄用了這種開發模式，今天就分享到這拉，下一篇見～～</p>',6);function d(v,m){const n=o("SocialBlock");return e(),c("div",null,[u,s(n,{hashtags:"design,pattern,mixin"}),k,s(n,{hashtags:"design,pattern,mixin"}),r])}const b=p(l,[["render",d],["__file","mixin.html.vue"]]);export{b as default};