import{_ as o,r as p,o as i,c as l,d as n,e as s,a as e,f as t}from"./app.1cb52065.js";const c={},r=n("h1",{id:"react-emotion-basic",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#react-emotion-basic","aria-hidden":"true"},"#"),s(" React Emotion Basic")],-1),d=n("p",null,[s("\u9019\u7BC7\u662F\u7D00\u9304\u4F7F\u7528 Vite \u914D\u7F6E "),n("code",null,"@emotion"),s(" \u57FA\u790E\u5B89\u88DD\u8207\u4F7F\u7528\u65B9\u5F0F\u7684\u7B46\u8A18")],-1),u=n("h2",{id:"install",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#install","aria-hidden":"true"},"#"),s(" Install")],-1),k={href:"https://emotion.sh/docs/install",target:"_blank",rel:"noopener noreferrer"},v=n("code",null,"React",-1),m=n("code",null,"@emotion/react",-1),b=n("code",null,"@emotion/css",-1),g=t(`<p>\u9019\u908A\u4EE5\u4F7F\u7528 react \u70BA\u4E3B~</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>$ <span class="token function">npm</span> <span class="token function">install</span> <span class="token parameter variable">--save</span> @emotion/react
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="css-prop-\u4F7F\u7528" tabindex="-1"><a class="header-anchor" href="#css-prop-\u4F7F\u7528" aria-hidden="true">#</a> CSS Prop \u4F7F\u7528</h2>`,3),h={href:"https://emotion.sh/docs/css-prop",target:"_blank",rel:"noopener noreferrer"},y=t(`<div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> css <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;@emotion/react&#39;</span>

<span class="token keyword">const</span> style <span class="token operator">=</span> css<span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">
  color: hotpink;
</span><span class="token template-punctuation string">\`</span></span>

<span class="token keyword">const</span> <span class="token function-variable function">SomeComponent</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token punctuation">{</span> children <span class="token punctuation">}</span></span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">(</span>
  <span class="token operator">&lt;</span>div css<span class="token operator">=</span><span class="token punctuation">{</span>style<span class="token punctuation">}</span><span class="token operator">&gt;</span>
    Some hotpink text<span class="token punctuation">.</span>
    <span class="token punctuation">{</span>children<span class="token punctuation">}</span>
  <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">&gt;</span>
<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="styled-component" tabindex="-1"><a class="header-anchor" href="#styled-component" aria-hidden="true">#</a> Styled Component</h2>`,2),_={href:"https://emotion.sh/docs/styled",target:"_blank",rel:"noopener noreferrer"},f=n("code",null,"@emotion/styled",-1),w=n("code",null,"Styled-components",-1),x=t(`<div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">import</span> styled <span class="token keyword">from</span> <span class="token string">&#39;@emotion/styled&#39;</span>

<span class="token keyword">const</span> Button <span class="token operator">=</span> styled<span class="token punctuation">.</span>button<span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">
  color: hotpink;
</span><span class="token template-punctuation string">\`</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="targeting-another-emotion-component" tabindex="-1"><a class="header-anchor" href="#targeting-another-emotion-component" aria-hidden="true">#</a> Targeting another emotion component</h3>`,2),j={href:"https://emotion.sh/docs/styled#targeting-another-emotion-component",target:"_blank",rel:"noopener noreferrer"},S=t(`<p>\u4F7F\u7528\u4E0B\u9762\u9019\u7A2E\u7279\u6B8A\u65B9\u5F0F\u53EF\u4EE5\u5728\u4E00\u500B Emotion styled \u7D44\u4EF6\u5167\u5F15\u5165\u53E6\u4E00\u500B\uFF0C\u4F46\u9700\u8981\u5B89\u88DD\u4E26\u914D\u7F6E <code>@emotion/babel-plugin</code></p><div class="language-json ext-json line-numbers-mode"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;plugins&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;@emotion&quot;</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">import</span> styled <span class="token keyword">from</span> <span class="token string">&#39;@emotion/styled&#39;</span>

<span class="token keyword">const</span> Child <span class="token operator">=</span> styled<span class="token punctuation">.</span>div<span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">
  color: red;
</span><span class="token template-punctuation string">\`</span></span>

<span class="token keyword">const</span> Parent <span class="token operator">=</span> styled<span class="token punctuation">.</span>div<span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">
  </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>Child<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> {
    color: green;
  }
</span><span class="token template-punctuation string">\`</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="composing-dynamic-styles" tabindex="-1"><a class="header-anchor" href="#composing-dynamic-styles" aria-hidden="true">#</a> Composing dynamic styles</h3>`,4),q={href:"https://emotion.sh/docs/styled#composing-dynamic-styles",target:"_blank",rel:"noopener noreferrer"},C=t(`<div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">import</span> styled <span class="token keyword">from</span> <span class="token string">&#39;@emotion/styled&#39;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> css <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;@emotion/react&#39;</span>

<span class="token keyword">const</span> <span class="token function-variable function">dynamicStyle</span> <span class="token operator">=</span> <span class="token parameter">props</span> <span class="token operator">=&gt;</span>
  css<span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">
    color: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>props<span class="token punctuation">.</span>color<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">;
  </span><span class="token template-punctuation string">\`</span></span>

<span class="token keyword">const</span> Container <span class="token operator">=</span> styled<span class="token punctuation">.</span>div<span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">
  </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>dynamicStyle<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">;
</span><span class="token template-punctuation string">\`</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="nested-components" tabindex="-1"><a class="header-anchor" href="#nested-components" aria-hidden="true">#</a> Nested components</h3><p>styled \u5BEB\u6CD5\u5167\u5EFA\u53EF\u4EE5\u4F7F\u7528\u985E\u4F3C SASS \u4E2D\u7684 <code>&amp;</code> parent selector</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">import</span> styled <span class="token keyword">from</span> <span class="token string">&#39;@emotion/styled&#39;</span>

<span class="token keyword">const</span> Example <span class="token operator">=</span> <span class="token function">styled</span><span class="token punctuation">(</span><span class="token string">&#39;span&#39;</span><span class="token punctuation">)</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">
  color: lightgreen;
  &amp; &gt; a {
    color: hotpink;
  }
</span><span class="token template-punctuation string">\`</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="composition" tabindex="-1"><a class="header-anchor" href="#composition" aria-hidden="true">#</a> Composition</h2>`,5),E={href:"https://emotion.sh/docs/composition",target:"_blank",rel:"noopener noreferrer"},N=n("code",null,"css",-1),$=t(`<div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> css <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;@emotion/react&#39;</span>

<span class="token keyword">const</span> base <span class="token operator">=</span> css<span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">
  color: hotpink;
</span><span class="token template-punctuation string">\`</span></span>

<span class="token function">render</span><span class="token punctuation">(</span>
  <span class="token operator">&lt;</span>div
    css<span class="token operator">=</span><span class="token punctuation">{</span>css<span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">
      </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>base<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">;
      background-color: #eee;
    </span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">}</span>
  <span class="token operator">&gt;</span>
    This is hotpink<span class="token punctuation">.</span>
  <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">&gt;</span>
<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_1-\u76F4\u63A5\u5957\u7528" tabindex="-1"><a class="header-anchor" href="#_1-\u76F4\u63A5\u5957\u7528" aria-hidden="true">#</a> 1. \u76F4\u63A5\u5957\u7528</h3><p><code>\u76F4\u63A5\u5957\u7528</code> \u96D6\u7136\u5F88\u65B9\u4FBF\uFF0C\u4F46\u5C31\u50CF\u4E0B\u65B9\u4E00\u822C CSS \u4E00\u6A23\u5BB9\u6613\u56E0\u70BA\u5957\u7528\u9806\u5E8F\uFF0C\u800C\u51FA\u73FE\u6A23\u5F0F override \u7684\u554F\u984C\uFF0C\u5C0E\u81F4\u5FC5\u9808\u8ABF\u6574 className \u9806\u5E8F\u6216\u662F\u52A0\u5165 <code>important</code></p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token function">render</span><span class="token punctuation">(</span>
  <span class="token operator">&lt;</span>div<span class="token operator">&gt;</span>
    <span class="token operator">&lt;</span>style<span class="token operator">&gt;</span>
      <span class="token punctuation">{</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">
        .danger {
          color: red;
        }
        .base {
          background-color: lightgray;
          color: turquoise;
        }
      </span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">}</span>
      <span class="token operator">&gt;</span>
    <span class="token operator">&lt;</span><span class="token operator">/</span>style<span class="token operator">&gt;</span>
    <span class="token punctuation">{</span><span class="token comment">/* turquoise */</span><span class="token punctuation">}</span>
    <span class="token operator">&lt;</span>p className<span class="token operator">=</span><span class="token string">&quot;base danger&quot;</span><span class="token operator">&gt;</span>What color will <span class="token keyword">this</span> be<span class="token operator">?</span><span class="token operator">&lt;</span><span class="token operator">/</span>p<span class="token operator">&gt;</span>
  <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">&gt;</span>
<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-\u5408\u4F75\u5957\u7528" tabindex="-1"><a class="header-anchor" href="#_2-\u5408\u4F75\u5957\u7528" aria-hidden="true">#</a> 2. \u5408\u4F75\u5957\u7528</h3><p>\u70BA\u4E86\u907F\u514D\u6A23\u5F0F\u5957\u7528\u6642\u9806\u5E8F\u5F71\u97FF\u6A23\u5F0F\uFF0C\u53EF\u4EE5\u7528\u4E0B\u9762\u7684\u65B9\u5F0F\u5F15\u5165 css \u7D44\u5408\uFF0C\u9019\u6A23 css \u9806\u5E8F\u53EF\u4EE5\u5728\u9700\u8981\u6642\u8996\u60C5\u6CC1\u7D66\u4E88\u5957\u7528\u9806\u5E8F</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> css <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;@emotion/react&#39;</span>

<span class="token keyword">const</span> danger <span class="token operator">=</span> css<span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">
  color: red;
</span><span class="token template-punctuation string">\`</span></span>

<span class="token keyword">const</span> base <span class="token operator">=</span> css<span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">
  background-color: darkgreen;
  color: turquoise;
</span><span class="token template-punctuation string">\`</span></span>

<span class="token function">render</span><span class="token punctuation">(</span>
  <span class="token operator">&lt;</span>div<span class="token operator">&gt;</span>
    <span class="token operator">&lt;</span>div css<span class="token operator">=</span><span class="token punctuation">{</span>base<span class="token punctuation">}</span><span class="token operator">&gt;</span>This will be turquoise<span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">&gt;</span>
    <span class="token operator">&lt;</span>div css<span class="token operator">=</span><span class="token punctuation">{</span><span class="token punctuation">[</span>danger<span class="token punctuation">,</span> base<span class="token punctuation">]</span><span class="token punctuation">}</span><span class="token operator">&gt;</span>
      This will be also be turquoise since the base styles overwrite the danger
      styles<span class="token punctuation">.</span>
    <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">&gt;</span>
    <span class="token operator">&lt;</span>div css<span class="token operator">=</span><span class="token punctuation">{</span><span class="token punctuation">[</span>base<span class="token punctuation">,</span> danger<span class="token punctuation">]</span><span class="token punctuation">}</span><span class="token operator">&gt;</span>This will be red<span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">&gt;</span>
  <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">&gt;</span>
<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="media-queries" tabindex="-1"><a class="header-anchor" href="#media-queries" aria-hidden="true">#</a> Media Queries</h2><p>\u53EF\u4EE5\u50CF SASS \u4E00\u6A23\u5728\u7576\u524D selector \u5167\u76F4\u63A5\u5957\u7528</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> css <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;@emotion/react&#39;</span>

<span class="token function">render</span><span class="token punctuation">(</span>
  <span class="token operator">&lt;</span>p
    css<span class="token operator">=</span><span class="token punctuation">{</span>css<span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">
      font-size: 30px;
      @media (min-width: 420px) {
        font-size: 50px;
      }
    </span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">}</span>
  <span class="token operator">&gt;</span>
    Some text<span class="token operator">!</span>
  <span class="token operator">&lt;</span><span class="token operator">/</span>p<span class="token operator">&gt;</span>
<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u6216\u662F\u53EF\u4EE5\u50CF\u9019\u6A23\u628A breakpoints \u8A2D\u5B9A\u597D\u65B9\u4FBF\u4F7F\u7528</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> css <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;@emotion/react&#39;</span>

<span class="token keyword">const</span> breakpoints <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">sm</span><span class="token operator">:</span> <span class="token number">576</span><span class="token punctuation">,</span>
  <span class="token literal-property property">md</span><span class="token operator">:</span> <span class="token number">768</span><span class="token punctuation">,</span>
  <span class="token literal-property property">lg</span><span class="token operator">:</span> <span class="token number">992</span><span class="token punctuation">,</span>
  <span class="token literal-property property">xl</span><span class="token operator">:</span> <span class="token number">1200</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> <span class="token function-variable function">mq</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">bp</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">@media (min-width: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>breakpoints<span class="token punctuation">[</span>bp<span class="token punctuation">]</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">px)</span><span class="token template-punctuation string">\`</span></span>

<span class="token function">render</span><span class="token punctuation">(</span>
  <span class="token operator">&lt;</span>div<span class="token operator">&gt;</span>
    <span class="token operator">&lt;</span>p
      css<span class="token operator">=</span><span class="token punctuation">{</span>css<span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">
        color: green;
        </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token function">mq</span><span class="token punctuation">(</span><span class="token string">&#39;sm&#39;</span><span class="token punctuation">)</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> {
          color: gray;
        }
        </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token function">mq</span><span class="token punctuation">(</span><span class="token string">&#39;md&#39;</span><span class="token punctuation">)</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> {
          color: hotpink;
        }
      </span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">}</span>
    <span class="token operator">&gt;</span>
      Some other text<span class="token operator">!</span>
    <span class="token operator">&lt;</span><span class="token operator">/</span>p<span class="token operator">&gt;</span>
  <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">&gt;</span>
<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="global-styles" tabindex="-1"><a class="header-anchor" href="#global-styles" aria-hidden="true">#</a> Global Styles</h2><p>\u4F7F\u7528 <code>&lt;Global&gt;</code> \u7D44\u4EF6\u5957\u7528\u5168\u5C40\u7684\u6A23\u5F0F\uFF0C\u9019\u4E9B\u6A23\u5F0F\u6703\u5728\u6A23\u5F0F\u6539\u8B8A\u6216\u96A8\u8457\u7D44\u4EF6\u5378\u8F09\u6642\u79FB\u9664</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> Global<span class="token punctuation">,</span> css <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;@emotion/react&#39;</span>

<span class="token function">render</span><span class="token punctuation">(</span>
  <span class="token operator">&lt;</span>div<span class="token operator">&gt;</span>
    <span class="token operator">&lt;</span>Global
      styles<span class="token operator">=</span><span class="token punctuation">{</span>css<span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">
        .some-class {
          color: hotpink !important;
        }
      </span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">}</span>
    <span class="token operator">/</span><span class="token operator">&gt;</span>
    <span class="token operator">&lt;</span>div className<span class="token operator">=</span><span class="token string">&quot;some-class&quot;</span><span class="token operator">&gt;</span>This is hotpink now<span class="token operator">!</span><span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">&gt;</span>
  <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">&gt;</span>
<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="\u76F8\u95DC\u5957\u4EF6\u6E05\u55AE" tabindex="-1"><a class="header-anchor" href="#\u76F8\u95DC\u5957\u4EF6\u6E05\u55AE" aria-hidden="true">#</a> \u76F8\u95DC\u5957\u4EF6\u6E05\u55AE</h2>`,16),T={href:"https://emotion.sh/docs/package-summary",target:"_blank",rel:"noopener noreferrer"};function B(V,G){const a=p("ExternalLinkIcon");return i(),l("div",null,[r,d,u,n("ul",null,[n("li",null,[n("a",k,[s("\u5B89\u88DD\u4ECB\u7D39"),e(a)]),s(" @emotion \u6709\u5F88\u591A\u4F7F\u7528\u7684\u65B9\u5F0F\uFF0C\u9700\u8981\u5B89\u88DD\u7684\u4F9D\u8CF4\u4E5F\u4E0D\u5B8C\u5168\u76F8\u540C\uFF0C\u4E3B\u8981\u6839\u64DA\u662F\u5426\u4F7F\u7528 "),v,s(" \u6846\u67B6\uFF0C\u5982\u679C\u4F7F\u7528\u5247\u5B89\u88DD "),m,s("\uFF0C\u82E5\u6C92\u6709\u5247\u5B89\u88DD "),b,s("\uFF0C\u524D\u8005\u91DD\u5C0D react \u8A2D\u8A08\uFF0C\u5F8C\u8005\u53EF\u8DE8\u6846\u67B6\u4F7F\u7528")])]),g,n("ul",null,[n("li",null,[n("a",h,[s("\u8AAA\u660E"),e(a)])])]),y,n("ul",null,[n("li",null,[n("a",_,[s("\u8AAA\u660E"),e(a)]),s(" \u53E6\u5916\u5B89\u88DD "),f,s(" \u53EF\u4EE5\u4F7F\u7528\u8FD1\u4F3C\u65BC "),w,s(" \u7684\u7D44\u4EF6\u5F0F\u7528\u6CD5")])]),x,n("ul",null,[n("li",null,[n("a",j,[s("\u8AAA\u660E"),e(a)])])]),S,n("ul",null,[n("li",null,[n("a",q,[s("\u8AAA\u660E"),e(a)]),s(" \u4F7F\u7528\u4E0B\u9762\u65B9\u5F0F\u53EF\u4EE5\u4F7F\u7528\u52D5\u614B style \u6CE8\u5165 props")])]),C,n("ul",null,[n("li",null,[n("a",E,[s("\u8AAA\u660E"),e(a)]),s(" Emotion \u7684\u4E00\u500B\u5F37\u5927\u529F\u80FD\uFF0C\u53EF\u4EE5\u81EA\u7531\u900F\u904E "),N,s(" \u5B9A\u7FA9 style \u7D44\u5408\u4E92\u76F8\u5957\u7528")])]),$,n("ul",null,[n("li",null,[n("a",T,[s("Emotion Package \u6E05\u55AE"),e(a)])])])])}const P=o(c,[["render",B],["__file","react-emotion-basic.html.vue"]]);export{P as default};
