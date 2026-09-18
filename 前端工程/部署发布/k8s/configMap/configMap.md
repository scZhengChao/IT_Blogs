# configMap

## 目录

- [1.创建ConfigMap](#1创建ConfigMap)

[ \[ConfigMap\]ConfigMap 作为挂载文件实践 ConfigMap 是一种 API 对象，用来将非机密性的数据保存到健值对中。主要有三个作用： 1. 用作环境变量 2.命令行参数 3.存储卷中配置文件 想必查看过configMap相关资料的小伙伴对configMap这三个作用都会有印象，本… https://zhuanlan.zhihu.com/p/299769730?utm\_id=0](https://zhuanlan.zhihu.com/p/299769730?utm_id=0 " \[ConfigMap]ConfigMap 作为挂载文件实践 ConfigMap 是一种 API 对象，用来将非机密性的数据保存到健值对中。主要有三个作用： 1. 用作环境变量 2.命令行参数 3.存储卷中配置文件 想必查看过configMap相关资料的小伙伴对configMap这三个作用都会有印象，本… https://zhuanlan.zhihu.com/p/299769730?utm_id=0")

ConfigMap 是一种 API 对象，用来将**非机密性的数据保存到健值对**中。主要有三个作用：

1. 用**作环境变量** &#x20;
2. \*\*命令行参数 \*\*&#x20;
3. **存储卷中配置文件**

## 1.创建ConfigMap

首先，通过`kubectl `   `api-resources`可知`ConfigMap`资源是`namespace`隔离的：

```纯文本 
kubectl api-resources 
NAME                              SHORTNAMES   APIGROUP                       NAMESPACED   KIND
...
configmaps                        cm                                          true         ConfigMap
...
```


我们创建`ConfigMap`的时候需要**加上我们指定**哪个`namespace `。

其次，ConfigMap的内容主要分为四种，分别是

- 从key-value字符串创建，
- 从env文件创建，
- 从文件/目录创建，
- 从文件创建。

语法为：

```纯文本 
kubectl create cm cm-name1 --from-literal=key1=value1 --from-literal=key2=value2
kubectl create cm cm-name2 --from-env-file=config.env
kubectl create cm cm-name3 --from-file=testdir/ --from-file=testfile
kubectl apply -f cm-name4.yaml
```


[上篇](上篇.md "上篇")

[下篇](下篇.md "下篇")
