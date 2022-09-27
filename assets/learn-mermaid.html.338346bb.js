import{_ as l,o as t,a as i,d as n,b as e,F as p,e as s,f as r,r as o}from"./app.41f96392.js";const c={},m=n("h1",{id:"mermaid-\u5B78\u7FD2\u7B46\u8A18",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#mermaid-\u5B78\u7FD2\u7B46\u8A18","aria-hidden":"true"},"#"),s(" Mermaid \u5B78\u7FD2\u7B46\u8A18")],-1),u=n("p",null,"\u6BCF\u4E00\u7A2E\u5716\u7684\u8A9E\u6CD5\u90FD\u4E0D\u592A\u4E00\u6A23\uFF0C\u8ACB\u5148\u78BA\u8A8D\u9700\u8981\u7684\u5716\u518D\u9032\u884C\u64B0\u5BEB",-1),b=n("h2",{id:"flowchart",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#flowchart","aria-hidden":"true"},"#"),s(" Flowchart")],-1),d={href:"https://mermaid-js.github.io/mermaid/#/flowchart",target:"_blank",rel:"noopener noreferrer"},h=s("Link"),g=r(`<div class="language-mermaid ext-mermaid line-numbers-mode"><pre class="language-mermaid"><code><span class="token keyword">flowchart</span> TD
    Entry<span class="token text string">[\u5165\u53E3]</span> <span class="token arrow operator">--&gt;</span> checkMoney<span class="token text string">{\u6AA2\u67E5\u9918\u984D}</span>
    checkMoney <span class="token arrow operator">--&gt;</span> <span class="token label property">|Money &gt;= 100|</span> Success<span class="token text string">[\u6210\u529F]</span>
    checkMoney <span class="token arrow operator">--&gt;</span> <span class="token label property">|Money &lt; 100|</span> Failed<span class="token text string">[\u5931\u6557]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><h2 id="requirement-diagram" tabindex="-1"><a class="header-anchor" href="#requirement-diagram" aria-hidden="true">#</a> Requirement Diagram</h2>`,2),k={href:"https://mermaid-js.github.io/mermaid/#/requirementDiagram",target:"_blank",rel:"noopener noreferrer"},_=s("Link"),v=r(`<div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>requirementDiagram

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
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br></div></div><h2 id="class-diagram" tabindex="-1"><a class="header-anchor" href="#class-diagram" aria-hidden="true">#</a> Class Diagram</h2>`,2),f={href:"https://mermaid-js.github.io/mermaid/#/classDiagram",target:"_blank",rel:"noopener noreferrer"},x=s("Link"),q=r(`<div class="language-mermaid ext-mermaid line-numbers-mode"><pre class="language-mermaid"><code><span class="token keyword">classDiagram</span>
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
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br></div></div><h2 id="piechart" tabindex="-1"><a class="header-anchor" href="#piechart" aria-hidden="true">#</a> PieChart</h2>`,2),y={href:"https://mermaid-js.github.io/mermaid/#/pie",target:"_blank",rel:"noopener noreferrer"},w=s("Link"),E=r(`<div class="language-mermaid ext-mermaid line-numbers-mode"><pre class="language-mermaid"><code><span class="token keyword">pie</span> title WeeklyReport
    <span class="token string">&quot;LINE Invoice&quot;</span> <span class="token operator">:</span> 80
    <span class="token string">&quot;Sticker Campaign&quot;</span> <span class="token operator">:</span> 5
    <span class="token string">&quot;SbE Workshop&quot;</span> <span class="token operator">:</span> 15
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div>`,1);function D(M,T){const a=o("ExternalLinkIcon");return t(),i(p,null,[m,u,b,n("ul",null,[n("li",null,[n("a",d,[h,e(a)])])]),g,n("ul",null,[n("li",null,[n("a",k,[_,e(a)])])]),v,n("ul",null,[n("li",null,[n("a",f,[x,e(a)])])]),q,n("ul",null,[n("li",null,[n("a",y,[w,e(a)])])]),E],64)}var C=l(c,[["render",D],["__file","learn-mermaid.html.vue"]]);export{C as default};
