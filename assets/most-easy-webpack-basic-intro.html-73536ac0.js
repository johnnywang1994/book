import{_ as i,r as o,o as l,c,a as n,d as e,e as a,f as p}from"./app-da643460.js";const r={},d=e("h1",{id:"史上最簡單的-webpack-5-教學",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#史上最簡單的-webpack-5-教學","aria-hidden":"true"},"#"),a(" 史上最簡單的 Webpack 5 教學")],-1),u=p(`<h2 id="前言" tabindex="-1"><a class="header-anchor" href="#前言" aria-hidden="true">#</a> 前言</h2><p>今天這篇主題算是朋友們敲碗許久，但我一直有一個心理陰影不敢觸碰的一個主題，畢竟解說這個主題的大佬真的非常多，也非常詳細，實在是不敢獻醜，但想了想，還是決定希望能跨出這一步，用我自己的方式跟理解來說明一遍。</p><p>一直以來 Webpack 被很多人詬病很難學、門檻高、難以理解，所以我希望能用更簡單易懂的方式讓新手都能快速了解 Webpack 的整個全貌。</p><h2 id="什麼是-webpack" tabindex="-1"><a class="header-anchor" href="#什麼是-webpack" aria-hidden="true">#</a> 什麼是 Webpack</h2><p>根據官網的說明就這樣一句話：<br><code>webpack is a static module bundler for modern JavaScript applications</code>（現代 Javascript 靜態模組打包工具）</p><p>不用想得太複雜，其實就是<code>將平常撰寫的 Javascript 套用模組化的開發方式後打包（把你程式碼全部塞在一起）的工具</code>，當然對於一些優化場景會再將程式碼拆分開來 <code>Code Splitting</code>，但那又是另一件事了</p><h2 id="為何需要-webpack" tabindex="-1"><a class="header-anchor" href="#為何需要-webpack" aria-hidden="true">#</a> 為何需要 Webpack</h2><p>可能有些朋友會好奇：阿本來就是全部寫在一起了，我幹嘛再去用一個工具把他綁在一起？其實 Webpack 的主要意義並不單單只是<code>打包</code>，而是前一句<code>套用模組化的開發方式</code></p><p>Webpack 真正的價值是在於讓傳統瀏覽器還沒有 <code>ESModule</code> 的年代，可以在本地使用模組化的開發體驗，優化整個開發的品質與可維護性，並且透過 <code>Nodejs</code> 的編譯能力，發展出各式的編譯功能，比如 <code>Sass</code>, <code>Typescript</code> 等等，更進一步提升了整個前端的開發能力，可以說像 <code>Webpack</code>，或是更早以前的 <code>Gulp</code>, <code>Grunp</code> 等等工具把前端開發往另一個層次提升了</p><h2 id="安裝-webpack" tabindex="-1"><a class="header-anchor" href="#安裝-webpack" aria-hidden="true">#</a> 安裝 Webpack</h2><p>透過 npm 進行安裝，通常會同時安裝 <code>webpack</code>, <code>webpack-cli</code> 這兩個，後者提供方便的指令列命令讓我們能方便的配置在 <code>package.json</code> 的 <code>scripts</code> 中</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">npm</span> <span class="token function">install</span> --save-dev webpack webpack-cli
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>接著在專案目錄下新增一個 <code>webpack.config.js</code> 這個檔案名稱是 <code>webpack-cli</code> 預設會去搜索使用的，如果需要更改配置的路徑，可以使用 <code>--config</code> 這個參數指定</p><p>安裝完成後來配置一下 <code>package.json</code>，<code>--watch</code> 參數會自動監聽我們的入口文件（包含依賴）變化重新再編譯一次內容</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token punctuation">{</span>
    <span class="token property">&quot;scripts&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;dev&quot;</span><span class="token operator">:</span> <span class="token string">&quot;webpack --watch&quot;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="webpack-核心-concepts" tabindex="-1"><a class="header-anchor" href="#webpack-核心-concepts" aria-hidden="true">#</a> Webpack 核心 Concepts</h2><p><img src="https://raw.githubusercontent.com/jwlearn1994/image-uploader/main/2022/03/14-16-51-08-截圖 2022-03-14 下午4.48.50.png" alt="截圖 2022-03-14 下午4.48.50.png"></p><p>如上圖所示，Webpack 核心主要包含五大元素，接下來會一個一個帶大家認識他們</p><h2 id="mode" tabindex="-1"><a class="header-anchor" href="#mode" aria-hidden="true">#</a> Mode</h2><p>告訴 Webpack 當前針對的編譯情景是正式、開發模式，這個值會讓 Webpack 採取不同的編譯策略，或是給其他 Plugins 讀取使用</p><ul><li>available values: <code>production</code>, <code>development</code>, <code>none</code></li></ul><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">mode</span><span class="token operator">:</span> <span class="token string">&#39;development&#39;</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="entry" tabindex="-1"><a class="header-anchor" href="#entry" aria-hidden="true">#</a> Entry</h2><p>告訴 Webpack 編譯的入口位置，支援多入口配置</p><h3 id="single-entry" tabindex="-1"><a class="header-anchor" href="#single-entry" aria-hidden="true">#</a> Single entry</h3><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">entry</span><span class="token operator">:</span> <span class="token string">&#39;./path/to/my/entry/file.js&#39;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="multi-entry" tabindex="-1"><a class="header-anchor" href="#multi-entry" aria-hidden="true">#</a> Multi entry</h3><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">entry</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">app</span><span class="token operator">:</span> <span class="token string">&#39;./src/app.js&#39;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">adminApp</span><span class="token operator">:</span> <span class="token string">&#39;./src/adminApp.js&#39;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="plugins" tabindex="-1"><a class="header-anchor" href="#plugins" aria-hidden="true">#</a> Plugins</h2><p>一個 Webpack 編譯流程中可以有很多 plugins，而 plugin 能讓開發者在 Webpack 的整個編譯階段配置不同的操作，比如提前處理操作特定輸出 disk 的檔案或是配置一些實用的工具在編譯的過程中，值得一提的是，Webpack 本身整個編譯過程也是建立在同樣的這個 Plugin 系統架構底下，可以說 <code>Plugins</code> 是構成整個 Webpack 的骨幹要素</p><p>底下是一個套用 <code>html-webpack-plugin</code> 的範例</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> HtmlWebpackPlugin <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;html-webpack-plugin&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">plugins</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token keyword">new</span> <span class="token class-name">HtmlWebpackPlugin</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
        <span class="token literal-property property">template</span><span class="token operator">:</span> <span class="token string">&#39;./path/to/my/index.html&#39;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="loaders" tabindex="-1"><a class="header-anchor" href="#loaders" aria-hidden="true">#</a> Loaders</h2><p>一個 Webpack 編譯流程中可以有很多 loaders，而每個 loader 是作為對不同模組進行客製化編譯流程的轉譯器，並且 loaders 彼此之前具有先後關係，對於同一類型的檔案可以套用多個 loaders，每一個 loader 編譯後會將結果送到下一個 loader 進行處理直到沒有下一個為止</p><p>底下是一個套用 <code>css-loader</code>, <code>style-loader</code>的範例，範例中的編譯順序是由下而上，也就是從陣列的後方往前走</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">module</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">rules</span><span class="token operator">:</span> <span class="token punctuation">[</span>
            <span class="token punctuation">{</span>
                <span class="token literal-property property">test</span><span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">.css$</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span>
                <span class="token literal-property property">use</span><span class="token operator">:</span> <span class="token punctuation">[</span>
                    <span class="token string">&#39;style-loader&#39;</span><span class="token punctuation">,</span>
                    <span class="token string">&#39;css-loader&#39;</span><span class="token punctuation">,</span>
                <span class="token punctuation">]</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">]</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="output" tabindex="-1"><a class="header-anchor" href="#output" aria-hidden="true">#</a> Output</h2><p>告訴 Webpack 如何將編譯後的檔案輸出到 disk（主機位置）中。</p><h3 id="單一輸出" tabindex="-1"><a class="header-anchor" href="#單一輸出" aria-hidden="true">#</a> 單一輸出</h3><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">output</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">path</span><span class="token operator">:</span> __dirname <span class="token operator">+</span> <span class="token string">&#39;/dist&#39;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">filename</span><span class="token operator">:</span> <span class="token string">&#39;bundle.js&#39;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="多檔案輸出" tabindex="-1"><a class="header-anchor" href="#多檔案輸出" aria-hidden="true">#</a> 多檔案輸出</h3><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">entry</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">app</span><span class="token operator">:</span> <span class="token string">&#39;./src/app.js&#39;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">adminApp</span><span class="token operator">:</span> <span class="token string">&#39;./src/adminApp.js&#39;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token literal-property property">output</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">path</span><span class="token operator">:</span> __dirname <span class="token operator">+</span> <span class="token string">&#39;/dist&#39;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">filename</span><span class="token operator">:</span> <span class="token string">&#39;[name].js&#39;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>到此我們理解了 Webpack 中最核心的幾個概念了，現在就可以開始來實際動手來寫一些簡單的範例摟～</p><h2 id="webpack-modules" tabindex="-1"><a class="header-anchor" href="#webpack-modules" aria-hidden="true">#</a> Webpack Modules</h2><p>那哪寫東西可以被 Webpack 視為一個 module 處理呢? 以下是一些常用的</p><ul><li>ES2015 import</li><li>CJS require</li><li>AMD define &amp; require</li><li>css @import</li><li>url() &amp; img src</li></ul><h2 id="module-resolution" tabindex="-1"><a class="header-anchor" href="#module-resolution" aria-hidden="true">#</a> Module Resolution</h2>`,47),k={href:"https://www.npmjs.com/package/enhanced-resolve",target:"_blank",rel:"noopener noreferrer"},m=p(`<div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// Absolute path</span>
<span class="token keyword">import</span> <span class="token string">&#39;/local/home/abpath/file&#39;</span>
<span class="token keyword">import</span> <span class="token string">&#39;C:\\\\Users\\\\me&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// Relative path</span>
<span class="token keyword">import</span> <span class="token string">&#39;../local/home/repath/file&#39;</span>
<span class="token keyword">import</span> <span class="token string">&#39;./file&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// Module path</span>
<span class="token keyword">import</span> <span class="token string">&#39;module&#39;</span>
<span class="token keyword">import</span> <span class="token string">&#39;module/lib/file&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="tree-shaking" tabindex="-1"><a class="header-anchor" href="#tree-shaking" aria-hidden="true">#</a> Tree Shaking</h2><p>所謂 tree-shaking 顧名思義就是將我們的樹上無用的葉片模組搖落、摘除得這麼一個機制，也稱作 <code>**dead-code elimination**</code>，大致的流程如下：</p><ol><li><p>靜態解析：relies on the static structure of <code>ES2015</code> syntax(export, import)</p></li><li><p>標註：use optimization.usedExports to <code>mark dead code</code></p></li><li><p>移除：use <code>TerserPlugin</code> to remove dead code(or UglifyPlugin…etc)</p></li></ol><p>標註前後對比如下圖</p><p><img src="https://raw.githubusercontent.com/jwlearn1994/image-uploader/main/2022/04/tree-shaking-mechanism.JPG" alt=""></p><p>而對於開發者來說，我們更需要專注在 1. 2 這兩個部分，盡量使用靜態解析的方式，讓工具能正確完成標註多餘程式碼的話，後續移除就交給相關套件去實現就行了，所以實作上我們更關注以下幾點：</p><ol><li><p>避免不必要的變數附值</p><p><img src="https://github.com/jwlearn1994/image-uploader/blob/main/2022/04/unused-value-assignment.JPG?raw=true" alt=""></p></li><li><p>注意使用 <strong>@babel/preset-env modules</strong> 設定，導致無法使用靜態解析</p><p><img src="https://github.com/jwlearn1994/image-uploader/blob/main/2022/04/babel-mistake-modules.JPG?raw=true" alt=""></p></li><li><p>盡量避免使用 <code>export default</code>，這將導致所有 default 中的相關功能無法正確被摘除</p><p><img src="https://github.com/jwlearn1994/image-uploader/blob/main/2022/04/export-default-mistake.JPG?raw=true" alt=""></p></li></ol><h2 id="module-federation" tabindex="-1"><a class="header-anchor" href="#module-federation" aria-hidden="true">#</a> Module Federation</h2><p>在 Webpack 5 中加入的新功能，大概定義如下</p><ul><li>Multiple separate builds should form a single application</li><li>Separate builds should not have dependencies between each other, so they can be developed and deployed individually</li><li>This is often known as <code>Micro-Frontends</code>, but is not limited to that</li></ul><p>從定義可以知道是一種讓應用程式拆解遷移使用的一個技術，可以讓元件複用性大幅提升，觀念上會有 Host, Remote 兩個對象，使用如下方式在構建專案時就需要事先定義好各自的關係</p><p><img src="https://raw.githubusercontent.com/jwlearn1994/image-uploader/main/2022/04/module-federation-demo.JPG" alt=""></p><p>官網也有給不錯的範例可以直接觀看</p>`,16),h={href:"https://stackblitz.com/github/webpack/webpack.js.org/tree/master/examples/module-federation?terminal=start&terminal=",target:"_blank",rel:"noopener noreferrer"},b=e("h2",{id:"動手實踐",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#動手實踐","aria-hidden":"true"},"#"),a(" 動手實踐")],-1),v={href:"https://github.com/jwlearn1994/webpack5-demo",target:"_blank",rel:"noopener noreferrer"},g=p('<ul><li><p>Basic - 基本 js 編譯打包</p></li><li><p>Babel - 基本 js 安裝 <code>babel-loader</code> 編譯打包</p></li><li><p>CSS - 搭配 <code>style-loader</code>, <code>css-loader</code> 處理 <code>.css</code> 檔案</p></li><li><p>HTML - 搭配 <code>html-webpack-plugin</code>, <code>webpack-dev-server</code> 啟動開發伺服器與 html 模板</p></li><li><p>React - 安裝 <code>@babel/preset-react</code> , <code>react</code>, <code>react-dom</code>, <code>styled-components</code> 編譯 <code>jsx</code></p></li><li><p>Vue - 安裝 <code>vue</code>, <code>@vue/compiler-sfc</code>, <code>vue-loader</code> 處理 Vue Single File 編譯</p></li><li><p>Vue Ts - 安裝 <code>typescript</code>, <code>ts-loader</code> 編譯 Typescript</p></li><li><p>Vue Ts Eslint - 安裝 <code>eslint</code> 編譯 Typescript，並使用 eslint 除錯</p></li><li><p>Module Federation - 配置基礎 React, Vue 專案並實現 Module Federation 基本配置</p></li></ul><h2 id="" tabindex="-1"><a class="header-anchor" href="#" aria-hidden="true">#</a></h2><h2 id="進階實踐" tabindex="-1"><a class="header-anchor" href="#進階實踐" aria-hidden="true">#</a> 進階實踐</h2><p>如果你看完以上範例還是不過癮，歡迎看看進階實踐，動手實現一個簡易版本的 Bundler 試試吧~ 絕對成就感滿滿，毫無頭緒的話，也可以參考我的實現版本玩玩看喔!</p>',4),y={href:"https://github.com/jwlearn1994/tiny-bundler",target:"_blank",rel:"noopener noreferrer"},f=e("h2",{id:"結論",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#結論","aria-hidden":"true"},"#"),a(" 結論")],-1),w=e("p",null,"其實學習 Webpack 的過程中能夠學到非常多的知識，不論是 Nodejs 的使用或架構面的學習都對日常開發非常有幫助，學習 Webpack 的過程很艱辛，但一步一步學起來的成就感是很難用言語形容",-1),j=e("p",null,[a("希望大家都能上手並愛上 Webpack，雖然相比於 Vite, Snowpack 等等又潮又香的 "),e("code",null,"ESModule"),a(" 新技術正在逐漸搶佔各大論壇版面，Webpack 的許多實踐與概念仍然是非常有參考價值的，在追隨潮流的同時，不仿回頭看看這個編譯界的老大哥吧～")],-1),x=e("p",null,"今天就分享到這邊摟，謝謝大家收看～我們下篇文章再見拉！=V=",-1),_=e("h2",{id:"參考",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#參考","aria-hidden":"true"},"#"),a(" 參考")],-1),W={href:"https://webpack.js.org/",target:"_blank",rel:"noopener noreferrer"};function S(M,P){const t=o("SocialBlock"),s=o("ExternalLinkIcon");return l(),c("div",null,[d,n(t,{hashtags:"javascript,webpack,vue,react,module-federation"}),u,e("p",null,[a("Webpack 使用 "),e("a",k,[a("enhanced-resolve"),n(s)]),a(" 來處理檔案路徑")]),m,e("ul",null,[e("li",null,[e("a",h,[a("See Online Demo"),n(s)])])]),b,e("p",null,[a("礙於篇幅關係，相關練習會放到("),e("a",v,[a("我的 Github 小號"),n(s)]),a(") 中，想看看具體怎麼使用的童鞋可以去看看收藏摟，主要範例會包含以下清單：")]),g,e("p",null,[e("strong",null,[e("a",y,[a("GitHub - jwlearn1994/tiny-bundler: A practice to create static module bundler"),n(s)])])]),f,w,j,x,n(t,{hashtags:"javascript,webpack,vue,react,module-federation"}),_,e("ul",null,[e("li",null,[e("a",W,[a("Webpack Documentation"),n(s)])])])])}const V=i(r,[["render",S],["__file","most-easy-webpack-basic-intro.html.vue"]]);export{V as default};