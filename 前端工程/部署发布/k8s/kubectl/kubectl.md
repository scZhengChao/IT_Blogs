# kubectl

## 目录

- [kubectl 工具介绍](#kubectl-工具介绍)
  - [查看配置](#查看配置)
  - [应用配置文件](#应用配置文件)
  - [查看 Pod 输出](#查看-Pod-输出)
  - [进入容器内部命令行环境](#进入容器内部命令行环境)

## kubectl 工具介绍

kubectl 是 K8S 提供的命令行工具，使得用户可以在本地对 K8S 集群发送操作指令。

> MacOS 下的安装教程：[https://kubernetes.io/zh/docs/tasks/tools/install-kubectl-macos/](https://kubernetes.io/zh/docs/tasks/tools/install-kubectl-macos/ "https://kubernetes.io/zh/docs/tasks/tools/install-kubectl-macos/")

安装完成后，创建配置文件：

```bash 
touch $HOME/.kube/config
```


然后在文件中加入集群配置：

> 下面的配置仅做参考，连接集群的时候需要改为对应的配置。

```yaml 
 apiVersion: v1
 # 集群配置，可以是多个；集群必须包含 server 字段
 clusters:
   - cluster:
       server: https://dami.net
     name: dami-c3
 # 上下文配置，可以是多个，每个上下文必须包含集群名称、namespace 名称、用户名
 contexts:
   - context:
       cluster: dami-c3
       namespace: demo-space
       user: manooog
     name: c3-demo-space-context
 # 当前默认的上下文配置，所有 kubectl 命令，都会默认使用这个上下文
 current-context: c3-demo-space-context
 kind: Config
 # 用户信息，包含用户名和对应的权限信息，可能是 token
 users:
   - name: manooog
     user:
       token: <yourToken>

```


保存好配置之后，就可以是使用 kubectl 命令对集群进行操作了。eg：

```bash 
 kubectl get ingress # 获取当前 context 中对应的 namespace 中的 Ingress 配置

```


kubectl 功能比较多，根据使用习惯的不同，同一个功能也有不同的使用方式。下面列举一些我使用得比较多的命令。

### 查看配置

```typescript 
kubectl get service/<xxx> -o yaml
```


以上命令的含义是，获取名称为`xxx`的 service 对应的配置文件，并且以 yaml 格式输出。对于不同的资源，通常是以`<类型>/<名称>`进行区分的。

### 应用配置文件

上面提到过，K8S 中一切资源**都可以从声明式配置中得到**。当我们想创建一个资源的时候，可以先创建对应的配置文件。然后使用以下命令使配置生效：

```bash 
 kubectl create -f service.yaml
 kubectl apply -f service.yaml
```


以上命令都可以应用配置文件，区别就在在于，create 通常用于第一次创建，apply则用于修改已存在的配置文件。我更倾向于使用 apply 命令。

> 二者在使用上的区别：[https://stackoverflow.com/questions/47369351/kubectl-apply-vs-kubectl-create](https://stackoverflow.com/questions/47369351/kubectl-apply-vs-kubectl-create "https://stackoverflow.com/questions/47369351/kubectl-apply-vs-kubectl-create")

### 查看 Pod 输出

```bash 
 kubectl logs <pod> <conteiner-name>
```


获取 Pod 中对应的容器的输出信息。如果 Pod 中只有一个容器，container-name 可以省略。

### 进入容器内部命令行环境

在容器运行过程中，可能会出现异常情况，这个时候需要进入容器内部进行检查。这个时候可以使用以下命令：

```bash 
 kubectl exec -it demo-5b7846d65b-nvnnm -- sh
```


如果 Pod 包含多个容器，同样需要使用 `-c`参数，指定需要进入的容器名称。
