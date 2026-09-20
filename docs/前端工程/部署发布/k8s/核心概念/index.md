# 核心概念

## 目录

- [K8S 核心知识点](#K8S-核心知识点)

## K8S 核心知识点

在 K8S 中，**所有资源都是通过声明式配置进行管理的**，它们被称作 K8S 对象。以 namespace 为例

```typescript 
apiVersion: v1
kind: Namespace
metadata:
   name: demo-space
spec:
   finalizers:
   - kubernetes
status:
   phase: Active
```


**不同类型的对象所需的配置不完全相同，但他们都应有如下几个基础配置：**

- `apiVersion` - 创建该对象所**使用的 Kubernetes API 的版本**，不同的版本，对于 yaml 中可使用配置项的字段、格式有不同的要求。
- `kind` - 想要**创建的对象的类别**
- `metadata` - 帮助**唯一性标识对象的一些数据**
- `spec` - 你所期望的该对象的状态

常见的 K8S 对象包括 Namespace、Ingress、Sevice、Development、Pod。其中，

Namespace 是一个虚拟的概念，用来对集群划分不同的命名空间。通常，**同一个 Namespace 中的资源，其命名应该是唯一的**。其他几种类型的资源的关系如下图所示：

![](https://mmbiz.qpic.cn/mmbiz_jpg/oAe2PlNm3ib9hJgic949h1icbafhlADEw7t6XUXZ0BHsyTO6KIonicKcaJNRF3IMJcTXNvj5VEB0pAS9KgyzibcLNQQ/640?wx_fmt=jpeg\&wxfrom=5\&wx_lazy=1\&wx_co=1)

[Ingress](./Ingress/index.md "Ingress")

[Sevice](./Sevice/index.md "Sevice")

[Development](./Development/index.md "Development")

[Pod](./Pod/index.md "Pod")

[ReplicaSet](./ReplicaSet/index.md "ReplicaSet")

[Label（标签）](./Label（标签）/index.md "Label（标签）")
