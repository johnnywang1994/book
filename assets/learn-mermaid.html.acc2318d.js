import{_ as l,r as d,o as t,c as m,d as e,e as n,a as i,f as s}from"./app.29e1f3ff.js";const c={},v=e("h1",{id:"mermaid-\u5B78\u7FD2\u7B46\u8A18",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#mermaid-\u5B78\u7FD2\u7B46\u8A18","aria-hidden":"true"},"#"),n(" Mermaid \u5B78\u7FD2\u7B46\u8A18")],-1),o=e("p",null,"\u6BCF\u4E00\u7A2E\u5716\u7684\u8A9E\u6CD5\u90FD\u4E0D\u592A\u4E00\u6A23\uFF0C\u8ACB\u5148\u78BA\u8A8D\u9700\u8981\u7684\u5716\u518D\u9032\u884C\u64B0\u5BEB",-1),u=e("h2",{id:"flowchart",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#flowchart","aria-hidden":"true"},"#"),n(" Flowchart")],-1),A={href:"https://mermaid-js.github.io/mermaid/#/flowchart",target:"_blank",rel:"noopener noreferrer"},h=s(`<div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>flowchart TD
    Entry[\u5165\u53E3] --&gt; checkMoney{\u6AA2\u67E5\u9918\u984D}
    checkMoney --&gt; |Money &gt;= 100| Success[\u6210\u529F]
    checkMoney --&gt; |Money &lt; 100| Failed[\u5931\u6557]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="requirement-diagram" tabindex="-1"><a class="header-anchor" href="#requirement-diagram" aria-hidden="true">#</a> Requirement Diagram</h2>`,2),b={href:"https://mermaid-js.github.io/mermaid/#/requirementDiagram",target:"_blank",rel:"noopener noreferrer"},g=s(`<div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>requirementDiagram

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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="class-diagram" tabindex="-1"><a class="header-anchor" href="#class-diagram" aria-hidden="true">#</a> Class Diagram</h2>`,2),E={href:"https://mermaid-js.github.io/mermaid/#/classDiagram",target:"_blank",rel:"noopener noreferrer"},p=s(`<div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>classDiagram
class Animal {
    +String name
    +Number age
    +run() void
}

class Dog {
    +bite()
}

class Zoo {
    +List~Animal~ animals
    +add(newAnimal) void
    +remove(targetAnimal) void
}

%% Dog \u7E7C\u627F Animal
Dog --|&gt; Animal
%% Zoo \u4F9D\u8CF4 Animal
Zoo ..&gt; Animal
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="piechart" tabindex="-1"><a class="header-anchor" href="#piechart" aria-hidden="true">#</a> PieChart</h2>`,2),_={href:"https://mermaid-js.github.io/mermaid/#/pie",target:"_blank",rel:"noopener noreferrer"},f=s(`<div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>pie title WeeklyReport
    &quot;Working&quot; : 80
    &quot;Toilet&quot; : 5
    &quot;Sleeping&quot; : 15
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,1);function k(B,D){const a=d("ExternalLinkIcon"),r=d("Mermaid");return t(),m("div",null,[v,o,u,e("ul",null,[e("li",null,[e("a",A,[n("Link"),i(a)])])]),i(r,{id:"mermaid_382ee14b",graph:"flowchart%20TD%0A%20%20%20%20Entry%5B%E5%85%A5%E5%8F%A3%5D%20--%3E%20checkMoney%7B%E6%AA%A2%E6%9F%A5%E9%A4%98%E9%A1%8D%7D%0A%20%20%20%20checkMoney%20--%3E%20%7CMoney%20%3E%3D%20100%7C%20Success%5B%E6%88%90%E5%8A%9F%5D%0A%20%20%20%20checkMoney%20--%3E%20%7CMoney%20%3C%20100%7C%20Failed%5B%E5%A4%B1%E6%95%97%5D%0A"}),h,e("ul",null,[e("li",null,[e("a",b,[n("Link"),i(a)])])]),i(r,{id:"mermaid_382ee16c",graph:"requirementDiagram%0A%0Arequirement%20MainPage%20%7B%0A%20%20%20%20id%3A%20mainpage%0A%20%20%20%20text%3A%20%22%E4%B8%BB%E8%A6%81%E6%B4%BB%E5%8B%95%E9%A0%81%E9%9D%A2%22%0A%20%20%20%20risk%3A%20High%0A%20%20%20%20verifymethod%3A%20Inspection%0A%7D%0A%0Arequirement%20SorryPage%20%7B%0A%20%20%20%20id%3A%20sorrypage%0A%20%20%20%20text%3A%20%22%E9%8C%AF%E8%AA%A4%E9%A0%81%E9%9D%A2%22%0A%20%20%20%20risk%3A%20High%0A%20%20%20%20verifymethod%3A%20Inspection%0A%7D%0A%0AfunctionalRequirement%20CheckEventTime%20%7B%0A%20%20%20%20id%3A%20check%20event%20time%0A%20%20%20%20text%3A%20%22%E6%AA%A2%E6%9F%A5%E6%B4%BB%E5%8B%95%E6%99%82%E9%96%93%22%0A%20%20%20%20risk%3A%20High%0A%20%20%20%20verifymethod%3A%20Test%0A%7D%0A%0Aelement%20EventTime%20%7B%0A%20%20%20%20type%3A%20DateFormat%0A%20%20%20%20docref%3A%20%22define%2Feventtime%22%0A%7D%0A%0AMainPage%20-%20contains%20-%3E%20CheckEventTime%0ACheckEventTime%20-%20verifies%20-%3E%20EventTime%0ACheckEventTime%20-%20derives%20-%3E%20SorryPage%0A"}),g,e("ul",null,[e("li",null,[e("a",E,[n("Link"),i(a)])])]),i(r,{id:"mermaid_382ee1a2",graph:"classDiagram%0Aclass%20Animal%20%7B%0A%20%20%20%20%2BString%20name%0A%20%20%20%20%2BNumber%20age%0A%20%20%20%20%2Brun()%20void%0A%7D%0A%0Aclass%20Dog%20%7B%0A%20%20%20%20%2Bbite()%0A%7D%0A%0Aclass%20Zoo%20%7B%0A%20%20%20%20%2BList~Animal~%20animals%0A%20%20%20%20%2Badd(newAnimal)%20void%0A%20%20%20%20%2Bremove(targetAnimal)%20void%0A%7D%0A%0A%25%25%20Dog%20%E7%B9%BC%E6%89%BF%20Animal%0ADog%20--%7C%3E%20Animal%0A%25%25%20Zoo%20%E4%BE%9D%E8%B3%B4%20Animal%0AZoo%20..%3E%20Animal%0A"}),p,e("ul",null,[e("li",null,[e("a",_,[n("Link"),i(a)])])]),i(r,{id:"mermaid_382ee1c3",graph:"pie%20title%20WeeklyReport%0A%20%20%20%20%22LINE%20Invoice%22%20%3A%2080%0A%20%20%20%20%22Sticker%20Campaign%22%20%3A%205%0A%20%20%20%20%22SbE%20Workshop%22%20%3A%2015%0A"}),f])}const y=l(c,[["render",k],["__file","learn-mermaid.html.vue"]]);export{y as default};
