import{_ as n,o as s,c as a,f as t}from"./app-7841ac8a.js";const e={},p=t(`<h1 id="react-styled-components-基礎篇" tabindex="-1"><a class="header-anchor" href="#react-styled-components-基礎篇" aria-hidden="true">#</a> React Styled-Components 基礎篇</h1><p>本篇是學習 Styled-Components 時閱讀官網的一些筆記跟心得記錄</p><h2 id="install" tabindex="-1"><a class="header-anchor" href="#install" aria-hidden="true">#</a> Install</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">npm</span> <span class="token function">install</span> <span class="token parameter variable">--save</span> styled-components
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>若在 typescript 環境安裝需安裝相應的 types</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">npm</span> <span class="token function">install</span> --save-dev @types/styled-components
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="usage" tabindex="-1"><a class="header-anchor" href="#usage" aria-hidden="true">#</a> Usage</h2><h3 id="basic" tabindex="-1"><a class="header-anchor" href="#basic" aria-hidden="true">#</a> Basic</h3><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> Title <span class="token operator">=</span> styled<span class="token punctuation">.</span>h1<span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">;</span>

<span class="token keyword">const</span> Wrapper <span class="token operator">=</span> styled<span class="token punctuation">.</span>section<span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">
  padding: 4em;
  background: papayawhip;
</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">;</span>

<span class="token function">render</span><span class="token punctuation">(</span>
  <span class="token operator">&lt;</span>Wrapper<span class="token operator">&gt;</span>
    <span class="token operator">&lt;</span>Title<span class="token operator">&gt;</span>
      Hello World<span class="token operator">!</span>
    <span class="token operator">&lt;</span><span class="token operator">/</span>Title<span class="token operator">&gt;</span>
  <span class="token operator">&lt;</span><span class="token operator">/</span>Wrapper<span class="token operator">&gt;</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="props" tabindex="-1"><a class="header-anchor" href="#props" aria-hidden="true">#</a> Props</h3><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> Button <span class="token operator">=</span> styled<span class="token punctuation">.</span>button<span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">
  /* Adapt the colors based on primary prop */
  background: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token parameter">props</span> <span class="token operator">=&gt;</span> props<span class="token punctuation">.</span>primary <span class="token operator">?</span> <span class="token string">&quot;palevioletred&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;white&quot;</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">;
  color: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token parameter">props</span> <span class="token operator">=&gt;</span> props<span class="token punctuation">.</span>primary <span class="token operator">?</span> <span class="token string">&quot;white&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;palevioletred&quot;</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">;

  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">;</span>

<span class="token function">render</span><span class="token punctuation">(</span>
  <span class="token operator">&lt;</span>div<span class="token operator">&gt;</span>
    <span class="token operator">&lt;</span>Button<span class="token operator">&gt;</span>Normal<span class="token operator">&lt;</span><span class="token operator">/</span>Button<span class="token operator">&gt;</span>
    <span class="token operator">&lt;</span>Button primary<span class="token operator">&gt;</span>Primary<span class="token operator">&lt;</span><span class="token operator">/</span>Button<span class="token operator">&gt;</span>
  <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">&gt;</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="extends" tabindex="-1"><a class="header-anchor" href="#extends" aria-hidden="true">#</a> Extends</h3><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> Button <span class="token operator">=</span> styled<span class="token punctuation">.</span>button<span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">
  color: palevioletred;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">;</span>

<span class="token comment">// A new component based on Button, but with some override styles</span>
<span class="token keyword">const</span> TomatoButton <span class="token operator">=</span> <span class="token function">styled</span><span class="token punctuation">(</span>Button<span class="token punctuation">)</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">
  color: tomato;
  border-color: tomato;
</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="change-tag" tabindex="-1"><a class="header-anchor" href="#change-tag" aria-hidden="true">#</a> Change Tag</h3><p>使用 <code>as</code> 屬性切換 html tag</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> Button <span class="token operator">=</span> styled<span class="token punctuation">.</span>button<span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">
  display: inline-block;
  color: palevioletred;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
  display: block;
</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">;</span>

<span class="token function">render</span><span class="token punctuation">(</span>
  <span class="token operator">&lt;</span>div<span class="token operator">&gt;</span>
    <span class="token operator">&lt;</span>Button<span class="token operator">&gt;</span>Normal Button<span class="token operator">&lt;</span><span class="token operator">/</span>Button<span class="token operator">&gt;</span>
    <span class="token operator">&lt;</span>Button <span class="token keyword">as</span><span class="token operator">=</span><span class="token string">&quot;a&quot;</span> href<span class="token operator">=</span><span class="token string">&quot;#&quot;</span><span class="token operator">&gt;</span>Link <span class="token keyword">with</span> Button styles<span class="token operator">&lt;</span><span class="token operator">/</span>Button<span class="token operator">&gt;</span>
  <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">&gt;</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>或是使用 Custom Components</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token function-variable function">ReversedButton</span> <span class="token operator">=</span> <span class="token parameter">props</span> <span class="token operator">=&gt;</span> <span class="token operator">&lt;</span>Button <span class="token punctuation">{</span><span class="token operator">...</span>props<span class="token punctuation">}</span> children<span class="token operator">=</span><span class="token punctuation">{</span>props<span class="token punctuation">.</span>children<span class="token punctuation">.</span><span class="token function">split</span><span class="token punctuation">(</span><span class="token string">&#39;&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">reverse</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">}</span> <span class="token operator">/</span><span class="token operator">&gt;</span>

<span class="token function">render</span><span class="token punctuation">(</span>
  <span class="token operator">&lt;</span>div<span class="token operator">&gt;</span>
    <span class="token operator">&lt;</span>Button<span class="token operator">&gt;</span>Normal Button<span class="token operator">&lt;</span><span class="token operator">/</span>Button<span class="token operator">&gt;</span>
    <span class="token operator">&lt;</span>Button <span class="token keyword">as</span><span class="token operator">=</span><span class="token punctuation">{</span>ReversedButton<span class="token punctuation">}</span><span class="token operator">&gt;</span>Custom Button <span class="token keyword">with</span> Normal Button styles<span class="token operator">&lt;</span><span class="token operator">/</span>Button<span class="token operator">&gt;</span>
  <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">&gt;</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="styling-any-component" tabindex="-1"><a class="header-anchor" href="#styling-any-component" aria-hidden="true">#</a> Styling any component</h3><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token function-variable function">Link</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token punctuation">{</span> className<span class="token punctuation">,</span> children <span class="token punctuation">}</span></span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">(</span>
  <span class="token operator">&lt;</span>a className<span class="token operator">=</span><span class="token punctuation">{</span>className<span class="token punctuation">}</span><span class="token operator">&gt;</span>
    <span class="token punctuation">{</span>children<span class="token punctuation">}</span>
  <span class="token operator">&lt;</span><span class="token operator">/</span>a<span class="token operator">&gt;</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> StyledLink <span class="token operator">=</span> <span class="token function">styled</span><span class="token punctuation">(</span>Link<span class="token punctuation">)</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">
  color: palevioletred;
  font-weight: bold;
</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">;</span>

<span class="token function">render</span><span class="token punctuation">(</span>
  <span class="token operator">&lt;</span>div<span class="token operator">&gt;</span>
    <span class="token operator">&lt;</span>Link<span class="token operator">&gt;</span>Unstyled<span class="token punctuation">,</span> boring Link<span class="token operator">&lt;</span><span class="token operator">/</span>Link<span class="token operator">&gt;</span>
    <span class="token operator">&lt;</span>br <span class="token operator">/</span><span class="token operator">&gt;</span>
    <span class="token operator">&lt;</span>StyledLink<span class="token operator">&gt;</span>Styled<span class="token punctuation">,</span> exciting Link<span class="token operator">&lt;</span><span class="token operator">/</span>StyledLink<span class="token operator">&gt;</span>
  <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">&gt;</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="define-styled-components-outside-of-the-render-method" tabindex="-1"><a class="header-anchor" href="#define-styled-components-outside-of-the-render-method" aria-hidden="true">#</a> Define Styled Components outside of the render method</h3><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> StyledWrapper <span class="token operator">=</span> styled<span class="token punctuation">.</span>div<span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">
  /* ... */
</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">;</span>

<span class="token keyword">const</span> <span class="token function-variable function">Wrapper</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token punctuation">{</span> message <span class="token punctuation">}</span></span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token operator">&lt;</span>StyledWrapper<span class="token operator">&gt;</span><span class="token punctuation">{</span>message<span class="token punctuation">}</span><span class="token operator">&lt;</span><span class="token operator">/</span>StyledWrapper<span class="token operator">&gt;</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="nested" tabindex="-1"><a class="header-anchor" href="#nested" aria-hidden="true">#</a> Nested</h3><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> Thing <span class="token operator">=</span> styled<span class="token punctuation">.</span>div<span class="token punctuation">.</span><span class="token function">attrs</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token comment">/* props */</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token literal-property property">tabIndex</span><span class="token operator">:</span> <span class="token number">0</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">
  color: blue;

  &amp;:hover {
    color: red; // &lt;Thing&gt; when hovered
  }

  &amp; ~ &amp; {
    background: tomato; // &lt;Thing&gt; as a sibling of &lt;Thing&gt;, but maybe not directly next to it
  }

  &amp; + &amp; {
    background: lime; // &lt;Thing&gt; next to &lt;Thing&gt;
  }

  &amp;.something {
    background: orange; // &lt;Thing&gt; tagged with an additional CSS class &quot;.something&quot;
  }

  .something-else &amp; {
    border: 1px solid; // &lt;Thing&gt; inside another element labeled &quot;.something-else&quot;
  }
</span><span class="token template-punctuation string">\`</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="attaching-additional-props" tabindex="-1"><a class="header-anchor" href="#attaching-additional-props" aria-hidden="true">#</a> Attaching additional props</h2><p>對組件 props 添加其他自訂 props</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> Input <span class="token operator">=</span> styled<span class="token punctuation">.</span>input<span class="token punctuation">.</span><span class="token function">attrs</span><span class="token punctuation">(</span><span class="token parameter">props</span> <span class="token operator">=&gt;</span> <span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token comment">// we can define static props</span>
  <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&quot;text&quot;</span><span class="token punctuation">,</span>

  <span class="token comment">// or we can define dynamic ones</span>
  <span class="token literal-property property">size</span><span class="token operator">:</span> props<span class="token punctuation">.</span>size <span class="token operator">||</span> <span class="token string">&quot;1em&quot;</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">
  color: palevioletred;
  font-size: 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;

  /* here we use the dynamically computed prop */
  margin: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token parameter">props</span> <span class="token operator">=&gt;</span> props<span class="token punctuation">.</span>size<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">;
  padding: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token parameter">props</span> <span class="token operator">=&gt;</span> props<span class="token punctuation">.</span>size<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">;
</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="overriding-attrs" tabindex="-1"><a class="header-anchor" href="#overriding-attrs" aria-hidden="true">#</a> Overriding .attrs</h3><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> Input <span class="token operator">=</span> styled<span class="token punctuation">.</span>input<span class="token punctuation">.</span><span class="token function">attrs</span><span class="token punctuation">(</span><span class="token parameter">props</span> <span class="token operator">=&gt;</span> <span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&quot;text&quot;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">size</span><span class="token operator">:</span> props<span class="token punctuation">.</span>size <span class="token operator">||</span> <span class="token string">&quot;1em&quot;</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">
  border: 2px solid palevioletred;
  margin: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token parameter">props</span> <span class="token operator">=&gt;</span> props<span class="token punctuation">.</span>size<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">;
  padding: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token parameter">props</span> <span class="token operator">=&gt;</span> props<span class="token punctuation">.</span>size<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">;
</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">;</span>

<span class="token comment">// Input&#39;s attrs will be applied first, and then this attrs obj</span>
<span class="token keyword">const</span> PasswordInput <span class="token operator">=</span> <span class="token function">styled</span><span class="token punctuation">(</span>Input<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">attrs</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&quot;password&quot;</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">
  // similarly, border will override Input&#39;s border
  border: 2px solid aqua;
</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="animations" tabindex="-1"><a class="header-anchor" href="#animations" aria-hidden="true">#</a> Animations</h2><p>使用 <code>keyframes</code> API 定義動畫</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// Create the keyframes</span>
<span class="token keyword">const</span> rotate <span class="token operator">=</span> keyframes<span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">;</span>

<span class="token comment">// Here we create a component that will rotate everything we pass in over two seconds</span>
<span class="token keyword">const</span> Rotate <span class="token operator">=</span> styled<span class="token punctuation">.</span>div<span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">
  display: inline-block;
  animation: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>rotate<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> 2s linear infinite;
  padding: 2rem 1rem;
  font-size: 1.2rem;
</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">;</span>

<span class="token function">render</span><span class="token punctuation">(</span>
  <span class="token operator">&lt;</span>Rotate<span class="token operator">&gt;</span><span class="token operator">&amp;</span>lt<span class="token punctuation">;</span> 💅🏾 <span class="token operator">&amp;</span>gt<span class="token punctuation">;</span><span class="token operator">&lt;</span><span class="token operator">/</span>Rotate<span class="token operator">&gt;</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>因為 keyframes 是 lazy-load 的，對於共用的 style fragment 記得在外層包裹 <code>css</code></p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> rotate <span class="token operator">=</span> keyframes<span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token template-punctuation string">\`</span></span>

<span class="token comment">// ❌ This will throw an error!</span>
<span class="token keyword">const</span> styles <span class="token operator">=</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">
  animation: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>rotate<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> 2s linear infinite;
</span><span class="token template-punctuation string">\`</span></span>

<span class="token comment">// ✅ This will work as intended</span>
<span class="token keyword">const</span> styles <span class="token operator">=</span> css<span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">
  animation: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>rotate<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> 2s linear infinite;
</span><span class="token template-punctuation string">\`</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,34),o=[p];function i(l,c){return s(),a("div",null,o)}const d=n(e,[["render",i],["__file","react-styled-components-basic.html.vue"]]);export{d as default};
