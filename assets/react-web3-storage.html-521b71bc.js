import{_ as c,r as p,o as i,c as l,a as s,d as n,e as a,f as t}from"./app-da643460.js";const r={},u=n("h1",{id:"react-web3-storage",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#react-web3-storage","aria-hidden":"true"},"#"),a(" React Web3 Storage")],-1),d=t('<p>嗨~大家好!我是 Johnny</p><h2 id="前言" tabindex="-1"><a class="header-anchor" href="#前言" aria-hidden="true">#</a> 前言</h2><p>有感於 Web3 技術的蓬勃發展，最近在研究一些 Web3 Storage 的 Client API 後，決定動手練習實作一波，也順便練習使用 React v18(不過其實沒啥用到新 API XDD)</p><h2 id="介紹" tabindex="-1"><a class="header-anchor" href="#介紹" aria-hidden="true">#</a> 介紹</h2><p>Web3 Storage 是一種分布式去中心化儲存的工具，底層實際整合了 <code>IPFS</code>, <code>FileCoin</code> 這兩個技術，但對於一般使用者而言，直接使用這兩個技術分常艱難，透過 Web3 Storage 的工具我們可以更方便的使用這兩個技術~</p>',5),k=n("code",null,"IPFS",-1),h={href:"https://blockcast.it/2019/10/16/let-me-tell-you-what-is-ipfs/",target:"_blank",rel:"noopener noreferrer"},b=n("h2",{id:"實作-web3-storage-ui-過程",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#實作-web3-storage-ui-過程","aria-hidden":"true"},"#"),a(" 實作 Web3 Storage UI 過程")],-1),v={href:"https://react-web3-storage.herokuapp.com/",target:"_blank",rel:"noopener noreferrer"},m=n("code",null,"Web3.Storage",-1),g=n("code",null,"API Token",-1),f={href:"https://web3.storage/docs/",target:"_blank",rel:"noopener noreferrer"},_=t(`<h3 id="首先要安裝官方-api" tabindex="-1"><a class="header-anchor" href="#首先要安裝官方-api" aria-hidden="true">#</a> 首先要安裝官方 API</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">npm</span> <span class="token function">install</span> web3.storage
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="產生-client-instance" tabindex="-1"><a class="header-anchor" href="#產生-client-instance" aria-hidden="true">#</a> 產生 Client Instance</h3><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> Web3Storage <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;web3.storage&#39;</span>

<span class="token keyword">function</span> <span class="token function">getAccessToken</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">WEB3STORAGE_TOKEN</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">makeStorageClient</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Web3Storage</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token literal-property property">token</span><span class="token operator">:</span> <span class="token function">getAccessToken</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="儲存上傳檔案" tabindex="-1"><a class="header-anchor" href="#儲存上傳檔案" aria-hidden="true">#</a> 儲存上傳檔案</h3><p>透過 <code>put</code> 方法上傳檔案後，會獲得一個 cid，而該 cid 就是代表檔案的位置，可以透過這個格式組合出 http url 打開~ <code>https://dweb.link/ipfs/{cid}</code></p>`,6),w={href:"https://web3.storage/docs/reference/js-client-library/#parameters",target:"_blank",rel:"noopener noreferrer"},y=t(`<div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// files 可以是多個檔案，options 可以設定是否打包成一個資料夾</span>
<span class="token keyword">async</span> <span class="token keyword">function</span> <span class="token function">storeFiles</span> <span class="token punctuation">(</span><span class="token parameter">files</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> client <span class="token operator">=</span> <span class="token function">makeStorageClient</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token keyword">const</span> cid <span class="token operator">=</span> <span class="token keyword">await</span> client<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span>files<span class="token punctuation">,</span> options<span class="token punctuation">)</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;stored files with cid:&#39;</span><span class="token punctuation">,</span> cid<span class="token punctuation">)</span>
  <span class="token keyword">return</span> cid
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="獲取指定-cid-內檔案" tabindex="-1"><a class="header-anchor" href="#獲取指定-cid-內檔案" aria-hidden="true">#</a> 獲取指定 cid 內檔案</h3><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> res <span class="token operator">=</span> <span class="token keyword">await</span> client<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>rootCid<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// Web3Response</span>
<span class="token keyword">const</span> files <span class="token operator">=</span> <span class="token keyword">await</span> res<span class="token punctuation">.</span><span class="token function">files</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// Web3File[]</span>
<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">const</span> file <span class="token keyword">of</span> files<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>file<span class="token punctuation">.</span>cid<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>file<span class="token punctuation">.</span>name<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>file<span class="token punctuation">.</span>size<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="條列帳號下所有-cid-的清單" tabindex="-1"><a class="header-anchor" href="#條列帳號下所有-cid-的清單" aria-hidden="true">#</a> 條列帳號下所有 cid 的清單</h3><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// Return the names of 10 uploads</span>
<span class="token keyword">const</span> uploadNames <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token keyword">for</span> <span class="token keyword">await</span> <span class="token punctuation">(</span><span class="token keyword">const</span> item <span class="token keyword">of</span> client<span class="token punctuation">.</span><span class="token function">list</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token literal-property property">maxResults</span><span class="token operator">:</span> <span class="token number">10</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  uploadNames<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>item<span class="token punctuation">.</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="刪除-cid-檔案" tabindex="-1"><a class="header-anchor" href="#刪除-cid-檔案" aria-hidden="true">#</a> 刪除 cid 檔案</h3><p>因為官方目前並未提供 API Token 能力進行檔案的刪除，經過研究後發現，官方的 Web UI 在呼叫 HTTP API 時必須帶著 <code>Authorization</code>，而該驗證 <code>idToken</code> 是由 <code>Magic Login</code> 工具提供，也就表示，如果要刪除檔案，我們必須登入後取得 <code>idToken</code> 才能進行操作，也許在未來官方會推出相關的 Delete method 也說不定~</p>`,7),x={href:"https://github.com/johnnywang1994/react-web3-storage.git",target:"_blank",rel:"noopener noreferrer"},S=n("p",null,"今天的分享就到這邊，那我們下篇文章見拉~",-1),j=n("h2",{id:"參考",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#參考","aria-hidden":"true"},"#"),a(" 參考")],-1),I={href:"https://web3.storage/",target:"_blank",rel:"noopener noreferrer"},W={href:"https://github.com/johnnywang1994/react-web3-storage.git",target:"_blank",rel:"noopener noreferrer"};function P(A,T){const o=p("SocialBlock"),e=p("ExternalLinkIcon");return i(),l("div",null,[u,s(o,{hashtags:"react,javascript,web3,web3storage,antd"}),d,n("p",null,[a("有關 "),k,a(" 的介紹可以看這邊 - "),n("a",h,[a("IPFS"),s(e)])]),b,n("p",null,[a("這次實作的結果在這-"),n("a",v,[a("React Web3 Storage UI"),s(e)]),a("，可以透過輸入在 "),m,a(" 官方登入後產生的 "),g,a(" 使用，或是直接點擊畫面右上的信箱登入，這個信箱登入的串接與官方使用的是同一個 Public Key，帳號本身是共用的~")]),n("p",null,[a("實作過程因為實在牽涉太多"),n("a",f,[a("官方 API"),s(e)]),a("操作，這邊僅簡單介紹最核心的 API 調用")]),_,n("ul",null,[n("li",null,[n("a",w,[a("Options"),s(e)])])]),y,n("p",null,[a("有興趣的朋友們可以參觀"),n("a",x,[a("我的源碼"),s(e)]),a("看看瞜~")]),S,s(o,{hashtags:"react,javascript,web3,web3storage,antd"}),j,n("ul",null,[n("li",null,[n("a",I,[a("Web3 Storage"),s(e)])]),n("li",null,[n("a",W,[a("Source Code"),s(e)])])])])}const N=c(r,[["render",P],["__file","react-web3-storage.html.vue"]]);export{N as default};