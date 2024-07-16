import{_ as o,r as p,o as i,c as l,a,d as s,e as n,f as t}from"./app-9c5c90e3.js";const u={},r=s("h1",{id:"singleton-pattern",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#singleton-pattern","aria-hidden":"true"},"#"),n(" Singleton Pattern")],-1),d=t(`<h2 id="前言" tabindex="-1"><a class="header-anchor" href="#前言" aria-hidden="true">#</a> 前言</h2><p>大家好，我是 Johnny，今天要紀錄分享的是 Patterns 筆記系列的 <code>Singleton Pattern</code></p><h2 id="介紹" tabindex="-1"><a class="header-anchor" href="#介紹" aria-hidden="true">#</a> 介紹</h2><p>Singletons 是一個可以初始化一次，通用於全局的類別。因其實例可以在整個程式中使用，故常常用於保存全局狀態。</p><blockquote><p>從程式開始生命週期所創造的這一個實例，理論上到應用程式結束生命週期都只存在這一個</p></blockquote><h2 id="違反-singleton-的-counter" tabindex="-1"><a class="header-anchor" href="#違反-singleton-的-counter" aria-hidden="true">#</a> 違反 Singleton 的 Counter</h2><p>一個 singleton 類別只可以被初始化一次，兩個 counter 實例並不相同</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">Counter</span> <span class="token punctuation">{</span>
  <span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> counter1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Counter</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> counter2 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Counter</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>counter1<span class="token punctuation">.</span><span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">===</span> counter2<span class="token punctuation">.</span><span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// false</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="pure-javascript-實現-singleton" tabindex="-1"><a class="header-anchor" href="#pure-javascript-實現-singleton" aria-hidden="true">#</a> Pure Javascript 實現 Singleton</h2><p>為了保證實例是唯一的，我們可以把初始化的實例對象和狀態保存在外部變數中，並透過 <code>Object.freeze</code> 鎖定我們實例的屬性避免被外部意外覆寫</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">let</span> instance<span class="token punctuation">;</span>
<span class="token keyword">let</span> counter <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>

<span class="token keyword">class</span> <span class="token class-name">Counter</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>instance<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span><span class="token string">&#39;You can only create one instance!&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    instance <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token function">getCount</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> counter<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token function">increment</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token operator">++</span>counter<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token function">decrement</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token operator">--</span>counter<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> singletonCounter <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">freeze</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Counter</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> singletonCounter<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,11),k={href:"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Private_class_fields",target:"_blank",rel:"noopener noreferrer"},v=t(`<p>改寫後如下</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">Counter</span> <span class="token punctuation">{</span>
  <span class="token keyword">static</span> #instance<span class="token punctuation">;</span> <span class="token comment">// static 是靜態屬性，掛載於類別本身而不是實例，這裡為靜態隱私屬性</span>
  #counter <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>

  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>Counter<span class="token punctuation">.</span>#instance<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span><span class="token string">&#39;You can only create one instance!&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    Counter<span class="token punctuation">.</span>#instance <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token function">getCount</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>#counter<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token function">increment</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token operator">++</span><span class="token keyword">this</span><span class="token punctuation">.</span>#counter<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token function">decrement</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token operator">--</span><span class="token keyword">this</span><span class="token punctuation">.</span>#counter<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> Counter<span class="token punctuation">.</span>#instance<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> singletonCounter <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">freeze</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Counter</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> singletonCounter<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>到此我們完成了一個 overkill 的搞笑 Counter...為何這麼說呢？我們繼續看下去</p><h2 id="評價-singleton" tabindex="-1"><a class="header-anchor" href="#評價-singleton" aria-hidden="true">#</a> 評價 Singleton</h2><p>透過限制類別的初始化次數在 1 次，可以減少整體應用程式的記憶體使用量，然而 <code>Singleton</code> 可以被視為一種反模式，並且完全不必要在 Javascript 中使用。比起其他像是 C++, Java 等，必須先建立一個類別，再透過類別去建立對應的物件，我們在 Javascript 中我們完全可以直接建立一個物件使用。</p><h2 id="javascript-中的物件" tabindex="-1"><a class="header-anchor" href="#javascript-中的物件" aria-hidden="true">#</a> Javascript 中的物件</h2><p>上面的例子在 Javascript 中完全過度複雜化了，畢竟透過 Javascript 可以非常快速地直接建立一個唯一的物件</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> singletonCounter <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">freeze</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> counter <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>

  <span class="token keyword">const</span> instance <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token function">getCount</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> counter<span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token function">increment</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token operator">++</span>counter<span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token function">decrement</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token operator">--</span>counter<span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>

  <span class="token keyword">return</span> <span class="token punctuation">{</span>
    <span class="token keyword">get</span> <span class="token function">instance</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> instance<span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> singletonCounter<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面範例我們透過 IIFE 建立一個隔離外部環境的作用域，省略了多餘的手動初始化步驟，並將相關狀態保存於其中，而實例本身就直接被回傳出來，在 IIFE 執行完畢的同時，唯一的實例就已經被創建</p><p>換成這種寫法除了更直覺容易使用之外，也能夠更高度的客制化內部邏輯，畢竟 IIFE 內部就是單純的函數環境，而 class 類別則需要仰賴相關 feature 的支援度，相比之下 IIFE 在 Singleton 模式下的實現相容度、靈活度都大大提升</p><h2 id="lazy-singleton" tabindex="-1"><a class="header-anchor" href="#lazy-singleton" aria-hidden="true">#</a> Lazy Singleton</h2><p>把上面範例改成懶加載，當沒有用到這個模組時節省記憶體用量</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> singletonCounter <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">freeze</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> counter <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
  <span class="token keyword">let</span> instance<span class="token punctuation">;</span>

  <span class="token keyword">const</span> <span class="token function-variable function">initialize</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    instance <span class="token operator">=</span> <span class="token punctuation">{</span>
      <span class="token function">getCount</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> counter<span class="token punctuation">;</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token function">increment</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token operator">++</span>counter<span class="token punctuation">;</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token function">decrement</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token operator">--</span>counter<span class="token punctuation">;</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>

  <span class="token keyword">return</span> <span class="token punctuation">{</span>
    <span class="token keyword">get</span> <span class="token function">instance</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>instance<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">initialize</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
      <span class="token keyword">return</span> instance<span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,13),m=t('<h2 id="結論" tabindex="-1"><a class="header-anchor" href="#結論" aria-hidden="true">#</a> 結論</h2><p>總結 Singleton Patterns 具有以下優點</p><ul><li>節省記憶體空間的使用</li><li>避免重複初始化、釋放物件，提高效能</li><li>物件的唯一性，保證程式狀態的一致性</li></ul><p>缺點如下</p><ul><li>較難進行測試，狀態無法隔離</li><li>隱藏的狀態相依關係</li></ul><p>綜合評斷來看，Singleton Pattern 適合用在狀態不可重複、條件變動較少的情境（測試情境不會出現太多情境，否則會較難測試），比如環境變數初始化、登入身份驗證（只有登入、登出兩種狀態）等等</p><p>感謝收看，下一篇見拉～</p>',7);function b(h,g){const e=p("SocialBlock"),c=p("ExternalLinkIcon");return i(),l("div",null,[r,a(e,{hashtags:"design,pattern,singleton"}),d,s("p",null,[n("但這麼寫也有缺點，我們必須把所有狀態移出類別定義，造成外部狀態的污染，為了避免這個狀況我們可以透過使用 "),s("a",k,[n("Private class features"),a(c)]),n("，把類別相關的狀態直接寫在類別中，並且對外部訪問進行阻絕，這個功能是目前原生 javascript 所支援的特性")]),v,a(e,{hashtags:"design,pattern,singleton"}),m])}const y=o(u,[["render",b],["__file","singleton.html.vue"]]);export{y as default};
