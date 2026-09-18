# Ingress

通常一个集群会包含**数台物理主机**，它们都是集群的节点，这些**节点需要一个统一的 IP 进行访问**。Ingress 提供了这项能力，**它是整个集群的流量入口。**

Ingress 控制器有多种实现，比较常见的**是基于 Nginx 实现的**。

Ingress-nginx 文档：[https://kubernetes.github.io/ingress-nginx/user-guide/nginx-configuration/annotations/](https://kubernetes.github.io/ingress-nginx/user-guide/nginx-configuration/annotations/ "https://kubernetes.github.io/ingress-nginx/user-guide/nginx-configuration/annotations/")
