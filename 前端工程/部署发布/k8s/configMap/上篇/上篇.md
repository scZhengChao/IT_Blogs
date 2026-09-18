# 上篇

## 目录

- [写在开篇](#写在开篇)
  - [什么是 ConfigMap？](#什么是-ConfigMap)
  - [ConfigMap 的作用是什么？](#ConfigMap-的作用是什么)
- [创建 ConfigMap](#创建-ConfigMap)
  - [使用 kubectl 命令创建 ConfigMap](#使用-kubectl-命令创建-ConfigMap)
  - [使用 YAML 文件创建 ConfigMap](#使用-YAML-文件创建-ConfigMap)
- [查看 ConfigMap](#查看-ConfigMap)
  - [使用 kubectl 命令查看 ConfigMap](#使用-kubectl-命令查看-ConfigMap)
  - [查看 ConfigMap 的详细信息](#查看-ConfigMap-的详细信息)
- [删除 ConfigMap](#删除-ConfigMap)

# 写在开篇

## 什么是 ConfigMap？

在 `Kubernetes` 中，`ConfigMap` 是一种 **API 资源对象**，**用于存储非密钥/值数据**，例如**配置文件**、**环境变量**和**命令行参数**等。

`ConfigMap` 允许将这些**数据**与**应用程序的容器**进行**解耦**，从而使应用程序更加**可移植**和**可配置。**通过将配置数据存储在 ConfigMap 中，可以在**不修改应用程序容器镜像**的情况下，**灵活地管理应用程序的配置**。

`ConfigMap` 可以通过 `kubectl` 命令或 `YAML` 文件进行创建、更新和删除。应用程序容器可以通过**挂载 ConfigMap**，从而**访问**其中存储的**配置数据**，也可以将 `ConfigMap` 中的**数据作为环境变量或命令行参数**注入到**容器**中。

官方文档可参考：[kubernetes.io/zh-cn/docs/…](https://link.juejin.cn/?target=https://kubernetes.io/zh-cn/docs/concepts/configuration/configmap/ "kubernetes.io/zh-cn/docs/…")

> ❝
> 总之，`ConfigMap` 是 `Kubernetes` 中一种重要的配置管理方式，它可以帮助我们更好地管理应用程序的**配置和数据**。
> ❞

## ConfigMap 的作用是什么？

ConfigMap 的主要作用是**存储应用程序的配置和数据**。在 `Kubernetes` 中，应用程序的配置和数据通常是存储在**容器镜像**中的文件或环境变量中。但是，将**配置和数据硬编码到容器镜像中**会导致以下问题：

1. **缺乏灵活性：**在不重新**构建和部署容器镜像**的情况下，**无法更改**应用程序的配置和数据。
2. **安全问题**：在容器镜像中存储敏感信息，如密码和密钥，可能会**导致信息泄露**的风险。
3. **环境差异：**由于在不同的环境中使用不同的配置和数据，因此在**部署到不同的环境**时，容器镜像中的配置和数据可能不适用于该环境。

ConfigMap 解决了上述问题。通过使用 ConfigMap，可以将**应用程序的配置和数据与容器镜像**分离，并将其存储在 `Kubernetes` 集群中。这使得在**不修改容器镜像**的情况下，可以轻松**更改应用程序的配置和数据**，提高了**灵活性和可移植性**。此外，通过将敏感信息存储在 ConfigMap 中，而不是在容器镜像中，可以提高应用**程序的安全性**。最后，通过使用不同的 `ConfigMap` 来适应不同的环境，可以确保应用程序在不同的环境中具有一致的行为。

# 创建 ConfigMap

## 使用 kubectl 命令创建 ConfigMap

1. 使用`kubectl`**命令行工具**创建一个名为“`testcm`”的`ConfigMap`资源

```javascript 
[root@k8s-b-master configmap-test]# kubectl create configmap testcm --from-literal=ip=10.1.1.16 --from-literal=hostname=web01
configmap/testcm created

```


**包含两个键值**对：

- “ip”键的值为“10.1.1.16”
- “hostname”键的值为“web01”

1. 从**文件中**创建 `ConfigMap`：

```lua 
# config-files目录下有如下两个配置文件：
[root@k8s-b-master configmap-test]# ls -l config-files/
total 8
-rw-r--r-- 1 root root 45 May  1 22:48 config.yaml
-rw-r--r-- 1 root root 42 May  1 22:47 default.yaml

# 创建名为 my-config 的 ConfigMap，并将 config-files/ 目录中的所有文件添加到其中：
[root@k8s-b-master configmap-test]# kubectl create configmap my-config --from-file=config-files/
configmap/my-config created

```


1. 从**环境变量文件中**创建 `ConfigMap`：

```lua 
# 准备env-vars.env环境变量文件：
[root@k8s-b-master configmap-test]# cat env-vars.env 
MY_K8S_MASTER_IP=192.168.11.100
MY_K8S_MASTER_HOSTNAME=k8s-b-master

# 从名为 env-vars.env 的环境变量文件中创建名为 my-cf 的 ConfigMap。
[root@k8s-b-master configmap-test]# kubectl create cm my-cf --from-env-file=env-vars.env 
configmap/my-cf created


```


## 使用 YAML 文件创建 ConfigMap

1. 下面的 `ConfigMap `资源有两个数据项，分别是 "db.yaml" 和 "default.yaml"：

```yaml 
apiVersion: v1
kind: ConfigMap
metadata:
  name: my-cm01
data:
  db.yaml: |
    db:
      dbname: cmdb
      dbhost: 10.1.1.19
  default.yaml: |
    web:
      domain: test.noblameops.local
      ip: 10.1.1.10

```


```yaml 
kubectl create -f my-cm01.yaml 

```


> ❝
> 这些数据项**本质上是键值对**，其中**键是文件名**，**值是**一个 **YAML 格式的字符串**，其中**包含了应用程序所需的配置信息**。
> ❞

1. 下面的文件指定了两个键值对，分别是 MY\_K8S\_MASTER\_HOSTNAME 和 MY\_K8S\_MASTER\_IP：

```yaml 
apiVersion: v1
kind: ConfigMap
metadata:
  name: my-cm02
data:
  MY_K8S_MASTER_HOSTNAME: k8s-b-master
  MY_K8S_MASTER_IP: 192.168.11.100

```


```yaml 
kubectl create -f my-cm02.yaml 

```


# 查看 ConfigMap

## 使用 `kubectl `命令查看 ConfigMap

```bash 
[root@k8s-b-master configmap-test]# kubectl get configmap
NAME               DATA   AGE
kube-root-ca.crt   1      47h
my-cm01            2      96s
my-cm02            2      9m47s

```


字段解释：

- NAME：ConfigMap 的名称。
- DATA：ConfigMap 中包含的数据项数量。
- AGE：ConfigMap 创建以来的时间，格式为 d天 h小时 m分钟 s秒。

## 查看 ConfigMap 的详细信息

```docker 
[root@k8s-b-master configmap-test]# kubectl describe configmap my-cm02
Name:         my-cm02
Namespace:    default
Labels:       <none>
Annotations:  <none>

Data
====
MY_K8S_MASTER_HOSTNAME:
----
k8s-b-master
MY_K8S_MASTER_IP:
----
192.168.11.100

BinaryData
====

Events:  <none>
[root@k8s-b-master configmap-test]# 

```


部分解释:

- Name: my-cm02：ConfigMap 的名称为 my-cm02。
- Namespace: default：ConfigMap 所在的命名空间为 default。
- Labels:：ConfigMap 没有标签。
- Annotations:：ConfigMap 没有注释。
- Data：ConfigMap 包含的数据项如下：
- \*   MY\_K8S\_MASTER\_HOSTNAME: k8s-b-master：键名为 MY\_K8S\_MASTER\_HOSTNAME，对应的值为 k8s-b-master。
  - MY\_K8S\_MASTER\_IP: 192.168.11.100：键名为 MY\_K8S\_MASTER\_IP，对应的值为 192.168.11.100。
- BinaryData：ConfigMap 中没有二进制数据。
- Events:：ConfigMap 没有事件。

# 删除 ConfigMap

在生产环境中，删除ConfigMap是一件**比较危险的事情**，需要考虑清楚以下问题：

- 检查 ConfigMap 是否仍在使用
- 检查删除操作是否会影响应用程序的运行
- 确定 ConfigMap 是否存在备份
- 确定 ConfigMap 是否在版本控制系统中

删除操作很简单，但往往简单的背后都暗藏着“背锅的可能性”，正所谓三思而后行：

```docker 
[root@k8s-b-master configmap-test]# kubectl delete cm my-cm01
configmap "my-cm01" deleted
[root@k8s-b-master configmap-test]# kubectl delete cm my-cm02
configmap "my-cm02" deleted
[root@k8s-b-master configmap-test]# kubectl delete cm testcm
configmap "testcm" deleted

```


> ❝
> 总之，删除操作在上产环境中是不能随便执行的。那么在删除 ConfigMap 之前，请确保你已经检查过所有相关的事项，并且明确了它们对应用程序和系统的影响。否则，就是有你背锅的时候。
> ❞

如果你已经很清楚自己在干什么，且已经删除了ConfigMap， 那删除之后建议您：

- **修改应用程序配置**：删除后，需要考虑更新应用程序配置以删除对 ConfigMap 的依赖。可以使用 kubectl edit 命令修改 Pod 或其他 Kubernetes 对象的配置，以将它们与 ConfigMap 分离。
- **跟踪删除 ConfigMap 的影响**：如果删除了 ConfigMap，您需要跟踪应用程序是否会受到影响。可以通过查看应用程序的日志来查找任何错误或异常，并使用 kubectl describe 命令查看 Pod 或其他 Kubernetes 对象的详细信息，以确定它们是否正在使用 ConfigMap。
