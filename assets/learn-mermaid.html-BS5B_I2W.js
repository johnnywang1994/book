import{_ as i,c as l,d as n,a as s,r,o as d}from"./app-CA3bKxBI.js";const t={};function c(m,e){const a=r("Mermaid");return d(),l("div",null,[e[0]||(e[0]=n('<h1 id="mermaid-學習筆記" tabindex="-1"><a class="header-anchor" href="#mermaid-學習筆記"><span>Mermaid 學習筆記</span></a></h1><p>每一種圖的語法都不太一樣，請先確認需要的圖再進行撰寫</p><h2 id="flowchart" tabindex="-1"><a class="header-anchor" href="#flowchart"><span>Flowchart</span></a></h2><ul><li><a href="https://mermaid-js.github.io/mermaid/#/flowchart" target="_blank" rel="noopener noreferrer">Link</a></li></ul>',4)),s(a,{id:"mermaid_382ee14b",graph:"flowchart%20TD%0A%20%20%20%20Entry%5B%E5%85%A5%E5%8F%A3%5D%20--%3E%20checkMoney%7B%E6%AA%A2%E6%9F%A5%E9%A4%98%E9%A1%8D%7D%0A%20%20%20%20checkMoney%20--%3E%20%7CMoney%20%3E%3D%20100%7C%20Success%5B%E6%88%90%E5%8A%9F%5D%0A%20%20%20%20checkMoney%20--%3E%20%7CMoney%20%3C%20100%7C%20Failed%5B%E5%A4%B1%E6%95%97%5D%0A"}),e[1]||(e[1]=n(`<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">flowchart TD</span>
<span class="line">    Entry[入口] --&gt; checkMoney{檢查餘額}</span>
<span class="line">    checkMoney --&gt; |Money &gt;= 100| Success[成功]</span>
<span class="line">    checkMoney --&gt; |Money &lt; 100| Failed[失敗]</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="requirement-diagram" tabindex="-1"><a class="header-anchor" href="#requirement-diagram"><span>Requirement Diagram</span></a></h2><ul><li><a href="https://mermaid-js.github.io/mermaid/#/requirementDiagram" target="_blank" rel="noopener noreferrer">Link</a></li></ul>`,3)),s(a,{id:"mermaid_382ee16c",graph:"requirementDiagram%0A%0Arequirement%20MainPage%20%7B%0A%20%20%20%20id%3A%20mainpage%0A%20%20%20%20text%3A%20%22%E4%B8%BB%E8%A6%81%E6%B4%BB%E5%8B%95%E9%A0%81%E9%9D%A2%22%0A%20%20%20%20risk%3A%20High%0A%20%20%20%20verifymethod%3A%20Inspection%0A%7D%0A%0Arequirement%20SorryPage%20%7B%0A%20%20%20%20id%3A%20sorrypage%0A%20%20%20%20text%3A%20%22%E9%8C%AF%E8%AA%A4%E9%A0%81%E9%9D%A2%22%0A%20%20%20%20risk%3A%20High%0A%20%20%20%20verifymethod%3A%20Inspection%0A%7D%0A%0AfunctionalRequirement%20CheckEventTime%20%7B%0A%20%20%20%20id%3A%20check%20event%20time%0A%20%20%20%20text%3A%20%22%E6%AA%A2%E6%9F%A5%E6%B4%BB%E5%8B%95%E6%99%82%E9%96%93%22%0A%20%20%20%20risk%3A%20High%0A%20%20%20%20verifymethod%3A%20Test%0A%7D%0A%0Aelement%20EventTime%20%7B%0A%20%20%20%20type%3A%20DateFormat%0A%20%20%20%20docref%3A%20%22define%2Feventtime%22%0A%7D%0A%0AMainPage%20-%20contains%20-%3E%20CheckEventTime%0ACheckEventTime%20-%20verifies%20-%3E%20EventTime%0ACheckEventTime%20-%20derives%20-%3E%20SorryPage%0A"}),e[2]||(e[2]=n(`<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">requirementDiagram</span>
<span class="line"></span>
<span class="line">requirement MainPage {</span>
<span class="line">    id: mainpage</span>
<span class="line">    text: &quot;主要活動頁面&quot;</span>
<span class="line">    risk: High</span>
<span class="line">    verifymethod: Inspection</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">requirement SorryPage {</span>
<span class="line">    id: sorrypage</span>
<span class="line">    text: &quot;錯誤頁面&quot;</span>
<span class="line">    risk: High</span>
<span class="line">    verifymethod: Inspection</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">functionalRequirement CheckEventTime {</span>
<span class="line">    id: check event time</span>
<span class="line">    text: &quot;檢查活動時間&quot;</span>
<span class="line">    risk: High</span>
<span class="line">    verifymethod: Test</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">element EventTime {</span>
<span class="line">    type: DateFormat</span>
<span class="line">    docref: &quot;define/eventtime&quot;</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">MainPage - contains -&gt; CheckEventTime</span>
<span class="line">CheckEventTime - verifies -&gt; EventTime</span>
<span class="line">CheckEventTime - derives -&gt; SorryPage</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="class-diagram" tabindex="-1"><a class="header-anchor" href="#class-diagram"><span>Class Diagram</span></a></h2><ul><li><a href="https://mermaid-js.github.io/mermaid/#/classDiagram" target="_blank" rel="noopener noreferrer">Link</a></li></ul>`,3)),s(a,{id:"mermaid_382ee1a2",graph:"classDiagram%0Aclass%20Animal%20%7B%0A%20%20%20%20%2BString%20name%0A%20%20%20%20%2BNumber%20age%0A%20%20%20%20%2Brun()%20void%0A%7D%0A%0Aclass%20Dog%20%7B%0A%20%20%20%20%2Bbite()%0A%7D%0A%0Aclass%20Zoo%20%7B%0A%20%20%20%20%2BList~Animal~%20animals%0A%20%20%20%20%2Badd(newAnimal)%20void%0A%20%20%20%20%2Bremove(targetAnimal)%20void%0A%7D%0A%0A%25%25%20Dog%20%E7%B9%BC%E6%89%BF%20Animal%0ADog%20--%7C%3E%20Animal%0A%25%25%20Zoo%20%E4%BE%9D%E8%B3%B4%20Animal%0AZoo%20..%3E%20Animal%0A"}),e[3]||(e[3]=n(`<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">classDiagram</span>
<span class="line">class Animal {</span>
<span class="line">    +String name</span>
<span class="line">    +Number age</span>
<span class="line">    +run() void</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">class Dog {</span>
<span class="line">    +bite()</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">class Zoo {</span>
<span class="line">    +List~Animal~ animals</span>
<span class="line">    +add(newAnimal) void</span>
<span class="line">    +remove(targetAnimal) void</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">%% Dog 繼承 Animal</span>
<span class="line">Dog --|&gt; Animal</span>
<span class="line">%% Zoo 依賴 Animal</span>
<span class="line">Zoo ..&gt; Animal</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="piechart" tabindex="-1"><a class="header-anchor" href="#piechart"><span>PieChart</span></a></h2><ul><li><a href="https://mermaid-js.github.io/mermaid/#/pie" target="_blank" rel="noopener noreferrer">Link</a></li></ul>`,3)),s(a,{id:"mermaid_382ee1c3",graph:"pie%20title%20WeeklyReport%0A%20%20%20%20%22LINE%20Invoice%22%20%3A%2080%0A%20%20%20%20%22Sticker%20Campaign%22%20%3A%205%0A%20%20%20%20%22SbE%20Workshop%22%20%3A%2015%0A"}),e[4]||(e[4]=n(`<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code><span class="line">pie title WeeklyReport</span>
<span class="line">    &quot;Working&quot; : 80</span>
<span class="line">    &quot;Toilet&quot; : 5</span>
<span class="line">    &quot;Sleeping&quot; : 15</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,1))])}const v=i(t,[["render",c]]),o=JSON.parse('{"path":"/articles/memo/learn-mermaid.html","title":"Mermaid 學習筆記","lang":"zh-TW","frontmatter":{},"git":{"updatedTime":1665674889000,"contributors":[{"name":"JohnnyWang","username":"JohnnyWang","email":"johnnywang@test.com","commits":2,"url":"https://github.com/JohnnyWang"}],"changelog":[{"hash":"ba204e93b2ac1eb3cc67598a0a87d65aa016e4e8","time":1665674889000,"email":"johnnywang@test.com","author":"JohnnyWang","message":"UPD: add article list"},{"hash":"af457f7cdb4005dfc08e8654c532aeaceb942f2e","time":1664004536000,"email":"johnnywang@test.com","author":"JohnnyWang","message":"UPD: add mermain learn memo"}]},"filePathRelative":"articles/memo/learn-mermaid.md"}');export{v as comp,o as data};
