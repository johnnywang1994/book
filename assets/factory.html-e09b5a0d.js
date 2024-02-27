import{_ as p,r as e,o as c,c as o,a,d as n,e as t,f as i}from"./app-4f8ac264.js";const l={},u=n("h1",{id:"factory-pattern",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#factory-pattern","aria-hidden":"true"},"#"),t(" Factory Pattern")],-1),k=i(`<h2 id="前言" tabindex="-1"><a class="header-anchor" href="#前言" aria-hidden="true">#</a> 前言</h2><p>大家好，我是 Johnny，今天要紀錄分享的是 Patterns 筆記系列的 <code>Factory Pattern</code></p><h2 id="介紹" tabindex="-1"><a class="header-anchor" href="#介紹" aria-hidden="true">#</a> 介紹</h2><p><code>Factory Pattern</code> 是指我們可以使用一個 factory 函數來創建新物件，而不透過 <code>new</code> 關鍵字，一個最簡單的範例如下</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token function-variable function">createUser</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token punctuation">{</span> firstName<span class="token punctuation">,</span> lastName<span class="token punctuation">,</span> email <span class="token punctuation">}</span></span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">(</span><span class="token punctuation">{</span>
  firstName<span class="token punctuation">,</span>
  lastName<span class="token punctuation">,</span>
  email<span class="token punctuation">,</span>
  <span class="token function">fullName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token keyword">this</span><span class="token punctuation">.</span>firstName<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token keyword">this</span><span class="token punctuation">.</span>lastName<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>透過實作一個 factory 函數，讓我們能快速創建許多包含相同屬性的物件，增加程式碼的覆用和組織能力</p><p>但在 javascript 中，工廠模式主要描述一個不使用 new 關鍵字返回物件的函數，但在許多狀況下，創建新的 instance 比每次創建新的 object 更能節省內存空間</p><h2 id="延伸學習" tabindex="-1"><a class="header-anchor" href="#延伸學習" aria-hidden="true">#</a> 延伸學習</h2><p>上面的範例主要偏向於簡單工廠的基本介紹，當我們今天要新增一個類別時必須不斷修改我們的類別工廠，根據 SOLID 中的開放封閉原則，我們希望添加類別時不必每次都修改我們的工廠邏輯，因此實際工廠模式又可以延伸出 <code>工廠方法</code>、<code>抽象工廠</code> 兩種</p><h3 id="簡單工廠" tabindex="-1"><a class="header-anchor" href="#簡單工廠" aria-hidden="true">#</a> 簡單工廠</h3><p>以下是一個簡單工廠的範例，透過 <code>PersonFactory</code> 我們可以建構不同類別的物件，但每次添加新類別時都必須實際修改我們的工廠方法</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">FatPerson</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>intro <span class="token operator">=</span> <span class="token string">&#39;體重過重的人&#39;</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token function">getSick</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;糖尿病、高血壓、中風、腎結石、痛風&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">SlimPerson</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>intro <span class="token operator">=</span> <span class="token string">&#39;苗條的人&#39;</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token function">getSick</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;貧血、骨折、內出血、低血壓、暈厥&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">NormalPerson</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>intro <span class="token operator">=</span> <span class="token string">&#39;健康的正常人&#39;</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token function">getSick</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;無特殊好發疾病&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 工廠方法</span>
<span class="token keyword">var</span> <span class="token function-variable function">PersonFactory</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">type</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">switch</span> <span class="token punctuation">(</span>type<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">case</span> <span class="token string">&#39;fat&#39;</span><span class="token operator">:</span>
      <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">FatPerson</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">case</span> <span class="token string">&#39;slim&#39;</span><span class="token operator">:</span>
      <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">SlimPerson</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">default</span><span class="token operator">:</span>
      <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">NormalPerson</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="工廠方法" tabindex="-1"><a class="header-anchor" href="#工廠方法" aria-hidden="true">#</a> 工廠方法</h3><p>透過預先製作工廠方法的方式，把實際建構的實作流程轉讓出去，假設我們在開發一款遊戲，正在實作一個創建角色物件的工廠方法，實際範例如下</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 工廠方法</span>
<span class="token keyword">class</span> <span class="token class-name">CharacterFactory</span> <span class="token punctuation">{</span>
  <span class="token function">createCharacter</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span><span class="token string">&#39;此方法僅供繼承使用，不能直接調用&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">MapCharacterFactory</span> <span class="token keyword">extends</span> <span class="token class-name">CharacterFactory</span> <span class="token punctuation">{</span>
  <span class="token function">createCharacter</span><span class="token punctuation">(</span><span class="token parameter">type</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>type <span class="token operator">===</span> <span class="token string">&#39;sword&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">SwordsMan</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>type <span class="token operator">===</span> <span class="token string">&#39;magic&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">MagicMan</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 物件類別</span>
<span class="token keyword">class</span> <span class="token class-name">Character</span> <span class="token punctuation">{</span>
  <span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span><span class="token string">&#39;此方法僅供繼承使用，不能直接調用&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">SwordsMan</span> <span class="token keyword">extends</span> <span class="token class-name">Character</span> <span class="token punctuation">{</span>
  <span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;我是拿劍的勇士&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">MagicMan</span> <span class="token keyword">extends</span> <span class="token class-name">Character</span> <span class="token punctuation">{</span>
  <span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;我是拿法杖的勇士&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上方的範例可以讓我們不斷創建新的 MapCharacterFactory 繼承類別，而不必再直接修改我們的 <code>CharacterFactory</code> 工廠</p><h3 id="抽象工廠" tabindex="-1"><a class="header-anchor" href="#抽象工廠" aria-hidden="true">#</a> 抽象工廠</h3><p>上面的工廠方法已經可以解決大部分場景問題，但如果今天我們要設計一款，根據遊戲地圖不同，可以選用的角色也不同的需求時，上面的工廠方法就會變得難以調整，可能必須直接複製整份修改，此時我們可以把整個工廠方法抽象化，提升整個架構的覆用能力</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 物件類別，與上方工廠方法相同</span>
<span class="token keyword">class</span> <span class="token class-name">Character</span> <span class="token punctuation">{</span>
  <span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span><span class="token string">&#39;此方法僅供繼承使用，不能直接調用&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">SwordsMan</span> <span class="token keyword">extends</span> <span class="token class-name">Character</span> <span class="token punctuation">{</span>
  <span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;我是拿劍的勇士&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">MagicMan</span> <span class="token keyword">extends</span> <span class="token class-name">Character</span> <span class="token punctuation">{</span>
  <span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;我是拿法杖的勇士&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 新增 Enemy 類別</span>
<span class="token keyword">class</span> <span class="token class-name">Enemy</span> <span class="token punctuation">{</span>
  <span class="token function">attack</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span><span class="token string">&#39;此方法僅供繼承使用，不能直接調用&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">Dog</span> <span class="token keyword">extends</span> <span class="token class-name">Enemy</span> <span class="token punctuation">{</span>
  <span class="token function">attack</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;瘋狗咬人拉！&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 抽象工廠類別</span>
<span class="token keyword">class</span> <span class="token class-name">MapFactory</span> <span class="token punctuation">{</span>
  <span class="token function">createCharacter</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span><span class="token string">&#39;此方法僅供繼承使用，不能直接調用&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token function">createEnemy</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span><span class="token string">&#39;此方法僅供繼承使用，不能直接調用&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 實作地圖的相關功能</span>
<span class="token keyword">class</span> <span class="token class-name">NewYorkFactory</span> <span class="token keyword">extends</span> <span class="token class-name">MapFactory</span> <span class="token punctuation">{</span>
  <span class="token function">createCharacter</span><span class="token punctuation">(</span><span class="token parameter">type</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>type <span class="token operator">===</span> <span class="token string">&#39;sword&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">SwordsMan</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>type <span class="token operator">===</span> <span class="token string">&#39;magic&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">MagicMan</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  <span class="token function">createEnemy</span><span class="token punctuation">(</span><span class="token parameter">type</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>type <span class="token operator">===</span> <span class="token string">&#39;dog&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Dog</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此時如果我們要開發另一張全新地圖的角色工廠，可以直接繼承並創建一個專屬於該地圖的整套功能，而不必東拼西湊，並且當後續需要添加功能時，也可以在各地圖中自由調整不影響到整個抽象工廠，解決了工廠方法的缺點</p>`,20),r=n("h2",{id:"結論",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#結論","aria-hidden":"true"},"#"),t(" 結論")],-1),d=n("p",null,"工廠模式非常吃重 OOP 的開發思考跟經驗，以結論來說，工廠模式幫助開發者更好地管理與建構關聯性物件的能力，讓物件之間的關係可以用相對有規範，卻保持一定彈性的模式運行，但也須注意工廠模式盡量不要超過 3 層，隨著繼承的層次增加，將會顯著的增加開發、除錯難度",-1),v=n("p",null,"今天就先介紹到這拉～感謝大家收看，下篇再見拉！=V=",-1);function m(b,y){const s=e("SocialBlock");return c(),o("div",null,[u,a(s,{hashtags:"design,pattern,factory"}),k,a(s,{hashtags:"design,pattern,factory"}),r,d,v])}const h=p(l,[["render",m],["__file","factory.html.vue"]]);export{h as default};
