# ArgoCD 學習筆記
- [ArgoCD Getting Started](https://argo-cd.readthedocs.io/en/stable/getting_started/)
- [保哥來賓 ArgoCD 教學](https://www.youtube.com/watch?v=N_yakFFbr9w)
- [argocd-example-apps](https://github.com/argoproj/argocd-example-apps)


## Install
```bash
$ kubectl create namespace argocd
$ kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml
```


## Access Argo Server
```bash
$ kubectl port-forward svc/argocd-server -n argocd 8080:443
```
The API server can then be accessed using https://localhost:8080


## Login with default user
預設 argocd 會在產生一組帳號 admin，以及一個 secret 在 `argocd-initial-admin-secret`，可透過以下指令拿到admin 帳號預設密碼，記得登入後前往修改密碼即可。（修改完密碼後就可以把預設的 secret 刪掉摟）
```bash
$ kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 -d; echo
```


## Project
project 主要用來區分你的 Application 歸屬，每個 Application 在建立時必須指定歸在哪一個 project 中，預設 project 為 `default`，每個 project 可個別設定配置 repository 來源進行管理


## Repository
repository 主要用來連結你的 git 專案位置，同樣在創建 application 時必須提供對應的 repo，而一個 git 專案內可以有許多配置，在建立 application 時可以明確指定 git repo path，ArgoCD 會自動偵測你的 git repo 底下有哪些 config 路徑並給予下拉選單選取


## Application
application 是 ArgoCD 當中的一個實體，選取所屬 project, repository 的 config 設定後，就會根據配置進行部署，可以設定自動同步或是手動同步，如果是自動同步則每當 git repo 中設定變更時 ArgoCD 將偵測並且進行重新部署


## create image pull secret
```bash
$ kubectl create secret docker-registry <name> --docker-server=DOCKER_REGISTRY_SERVER --docker-username=DOCKER_USER --docker-password=DOCKER_PASSWORD --docker-email=DOCKER_EMAIL
```

> 需注意，secret 的 namespace 跟創建 Applications 時提供的 namespace 需一致，否則將無法套用 secret，詳情可見 [這個討論串](https://github.com/kubernetes-sigs/kind/issues/817#issuecomment-681976133)