import{_ as t,r as o,o as p,c,a as e,b as n,d as s,e as i}from"./app.c5f5e7d3.js";const l={},r=n("h1",{id:"safari-\u4F7F\u7528-animation-\u6642\u52D5\u614B\u7522\u751F-rem-\u7684\u5751",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#safari-\u4F7F\u7528-animation-\u6642\u52D5\u614B\u7522\u751F-rem-\u7684\u5751","aria-hidden":"true"},"#"),s(" Safari \u4F7F\u7528 animation \u6642\u52D5\u614B\u7522\u751F rem \u7684\u5751")],-1),u=n("h6",{id:"tags-css-rem-animation",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#tags-css-rem-animation","aria-hidden":"true"},"#"),s(" tags: "),n("code",null,"CSS"),s(),n("code",null,"rem"),s(),n("code",null,"animation")],-1),d=i(`<p>\u672C\u7BC7\u8A95\u751F\u65BC\u540C\u4E8B\u65E5\u5E38\u958B\u767C\u52D5\u756B\u6642\u9047\u5230\u7684\u554F\u984C\uFF0C\u89BA\u5F97\u662F\u500B\u4E0D\u932F\u7684\u4E3B\u984C\uFF0C\u8A18\u9304\u4E0B\u4F86\uFF1A</p><p>\u4E3B\u8981\u9700\u6C42\u5F88\u7C21\u55AE\uFF0C\u5C31\u53EA\u662F\u4F7F\u7528 <code>@keyframes</code> \b\u5C0D\u5143\u7D20\u9032\u884C\u4E0A\u4E0B\u61F8\u6D6E\u7684\u6548\u679C\u3002\u4E26\u4E14\u6D6E\u52D5\u7684\u9577\u5EA6\u55AE\u4F4D\u4F7F\u7528\u7684\u662F\u52D5\u614B\u751F\u6210\u7684 rem\u3002</p><blockquote><p>\u52D5\u614B\u751F\u6210 rem \u7684\u610F\u601D\u662F\uFF0C\u4F7F\u7528 js \u4E26\u6839\u64DA\u756B\u9762\u87A2\u5E55\u5C3A\u5BF8\u8B8A\u5316\uFF0C\u52D5\u614B\u8ABF\u6574 <code>html</code> \u7684 <code>font-size</code> \u5927\u5C0F\uFF0C\u4E26\u5728\u5167\u90E8\u90FD\u4F7F\u7528 rem \u4F86\u4F5C\u70BA\u5927\u5C0F\u9577\u5EA6\u7B49\u5C3A\u5BF8\u4F9D\u8CF4\uFF0C\u85C9\u6B64\u9054\u5230\u6574\u9AD4\u756B\u9762\u6587\u5B57\u5716\u7247\u6BD4\u4F8B\u7684\u81EA\u9069\u61C9\u3002</p></blockquote><h2 id="\u65B9\u6CD5\u4E00" tabindex="-1"><a class="header-anchor" href="#\u65B9\u6CD5\u4E00" aria-hidden="true">#</a> \u65B9\u6CD5\u4E00</h2><p>\u7B2C\u4E00\u7A2E\u4F5C\u6CD5\u5982\u4E0B\uFF1A</p><div class="language-html ext-html line-numbers-mode"><pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>demo<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>\u5143\u7D20<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-scss ext-scss line-numbers-mode"><pre class="language-scss"><code><span class="token comment">// \u5047\u8A2D\u7576\u524D\u756B\u9762 html font-size \u662F 100px\uFF0C\u4E26\u4E14\u6703\u96A8\u8457\u756B\u9762\u653E\u5927\u7E2E\u5C0F\u800C\u8B8A\u5927\u8B8A\u5C0F</span>
<span class="token selector">html </span><span class="token punctuation">{</span>
  <span class="token property">font-size</span><span class="token punctuation">:</span> 100px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">#id </span><span class="token punctuation">{</span>
  <span class="token property">position</span><span class="token punctuation">:</span> absolute<span class="token punctuation">;</span>
  <span class="token property">top</span><span class="token punctuation">:</span> 0.3rem<span class="token punctuation">;</span>
  <span class="token property">animation</span><span class="token punctuation">:</span> floating 1s linear infinite<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token atrule"><span class="token rule">@keyframes</span> floating</span> <span class="token punctuation">{</span>
  <span class="token keyword">from</span> <span class="token punctuation">{</span>
    <span class="token property">top</span><span class="token punctuation">:</span> 0.28rem<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token selector">to </span><span class="token punctuation">{</span>
    <span class="token property">top</span><span class="token punctuation">:</span> 0.32rem<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u6211\u5011\u9810\u671F\u5143\u7D20\u6703\u5728 0.28 ~ 0.32rem \u7684\u7BC4\u570D\u5167\u4E0A\u4E0B\u6D6E\u52D5\u3002\u5BE6\u969B\u958B\u555F\u700F\u89BD\u5668\u4E5F\u78BA\u5BE6\u6C92\u6709\u554F\u984C\u3002</p><p>\u4F46\u662F\uFF01\uFF01\uFF0C\u5982\u679C\u53EA\u662F\u9019\u9EBC\u7C21\u55AE\u5C31\u4E0D\u7528\u9019\u7BC7\u8A18\u9304\u4E86\uFF0C\u7576\u4F7F\u7528 <code>Safari</code> \u700F\u89BD\u5668\u958B\u555F\u6642\uFF0C\u6703\u767C\u73FE\u53EA\u6709\u4E00\u958B\u59CB\u9032\u5165\u756B\u9762\u6642\u6703\u662F\u6B63\u78BA\u7684\u4F4D\u7F6E\uFF0C\u4E4B\u5F8C\u4E0D\u8AD6\u756B\u9762\u653E\u5927\u7E2E\u5C0F\uFF0C\u61F8\u6D6E\u4F4D\u7F6E\u4F3C\u4E4E\u4E0D\u6703\u96A8\u8457\u756B\u9762\u653E\u5927\u6216\u7E2E\u5C0F\u800C\u8ABF\u6574\u3002</p><p>\u7167\u7406\u4F86\u8AAA\uFF0C\u6D41\u7A0B\u61C9\u8A72\u50CF\u4E0B\u9762\u9019\u6A23\uFF1A</p><blockquote><p>\u756B\u9762 resize -&gt; rem \u52D5\u614B\u8B8A\u5927\u6216\u8B8A\u5C0F -&gt; animation \u8A08\u7B97\u8B8A\u5316 -&gt; \u5143\u7D20\u4F4D\u7F6E\u4FEE\u6B63</p></blockquote><p>\u4F46\u4E8B\u8207\u9858\u9055\uFF0C\u4ED6\u5C31\u662F\u8DD1\u5230\u4E00\u500B\u5F88\u602A\u3002</p><p><strong>\u767C\u751F\u539F\u56E0</strong></p><p>\u7D93\u6E2C\u8A66\u5F8C\u4E86\u89E3\u767C\u751F\u539F\u56E0\u662F\u56E0\u70BA <code>Safari</code> \u6703\u5C07\u975C\u614B CSS \u7684\u5C3A\u5BF8\u5FEB\u53D6\u8D77\u4F86\uFF0C\u9801\u9762\u7B2C\u4E00\u6B21\u8F09\u5165\u5F8C\uFF0C\u70BA\u4E86\u63D0\u5347\u6548\u80FD\uFF0C<code>Safari</code> \u628A\u4E00\u4E9B\u975C\u614B CSS \u5FEB\u53D6\u8D77\u4F86\uFF0C\u52A0\u5FEB\u4E0B\u6B21\u8F09\u5165\u7684\u901F\u5EA6\uFF0C\u800C\u6240\u8B02\u7684 <code>\u975C\u614B CSS</code> \u7A76\u7ADF\u5305\u62EC\u4E86\u54EA\u4E9B\uFF1F\u5C0D\uFF0C\u9019\u5C31\u662F\u672C\u7BC7\u91CD\u9EDE\uFF01\uFF01\u5C0D\u65BC CSS \u4F86\u8AAA\uFF0C\u54EA\u4E9B\u662F\u52D5\u614B\u8CC7\u6E90\u3001\u54EA\u4E9B\u662F\u975C\u614B\u8CC7\u6E90\u5FC5\u9808\u7279\u5225\u52A0\u4EE5\u5206\u8FA8\u3002</p><p>\u4E0A\u9762\u7684 <code>top</code> \u5C6C\u6027\u5728 CSS \u4E2D\uFF0C\u5C31\u5C6C\u65BC\u975C\u614B\u8CC7\u6E90\uFF0C\u53EA\u6703\u7D93\u904E\u4E00\u6B21\u7684\u700F\u89BD\u5668\u8A08\u7B97\uFF0C\u4E26\u4E14\u88AB\u5FEB\u53D6\u8D77\u4F86\uFF0C\u4F46\u88FD\u4F5C\u52D5\u756B\u6642\uFF0C\u6211\u5011\u5E0C\u671B\u7684\u662F\u5728\u6BCF\u6B21\u756B\u9762\u8ABF\u6574\u5F8C\uFF0C\u90FD\u80FD\u81EA\u52D5\u9069\u61C9\uFF0C\u4E26\u4E14\u7DAD\u6301\u6700\u4F73\u6548\u80FD\u7684\u6771\u897F\uFF0C\u7576\u4ECA\u5929\u53EA\u8981\u5B9A\u4F4D\u5143\u7D20\u6642\uFF0C\u5C31\u662F\u4F7F\u7528\u975C\u614B\u8CC7\u6E90\u7684\u6642\u6A5F; \u4F46\u88FD\u4F5C\u52D5\u756B\u6642\uFF0C\u5982\u679C\u4F7F\u7528\u975C\u614B\u8CC7\u6E90\uFF0C\u6703\u9020\u6210\u6574\u500B CSS \u7684\u6574\u500B\u91CD\u65B0\u756B\u9762\u6E32\u67D3\uFF0C\u9019\u53C8\u727D\u6D89\u5230\u4E86 CSS \u6E32\u67D3\u91CD\u7E6A\u7684\u5206\u5C64 layout \u6982\u5FF5\u3002</p><blockquote><p>\u6BB5\u843D\u5927\u610F\uFF1A\u52D5\u756B\u4F7F\u7528\u52D5\u614B\u8CC7\u6E90\uFF0C\u5B9A\u4F4D\u4F7F\u7528\u975C\u614B\u8CC7\u6E90\u3002</p></blockquote><h2 id="\u65B9\u6CD5\u4E8C" tabindex="-1"><a class="header-anchor" href="#\u65B9\u6CD5\u4E8C" aria-hidden="true">#</a> \u65B9\u6CD5\u4E8C</h2><p>\u65B9\u6CD5\u4E8C\u5C31\u662F\u4F7F\u7528 CSS <code>transform</code> \u4F86\u9032\u884C\uFF0C\u7576\u4F7F\u7528 <code>transform</code> \u6642\uFF0C\u6211\u5011\u6703\u5229\u7528 scale, translate, rotate \u7B49\u7B49 CSS <strong><code>\u51FD\u6578</code></strong> \u4F86\u8A08\u7B97\u52D5\u756B\u5C6C\u6027\uFF0C\u800C\u9019\u500B\u51FD\u6578\uFF0C\u5728 CSS \u4E2D\u6703\u52D5\u614B\u6C42\u503C\uFF0C\u4E5F\u56E0\u6B64\u53EF\u4EE5\u89E3\u6C7A\u9019\u500B\u5FEB\u53D6\u554F\u984C\u3002</p><p>\u6539\u5BEB\u5982\u4E0B\uFF1A</p><div class="language-scss ext-scss line-numbers-mode"><pre class="language-scss"><code><span class="token atrule"><span class="token rule">@keyframes</span> floating</span> <span class="token punctuation">{</span>
  <span class="token keyword">from</span> <span class="token punctuation">{</span>
    <span class="token property">transform</span><span class="token punctuation">:</span> <span class="token function">translateY</span><span class="token punctuation">(</span>-0.02rem<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token selector">to </span><span class="token punctuation">{</span>
    <span class="token property">transform</span><span class="token punctuation">:</span> <span class="token function">translateY</span><span class="token punctuation">(</span>0.02rem<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u4F7F\u7528\u4E00\u6A23\u7684 rem \u4F86\u8A2D\u5B9A\uFF0C\u4F46\u9019\u6B21\u4E0D\u8AD6\u756B\u9762\u600E\u9EBC resize\uFF0C\u700F\u89BD\u5668\u90FD\u80FD\u5B8C\u7F8E\u7684\u5448\u73FE\u52D5\u756B\u8A72\u6709\u7684\u6548\u679C\u5C3A\u5BF8\u3002</p>`,21);function m(k,v){const a=o("SocialBlock");return p(),c("div",null,[r,u,e(a,{hashtags:"css,rem,animation"}),d,e(a,{hashtags:"css,rem,animation"})])}var h=t(l,[["render",m],["__file","animation-rem.html.vue"]]);export{h as default};