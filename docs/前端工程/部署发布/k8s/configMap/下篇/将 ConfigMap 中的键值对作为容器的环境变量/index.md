# 将 ConfigMap 中的键值对作为容器的环境变量

## 目录

- [开发示例应用](#开发示例应用)
- [实战：以使用“容器的环境变量”的方式](#实战以使用容器的环境变量的方式)

# 开发示例应用

1. goweb项目目录结构

```bash 
[root@workhost goweb]# tree
.
├── Dockerfile
├── go.mod
├── main.go
├── README.md
└── static
    └── login.html

```


1. main.go

```go 
package main

import (
        "fmt"
        "log"
        "net/http"
        "os"
        "text/template"
)

type Message struct {
        Msg string
}

func home(w http.ResponseWriter, r *http.Request) {
        if r.Method == "GET" {
                w.Header().Set("Location", "/login")
                w.WriteHeader(http.StatusFound)
        }
}

func login(w http.ResponseWriter, r *http.Request) {
        t, _ := template.ParseFiles("./static/login.html")
        if r.Method == "GET" {
                t.Execute(w, nil)
        }
}

func main() {
        http.HandleFunc("/", home)
        http.HandleFunc("/login", login)
        args := os.Args
        if args[1] == "-p" {
                port := args[2]
                listenAddr := fmt.Sprintf(":%v", port)
                log.Println("ListenAndserve", listenAddr)
                err := http.ListenAndServe(listenAddr, nil)
                if err != nil {
                        log.Println(err)
                }
        }
}

```


> 本次代码在上次的基础上做了点小改造：接受命令行参数，使用 os.Args 获取程序运行时的参数。如果传入的参数中包含 -p，则说明需要指定监听的端口，将端口值读取出来并使用 http.ListenAndServe 启动 HTTP 服务。

# 实战：以使用“容器的环境变量”的方式

1. 制作镜像

编写Dockerfile：

```docker 
FROM alpine:latest
WORKDIR /app
COPY static /app/static
COPY main /app
ENV PORT 80 # 设置默认端口号为80，这个值将在容器启动时被覆盖
CMD ["/bin/sh", "-c", "./main -p $PORT"]

```


构建镜像和推送到私有harbor：

```docker 
docker build -t 192.168.11.254:8081/webdemo/goweb:20230515v2 .
docker push 192.168.11.254:8081/webdemo/goweb:20230515v2

```


1. 测试

```docker 
[root@workhost goweb]# docker run --rm -it -p 80:9090 -e PORT=9090 192.168.11.254:8081/webdemo/goweb:20230515v2
2023/05/15 02:08:43 ListenAndserve :9090

```


使用 -p 参数将本地主机的 80 端口映射到容器内部的 9090 端口，使用 -e 参数设置环境变量 PORT 的值为 9090，可以正常启动，说明在启动时已经覆盖掉了默认端口80，且能正常访问：

![](./image/image_lEgSIu5e8v.png)

1. 创建configmap

```docker 
kubectl create configmap goweb --from-literal=port=9091

```


执行命令后将会创建一个名为 goweb 的 ConfigMap，其中包含一个名为 port 的键，值为 9091。这样，在 Pod 中使用 \$PORT 环境变量时，就可以将其设置为 9091。

> 说明：--from-literal=port=9091 表示要将 port 这个键的值设置为 9091，这里使用 --from-literal 标志表示将文本作为字面量值创建 ConfigMap。

1. 创建pod

```yaml 
apiVersion: v1
kind: Pod
metadata:
  name: goweb
spec:
  containers:
  - name: goweb
    image: 192.168.11.254:8081/webdemo/goweb:20230515v2
    env:
    - name: PORT
       valueFrom:
        configMapKeyRef:
          name: goweb
          key: port
```


上面`yaml`中，通过设置 `env `字段，将 `ConfigMap `中的 `port `键值对**作为环境变量注入到容器中的应用程序中**。使用了 `valueFrom `字段指定了 `ConfigMap `的**名称和键**，从而将 `ConfigMap `中的 `port `值**注入到容器**的 `PORT `环境变量中。这样，在容器启动后，应用程序就可以通过读取 `PORT `**环境变量**的值来获取应该监听的端口，实现了将 `ConfigMap `的值注入到容器的环境变量中的功能。

1. 进入pod验证

```bash 
[root@k8s-b-master ~]# kubectl get pod
NAME    READY   STATUS    RESTARTS   AGE
goweb   1/1     Running   0          29s
[root@k8s-b-master ~]# kubectl exec -it goweb -- sh
/app # ps
PID   USER     TIME  COMMAND
    1 root      0:00 ./main -p 9091
   11 root      0:00 sh
   17 root      0:00 ps
/app # 

```


1. 完整的yaml

```yaml 
apiVersion: v1
metadata:
  name: goweb
data:
  port: "9091"
kind: ConfigMap
---
apiVersion: apps/v1
kind: Deployment
metadata:
  labels:
    app: goweb
  name: goweb
spec:
  replicas: 3
  selector:
    matchLabels:
      app: goweb
  template:
    metadata:
      labels:
        app: goweb
    spec:
      containers:
        - name: goweb
          image: 192.168.11.254:8081/webdemo/goweb:20230515v2
          env:
          - name: PORT
            valueFrom:
              configMapKeyRef:
                name: goweb
                key: port

```
