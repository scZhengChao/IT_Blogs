# 重置密码

## 目录

- [以跳过权限检查的方式启动 MySQL](#以跳过权限检查的方式启动-MySQL)

### **以跳过权限检查的方式启动 MySQL**

启动 MySQL 容器，并跳过权限检查（`--skip-grant-tables`）：

```docker 
docker run -it --rm  -p 3306:3306 --name mysql -v /Users/zhengchao/home/docker/mysql/data:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=root -e TZ=Asia/Shanghai -d mysql --character-set-server=utf8mb4 --collation-server=utf8mb4_unicode_ci --default-time_zone='+8:00' --skip-grant-tables
```


- `--rm`：容器退出后自动删除。
- `-v`：挂载 MySQL 数据卷，确保数据不丢失。
- `mysqld --skip-grant-tables`：以跳过权限检查的方式启动 MySQL。
