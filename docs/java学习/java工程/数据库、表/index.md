# 数据库、表

## 目录

- [创建mysql](#创建mysql)
  - [连接到 MySQL 容器](#连接到-MySQL-容器)

# 创建mysql

> 注意事项

1）表与表之间的关系尽量通过业务逻辑维护，而不是通过使用数据库外键约束，原因如下：

1.性能问题：外键约束会使约束的表之间做级联检查，导致数据库性能降低；

2.并发问题：外键约束的表在事务中需要获取级联表的锁，才能进行写操作，这更容易造成死锁问题；（数据库自身存在死锁检查，当放生死锁时，会自动终端另一方的事务）

3.扩展性问题：数据分库分表时，加大了拆分的难度；

2）**docker容器中的数据库注意时区问题**；

```docker 
docker run --restart=always -p 3306:3306 --name mysql -v /Users/zhengchao/home/docker/mysql/data:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=root -e TZ=Asia/Shanghai -d mysql:5.7.25 --character-set-server=utf8mb4 --collation-server=utf8mb4_unicode_ci --default-time_zone='+8:00' 
```


```docker 
docker run --restart=always -p 3306:3306 --name mysql -v /Users/zhengchao/home/docker/mysql/data:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=root -e TZ=Asia/Shanghai -d library/mysql:5.7 --character-set-server=utf8mb4 --collation-server=utf8mb4_unicode_ci --default-time_zone='+8:00' 
```


### **连接到 MySQL 容器**

您可以通过附加到容器并运行`mysql`命令来获得交互式 MySQL shell 。这提供了完整的 MySQL 命令行界面，因此您可以使用所有[熟悉的命令](https://linuxiac.com/add-mysql-user-grant-privileges/ "熟悉的命令")和标志。

```bash 
docker exec -it mysql mysql -u root -p
```


[初始化](IT/服务端/java学习/java工程/数据库、表/初始化/初始化.md "初始化")

[mapper接口方法和 xml](<./mapper接口方法和 xml/index.md> "mapper接口方法和 xml")
