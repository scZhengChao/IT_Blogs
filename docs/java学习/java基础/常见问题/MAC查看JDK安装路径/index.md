# MAC查看JDK安装路径

## 目录

- [一](#一)
- [二](#二)
  - [查看当前默认使用的 JDK 版本](#查看当前默认使用的-JDK-版本)

# 一

**查看所有安装的 JDK 版本及路径**

```bash 
/usr/libexec/java_home -V

```


![](./assets/image/image_OZNNbt6deF.png)

# 二

```bash 
# 访问 JDK 安装目录
cd /Library/Java/JavaVirtualMachines

# 查看安装的 JDK 版本
ls -al

```


### **查看当前默认使用的 JDK 版本**

```java 
java -version
```
