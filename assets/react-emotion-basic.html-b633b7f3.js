import{_ as o,r as p,o as i,c as l,d as n,e as s,a as e,f as t}from"./app-1412ef0d.js";const c={},r=n("h1",{id:"react-emotion-basic",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#react-emotion-basic","aria-hidden":"true"},"#"),s(" React Emotion Basic")],-1),d=n("p",null,[s("這篇是紀錄使用 Vite 配置 "),n("code",null,"@emotion"),s(" 基礎安裝與使用方式的筆記")],-1),u=n("h2",{id:"install",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#install","aria-hidden":"true"},"#"),s(" Install")],-1),k={href:"https://emotion.sh/docs/install",target:"_blank",rel:"noopener noreferrer"},v=n("code",null,"React",-1),m=n("code",null,"@emotion/react",-1),b=n("code",null,"@emotion/css",-1),g=t(`<p>這邊以使用 react 為主~</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">npm</span> <span class="token function">install</span> <span class="token parameter variable">--save</span> @emotion/react
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="css-prop-使用" tabindex="-1"><a class="header-anchor" href="#css-prop-使用" aria-hidden="true">#</a> CSS Prop 使用</h2>`,3),h={href:"https://emotion.sh/docs/css-prop",target:"_blank",rel:"noopener noreferrer"},y=t(`<div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> css <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;@emotion/react&#39;</span>

<span class="token keyword">const</span> style <span class="token operator">=</span> css<span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">
  color: hotpink;
</span><span class="token template-punctuation string">\`</span></span>

<span class="token keyword">const</span> <span class="token function-variable function">SomeComponent</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token punctuation">{</span> children <span class="token punctuation">}</span></span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">(</span>
  <span class="token operator">&lt;</span>div css<span class="token operator">=</span><span class="token punctuation">{</span>style<span class="token punctuation">}</span><span class="token operator">&gt;</span>
    Some hotpink text<span class="token punctuation">.</span>
    <span class="token punctuation">{</span>children<span class="token punctuation">}</span>
  <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">&gt;</span>
<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="styled-component" tabindex="-1"><a class="header-anchor" href="#styled-component" aria-hidden="true">#</a> Styled Component</h2>`,2),_={href:"https://emotion.sh/docs/styled",target:"_blank",rel:"noopener noreferrer"},f=n("code",null,"@emotion/styled",-1),w=n("code",null,"Styled-components",-1),x=t(`<div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> styled <span class="token keyword">from</span> <span class="token string">&#39;@emotion/styled&#39;</span>

<span class="token keyword">const</span> Button <span class="token operator">=</span> styled<span class="token punctuation">.</span>button<span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">
  color: hotpink;
</span><span class="token template-punctuation string">\`</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="targeting-another-emotion-component" tabindex="-1"><a class="header-anchor" href="#targeting-another-emotion-component" aria-hidden="true">#</a> Targeting another emotion component</h3>`,2),j={href:"https://emotion.sh/docs/styled#targeting-another-emotion-component",target:"_blank",rel:"noopener noreferrer"},S=t(`<p>使用下面這種特殊方式可以在一個 Emotion styled 組件內引入另一個，但需要安裝並配置 <code>@emotion/babel-plugin</code></p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;plugins&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;@emotion&quot;</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> styled <span class="token keyword">from</span> <span class="token string">&#39;@emotion/styled&#39;</span>

<span class="token keyword">const</span> Child <span class="token operator">=</span> styled<span class="token punctuation">.</span>div<span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">
  color: red;
</span><span class="token template-punctuation string">\`</span></span>

<span class="token keyword">const</span> Parent <span class="token operator">=</span> styled<span class="token punctuation">.</span>div<span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">
  </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>Child<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> {
    color: green;
  }
</span><span class="token template-punctuation string">\`</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="composing-dynamic-styles" tabindex="-1"><a class="header-anchor" href="#composing-dynamic-styles" aria-hidden="true">#</a> Composing dynamic styles</h3>`,4),q={href:"https://emotion.sh/docs/styled#composing-dynamic-styles",target:"_blank",rel:"noopener noreferrer"},C=t(`<div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> styled <span class="token keyword">from</span> <span class="token string">&#39;@emotion/styled&#39;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> css <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;@emotion/react&#39;</span>

<span class="token keyword">const</span> <span class="token function-variable function">dynamicStyle</span> <span class="token operator">=</span> <span class="token parameter">props</span> <span class="token operator">=&gt;</span>
  css<span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">
    color: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>props<span class="token punctuation">.</span>color<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">;
  </span><span class="token template-punctuation string">\`</span></span>

<span class="token keyword">const</span> Container <span class="token operator">=</span> styled<span class="token punctuation">.</span>div<span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">
  </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>dynamicStyle<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">;
</span><span class="token template-punctuation string">\`</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="nested-components" tabindex="-1"><a class="header-anchor" href="#nested-components" aria-hidden="true">#</a> Nested components</h3><p>styled 寫法內建可以使用類似 SASS 中的 <code>&amp;</code> parent selector</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> styled <span class="token keyword">from</span> <span class="token string">&#39;@emotion/styled&#39;</span>

<span class="token keyword">const</span> Example <span class="token operator">=</span> <span class="token function">styled</span><span class="token punctuation">(</span><span class="token string">&#39;span&#39;</span><span class="token punctuation">)</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">
  color: lightgreen;
  &amp; &gt; a {
    color: hotpink;
  }
</span><span class="token template-punctuation string">\`</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="composition" tabindex="-1"><a class="header-anchor" href="#composition" aria-hidden="true">#</a> Composition</h2>`,5),E={href:"https://emotion.sh/docs/composition",target:"_blank",rel:"noopener noreferrer"},N=n("code",null,"css",-1),$=t(`<div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> css <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;@emotion/react&#39;</span>

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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_1-直接套用" tabindex="-1"><a class="header-anchor" href="#_1-直接套用" aria-hidden="true">#</a> 1. 直接套用</h3><p><code>直接套用</code> 雖然很方便，但就像下方一般 CSS 一樣容易因為套用順序，而出現樣式 override 的問題，導致必須調整 className 順序或是加入 <code>important</code></p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token function">render</span><span class="token punctuation">(</span>
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-合併套用" tabindex="-1"><a class="header-anchor" href="#_2-合併套用" aria-hidden="true">#</a> 2. 合併套用</h3><p>為了避免樣式套用時順序影響樣式，可以用下面的方式引入 css 組合，這樣 css 順序可以在需要時視情況給予套用順序</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> css <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;@emotion/react&#39;</span>

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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="media-queries" tabindex="-1"><a class="header-anchor" href="#media-queries" aria-hidden="true">#</a> Media Queries</h2><p>可以像 SASS 一樣在當前 selector 內直接套用</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> css <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;@emotion/react&#39;</span>

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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>或是可以像這樣把 breakpoints 設定好方便使用</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> css <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;@emotion/react&#39;</span>

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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="global-styles" tabindex="-1"><a class="header-anchor" href="#global-styles" aria-hidden="true">#</a> Global Styles</h2><p>使用 <code>&lt;Global&gt;</code> 組件套用全局的樣式，這些樣式會在樣式改變或隨著組件卸載時移除</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> Global<span class="token punctuation">,</span> css <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;@emotion/react&#39;</span>

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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="相關套件清單" tabindex="-1"><a class="header-anchor" href="#相關套件清單" aria-hidden="true">#</a> 相關套件清單</h2>`,16),T={href:"https://emotion.sh/docs/package-summary",target:"_blank",rel:"noopener noreferrer"};function B(V,G){const a=p("ExternalLinkIcon");return i(),l("div",null,[r,d,u,n("ul",null,[n("li",null,[n("a",k,[s("安裝介紹"),e(a)]),s(" @emotion 有很多使用的方式，需要安裝的依賴也不完全相同，主要根據是否使用 "),v,s(" 框架，如果使用則安裝 "),m,s("，若沒有則安裝 "),b,s("，前者針對 react 設計，後者可跨框架使用")])]),g,n("ul",null,[n("li",null,[n("a",h,[s("說明"),e(a)])])]),y,n("ul",null,[n("li",null,[n("a",_,[s("說明"),e(a)]),s(" 另外安裝 "),f,s(" 可以使用近似於 "),w,s(" 的組件式用法")])]),x,n("ul",null,[n("li",null,[n("a",j,[s("說明"),e(a)])])]),S,n("ul",null,[n("li",null,[n("a",q,[s("說明"),e(a)]),s(" 使用下面方式可以使用動態 style 注入 props")])]),C,n("ul",null,[n("li",null,[n("a",E,[s("說明"),e(a)]),s(" Emotion 的一個強大功能，可以自由透過 "),N,s(" 定義 style 組合互相套用")])]),$,n("ul",null,[n("li",null,[n("a",T,[s("Emotion Package 清單"),e(a)])])])])}const P=o(c,[["render",B],["__file","react-emotion-basic.html.vue"]]);export{P as default};
