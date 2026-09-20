# 创建和查看数据卷

**需求**：创建一个数据卷，并查看数据卷在宿主机的目录位置

① 创建数据卷

```docker 
docker volume create html

```


② 查看所有数据

```docker 
docker volume ls
```


结果：

![](./assets/image/image__lYfM8j1bm.png)

说明:

> 第一个数据卷是docker自己生成的。我们不需要关心。

③ 查看数据卷详细信息卷

```bash 
docker volume inspect html

```


结果：

![](./assets/image/image_Q3nqGbKBWk.png)

可以看到，我们创建的html这个数据卷关联的宿主机目录为`/var/lib/docker/volumes/html/_data`目录。

**小结**：

数据卷的作用：

- 将**容器与数据分离，解耦合**，**方便操作容器内数据，保证数据安全**

数据卷操作：

- docker volume create：创建数据卷
- docker volume ls：查看所有数据卷
- docker volume inspect：查看数据卷详细信息，包括关联的宿主机目录位置
- docker volume rm：删除指定数据卷
- docker volume prune：删除所有未使用的数据卷
