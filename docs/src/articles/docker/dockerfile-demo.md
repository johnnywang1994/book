# Dockerfile 技術篇

本篇主要紀錄dockerfile的使用方法與筆記

## Basic 概念

Docker 能夠經由 `Dockerfile` 自動化構建images，`Dockerfile`為一個文本檔，

其中包含所有使用者可用於構建 images 的指令，透過`docker build`指令，即可自動化構建

images ，執行原本需要數行的指令。

預設上，Dockerfile 即命名為`Dockerfile` 並置於您專案的根目錄中。


## 使用方法

執行 `docker build` 指令時，會將 `Dockerfile` 的內容傳給 Docker Daemon 進行解析，

若於解析時發生Syntax等問題，會即時跳出 ERROR。

預設行為下，若具有cache，Docker會re-use中間images，以加快解析速度，在console output中可以

看到`Using cache`的提示。

```bash
docker build .
```

***注意!! 勿將path設定為 / ，設為 / 會視為您要build 整個hard drive的 根目錄***

`-f` 指定構建的Dockerfile 來源

```bash
docker build -f /path/to/a/Dockerfile
```

## 編輯格式

`INSTRUCTION arguments`

***INSTRUCTION並非 case-sensitive***

習慣上使用大寫，方便閱讀與arguments做區別。

```bash
RUN echo 'Test some cool things'
```

***註解符號 #***

Docker 視 `#` 後面的內容為註解

***跳脫字元***

```bash
# escape=\ (backslash)
```

OR

```bash
# escape=` (backtick)
```

Docker 使用 `\` 或 `backtick` 作為跳脫符號，但當在windows作業系統下時，使用 \ 可能造成路徑解析錯誤，

此時可使用escape的parse directive指定使用 `backtick` 作為跳脫符號。

```bash
# escape=`

FROM microsoft/nanoserver
COPY testfile.txt c:\
RUN dir c:\
```

## .dockerignore 檔案

在docker CLI 將context內容送給docker daemon解析前，它會先在根目錄查找

檔名為 `.dockerignore` 的檔案，若此檔案存在，CLI會自動剔除匹配到內部相關的檔案

可避免不必要的檔案傳輸或較敏感的資料流出，當使用 COPY 或 ADD 指令時。

範例：

```bash
# comment
*/temp*
*/*/temp*
temp?
```

`*/temp*` 在第一層路徑下，剔除檔名或路徑開頭為 temp 的資料 

`*/*/temp*` 在第二層路徑下，剔除檔名或路徑開頭為 temp 的資料 

`temp?` 剔除根目錄下，檔名開頭為 temp 的資料

匹配機制使用 Go's filepath.Match 的規則。

***! 特例行為***

(待補)


## 常見 INSTRUCTION

***FROM***

設置構建的Base Image，一個 valid 的 Dockerfile 中，必須由 FROM 起頭撰寫。

```bash
FROM <image>[:<tag>] [AS <name>]
```

`ARG` 參數指令是唯一可以優於 `FROM` 指令的。

`FROM` 指令可以在一個 Dockerfile 中出現數次，用以建立多個images，

每次呼叫`FROM`指令都會將上一個指令所構建的狀態都清除。


每次使用 `FROM` 時，都可以在其後加上 `As name`，該 name 可以用於之後的 `FROM`

或 `COPY --from=<name|index>` 呼叫使用。


***ARG***

`FROM` 指令支援所有在其之前定義的ARG 參數。

```bash
ARG  CODE_VERSION=latest
FROM base:${CODE_VERSION}
CMD  /code/run-app

FROM extras:${CODE_VERSION}
CMD  /code/run-extras
```

`ARG` 指令定義的參數，因為是與`FROM`所構建的狀態分離，故無法再用於`FROM`指令後，

若需要再次使用相同參數值時，可簡單再於使用前呼叫 `ARG` 並省略 value

```bash
ARG VERSION=latest
FROM busybox:$VERSION
ARG VERSION
RUN echo $VERSION > image_version
```


***RUN***

`RUN` 指令有兩種格式：

  1. `RUN <command>` shellform，指令執行在shell，預設使用 `/bin/sh -c` on Linux 及 `bash /S /C` on Windows

  2. `RUN ["executable", "param1", "param2"]` exec form

RUN 指令會執行任何命令在目前image的最上層，並送出結果，被送出的image結果會繼續使用於後續的Dockerfile中。

exec form可避免shell的改寫，會用 base image 來 RUN commands。

可用 \ 在shellform中換行輸入

```bash
RUN /bin/bash -c 'source $HOME/.bashrc; \
echo $HOME'
```

same as

```bash
RUN /bin/bash -c 'source $HOME/.bashrc; echo $HOME'
```


若希望使用別的shell，可使用 execform 指定需要的shell

```bash
RUN ["/bin/bash", "-c", "echo hello"]
```

因exec form使用JSON格式，故務必使用 `"` 雙引號


***CMD***

主要用於提供container 的default執行

共有三種格式：

  1. `CMD ["executable","param1","param2"]` (exec form, this is the preferred form)

  2. `CMD ["param1","param2"]` (as default parameters to ENTRYPOINT)

  3. `CMD command param1 param2` (shellform)

一個Dockerfile中只能有一個`CMD`指令，超過一個時，只會執行最後出現的一個

當使用`docker run`其他參數時，內部 CMD 預設行為將被替換，舉例：(取IP)

```bash
FROM ubuntu:18.04
RUN apt-get update \
    && apt-get install -y curl \
    && rm -rf /var/lib/apt/lists/*
CMD [ "curl", "-s", "https://ip.cn" ]
```

假如我們使用 `docker build -t myip .` 構建image，並執行

```bash
docker run myip
```

但若需要加上參數使用時，例如加上 `-i`，加上後執行

```bash
docker run myip -i
docker: Error executable file not found
```

因為根在image名後面的是command，運行時會替換`CMD`的默認值，並非添加在其後面。

若須加上`-i`這參數，必須重新輸入所有command，很麻煩的，故此時就可用下方`ENTRYPOINT`解決此問題

```bash
docker run myip curl -s https://ip.cn -i
```


***ENTRYPOINT***

格式和 RUN 指令相同，目的和CMD相同，都是在指定容器啟動程序及參數。

在運行時也可替代，需使用`docker run --entrypoint`來指定。

延續上方`CMD`的範例，並修改為

```bash
FROM ubuntu:18.04
RUN apt-get update \
    && apt-get install -y curl \
    && rm -rf /var/lib/apt/lists/*
ENTRYPOINT [ "curl", "-s", "https://ip.cn" ]
```

再次嘗試就成功了，這是因為當指定`ENTRYPOINT`後，`CMD`就不再是直接運行，

而是將內容傳給`ENTRYPOINT`。


***LABEL***

為image記載相關metadata

```bash
LABEL version="1.0"
LABEL description="This text cool"
LABEL maintainer="johnnywang@home.org.com"
```

可用 `docker inspect` 查看


***EXPOSE***

```bash
EXPOSE <port> [<port>/<protocol>...]
```

`EXPOSE` 指示Docker Container在runtime時，所listen的ports

`EXPOSE` 指令並沒有實際 publish port，僅用以提供使用者應該publish到哪個port

預設EXPOSE 使用TCP，也可指定為UDP

```bash
EXPOSE 80/udp
```

使用 `docker network` 提供container間的溝通，即可不必設定EXPOSE及publish位置


***ADD, COPY***

格式和性質基本相同，但ADD在COPY上增加一些功能。比如`<src>`可以是URL，

另外ADD 複製的檔案若為壓縮檔，將會自董解壓縮處理。但若僅需複製就好時，必須使用COPY。

建議盡量使用功能較單純的COPY，因ADD包含較多複雜功能，行為不一定很清晰，通常只在需要解壓縮的場合使用。

有兩種格式：

  1. `ADD|COPY [--chown=<user>:<group>] <src>... <dest>`

  2. `ADD|COPY [--chown=<user>:<group>] ["<src>",... "<dest>"]` (當path包含空格時，需使用此格式)

從`<src>`複製新檔案並新增到`<dest>`，當需要查找檔名包含`[, ]`等，必須使用Golang規則，

如下範例：

```bash
ADD hom* /mydir/        # adds all files starting with "hom"
ADD hom?.txt /mydir/    # ? is replaced with any single character, e.g., "home.txt"

ADD arr[[]0].txt /mydir/    # copy a file named "arr[0].txt" to /mydir/
```

使用時須遵守以下幾點：

  1. `<src>`路徑必須在context中，不可使用如 `ADD ../something /something`

  2. 若`<src>`是一個URL，且`<dest>`不以trailing slash結尾，檔案將從url下載後複製進`<dest>`

  3. 若`<src>`是一個URL，但`<dest>`以trailing slash結尾，檔案將從url下載後複製`<dest>/<filename>`，

      例如，`ADD http://example.com/foobar /` 會建立 `/foobar` 檔案

  4. 若`<src>`是一個目錄，則該目錄下的所有內容都將被複製，包括檔案系統metadata，目錄本身不會被複製，僅內容


***VOLUME***

VOLUME ["/data"]

(待補)


***WORKDIR***

```bash
WORKDIR /path/to/workdir
```

為所有`RUN, CMD, ENTRYPOINT, COPY, ADD` 等指令，設置working directory

`WORKDIR` 可以在一個Dockerfile內使用多次，若使用相對位置時，會自動比對上一個`WORKDIR`的位置

```bash
WORKDIR /a
WORKDIR b
WORKDIR c
RUN pwd

# /a/b/c
```

***ONBUILD***

(待補)