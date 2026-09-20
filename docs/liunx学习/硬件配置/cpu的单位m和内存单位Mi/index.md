# cpu的单位m和内存单位Mi

> 查看k8s pod的cpu，memory使用率情况

`kubectl top pod --all-namespaces`

[kubectl top no内存使用率的计算](https://www.cnblogs.com/wangz-/articles/13034682.html "kubectl top no内存使用率的计算")

- CPU总核数 = 物理CPU个数 X 每颗物理CPU的核数
- 总逻辑CPU数 = 物理CPU个数 X 每颗物理CPU的核数 X 超线程数

428     4核8G   8核16G

Deployment配置清单和kubectl top指令查看pod资源使用率中，都有cpu和内存的两个数量单位（m和Mi），这里把这两个单位解释做个记录：

- cpu单位m：代表 “千分之一核心”，譬如50m的含义是指50/1000核心，即5%
- 内存单位Mi：1Mi = 1024乘1024，而平时使用的单为M是1M = 1000乘1000

存储单位的换算

- 1GB=1024MB  &#x20;
- 1MB=1024KB  &#x20;
- 1kb=1024字节

内存使用率 =  pod used total memory/Allocatable Memory=(5176\*1024)/5399696=0.9816=98%

- pod used total memory就是在这台机器上的所有docker容器占用内存总和；
- Allocatable Memory就是kubectl describe no 查看出该节点可分配的内存=物理内存-k8s预留内存
