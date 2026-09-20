# 网络16张图

## 目录

- [Underlay Network Model](#Underlay-Network-Model)
  - [什么是 Underlay Network](#什么是-Underlay-Network)
  - [k8s 中的 underlay network](#k8s-中的-underlay-network)
    - [flannel host-gw](#flannel-host-gw)
    - [Calico BGP](#Calico-BGP)
  - [IPVLAN & MACVLAN](#IPVLAN--MACVLAN)
    - [multus](#multus)
    - [danm](#danm)
- [Overlay Network Model](#Overlay-Network-Model)
  - [什么是 Overlay](#什么是-Overlay)
  - [常见的网络隧道技术](#常见的网络隧道技术)
  - [IPIP](#IPIP)
  - [VxLAN](#VxLAN)
  - [weave vxlan](#weave-vxlan)

## Underlay Network Model

### 什么是 Underlay Network

底层网络 `Underlay Network` 顾名思义是指**网络设备基础设施**，如交换机，路由器, `DWDM` 使用**网络介质**将其链接成的**物理网络拓扑**，**负责网络之间的数据包传输。**

![](./image/image_arSQInwUEG.png)

Underlay network topology

`underlay network` 可以是二层，也可以是三层；二层的典型例子是以太网 `Ethernet`，三层是的典型例子是互联网 `Internet`。

而工作于二层的技术是 `vlan`，工作在三层的技术是由 `OSPF`, `BGP` 等协议组成。

### k8s 中的 underlay network

在 kubernetes 中，`underlay network` 中比较典型的例子是通过将**宿主机作为路由器设备**，Pod 的网络则通过**学习路由条目**从而实现**跨节点通讯。**

![](./image/image_zJ1rBxYUx9.png)

underlay network topology in kubernetes

这种模型下典型的有 `flannel` 的 `host-gw` 模式与 `calico` `BGP` 模式。

#### flannel host-gw

`flannel host-gw` 模式中每个 Node 需要在同一个二层网络中，并将\*\* Node 作为一个路由器\*\*，跨节点通讯将通过**路由表方式**进行，这样方式下将网络模拟成一个`underlay network`。

![](./image/image_Ceidkwr9qE.png)

layer2 ethernet topology

> Notes：因为是通过路由方式，集群的 cidr 至少要配置 16，因为这样可以保证，跨节点的 Node 作为一层网络，同节点的 Pod 作为一个网络。如果不是这种用情况，路由表处于相同的网络中，会存在网络不可达

#### Calico BGP

BGP（`Border Gateway Protocol`）是去中心化**自治路由协议**。它是通过维护\*\* IP 路由表**或`前缀`表来实现 AS （`Autonomous System`）之间的可访问性，属于**向量路由协议 \*\*。

![](./image/image_NFKuoi3xgL.png)

与 `flannel` 不同的是，`Calico` 提供了的 `BGP` 网络解决方案，在网络模型上，`Calico` 与 `Flannel host-gw` 是近似的，但在软件架构的实现上，`flannel` 使用 `flanneld` 进程来维护路由信息；而 `Calico` 是包含多个守护进程的，其中 `Brid` 进程是一个 `BGP` 客户端与路由反射器(`Router Reflector`)，`BGP` 客户端负责从 `Felix` 中获取路由并分发到其他 `BGP Peer`，而反射器在 BGP 中起了优化的作用。

在同一个 IBGP 中，BGP 客户端仅需要和一个 `RR` 相连，这样减少了`AS`内部维护的大量的 BGP 连接。通常情况下，`RR` 是真实的路由设备，而 `Bird` 作为 `BGP` 客户端工作。

![](./image/image_JHVThivWDf.png)

### IPVLAN & MACVLAN

`IPVLAN` 和 `MACVLAN` 是一种**网卡虚拟化技术**，两者之间的区别为， `IPVLAN` 允许一个**物理网卡拥有多个 IP 地址，**并且所有的虚拟接口用**同一个 MAC** 地址；而 `MACVLAN` 则**是相反的**，其允许**同一个网卡拥有多个 MAC 地址**，而虚拟出的网卡可以没有 IP 地址。

&#x20;    因为是网卡虚拟化技术，而不是网络虚拟化技术，本质上来说属于 `Overlay network`，这种方式在虚拟化环境中与 `Overlay network` 相比最大的特点就是可以将 Pod 的网络拉平到 Node 网络同级，从而提供更高的性能、低延迟的网络接口。本质上来说其网络模型属于下图中第二个。

![](./image/image_icaz1PLcOT.png)

- 虚拟网桥：创建一个虚拟网卡对(veth pair)，一头在容器内，一头在宿主机的 root namespaces 内。这样一来容器内发出的数据包可以通过网桥直接进入宿主机网络栈，而发往容器的数据包也可以经过网桥进入容器。
- 多路复用：使用一个中间网络设备，暴露多个虚拟网卡接口，容器网卡都可以介入这个中间设备，并通过 MAC/IP 地址来区分 packet 应该发往哪个容器设备。
- 硬件交换，为每个 Pod 分配一个虚拟网卡，这样一来，Pod 与 Pod 之间的连接关系就会变得非常清晰，因为近乎物理机之间的通信基础。如今大多数网卡都支持 SR-IOV 功能，该功能将单一的物理网卡虚拟成多个 VF 接口，每个 VF 接口都有单独的虚拟 PCIe 通道，这些虚拟的 PCIe 通道共用物理网卡的 PCIe 通道。

在 kubernetes 中 `IPVLAN` 这种网络模型下典型的 CNI 有，multus 与 danm。

#### multus

`multus` 是 intel 开源的 CNI 方案，是由传统的 `cni` 与 `multus`，并且提供了 SR-IOV CNI 插件使 K8s pod 能够连接到 SR-IOV VF 。这是使用了 `IPVLAN/MACVLAN` 的功能。

当创建新的 Pod 后，SR-IOV 插件开始工作。配置 VF 将被移动到新的 CNI 名称空间。该插件根据 CNI 配置文件中的 “name” 选项设置接口名称。最后将 VF 状态设置为 UP。

下图是一个 Multus 和 SR-IOV CNI 插件的网络环境，具有三个接口的 pod。

- `eth0` 是 `flannel` 网络插件，也是作为 Pod 的默认网络
- VF 是主机的物理端口 `ens2f0` 的实例化。这是英特尔 X710-DA4 上的一个端口。在 Pod 端的 VF 接口名称为 `south0` 。
- 这个 VF 使用了 DPDK 驱动程序，此 VF 是从主机的物理端口 `ens2f1` 实例化出的。这个是英特尔 ® X710-DA4 上另外一个端口。Pod 内的 VF 接口名称为 `north0`。该接口绑定到 DPDK 驱动程序 `vfio-pci` 。

![](./image/image_zxzr5GSsph.png)

Mutus networking Architecture overlay and SR-IOV

> **Notes：术语**
> \* NIC：network interface card，网卡
> \*   SR-IOV：single root I/O virtualization，硬件实现的功能，允许各虚拟机间共享 PCIe 设备。
> \*   VF：Virtual Function，基于 PF，与 PF 或者其他 VF 共享一个物理资源。
> \*   PF：PCIe Physical Function，拥有完全控制 PCIe 资源的能力
> \*   DPDK：Data Plane Development Kit

于此同时，也可以将主机接口直接移动到 Pod 的网络名称空间，当然这个接口是必须存在，并且不能是与默认网络使用同一个接口。这种情况下，在普通网卡的环境中，就直接将 Pod 网络与 Node 网络处于同一个平面内了。

![](./image/image_o9mGd1YyKh.png)

Mutus networking Architecture overlay and ipvlan

#### danm

DANM 是诺基亚开源的 CNI 项目，目的是将电信级网络引入 kubernetes 中，与 multus 相同的是，也提供了 SR-IOV/DPDK 的硬件技术，并且支持 IPVLAN.

## Overlay Network Model

### 什么是 Overlay

叠加网络是使用网络虚拟化技术，在 `underlay` 网络上构建出的虚拟逻辑网络，而无需对物理网络架构进行更改。本质上来说，`overlay network` 使用的是一种或多种隧道协议 (`tunneling`)，通过将数据包封装，实现一个网络到另一个网络中的传输，具体来说隧道协议关注的是数据包（帧）。

![](./image/image_Lyytth6834.png)

### 常见的网络隧道技术

- 通用路由封装 ( `Generic Routing Encapsulation` ) 用于将来自 IPv4/IPv6 的数据包封装为另一个协议的数据包中，通常工作与 L3 网络层中。
- VxLAN (`Virtual Extensible LAN`)，是一个简单的隧道协议，本质上是将 L2 的以太网帧封装为 L4 中 UDP 数据包的方法，使用 **4789** 作为默认端口。`VxLAN` 也是 `VLAN` 的扩展，对于 4096（ 位 `VLAN ID`） 扩展为 1600 万（ 位 `VN·ID` ）个逻辑网络。

这种工作在 `overlay` 模型下典型的有 `flannel` 与 `calico` 中的的 `VxLAN`, `IPIP` 模式。

### IPIP

`IP in IP` 也是一种隧道协议，与 `VxLAN` 类似的是，`IPIP` 的实现也是通过 Linux 内核功能进行的封装。`IPIP` 需要内核模块 `ipip.ko` 使用命令查看内核是否加载 IPIP 模块`lsmod | grep ipip` ；使用命令`modprobe ipip` 加载。

![](./image/image_HqtTcrFL52.png)

Kubernetes 中 `IPIP` 与 `VxLAN` 类似，也是通过网络隧道技术实现的。与 `VxLAN` 差别就是，`VxLAN` 本质上是一个 UDP 包，而 `IPIP` 则是将包封装在本身的报文包上。

![](./image/image_Q62gmHPNBL.png)

IPIP in kubernetes

![](./image/image_YwyZm5SB6M.png)

IPIP packet with wireshark unpack

> Notes：公有云可能不允许 IPIP 流量，例如 Azure

### VxLAN

kubernetes 中不管是 `flannel` 还是 `calico` VxLAN 的实现都是使用 Linux 内核功能进行的封装，Linux 对 vxlan 协议的支持时间并不久，2012 年 Stephen Hemminger 才把相关的工作合并到 kernel 中，并最终出现在 kernel 3.7.0 版本。为了稳定性和很多的功能，你可以会看到某些软件推荐在 3.9.0 或者 3.10.0 以后版本的 kernel 上使用 `VxLAN`。

![](https://mmbiz.qpic.cn/mmbiz_png/gIkzzLe4eUWRiaZicoFvTiceO3fQSoEFCLvqR9ePibN7twxNFEDt9miakTSRsKIfOq9XeSReBEGUM8Tajf9RxQpOo9g/640?wx_fmt=png\&wxfrom=5\&wx_lazy=1\&wx_co=1)

A simple VxLAN network topology

在 kubernetes 中 vxlan 网络，例如 `flannel`，守护进程会根据 kubernetes 的 Node 而维护 `VxLAN`，名称为 `flannel.1` 这是 `VNID`，并维护这个网络的路由，当发生跨节点的流量时，本地会维护对端 `VxLAN` 设备的 MAC 地址，通过这个地址可以知道发送的目的端，这样就可以封包发送到对端，收到包的对端 VxLAN 设备 `flannel.1` 解包后得到真实的目的地址。

查看 `Forwarding database` 列表

\$ bridge fdb26:5e:87:90:91:fc dev flannel.1 dst 10.0.0.3 self permanent

![](https://mmbiz.qpic.cn/mmbiz_png/gIkzzLe4eUWRiaZicoFvTiceO3fQSoEFCLvOelgdKX7Xx7USBwZ1I0R9KluIefph7GX0gJtZ05l9BN9YxiadPKfCFg/640?wx_fmt=png\&wxfrom=5\&wx_lazy=1\&wx_co=1)

VxLAN in kubernetes

![](https://mmbiz.qpic.cn/mmbiz_png/gIkzzLe4eUWRiaZicoFvTiceO3fQSoEFCLvcl3PRDOyLNwyx468ogxchpMWJ5N0KRmt1E8B0Aiaic1yVLYKunpZL1ibg/640?wx_fmt=png\&wxfrom=5\&wx_lazy=1\&wx_co=1)

VxLAN packet with wireshark unpack

> Notes：VxLAN 使用的 4789 端口，wireshark 应该是根据端口进行分析协议的，而 flannel 在 linux 中默认端口是 8472，此时抓包仅能看到是一个 UDP 包。

通过上述的架构可以看出，隧道实际上是一个抽象的概念，并不是建立的真实的两端的隧道，而是通过将数据包封装成另一个数据包，通过物理设备传输后，经由相同的设备（网络隧道）进行解包实现网络的叠加。

### weave vxlan

weave 也是使用了 `VxLAN` 技术完成的包的封装，这个技术在 `weave` 中称之为 `fastdp (fast data path)`，与 `calico` 和 `flannel` 中用到的技术不同的，这里使用的是 Linux 内核中的 `openvswitch datapath module`，并且 weave 对网络流量进行了加密。

![](https://mmbiz.qpic.cn/mmbiz_png/gIkzzLe4eUWRiaZicoFvTiceO3fQSoEFCLvb2cgy9cMHYyc5tgicyicHKVyIK9uR9DKVYWLO8SsVuKzibJmxoIIN3prw/640?wx_fmt=png\&wxfrom=5\&wx_lazy=1\&wx_co=1)

weave fastdp network topology

> Notes：fastdp 工作在 Linux 内核版本 3.12 及更高版本，如果低于此版本的例如 CentOS7，weave 将工作在用户空间，weave 中称之为 `sleeve mode`
