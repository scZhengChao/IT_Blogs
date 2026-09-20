# 字段解释

```yaml 
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
  labels:
    app: nginx
spec:
  replicas: 2
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: nginx:1.7.9
        ports:
        - containerPort: 80
---
apiVersion: v1
kind: Service
metadata:
  name: nginx-service
spec:
  ports:
  - port: 81   
    protocol: TCP
    targetPort: 80
  selector:
    app: nginx
  type: NodePort

```


**Service：**
① `port` Service 服务暴露的端口
② `targetPort` 容器暴露的端口
③ `type` Service的类型

**Deployment：**
① `apiVersion` 是当前配置格式的版本。
② `kind` 是要创建的资源类型，这里分别创建了Deployment和Service。
③ `metadata` 是该资源的元数据，name 是必需的元数据项。
④ `spec` 部分是 Deployment 的规格说明。
⑤ `replicas` 指明副本数量，默认为 1。
⑥`matchLabels` 指匹配的pod的标签是什么。
⑦ `template` 定义 Pod 的模板，这是配置文件的重要部分。
⑧ `metadata` 定义 Pod 的元数据，至少要定义一个 label。label 的 key 和 value 可以任意指定。
⑨ `spec` 描述 Pod 的规格，此部分定义 Pod 中每一个容器的属性，name 和 image 是必需的。
