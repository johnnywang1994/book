# Podman 學習筆記

- [官方文件指引](https://podman.io/docs/installation)
- [參考文章](https://azole.medium.com/podman-on-mac-101-1b7b323a1006)
- [指令目錄](https://docs.podman.io/en/latest/Commands.html)

Hi 大家好，我是 Johnny，這篇是一個快速學習 podman 的個人筆記～，喜歡的話歡迎收藏分享摟

## 介紹
- Podman 是 `daemonless` 的 container 引擎，可以以 root 或是非 root 的模式來執行，預設使用的是 rootless
- Podman 能`直接與 Image registry, containers 及 images 溝通`，並允許以非 root 的使用者權限來運行 containers，因為提供了跟 docker 相容的指令，讓習慣使用 docker 的開發這也能無痛改用 Podman

![](https://darumatic.com/media/blog_pics/2020_01/Docker_vs_Podman.png)

## Install
### Mac 安裝
```bash
$ brew install podman
```

### 初始化 VM
```bash
$ podman machine init
```
- 執行這行指令時，Podman 會去檢查我們的 host 裡是否有最新的 FCOS，沒有的話，就會去下載。FCOS 的全名是 Fedora CoreOS，他被設計成基於 container 的最小化現在作業系統，Podman 會用這個作業系統來建立 VM。
- 當 FCOS 被下載完成後，還會再寫兩個檔案:
  1. machine description: 用來描述即將建立的 VM 的屬性，是 JSON 格式，而且是被寫入 host 的 filesystem 中。
  2. ignition file: 用來客製 FCOS 作業系統的，也會被寫入 host filesystem 中。

### 開啟 rootful 模式
預設會是 rootless，如果需要給予 VM root 權限，可以在 machine 停止的狀態下設定如下
```bash
$ podman machine set --rootful
```

### 啟動 VM
```bash
$ podman machine start
```
- 指令被運行時，machine 的設定檔會被讀取，然後 Podman 會確保這個 machine 不是在運行中。然後會基於這些設定檔，`qemu` 會被組裝，然後 VM 就運行
- 當 VM 第一次開機時，`ignition file` 會被注入到這個 VM 中，數個設定也會在這個時候被修改，當 VM 開完機後，會有一個叫做 gvproxy 的程式會在 host 被啟動，gvproxy 會負責管理 host 與 VM 之間的 port mapping。最後 Podman 會為 root 及 non-root 使用者設置 socket-activated services

> QEMU 是一個開源的代管虛擬機器，Podman 會使用 QEMU 來建立 VM，根據版本不同，可能會需要手動安裝 QEMU

### 查看安裝資訊
```bash
$ podman info
```

### 管理 Machine
```bash
$ podman machine --help
Manage a virtual machine

Description:
  Manage a virtual machine. Virtual machines are used to run Podman.

Usage:
  podman machine [command]

Available Commands:
  init        Initialize a virtual machine
  inspect     Inspect an existing machine
  list        List machines
  rm          Remove an existing machine
  set         Sets a virtual machine setting
  ssh         SSH into an existing machine
  start       Start an existing machine
  stop        Stop an existing machine
```

## Usage
基本就跟 docker 一樣！

> 小知識：一般來說，正常 VM 在啟動後是無法直接獲取外部的檔案的，也因此如果需要讓 VM 能拿到本地檔案，必須在啟動 VM 時明確掛載一個本地檔案位置進去 VM 當中，但是！！好加在從 `podman v4.1.1` 版本開始, podman 預設會在 init 指令時自動綁定 `-v $HOME:$HOME`，所以我們也就能像平常使用 docker 一樣透過 `-v` 去 mount volume 了

如果需要自己調整 VM 的 volume 綁定位置，範例如下：
```bash
# 如果已經有正在跑的 machine 需要先關閉刪除舊的 VM，預設 machine 名稱為 podman-machine-default
$ podman machine stop
$ podman machine rm
# 初始化同時帶上 -v
$ podman machine init -v $HOME:$HOME
```

### podman-compose
如果需要使用 `docker-compose` 的話，需要另外下載一個 `podman-compose`
```bash
$ brew install podman-compose
```
安裝完成後操作基本跟 docker-compose 一樣
```bash
$ podman-compose up
```

### Podman Mac Helper - 直接用 docker 模式控制 podman
在執行 `podman machine start` 的同時，會跳出一段提示如下，`podman-mac-helper` 是 podman 在 Mac 環境下兼容 Docker API socket address 的一個輔助套件，如果想在本地使用 podman 就像用 docker 管理容器一樣，建議可以一起安裝起來
```
API forwarding listening on: /Users/wangj/.local/share/containers/podman/machine/podman-machine-default/podman.sock

The system helper service is not installed; the default Docker API socket
address can't be used by podman. If you would like to install it run the
following commands:

        sudo podman-mac-helper install
        podman machine stop; podman machine start
```
執行 podman 提供的指令如下，我的 podman 版本是 `4.8.3`，根據你自己的版本修改喔
```bash
$ sudo podman-mac-helper install
```
修改完後，接著 stop machine，然後再次 start，就不會看到這個提示摟，而在安裝這套件後，我們就可以像下面這樣直接透過 docker 指令來操作拉～～images 的顯示方式都按照 docker 的方式呈現了
```bash
$ docker images
REPOSITORY            TAG           IMAGE ID       CREATED         SIZE
nginx                 latest        c42efe0b5438   2 weeks ago     140MB
node                  18.4.0-slim   82f78068089f   11 months ago   248MB
```


## Issues

### 無法 connect to Podman 問題
這個問題可以試試把當前 podman machine 刪除並重新建立一個新的
```
Cannot connect to Podman. Please verify your connection to the Linux system using
```
```bash
$ podman machine stop
$ podman machine rm -f
$ podman machine init --now
```


## Podman Desktop
安裝前記得先把本地裝的 podman 刪除乾淨
```bash
$ podman machine rm
$ brew uninstall podman qemu
$ rm -rf ~/.config/containers
$ rm -rf ~/.local/share/containers
$ brew install podman-desktop
```

### podman-compose
如果本地沒有裝 docker，可以使用 podman 提供的 alternative [podman-compose](https://github.com/containers/podman-compose#installation)