import{_ as i,r as d,o,c as l,d as e,e as n,a as s,f as c}from"./app.33415c31.js";const r={},t=e("h1",{id:"podman-\u5B78\u7FD2\u7B46\u8A18",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#podman-\u5B78\u7FD2\u7B46\u8A18","aria-hidden":"true"},"#"),n(" Podman \u5B78\u7FD2\u7B46\u8A18")],-1),m={href:"https://podman.io/docs/installation",target:"_blank",rel:"noopener noreferrer"},p={href:"https://azole.medium.com/podman-on-mac-101-1b7b323a1006",target:"_blank",rel:"noopener noreferrer"},u={href:"https://docs.podman.io/en/latest/Commands.html",target:"_blank",rel:"noopener noreferrer"},h=c(`<p>Hi \u5927\u5BB6\u597D\uFF0C\u6211\u662F Johnny\uFF0C\u9019\u7BC7\u662F\u4E00\u500B\u5FEB\u901F\u5B78\u7FD2 podman \u7684\u500B\u4EBA\u7B46\u8A18\uFF5E\uFF0C\u559C\u6B61\u7684\u8A71\u6B61\u8FCE\u6536\u85CF\u5206\u4EAB\u645F</p><h2 id="\u4ECB\u7D39" tabindex="-1"><a class="header-anchor" href="#\u4ECB\u7D39" aria-hidden="true">#</a> \u4ECB\u7D39</h2><ul><li>Podman \u662F <code>daemonless</code> \u7684 container \u5F15\u64CE\uFF0C\u53EF\u4EE5\u4EE5 root \u6216\u662F\u975E root \u7684\u6A21\u5F0F\u4F86\u57F7\u884C</li><li>Podman \u80FD<code>\u76F4\u63A5\u8207 Image registry, containers \u53CA images \u6E9D\u901A</code>\uFF0C\u4E26\u5141\u8A31\u4EE5\u975E root \u7684\u4F7F\u7528\u8005\u6B0A\u9650\u4F86\u904B\u884C containers\uFF0C\u56E0\u70BA\u63D0\u4F9B\u4E86\u8DDF docker \u76F8\u5BB9\u7684\u6307\u4EE4\uFF0C\u8B93\u7FD2\u6163\u4F7F\u7528 docker \u7684\u958B\u767C\u9019\u4E5F\u80FD\u7121\u75DB\u6539\u7528 Podman</li></ul><p><img src="https://darumatic.com/media/blog_pics/2020_01/Docker_vs_Podman.png" alt=""></p><h2 id="install" tabindex="-1"><a class="header-anchor" href="#install" aria-hidden="true">#</a> Install</h2><h3 id="mac-\u5B89\u88DD" tabindex="-1"><a class="header-anchor" href="#mac-\u5B89\u88DD" aria-hidden="true">#</a> Mac \u5B89\u88DD</h3><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>$ brew <span class="token function">install</span> <span class="token function">podman</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="\u521D\u59CB\u5316-vm" tabindex="-1"><a class="header-anchor" href="#\u521D\u59CB\u5316-vm" aria-hidden="true">#</a> \u521D\u59CB\u5316 VM</h3><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>$ <span class="token function">podman</span> machine init
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li>\u57F7\u884C\u9019\u884C\u6307\u4EE4\u6642\uFF0CPodman \u6703\u53BB\u6AA2\u67E5\u6211\u5011\u7684 host \u88E1\u662F\u5426\u6709\u6700\u65B0\u7684 FCOS\uFF0C\u6C92\u6709\u7684\u8A71\uFF0C\u5C31\u6703\u53BB\u4E0B\u8F09\u3002FCOS \u7684\u5168\u540D\u662F Fedora CoreOS\uFF0C\u4ED6\u88AB\u8A2D\u8A08\u6210\u57FA\u65BC container \u7684\u6700\u5C0F\u5316\u73FE\u5728\u4F5C\u696D\u7CFB\u7D71\uFF0CPodman \u6703\u7528\u9019\u500B\u4F5C\u696D\u7CFB\u7D71\u4F86\u5EFA\u7ACB VM\u3002</li><li>\u7576 FCOS \u88AB\u4E0B\u8F09\u5B8C\u6210\u5F8C\uFF0C\u9084\u6703\u518D\u5BEB\u5169\u500B\u6A94\u6848: <ol><li>machine description: \u7528\u4F86\u63CF\u8FF0\u5373\u5C07\u5EFA\u7ACB\u7684 VM \u7684\u5C6C\u6027\uFF0C\u662F JSON \u683C\u5F0F\uFF0C\u800C\u4E14\u662F\u88AB\u5BEB\u5165 host \u7684 filesystem \u4E2D\u3002</li><li>ignition file: \u7528\u4F86\u5BA2\u88FD FCOS \u4F5C\u696D\u7CFB\u7D71\u7684\uFF0C\u4E5F\u6703\u88AB\u5BEB\u5165 host filesystem \u4E2D\u3002</li></ol></li></ul><h3 id="\u555F\u52D5-vm" tabindex="-1"><a class="header-anchor" href="#\u555F\u52D5-vm" aria-hidden="true">#</a> \u555F\u52D5 VM</h3><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>$ <span class="token function">podman</span> machine start
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li>\u6307\u4EE4\u88AB\u904B\u884C\u6642\uFF0Cmachine \u7684\u8A2D\u5B9A\u6A94\u6703\u88AB\u8B80\u53D6\uFF0C\u7136\u5F8C Podman \u6703\u78BA\u4FDD\u9019\u500B machine \u4E0D\u662F\u5728\u904B\u884C\u4E2D\u3002\u7136\u5F8C\u6703\u57FA\u65BC\u9019\u4E9B\u8A2D\u5B9A\u6A94\uFF0C<code>qemu</code> \u6703\u88AB\u7D44\u88DD\uFF0C\u7136\u5F8C VM \u5C31\u904B\u884C</li><li>\u7576 VM \u7B2C\u4E00\u6B21\u958B\u6A5F\u6642\uFF0C<code>ignition file</code> \u6703\u88AB\u6CE8\u5165\u5230\u9019\u500B VM \u4E2D\uFF0C\u6578\u500B\u8A2D\u5B9A\u4E5F\u6703\u5728\u9019\u500B\u6642\u5019\u88AB\u4FEE\u6539\uFF0C\u7576 VM \u958B\u5B8C\u6A5F\u5F8C\uFF0C\u6703\u6709\u4E00\u500B\u53EB\u505A gvproxy \u7684\u7A0B\u5F0F\u6703\u5728 host \u88AB\u555F\u52D5\uFF0Cgvproxy \u6703\u8CA0\u8CAC\u7BA1\u7406 host \u8207 VM \u4E4B\u9593\u7684 port mapping\u3002\u6700\u5F8C Podman \u6703\u70BA root \u53CA non-root \u4F7F\u7528\u8005\u8A2D\u7F6E socket-activated services</li></ul><blockquote><p>QEMU \u662F\u4E00\u500B\u958B\u6E90\u7684\u4EE3\u7BA1\u865B\u64EC\u6A5F\u5668\uFF0CPodman \u6703\u4F7F\u7528 QEMU \u4F86\u5EFA\u7ACB VM\uFF0C\u6839\u64DA\u7248\u672C\u4E0D\u540C\uFF0C\u53EF\u80FD\u6703\u9700\u8981\u624B\u52D5\u5B89\u88DD QEMU</p></blockquote><h3 id="\u67E5\u770B\u5B89\u88DD\u8CC7\u8A0A" tabindex="-1"><a class="header-anchor" href="#\u67E5\u770B\u5B89\u88DD\u8CC7\u8A0A" aria-hidden="true">#</a> \u67E5\u770B\u5B89\u88DD\u8CC7\u8A0A</h3><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>$ <span class="token function">podman</span> info
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="\u7BA1\u7406-machine" tabindex="-1"><a class="header-anchor" href="#\u7BA1\u7406-machine" aria-hidden="true">#</a> \u7BA1\u7406 Machine</h3><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>$ <span class="token function">podman</span> machine <span class="token parameter variable">--help</span>
Manage a virtual machine

Description:
  Manage a virtual machine. Virtual machines are used to run Podman.

Usage:
  <span class="token function">podman</span> machine <span class="token punctuation">[</span>command<span class="token punctuation">]</span>

Available Commands:
  init        Initialize a virtual machine
  inspect     Inspect an existing machine
  list        List machines
  <span class="token function">rm</span>          Remove an existing machine
  <span class="token builtin class-name">set</span>         Sets a virtual machine setting
  <span class="token function">ssh</span>         SSH into an existing machine
  start       Start an existing machine
  stop        Stop an existing machine
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="usage" tabindex="-1"><a class="header-anchor" href="#usage" aria-hidden="true">#</a> Usage</h2><p>\u57FA\u672C\u5C31\u8DDF docker \u4E00\u6A23\uFF01</p><blockquote><p>\u5C0F\u77E5\u8B58\uFF1A\u4E00\u822C\u4F86\u8AAA\uFF0C\u6B63\u5E38 VM \u5728\u555F\u52D5\u5F8C\u662F\u7121\u6CD5\u76F4\u63A5\u7372\u53D6\u5916\u90E8\u7684\u6A94\u6848\u7684\uFF0C\u4E5F\u56E0\u6B64\u5982\u679C\u9700\u8981\u8B93 VM \u80FD\u62FF\u5230\u672C\u5730\u6A94\u6848\uFF0C\u5FC5\u9808\u5728\u555F\u52D5 VM \u6642\u660E\u78BA\u639B\u8F09\u4E00\u500B\u672C\u5730\u6A94\u6848\u4F4D\u7F6E\u9032\u53BB VM \u7576\u4E2D\uFF0C\u4F46\u662F\uFF01\uFF01\u597D\u52A0\u5728\u5F9E <code>podman v4.1.1</code> \u7248\u672C\u958B\u59CB, podman \u9810\u8A2D\u6703\u5728 init \u6307\u4EE4\u6642\u81EA\u52D5\u7D81\u5B9A <code>-v $HOME:$HOME</code>\uFF0C\u6240\u4EE5\u6211\u5011\u4E5F\u5C31\u80FD\u50CF\u5E73\u5E38\u4F7F\u7528 docker \u4E00\u6A23\u900F\u904E <code>-v</code> \u53BB mount volume \u4E86</p></blockquote><p>\u5982\u679C\u9700\u8981\u81EA\u5DF1\u8ABF\u6574 VM \u7684 volume \u7D81\u5B9A\u4F4D\u7F6E\uFF0C\u7BC4\u4F8B\u5982\u4E0B\uFF1A</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment"># \u5982\u679C\u5DF2\u7D93\u6709\u6B63\u5728\u8DD1\u7684 machine \u9700\u8981\u5148\u95DC\u9589\u522A\u9664\u820A\u7684 VM\uFF0C\u9810\u8A2D machine \u540D\u7A31\u70BA podman-machine-default</span>
$ <span class="token function">podman</span> machine stop
$ <span class="token function">podman</span> machine <span class="token function">rm</span>
<span class="token comment"># \u521D\u59CB\u5316\u540C\u6642\u5E36\u4E0A -v</span>
$ <span class="token function">podman</span> machine init <span class="token parameter variable">-v</span> <span class="token environment constant">$HOME</span><span class="token builtin class-name">:</span><span class="token environment constant">$HOME</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="podman-compose" tabindex="-1"><a class="header-anchor" href="#podman-compose" aria-hidden="true">#</a> podman-compose</h3><p>\u5982\u679C\u9700\u8981\u4F7F\u7528 <code>docker-compose</code> \u7684\u8A71\uFF0C\u9700\u8981\u53E6\u5916\u4E0B\u8F09\u4E00\u500B <code>podman-compose</code></p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>$ brew <span class="token function">install</span> <span class="token function">podman-compose</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\u5B89\u88DD\u5B8C\u6210\u5F8C\u64CD\u4F5C\u57FA\u672C\u8DDF docker-compose \u4E00\u6A23</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>$ <span class="token function">podman-compose</span> up
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="podman-mac-helper-\u76F4\u63A5\u7528-docker-\u6A21\u5F0F\u63A7\u5236-podman" tabindex="-1"><a class="header-anchor" href="#podman-mac-helper-\u76F4\u63A5\u7528-docker-\u6A21\u5F0F\u63A7\u5236-podman" aria-hidden="true">#</a> Podman Mac Helper - \u76F4\u63A5\u7528 docker \u6A21\u5F0F\u63A7\u5236 podman</h3><p>\u5728\u57F7\u884C <code>podman machine start</code> \u7684\u540C\u6642\uFF0C\u6703\u8DF3\u51FA\u4E00\u6BB5\u63D0\u793A\u5982\u4E0B\uFF0C<code>podman-mac-helper</code> \u662F podman \u5728 Mac \u74B0\u5883\u4E0B\u517C\u5BB9 Docker API socket address \u7684\u4E00\u500B\u8F14\u52A9\u5957\u4EF6\uFF0C\u5982\u679C\u60F3\u5728\u672C\u5730\u4F7F\u7528 podman \u5C31\u50CF\u7528 docker \u7BA1\u7406\u5BB9\u5668\u4E00\u6A23\uFF0C\u5EFA\u8B70\u53EF\u4EE5\u4E00\u8D77\u5B89\u88DD\u8D77\u4F86</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>API forwarding listening on: /Users/wangj/.local/share/containers/podman/machine/podman-machine-default/podman.sock

The system helper service is not installed; the default Docker API socket
address can&#39;t be used by podman. If you would like to install it run the
following commands:

        sudo /opt/homebrew/Cellar/podman/4.1.1/bin/podman-mac-helper install
        podman machine stop; podman machine start
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u57F7\u884C podman \u63D0\u4F9B\u7684\u6307\u4EE4\u5982\u4E0B\uFF0C\u6211\u7684 podman \u7248\u672C\u662F <code>4.1.1</code>\uFF0C\u6839\u64DA\u4F60\u81EA\u5DF1\u7684\u7248\u672C\u4FEE\u6539\u5594</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>$ <span class="token function">sudo</span> /opt/homebrew/Cellar/podman/4.1.1/bin/podman-mac-helper <span class="token function">install</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\u4FEE\u6539\u5B8C\u5F8C\uFF0C\u63A5\u8457 stop machine\uFF0C\u7136\u5F8C\u518D\u6B21 start\uFF0C\u5C31\u4E0D\u6703\u770B\u5230\u9019\u500B\u63D0\u793A\u645F\uFF0C\u800C\u5728\u5B89\u88DD\u9019\u5957\u4EF6\u5F8C\uFF0C\u6211\u5011\u5C31\u53EF\u4EE5\u50CF\u4E0B\u9762\u9019\u6A23\u76F4\u63A5\u900F\u904E docker \u6307\u4EE4\u4F86\u64CD\u4F5C\u62C9\uFF5E\uFF5Eimages \u7684\u986F\u793A\u65B9\u5F0F\u90FD\u6309\u7167 docker \u7684\u65B9\u5F0F\u5448\u73FE\u4E86</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>$ <span class="token function">docker</span> images
REPOSITORY            TAG           IMAGE ID       CREATED         SIZE
nginx                 latest        c42efe0b5438   <span class="token number">2</span> weeks ago     140MB
<span class="token function">node</span>                  <span class="token number">18.4</span>.0-slim   82f78068089f   <span class="token number">11</span> months ago   248MB
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,35);function v(b,g){const a=d("ExternalLinkIcon");return o(),l("div",null,[t,e("ul",null,[e("li",null,[e("a",m,[n("\u5B98\u65B9\u6587\u4EF6\u6307\u5F15"),s(a)])]),e("li",null,[e("a",p,[n("\u53C3\u8003\u6587\u7AE0"),s(a)])]),e("li",null,[e("a",u,[n("\u6307\u4EE4\u76EE\u9304"),s(a)])])]),h])}const f=i(r,[["render",v],["__file","podman.html.vue"]]);export{f as default};