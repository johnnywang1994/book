import{_ as i,r as o,o as l,c,a as n,b as e,d as a,e as p}from"./app.c5f5e7d3.js";const r={},d=e("h1",{id:"\u53F2\u4E0A\u6700\u7C21\u55AE\u7684-webpack-5-\u6559\u5B78",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#\u53F2\u4E0A\u6700\u7C21\u55AE\u7684-webpack-5-\u6559\u5B78","aria-hidden":"true"},"#"),a(" \u53F2\u4E0A\u6700\u7C21\u55AE\u7684 Webpack 5 \u6559\u5B78")],-1),u=p(`<h2 id="\u524D\u8A00" tabindex="-1"><a class="header-anchor" href="#\u524D\u8A00" aria-hidden="true">#</a> \u524D\u8A00</h2><p>\u4ECA\u5929\u9019\u7BC7\u4E3B\u984C\u7B97\u662F\u670B\u53CB\u5011\u6572\u7897\u8A31\u4E45\uFF0C\u4F46\u6211\u4E00\u76F4\u6709\u4E00\u500B\u5FC3\u7406\u9670\u5F71\u4E0D\u6562\u89F8\u78B0\u7684\u4E00\u500B\u4E3B\u984C\uFF0C\u7562\u7ADF\u89E3\u8AAA\u9019\u500B\u4E3B\u984C\u7684\u5927\u4F6C\u771F\u7684\u975E\u5E38\u591A\uFF0C\u4E5F\u975E\u5E38\u8A73\u7D30\uFF0C\u5BE6\u5728\u662F\u4E0D\u6562\u737B\u919C\uFF0C\u4F46\u60F3\u4E86\u60F3\uFF0C\u9084\u662F\u6C7A\u5B9A\u5E0C\u671B\u80FD\u8DE8\u51FA\u9019\u4E00\u6B65\uFF0C\u7528\u6211\u81EA\u5DF1\u7684\u65B9\u5F0F\u8DDF\u7406\u89E3\u4F86\u8AAA\u660E\u4E00\u904D\u3002</p><p>\u4E00\u76F4\u4EE5\u4F86 Webpack \u88AB\u5F88\u591A\u4EBA\u8A6C\u75C5\u5F88\u96E3\u5B78\u3001\u9580\u6ABB\u9AD8\u3001\u96E3\u4EE5\u7406\u89E3\uFF0C\u6240\u4EE5\u6211\u5E0C\u671B\u80FD\u7528\u66F4\u7C21\u55AE\u6613\u61C2\u7684\u65B9\u5F0F\u8B93\u65B0\u624B\u90FD\u80FD\u5FEB\u901F\u4E86\u89E3 Webpack \u7684\u6574\u500B\u5168\u8C8C\u3002</p><h2 id="\u4EC0\u9EBC\u662F-webpack" tabindex="-1"><a class="header-anchor" href="#\u4EC0\u9EBC\u662F-webpack" aria-hidden="true">#</a> \u4EC0\u9EBC\u662F Webpack</h2><p>\u6839\u64DA\u5B98\u7DB2\u7684\u8AAA\u660E\u5C31\u9019\u6A23\u4E00\u53E5\u8A71\uFF1A<br><code>webpack is a static module bundler for modern JavaScript applications</code>\uFF08\u73FE\u4EE3 Javascript \u975C\u614B\u6A21\u7D44\u6253\u5305\u5DE5\u5177\uFF09</p><p>\u4E0D\u7528\u60F3\u5F97\u592A\u8907\u96DC\uFF0C\u5176\u5BE6\u5C31\u662F<code>\u5C07\u5E73\u5E38\u64B0\u5BEB\u7684 Javascript \u5957\u7528\u6A21\u7D44\u5316\u7684\u958B\u767C\u65B9\u5F0F\u5F8C\u6253\u5305\uFF08\u628A\u4F60\u7A0B\u5F0F\u78BC\u5168\u90E8\u585E\u5728\u4E00\u8D77\uFF09\u7684\u5DE5\u5177</code>\uFF0C\u7576\u7136\u5C0D\u65BC\u4E00\u4E9B\u512A\u5316\u5834\u666F\u6703\u518D\u5C07\u7A0B\u5F0F\u78BC\u62C6\u5206\u958B\u4F86 <code>Code Splitting</code>\uFF0C\u4F46\u90A3\u53C8\u662F\u53E6\u4E00\u4EF6\u4E8B\u4E86</p><h2 id="\u70BA\u4F55\u9700\u8981-webpack" tabindex="-1"><a class="header-anchor" href="#\u70BA\u4F55\u9700\u8981-webpack" aria-hidden="true">#</a> \u70BA\u4F55\u9700\u8981 Webpack</h2><p>\u53EF\u80FD\u6709\u4E9B\u670B\u53CB\u6703\u597D\u5947\uFF1A\u963F\u672C\u4F86\u5C31\u662F\u5168\u90E8\u5BEB\u5728\u4E00\u8D77\u4E86\uFF0C\u6211\u5E79\u561B\u518D\u53BB\u7528\u4E00\u500B\u5DE5\u5177\u628A\u4ED6\u7D81\u5728\u4E00\u8D77\uFF1F\u5176\u5BE6 Webpack \u7684\u4E3B\u8981\u610F\u7FA9\u4E26\u4E0D\u55AE\u55AE\u53EA\u662F<code>\u6253\u5305</code>\uFF0C\u800C\u662F\u524D\u4E00\u53E5<code>\u5957\u7528\u6A21\u7D44\u5316\u7684\u958B\u767C\u65B9\u5F0F</code></p><p>Webpack \u771F\u6B63\u7684\u50F9\u503C\u662F\u5728\u65BC\u8B93\u50B3\u7D71\u700F\u89BD\u5668\u9084\u6C92\u6709 <code>ESModule</code> \u7684\u5E74\u4EE3\uFF0C\u53EF\u4EE5\u5728\u672C\u5730\u4F7F\u7528\u6A21\u7D44\u5316\u7684\u958B\u767C\u9AD4\u9A57\uFF0C\u512A\u5316\u6574\u500B\u958B\u767C\u7684\u54C1\u8CEA\u8207\u53EF\u7DAD\u8B77\u6027\uFF0C\u4E26\u4E14\u900F\u904E <code>Nodejs</code> \u7684\u7DE8\u8B6F\u80FD\u529B\uFF0C\u767C\u5C55\u51FA\u5404\u5F0F\u7684\u7DE8\u8B6F\u529F\u80FD\uFF0C\u6BD4\u5982 <code>Sass</code>, <code>Typescript</code> \u7B49\u7B49\uFF0C\u66F4\u9032\u4E00\u6B65\u63D0\u5347\u4E86\u6574\u500B\u524D\u7AEF\u7684\u958B\u767C\u80FD\u529B\uFF0C\u53EF\u4EE5\u8AAA\u50CF <code>Webpack</code>\uFF0C\u6216\u662F\u66F4\u65E9\u4EE5\u524D\u7684 <code>Gulp</code>, <code>Grunp</code> \u7B49\u7B49\u5DE5\u5177\u628A\u524D\u7AEF\u958B\u767C\u5F80\u53E6\u4E00\u500B\u5C64\u6B21\u63D0\u5347\u4E86</p><h2 id="\u5B89\u88DD-webpack" tabindex="-1"><a class="header-anchor" href="#\u5B89\u88DD-webpack" aria-hidden="true">#</a> \u5B89\u88DD Webpack</h2><p>\u900F\u904E npm \u9032\u884C\u5B89\u88DD\uFF0C\u901A\u5E38\u6703\u540C\u6642\u5B89\u88DD <code>webpack</code>, <code>webpack-cli</code> \u9019\u5169\u500B\uFF0C\u5F8C\u8005\u63D0\u4F9B\u65B9\u4FBF\u7684\u6307\u4EE4\u5217\u547D\u4EE4\u8B93\u6211\u5011\u80FD\u65B9\u4FBF\u7684\u914D\u7F6E\u5728 <code>package.json</code> \u7684 <code>scripts</code> \u4E2D</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>$ <span class="token function">npm</span> <span class="token function">install</span> --save-dev webpack webpack-cli
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\u63A5\u8457\u5728\u5C08\u6848\u76EE\u9304\u4E0B\u65B0\u589E\u4E00\u500B <code>webpack.config.js</code> \u9019\u500B\u6A94\u6848\u540D\u7A31\u662F <code>webpack-cli</code> \u9810\u8A2D\u6703\u53BB\u641C\u7D22\u4F7F\u7528\u7684\uFF0C\u5982\u679C\u9700\u8981\u66F4\u6539\u914D\u7F6E\u7684\u8DEF\u5F91\uFF0C\u53EF\u4EE5\u4F7F\u7528 <code>--config</code> \u9019\u500B\u53C3\u6578\u6307\u5B9A</p><p>\u5B89\u88DD\u5B8C\u6210\u5F8C\u4F86\u914D\u7F6E\u4E00\u4E0B <code>package.json</code>\uFF0C<code>--watch</code> \u53C3\u6578\u6703\u81EA\u52D5\u76E3\u807D\u6211\u5011\u7684\u5165\u53E3\u6587\u4EF6\uFF08\u5305\u542B\u4F9D\u8CF4\uFF09\u8B8A\u5316\u91CD\u65B0\u518D\u7DE8\u8B6F\u4E00\u6B21\u5167\u5BB9</p><div class="language-json ext-json line-numbers-mode"><pre class="language-json"><code><span class="token punctuation">{</span>
    <span class="token property">&quot;scripts&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;dev&quot;</span><span class="token operator">:</span> <span class="token string">&quot;webpack --watch&quot;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="webpack-\u6838\u5FC3-concepts" tabindex="-1"><a class="header-anchor" href="#webpack-\u6838\u5FC3-concepts" aria-hidden="true">#</a> Webpack \u6838\u5FC3 Concepts</h2><p><img src="https://raw.githubusercontent.com/jwlearn1994/image-uploader/main/2022/03/14-16-51-08-\u622A\u5716 2022-03-14 \u4E0B\u53484.48.50.png" alt="\u622A\u5716 2022-03-14 \u4E0B\u53484.48.50.png"></p><p>\u5982\u4E0A\u5716\u6240\u793A\uFF0CWebpack \u6838\u5FC3\u4E3B\u8981\u5305\u542B\u4E94\u5927\u5143\u7D20\uFF0C\u63A5\u4E0B\u4F86\u6703\u4E00\u500B\u4E00\u500B\u5E36\u5927\u5BB6\u8A8D\u8B58\u4ED6\u5011</p><h2 id="mode" tabindex="-1"><a class="header-anchor" href="#mode" aria-hidden="true">#</a> Mode</h2><p>\u544A\u8A34 Webpack \u7576\u524D\u91DD\u5C0D\u7684\u7DE8\u8B6F\u60C5\u666F\u662F\u6B63\u5F0F\u3001\u958B\u767C\u6A21\u5F0F\uFF0C\u9019\u500B\u503C\u6703\u8B93 Webpack \u63A1\u53D6\u4E0D\u540C\u7684\u7DE8\u8B6F\u7B56\u7565\uFF0C\u6216\u662F\u7D66\u5176\u4ED6 Plugins \u8B80\u53D6\u4F7F\u7528</p><ul><li>available values: <code>production</code>, <code>development</code>, <code>none</code></li></ul><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">mode</span><span class="token operator">:</span> <span class="token string">&#39;development&#39;</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="entry" tabindex="-1"><a class="header-anchor" href="#entry" aria-hidden="true">#</a> Entry</h2><p>\u544A\u8A34 Webpack \u7DE8\u8B6F\u7684\u5165\u53E3\u4F4D\u7F6E\uFF0C\u652F\u63F4\u591A\u5165\u53E3\u914D\u7F6E</p><h3 id="single-entry" tabindex="-1"><a class="header-anchor" href="#single-entry" aria-hidden="true">#</a> Single entry</h3><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">entry</span><span class="token operator">:</span> <span class="token string">&#39;./path/to/my/entry/file.js&#39;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="multi-entry" tabindex="-1"><a class="header-anchor" href="#multi-entry" aria-hidden="true">#</a> Multi entry</h3><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">entry</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">app</span><span class="token operator">:</span> <span class="token string">&#39;./src/app.js&#39;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">adminApp</span><span class="token operator">:</span> <span class="token string">&#39;./src/adminApp.js&#39;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="plugins" tabindex="-1"><a class="header-anchor" href="#plugins" aria-hidden="true">#</a> Plugins</h2><p>\u4E00\u500B Webpack \u7DE8\u8B6F\u6D41\u7A0B\u4E2D\u53EF\u4EE5\u6709\u5F88\u591A plugins\uFF0C\u800C plugin \u80FD\u8B93\u958B\u767C\u8005\u5728 Webpack \u7684\u6574\u500B\u7DE8\u8B6F\u968E\u6BB5\u914D\u7F6E\u4E0D\u540C\u7684\u64CD\u4F5C\uFF0C\u6BD4\u5982\u63D0\u524D\u8655\u7406\u64CD\u4F5C\u7279\u5B9A\u8F38\u51FA disk \u7684\u6A94\u6848\u6216\u662F\u914D\u7F6E\u4E00\u4E9B\u5BE6\u7528\u7684\u5DE5\u5177\u5728\u7DE8\u8B6F\u7684\u904E\u7A0B\u4E2D\uFF0C\u503C\u5F97\u4E00\u63D0\u7684\u662F\uFF0CWebpack \u672C\u8EAB\u6574\u500B\u7DE8\u8B6F\u904E\u7A0B\u4E5F\u662F\u5EFA\u7ACB\u5728\u540C\u6A23\u7684\u9019\u500B Plugin \u7CFB\u7D71\u67B6\u69CB\u5E95\u4E0B\uFF0C\u53EF\u4EE5\u8AAA <code>Plugins</code> \u662F\u69CB\u6210\u6574\u500B Webpack \u7684\u9AA8\u5E79\u8981\u7D20</p><p>\u5E95\u4E0B\u662F\u4E00\u500B\u5957\u7528 <code>html-webpack-plugin</code> \u7684\u7BC4\u4F8B</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">const</span> HtmlWebpackPlugin <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;html-webpack-plugin&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">plugins</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token keyword">new</span> <span class="token class-name">HtmlWebpackPlugin</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
        <span class="token literal-property property">template</span><span class="token operator">:</span> <span class="token string">&#39;./path/to/my/index.html&#39;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="loaders" tabindex="-1"><a class="header-anchor" href="#loaders" aria-hidden="true">#</a> Loaders</h2><p>\u4E00\u500B Webpack \u7DE8\u8B6F\u6D41\u7A0B\u4E2D\u53EF\u4EE5\u6709\u5F88\u591A loaders\uFF0C\u800C\u6BCF\u500B loader \u662F\u4F5C\u70BA\u5C0D\u4E0D\u540C\u6A21\u7D44\u9032\u884C\u5BA2\u88FD\u5316\u7DE8\u8B6F\u6D41\u7A0B\u7684\u8F49\u8B6F\u5668\uFF0C\u4E26\u4E14 loaders \u5F7C\u6B64\u4E4B\u524D\u5177\u6709\u5148\u5F8C\u95DC\u4FC2\uFF0C\u5C0D\u65BC\u540C\u4E00\u985E\u578B\u7684\u6A94\u6848\u53EF\u4EE5\u5957\u7528\u591A\u500B loaders\uFF0C\u6BCF\u4E00\u500B loader \u7DE8\u8B6F\u5F8C\u6703\u5C07\u7D50\u679C\u9001\u5230\u4E0B\u4E00\u500B loader \u9032\u884C\u8655\u7406\u76F4\u5230\u6C92\u6709\u4E0B\u4E00\u500B\u70BA\u6B62</p><p>\u5E95\u4E0B\u662F\u4E00\u500B\u5957\u7528 <code>css-loader</code>, <code>style-loader</code>\u7684\u7BC4\u4F8B\uFF0C\u7BC4\u4F8B\u4E2D\u7684\u7DE8\u8B6F\u9806\u5E8F\u662F\u7531\u4E0B\u800C\u4E0A\uFF0C\u4E5F\u5C31\u662F\u5F9E\u9663\u5217\u7684\u5F8C\u65B9\u5F80\u524D\u8D70</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="output" tabindex="-1"><a class="header-anchor" href="#output" aria-hidden="true">#</a> Output</h2><p>\u544A\u8A34 Webpack \u5982\u4F55\u5C07\u7DE8\u8B6F\u5F8C\u7684\u6A94\u6848\u8F38\u51FA\u5230 disk\uFF08\u4E3B\u6A5F\u4F4D\u7F6E\uFF09\u4E2D\u3002</p><h3 id="\u55AE\u4E00\u8F38\u51FA" tabindex="-1"><a class="header-anchor" href="#\u55AE\u4E00\u8F38\u51FA" aria-hidden="true">#</a> \u55AE\u4E00\u8F38\u51FA</h3><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">output</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">path</span><span class="token operator">:</span> __dirname <span class="token operator">+</span> <span class="token string">&#39;/dist&#39;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">filename</span><span class="token operator">:</span> <span class="token string">&#39;bundle.js&#39;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="\u591A\u6A94\u6848\u8F38\u51FA" tabindex="-1"><a class="header-anchor" href="#\u591A\u6A94\u6848\u8F38\u51FA" aria-hidden="true">#</a> \u591A\u6A94\u6848\u8F38\u51FA</h3><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">entry</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">app</span><span class="token operator">:</span> <span class="token string">&#39;./src/app.js&#39;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">adminApp</span><span class="token operator">:</span> <span class="token string">&#39;./src/adminApp.js&#39;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token literal-property property">output</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">path</span><span class="token operator">:</span> __dirname <span class="token operator">+</span> <span class="token string">&#39;/dist&#39;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">filename</span><span class="token operator">:</span> <span class="token string">&#39;[name].js&#39;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u5230\u6B64\u6211\u5011\u7406\u89E3\u4E86 Webpack \u4E2D\u6700\u6838\u5FC3\u7684\u5E7E\u500B\u6982\u5FF5\u4E86\uFF0C\u73FE\u5728\u5C31\u53EF\u4EE5\u958B\u59CB\u4F86\u5BE6\u969B\u52D5\u624B\u4F86\u5BEB\u4E00\u4E9B\u7C21\u55AE\u7684\u7BC4\u4F8B\u645F\uFF5E</p><h2 id="webpack-modules" tabindex="-1"><a class="header-anchor" href="#webpack-modules" aria-hidden="true">#</a> Webpack Modules</h2><p>\u90A3\u54EA\u5BEB\u6771\u897F\u53EF\u4EE5\u88AB Webpack \u8996\u70BA\u4E00\u500B module \u8655\u7406\u5462? \u4EE5\u4E0B\u662F\u4E00\u4E9B\u5E38\u7528\u7684</p><ul><li>ES2015 import</li><li>CJS require</li><li>AMD define &amp; require</li><li>css @import</li><li>url() &amp; img src</li></ul><h2 id="module-resolution" tabindex="-1"><a class="header-anchor" href="#module-resolution" aria-hidden="true">#</a> Module Resolution</h2>`,47),k=a("Webpack \u4F7F\u7528 "),h={href:"https://www.npmjs.com/package/enhanced-resolve",target:"_blank",rel:"noopener noreferrer"},m=a("enhanced-resolve"),b=a(" \u4F86\u8655\u7406\u6A94\u6848\u8DEF\u5F91"),v=p(`<div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token comment">// Absolute path</span>
<span class="token keyword">import</span> <span class="token string">&#39;/local/home/abpath/file&#39;</span>
<span class="token keyword">import</span> <span class="token string">&#39;C:\\\\Users\\\\me&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token comment">// Relative path</span>
<span class="token keyword">import</span> <span class="token string">&#39;../local/home/repath/file&#39;</span>
<span class="token keyword">import</span> <span class="token string">&#39;./file&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token comment">// Module path</span>
<span class="token keyword">import</span> <span class="token string">&#39;module&#39;</span>
<span class="token keyword">import</span> <span class="token string">&#39;module/lib/file&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="tree-shaking" tabindex="-1"><a class="header-anchor" href="#tree-shaking" aria-hidden="true">#</a> Tree Shaking</h2><p>\u6240\u8B02 tree-shaking \u9867\u540D\u601D\u7FA9\u5C31\u662F\u5C07\u6211\u5011\u7684\u6A39\u4E0A\u7121\u7528\u7684\u8449\u7247\u6A21\u7D44\u6416\u843D\u3001\u6458\u9664\u5F97\u9019\u9EBC\u4E00\u500B\u6A5F\u5236\uFF0C\u4E5F\u7A31\u4F5C <code>**dead-code elimination**</code>\uFF0C\u5927\u81F4\u7684\u6D41\u7A0B\u5982\u4E0B\uFF1A</p><ol><li><p>\u975C\u614B\u89E3\u6790\uFF1Arelies on the static structure of <code>ES2015</code> syntax(export, import)</p></li><li><p>\u6A19\u8A3B\uFF1Ause optimization.usedExports to <code>mark dead code</code></p></li><li><p>\u79FB\u9664\uFF1Ause <code>TerserPlugin</code> to remove dead code(or UglifyPlugin\u2026etc)</p></li></ol><p>\u6A19\u8A3B\u524D\u5F8C\u5C0D\u6BD4\u5982\u4E0B\u5716</p><p><img src="https://raw.githubusercontent.com/jwlearn1994/image-uploader/main/2022/04/tree-shaking-mechanism.JPG" alt=""></p><p>\u800C\u5C0D\u65BC\u958B\u767C\u8005\u4F86\u8AAA\uFF0C\u6211\u5011\u66F4\u9700\u8981\u5C08\u6CE8\u5728 1. 2 \u9019\u5169\u500B\u90E8\u5206\uFF0C\u76E1\u91CF\u4F7F\u7528\u975C\u614B\u89E3\u6790\u7684\u65B9\u5F0F\uFF0C\u8B93\u5DE5\u5177\u80FD\u6B63\u78BA\u5B8C\u6210\u6A19\u8A3B\u591A\u9918\u7A0B\u5F0F\u78BC\u7684\u8A71\uFF0C\u5F8C\u7E8C\u79FB\u9664\u5C31\u4EA4\u7D66\u76F8\u95DC\u5957\u4EF6\u53BB\u5BE6\u73FE\u5C31\u884C\u4E86\uFF0C\u6240\u4EE5\u5BE6\u4F5C\u4E0A\u6211\u5011\u66F4\u95DC\u6CE8\u4EE5\u4E0B\u5E7E\u9EDE\uFF1A</p><ol><li><p>\u907F\u514D\u4E0D\u5FC5\u8981\u7684\u8B8A\u6578\u9644\u503C</p><p><img src="https://github.com/jwlearn1994/image-uploader/blob/main/2022/04/unused-value-assignment.JPG?raw=true" alt=""></p></li><li><p>\u6CE8\u610F\u4F7F\u7528 <strong>@babel/preset-env modules</strong> \u8A2D\u5B9A\uFF0C\u5C0E\u81F4\u7121\u6CD5\u4F7F\u7528\u975C\u614B\u89E3\u6790</p><p><img src="https://github.com/jwlearn1994/image-uploader/blob/main/2022/04/babel-mistake-modules.JPG?raw=true" alt=""></p></li><li><p>\u76E1\u91CF\u907F\u514D\u4F7F\u7528 <code>export default</code>\uFF0C\u9019\u5C07\u5C0E\u81F4\u6240\u6709 default \u4E2D\u7684\u76F8\u95DC\u529F\u80FD\u7121\u6CD5\u6B63\u78BA\u88AB\u6458\u9664</p><p><img src="https://github.com/jwlearn1994/image-uploader/blob/main/2022/04/export-default-mistake.JPG?raw=true" alt=""></p></li></ol><h2 id="module-federation" tabindex="-1"><a class="header-anchor" href="#module-federation" aria-hidden="true">#</a> Module Federation</h2><p>\u5728 Webpack 5 \u4E2D\u52A0\u5165\u7684\u65B0\u529F\u80FD\uFF0C\u5927\u6982\u5B9A\u7FA9\u5982\u4E0B</p><ul><li>Multiple separate builds should form a single application</li><li>Separate builds should not have dependencies between each other, so they can be developed and deployed individually</li><li>This is often known as <code>Micro-Frontends</code>, but is not limited to that</li></ul><p>\u5F9E\u5B9A\u7FA9\u53EF\u4EE5\u77E5\u9053\u662F\u4E00\u7A2E\u8B93\u61C9\u7528\u7A0B\u5F0F\u62C6\u89E3\u9077\u79FB\u4F7F\u7528\u7684\u4E00\u500B\u6280\u8853\uFF0C\u53EF\u4EE5\u8B93\u5143\u4EF6\u8907\u7528\u6027\u5927\u5E45\u63D0\u5347\uFF0C\u89C0\u5FF5\u4E0A\u6703\u6709 Host, Remote \u5169\u500B\u5C0D\u8C61\uFF0C\u4F7F\u7528\u5982\u4E0B\u65B9\u5F0F\u5728\u69CB\u5EFA\u5C08\u6848\u6642\u5C31\u9700\u8981\u4E8B\u5148\u5B9A\u7FA9\u597D\u5404\u81EA\u7684\u95DC\u4FC2</p><p><img src="https://raw.githubusercontent.com/jwlearn1994/image-uploader/main/2022/04/module-federation-demo.JPG" alt=""></p><p>\u5B98\u7DB2\u4E5F\u6709\u7D66\u4E0D\u932F\u7684\u7BC4\u4F8B\u53EF\u4EE5\u76F4\u63A5\u89C0\u770B</p>`,16),g={href:"https://stackblitz.com/github/webpack/webpack.js.org/tree/master/examples/module-federation?terminal=start&terminal=",target:"_blank",rel:"noopener noreferrer"},y=a("See Online Demo"),_=e("h2",{id:"\u52D5\u624B\u5BE6\u8E10",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#\u52D5\u624B\u5BE6\u8E10","aria-hidden":"true"},"#"),a(" \u52D5\u624B\u5BE6\u8E10")],-1),f=a("\u7919\u65BC\u7BC7\u5E45\u95DC\u4FC2\uFF0C\u76F8\u95DC\u7DF4\u7FD2\u6703\u653E\u5230("),w={href:"https://github.com/jwlearn1994/webpack5-demo",target:"_blank",rel:"noopener noreferrer"},j=a("\u6211\u7684 Github \u5C0F\u865F"),x=a(") \u4E2D\uFF0C\u60F3\u770B\u770B\u5177\u9AD4\u600E\u9EBC\u4F7F\u7528\u7684\u7AE5\u978B\u53EF\u4EE5\u53BB\u770B\u770B\u6536\u85CF\u645F\uFF0C\u4E3B\u8981\u7BC4\u4F8B\u6703\u5305\u542B\u4EE5\u4E0B\u6E05\u55AE\uFF1A"),W=p('<ul><li><p>Basic - \u57FA\u672C js \u7DE8\u8B6F\u6253\u5305</p></li><li><p>Babel - \u57FA\u672C js \u5B89\u88DD <code>babel-loader</code> \u7DE8\u8B6F\u6253\u5305</p></li><li><p>CSS - \u642D\u914D <code>style-loader</code>, <code>css-loader</code> \u8655\u7406 <code>.css</code> \u6A94\u6848</p></li><li><p>HTML - \u642D\u914D <code>html-webpack-plugin</code>, <code>webpack-dev-server</code> \u555F\u52D5\u958B\u767C\u4F3A\u670D\u5668\u8207 html \u6A21\u677F</p></li><li><p>React - \u5B89\u88DD <code>@babel/preset-react</code> , <code>react</code>, <code>react-dom</code>, <code>styled-components</code> \u7DE8\u8B6F <code>jsx</code></p></li><li><p>Vue - \u5B89\u88DD <code>vue</code>, <code>@vue/compiler-sfc</code>, <code>vue-loader</code> \u8655\u7406 Vue Single File \u7DE8\u8B6F</p></li><li><p>Vue Ts - \u5B89\u88DD <code>typescript</code>, <code>ts-loader</code> \u7DE8\u8B6F Typescript</p></li><li><p>Vue Ts Eslint - \u5B89\u88DD <code>eslint</code> \u7DE8\u8B6F Typescript\uFF0C\u4E26\u4F7F\u7528 eslint \u9664\u932F</p></li><li><p>Module Federation - \u914D\u7F6E\u57FA\u790E React, Vue \u5C08\u6848\u4E26\u5BE6\u73FE Module Federation \u57FA\u672C\u914D\u7F6E</p></li></ul><h2 id="" tabindex="-1"><a class="header-anchor" href="#" aria-hidden="true">#</a></h2><h2 id="\u9032\u968E\u5BE6\u8E10" tabindex="-1"><a class="header-anchor" href="#\u9032\u968E\u5BE6\u8E10" aria-hidden="true">#</a> \u9032\u968E\u5BE6\u8E10</h2><p>\u5982\u679C\u4F60\u770B\u5B8C\u4EE5\u4E0A\u7BC4\u4F8B\u9084\u662F\u4E0D\u904E\u766E\uFF0C\u6B61\u8FCE\u770B\u770B\u9032\u968E\u5BE6\u8E10\uFF0C\u52D5\u624B\u5BE6\u73FE\u4E00\u500B\u7C21\u6613\u7248\u672C\u7684 Bundler \u8A66\u8A66\u5427~ \u7D55\u5C0D\u6210\u5C31\u611F\u6EFF\u6EFF\uFF0C\u6BEB\u7121\u982D\u7DD2\u7684\u8A71\uFF0C\u4E5F\u53EF\u4EE5\u53C3\u8003\u6211\u7684\u5BE6\u73FE\u7248\u672C\u73A9\u73A9\u770B\u5594!</p>',4),S={href:"https://github.com/jwlearn1994/tiny-bundler",target:"_blank",rel:"noopener noreferrer"},M=a("GitHub - jwlearn1994/tiny-bundler: A practice to create static module bundler"),P=e("h2",{id:"\u7D50\u8AD6",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#\u7D50\u8AD6","aria-hidden":"true"},"#"),a(" \u7D50\u8AD6")],-1),E=e("p",null,"\u5176\u5BE6\u5B78\u7FD2 Webpack \u7684\u904E\u7A0B\u4E2D\u80FD\u5920\u5B78\u5230\u975E\u5E38\u591A\u7684\u77E5\u8B58\uFF0C\u4E0D\u8AD6\u662F Nodejs \u7684\u4F7F\u7528\u6216\u67B6\u69CB\u9762\u7684\u5B78\u7FD2\u90FD\u5C0D\u65E5\u5E38\u958B\u767C\u975E\u5E38\u6709\u5E6B\u52A9\uFF0C\u5B78\u7FD2 Webpack \u7684\u904E\u7A0B\u5F88\u8271\u8F9B\uFF0C\u4F46\u4E00\u6B65\u4E00\u6B65\u5B78\u8D77\u4F86\u7684\u6210\u5C31\u611F\u662F\u5F88\u96E3\u7528\u8A00\u8A9E\u5F62\u5BB9",-1),V=e("p",null,[a("\u5E0C\u671B\u5927\u5BB6\u90FD\u80FD\u4E0A\u624B\u4E26\u611B\u4E0A Webpack\uFF0C\u96D6\u7136\u76F8\u6BD4\u65BC Vite, Snowpack \u7B49\u7B49\u53C8\u6F6E\u53C8\u9999\u7684 "),e("code",null,"ESModule"),a(" \u65B0\u6280\u8853\u6B63\u5728\u9010\u6F38\u6436\u4F54\u5404\u5927\u8AD6\u58C7\u7248\u9762\uFF0CWebpack \u7684\u8A31\u591A\u5BE6\u8E10\u8207\u6982\u5FF5\u4ECD\u7136\u662F\u975E\u5E38\u6709\u53C3\u8003\u50F9\u503C\u7684\uFF0C\u5728\u8FFD\u96A8\u6F6E\u6D41\u7684\u540C\u6642\uFF0C\u4E0D\u4EFF\u56DE\u982D\u770B\u770B\u9019\u500B\u7DE8\u8B6F\u754C\u7684\u8001\u5927\u54E5\u5427\uFF5E")],-1),T=e("p",null,"\u4ECA\u5929\u5C31\u5206\u4EAB\u5230\u9019\u908A\u645F\uFF0C\u8B1D\u8B1D\u5927\u5BB6\u6536\u770B\uFF5E\u6211\u5011\u4E0B\u7BC7\u6587\u7AE0\u518D\u898B\u62C9\uFF01=V=",-1),q=e("h2",{id:"\u53C3\u8003",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#\u53C3\u8003","aria-hidden":"true"},"#"),a(" \u53C3\u8003")],-1),B={href:"https://webpack.js.org/",target:"_blank",rel:"noopener noreferrer"},G=a("Webpack Documentation");function J(A,C){const t=o("SocialBlock"),s=o("ExternalLinkIcon");return l(),c("div",null,[d,n(t,{hashtags:"javascript,webpack,vue,react,module-federation"}),u,e("p",null,[k,e("a",h,[m,n(s)]),b]),v,e("ul",null,[e("li",null,[e("a",g,[y,n(s)])])]),_,e("p",null,[f,e("a",w,[j,n(s)]),x]),W,e("p",null,[e("strong",null,[e("a",S,[M,n(s)])])]),P,E,V,T,n(t,{hashtags:"javascript,webpack,vue,react,module-federation"}),q,e("ul",null,[e("li",null,[e("a",B,[G,n(s)])])])])}var F=i(r,[["render",J],["__file","most-easy-webpack-basic-intro.html.vue"]]);export{F as default};