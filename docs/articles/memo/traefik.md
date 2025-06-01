# Traefik Memo
本篇是學習 traefik 的學習筆記，主要是介紹一些基礎概念, 名詞說明, 使用方式


## 介紹
Traefik 是一款開源的邊緣路由器，主要功用是發布服務並進行一系列的組織管理。替系統接收請求並找出哪些組件負責處理它們


## 基本概念
Traefik 是一個邊緣路由器，做為系統平台的入口，它攔截並路由每個傳入的請求，並決定哪些服務處理哪些請求的所有邏輯和規則
![](https://doc.traefik.io/traefik/assets/img/traefik-concepts-1.png)

### 自動化服務偵測 Auto Service Discovery
透過適當的服務集成，在部署服務時 traefik 將能夠自動偵測該部署服務，並提供系列的路由導向配置，無需像傳統邊緣路由器那樣手動配置每個服務，而當服務被移除時，也將自動移除相關的路由配置

> Traefik 能夠使用您的 Cluster API 來發現服務並讀取附加信息。 在 Traefik 中，這些連接器被稱為 `Provider`，因為它們為 Traefik 提供配置。[點此查看所有支援的 Provider 清單](https://doc.traefik.io/traefik/migration/v1-to-v2/#providers)


## 配置介紹
請先看下面這張配置說明圖
![](https://doc.traefik.io/traefik/assets/img/static-dynamic-configuration.png)

Traefik 配置主要分為兩部分
- 啟動配置(Static Configuration): 包含 Provider, Entrypoints 配置
- 動態路由配置(Dynamic Configuration): 包含所有請求處理相關配置，主要為 Routers, Services, Middlewares, Certificates 等部分


## 啟動配置 - Static Configuration
包含三種`互斥`(只能同時使用一種)的配置方式
1. 單一配置檔案
2. 指令列參數配置
3. 環境變數配置

### 1. 單一配置檔案
traefik 啟動時會去下列路徑上尋找檔案 `traefik.yml`(或是 `traefik.yaml`, `traefik.toml`)
- `/etc/traefik/`
- `$XDG_CONFIG_HOME/`
- `$HOME/.config/`
- `.`(Working directory)
- 透過 `--configFile` 覆蓋
```bash
$ traefik --configFile=foo/bar/myconfigfile.yml
```

這邊以 Provider Docker 舉例配置如下，詳細[配置方法可見這邊](https://doc.traefik.io/traefik/providers/docker/#provider-configuration)
```yaml
providers:
  docker: {} # 預設
  # or
  docker:
    endpoint: "unix:///var/run/docker.sock"
```
可對應配置一個範例動態路由如下
```yaml
version: "3"
services:
  traefik:
    image: traefik:v2.9 # The official v2 Traefik docker image
    ports:
      # The HTTP port
      - "80:80"
      # The Web UI (enabled by --api.insecure=true)
      - "8080:8080"
    volumes:
      # So that Traefik can listen to the Docker events
      - /var/run/docker.sock:/var/run/docker.sock
  whoami:
    # A container that exposes an API to show its IP address
    image: traefik/whoami
    labels:
      - "traefik.http.routers.whoami.rule=Host(`whoami.docker.localhost`)"
```

### 2. 指令列參數配置
可參考這邊[支援的參數列表](https://doc.traefik.io/traefik/reference/static-configuration/cli/)，這種方式在配置 `docker-compose` yaml file 時非常方便

```yaml
version: "3"

services:
  traefik:
    image: traefik:v2.9
    command:
      - --accesslog
      - --providers.docker
    # ...
```

### 3. 環境變數配置
可參考這邊[支援的環境變數列表](https://doc.traefik.io/traefik/reference/static-configuration/env/)



## 動態路由配置(Routing & Load Balancing) - Dynamic Configuration
大致上處理請求的過程如下圖
![](https://doc.traefik.io/traefik/assets/img/architecture-overview.png)

當 Traefik 被啟動時，從我們定義的 entrypoints 進入，接著路由解析並查找是否有該請求對應的路由配置規則，如果有查找到，則將套用對應路由配置中的一系列 middlewares 執行，並最終轉發請求到指定的 Service 服務

到此我們可以簡單釐清下個部分的職責，[參考連結](https://doc.traefik.io/traefik/routing/overview/#clear-responsibilities)：
- [Provider](https://doc.traefik.io/traefik/providers/overview/): 發現基礎設施上的服務(IP, health)
- [Entrypoints](https://doc.traefik.io/traefik/routing/entrypoints/): 監聽傳入流量（ports）
- [Routers](https://doc.traefik.io/traefik/routing/routers/): 分析請求（host, path, headers, SSL）
- [Services](https://doc.traefik.io/traefik/routing/services/): 將請求轉發給您的服務（load balancing）
- [Middlewares](https://doc.traefik.io/traefik/middlewares/overview/): 可能會更新請求或根據請求做出決定（authentication, rate limiting, headers）

### File Provider 動態路由配置範例
此範例中我們透過 File Provider 配置將 `http://example.com/whoami/` 轉發到 `http://private/whoami-service/`

首先進行啟動配置
```yaml
entryPoints:
  web:
    # 監聽從 8081 進來的請求
    address: :8081

providers:
  # 允許透過 file provider 來進行動態路由配置
  file:
    directory: /path/to/dynamic/conf
```
接著在 `/path/to/dynamic/conf` 中，建立一個名為 `http.yml` 的配置（名子可隨意）
```yaml
http:
  routers:
    to-whoami:
      rule: "Host(`example.com`) && PathPrefix(`/whoami/`)"
      # 如果規則對應成功, 轉發到 whoami service(定義在下方)
      service: whoami

  services:
    # 定義服務在系統上的位置
    whoami:
      loadBalancer:
        servers:
        - url: http://private/whoami-service
```

### Entrypoints 支援的所有參數
內容可能會更新，[可參考這邊](https://doc.traefik.io/traefik/routing/entrypoints/#configuration)
> 需注意，預設情況下，沒有提供任何 entrypoints 給 traefik 時，會套用名為 `http` 的 entrypoint 在 80 port，但如果有明確提供任何一個 entrypoint 給 traefik 後，此預設 `http` 的 entrypoint 將不會被套用，如果仍然需要使用預設的 `80` port entrypoint 則需要手動將其加入
```yaml
## Static configuration
entryPoints:
  http: # default
    address: ":80"
  https:
    address: ":443"
  name:
    address: ":8888" # same as ":8888/tcp"
    http2:
      maxConcurrentStreams: 42
    http3:
      advertisedPort: 8888
    transport:
      lifeCycle:
        requestAcceptGraceTimeout: 42
        graceTimeOut: 42
      respondingTimeouts:
        readTimeout: 42
        writeTimeout: 42
        idleTimeout: 42
    proxyProtocol:
      insecure: true
      trustedIPs:
        - "127.0.0.1"
        - "192.168.0.1"
    forwardedHeaders:
      insecure: true
      trustedIPs:
        - "127.0.0.1"
        - "192.168.0.1"
```



## HTTPS & TLS
包含兩部分設定 routers, TLS connection，當路由器必須處理 HTTPS 流量時，應使用路由器定義的 `tls` 字段指定，[詳情可見這邊](https://doc.traefik.io/traefik/routing/routers/#tls)

- 限制進入請求只能為 `https`
```yaml
## Dynamic configuration
http:
  routers:
    my-https-router:
      rule: "Host(`foo-domain`) && Path(`/foo-path/`)"
      service: service-id
      # will terminate the TLS request
      tls: {}
```
- 若需要同時支援 http, https 則需要寫兩個配置，其中一個加上 tls
```yaml
http:
  routers:
    my-https-router:
      rule: "Host(`foo-domain`) && Path(`/foo-path/`)"
      service: service-id
      # will terminate the TLS request
      tls: {}
    my-http-router:
      rule: "Host(`foo-domain`) && Path(`/foo-path/`)"
      service: service-id
```
