# 搞懂 Kubernetes Pod 如何获取 IP 地址

## 目录

- [背景概念](#背景概念)
- [同一主机上的容器](#同一主机上的容器)
- [不同主机上的容器](#不同主机上的容器)
- [为节点子网分配 Pod IP 地址](#为节点子网分配-Pod-IP-地址)
- [Kubelet、Container Runtime 和 CNI 插件交互](#KubeletContainer-Runtime-和-CNI-插件交互)

&#x20;      Kubernetes **网络模型的核心要求之一**是每个 Pod 都拥有**自己的 IP 地址并可以使用该 IP 地址进行通信**。很多人刚开始使用 Kubernetes 时，还不清楚如**何为每个 Pod 分配 IP 地址**。

&#x20;     他们了解各种组件如何独立工作，但不清楚这些组件如何组合在一起使用。

&#x20;     例如，他们了解什么是 CNI 插件，但是不知道它们是如何被调用的。

&#x20;     本文就介绍了各种网络组件在 Kubernetes 集群中是如何交互的，以及如何帮助每个 Pod 都获取 IP 地址。

在 Kubernetes 中有多种网络设置方法，以及 container runtime 的各种选项。这篇文章将使用 Flannel 作为 network provider，并使用 Containered 作为 container runtime。

# **背景概念**

容器网络

# **同一主机上的容器**

在**同一主机上**运行的容器**通过 IP 地址相互通信**的方法之一是使用 **Linux Bridge**，即在 Kubernetes（和 Docker）世界中，**创建 veth（虚拟以太网）设备**。该 veth 设备的一端连接在容器网络命名空间，另一端连接到主机网络上的 Linux Bridge。同一主机上的所有容器都将这 veth pair 的一端连接到 Linux Bridge，它们可以通过 Bridge 使用 IP 地址相互通信。Linux Bridge 也被分配了一个 IP 地址，它充当从目的地到不同节点的 Pod 流出流量的网关。

![](https://mmbiz.qpic.cn/sz_mmbiz_png/7OPxOA8ic5m8RXCe8Wy7BTyLTFuonroyNyp3c0fK0sxrOFX65DP1oaw6BFD3ESdYfpNQApMG8c3iaOssEBplJQ9A/640?wx_fmt=png)

# **不同主机上的容器**

在**不同主机上运行的容器**可以**通过其 IP 地址相互通信**的方式之一是使用数据包封装（packet encapsulation）。Flannel 通过 vxlan 使用该功能，vxlan 将原始数据包封装在 UDP 数据包中并将其发送到目的地。

在 Kubernetes 集群中，Flannel 会在每个节点上创建一个 vxlan 设备和一些路由表。每个发往**不同主机上的容器**的数据包都**会通过 vxlan 设备**，并封装在 UDP 数据包中。在目标位置，它会提取封装的数据包，然后将数据包路由到目的地 Pod。

![](https://mmbiz.qpic.cn/sz_mmbiz_png/7OPxOA8ic5m8RXCe8Wy7BTyLTFuonroyNSkTQTeJXwTfGlaDPG6TRO1p5ibpmGiaU4viabQlBqKJWtxPxh5BEcda6A/640?wx_fmt=png)

> 注意：这只是配置容器之间网络的方法之一。

CRI

CRI（容器运行时接口）是一个插件接口，允许 kubelet 使用不同的 container runtimes。各种 container runtimes 都实现了 CRI API，这使用户可以在 Kubernetes 安装中使用他们想要的 container runtimes。

CNI

CNI（容器网络接口）项目包含一个为 Linux 容器提供基于通用插件网络解决方案的规则。它由各种插件组成，这些插件在配置 Pod 网络时执行不同的功能。CNI 插件是遵循 CNI 规范的可执行文件。

# **为节点子网分配 Pod IP 地址**

如果要求所有 Pod 具有 IP 地址，那么就要确保整个**集群中的所有 Pod 的 IP 地址是唯一**的。这可以**通过为每个节点分配一个唯一的子网来实现**，即从子网中为 Pod 分配节点 IP 地址。

节点 IPAM 控制器

当 `nodeipam` 传递给 kube-controller-manager 的 `--controllers` 命令行标志时，它将为每个节点分配来自集群 CIDR（集群网络的 IP 范围）的专用子网（podCIDR）。由于这些 podCIDR 是不相交的子网，因此它可以为每个 Pod 分配唯一的 IP 地址。

当 Kubernetes 节点首次在集群上注册时，会被分配一个 podCIDR。要更改分配给集群中节点的 podCIDR，需要先注销节点，然后使用应用于 Kubernetes 控制平面的任何配置更改来重新注册节点。`podCIDR` 可以使用以下命令列出节点的名称：

![](https://mmbiz.qpic.cn/mmbiz_jpg/1e9ia4YcKpMNqoUGzGUmiaVSeticcicCtegZBxiaXyMwWuvLSk3fdQS0qFrK7YVSBJtwcMr02JkhkEzN9VPicZw5vSQA/640?wx_fmt=jpeg\&wxfrom=5\&wx_lazy=1\&wx_co=1\&tp=wxpic)

# **Kubelet、Container Runtime 和 CNI 插件交互**

当在节点上调度 Pod 时，一启动 Pod 就会发生很多事情。这里我们仅关注与 Pod 配置网络有关的动态。一旦在节点上调度了 Pod，将配置网络并启动应用程序容器。

![](https://mmbiz.qpic.cn/sz_mmbiz_png/7OPxOA8ic5m8RXCe8Wy7BTyLTFuonroyNG3ibeDCUcYN6FOY9qeVNduXjxibEwwQWUMtGBL2iae2UibU4NR9BL8HMMA/640?wx_fmt=png)

参考：容器式 cri 插件架构

Container Runtime 与 CNI 插件的交互

每个 network provider 都有一个 CNI 插件，container runtime 会调用该插件，在 Pod 启动时配置网络。使用容器化作为 container runtime，容器化 CRI 插件将调用 CNI 插件。每个 network provider 都在每个 Kubernetes 节点上安装了一个代理，以配置 Pod 网络。安装 network provider agent 后，它会随 CNI 一起配置或者在节点上创建，CRI 插件会使用它来确定要调用哪个 CNI 插件。

CNI 配置文件的位置是可配置的，默认值为 `/etc/cni/net.d/<config-file>`。集群管理员需要在每个节点上交付 CNI 插件。CNI 插件的位置也是可配置的，默认值为 `/opt/cni/bin`。

如果使用 containerd 作为 container runtime，则可以在 containerd config 部分下 `[plugins."io.containerd.grpc.v1.cri".cni]` 指定 CNI 配置和 CNI 插件的路径。

本文中我们将 Flannel 作为 network provider，这里简单介绍一下 Flannel 的设置。Flanneld 是 Flannel 守护程序，通常 install-cni 作为带有初始化容器的守护程序安装在 Kubernetes 集群上。install-cni 容器创建 CNI 配置文件在每个节点上 `/etc/cni/net.d/10-flannel.conflist`。Flanneld 创建一个 vxlan 设备，从 apiserver 获取网络元数据，并监控 Pod 上的更新。创建 Pod 时，它将在整个集群中为所有 Pod 分配路由，这些路由允许 Pod 通过 IP 地址相互连接。

Containerd CRI 插件和 CNI 插件之间的交互可以如下所示：

![](https://mmbiz.qpic.cn/sz_mmbiz_png/7OPxOA8ic5m8RXCe8Wy7BTyLTFuonroyNDmQWeu8zCSQ9icAbeicTbj2aJrU2B7rZ163otYhJjeXWRf7qCAXY5cog/640?wx_fmt=png)

如上所述，kubelet 调用 Containered CRI 插件创建容器，再调用 CNI 插件为容器配置网络。Network provider CNI 插件调用其他基本 CNI 插件来配置网络。CNI 插件之间的交互如下所述。

CNI 插件之间的交互

有多种 CNI 插件可帮助配置主机上容器之间的网络，本文主要讨论以下 3 个插件。

**Flannel CNI 插件**

当使用 Flannel 作为 network provider 时，Containered CRI 插件使用 CNI 配置文件，调用 Flannel CNI 插件：/etc/cni/net.d/10-flannel.conflist。

![](https://mmbiz.qpic.cn/sz_mmbiz_png/7OPxOA8ic5m8RXCe8Wy7BTyLTFuonroyNDPmpPQy6ky1QbQmSticcp2yqFz2icqicDFeF5u0NPGPibicmcekic4k3OKibQ/640?wx_fmt=png)

Fannel CNI 插件与 Flanneld 结合使用，当 Flanneld 启动时，它将从 apiserver 中获取 podCIDR 和其他与网络相关的详细信息，并将它们存储在文件中/run/flannel/subnet.env。

![](https://mmbiz.qpic.cn/sz_mmbiz_png/7OPxOA8ic5m8RXCe8Wy7BTyLTFuonroyNgIWxCtoYpecycyqDAvjPWsTkXHcajicBWU4MCpS1DZxxeaKFNWhwmyw/640?wx_fmt=png)

Flannel CNI 插件使用 /run/flannel/subnet.env 的信息来配置和调用 Bridge CNI 插件。

**Bridge CNI 插件**

Flannel CNI 插件使用以下配置调用 Bridge CNI 插件：

![](https://mmbiz.qpic.cn/sz_mmbiz_png/7OPxOA8ic5m8RXCe8Wy7BTyLTFuonroyNhQTlLRqjvNnf3Fy6lTZ06dqmPfTZ4gSCfcqq97OhfL6HzrIZ2bM5vA/640?wx_fmt=png)

当 Bridge CNI 插件第一次调用时，它会创建一个 Linux Bridge `"name": "cni0"` 在配置文件中，然后为每个 Pod 创建 veth pair，其一端在容器的网络命名空间中，另一端连接到主机网络上的 Linux Bridge。使用 Bridge CNI 插件，主机上的所有容器都连接到主机网络上的 Linux Bridge。

配置完 veth pair 后，Bridge 插件将调用主机本地 IPAM CNI 插件。我们可以在 CNI config 中配置要使用的 IPAM 插件，CRI 插件用于调用 Flannel CNI插件。

**主机本地 IPAM CNI 插件**

Bridge CNI 插件使用以下配置调用主机本地 IPAM CNI 插件：

![](https://mmbiz.qpic.cn/sz_mmbiz_png/7OPxOA8ic5m8RXCe8Wy7BTyLTFuonroyNEOZeZzTk0Q4nLyerkoWgIT2N2nU9LcIDYf9LLNgaAoQtC33eppCTHg/640?wx_fmt=png)

主机本地 IPAM（IP 地址管理）插件从中返回容器的 IP 地址，subnet将分配的 IP 本地存储在主机下`dataDir`指定的目录中

**`/var/lib/cni/networks/<network-name=cni0>/<ip>`**

`/var/lib/cni/networks/<network-name=cni0>/<ip>`文件包含 IP 分配到的容器 ID。

调用时，主机本地 IPAM 插件返回以下有效负载：

![](https://mmbiz.qpic.cn/sz_mmbiz_png/7OPxOA8ic5m8RXCe8Wy7BTyLTFuonroyNgibxVfc9GeG0KY1Bw8UoUSbV8XSou0y8IvADE13ofhkB2h36vsceX0Q/640?wx_fmt=png)

**总结**

Kube-controller-manager 为每个节点分配一个 podCIDR。从 podCIDR 中的子网值为节点上的 Pod 分配了 IP 地址。由于所有节点上的 podCIDR 是不相交的子网，因此它允许为每个 pod 分配唯一的IP地址。

Kubernetes 集群管理员可配置和安装 kubelet、container runtime、network provider，并在每个节点上分发 CNI 插件。Network provider agent 启动时，将生成 CNI 配置。在节点上调度 Pod 后，kubelet 会调用 CRI 插件来创建 Pod。在容器情况下，容器的 CRI 插件调用 CNI 配置中指定的 CNI 插件来配置 Pod 网络。所有这些都会影响 Pod 获取 IP地址。
