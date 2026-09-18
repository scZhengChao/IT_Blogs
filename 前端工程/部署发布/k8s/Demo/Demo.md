# Demo

## 目录

- [ingress 创建](#ingress-创建)
- [service 创建](#service-创建)
- [deployment 创建](#deployment-创建)

这个 demo 的目标是启动一个 3 实例的 Node.js 后端程序，并实现以下效果：

```typescript 
 curl demo-20211215.io/20211215
 // -> Hello World
```


[http://demo-20211215.io](http://demo-20211215.io "http://demo-20211215.io") 域名指向的是集群 Ip，当请求`/20211215`这个路径的时候，期望能收到 Node.js 后端返回的字符串：`Hello World`。

由于这个示例域名是不存在的，因此我们这里利用 Hosts 进行配置。在本地 Hosts 增加一条记录，将域名直接绑定到测试集群的 Ingress IP上：

```typescript 
 <Ingress IP> demo-20211215.io
```


现在执行测试命令，将会得到下面的提示：

```typescript 
 $ curl -v demo-20211215.io/2021215
 *   Trying <Ingress IP>...
 * TCP_NODELAY set
 * Connected to demo-20211215.io (<Ingress IP>) port 80 (#0)
 > GET /2021215 HTTP/1.1
 > Host: demo-20211215.io
 > User-Agent: curl/7.64.1
 > Accept: */*
 > 
 < HTTP/1.1 404 Not Found
 < Server: nginx/1.19.2
 < Date: Tue, 14 Dec 2021 07:10:59 GMT
 < Content-Type: text/plain; charset=utf-8
 < Content-Length: 21
 < Connection: keep-alive
```


目前集群还不能响应对于 `/20211215` 这个 path 的请求。接下来，让我们一起试着将这个服务部署起来。

### ingress 创建

首先，我们需要创建一条 Ingress 规则，并保存为`ingress.yml`：

```typescript 
apiVersion: extensions/v1beta1
kind: Ingress
metadata:
 name: demo-20211215
 annotations:
   nginx.ingress.kubernetes.io/ssl-redirect: "false"
spec:
 rules:
   - host: demo-20211215.io
     http:
       paths:
         - path: /20211215
           backend:
             serviceName: demo-service-20211215
             servicePort: 80
 
```


执行创建命令：

```typescript 
 kubectl apply -f ingress.yaml
```


接着再执行：

```typescript 
 kubectl get ingress                             
 NAME                   HOSTS                                                                          ADDRESS                                                                       PORTS     AGE
 demo-20211215          demo-20211215.io    
```


就可以看到刚才创建的那条 ingress 规则了。这个时候，再尝试访问`demo-20211215.io/20211215`，返回结果已经有了变化：

```typescript 
$ curl demo-20211215.io/20211215
 < HTTP/1.1 503 Service Temporarily Unavailable
 < Server: nginx/1.19.2
 < Date: Tue, 14 Dec 2021 07:20:28 GMT
 < Content-Type: text/html
 < Content-Length: 197
 < Connection: keep-alive
```


目前服务仍不可访问，但配置已生效。

配置解析：

```typescript 
 metadata.name // 这条 ingress 的规则名称，同一个 namespace 中，name 字段是唯一的。
 metadata.annotations // 这个是对 ingress 控制器的配置，视具体情况而定
 spec.rules // 匹配规则
```


在这个配置中，有一条规则。即：响应对 [http://demo-20211215.io/20211215](http://demo-20211215.io/20211215 "http://demo-20211215.io/20211215") 这个 URL 的请求，并且将请求转发给名为 `demo-service-20211215`的这个 service 的 80 端口

注意，这个时候尚未创建对应的 Service，但 K8S 并没有提示创建 ingress 失败。这是因为K8S提供的服务发现的能力，如果后期对应的服务被创建了，那么自然会被 ingress 识别，并分配流量过去。

### service 创建

创建`service.yaml`并贴入以下内容：

```typescript 

 apiVersion: v1
 kind: Service
 metadata:
   name: demo-service-20211215
 spec:
   selector:
     app: demo-app-20211215
   ports:
     - protocol: TCP
       port: 80
       targetPort: 3000
```


执行创建命令：

```typescript 
kubectl apply -f service.yaml

```


创建好之后通过以下命令查看：

```typescript 
 kubectl get service/demo-service-20211215               
 NAME            TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)   AGE
 demo-service-20211215   ClusterIP   10.254.40.168   <none>        80/TCP    51s
```


配置解析：

```typescript 
metadata.name // service 的名称，在同一个 namespace 中，该字段是唯一的
spec.selector.app // 这是一个选择器，可以选择 labels 中包含 app=demo-app-20211215 的 pod 加入这个 service 中
```


### deployment 创建

将下面的配置内容保存为`deployment.yaml`：

```typescript 
 apiVersion: apps/v1
 kind: Deployment
 metadata:
   name: demo-deployment-20211215
 spec:
   replicas: 3
   selector:
     matchLabels:
       app: demo-app-20211215
   template:
     metadata:
       labels:
         app: demo-app-20211215
     spec:
       containers:
         - name: demo-20211215
           image: rxh1212/demo-20211215
           ports:
             - containerPort: 3000

```


创建以及查看的命令就不再举例了。

配置解析：

```typescript 
metadata.name // deployment 的名称，也是 namespace 中必须要唯一的
 spec.replicas // pod 的实例个数，这里是 3，表示将会部署三个应用实例
 spec.selector.matchLabels // 应该与 spec.template.metadata.labels 相同，表示的是 pod 的 labels。
 spec.template.spec.containers // 是一个数组，表示这个 deployment 所使用的容器。
```


在这里我使用了名为 `rxh1212/demo-20211215` 镜像，它是我单独编译的，包含一个 Node.js 应用。代码如下：

```typescript 
 "use strict"
 
 const express = require("express")
 
 // Constants
 const PORT = 3000
 const HOST = "0.0.0.0"
 
 // App
 const app = express()
 app.get("/20211215", (req, res) => {
   res.send("Hello World")
 })
 
 app.listen(PORT, HOST)
 console.log(`Running on http://${HOST}:${PORT}`)


```


镜像启动之后，会在 3000 端口提供一个 Http 服务。如果访问 `/20211215`，会收到`Hello World`的响应。

言归正传，deployment 创建好之后，再对`demo-20211215.io/20211215`进行访问，即可得到以下响应：

```typescript 

 $ curl demo-20211215.io/20211215
 < HTTP/1.1 200 OK
 < Server: nginx/1.19.2
 < Date: Tue, 14 Dec 2021 07:25:54 GMT
 < Content-Type: text/html; charset=utf-8
 < Content-Length: 11
 < Connection: keep-alive
 < X-Powered-By: Express
 < ETag: W/"b-Ck1VqNd45QIvq3AZd8XYQLvEhtA"
 < 
 * Connection #0 to host demo-20211215.io left intact
 Hello World* Closing connection 0
```


至此，我们完成了一个简单的 K8S 部署流程。
