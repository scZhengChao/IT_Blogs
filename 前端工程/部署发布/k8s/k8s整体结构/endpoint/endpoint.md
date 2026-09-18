# endpoint

## 目录

- [endpoint](#endpoint)

# endpoint

`endpoint`是`k8s`集群中的⼀个资源对象，**存储在etcd中**，⽤来记录⼀个service对应的所有pod的访问地
址。service配置selector，endpoint controller才会⾃动创建对应的endpoint对象；否则，不会⽣成
endpoint对象.
