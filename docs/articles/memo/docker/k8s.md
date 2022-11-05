# Kubernetes 學習筆記

## 相關資源
- [官方文件](https://kubernetes.io/zh-cn/docs/home/)
- [kubectl command reference](https://kubernetes.io/docs/reference/generated/kubectl/kubectl-commands#-strong-getting-started-strong-)

## kompose
[kompose 工具](https://kubernetes.io/zh/docs/tasks/configure-pod-container/translate-compose-kubernetes/)

用以轉換 docker-compose 文件為 kubernetes 資源

## Minikube
- [安裝與啟動教學](https://minikube.sigs.k8s.io/docs/start/)
- [Push images](https://minikube.sigs.k8s.io/docs/handbook/pushing/)

綁定當前 terminal docker 為 minicube cluster 的 docker
```
eval $(minikube docker-env)
```

後續 docker build 的 image 就會建構在 minikube 中，記得在 yaml 檔案裡標記 `imagePullPolicy: IfNotPresent` minikube 才會先查找 local image
```bash
$ kubectl run majupixiv --image=majupixiv --port=8003 --image-pull-policy=IfNotPresent
```

Deployment yaml 範例
```yml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: demo
spec:
  selector:
    matchLabels:
      app: demo
  replicas: 1 # 告知 Deployment 運行一個 Pod
  template:
    metadata:
      labels:
        app: demo
    spec:
      containers:
      - name: demo
        image: demo
        imagePullPolicy: IfNotPresent
        ports:
        - containerPort: 80
```

## image pull secret
- [Link](https://kubernetes.io/docs/concepts/containers/images/#specifying-imagepullsecrets-on-a-pod)
```bash
$ kubectl create secret docker-registry <name> --docker-server=DOCKER_REGISTRY_SERVER --docker-username=DOCKER_USER --docker-password=DOCKER_PASSWORD --docker-email=DOCKER_EMAIL
```
> 需注意，secret 的 namespace 跟 deployment 時提供的 namespace 需一致，否則將無法套用 secret，詳情可見 [這個討論串](https://github.com/kubernetes-sigs/kind/issues/817#issuecomment-681976133)