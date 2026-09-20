# ReplicaSet

`ReplicaSet` 的目的是维护一组在任何时候都处于运行状态的 `Pod` 副本的稳定集合。 因此，它通常用来**保证给定数量的、完全相同的 Pod 的可用性。(确保****任何时间都有指定数量的 Pod 副本在运行****)**

先说下`Replication Controller`。`Replication Controller`的作用是确保`Pod`以**指定的副本个数**运行。

`ReplicaSet`是`Replication Controller`升级版。`ReplicaSet`和`Replication Controller`之间的**唯一区别**是对**选择器支持**。`Replication Controller`只支持**基于等式**的`selector`（env=dev或environment!=qa），但`ReplicaSet`还支持新的，基于**集合**的`selector`（version in (v1.0,v2.0)或env notin (dev, qa)）

![](./assets/image/image_5fz1sjjZb4.png)
