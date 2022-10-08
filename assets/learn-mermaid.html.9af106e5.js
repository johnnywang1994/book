import{_ as r,r as l,o as t,c as d,d as e,e as n,a,f as i}from"./app.988fb428.js";const o={},c=e("h1",{id:"mermaid-\u5B78\u7FD2\u7B46\u8A18",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#mermaid-\u5B78\u7FD2\u7B46\u8A18","aria-hidden":"true"},"#"),n(" Mermaid \u5B78\u7FD2\u7B46\u8A18")],-1),m=e("p",null,"\u6BCF\u4E00\u7A2E\u5716\u7684\u8A9E\u6CD5\u90FD\u4E0D\u592A\u4E00\u6A23\uFF0C\u8ACB\u5148\u78BA\u8A8D\u9700\u8981\u7684\u5716\u518D\u9032\u884C\u64B0\u5BEB",-1),v=e("h2",{id:"flowchart",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#flowchart","aria-hidden":"true"},"#"),n(" Flowchart")],-1),u={href:"https://mermaid-js.github.io/mermaid/#/flowchart",target:"_blank",rel:"noopener noreferrer"},p=i(`<div class="language-mermaid ext-mermaid line-numbers-mode"><pre class="language-mermaid"><code><span class="token keyword">flowchart</span> TD
    Entry<span class="token text string">[\u5165\u53E3]</span> <span class="token arrow operator">--&gt;</span> checkMoney<span class="token text string">{\u6AA2\u67E5\u9918\u984D}</span>
    checkMoney <span class="token arrow operator">--&gt;</span> <span class="token label property">|Money &gt;= 100|</span> Success<span class="token text string">[\u6210\u529F]</span>
    checkMoney <span class="token arrow operator">--&gt;</span> <span class="token label property">|Money &lt; 100|</span> Failed<span class="token text string">[\u5931\u6557]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="requirement-diagram" tabindex="-1"><a class="header-anchor" href="#requirement-diagram" aria-hidden="true">#</a> Requirement Diagram</h2>`,2),b={href:"https://mermaid-js.github.io/mermaid/#/requirementDiagram",target:"_blank",rel:"noopener noreferrer"},h=i(`<div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>requirementDiagram

requirement MainPage {
    id: mainpage
    text: &quot;\u4E3B\u8981\u6D3B\u52D5\u9801\u9762&quot;
    risk: High
    verifymethod: Inspection
}

requirement SorryPage {
    id: sorrypage
    text: &quot;\u932F\u8AA4\u9801\u9762&quot;
    risk: High
    verifymethod: Inspection
}

functionalRequirement CheckEventTime {
    id: check event time
    text: &quot;\u6AA2\u67E5\u6D3B\u52D5\u6642\u9593&quot;
    risk: High
    verifymethod: Test
}

element EventTime {
    type: DateFormat
    docref: &quot;define/eventtime&quot;
}

MainPage - contains -&gt; CheckEventTime
CheckEventTime - verifies -&gt; EventTime
CheckEventTime - derives -&gt; SorryPage
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="class-diagram" tabindex="-1"><a class="header-anchor" href="#class-diagram" aria-hidden="true">#</a> Class Diagram</h2>`,2),k={href:"https://mermaid-js.github.io/mermaid/#/classDiagram",target:"_blank",rel:"noopener noreferrer"},g=i(`<div class="language-mermaid ext-mermaid line-numbers-mode"><pre class="language-mermaid"><code><span class="token keyword">classDiagram</span>
<span class="token keyword">class</span> Animal <span class="token punctuation">{</span>
    +String name
    +Number age
    +run<span class="token punctuation">(</span><span class="token punctuation">)</span> void
<span class="token punctuation">}</span>

<span class="token keyword">class</span> Dog <span class="token punctuation">{</span>
    +bite<span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> Zoo <span class="token punctuation">{</span>
    +List~Animal~ animals
    +add<span class="token text string">(newAnimal)</span> void
    +remove<span class="token text string">(targetAnimal)</span> void
<span class="token punctuation">}</span>

<span class="token comment">%% Dog \u7E7C\u627F Animal</span>
Dog <span class="token arrow operator">--|&gt;</span> Animal
<span class="token comment">%% Zoo \u4F9D\u8CF4 Animal</span>
Zoo <span class="token arrow operator">..&gt;</span> Animal
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="piechart" tabindex="-1"><a class="header-anchor" href="#piechart" aria-hidden="true">#</a> PieChart</h2>`,2),_={href:"https://mermaid-js.github.io/mermaid/#/pie",target:"_blank",rel:"noopener noreferrer"},f=i(`<div class="language-mermaid ext-mermaid line-numbers-mode"><pre class="language-mermaid"><code><span class="token keyword">pie</span> title WeeklyReport
    <span class="token string">&quot;LINE Invoice&quot;</span> <span class="token operator">:</span> 80
    <span class="token string">&quot;Sticker Campaign&quot;</span> <span class="token operator">:</span> 5
    <span class="token string">&quot;SbE Workshop&quot;</span> <span class="token operator">:</span> 15
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,1);function x(q,y){const s=l("ExternalLinkIcon");return t(),d("div",null,[c,m,v,e("ul",null,[e("li",null,[e("a",u,[n("Link"),a(s)])])]),p,e("ul",null,[e("li",null,[e("a",b,[n("Link"),a(s)])])]),h,e("ul",null,[e("li",null,[e("a",k,[n("Link"),a(s)])])]),g,e("ul",null,[e("li",null,[e("a",_,[n("Link"),a(s)])])]),f])}const E=r(o,[["render",x],["__file","learn-mermaid.html.vue"]]);export{E as default};
