# AOF

## 目录

- [3、AOF的存储方式\[了解\]](#3AOF的存储方式了解)
  - [AOF持久化简介](#AOF持久化简介)
  - [AOF持久化机制配置](#AOF持久化机制配置)
    - [开启AOF持久化](#开启AOF持久化)
    - [AOF持久化时机](#AOF持久化时机)
    - [演示：AOF的持久化](#演示AOF的持久化)

### 3、AOF的存储方式\[了解]

#### AOF持久化简介

由于快照方式是在一定间隔时间做一次的，所以如果redis宕机，就会丢失最后一次快照后的所有修改。**如果应用要求不能丢失任何修改的话，可以采用AOF持久化方式。**

AOF指的是Append only file,使用AOF持久化方式**时，redis会将每一个收到的写命令都通过write函数追加到文件中(默认是appendonly.aof).当redis重启时会通过重新执行文件中保存的写命令来在内存中重建整个数据库的内容**

![](./image/image_GwXAfzUKjZ.png)

![](./image/image__0TsuUPWsv.png)

AOF包含一个**格式清晰、易于理解的日志文件用于记录所有的修改操作。也可以通过该文件完成数据的重建。该机制可以带来更高的数据安全性，所有的操作都是异步完成的。**

| **Redis中提供了3种同步策略**​ | **说明**​         |
| -------------------- | --------------- |
| **每秒同步**​            | 每过一秒记录一次        |
| **每修改同步**​           | 每次修改(增删改)都会记录一次 |
| **不同步**​             | 由系统记录操作         |

#### AOF持久化机制配置

##### 开启AOF持久化

AOF默认是关闭的，首先需要开启AOF模式

| **参数配置**​              | **说明**​                |
| ---------------------- | ---------------------- |
| **appendonly no/yes**​ | 默认是no，关闭。如果要打开，设置成yes。 |

##### AOF持久化时机

| **关键字**​         | **持久化时机**​    | **解释**​               |
| ---------------- | ------------- | --------------------- |
| **appendfsync**​ | **everysec**​ | 每秒记录                  |
| **appendfsync**​ | **always**​   | 每修改记录                 |
| **appendfsync**​ | **no**​       | 完全依赖操作系统，性能最好，持久化无法保证 |

**everysec**：每秒钟写入磁盘一次，在性能和持久化方面做了很好的折中。

**always**：收到写命令就立即写入磁盘，最慢，但是保证完全的持久化。

**no**：完全依赖操作系统，性能最好，持久化无法保证。

##### 演示：AOF的持久化

1. 打开AOF的配置文件redis.conf，设置appendonly yes

![](./image/image_BbC4Wj4N4e.png)

![](./image/image_rLER1kEXxO.png)

![](./image/image_tB693vhrwO.png)

1. 通过./redis-server redis.conf启动服务器，在服务器目录下出现appendonly.aof文件。大小是0个字节。

![](./image/image_D_5HiXGbnO.png)

![](./image/image_rmC1HS1Dm3.png)

1. 添加3个键和值

![](./image/image_sUBQwg8PR_.png)

1. 打开appendonly.aof文件，查看文件的变化。会发现文件记录了所有操作的过程。

![](./image/image_71SgtWWMvv.png)

![](./image/image_97lPQyPZim.png)

说明：

```markdown 
1.*2表示有两个命令  select 0 选择第一个数据库
2.$6表示select 有六个字符 1 表示0有一个字符

```


**小结**

1. AOF是的格式：文本文件
2. 文件名: appendonly.aof
3. 三种配置策略
   1. 每秒记录
   2. 每修改记录
   3. 不记录
