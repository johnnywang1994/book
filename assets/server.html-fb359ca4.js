import{_ as p,r as o,o as l,c,d as n,e as s,a as e,f as t}from"./app-da643460.js";const r={},i=n("h1",{id:"parse-server-章節",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#parse-server-章節","aria-hidden":"true"},"#"),s(" Parse Server 章節")],-1),u=n("p",null,[s("Parse Server 中是一套安裝在 express 的應用程序，可以使用 "),n("code",null,"MongoDB"),s(", "),n("code",null,"PostgreSQL"),s(" 兩種資料庫")],-1),d={href:"https://docs.parseplatform.org/parse-server/guide/",target:"_blank",rel:"noopener noreferrer"},k={href:"https://parseplatform.org/parse-server/api/5.2.0/index.html",target:"_blank",rel:"noopener noreferrer"},v=t(`<h2 id="服務配置範例" tabindex="-1"><a class="header-anchor" href="#服務配置範例" aria-hidden="true">#</a> 服務配置範例</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">npm</span> <span class="token function">install</span> parse parse-server
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,2),m={href:"https://github.com/parse-community/parse-dashboard",target:"_blank",rel:"noopener noreferrer"},b=n("code",null,"mongodb",-1),h=t(`<div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">version</span><span class="token punctuation">:</span> <span class="token string">&#39;3.8&#39;</span>

<span class="token key atrule">services</span><span class="token punctuation">:</span>
  <span class="token key atrule">mongodb</span><span class="token punctuation">:</span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span> mongo<span class="token punctuation">:</span><span class="token number">4.2</span>
    <span class="token key atrule">ports</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token string">&quot;27017:27017&quot;</span>
    <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> test<span class="token punctuation">-</span>mongo<span class="token punctuation">-</span>data<span class="token punctuation">:</span>/data/db
  <span class="token key atrule">dashboard</span><span class="token punctuation">:</span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span> parseplatform/parse<span class="token punctuation">-</span>dashboard
    <span class="token key atrule">command</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token punctuation">-</span><span class="token punctuation">-</span>dev
    <span class="token punctuation">-</span> <span class="token punctuation">-</span><span class="token punctuation">-</span>appId
    <span class="token punctuation">-</span> test<span class="token punctuation">-</span>app<span class="token punctuation">-</span>id
    <span class="token punctuation">-</span> <span class="token punctuation">-</span><span class="token punctuation">-</span>masterKey
    <span class="token punctuation">-</span> test<span class="token punctuation">-</span>master<span class="token punctuation">-</span>key
    <span class="token punctuation">-</span> <span class="token punctuation">-</span><span class="token punctuation">-</span>serverURL
    <span class="token punctuation">-</span> http<span class="token punctuation">:</span>//127.0.0.1<span class="token punctuation">:</span>1337/parse
    <span class="token key atrule">ports</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token string">&quot;4040:4040&quot;</span>

<span class="token key atrule">volumes</span><span class="token punctuation">:</span>
  <span class="token key atrule">test-mongo-data</span><span class="token punctuation">:</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="建立-parse-server" tabindex="-1"><a class="header-anchor" href="#建立-parse-server" aria-hidden="true">#</a> 建立 Parse Server</h2><p>構造函數返回一個符合 Express Middleware 的 API 對象。</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> express <span class="token keyword">from</span> <span class="token string">&#39;express&#39;</span>
<span class="token keyword">import</span> ParseServer<span class="token punctuation">,</span> <span class="token punctuation">{</span> RedisCacheAdapter <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;parse-server&#39;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> ReadPreference <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;mongodb&#39;</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> app <span class="token operator">=</span> <span class="token function">express</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token keyword">const</span> parseServerOptions <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">appId</span><span class="token operator">:</span> <span class="token string">&#39;test-app-id&#39;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">masterKey</span><span class="token operator">:</span> <span class="token string">&#39;test-master-key&#39;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">cacheAdapter</span><span class="token operator">:</span> <span class="token keyword">new</span> <span class="token class-name">RedisCacheAdapter</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token literal-property property">url</span><span class="token operator">:</span> <span class="token string">&#39;redis://127.0.0.1:6379&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token literal-property property">databaseURI</span><span class="token operator">:</span> <span class="token string">&#39;mongodb://localhost:27017/parse&#39;</span><span class="token punctuation">,</span>
  <span class="token comment">// if production environment has implemented Replication feature</span>
  <span class="token comment">// we can set the readPreference of mongodb to speed up reading</span>
  <span class="token comment">// however, if most of case the local development environment would not support this feature, and should be default setting</span>
  <span class="token comment">// and be careful when using this feature may cause read/write consistency issue</span>
  <span class="token comment">// mongodb://localhost:27017?authSource=admin&amp;readConcernLevel=majority&amp;w=majority</span>
  <span class="token comment">// https://www.mongodb.com/docs/manual/core/read-isolation-consistency-recency/#causal-consistency</span>
  <span class="token literal-property property">databaseOptions</span><span class="token operator">:</span> isProd
    <span class="token operator">?</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">enableSchemaHooks</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
        <span class="token literal-property property">readPreference</span><span class="token operator">:</span> ReadPreference<span class="token punctuation">.</span><span class="token constant">SECONDARY_PREFERRED</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span>
    <span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>

  <span class="token literal-property property">enableAnonymousUsers</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
  <span class="token literal-property property">auth</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>

  <span class="token literal-property property">fileUpload</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">enableForPublic</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>

  <span class="token literal-property property">objectIdSize</span><span class="token operator">:</span> <span class="token number">16</span><span class="token punctuation">,</span>
  <span class="token literal-property property">allowClientClassCreation</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>

  <span class="token literal-property property">cloud</span><span class="token operator">:</span> <span class="token function">resolve</span><span class="token punctuation">(</span>__dirname<span class="token punctuation">,</span> <span class="token string">&#39;./cloud.js&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token comment">// parse cloud path</span>
  <span class="token literal-property property">jsonLogs</span><span class="token operator">:</span> process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">NODE_ENV</span> <span class="token operator">===</span> <span class="token string">&#39;production&#39;</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> parseServer <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ParseServer</span><span class="token punctuation">(</span>parseServerOptions<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> mountPath <span class="token operator">=</span> <span class="token string">&#39;/parse&#39;</span>
<span class="token keyword">const</span> port <span class="token operator">=</span> <span class="token number">1337</span>

app<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>mountPath<span class="token punctuation">,</span> parseServer<span class="token punctuation">)</span>

app<span class="token punctuation">.</span><span class="token function">listen</span><span class="token punctuation">(</span>port<span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">parse-server-example running on port: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>port<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="開啟-dashboard" tabindex="-1"><a class="header-anchor" href="#開啟-dashboard" aria-hidden="true">#</a> 開啟 dashboard</h2><ul><li>http://localhost:4040</li></ul>`,6);function y(g,f){const a=o("ExternalLinkIcon");return l(),c("div",null,[i,u,n("ul",null,[n("li",null,[n("a",d,[s("Parse Server Guide"),e(a)])]),n("li",null,[n("a",k,[s("Parse Server API Docs"),e(a)])])]),v,n("p",null,[s("透過 docker 配置服務如下，使用 "),n("a",m,[s("Parse Dashboard"),e(a)]),s("，以及啟動本地的 "),b]),h])}const w=p(r,[["render",y],["__file","server.html.vue"]]);export{w as default};