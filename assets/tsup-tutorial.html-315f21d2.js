import{_ as o,r as t,o as i,c,a,d as s,e as n,f as r}from"./app-da643460.js";const l={},u=s("h1",{id:"用-tsup-快速建立-typescript-開發環境",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#用-tsup-快速建立-typescript-開發環境","aria-hidden":"true"},"#"),n(" 用 tsup 快速建立 Typescript 開發環境")],-1),d=r(`<p>嗨大家，好久不見，我是 Johnny。</p><p>今天要介紹給大家一個工具叫做 <code>tsup</code>，用來快速搭建 Typescript 開發環境，甚至可以完全零配置，從筆者開始使用觀察到現在兩年了，發現使用人數是逐漸在上升中，故決定寫篇文章來介紹這個好用的工具給大家</p><h2 id="前言" tabindex="-1"><a class="header-anchor" href="#前言" aria-hidden="true">#</a> 前言</h2><p>其實目前已經有蠻多成熟的工具像是 tsc, ts-node, tsc-watch, 甚至是 babel 等等，或是最近比較火熱的 vitejs 等等都可以拿來搭建 typescript 環境</p><p>然而這些工具有的需要額外的配置，有的並不是一個專門為了建立 typescript 環境所製成的工具，如果今天單純是需要快速開發特定去用 vite 來做也很奇怪，畢竟 vite 主要還是針對前端開發環境去製作的</p><h2 id="什麼是-tsup" tabindex="-1"><a class="header-anchor" href="#什麼是-tsup" aria-hidden="true">#</a> 什麼是 tsup</h2><p>tsup 是一款讓開發者快速搭建 typescript 編譯開發環境的工具，底層採用 esbuild，也就是跟 vite 相同</p><h2 id="快速搭建" tabindex="-1"><a class="header-anchor" href="#快速搭建" aria-hidden="true">#</a> 快速搭建</h2><p>搭建流程十分簡單，只要安裝完 tsup 後設定好 <code>scripts</code>，就能夠馬上開始開發，筆者以一個最基本的 Backend express server 舉例</p><h3 id="安裝依賴" tabindex="-1"><a class="header-anchor" href="#安裝依賴" aria-hidden="true">#</a> 安裝依賴</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">npm</span> <span class="token function">install</span> tsup express @types/express
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="開發-typescript" tabindex="-1"><a class="header-anchor" href="#開發-typescript" aria-hidden="true">#</a> 開發 Typescript</h3><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">import</span> express<span class="token punctuation">,</span> <span class="token punctuation">{</span> Express <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;express&#39;</span>

<span class="token keyword">const</span> app<span class="token operator">:</span> Express <span class="token operator">=</span> <span class="token function">express</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

app<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&#39;/&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span>req<span class="token punctuation">,</span> res<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  res<span class="token punctuation">.</span><span class="token function">json</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    msg<span class="token operator">:</span> <span class="token string">&#39;tsup good&#39;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

app<span class="token punctuation">.</span><span class="token function">listen</span><span class="token punctuation">(</span><span class="token number">8080</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="加上編譯-script" tabindex="-1"><a class="header-anchor" href="#加上編譯-script" aria-hidden="true">#</a> 加上編譯 script</h3><p>開發模式下加上了 <code>--watch</code>, <code>--onSuccess</code> 完成 watch mode 以及 server 重啟的動作</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;scripts&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;start&quot;</span><span class="token operator">:</span> <span class="token string">&quot;node dist/index.js&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;dev&quot;</span><span class="token operator">:</span> <span class="token string">&quot;tsup src/index.ts --watch --onSuccess \\&quot;npm run start\\&quot;&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;build&quot;</span><span class="token operator">:</span> <span class="token string">&quot;tsup src/index.ts --minify&quot;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>以上！恭喜你完成了零配置的 Typescript 環境搭建，是不是非常簡單！</p><h2 id="其他內建功能" tabindex="-1"><a class="header-anchor" href="#其他內建功能" aria-hidden="true">#</a> 其他內建功能</h2><p>除了最基本的編譯功能外，tsup 很貼心的提供了許多內建功能，以下列舉一些我覺得很實用的 feature 給大家</p><ul><li>自動排除依賴：預設 tsup 會幫我們排除 imported packages</li><li>自動多入口編譯：tsup 可以同時接受多個 entry file 進行編譯</li><li>types 產生：指令加上 <code>--dts</code> tsup 會自己幫我們產生 types</li><li>指定輸出模組類型：指令加上 <code>--format</code> 可以指定最終編譯出來的模組類型，可同時輸出多種類型，常見如 <code>--format esm,cjs,iife</code>，對於開發 library 來說是不可或缺的</li><li>Minify 輸出結果：加上 <code>--minify</code></li><li>預設 Treeshaking：預設 esbuild 會自動套用 treeshaking，也可以手動加上 <code>--treeshake</code>使用 Rollup 的 treeshaking 模式</li></ul><h2 id="客製化配置" tabindex="-1"><a class="header-anchor" href="#客製化配置" aria-hidden="true">#</a> 客製化配置</h2><p>當然我們可以完全零配置來使用 tsup，但開發總是會有需要客製化的需求，對此 tsup 也提供了很完整的客製化 config 設定方式，不論你是要拿它來開發 library或是 backend server 都非常適合使用，tsup 的 config 檔可以叫下面這些名子在你的資料夾中</p><ul><li><code>tsup.config.ts</code></li><li><code>tsup.config.js</code></li><li><code>tsup.config.cjs</code></li><li><code>tsup.config.json</code></li><li><code>tsup</code> property in your <code>package.json</code></li></ul><p>開發一個 library 的範例如下：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> defineConfig <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;tsup&#39;</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token function">defineConfig</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">entry</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;src/index.ts&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token literal-property property">format</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;cjs&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;esm&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;iife&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token literal-property property">globalName</span><span class="token operator">:</span> <span class="token string">&#39;TsupDemo&#39;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">dts</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
  <span class="token literal-property property">splitting</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
  <span class="token literal-property property">sourcemap</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
  <span class="token literal-property property">clean</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
  <span class="token literal-property property">minify</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,25),k={href:"https://tsup.egoist.dev/#typescript--javascript",target:"_blank",rel:"noopener noreferrer"},v=s("h2",{id:"結論",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#結論","aria-hidden":"true"},"#"),n(" 結論")],-1),h=s("p",null,"這次分享的 tsup 對於常常需要新建開發環境的中小型專案非常方便，通常都不會需要太龐大的客制化設定，但每次都要重新搞一次環境複製貼上也還是很麻煩，tsup 算是這種場景的救星，希望大家都能實際下載用用看，尤其對於 esbuild 的速度，相信用過 Vitejs 的廣大讀者們一定深有感受吧！",-1),m=s("p",null,"那這次的分享就到這拉，感謝大家收看，下篇文章見拉 =V=~",-1);function b(y,f){const e=t("SocialBlock"),p=t("ExternalLinkIcon");return i(),c("div",null,[u,a(e,{hashtags:"typescript,tsup,esbuild"}),d,s("p",null,[n("詳細設定方式可參考"),s("a",k,[n("tsup 官方文件"),a(p)])]),a(e,{hashtags:"typescript,tsup,esbuild"}),v,h,m])}const x=o(l,[["render",b],["__file","tsup-tutorial.html.vue"]]);export{x as default};