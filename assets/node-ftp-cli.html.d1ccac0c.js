import{_ as o,r as e,o as c,c as i,a,d as n,e as s,f as l}from"./app.34c1de08.js";const u={},r=n("h1",{id:"\u7528-nodejs-\u5BEB\u500B-ftp-command-line-\u5DE5\u5177",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#\u7528-nodejs-\u5BEB\u500B-ftp-command-line-\u5DE5\u5177","aria-hidden":"true"},"#"),s(" \u7528 Nodejs \u5BEB\u500B FTP command line \u5DE5\u5177")],-1),k=n("p",null,"\u61F6\u5F97\u6BCF\u6B21\u4E0A\u50B3\u6771\u897F\u5230 ftp server \u90FD\u8981\u6253\u958B filezilla \u5DE5\u5177\u55CE\uFF1F\u4E00\u8D77\u4F86\u52D5\u624B\u505A\u500B\u7C21\u55AE\u7684 ftp command line tool \u5427\uFF01",-1),d={href:"https://www.npmjs.com/package/ftp",target:"_blank",rel:"noopener noreferrer"},v=l(`<p>\u90A3\u5C31\u958B\u59CB\u52D5\u624B\u645F\uFF01</p><h2 id="\u5B89\u88DD\u4F9D\u8CF4" tabindex="-1"><a class="header-anchor" href="#\u5B89\u88DD\u4F9D\u8CF4" aria-hidden="true">#</a> \u5B89\u88DD\u4F9D\u8CF4</h2><p>\u4E3B\u8981\u4F9D\u8CF4\u5982\u4E0B</p><ul><li>ftp: ftp script tool</li><li>minimist: \u89E3\u6790 command line \u53C3\u6578</li></ul><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>$ <span class="token function">npm</span> init <span class="token parameter variable">-y</span>
$ <span class="token function">npm</span> <span class="token function">install</span> <span class="token function">ftp</span> minimist
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="ftp-\u9023\u7DDA" tabindex="-1"><a class="header-anchor" href="#ftp-\u9023\u7DDA" aria-hidden="true">#</a> FTP \u9023\u7DDA</h2><p>\u9996\u5148\u6211\u5011\u4F86\u5B8C\u6210\u57FA\u672C\u7684 ftp \u5957\u4EF6\u8A2D\u5B9A\u9023\u4E0A\u6211\u5011\u7684 FTP server\uFF0C\u5EFA\u7ACB\u4E00\u500B <code>ftp-utils.js</code></p><p><strong>ftp-utils.js</strong></p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">const</span> ftp <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;ftp&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// \u9023\u7DDA\u555F\u52D5</span>
<span class="token keyword">function</span> <span class="token function">initFtp</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// \u9023\u7DDA\u8A2D\u5B9A</span>
  <span class="token comment">// [ftp package config](https://www.npmjs.com/package/ftp)</span>
  <span class="token keyword">const</span> config <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">host</span><span class="token operator">:</span> <span class="token string">&#39;myftp-server.net&#39;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">port</span><span class="token operator">:</span> <span class="token number">21</span><span class="token punctuation">,</span>
    <span class="token literal-property property">user</span><span class="token operator">:</span> <span class="token string">&#39;johnny&#39;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">password</span><span class="token operator">:</span> <span class="token string">&#39;12345678&#39;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">keepalive</span><span class="token operator">:</span> <span class="token number">10000</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>

  <span class="token keyword">const</span> client <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ftp</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  client<span class="token punctuation">.</span><span class="token function">on</span><span class="token punctuation">(</span><span class="token string">&#39;ready&#39;</span><span class="token punctuation">,</span> <span class="token keyword">async</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">await</span> <span class="token function">onClientReady</span><span class="token punctuation">(</span>client<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// \u5B8C\u6210\u6307\u4EE4\u5F8C\u7D50\u675F</span>
    client<span class="token punctuation">.</span><span class="token function">end</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    spinner<span class="token punctuation">.</span><span class="token function">stop</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  client<span class="token punctuation">.</span><span class="token function">on</span><span class="token punctuation">(</span><span class="token string">&#39;error&#39;</span><span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">err</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    client<span class="token punctuation">.</span><span class="token function">end</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    spinner<span class="token punctuation">.</span><span class="token function">stop</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token comment">// \u555F\u52D5</span>
  client<span class="token punctuation">.</span><span class="token function">connect</span><span class="token punctuation">(</span>config<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// \u9023\u7DDA\u6210\u529F</span>
<span class="token keyword">function</span> <span class="token function">onClientReady</span><span class="token punctuation">(</span><span class="token parameter">client</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token comment">// \u53D6\u5F97\u5217\u8868\uFF0C\u9810\u8A2D\u53D6\u5F97\u6839\u76EE\u9304</span>
    client<span class="token punctuation">.</span><span class="token function">list</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">err<span class="token punctuation">,</span> list</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>err<span class="token punctuation">)</span> <span class="token keyword">throw</span> err<span class="token punctuation">;</span>
      <span class="token comment">// print result</span>
      console<span class="token punctuation">.</span><span class="token function">dir</span><span class="token punctuation">(</span>list<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token comment">// finish</span>
      <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  initFtp<span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u6B64\u6642\u6211\u5011\u5C31\u53EF\u4EE5\u76F4\u63A5\u547C\u53EB initFtp \u770B\u770B\u7D50\u679C\u645F\uFF5E</p><h2 id="\u63D0\u53D6-command-\u52D5\u4F5C" tabindex="-1"><a class="header-anchor" href="#\u63D0\u53D6-command-\u52D5\u4F5C" aria-hidden="true">#</a> \u63D0\u53D6 command \u52D5\u4F5C</h2><p>\u4F46\u73FE\u5728\u6307\u4EE4\u662F\u5BEB\u6B7B\u7684\uFF0C\u6211\u5011\u5E0C\u671B\u53EF\u4EE5\u4F9D\u7167\u6307\u4EE4\u4F86\u9054\u5230\u6307\u5B9A\u52D5\u4F5C\uFF0C\u9996\u5148\u9700\u8981\u63D0\u53D6\u51FA\u52D5\u4F5C\u7684\u90E8\u5206\u70BA\u4E00\u500B\u4E00\u500B\u7684\u52D5\u4F5C\u51FD\u6578\uFF0C\u52D5\u4F5C\u6211\u5011\u5C31\u6309\u7167 ftp \u5957\u4EF6\u7684 method \u4F86\u5207\u5272\u5427\uFF5E</p><p>\u53E6\u5916\u7531\u65BC\u539F\u672C\u7684 ftp \u65B9\u6CD5\u662F\u4F7F\u7528\u50B3\u7D71 callback \u65B9\u5F0F\uFF0C\u6211\u5011\u5E6B\u5B83\u90FD\u5305\u4E0A\u4E00\u5C64 promise \u65B9\u4FBF\u5F8C\u7E8C\u8ABF\u7528</p><p>\u63D0\u53D6 cwd \u5207\u63DB\u76EE\u9304\u52D5\u4F5C</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">cwd</span><span class="token punctuation">(</span><span class="token parameter">client<span class="token punctuation">,</span> dirpath</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
    client<span class="token punctuation">.</span><span class="token function">cwd</span><span class="token punctuation">(</span>dirpath<span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">err<span class="token punctuation">,</span> dir</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token punctuation">{</span> err<span class="token punctuation">,</span> dir <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u63D0\u53D6 list \u5217\u8868\u52D5\u4F5C</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">async</span> <span class="token keyword">function</span> <span class="token function">listFiles</span><span class="token punctuation">(</span><span class="token parameter">client<span class="token punctuation">,</span> dirpath</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">await</span> <span class="token function">cwd</span><span class="token punctuation">(</span>client<span class="token punctuation">,</span> dirpath<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    client<span class="token punctuation">.</span><span class="token function">list</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">err<span class="token punctuation">,</span> files</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token punctuation">{</span> err<span class="token punctuation">,</span> files <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u63A5\u8457\u6539\u4E00\u4E0B <code>ftp-utils.js</code>\uFF0C\u8B93 config \u9023\u7DDA\u8A2D\u5B9A\u4EE5\u53CA ready \u52D5\u4F5C\u5F9E\u5916\u90E8\u6CE8\u5165\uFF0C\u63D0\u5347\u8986\u7528\u80FD\u529B</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">const</span> ftp <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;ftp&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">function</span> <span class="token function">cwd</span><span class="token punctuation">(</span><span class="token parameter">client<span class="token punctuation">,</span> dirpath</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token comment">// ...</span>
<span class="token punctuation">}</span>

<span class="token keyword">async</span> <span class="token keyword">function</span> <span class="token function">listFiles</span><span class="token punctuation">(</span><span class="token parameter">client<span class="token punctuation">,</span> dirpath</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// ...</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">initFtp</span><span class="token punctuation">(</span><span class="token parameter">options</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> <span class="token punctuation">{</span> config<span class="token punctuation">,</span> <span class="token literal-property property">ready</span><span class="token operator">:</span> onClientReady <span class="token punctuation">}</span> <span class="token operator">=</span> options<span class="token punctuation">;</span>

  <span class="token keyword">const</span> client <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ftp</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  client<span class="token punctuation">.</span><span class="token function">on</span><span class="token punctuation">(</span><span class="token string">&#39;ready&#39;</span><span class="token punctuation">,</span> <span class="token keyword">async</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">await</span> <span class="token function">onClientReady</span><span class="token punctuation">(</span>client<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// \u5B8C\u6210\u6307\u4EE4\u5F8C\u7D50\u675F</span>
    client<span class="token punctuation">.</span><span class="token function">end</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    spinner<span class="token punctuation">.</span><span class="token function">stop</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  client<span class="token punctuation">.</span><span class="token function">on</span><span class="token punctuation">(</span><span class="token string">&#39;error&#39;</span><span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">err</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    client<span class="token punctuation">.</span><span class="token function">end</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    spinner<span class="token punctuation">.</span><span class="token function">stop</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token comment">// \u555F\u52D5</span>
  client<span class="token punctuation">.</span><span class="token function">connect</span><span class="token punctuation">(</span>config<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  cwd<span class="token punctuation">,</span>
  listFiles<span class="token punctuation">,</span>
  initFtp<span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u597D\uFF0C\u6211\u5011\u5148\u63D0\u53D6\u5230\u9019\u5C31\u597D\uFF0Cconfig \u4E4B\u5F8C\u6703\u5F9E\u6307\u4EE4\u57F7\u884C\u8655\u63D0\u53D6\uFF0Cready \u5247\u662F\u6211\u5011\u6307\u4EE4\u7684\u52D5\u4F5C\uFF0C\u63A5\u8457\u4F86\u5B8C\u6210\u89E3\u6790\u6307\u4EE4\u7684\u6B65\u9A5F\uFF5E</p><h2 id="\u89E3\u6790\u6307\u4EE4" tabindex="-1"><a class="header-anchor" href="#\u89E3\u6790\u6307\u4EE4" aria-hidden="true">#</a> \u89E3\u6790\u6307\u4EE4</h2><p>\u5EFA\u7ACB\u4E00\u652F <code>cli.js</code>\u8655\u7406\u6307\u4EE4\u52D5\u4F5C\uFF0C\u4E26\u8ABF\u7528\u525B\u525B\u62BD\u8C61\u5316\u7684 <code>initFtp</code>\uFF0C\u8A18\u5F97\u5728\u6700\u4E0A\u65B9\u52A0\u5165\u9019\u53E5\u5594 <code>#!/usr/bin/env node</code></p><p><strong>cli.js</strong></p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token hashbang comment">#!/usr/bin/env node</span>
<span class="token keyword">const</span> path <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;path&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> minimist <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;minimist&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> <span class="token punctuation">{</span> listFiles<span class="token punctuation">,</span> initFtp <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;./ftp-utils&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// \u63D0\u53D6\u53C3\u6578</span>
<span class="token keyword">const</span> argv <span class="token operator">=</span> <span class="token function">minimist</span><span class="token punctuation">(</span>process<span class="token punctuation">.</span>argv<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> ftpOptions <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token comment">// \u63D0\u53D6 --config \u53C3\u6578\u8DEF\u5F91\u70BA\u9023\u7DDA\u8A2D\u5B9A\u4F86\u6E90\uFF0C\u9810\u8A2D\u70BA\u6307\u4EE4\u57F7\u884C\u4F4D\u7F6E\u7684 ftp.config.js</span>
  <span class="token literal-property property">config</span><span class="token operator">:</span> <span class="token function">require</span><span class="token punctuation">(</span>path<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span>
    process<span class="token punctuation">.</span><span class="token function">cwd</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    argv<span class="token punctuation">.</span>config <span class="token operator">||</span> <span class="token string">&#39;ftp.config.js&#39;</span><span class="token punctuation">,</span>
  <span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token literal-property property">ready</span><span class="token operator">:</span> onClientReady<span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token comment">// client \u5F9E initFtp \u7D66\u5165</span>
<span class="token keyword">async</span> <span class="token keyword">function</span> <span class="token function">onClientReady</span><span class="token punctuation">(</span><span class="token parameter">client</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// --list [remotepath]</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>argv<span class="token punctuation">.</span>list<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;Fetching file list...\\n&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">const</span> <span class="token punctuation">{</span> files <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token function">listFiles</span><span class="token punctuation">(</span>client<span class="token punctuation">,</span> argv<span class="token punctuation">.</span>list<span class="token punctuation">)</span><span class="token punctuation">;</span>
    console<span class="token punctuation">.</span><span class="token function">dir</span><span class="token punctuation">(</span>files<span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">file</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> file<span class="token punctuation">.</span>name<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// \u555F\u52D5</span>
<span class="token function">initFtp</span><span class="token punctuation">(</span>ftpOptions<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="\u7D81\u5B9A-bin-\u547D\u4EE4" tabindex="-1"><a class="header-anchor" href="#\u7D81\u5B9A-bin-\u547D\u4EE4" aria-hidden="true">#</a> \u7D81\u5B9A bin \u547D\u4EE4</h2><p>\u6700\u5F8C\u5225\u5FD8\u4E86\u7D81\u5B9A\u6211\u5011\u7684\u6307\u4EE4\u5230 package.json \u7684 bin \u88E1\u9762\uFF0C\u7136\u5F8C\u518D\u7D42\u7AEF\u6A5F\u8F38\u5165 <code>npm link</code> \u5C31\u80FD\u628A\u9019\u500B bin \u6307\u4EE4\u7D66\u7D81\u5B9A\u5230\u5168\u5C40\u4E2D\u4F7F\u7528\u645F</p><div class="language-json ext-json line-numbers-mode"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;bin&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;myftp&quot;</span><span class="token operator">:</span> <span class="token string">&quot;cli.js&quot;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u8D95\u7DCA\u5728\u96A8\u4FBF\u4E00\u8655\u8A66\u8A66\uFF0C\u9996\u5148\u52A0\u5165\u9023\u7DDA\u8A2D\u5B9A</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">host</span><span class="token operator">:</span> <span class="token string">&#39;myftp-server.net&#39;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">port</span><span class="token operator">:</span> <span class="token number">21</span><span class="token punctuation">,</span>
  <span class="token literal-property property">user</span><span class="token operator">:</span> <span class="token string">&#39;johnny&#39;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">password</span><span class="token operator">:</span> <span class="token string">&#39;12345678&#39;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">keepalive</span><span class="token operator">:</span> <span class="token number">10000</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u63A5\u8457\u57F7\u884C\uFF0C\u5927\u529F\u544A\u6210\u62C9\uFF5E</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>$ myftp <span class="token parameter variable">--list</span> /htdocs
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="\u7D50\u8AD6" tabindex="-1"><a class="header-anchor" href="#\u7D50\u8AD6" aria-hidden="true">#</a> \u7D50\u8AD6</h2>`,32),m={href:"https://www.npmjs.com/package/node-ftp-cli",target:"_blank",rel:"noopener noreferrer"},b=n("h2",{id:"reference",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#reference","aria-hidden":"true"},"#"),s(" Reference")],-1),f={href:"https://www.npmjs.com/package/ftp",target:"_blank",rel:"noopener noreferrer"},h={href:"https://juejin.cn/post/6844903907001368583",target:"_blank",rel:"noopener noreferrer"};function g(y,w){const t=e("SocialBlock"),p=e("ExternalLinkIcon");return c(),i("div",null,[r,a(t,{hashtags:"javascript,nodejs,ftp"}),k,n("p",null,[s("\u4ECA\u5929\u9019\u7BC7\u4E3B\u8981\u662F\u7D00\u9304\u4F7F\u7528 npm package "),n("a",d,[s("ftp"),a(p)]),s(" \u88FD\u4F5C\u7684 command line tool\uFF0C\u7D50\u5408\u4E4B\u524D\u5B78\u5230\u7684 minimist \u89E3\u6790 process.argv \u8655\u7406\u6307\u4EE4\u5217\u547D\u4EE4")]),v,n("p",null,[s("\u9019\u7BC7\u8A95\u751F\u65BC\u53C3\u8003\u81EA\u7DB2\u8DEF\u5927\u5927\u6587\u7AE0\u4EE5\u53CA\u81EA\u5DF1\u7684\u4E00\u4E9B\u4FEE\u4FEE\u6539\u6539\uFF0C\u505A\u9EDE\u5C0F\u5DE5\u5177\u5E6B\u52A9\u65E5\u5E38\u958B\u767C\uFF0C\u8A73\u7D30\u5B8C\u6574\u6E90\u78BC\u5DF2\u958B\u6E90\u5728 npm \u4E0A\u645F"),n("a",m,[s("node-ftp-cli"),a(p)]),s("\uFF0C\u5E0C\u671B\u672C\u6587\u4E5F\u80FD\u8B93\u5927\u5BB6\u5C0D\u4E00\u4E9B\u6307\u4EE4\u5217\u5DE5\u5177\u66F4\u719F\u6089\u645F\uFF5E\u6211\u662F Johnny\uFF0C\u6211\u5011\u4E0B\u7BC7\u5206\u4EAB\u898B\uFF5E^_^")]),b,n("ul",null,[n("li",null,[n("a",f,[s("npm ftp"),a(p)])]),n("li",null,[n("a",h,[s("\u4F7F\u7528nodejs\u9023\u63A5ftp\u4E0A\u50B3\u4E0B\u8F09"),a(p)])])]),a(t,{hashtags:"javascript,nodejs,ftp"})])}const _=o(u,[["render",g],["__file","node-ftp-cli.html.vue"]]);export{_ as default};