# 服务与服务发现及路由

## 目录

- [Service分类](#Service分类)
- [service的三种代理模式](#service的三种代理模式)
  - [ipvs代理](#ipvs代理)
- [endpoint](#endpoint)

我们现在部署⼀个前后端分离的项⽬，前端是⼀组 Pod，后端也是⼀组 Pod，那么前**端如何找出并跟踪要连接的 IP 地址**，以便前端可以访问到⼯作的后端？Kubernetes 提供了⼀种 API 对象叫做 Service。

Service 可以理解为⼀种**访问⼀组特定Pod 的策略**。⼀个Service的⽬标Pod集合通常是由Label Selector来决定的

# Service分类

Service 在 K8S 中有以下四种类型： `ClusterIP`， `NodePort`， `LoadBalancer`，`ExternalName`

**ClusterIP k8s中的默认类型**，这个service有⼀个Cluster-IP，其实就⼀个VIP（虚拟ip）。具体实现原理依靠kubeproxy组件，通过iptables或是ipvs实现。这种**类型的service 只能在集群内访问**。

ClusterIP 主要在每个 node 节点使⽤ ipvs/iptables，将发向 ClusterIP 对应端⼝的数据，转发到 kubeproxy 中。然后 kube-proxy ⾃⼰内部**实现有负载均衡**的⽅法，并可以查询到这个 Service 下**对应 pod 的地址和端⼝**，进⽽把数据转发给**对应的 pod 的地址和端⼝**。

![](./assets/image/image_VxITFfCJ_W.png)

了实现图上的功能，主要需要以下⼏个组件的协同⼯作：

- apiserver：⽤户向 apiserver 发送创建 service 的命令，apiserver 接收到请求后将数据存储到 etcd中。
- kube-proxy：在 kubernetes 的每个节点中都有⼀个叫做 kube-porxy 的进程，这个进程负责感知 service 和 pod 的变化，并将变化的信息写⼊本地的 ipvs/iptables 规则中。
- ipvs/iptables：将 VirtualIP 的流量转⾄ endpoint 中。

# service的三种代理模式

Service 实现⽅式有三种：

- userspace模式 k8s 1.0版本,代理完全使⽤userspace,
- iptables,kubernetes1.2开始,默认就是iptables代理
- ipvs, kubernetes1.8开始添加了ipvs代理；在1.14版本开始默认使⽤ipvs代理。注意的是,当kube-proxy以ipvs代理模式启动时,kube-proxy将验证节点上是否安装了ipvs模块,如果未安装,则kube-proxy将回退到iptables模式

## ipvs代理

这种模式，kube-proxy 会监视 Kubernetes Service 对象和 Endpoints，调⽤ netlink 接⼝以相应地创建 ipvs 规则并**定期与 Kubernetes Service 对象和 Endpoints 对象同步 ipvs 规则，以确保ipvs 状态与期望⼀致**。访问服务时，流量将被重定向到其中⼀个后端 Pod。

![](./assets/image/image_mgMR75ObGg.png)

与iptables相⽐，提供功能类似,但使⽤哈希表作为底层数据结构,并在内核空间中⼯作。ipvs可以更快的重定向流量,并且在同步代理规则时具有更好的性能。
最终过程如下：

![](./assets/image/image_djLOdGL-xb.png)

# endpoint

`endpoint`是`k8s`集群中的⼀个资源对象，**存储在etcd中**，⽤来记录⼀个service对应的所有pod的访问地
址。service配置selector，endpoint controller才会⾃动创建对应的endpoint对象；否则，不会⽣成
endpoint对象.
