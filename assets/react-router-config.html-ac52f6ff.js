import{_ as e,r as p,o,c,d as n,e as s,a as t,f as i}from"./app-da643460.js";const l={},u=n("h1",{id:"react-router-config-筆記",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#react-router-config-筆記","aria-hidden":"true"},"#"),s(" React Router Config 筆記")],-1),r=n("code",null,"react-router-dom",-1),d=n("code",null,"Outlet",-1),k=n("code",null,"RouterView",-1),v={href:"https://github.com/remix-run/react-router/blob/main/docs/getting-started/tutorial.md",target:"_blank",rel:"noopener noreferrer"},m=n("hr",null,null,-1),b={href:"https://www.npmjs.com/package/react-router-config",target:"_blank",rel:"noopener noreferrer"},g=i(`<h2 id="實作範例" tabindex="-1"><a class="header-anchor" href="#實作範例" aria-hidden="true">#</a> 實作範例</h2><p>個人愛好像 Vue Router 那樣的 routerView 組件，所以稍微包裝了下這套件方便使用</p><div class="language-jsx line-numbers-mode" data-ext="jsx"><pre class="language-jsx"><code><span class="token comment">// router.js</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> renderRoutes <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;react-router-config&#39;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> ViewHome <span class="token keyword">from</span> <span class="token string">&#39;./views/Home&#39;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> ViewAbout <span class="token keyword">from</span> <span class="token string">&#39;./views/About&#39;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> ViewAboutDetail <span class="token keyword">from</span> <span class="token string">&#39;./views/AboutDetail&#39;</span>

<span class="token comment">// 這邊採用類似裝飾器的 HOC</span>
<span class="token comment">// 自動處理好 renderRoutes 這步驟，開發時就不用到處 import renderRoutes</span>
<span class="token keyword">function</span> <span class="token function">routePipe</span><span class="token punctuation">(</span><span class="token parameter">WrappedComponent</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token keyword">function</span> <span class="token function">RouterView</span><span class="token punctuation">(</span><span class="token parameter">props</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">(</span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">WrappedComponent</span></span>
        <span class="token spread"><span class="token punctuation">{</span><span class="token operator">...</span>props<span class="token punctuation">}</span></span>
        <span class="token attr-name">routerView</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token function">renderRoutes</span><span class="token punctuation">(</span>props<span class="token punctuation">.</span>route<span class="token punctuation">.</span>routes<span class="token punctuation">)</span><span class="token punctuation">}</span></span>
      <span class="token punctuation">/&gt;</span></span>
    <span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> routes <span class="token operator">=</span> <span class="token punctuation">[</span>
  <span class="token punctuation">{</span>
    <span class="token literal-property property">path</span><span class="token operator">:</span> <span class="token string">&#39;/&#39;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">exact</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
    <span class="token literal-property property">component</span><span class="token operator">:</span> <span class="token function">routePipe</span><span class="token punctuation">(</span>ViewHome<span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span>
    <span class="token literal-property property">path</span><span class="token operator">:</span> <span class="token string">&#39;/about&#39;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">component</span><span class="token operator">:</span> <span class="token function">routePipe</span><span class="token punctuation">(</span>ViewAbout<span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token literal-property property">routes</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token punctuation">{</span>
        <span class="token literal-property property">path</span><span class="token operator">:</span> <span class="token string">&#39;/about/details&#39;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">component</span><span class="token operator">:</span> <span class="token function">routePipe</span><span class="token punctuation">(</span>ViewAboutDetail<span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">]</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">]</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token function">renderRoutes</span><span class="token punctuation">(</span>routes<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-jsx line-numbers-mode" data-ext="jsx"><pre class="language-jsx"><code><span class="token comment">// App.js</span>
<span class="token keyword">import</span> routerView <span class="token keyword">from</span> <span class="token string">&#39;./router&#39;</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">function</span> <span class="token function">App</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token punctuation">(</span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span></span><span class="token punctuation">&gt;</span></span><span class="token plain-text">
      </span><span class="token punctuation">{</span>routerView<span class="token punctuation">}</span><span class="token plain-text">
    </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span></span><span class="token punctuation">&gt;</span></span>
  <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-jsx line-numbers-mode" data-ext="jsx"><pre class="language-jsx"><code><span class="token comment">// About.js</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">function</span> <span class="token function">About</span><span class="token punctuation">(</span><span class="token parameter"><span class="token punctuation">{</span> routerView <span class="token punctuation">}</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token punctuation">(</span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">className</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>view-about<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token plain-text">
      Hello About
      </span><span class="token punctuation">{</span>routerView<span class="token punctuation">}</span><span class="token plain-text">
    </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
  <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,5);function w(f,y){const a=p("ExternalLinkIcon");return o(),c("div",null,[u,n("blockquote",null,[n("p",null,[s("更新：現在新版 "),r,s(" 已經可以使用 "),d,s(" 來寫入子路由，跟 Vue Router 的 "),k,s(" 一樣可以很方便的定義子路由位置，詳細請看"),n("a",v,[s("官方文件"),t(a)])])]),m,n("p",null,[s("撇除 Next.js 這類內建 router 處理的框架，直接用 react router 的寫法真的太虐心，所以紀錄一下一個名為 "),n("a",b,[s("react-router-config"),t(a)]),s(" 的用法，讓開發時多一個參考工具使用QQ")]),g])}const _=e(l,[["render",w],["__file","react-router-config.html.vue"]]);export{_ as default};
