import{_ as t,r as i,o as p,c as o,d as n,e as s,a as e,f as l}from"./app-6eac6164.js";const c={},d=l(`<h1 id="docker-compose-技術篇-3-7" tabindex="-1"><a class="header-anchor" href="#docker-compose-技術篇-3-7" aria-hidden="true">#</a> Docker-compose 技術篇 - 3.7</h1><p>本篇主要紀錄docker-compose的使用方法與筆記</p><h2 id="basic-概念" tabindex="-1"><a class="header-anchor" href="#basic-概念" aria-hidden="true">#</a> Basic 概念</h2><p>主要用以方便創建並管理多個相關聯的服務container，並設定相關功能等。</p><p>Compose 檔案為 YAML 檔案，用以定義 <code>services</code>, <code>networks</code>, <code>volumes</code>, <code>ports</code> 等等</p><p>預設的檔案名為 <code>./docker-compose.yml</code> or <code>./docker-compose.yaml</code></p><p>一個service的定義中，包含要應用於該container的一些組態(config)，就像使用<code>docker container create</code></p><p>及 <code>docker network create</code>, <code>docker volume create</code>等</p><h2 id="主要設置" tabindex="-1"><a class="header-anchor" href="#主要設置" aria-hidden="true">#</a> 主要設置</h2><p><em><strong>build</strong></em></p><p>應用於build階段的設定</p><p><code>build</code> 可使用字串指定context位置，</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">version</span><span class="token punctuation">:</span> <span class="token string">&quot;3.7&quot;</span>
<span class="token key atrule">services</span><span class="token punctuation">:</span>
  <span class="token key atrule">webapp</span><span class="token punctuation">:</span>
    <span class="token key atrule">build</span><span class="token punctuation">:</span> ./dir
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>或傳入物件並指定context位置</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">version</span><span class="token punctuation">:</span> <span class="token string">&quot;3.7&quot;</span>
<span class="token key atrule">services</span><span class="token punctuation">:</span>
  <span class="token key atrule">webapp</span><span class="token punctuation">:</span>
    <span class="token key atrule">build</span><span class="token punctuation">:</span>
      <span class="token key atrule">context</span><span class="token punctuation">:</span> ./dir
      <span class="token key atrule">dockerfile</span><span class="token punctuation">:</span> Dockerfile<span class="token punctuation">-</span>alternate
      <span class="token key atrule">args</span><span class="token punctuation">:</span>
        <span class="token key atrule">buildno</span><span class="token punctuation">:</span> <span class="token number">1</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol><li><code>context</code> 可指定路徑或是一個git 專案位置URL，若指定相對位置時，則相對於此compose檔</li></ol><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">build</span><span class="token punctuation">:</span>
  <span class="token key atrule">context</span><span class="token punctuation">:</span> ./dir
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2"><li><p><code>dockerfile</code> 指定構建用的dockerfile，必須同時給構建位置context</p></li><li><p><code>args</code> 可指定在Dockerfile內定義的參數值</p></li></ol><p>首先在dockerfile中定義arguments</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>ARG name
ARG age

RUN <span class="token builtin class-name">echo</span> <span class="token string">&quot;username: <span class="token variable">$name</span>&quot;</span>
RUN <span class="token builtin class-name">echo</span> <span class="token string">&quot;userage: <span class="token variable">$age</span>&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接著在<code>build</code>下定義<code>args</code>，並設定值使用</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">build</span><span class="token punctuation">:</span>
  <span class="token key atrule">context</span><span class="token punctuation">:</span> .
  <span class="token key atrule">args</span><span class="token punctuation">:</span>
    <span class="token key atrule">name</span><span class="token punctuation">:</span> Johnny
    <span class="token key atrule">age</span><span class="token punctuation">:</span> <span class="token number">24</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意，當<code>ARG</code> 使用於<code>FROM</code>上面，則<code>ARG</code>的參數將無法用於<code>FROM</code>下方，若需要使用</p><p>則必須定義於兩側: 可見 <code>Dockerfile 技術篇</code> 之說明。</p><p>另外 Boolean 等值在 YAML 檔中請用quotes關閉</p><ol start="4"><li><code>cache_from</code> v3.2新增，列出使用cache的images清單</li></ol><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">build</span><span class="token punctuation">:</span>
  <span class="token key atrule">context</span><span class="token punctuation">:</span> .
  <span class="token key atrule">cache_from</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> alpine<span class="token punctuation">:</span>latest
    <span class="token punctuation">-</span> corp/web_app<span class="token punctuation">:</span><span class="token number">3.14</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="5"><li><code>labels</code> v3.3新增，新增metadata於指定image</li></ol><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">build</span><span class="token punctuation">:</span>
  <span class="token key atrule">context</span><span class="token punctuation">:</span> .
  <span class="token key atrule">labels</span><span class="token punctuation">:</span>
    <span class="token key atrule">maintainer</span><span class="token punctuation">:</span> <span class="token string">&quot;Johnny Wang&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="6"><li><code>shm_size</code> v3.5新增，設置size of <code>/dev/shm</code> for this build&#39;s container。</li></ol><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">build</span><span class="token punctuation">:</span>
  <span class="token key atrule">context</span><span class="token punctuation">:</span> .
  <span class="token key atrule">shm_size</span><span class="token punctuation">:</span> <span class="token string">&#39;2gb&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>OR</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">build</span><span class="token punctuation">:</span>
  <span class="token key atrule">context</span><span class="token punctuation">:</span> .
  <span class="token key atrule">shm_size</span><span class="token punctuation">:</span> <span class="token number">10000000</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><em><strong>image</strong></em></p><p>指定建構服務用的image，可以是專案/tag或是指定image_id</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">image</span><span class="token punctuation">:</span> redis
<span class="token key atrule">image</span><span class="token punctuation">:</span> ubuntu<span class="token punctuation">:</span><span class="token number">14.04</span>
<span class="token key atrule">image</span><span class="token punctuation">:</span> tutum/influxdb
<span class="token key atrule">image</span><span class="token punctuation">:</span> example<span class="token punctuation">-</span>registry.com<span class="token punctuation">:</span>4000/postgresql
<span class="token key atrule">image</span><span class="token punctuation">:</span> a4bc65fd
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>當本地不存在該image時，會自動pull下來使用</p><p><em><strong>command</strong></em></p><p>覆蓋default command</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">command</span><span class="token punctuation">:</span> bundle exec thin <span class="token punctuation">-</span>p 3000
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>OR</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">command</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;bundle&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;exec&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;thin&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;-p&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;3000&quot;</span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><em><strong>container_name</strong></em></p><p>指定目標container name，而非使用預設name</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">container_name</span><span class="token punctuation">:</span> my<span class="token punctuation">-</span>web
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><em><strong>depends_on</strong></em></p><p>定義各服務之間的依賴關係，造成下方行為：</p><ol><li><p><code>docker-compose up</code> 啟動順序，下方範例<code>db</code>, <code>redis</code>會在<code>web</code>之前啟動</p></li><li><p><code>docker-compose up SERVICE</code> 單獨啟動某個service時，會自動加入依賴的服務，</p></li></ol><pre><code>下方啟動\`web\`時，同時自動啟動\`db\`, \`redis\`
</code></pre><ol start="3"><li><code>docker-compose stop</code> 關閉順序，下方範例<code>web</code>會在<code>db</code>, <code>redis</code>關閉前先關閉</li></ol><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">version</span><span class="token punctuation">:</span> <span class="token string">&quot;3.7&quot;</span>
<span class="token key atrule">services</span><span class="token punctuation">:</span>
  <span class="token key atrule">web</span><span class="token punctuation">:</span>
    <span class="token key atrule">build</span><span class="token punctuation">:</span> .
    <span class="token key atrule">depends_on</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> db
      <span class="token punctuation">-</span> redis
  <span class="token key atrule">redis</span><span class="token punctuation">:</span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span> redis
  <span class="token key atrule">db</span><span class="token punctuation">:</span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span> postgres
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用<code>depends_on</code>注意事項：</p>`,52),u=n("p",null,[n("code",null,"depends_on"),s(" 並非等待"),n("code",null,"db"),s(", "),n("code",null,"redis"),s("啟動 ready 才啟動"),n("code",null,"web"),s("，只是等到它們已經"),n("code",null,"啟動"),s("，")],-1),r={href:"https://docs.docker.com/compose/startup-order/",target:"_blank",rel:"noopener noreferrer"},k=n("li",null,[n("p",null,[s("v3.0不再支援使用"),n("code",null,"condition"),s("格式於"),n("code",null,"depends_on")])],-1),m=n("code",null,"depends_on",-1),v={href:"https://docs.docker.com/engine/reference/commandline/stack_deploy/",target:"_blank",rel:"noopener noreferrer"},b=n("p",null,[n("em",null,[n("strong",null,"deploy")]),s(" v3.0 only")],-1),g={href:"https://docs.docker.com/engine/reference/commandline/stack_deploy/",target:"_blank",rel:"noopener noreferrer"},y=l(`<p>屬swarm時，在<code>docker-compose up</code>及<code>docker-compose run</code>中會被忽略</p><p>(待補)</p><p><em><strong>devices</strong></em></p><p>列出裝置的mapping，在deploy a stack in swarm mode使用 v3.0 compose file會被省略</p><p><em><strong>dns</strong></em></p><p>客製 DNS server，可以是一個值或是陣列</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">dns</span><span class="token punctuation">:</span> 8.8.8.8
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">dns</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> 8.8.8.8
  <span class="token punctuation">-</span> 9.9.9.9
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><em><strong>dns_search</strong></em></p><p>客製 DNS search domain，可以是一個值或是陣列</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">dns_search</span><span class="token punctuation">:</span> example.com
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">dns_search</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> dc1.example.com
  <span class="token punctuation">-</span> dc2.example.com
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><em><strong>entrypoint</strong></em></p><p>覆蓋預設entrypoint</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">entrypoint</span><span class="token punctuation">:</span> /code/entrypoint.sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">entrypoint</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> php
    <span class="token punctuation">-</span> <span class="token punctuation">-</span>d
    <span class="token punctuation">-</span> zend_extension=/usr/local/lib/php/extensions/no<span class="token punctuation">-</span>debug<span class="token punctuation">-</span>non<span class="token punctuation">-</span>zts<span class="token punctuation">-</span>20100525/xdebug.so
    <span class="token punctuation">-</span> <span class="token punctuation">-</span>d
    <span class="token punctuation">-</span> memory_limit=<span class="token punctuation">-</span><span class="token number">1</span>
    <span class="token punctuation">-</span> vendor/bin/phpunit
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><em><strong>env_file</strong></em></p><p>從檔案新增環境變數，可以是一個值或陣列，注意引入順序，可能複寫調相同key名的值</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">env_file</span><span class="token punctuation">:</span> .env
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><em><strong>environment</strong></em></p><p>設定環境變數，可以是一個陣列或是物件</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">environment</span><span class="token punctuation">:</span>
  <span class="token key atrule">RACK_ENV</span><span class="token punctuation">:</span> development
  <span class="token key atrule">SHOW</span><span class="token punctuation">:</span> <span class="token string">&#39;true&#39;</span>
  <span class="token key atrule">SESSION_SECRET</span><span class="token punctuation">:</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">environment</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> RACK_ENV=development
  <span class="token punctuation">-</span> SHOW=true
  <span class="token punctuation">-</span> SESSION_SECRET
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><em><strong>expose</strong></em></p><p>Expose ports without publishing them to host machine, only be accesible to linked services</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">expose</span><span class="token punctuation">:</span>
 <span class="token punctuation">-</span> <span class="token string">&quot;3000&quot;</span>
 <span class="token punctuation">-</span> <span class="token string">&quot;8000&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><em><strong>external_links</strong></em></p><p>連結到外部的container(啟動於此docker-compose.yml以外)</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">external_links</span><span class="token punctuation">:</span>
 <span class="token punctuation">-</span> redis_1
 <span class="token punctuation">-</span> project_db_1<span class="token punctuation">:</span>mysql
 <span class="token punctuation">-</span> project_db_1<span class="token punctuation">:</span>postgresql
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><em><strong>extra_hosts</strong></em></p><p>Add hostname mappings, is created in <code>/etc/hosts</code>.</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">extra_hosts</span><span class="token punctuation">:</span>
 <span class="token punctuation">-</span> <span class="token string">&quot;somehost:162.242.195.82&quot;</span>
 <span class="token punctuation">-</span> <span class="token string">&quot;otherhost:50.31.209.229&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><em><strong>Logging</strong></em></p><p>Logging 服務組態</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">logging</span><span class="token punctuation">:</span>
  <span class="token key atrule">driver</span><span class="token punctuation">:</span> <span class="token string">&quot;json-file&quot;</span>
  <span class="token key atrule">options</span><span class="token punctuation">:</span>
    <span class="token key atrule">syslog-address</span><span class="token punctuation">:</span> <span class="token string">&quot;tcp://192.168.0.42:123&quot;</span>
    <span class="token key atrule">max-size</span><span class="token punctuation">:</span> <span class="token string">&quot;200k&quot;</span>
    <span class="token key atrule">max-file</span><span class="token punctuation">:</span> <span class="token string">&quot;10&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>dirver</code> 名稱與<code>docker run --log-driver</code> 指定為相同功能</p><p>預設值為json-file</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">driver</span><span class="token punctuation">:</span> <span class="token string">&quot;json-file&quot;</span>
<span class="token key atrule">driver</span><span class="token punctuation">:</span> <span class="token string">&quot;syslog&quot;</span>
<span class="token key atrule">driver</span><span class="token punctuation">:</span> <span class="token string">&quot;none&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><em><strong>network_mode</strong></em></p><p>network 模式，與<code>docker run --network</code>使用相同功能(此功能在<code>deploying a stack</code>使用v3.0 compose file時會被忽略)</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">network_mode</span><span class="token punctuation">:</span> <span class="token string">&quot;bridge&quot;</span>
<span class="token key atrule">network_mode</span><span class="token punctuation">:</span> <span class="token string">&quot;host&quot;</span>
<span class="token key atrule">network_mode</span><span class="token punctuation">:</span> <span class="token string">&quot;none&quot;</span>
<span class="token key atrule">network_mode</span><span class="token punctuation">:</span> <span class="token string">&quot;service:[service name]&quot;</span>
<span class="token key atrule">network_mode</span><span class="token punctuation">:</span> <span class="token string">&quot;container:[container name/id]&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><em><strong>networks</strong></em></p><p>設置該服務加入的network，會參照compose檔內key為networks 的設定</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">services</span><span class="token punctuation">:</span>
  <span class="token key atrule">some-service</span><span class="token punctuation">:</span>
    <span class="token key atrule">networks</span><span class="token punctuation">:</span>
     <span class="token punctuation">-</span> some<span class="token punctuation">-</span>network
     <span class="token punctuation">-</span> other<span class="token punctuation">-</span>network
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol><li><code>aliases</code> 別名，is network-scoped，相同服務在不同network中可以有不同的別名</li></ol><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">services</span><span class="token punctuation">:</span>
  <span class="token key atrule">some-service</span><span class="token punctuation">:</span>
    <span class="token key atrule">networks</span><span class="token punctuation">:</span>
      <span class="token key atrule">some-network</span><span class="token punctuation">:</span>
        <span class="token key atrule">aliases</span><span class="token punctuation">:</span>
         <span class="token punctuation">-</span> alias1
         <span class="token punctuation">-</span> alias3
      <span class="token key atrule">other-network</span><span class="token punctuation">:</span>
        <span class="token key atrule">aliases</span><span class="token punctuation">:</span>
         <span class="token punctuation">-</span> alias2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>下方範例中，在network <code>new</code> 及 <code>legacy</code>中，<code>new</code>網路中可以經由<code>db</code>或<code>database</code>取得該服務</p><p>而<code>legacy</code>網路中可以經由<code>db</code>及<code>mysql</code>取的相同服務</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">version</span><span class="token punctuation">:</span> <span class="token string">&quot;3.7&quot;</span>

<span class="token key atrule">services</span><span class="token punctuation">:</span>
  <span class="token key atrule">web</span><span class="token punctuation">:</span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span> <span class="token string">&quot;nginx:alpine&quot;</span>
    <span class="token key atrule">networks</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> new

  <span class="token key atrule">worker</span><span class="token punctuation">:</span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span> <span class="token string">&quot;my-worker-image:latest&quot;</span>
    <span class="token key atrule">networks</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> legacy

  <span class="token key atrule">db</span><span class="token punctuation">:</span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span> mysql
    <span class="token key atrule">networks</span><span class="token punctuation">:</span>
      <span class="token key atrule">new</span><span class="token punctuation">:</span>
        <span class="token key atrule">aliases</span><span class="token punctuation">:</span>
          <span class="token punctuation">-</span> database
      <span class="token key atrule">legacy</span><span class="token punctuation">:</span>
        <span class="token key atrule">aliases</span><span class="token punctuation">:</span>
          <span class="token punctuation">-</span> mysql

<span class="token key atrule">networks</span><span class="token punctuation">:</span>
  <span class="token key atrule">new</span><span class="token punctuation">:</span>
  <span class="token key atrule">legacy</span><span class="token punctuation">:</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2"><li><p><code>ipv4_address</code> and <code>ipv6_address</code> 指定靜態ip位置給container中的service</p><p>使用時，在最上層的networks中必須定義<code>ipam</code>及相對的<code>subnet</code>設定</p></li></ol><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">version</span><span class="token punctuation">:</span> <span class="token string">&quot;3.7&quot;</span>

<span class="token key atrule">services</span><span class="token punctuation">:</span>
  <span class="token key atrule">app</span><span class="token punctuation">:</span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span> nginx<span class="token punctuation">:</span>alpine
    <span class="token key atrule">networks</span><span class="token punctuation">:</span>
      <span class="token key atrule">app_net</span><span class="token punctuation">:</span>
        <span class="token key atrule">ipv4_address</span><span class="token punctuation">:</span> 172.16.238.10
        <span class="token key atrule">ipv6_address</span><span class="token punctuation">:</span> 2001<span class="token punctuation">:</span>3984<span class="token punctuation">:</span>3989<span class="token punctuation">:</span><span class="token punctuation">:</span><span class="token number">10</span>

<span class="token key atrule">networks</span><span class="token punctuation">:</span>
  <span class="token key atrule">app_net</span><span class="token punctuation">:</span>
    <span class="token key atrule">ipam</span><span class="token punctuation">:</span>
      <span class="token key atrule">driver</span><span class="token punctuation">:</span> default
      <span class="token key atrule">config</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">subnet</span><span class="token punctuation">:</span> <span class="token string">&quot;172.16.238.0/24&quot;</span>
        <span class="token punctuation">-</span> <span class="token key atrule">subnet</span><span class="token punctuation">:</span> <span class="token string">&quot;2001:3984:3989::/64&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><em><strong>ports</strong></em></p><p>expose ports，此設定與<code>network_mode: host</code>不相容</p><p><em><strong>restart</strong></em></p><p>(待補)</p><p><em><strong>secrets</strong></em></p><p>(待補)</p><p><em><strong>volumes</strong></em></p><p>(待補)</p><p><em><strong>Error: exited with code 0</strong></em></p><p>Docker-compose 生成容器後立刻退出，是因為在<code>docker run</code> 中，我們會加入 <code>-it</code></p><p>為容器添加一個偽終端，此時bash就不會自動退出。 但在<code>docker-compose</code>中，必須在yml檔</p><p>中添加下方命令</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token comment"># 第一行等於 docker run 的 -i</span>
<span class="token comment"># 第二行等於 docker run 的 -t</span>
<span class="token key atrule">stdin_open</span><span class="token punctuation">:</span> <span class="token string">&quot;true&quot;</span>
<span class="token key atrule">tty</span><span class="token punctuation">:</span> <span class="token string">&quot;true&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,64);function h(_,q){const a=i("ExternalLinkIcon");return p(),o("div",null,[d,n("ol",null,[n("li",null,[u,n("p",null,[s("若需要等待服務啟動並 ready，請參閱"),n("a",r,[s("Controlling startup order"),e(a)])])]),k,n("li",null,[n("p",null,[m,s(" 控制項在swarn 的v3.0的compose file會自動被忽略，"),n("a",v,[s("deploying a stack in swarm mode"),e(a)])])])]),b,n("p",null,[s("此控制項只啟動於用"),n("a",g,[s("docker stack deploy"),e(a)]),s("部")]),y])}const w=t(c,[["render",h],["__file","docker-compose.html.vue"]]);export{w as default};
