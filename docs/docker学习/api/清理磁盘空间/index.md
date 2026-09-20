# 清理磁盘空间

## 目录

- [1. 清理未使用的镜像、容器、网络和卷](#1-清理未使用的镜像容器网络和卷)
- [2. 清理所有未使用的镜像](#2-清理所有未使用的镜像)
- [3. 清理未使用的卷](#3-清理未使用的卷)
- [4. 清理未使用的网络](#4-清理未使用的网络)
- [5. 清理构建缓存](#5-清理构建缓存)
- [6. 强制删除所有镜像、容器、卷和网络](#6-强制删除所有镜像容器卷和网络)
- [7. 手动删除特定镜像](#7-手动删除特定镜像)
- [8. 检查磁盘使用情况](#8-检查磁盘使用情况)
- [总结](#总结)

在 Docker 中清除之前下载的镜像缓存，可以通过以下方法清理未使用的镜像、容器、网络和构建缓存，释放磁盘空间：

***

### **1. 清理未使用的镜像、容器、网络和卷**

使用以下命令清理所有未使用的 Docker 对象：

```bash 
docker system prune
```


- 这会删除所有停止的容器、未使用的网络、悬空的镜像和构建缓存。
- 如果需要确认删除，可以添加`-f`参数：
  ```bash 
  docker system prune -f
  ```


***

### **2. 清理所有未使用的镜像**

如果只想清理未使用的镜像，可以使用：

```bash 
docker image prune
```


- 默认只会删除悬空的镜像（即没有标签且未被任何容器引用的镜像）。
- 如果需要删除所有未使用的镜像（包括未被容器引用的镜像），可以添加`-a`参数：
  ```bash 
  docker image prune -a
  ```


***

### **3. 清理未使用的卷**

Docker 卷不会自动删除，可以使用以下命令清理未使用的卷：

```bash 
docker volume prune
```


***

### **4. 清理未使用的网络**

清理未使用的 Docker 网络：

```bash 
docker network prune
```


***

### **5. 清理构建缓存**

Docker 构建过程中会生成缓存，可以使用以下命令清理：

```bash 
docker builder prune
```


- 如果需要清理所有构建缓存，可以添加`--all`参数：
  ```bash 
  docker builder prune --all
  ```


***

### **6. 强制删除所有镜像、容器、卷和网络**

如果需要彻底清理所有 Docker 对象（包括正在运行的容器和所有镜像），可以使用以下命令：

```bash 
docker system prune -a --volumes
```


- `-a`：删除所有未使用的镜像。
- `--volumes`：删除所有未使用的卷。

***

### **7. 手动删除特定镜像**

如果只想删除特定的镜像，可以使用：

```bash 
docker rmi <镜像ID或镜像名>
```


- 例如：
  ```bash 
  docker rmi my-image:latest
  ```


***

### **8. 检查磁盘使用情况**

在清理之前，可以检查 Docker 的磁盘使用情况：

```bash 
docker systemdf
```


输出示例：

markdown

```markdown 
TYPE            TOTAL     ACTIVE    SIZE      RECLAIMABLEImages          10        2         1.2GB     800MB (66%)
Containers      3         1         200MB     100MB (50%)
Local Volumes   2         1         500MB     300MB (60%)
Build Cache     0         0         0B        0B
```


***

### **总结**

| **命令**​                              | **作用**​              |
| ------------------------------------ | -------------------- |
| \`docker system prune\`              | 清理未使用的镜像、容器、网络和构建缓存  |
| \`docker image prune\`               | 清理未使用的镜像             |
| \`docker volume prune\`              | 清理未使用的卷              |
| \`docker network prune\`             | 清理未使用的网络             |
| \`docker builder prune\`             | 清理构建缓存               |
| \`docker system prune -a --volumes\` | 强制清理所有未使用的 Docker 对象 |
| \`docker rmi <镜像ID或镜像名>\`            | 删除特定镜像               |
| \`docker system df\`                 | 检查 Docker 磁盘使用情况     |

通过这些命令，可以有效地清理 Docker 缓存，释放磁盘空间！
