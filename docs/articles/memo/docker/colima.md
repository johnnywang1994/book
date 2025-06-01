# Colima 安裝使用筆記

- [Github - Colima](https://github.com/abiosoft/colima)

## 移除 Docker
- 刪除 Docker.app
```bash
# 移除 symlink
$ ls -lh /usr/local/bin/docker*
$ sudo rm /usr/local/bin/docker*
# 移除 resource
$ ls -lh ~/.docker*
$ rm -rf ~/.docker*
# 移除 socket
$ rm ls -lh /var/run/docker.sock
```

## 安裝 Colima
- Install
```bash
$ brew install docker && brew install docker-compose
$ brew install colima
$ sudo ln -sfn ${HOME}/.colima/default/docker.sock /var/run/docker.sock
```
- Usage
```bash
# Colima不支援IPv6
$ export NODE_OPTIONS=--dns-result-order=ipv4first

# Colima運行時綁定IP
$ colima start --network-address
```