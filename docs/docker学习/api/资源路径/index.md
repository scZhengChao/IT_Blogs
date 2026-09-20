# 资源路径

## 目录

- [cp](#cp)

# cp

**docker cp 这个命令就是用于在宿主机和容器之间复制文件和目录的**。

把容器里的目录复制到宿主机：

```bash 
docker cp  nginx1:/usr/share/nginx/html ~/nginx-html

```


比如我们把这个目录再复制到容器里：

```bash 
docker cp  ~/nginx-html nginx1:/usr/share/nginx/html-xxx

```


![](./assets/image/image_6s32YYDd8a.png)

**但当目标目录存在的时候，docker 会把他复制到目标目录下面：**
