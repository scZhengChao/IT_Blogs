# Pod

## 目录

- [POD 状态](#POD-状态)
  - [Pod 常见的状态](#Pod-常见的状态)
  - [Pod 重启策略](#Pod-重启策略)
  - [Pod 常见状态转换场景](#Pod-常见状态转换场景)

&#x20;         Pod 是 K8S 中**最小的部署单元**，它包含**了一组容器（可以是一个或多个）**。同一个 Pod 中的不同容器之间可以通过`localhost:<port>`的方式互相访问对方暴露出来的服务，同时，容器之间**可以访问共同的数据卷**。多容器的使用场景通常是一个**主容器加上多个 sidecar**，他们彼此配合，共同实现功能需求。

以下是多容器配合的一个实例：

![](https://mmbiz.qpic.cn/mmbiz_jpg/oAe2PlNm3ib9hJgic949h1icbafhlADEw7tpzL4BAib7vYpX4g8eTuwgtYTzWQWgaGGHicic2XwPjbAGUrDYdrAYPQFQ/640?wx_fmt=jpeg\&wxfrom=5\&wx_lazy=1\&wx_co=1)

上图中的 Web Server 容器可以对外提供资源访问的服务，同时，File Puller 作为一个 sidecar 容器，可以同时将远端的内容更新到本地存储中，以保证 Web Server 提供的内容是最新的。

### POD 状态

#### Pod 常见的状态

- Pending：挂起，我们在请求创建 pod 时，条件不满足，调度没有完成，没有任何一个节点能满足调度条件。已经创建了但是没有适合它运行的节点叫做挂起，这其中也包含集群为容器创建网络，或者下载镜像的过程。
- Running：Pod 内所有的容器都已经被创建，**且至少一个容器正在处于运行状态、正在启动状态或者重启状态**。
- Succeeded：Pod 中所以容**器都执行成功后退出，并且没有处于重启的容器。**
- Failed：Pod 中所以容器都已退出，但是至少还有一个容器退出时为失败状态。
- Unknown：未知状态，所谓 pod 是什么状态是 api server 和运行在 pod 节点的 kubelet 进行通信获取状态信息的，如果节点之上的 kubelet 本身出故障，那么 apiserver 就连不上 kubelet，得不到信息了，就会看 Unknown

![](https://mmbiz.qpic.cn/sz_mmbiz_png/7OPxOA8ic5mib00g5RrVOjIch2ebRCtqjfHPibicrqUibSlabiaAL2H2Qw2Wzsl1xqdrrlx3qrqCjXHyS5Aeq0fkFickQ/640?wx_fmt=png\&wxfrom=5\&wx_lazy=1\&wx_co=1)

#### Pod 重启策略

- Always: 只要容器失效退出就重新启动容器。
- OnFailure: 当容器以非正常(异常)退出后才自动重新启动容器。
- Never: 无论容器状态如何，都不重新启动容器。

#### Pod 常见状态转换场景

![](https://mmbiz.qpic.cn/sz_mmbiz_png/7OPxOA8ic5mib00g5RrVOjIch2ebRCtqjfBfanQfRqHiaUHSzXcCGbrajo45uz700z0yBVR9Ys67BhzKh41yuIdsQ/640?wx_fmt=png\&wxfrom=5\&wx_lazy=1\&wx_co=1)
