import{_ as t,r as o,o as i,c as l,d as n,e as s,a as e,f as p}from"./app-da643460.js";const c={},r=p(`<h1 id="graphql-學習筆記-進階篇" tabindex="-1"><a class="header-anchor" href="#graphql-學習筆記-進階篇" aria-hidden="true">#</a> GraphQL 學習筆記 - 進階篇</h1><h2 id="custom-scalar" tabindex="-1"><a class="header-anchor" href="#custom-scalar" aria-hidden="true">#</a> Custom Scalar</h2><p>當應用程式越來越複雜後，預設 GraphQL 提供的 Scalar Type <code>Int</code>, <code>Float</code>, <code>String</code>, <code>Boolean</code>, <code>ID</code> 會漸漸無法真實檢驗資料類型，有跟沒有一樣，此時可以透過客製化 GraphQL 的 scalar 來增強這功能，當然也能安裝其他工具套件幫忙喔～</p><h3 id="date-實作範例" tabindex="-1"><a class="header-anchor" href="#date-實作範例" aria-hidden="true">#</a> Date 實作範例</h3><ul><li><code>name</code> (Required) Scalar Type 名稱 (需對上 schema 定義時的名稱)</li><li><code>description</code> (Optional) Scalar Type 介紹</li><li><code>serialize(value)</code> (Required) Server 回覆給 Client 的值。 <blockquote><p>當 Server 在 Resolver 處理完資料輸出時，會將結果以 <code>value</code> 傳進來，而 serialize 決定最後輸出的值。需注意！這邊輸出的值的型別只要是 JSON 格式允許的值都行，如 Int, String, Object, Array 等等。</p></blockquote></li><li><code>parseValue(value)</code> (Required) Client 傳給 Server 的值， <code>value</code> 會從 variables 中獲得。</li><li><code>parseLiteral(ast)</code> (Required) Client 傳給 Server 的值， ast 會從 query 字串中解析出來，而 ast 的值是一個 AST 格式的 Object，舉個例子如下</li></ul><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> gql <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;apollo-server&#39;</span>

<span class="token keyword">const</span> schema <span class="token operator">=</span> <span class="token function">gql</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">
  scalar Date
</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> GraphQLScalarType <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;graphql&#39;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> Kind <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;graphql/language&#39;</span>

<span class="token keyword">const</span> resolvers <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">Date</span><span class="token operator">:</span> <span class="token keyword">new</span> <span class="token class-name">GraphQLScalarType</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;Date&#39;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">description</span><span class="token operator">:</span> <span class="token string">&#39;Date custom scalar type&#39;</span><span class="token punctuation">,</span>
    <span class="token function">serialize</span><span class="token punctuation">(</span><span class="token parameter">value</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> value<span class="token punctuation">.</span><span class="token function">getTime</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// value sent to the client</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token function">parseValue</span><span class="token punctuation">(</span><span class="token parameter">value</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// value from the client</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token function">parseLiteral</span><span class="token punctuation">(</span><span class="token parameter">ast</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// 從前端 query 字串進來的 input</span>
      <span class="token comment">// 這邊僅接受輸入進來的是 Int 值</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>ast<span class="token punctuation">.</span>kind <span class="token operator">===</span> Kind<span class="token punctuation">.</span><span class="token constant">INT</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span><span class="token function">parseInt</span><span class="token punctuation">(</span>ast<span class="token punctuation">.</span>value<span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// ast value is always in string format</span>
      <span class="token punctuation">}</span>
      <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="外部套件-okgrow-graphql-scalars" tabindex="-1"><a class="header-anchor" href="#外部套件-okgrow-graphql-scalars" aria-hidden="true">#</a> 外部套件 @okgrow/graphql-scalars</h3><p>schema 部分一樣需要自行定義，resolver 直接引入就完成了！</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> DateTime <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;@okgrow/graphql-scalars&#39;</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> resolvers <span class="token operator">=</span> <span class="token punctuation">{</span>
  DateTime<span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="interface" tabindex="-1"><a class="header-anchor" href="#interface" aria-hidden="true">#</a> Interface</h2>`,11),u={href:"https://ithelp.ithome.com.tw/articles/10207038",target:"_blank",rel:"noopener noreferrer"},d=p(`<h3 id="範例" tabindex="-1"><a class="header-anchor" href="#範例" aria-hidden="true">#</a> 範例</h3><p>今天有個貼文功能如下</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>type Post <span class="token punctuation">{</span>
  <span class="token literal-property property">id</span><span class="token operator">:</span> <span class="token constant">ID</span><span class="token operator">!</span>
  <span class="token literal-property property">author</span><span class="token operator">:</span> User<span class="token operator">!</span>
  <span class="token literal-property property">title</span><span class="token operator">:</span> String
  <span class="token literal-property property">body</span><span class="token operator">:</span> String
<span class="token punctuation">}</span>

type User <span class="token punctuation">{</span>
  <span class="token literal-property property">id</span><span class="token operator">:</span> <span class="token constant">ID</span><span class="token operator">!</span>
  <span class="token literal-property property">name</span><span class="token operator">:</span> String
  <span class="token literal-property property">avatarUrl</span><span class="token operator">:</span> String
  <span class="token literal-property property">friends</span><span class="token operator">:</span> <span class="token punctuation">[</span>User<span class="token punctuation">]</span>
<span class="token punctuation">}</span>

type Query <span class="token punctuation">{</span>
  <span class="token function">post</span><span class="token punctuation">(</span>id<span class="token operator">:</span> <span class="token constant">ID</span><span class="token operator">!</span><span class="token punctuation">)</span><span class="token operator">:</span> Post
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>查詢 post 的作者 query 請求如下</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>query <span class="token punctuation">{</span>
  <span class="token function">post</span><span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">id</span><span class="token operator">:</span> <span class="token number">1</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    author <span class="token punctuation">{</span>
      name
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>但如果今天要加入一個 <code>粉絲專頁</code> 功能，而粉絲專頁也可以新增貼文，schema 如下，原本的 <code>Post.author</code> 顯然無法同時滿足這兩個 type，此時就可以利用 <code>interface</code> 的多型處理</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>type FanPage <span class="token punctuation">{</span>
  <span class="token literal-property property">id</span><span class="token operator">:</span> <span class="token constant">ID</span><span class="token operator">!</span>
  <span class="token literal-property property">name</span><span class="token operator">:</span> String
  <span class="token literal-property property">avatarUrl</span><span class="token operator">:</span> String
  <span class="token literal-property property">likeGivers</span><span class="token operator">:</span> <span class="token punctuation">[</span>User<span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>定義共同的部分進行多型的 <code>implements</code>，並將 <code>Post.author</code> 給予該 <code>interface</code></p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>type Post <span class="token punctuation">{</span>
  <span class="token literal-property property">id</span><span class="token operator">:</span> <span class="token constant">ID</span><span class="token operator">!</span>
  <span class="token literal-property property">author</span><span class="token operator">:</span> Charater<span class="token operator">!</span>
  <span class="token literal-property property">title</span><span class="token operator">:</span> String
  <span class="token literal-property property">body</span><span class="token operator">:</span> String
<span class="token punctuation">}</span>

<span class="token keyword">interface</span> <span class="token class-name">Character</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">id</span><span class="token operator">:</span> <span class="token constant">ID</span><span class="token operator">!</span>
  <span class="token literal-property property">name</span><span class="token operator">:</span> String
  <span class="token literal-property property">avatarUrl</span><span class="token operator">:</span> String
<span class="token punctuation">}</span>

type User <span class="token keyword">implements</span> <span class="token class-name">Character</span><span class="token punctuation">{</span>
  <span class="token literal-property property">id</span><span class="token operator">:</span> <span class="token constant">ID</span><span class="token operator">!</span>
  <span class="token literal-property property">name</span><span class="token operator">:</span> String
  <span class="token literal-property property">avatarUrl</span><span class="token operator">:</span> String
  <span class="token literal-property property">friends</span><span class="token operator">:</span> <span class="token punctuation">[</span>User<span class="token punctuation">]</span>
<span class="token punctuation">}</span>

type FanPage <span class="token keyword">implements</span> <span class="token class-name">Character</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">id</span><span class="token operator">:</span> <span class="token constant">ID</span><span class="token operator">!</span>
  <span class="token literal-property property">name</span><span class="token operator">:</span> String
  <span class="token literal-property property">avatarUrl</span><span class="token operator">:</span> String
  <span class="token literal-property property">likeGivers</span><span class="token operator">:</span> <span class="token punctuation">[</span>User<span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>套用了 interface 的 <code>author</code> field 就可以根據情況取得不同的 type 進行展開</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>query <span class="token punctuation">{</span>
  <span class="token function">post</span><span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">id</span><span class="token operator">:</span> <span class="token number">1</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    author <span class="token punctuation">{</span>
      name
      <span class="token operator">...</span>on User <span class="token punctuation">{</span>
        friends <span class="token punctuation">{</span>
          name
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
      <span class="token operator">...</span>on FanPage <span class="token punctuation">{</span>
        likeGivers <span class="token punctuation">{</span>
          name
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>這樣 GraphQL 就會判斷，如果作者是 <code>User Type</code> 那就會進入 ...on User 並回傳其中的 fields ，如果是 FanPage Type 那就會進入 ...on FanPage 並回傳其中的 fields 。</p><blockquote><p><code>...on SpcificType { ... }</code> 叫做 <code>inline fragment</code></p></blockquote><h3 id="實作-interface" tabindex="-1"><a class="header-anchor" href="#實作-interface" aria-hidden="true">#</a> 實作 interface</h3><p>若今天我們需要直接在 query 中返回 interface， 必需明確指定 <code>Object Type</code> 的名稱，如下面範例我們在 Query 中的 animal field 返回了 interface</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">interface</span> <span class="token class-name">Animal</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">name</span><span class="token operator">:</span> String
<span class="token punctuation">}</span>

type Bird <span class="token keyword">implements</span> <span class="token class-name">Animal</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">name</span><span class="token operator">:</span> String
  <span class="token literal-property property">wingSpanLength</span><span class="token operator">:</span> Int
<span class="token punctuation">}</span>

type Monkey <span class="token keyword">implements</span> <span class="token class-name">Animal</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">name</span><span class="token operator">:</span> String
  <span class="token literal-property property">armSpanLength</span><span class="token operator">:</span> Int
<span class="token punctuation">}</span>

type Query <span class="token punctuation">{</span>
  <span class="token function">animal</span><span class="token punctuation">(</span>name<span class="token operator">:</span> String<span class="token punctuation">)</span><span class="token operator">:</span> Animal
  <span class="token literal-property property">animals</span><span class="token operator">:</span> <span class="token punctuation">[</span>Animal<span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我們需要在 <code>resolver</code> 中定義</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> animals <span class="token operator">=</span> <span class="token punctuation">[</span>
  <span class="token punctuation">{</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;Chiken Litte&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">wingSpanLength</span><span class="token operator">:</span> <span class="token number">10</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;Goku&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">armSpanLength</span><span class="token operator">:</span> <span class="token number">20</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;King Kong&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">armSpanLength</span><span class="token operator">:</span> <span class="token number">200</span> <span class="token punctuation">}</span>
<span class="token punctuation">]</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> resolvers <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">Animal</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token comment">// 一定要實作這一個特殊 field</span>
    <span class="token function">__resolveType</span><span class="token punctuation">(</span><span class="token parameter">obj<span class="token punctuation">,</span> context<span class="token punctuation">,</span> info</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// obj 為該 field 得到的資料</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>obj<span class="token punctuation">.</span>wingSpanLength<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 回傳相對應得 Object type 名稱</span>
        <span class="token keyword">return</span> <span class="token string">&#39;Bird&#39;</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>

      <span class="token keyword">if</span> <span class="token punctuation">(</span>obj<span class="token punctuation">.</span>armSpanLength<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token string">&#39;Monkey&#39;</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>

      <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">Query</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token function-variable function">animal</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token parameter">root<span class="token punctuation">,</span> <span class="token punctuation">{</span> name <span class="token punctuation">}</span></span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> animals<span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token parameter">animal</span> <span class="token operator">=&gt;</span> animal<span class="token punctuation">.</span>name <span class="token operator">===</span> name<span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token function-variable function">animals</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> animals
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="node-interface-pattern" tabindex="-1"><a class="header-anchor" href="#node-interface-pattern" aria-hidden="true">#</a> Node Interface Pattern</h2><p>實作起來很簡單，但概念卻很重要，在大型的 <code>GraphQL Schema</code> 中，一般會推薦所有主要商業邏輯物件都要實作 <code>Node interface type</code>，因為通常這些物件在 <code>database</code> 中都有 <code>id</code> ，實作 <code>Node interface type</code> 可以明確告訴 Client 這是一個重要概念的物件，並且可透過 id 的操作來做 caching 及 batching。</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">interface</span> <span class="token class-name">Node</span> <span class="token punctuation">{</span>
  <span class="token string">&quot;ID of the object&quot;</span>
  <span class="token literal-property property">id</span><span class="token operator">:</span> <span class="token constant">ID</span><span class="token operator">!</span>
<span class="token punctuation">}</span>

type User <span class="token keyword">implements</span> <span class="token class-name">Node</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">id</span><span class="token operator">:</span> <span class="token constant">ID</span><span class="token operator">!</span>
  <span class="token operator">...</span>
<span class="token punctuation">}</span>

type Post <span class="token keyword">implements</span> <span class="token class-name">Node</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">id</span><span class="token operator">:</span> <span class="token constant">ID</span><span class="token operator">!</span>
  <span class="token operator">...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>甚至能當成強大的 id 搜尋功能，可以根據需要進行 <code>inline fragment</code> 查找各種 type 的物件目標</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>type Query <span class="token punctuation">{</span>
  <span class="token function">node</span><span class="token punctuation">(</span>id<span class="token operator">:</span> <span class="token constant">ID</span><span class="token operator">!</span><span class="token punctuation">)</span><span class="token operator">:</span> Node
  <span class="token function">nodes</span><span class="token punctuation">(</span>ids<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token constant">ID</span><span class="token operator">!</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token punctuation">[</span>Node<span class="token punctuation">]</span><span class="token operator">!</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="union" tabindex="-1"><a class="header-anchor" href="#union" aria-hidden="true">#</a> Union</h2><p>Interface type 與 Union type 很常搞混，以下是 Union type 的範例</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>union Result <span class="token operator">=</span> Book <span class="token operator">|</span> Author

type Book <span class="token punctuation">{</span>
  <span class="token literal-property property">title</span><span class="token operator">:</span> String
<span class="token punctuation">}</span>

type Author <span class="token punctuation">{</span>
  <span class="token literal-property property">name</span><span class="token operator">:</span> String
<span class="token punctuation">}</span>

type Query <span class="token punctuation">{</span>
  <span class="token function">search</span><span class="token punctuation">(</span>contains<span class="token operator">:</span> String<span class="token operator">!</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token punctuation">[</span>Result<span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>實作 Interface type 的 type 都有一些共通 fields (強制要定義)，而在 Union type 範疇裡的 type 則不必有共通 fields</p></blockquote><p>兩者的相似之處在於最終回傳時一定要是一個實際的 type ，不能傳回 interface 或 union type 的資料。</p><p>接著看看 resolver 的部分</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> authors <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">{</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;John&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;Mary&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> books <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">{</span> <span class="token literal-property property">title</span><span class="token operator">:</span> <span class="token string">&#39;Journey to the West&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token literal-property property">title</span><span class="token operator">:</span> <span class="token string">&#39;Mary Loves Me&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">]</span>
<span class="token keyword">const</span> resolvers <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">Result</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token comment">// 一定要實作這一個特殊 field</span>
    <span class="token function">__resolveType</span><span class="token punctuation">(</span><span class="token parameter">obj<span class="token punctuation">,</span> context<span class="token punctuation">,</span> info</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
      <span class="token comment">// obj 為該 field 得到的資料</span>
      <span class="token keyword">if</span><span class="token punctuation">(</span>obj<span class="token punctuation">.</span>name<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token comment">// 回傳相對應得 Object type 名稱</span>
        <span class="token keyword">return</span> <span class="token string">&#39;Author&#39;</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>

      <span class="token keyword">if</span><span class="token punctuation">(</span>obj<span class="token punctuation">.</span>title<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token string">&#39;Book&#39;</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>

      <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">Query</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token function-variable function">search</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token parameter">root<span class="token punctuation">,</span> <span class="token punctuation">{</span> body <span class="token punctuation">}</span></span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span>
      <span class="token punctuation">[</span>
        <span class="token operator">...</span>authors<span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span><span class="token parameter">author</span> <span class="token operator">=&gt;</span> author<span class="token punctuation">.</span>name<span class="token punctuation">.</span><span class="token function">includes</span><span class="token punctuation">(</span>body<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
        <span class="token operator">...</span>books<span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span><span class="token parameter">book</span> <span class="token operator">=&gt;</span> book<span class="token punctuation">.</span>title<span class="token punctuation">.</span><span class="token function">includes</span><span class="token punctuation">(</span>body<span class="token punctuation">)</span><span class="token punctuation">)</span>
      <span class="token punctuation">]</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="inline-fragment-with-union-type" tabindex="-1"><a class="header-anchor" href="#inline-fragment-with-union-type" aria-hidden="true">#</a> Inline fragment with Union type</h3><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>query <span class="token punctuation">{</span>
  <span class="token function">search</span><span class="token punctuation">(</span>contains<span class="token operator">:</span> <span class="token string">&quot;Mary&quot;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token operator">...</span> on Author <span class="token punctuation">{</span>
      name
    <span class="token punctuation">}</span>
    <span class="token operator">...</span> on Book <span class="token punctuation">{</span>
      title
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="interface-union-的使用" tabindex="-1"><a class="header-anchor" href="#interface-union-的使用" aria-hidden="true">#</a> Interface &amp; Union 的使用</h2><p>大多數情況下比較少用到，除非真的有必要時才會使用，除了增加開發者的心智負擔外，也會導致後端整個複雜度的指數提升，通常還是先以 type 及 enum 嘗試實作，真的有必要時才使用 interface, union</p>`,34),k={href:"https://docs.github.com/en/graphql/overview/explorer",target:"_blank",rel:"noopener noreferrer"},v=n("h2",{id:"reference",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#reference","aria-hidden":"true"},"#"),s(" Reference")],-1),m={href:"https://ithelp.ithome.com.tw/articles/10202596",target:"_blank",rel:"noopener noreferrer"};function b(y,h){const a=o("ExternalLinkIcon");return i(),l("div",null,[r,n("ul",null,[n("li",null,[n("a",u,[s("Link"),e(a)])])]),d,n("p",null,[s("可以參考 "),n("a",k,[s("Github GraphQL API Explorer"),e(a)]),s(" 實際看看使用的場境學習～")]),v,n("ul",null,[n("li",null,[n("a",m,[s("2019 IT 邦幫忙 - Think in GraphQL"),e(a)])])])])}const f=t(c,[["render",b],["__file","advance.html.vue"]]);export{f as default};