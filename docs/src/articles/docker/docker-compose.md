# Docker-compose 技術篇 - 3.7

本篇主要紀錄docker-compose的使用方法與筆記

## Basic 概念

主要用以方便創建並管理多個相關聯的服務container，並設定相關功能等。

Compose 檔案為 YAML 檔案，用以定義 `services`, `networks`, `volumes`, `ports` 等等

預設的檔案名為 `./docker-compose.yml` or `./docker-compose.yaml`

一個service的定義中，包含要應用於該container的一些組態(config)，就像使用`docker container create`

及 `docker network create`, `docker volume create`等

## 主要設置

***build***

應用於build階段的設定

`build` 可使用字串指定context位置，

```yml
version: "3.7"
services:
  webapp:
    build: ./dir
```

或傳入物件並指定context位置

```yml
version: "3.7"
services:
  webapp:
    build:
      context: ./dir
      dockerfile: Dockerfile-alternate
      args:
        buildno: 1
```

  1. `context` 可指定路徑或是一個git 專案位置URL，若指定相對位置時，則相對於此compose檔

```yml
build:
  context: ./dir
```

  2. `dockerfile` 指定構建用的dockerfile，必須同時給構建位置context

  3. `args` 可指定在Dockerfile內定義的參數值

首先在dockerfile中定義arguments

```bash
ARG name
ARG age

RUN echo "username: $name"
RUN echo "userage: $age"
```

接著在`build`下定義`args`，並設定值使用

```yml
build:
  context: .
  args:
    name: Johnny
    age: 24
```

注意，當`ARG` 使用於`FROM`上面，則`ARG`的參數將無法用於`FROM`下方，若需要使用

則必須定義於兩側: 可見 `Dockerfile 技術篇` 之說明。

另外 Boolean 等值在 YAML 檔中請用quotes關閉


  4. `cache_from` v3.2新增，列出使用cache的images清單

```yml
build:
  context: .
  cache_from:
    - alpine:latest
    - corp/web_app:3.14
```

  5. `labels` v3.3新增，新增metadata於指定image

```yml
build:
  context: .
  labels:
    maintainer: "Johnny Wang"
```

  6. `shm_size` v3.5新增，設置size of `/dev/shm` for this build's container。

```yml
build:
  context: .
  shm_size: '2gb'
```
OR
```yml
build:
  context: .
  shm_size: 10000000
```


***image***

指定建構服務用的image，可以是專案/tag或是指定image_id

```yml
image: redis
image: ubuntu:14.04
image: tutum/influxdb
image: example-registry.com:4000/postgresql
image: a4bc65fd
```

當本地不存在該image時，會自動pull下來使用


***command***

覆蓋default command

```yml
command: bundle exec thin -p 3000
```
OR
```yml
command: ["bundle", "exec", "thin", "-p", "3000"]
```


***container_name***

指定目標container name，而非使用預設name

```yml
container_name: my-web
```


***depends_on***

定義各服務之間的依賴關係，造成下方行為：

  1. `docker-compose up` 啟動順序，下方範例`db`, `redis`會在`web`之前啟動

  2. `docker-compose up SERVICE` 單獨啟動某個service時，會自動加入依賴的服務，

    下方啟動`web`時，同時自動啟動`db`, `redis`

  3. `docker-compose stop` 關閉順序，下方範例`web`會在`db`, `redis`關閉前先關閉

```yml
version: "3.7"
services:
  web:
    build: .
    depends_on:
      - db
      - redis
  redis:
    image: redis
  db:
    image: postgres
```

使用`depends_on`注意事項：

  1. `depends_on` 並非等待`db`, `redis`啟動 ready 才啟動`web`，只是等到它們已經`啟動`，

      若需要等待服務啟動並 ready，請參閱[Controlling startup order](https://docs.docker.com/compose/startup-order/)

  2. v3.0不再支援使用`condition`格式於`depends_on`

  3. `depends_on` 控制項在swarn 的v3.0的compose file會自動被忽略，[deploying a stack in swarm mode](https://docs.docker.com/engine/reference/commandline/stack_deploy/)


***deploy*** v3.0 only

此控制項只啟動於用[docker stack deploy](https://docs.docker.com/engine/reference/commandline/stack_deploy/)部

屬swarm時，在`docker-compose up`及`docker-compose run`中會被忽略

(待補)


***devices***

列出裝置的mapping，在deploy a stack in swarm mode使用 v3.0 compose file會被省略


***dns***

客製 DNS server，可以是一個值或是陣列

```yml
dns: 8.8.8.8
```

```yml
dns:
  - 8.8.8.8
  - 9.9.9.9
```


***dns_search***

客製 DNS search domain，可以是一個值或是陣列

```yml
dns_search: example.com
```

```yml
dns_search:
  - dc1.example.com
  - dc2.example.com
```


***entrypoint***

覆蓋預設entrypoint

```yml
entrypoint: /code/entrypoint.sh
```

```yml
entrypoint:
    - php
    - -d
    - zend_extension=/usr/local/lib/php/extensions/no-debug-non-zts-20100525/xdebug.so
    - -d
    - memory_limit=-1
    - vendor/bin/phpunit
```

***env_file***

從檔案新增環境變數，可以是一個值或陣列，注意引入順序，可能複寫調相同key名的值

```yml
env_file: .env
```


***environment***

設定環境變數，可以是一個陣列或是物件

```yml
environment:
  RACK_ENV: development
  SHOW: 'true'
  SESSION_SECRET:
```

```yml
environment:
  - RACK_ENV=development
  - SHOW=true
  - SESSION_SECRET
```


***expose***

Expose ports without publishing them to host machine, only be accesible to linked services

```yml
expose:
 - "3000"
 - "8000"
```


***external_links***

連結到外部的container(啟動於此docker-compose.yml以外)

```yml
external_links:
 - redis_1
 - project_db_1:mysql
 - project_db_1:postgresql
```


***extra_hosts***

Add hostname mappings, is created in `/etc/hosts`.

```yml
extra_hosts:
 - "somehost:162.242.195.82"
 - "otherhost:50.31.209.229"
```


***Logging***

Logging 服務組態

```yml
logging:
  driver: "json-file"
  options:
    syslog-address: "tcp://192.168.0.42:123"
    max-size: "200k"
    max-file: "10"
```

`dirver` 名稱與`docker run --log-driver` 指定為相同功能

預設值為json-file

```yml
driver: "json-file"
driver: "syslog"
driver: "none"
```


***network_mode***

network 模式，與`docker run --network`使用相同功能(此功能在`deploying a stack`使用v3.0 compose file時會被忽略)

```yml
network_mode: "bridge"
network_mode: "host"
network_mode: "none"
network_mode: "service:[service name]"
network_mode: "container:[container name/id]"
```


***networks***

設置該服務加入的network，會參照compose檔內key為networks 的設定

```yml
services:
  some-service:
    networks:
     - some-network
     - other-network
```

  1. `aliases` 別名，is network-scoped，相同服務在不同network中可以有不同的別名

```yml
services:
  some-service:
    networks:
      some-network:
        aliases:
         - alias1
         - alias3
      other-network:
        aliases:
         - alias2
```

下方範例中，在network `new` 及 `legacy`中，`new`網路中可以經由`db`或`database`取得該服務

而`legacy`網路中可以經由`db`及`mysql`取的相同服務

```yml
version: "3.7"

services:
  web:
    image: "nginx:alpine"
    networks:
      - new

  worker:
    image: "my-worker-image:latest"
    networks:
      - legacy

  db:
    image: mysql
    networks:
      new:
        aliases:
          - database
      legacy:
        aliases:
          - mysql

networks:
  new:
  legacy:
```

  2. `ipv4_address` and `ipv6_address` 指定靜態ip位置給container中的service

      使用時，在最上層的networks中必須定義`ipam`及相對的`subnet`設定

```yml
version: "3.7"

services:
  app:
    image: nginx:alpine
    networks:
      app_net:
        ipv4_address: 172.16.238.10
        ipv6_address: 2001:3984:3989::10

networks:
  app_net:
    ipam:
      driver: default
      config:
        - subnet: "172.16.238.0/24"
        - subnet: "2001:3984:3989::/64"
```


***ports***

expose ports，此設定與`network_mode: host`不相容


***restart***

(待補)


***secrets***

(待補)


***volumes***

(待補)

***Error: exited with code 0***

Docker-compose 生成容器後立刻退出，是因為在`docker run` 中，我們會加入 `-it`

為容器添加一個偽終端，此時bash就不會自動退出。 但在`docker-compose`中，必須在yml檔

中添加下方命令

```yml
# 第一行等於 docker run 的 -i
# 第二行等於 docker run 的 -t
stdin_open: "true"
tty: "true"
```