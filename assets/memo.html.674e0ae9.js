import{_ as e,o as a,c as n,e as s}from"./app.c5f5e7d3.js";const t={},r=s(`<h1 id="graphql-memo" tabindex="-1"><a class="header-anchor" href="#graphql-memo" aria-hidden="true">#</a> GraphQL Memo</h1><p>\u9019\u908A\u6703\u8A18\u9304\u4E00\u4E9B\u6211\u5728\u5B78\u7FD2 GraphQL \u6642\u7684\u4E00\u4E9B\u500B\u4EBA\u5FC3\u5F97\u8DDF\u60F3\u6CD5\uFF5E</p><h2 id="\u5E6B\u52A9\u8A18\u61B6" tabindex="-1"><a class="header-anchor" href="#\u5E6B\u52A9\u8A18\u61B6" aria-hidden="true">#</a> \u5E6B\u52A9\u8A18\u61B6</h2><h3 id="field-\u8207-type-\u5230\u5E95\u5DEE\u5225\u5728\u54EA\u88E1" tabindex="-1"><a class="header-anchor" href="#field-\u8207-type-\u5230\u5E95\u5DEE\u5225\u5728\u54EA\u88E1" aria-hidden="true">#</a> field \u8207 type \u5230\u5E95\u5DEE\u5225\u5728\u54EA\u88E1</h3><p>field \u662F\u7D44\u6210 Object Type \u7684\u6B04\u4F4D\uFF0C type \u70BA field \u5C55\u73FE\u7684\u8CC7\u6599\u683C\u5F0F</p><h3 id="schema-\u6B04\u4F4D\u4E0D\u662F\u76F4\u63A5\u8DDF-db-table-\u6B04\u4F4D\u5C0D\u61C9-\u53EF\u4EE5\u6839\u64DA\u9700\u8981\u8ABF\u6574" tabindex="-1"><a class="header-anchor" href="#schema-\u6B04\u4F4D\u4E0D\u662F\u76F4\u63A5\u8DDF-db-table-\u6B04\u4F4D\u5C0D\u61C9-\u53EF\u4EE5\u6839\u64DA\u9700\u8981\u8ABF\u6574" aria-hidden="true">#</a> Schema \u6B04\u4F4D\u4E0D\u662F\u76F4\u63A5\u8DDF DB Table \u6B04\u4F4D\u5C0D\u61C9\uFF0C\u53EF\u4EE5\u6839\u64DA\u9700\u8981\u8ABF\u6574</h3><p>\u807D\u8D77\u4F86\u50CF\u5EE2\u8A71\uFF0C\u4F46\u4E00\u958B\u59CB\u5B78\u7FD2\u6642\u6709\u53EF\u80FD\u641E\u4E0D\u592A\u61C2\u800C\u4EE5\u70BA Schema \u5FC5\u9808\u7167\u8457 DB Table \u8A2D\u8A08\u8D70\uFF0C<code>query</code> \u50CF\u662F rest api \u88E1\u7684 <code>get</code> \u65B9\u6CD5\uFF0C\u6211\u5011\u53EF\u4EE5\u6839\u64DA\u9700\u6C42\u6C7A\u5B9A\u5177\u9AD4\u7D66\u51FA\u4EC0\u9EBC\u6B04\u4F4D\u8B93\u4F7F\u7528\u8005\u80FD\u5920\u7372\u5F97\u8CC7\u6599\uFF0C\u6BD4\u5982\u5E38\u898B\u7684 <code>User</code> \u96D6\u7136 DB \u88E1\u6703\u5B58\u6709 <code>password</code> \u6B04\u4F4D\uFF0C\u4F46\u6211\u5011\u4E0D\u6703\u5E0C\u671B Client \u7AEF\u80FD\u5920 query \u5F97\u5230\u5B83\uFF0C\u6B64\u6642\u5C31\u4E0D\u5FC5\u5728 <code>User</code> \u7684 Schema</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>type User <span class="token punctuation">{</span>
  <span class="token literal-property property">id</span><span class="token operator">:</span> <span class="token constant">ID</span><span class="token operator">!</span>
  <span class="token literal-property property">name</span><span class="token operator">:</span> String<span class="token operator">!</span>
  <span class="token literal-property property">email</span><span class="token operator">:</span> String<span class="token operator">!</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="authentication-vs-authorizaion-\u5DEE\u5225" tabindex="-1"><a class="header-anchor" href="#authentication-vs-authorizaion-\u5DEE\u5225" aria-hidden="true">#</a> Authentication vs Authorizaion \u5DEE\u5225</h3><p>Authentication \u8655\u7406\u7684\u662F\u767B\u5165\u554F\u984C\uFF0C\u5982\u679C\u767B\u5165\u5931\u6557\u90A3\u5C31\u662F Authentication \u300C\u8A8D\u8B49\u300D\u7684\u554F\u984C ; Authoriaction \u8655\u7406\u7684\u662F\u6B0A\u9650\u554F\u984C\uFF0C\u5982\u679C\u767B\u5165\u8005\u6216 guest \u8981\u9032\u884C\u4E00\u9805\u4E0D\u5C6C\u65BC\u4ED6\u6B0A\u9650\u5141\u8A31\u7684\u64CD\u4F5C\uFF0C\u90A3\u5C31\u6703\u5F15\u767C Authorizaion \u300C\u6388\u6B0A\u300D\u554F\u984C\u3002</p>`,10),i=[r];function o(c,p){return a(),n("div",null,i)}var l=e(t,[["render",o],["__file","memo.html.vue"]]);export{l as default};