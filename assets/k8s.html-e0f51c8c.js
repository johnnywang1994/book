import{_ as o,r as l,o as r,c as i,d as e,e as n,a,f as t}from"./app-da643460.js";const c={},p=e("h1",{id:"kubernetes-學習筆記",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#kubernetes-學習筆記","aria-hidden":"true"},"#"),n(" Kubernetes 學習筆記")],-1),u=e("h2",{id:"相關資源",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#相關資源","aria-hidden":"true"},"#"),n(" 相關資源")],-1),d={href:"https://kubernetes.io/zh-cn/docs/home/",target:"_blank",rel:"noopener noreferrer"},k={href:"https://kubernetes.io/docs/reference/generated/kubectl/kubectl-commands#-strong-getting-started-strong-",target:"_blank",rel:"noopener noreferrer"},m=e("h2",{id:"kompose",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#kompose","aria-hidden":"true"},"#"),n(" kompose")],-1),b={href:"https://kubernetes.io/zh/docs/tasks/configure-pod-container/translate-compose-kubernetes/",target:"_blank",rel:"noopener noreferrer"},h=e("p",null,"用以轉換 docker-compose 文件為 kubernetes 資源",-1),v=e("h2",{id:"minikube",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#minikube","aria-hidden":"true"},"#"),n(" Minikube")],-1),_={href:"https://minikube.sigs.k8s.io/docs/start/",target:"_blank",rel:"noopener noreferrer"},g={href:"https://minikube.sigs.k8s.io/docs/handbook/pushing/",target:"_blank",rel:"noopener noreferrer"},f=t(`<p>綁定當前 terminal docker 為 minicube cluster 的 docker</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>eval $(minikube docker-env)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>後續 docker build 的 image 就會建構在 minikube 中，記得在 yaml 檔案裡標記 <code>imagePullPolicy: IfNotPresent</code> minikube 才會先查找 local image</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ kubectl run majupixiv <span class="token parameter variable">--image</span><span class="token operator">=</span>majupixiv <span class="token parameter variable">--port</span><span class="token operator">=</span><span class="token number">8003</span> --image-pull-policy<span class="token operator">=</span>IfNotPresent
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>Deployment yaml 範例</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> apps/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Deployment
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> demo
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>
    <span class="token key atrule">matchLabels</span><span class="token punctuation">:</span>
      <span class="token key atrule">app</span><span class="token punctuation">:</span> demo
  <span class="token key atrule">replicas</span><span class="token punctuation">:</span> <span class="token number">1</span> <span class="token comment"># 告知 Deployment 運行一個 Pod</span>
  <span class="token key atrule">template</span><span class="token punctuation">:</span>
    <span class="token key atrule">metadata</span><span class="token punctuation">:</span>
      <span class="token key atrule">labels</span><span class="token punctuation">:</span>
        <span class="token key atrule">app</span><span class="token punctuation">:</span> demo
    <span class="token key atrule">spec</span><span class="token punctuation">:</span>
      <span class="token key atrule">containers</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> demo
        <span class="token key atrule">image</span><span class="token punctuation">:</span> demo
        <span class="token key atrule">imagePullPolicy</span><span class="token punctuation">:</span> IfNotPresent
        <span class="token key atrule">ports</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">containerPort</span><span class="token punctuation">:</span> <span class="token number">80</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="image-pull-secret" tabindex="-1"><a class="header-anchor" href="#image-pull-secret" aria-hidden="true">#</a> image pull secret</h2>`,7),y={href:"https://kubernetes.io/docs/concepts/containers/images/#specifying-imagepullsecrets-on-a-pod",target:"_blank",rel:"noopener noreferrer"},x=t(`<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ kubectl create secret docker-registry <span class="token operator">&lt;</span>name<span class="token operator">&gt;</span> --docker-server<span class="token operator">=</span>DOCKER_REGISTRY_SERVER --docker-username<span class="token operator">=</span>DOCKER_USER --docker-password<span class="token operator">=</span>DOCKER_PASSWORD --docker-email<span class="token operator">=</span>DOCKER_EMAIL
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,1),E={href:"https://github.com/kubernetes-sigs/kind/issues/817#issuecomment-681976133",target:"_blank",rel:"noopener noreferrer"};function P(R,D){const s=l("ExternalLinkIcon");return r(),i("div",null,[p,u,e("ul",null,[e("li",null,[e("a",d,[n("官方文件"),a(s)])]),e("li",null,[e("a",k,[n("kubectl command reference"),a(s)])])]),m,e("p",null,[e("a",b,[n("kompose 工具"),a(s)])]),h,v,e("ul",null,[e("li",null,[e("a",_,[n("安裝與啟動教學"),a(s)])]),e("li",null,[e("a",g,[n("Push images"),a(s)])])]),f,e("ul",null,[e("li",null,[e("a",y,[n("Link"),a(s)])])]),x,e("blockquote",null,[e("p",null,[n("需注意，secret 的 namespace 跟 deployment 時提供的 namespace 需一致，否則將無法套用 secret，詳情可見 "),e("a",E,[n("這個討論串"),a(s)])])])])}const N=o(c,[["render",P],["__file","k8s.html.vue"]]);export{N as default};