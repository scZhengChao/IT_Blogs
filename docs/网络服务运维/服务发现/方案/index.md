# 方案

## 目录

- [DNS](#DNS)
- [mDNS](#mDNS)
- [Zookeeper](#Zookeeper)
- [Etcd](#Etcd)
- [Consul](#Consul)

#### DNS

DNS（Domain Name System）是一种**通过解析域名获取IP和端口的机制。** 将SRV记录注册到DNS服务器上，通过DNS解析流程进行解析。但是DNS存在两个问题：**一是当服务实例启动之后将SRV记录注册到DNS服务器上比较难，需要手动维护；二是DNS严重依赖缓存，服务使用方无法及时知道一个服务实例是否已经停止。**

#### mDNS

mDNS（multicast DNS即组播DNS）是一种零配置的服务发现机制，在内部网络中经常使用，每个服务都有一个内置的mDNS响应程序，从而不需要单独的服务注册中心。mDNS最大的问题就是要求网络基础设施支持IP多播（IP multicast），对于云环境来说显然是无法满足的，而且mDNS也无法解决DNS缓存问题。

DNS与mDNS都具备良好的容错能力，但缺乏服务健康检查和变化通知机制。

#### Zookeeper

Zookeeper提供**分布式协调服务，在分布式系统中常被用于配置管理、名字服务、分布式锁及组管理**，通常运行在一组节点上实现容错（当运行在n个节点上时能容忍n/2个节点同时故障）。

如何通过Zookeeper来实现服务发现？Zookeeper使用临时节点（ephemeral node）来实现服务注册和基本的健康检查功能。**每当服务实例启动就会在Zookeeper中注册一个临时节点，而当服务实例故障或下线该临时节点会被Zookeeper自动删除，如果有其他服务依赖这个服务可以设置监听该服务实例对应的临时节点，当临时节点被删除时，依赖该服务的其他服务会获得通知。** 依赖Zookeeper自身的高可用及临时节点提供的健康检查和监听机制来实现具备容错能力的服务发现机制。

实际开发过程中建议使用Apache Curator来替代Zookeeper原生客户端库，Apache Curator通过封装Zookeeper原生API，提供更高抽象层次API让Zookeeper使用起来更加容易和可靠，而且提供专用于实现服务发现的API。

![](./image/image_P2CzHAUE89.png)

#### Etcd

Etcd是一个**基于Raft共识算法具备线性强一致性（linearizable）的Key-Value存储系统，**可以为每个Key设置TTL（time to live），当TTL过后相应Key会自动过期失效。基于Etcd构建服务发现解决方案将Etcd作为服务注册中心，服务实例注册就是在Etcd中构建一个Key-Value记录，由服务实例自身或代理负责设置并定期更新其关联Key的TTL，如果服务实例故障其对应Key就会在TTL之后过期失效，相当于将该故障服务实例注销，通过定时心跳以达到监控健康状态的效果。**而且Etcd提供监听机制，允许为Key设置监听器当该Key发生变化时，监听器能及时获取通知**。Etcd**自身的高可用特性，基于TTL提供基本的服务健康检查，基于监听机制及时感知服务实例变化，使Etcd成为微服务架构中常用服务发现解决方案。**

![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/9/8/16d0ec4e62039922~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.png)

#### Consul

Consul是一个成熟的服务发现解决方案。其核心是一个基于Raft共识算法具备线性强一致性的Key-Value存储系统作为服务注册中心，**并提供代理（Agent）机制一方面用于协调服务注册，一方面提供服务健康检查。**代理（Agent）会在**每个运行服务的节点上启动，获取节点地址并将该服务实例注册到服务注册中心**。架构上Consul包括两类组件：Server、Agent，**服务注册信息保存在Server上**，通过Raft共识算法保证多个Server间数据线性强一致，保证服务注册中心高可用；**将所有Agent作为集群节点，使用Gossip协议进行组关系管理和故障探测**，当有Agent加入（启动）或离开（故障）集群时其他Agent会得到通知，实现服务健康检查和监视功能。

Gossip协议常用于集群组关系管理和故障检测，每个节点都通过一个或多个引导节点加入集群，引导节点有集群中所有节点列表，每个节点都从自己所知节点列表中随机选择一组节点周期性地发送多播消息，最终集群中所有节点都能知道其他节点。这个过程看起来很神奇，实际上Gossip协议能在几秒内将消息传遍有上百节点的集群。Akka、Riak、Cassandra都使用Gossip协议维护集群成员列表和故障探测。

![](./image/image_mEbKWadL7a.png)

此外Consul和Etcd都非常适合容器环境，因为Docker容器启动、停止都会发送事件（Event），基于事件通知机制非常便于将服务实例从Consul或Etcd上注册、注销。
