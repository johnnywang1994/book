import{_ as c,r as p,o as i,c as l,a as s,d as n,e as a,f as e}from"./app-da643460.js";const u={},r=n("h1",{id:"observer-pattern",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#observer-pattern","aria-hidden":"true"},"#"),a(" Observer Pattern")],-1),k=e(`<h2 id="前言" tabindex="-1"><a class="header-anchor" href="#前言" aria-hidden="true">#</a> 前言</h2><p>大家好，我是 Johnny，今天要紀錄分享的是 Patterns 筆記系列的 <code>Observer Pattern</code></p><h2 id="介紹" tabindex="-1"><a class="header-anchor" href="#介紹" aria-hidden="true">#</a> 介紹</h2><p>Observer 使我們能夠對物件進行訂閱，當 observable 目標被訂閱物件出現任何事件，能夠對其對應的所有訂閱者 observer 傳遞通知，一個經典的案例就是，當你訂閱的網紅今天發布了最新影片，其所有訂閱者都將馬上收到通知訊息</p><p>一個 Observable 物件通常包含以下 3個重要部分：</p><ul><li><code>observers</code>: 訂閱者清單</li><li><code>subscribe()</code>: 訂閱</li><li><code>unsubscribe()</code>: 取消訂閱</li><li><code>notify()</code>: 通知所有訂閱者</li></ul><p>根據以上，我們來實際動手試試</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">Observable</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>observers <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token function">subscribe</span><span class="token punctuation">(</span><span class="token parameter">func</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>observers<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>func<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token function">unsubscribe</span><span class="token punctuation">(</span><span class="token parameter">func</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>observers <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>observers<span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span><span class="token parameter">observer</span> <span class="token operator">=&gt;</span> observer <span class="token operator">!==</span> func<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token function">notify</span><span class="token punctuation">(</span><span class="token parameter">data</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>observers<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token parameter">observer</span> <span class="token operator">=&gt;</span> <span class="token function">observer</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接著實際使用看看，我們以 React 作為範例，定義並訂閱兩個函數 logger, toastify，這樣後續我們只需要通知 observable 時就會自動通知這兩個函數執行</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> Toast<span class="token punctuation">,</span> <span class="token punctuation">{</span> toast <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;@/components/Toast&#39;</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> toastObservable <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Observable</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">function</span> <span class="token function">logger</span><span class="token punctuation">(</span><span class="token parameter">data</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>Date<span class="token punctuation">.</span><span class="token function">now</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>data<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">toastify</span><span class="token punctuation">(</span><span class="token parameter">data</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token function">toast</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

observable<span class="token punctuation">.</span><span class="token function">subscribe</span><span class="token punctuation">(</span>logger<span class="token punctuation">)</span><span class="token punctuation">;</span>
observable<span class="token punctuation">.</span><span class="token function">subscribe</span><span class="token punctuation">(</span>toastify<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">function</span> <span class="token function">App</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">function</span> <span class="token function">handleClick</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    observable<span class="token punctuation">.</span><span class="token function">notify</span><span class="token punctuation">(</span><span class="token string">&quot;User clicked button!&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">function</span> <span class="token function">handleToggle</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    observable<span class="token punctuation">.</span><span class="token function">notify</span><span class="token punctuation">(</span><span class="token string">&quot;User toggled switch!&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">return</span> <span class="token punctuation">(</span>
    <span class="token operator">&lt;</span>div className<span class="token operator">=</span><span class="token string">&quot;App&quot;</span><span class="token operator">&gt;</span>
      <span class="token operator">&lt;</span>Button<span class="token operator">&gt;</span>Click me<span class="token operator">!</span><span class="token operator">&lt;</span><span class="token operator">/</span>Button<span class="token operator">&gt;</span>
      <span class="token operator">&lt;</span>FormControlLabel control<span class="token operator">=</span><span class="token punctuation">{</span><span class="token operator">&lt;</span>Switch <span class="token operator">/</span><span class="token operator">&gt;</span><span class="token punctuation">}</span> <span class="token operator">/</span><span class="token operator">&gt;</span>
      <span class="token operator">&lt;</span>ToastContainer <span class="token operator">/</span><span class="token operator">&gt;</span>
    <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">&gt;</span>
  <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="rxjs" tabindex="-1"><a class="header-anchor" href="#rxjs" aria-hidden="true">#</a> Rxjs</h2><p>一個 Observer Pattern 的經典案例就是有名的 <code>Rxjs</code> 套件，在 Rxjs 中的 <code>Observable</code> 就是運用這種模式來實作，當然 Rxjs 不只這樣，還提供更多方便的方法與實作，底下是一個經典的範例</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> Observable <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;rxjs&#39;</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> observable <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Observable</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">subscriber</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  subscriber<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  subscriber<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  subscriber<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    subscriber<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    subscriber<span class="token punctuation">.</span><span class="token function">complete</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">1000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;just before subscribe&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
observable<span class="token punctuation">.</span><span class="token function">subscribe</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token function">next</span><span class="token punctuation">(</span><span class="token parameter">x</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;got value &#39;</span> <span class="token operator">+</span> x<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token function">error</span><span class="token punctuation">(</span><span class="token parameter">err</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span><span class="token string">&#39;something wrong occurred: &#39;</span> <span class="token operator">+</span> err<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token function">complete</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;done&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;just after subscribe&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面這段在執行後會得到這樣的結果，其中的 <code>subscriber</code> 就是我們的訂閱內容，我們可以透過他取得各個觀察者物件</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>just before subscribe
got value 1
got value 2
got value 3
just after subscribe
got value 4
done
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,15),d={href:"https://rxjs.dev/",target:"_blank",rel:"noopener noreferrer"},v=e('<h2 id="優缺點" tabindex="-1"><a class="header-anchor" href="#優缺點" aria-hidden="true">#</a> 優缺點</h2><h3 id="優點" tabindex="-1"><a class="header-anchor" href="#優點" aria-hidden="true">#</a> 優點</h3><p>Observer Pattern 可以強化 <code>關注點分離</code>、<code>單一職責原則</code>，其中的 observer objects 觀察者對象並不會強綁定在 observable 物件上，能夠被更大程度的重複使用，藉此提高程式碼的可讀性、模組化，其中 observable 物件負責監聽事件，而 observer 則只需要關注在拿到資料後續做事</p><h3 id="缺點" tabindex="-1"><a class="header-anchor" href="#缺點" aria-hidden="true">#</a> 缺點</h3><p>當 observer 越來越大複雜、observable 訂閱的對象越來越多時，在進行 notify 通知所有訂閱物件時可能會發生效能問題</p><p>感謝收看，下篇見拉～</p>',6);function b(m,f){const t=p("SocialBlock"),o=p("ExternalLinkIcon");return i(),l("div",null,[r,s(t,{hashtags:"design,pattern,observer,rxjs"}),k,n("p",null,[a("對詳細用法有興趣的人，可以參考"),n("a",d,[a("Rxjs 官方文件"),s(o)])]),v,s(t,{hashtags:"design,pattern,observer,rxjs"})])}const g=c(u,[["render",b],["__file","observer.html.vue"]]);export{g as default};