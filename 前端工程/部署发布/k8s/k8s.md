# k8s

## 目录

- [K8S 是什么](#K8S-是什么)
- [文档](#文档)
  - [宿主机模式](#宿主机模式)
  - [容器](#容器)
  - [开源的容器管理平台](#开源的容器管理平台)
  - [I. K8S概览](#I-K8S概览)
  - [1.1 K8S是什么？](#11-K8S是什么)
  - [1.2 为什么是K8S?](#12-为什么是K8S)
  - [1.3 K8S怎么做？](#13-K8S怎么做)

## **K8S 是什么**

k8s是一个docker容器管理工具。它是一个全新的基于容器技术的分布式架构领先方案，是开源的容器集群管理系统。k8s在docker的基础上，为容器化的应用提供部署运行，资源调度，服务发现和动态伸缩等一系列完整功能

在回答这个问题之前，让我们一起先了解下 web 应用部署方式的演化过程。

# 文档

官网：[https://kubernetes.io/zh-cn/](https://kubernetes.io/zh-cn/ "https://kubernetes.io/zh-cn/")

中文文档：[http://docs.kubernetes.org.cn/227.html](http://docs.kubernetes.org.cn/227.html "http://docs.kubernetes.org.cn/227.html")

### **宿主机模式**

在我刚接触软件开发的时候，人们部署应用的方式通常是这样的：

首先需要一台服务器，然后在服务器上安装 Web Server （例如：Nginx 或者 Apache Server）。接着，根据应用的运行时要求，安装对应的软件包（例如：如果代码是用 Node.js 编写，就需要安装 Node.js 运行时环境）。最后，根据应用的其他功能，安装对应的软件，如数据库之类的。

应用部署的同时，宿主机上也多了各种软件程序。此时，这个 web 应用提供的服务如下图所示：

![](https://pic1.zhimg.com/80/v2-b73f97f2b5945f2ec4c3647302d79a00_1440w.webp)

随着 web 应用的日趋复杂，这种部署方式的弊端逐渐出现了。

现代服务器性能非常强悍，如果一台主机上仅运行几个程序，就可能造成机器资源利用率**偏低**。而且，由于程序是直接运行在宿主机上的，程序之间存在资源竞争关系，会互相影响。如果**某个程序造成宿主机卡顿或挂掉，那么其他程序也无法正常工作了**。

在 2013 年出现 Docker 容器技术之后，这种部署方式逐渐被淘汰了。

### **容器**

容器技术有多种实现方式，比较主流的是 Docker。

![](https://pic2.zhimg.com/80/v2-2321207310b0ff27d3d5c1df9fcb0669_1440w.webp)

其 logo 很好的体现了“容器”的特点——程序就像一个个集装箱，彼此隔离的运行在宿主机上。

区别于传统的宿主机部署模式，容器化技术提供了一个**隔离环境**。程序之间既不会互相影响，也不会影响宿主机的稳定。

Docker 方式运行的容器，可以理解为一个**虚拟机**（但和虚拟机还是有区别的，**虚拟机是对硬件的虚拟化；Docker 是操作系统层的虚拟化**）。它包含了运行程序所需的运行时环境和程序代码，启动后能够以**端口映射的方式，将容器自身的服务暴露给宿主机和外部用户**。

容器之间除了彼此隔离之外，也能够通过 Docker 引擎实现互联。容**器之间的访问通常是以内部 IP 的方式进**行的。

![](https://pic1.zhimg.com/80/v2-ac92e9ee96f67fabb1413cea69806b14_1440w.webp)

随着 web 应用规模的**继续**扩大，单主机不再能满足性能要求。现在的部署是基于**多主机、多容器**进行的。那么，如何对这些主机资源和应用容器进行管理？这个问题的答案指向了本文的主角—— K8S。

### **开源的容器管理平台**

K8S 的全称是`Kubernetes`，因为在首字母k和尾字母s中间有8个字母，因此被简写为 K8S（类似的还有`i18n`等）。它是由谷歌开源的，主流的容器管理平台。

![](https://pic1.zhimg.com/80/v2-eef86d91b21a396329dc3b023230e238_1440w.webp)

它的 logo 也很有意思，K8S 就像一个舵一样，让用户能够在茫茫大海中将满载集装箱的大船驶向成功的彼岸。

借助 K8S 提供的能力，运维人员——甚至是前端开发人员——能够很容易地在集群环境中部署和管理容器。并且，对于以下功能，K8S 也能够很好地支持：

- **负载均衡**
- **高可用**
- **高并发（多实例）**
- **集群管理**

K8S 环境需要先被安装和运行起来。由于这部分的操作需要服务器支持，这里就不做介绍了。下文的全部内容都基于读者**能够连接到任一 K8S 系统**这个前提之上。

***

### **I. K8S概览**

### **1.1 K8S是什么？**

K8S是[Kubernetes](https://link.zhihu.com/?target=https://kubernetes.io/zh/docs/concepts/overview/what-is-kubernetes/ "Kubernetes")的全称，官方称其是：

> Kubernetes is an open source system for managing [containerized applications](https://link.zhihu.com/?target=https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/ "containerized applications") across multiple hosts. It provides basic mechanisms for deployment, maintenance, and scaling of applications.用于自动部署、扩展和管理“容器化（containerized）应用程序”的开源系统。

翻译成大白话就是：“**K8S是负责自动化运维管理多个Docker程序的集群**”。那么问题来了：Docker运行可方便了，为什么要用K8S，它有什么优势？

插一句题外话：

- 为什么Kubernetes要叫Kubernetes呢？[维基百科](https://link.zhihu.com/?target=https://zh.wikipedia.org/wiki/Kubernetes#cite_note-3 "维基百科")已经交代了（老美对星际是真的痴迷）： &#x20;

  Kubernetes（在希腊语意为“舵手”或“驾驶员”）由Joe Beda、Brendan Burns和Craig McLuckie创立，并由其他谷歌工程师，包括Brian Grant和Tim Hockin等进行加盟创作，并由谷歌在2014年首次对外宣布 。该系统的开发和设计都深受谷歌的Borg系统的影响，其许多顶级贡献者之前也是Borg系统的开发者。在谷歌内部，Kubernetes的原始代号曾经是[Seven](https://link.zhihu.com/?target=https://zh.wikipedia.org/wiki/%E4%B9%9D%E4%B9%8B%E4%B8%83 "Seven")，即[星际迷航](https://link.zhihu.com/?target=https://zh.wikipedia.org/wiki/%E6%98%9F%E9%99%85%E8%BF%B7%E8%88%AA "星际迷航")中的Borg（[博格人](https://link.zhihu.com/?target=https://zh.wikipedia.org/wiki/%E5%8D%9A%E6%A0%BC_\(%E6%98%9F%E9%99%85%E6%97%85%E8%A1%8C\) "博格人")）。Kubernetes标识中舵轮有七个轮辐就是对该项目代号的致意。
- 为什么Kubernetes的缩写是K8S呢？我个人赞同[Why Kubernetes is Abbreviated k8s](https://link.zhihu.com/?target=https://medium.com/@rothgar/why-kubernetes-is-abbreviated-k8s-905289405a3c#id_token=eyJhbGciOiJSUzI1NiIsImtpZCI6ImQ5NDZiMTM3NzM3Yjk3MzczOGU1Mjg2YzIwOGI2NmU3YTM5ZWU3YzEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJuYmYiOjE2MDUxNjk3MjAsImF1ZCI6IjIxNjI5NjAzNTgzNC1rMWs2cWUwNjBzMnRwMmEyamFtNGxqZGNtczAwc3R0Zy5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsInN1YiI6IjExMDc5MTA1ODc0OTMzMDE5NDUwOCIsImVtYWlsIjoibWFvamlhbmd5dW45OTk5QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhenAiOiIyMTYyOTYwMzU4MzQtazFrNnFlMDYwczJ0cDJhMmphbTRsamRjbXMwMHN0dGcuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJuYW1lIjoiSmlhbmd5dW4gTWFvIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hLS9BT2gxNEdpclJJYnVrcEltb0dHemt4Q01xbzJsMWFtUjdlX1pSSTdEZVZjWD1zOTYtYyIsImdpdmVuX25hbWUiOiJKaWFuZ3l1biIsImZhbWlseV9uYW1lIjoiTWFvIiwiaWF0IjoxNjA1MTcwMDIwLCJleHAiOjE2MDUxNzM2MjAsImp0aSI6IjYwYjc1ZjczYjkwNzBlZDYwODY2MzFiN2RmZjY2ZGQ1YjE0YzNlZGYifQ.Z2jxeJpyVs_hKdXirBUaM1B_llDVFmWX3M4Yb--VM2wpd0WwTXQ_48g88ShWsAqGuoVP0nOlTXFktg2DZKn5wj7H7W_URgE5nxxiXOBZAqAxpoiPN-_Uup73PaATVvDHg-dKuWWRIZQ21E8nyhSnFAQA2tHQenTIh6UpQBMPUpcI7v6M-c_b1X8n4_EB0KEPOeFeJb3Yz8xFpm9hqb0D6B6L8ovZBFa6d576S56D6f_9RdJS67vDDf4wOjqr1aIxSEgOTV_m-nJJgdCZEr3OgGLuTXm86mh9jg1d8PdMbcxoRjG9LVeQz68-lUxnxN798zYavZjnLsmtV9QYeM0Nfw "Why Kubernetes is Abbreviated k8s")中说的观点“嘛，写全称也太累了吧，不如整个缩写”。其实只保留首位字符 *，用具体数字来替代省略的字符个数的做法，还是比较常见的。*

### **1.2 为什么是K8S?**

试想下传统的后端部署办法：把程序包（包括可执行二进制文件、配置文件等）放到服务器上，接着运行启动脚本把程序跑起来，同时启动守护脚本定期检查程序运行状态、必要的话重新拉起程序。

有问题吗？显然有！最大的一个问题在于：**如果服务的请求量上来，已部署的服务响应不过来怎么办？** 传统的做法往往是，如果请求量、内存、CPU超过阈值做了告警，运维马上再加几台服务器，部署好服务之后，接入负载均衡来分担已有服务的压力。

问题出现了：从监控告警到部署服务，中间需要人力介入！那么，**有没有办法自动完成服务的部署、更新、卸载和扩容、缩容呢？**

**这，就是K8S要做的事情：** ​**自动化运维管理Docker（容器化）程序**。

### **1.3 K8S怎么做？**

我们已经知道了K8S的核心功能：**自动化运维管理多个容器化程序**。那么K8S怎么做到的呢？这里，我们从宏观架构上来学习K8S的设计思想。首先看下图，图片来自文章[Components of Kubernetes Architecture](https://link.zhihu.com/?target=https://medium.com/@kumargaurav1247/components-of-kubernetes-architecture-6feea4d5c712 "Components of Kubernetes Architecture")：

K8S是属于**主从设备模型（Master-Slave架构）**，即有Master节点负责**核心的调度、管理和运维**，Slave节点则在执行用户的程序。但是在K8S中，主节点一般被称为**Master Node或者Head Node**（本文采用Master Node称呼方式），而从节点则被称为**Worker Node或者Node**（本文采用Worker Node称呼方式）。

要注意一点：Master Node和Worker Node是分别安装了K8S的Master和Woker组件的实体服务器，每个Node都对应了一台实体服务器（虽然Master Node可以和其中一个Worker Node安装在同一台服务器，但是建议Master Node单独部署），**所有Master Node和Worker Node组成了K8S集群**，同一个集群可能存在多个Master Node和Worker Node。

首先来看**Master Node**都有哪些组件：

- **API Server**。**K8S的请求入口服务**。API Server负责接收K8S所有请求（来自UI界面或者CLI命令行工具），然后，**API Server根据用户的具体请求，去通知其他组件干活。**
- **Scheduler**。**K8S所有Worker Node的调度器**。当用户要部署服务时，Scheduler会选择最合适的Worker Node（服务器）来部署。
- **Controller Manager**。**K8S所有Worker Node的监控器**。Controller Manager有很多具体的Controller，在文章[Components of Kubernetes Architecture](https://link.zhihu.com/?target=https://medium.com/@kumargaurav1247/components-of-kubernetes-architecture-6feea4d5c712 "Components of Kubernetes Architecture")中提到的有Node Controller、Service Controller、Volume Controller等。Controller负责监控和调整在Worker Node上部署的服务的状态，比如用户要求A服务部署2个副本，那么当其中一个服务挂了的时候，Controller会马上调整，让Scheduler再选择一个Worker Node重新部署服务。
- **etcd**。**K8S的存储服务**。etcd存储了K8S的关键配置和用户配置，`K8S`中仅`API Server`**才具备读写权限**，其他组件必须通过API Server的接口才能读写数据（见[Kubernetes Works Like an Operating System](https://link.zhihu.com/?target=https://thenewstack.io/how-does-kubernetes-work/ "Kubernetes Works Like an Operating System")）。

接着来看**Worker Node**的组件，笔者更赞同[HOW DO APPLICATIONS RUN ON KUBERNETES](https://link.zhihu.com/?target=https://thenewstack.io/how-do-applications-run-on-kubernetes/ "HOW DO APPLICATIONS RUN ON KUBERNETES")文章中提到的组件介绍：

- **Kubelet**。**Worker Node的****监视器****，以及与Master Node的通讯器**。Kubelet是Master Node安插在Worker Node上的“眼线”，它会定期向Worker Node汇报自己Node上运行的服务的状态，并接受来自Master Node的指示采取调整措施。
- **Kube-Proxy**。**K8S的网络代理**。私以为称呼为Network-Proxy可能更适合？Kube-Proxy负责Node在K8S的网络通讯、以及对外部网络流量的负载均衡。
- **Container Runtime**。**Worker Node的运行环境**。即安装了容器化所需的软件环境确保容器化程序能够跑起来，比如Docker Engine。大白话就是帮忙装好了Docker运行环境。
- **Logging Layer**。**K8S的监控状态收集器**。私以为称呼为Monitor可能更合适？Logging Layer负责采集Node上所有服务的CPU、内存、磁盘、网络等监控项信息。
- **Add-Ons**。**K8S管理运维Worker Node的插件组件**。有些文章认为Worker Node只有三大组件，不包含Add-On，但笔者认为K8S系统提供了Add-On机制，让用户可以扩展更多定制化功能，是很不错的亮点。

[configMap](configMap.md "configMap")

[Demo](IT/前端工程/部署发布/k8s/Demo/Demo.md "Demo")

[kubectl](kubectl.md "kubectl")

[核心概念](核心概念.md "核心概念")

[k8s整体结构](k8s整体结构.md "k8s整体结构")

[config](IT/前端工程/部署发布/k8s/config/config.md "config")

[原理](IT/前端工程/部署发布/k8s/原理/原理.md "原理")
