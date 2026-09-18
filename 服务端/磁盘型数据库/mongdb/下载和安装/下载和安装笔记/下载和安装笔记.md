# 下载和安装笔记

```纯文本 
 进去是Atlas的页面，那只是一个注册页面，你要下载的镜像仓在它旁边的Community Server标签里面， 
 https://www.mongodb.com/download-center/enterprise  --- 官方地址 
 
 http://dl.mongodb.org/dl/win32/x86_64    偏门的下载地址 
 
 mongoDb 
   干嘛的：数据库,nosql(非关系型) 
   场景：解决大规模数据集合多重数据种类 
   下载：https://www.mongodb.com/download-center 
 
 
   启动库：启动数据库服务(服务端) 
     C:\Program Files\MongoDB\Server\3.4\bin 
       mongod.exe 启动服务端 
       port=27017  默认端口 
       mongodb://127.0.0.1:27017 协议+IP+端口 
   指定数据存储目录： 需要指定一次 
     mongod --dbpath c:\data\db 
    环境变量：为了在任意盘符下去启动库  mongod|mongo 
 
 
   开启客户端: mongo 回车 
     UI: 收费(下载+缴费)   官方免费的MongoDB Compass Community 
     命令行(shell): cmd->mongo回车  git bash - > mongo回车     webstrom->dos/linux 
 
 基本概念 
     MongoDB**是一种面向文档的数据库管理系统，由C++语言编写的，是一个基于分布式文件存储的开源数据库系统。2007年10月，MongoDB由10gen团队所发展。2009年2月首度推出。在高负载的情况下，添加更多的节点，可以保证服务器性能。MongoDB 旨在为WEB应用提供可扩展的高性能数据存储解决方案。MongoDB 将数据存储为一个文档，数据结构由键值(key=>value)对组成。MongoDB 文档类似于 JSON 对象。字段值可以包含其他文档，数组及文档数组。 
 优缺点 
 优点 
     文档结构的存储方式，能够更便捷的获取数据 
     内置GridFS，支持大容量的存储：GridFS是一个出色的分布式文件系统，可以支持海量的数据存储。 内置了GridFS了MongoDB，能够满足对大数据集的快速范围查询。 
     海量数据下，性能优越：在使用场合下，千万级别的文档对象，近10G的数据，对有索引的ID的查询不会比mysql慢，而对非索引字段的查询，则是全面胜出。 mysql实际无法胜任大数据量下任意字段的查询，而mongodb的查询性能实在让我惊讶。写入性能同样很令人满意。 
     动态查询 
     全索引支持,扩展到内部对象和内嵌数组：索引通常能够极大的提高查询的效率，如果没有索引，MongoDB在读取数据时必须扫描集合中的每个文件并选取那些符合查询条件的记录。这种扫描全集合的查询效率是非常低的，特别在处理大量的数据时，查询可以要花费几十秒甚至几分钟，这对网站的性能是非常致命的。索引是特殊的数据结构，索引存储在一个易于遍历读取的数据集合中，索引是对数据库表中一列或多列的值进行排序的一种结构。 
     查询记录分析 
     快速,就地更新 
     高效存储二进制大对象 (比如照片和视频) 
     复制（复制集）和支持自动故障恢复 
     内置 Auto- Sharding 自动分片支持云级扩展性，分片简单 
     MapReduce 支持复杂聚合：主要用于处理数据(诸如统计平均值,求和等)，并返回计算后的数据结果。有点类似sql语句中的 count(*)。 
     商业支持,培训和咨询 
 缺点 
     不支持事务操作：事务要求严格的系统（如果银行系统）肯定不能用它。 
     MongoDB没有如MySQL那样成熟的维护工具 
     无法进行关联表查询，不适用于关系多的数据 
     复杂聚合操作通过mapreduce创建，速度慢 
     模式自由,自由灵活的文件存储格式带来的数据错 
     MongoDB 在你删除记录后不会在文件系统回收空间。除非你删掉数据库。但是空间没有被浪费
```


```纯文本 
 事务支持(主从集)   https://www.cnblogs.com/doudoujs/p/10711895.html 
 
 一、预备工作 
     1.MongoDB需要4.0版本+ 
     2.需要自己搭建MongoDB复制集，单个mongodb server 不支持事务。 
 
     事务原理：mongodb的复制至少需要两个节点。其中一个是主节点，负责处理客户端请求，其余的都是从节点，负责复制主节点上的数据。mongodb各个节点常见的搭配方式为：一主一从、一主多从。主节点记录在其上的所有操作oplog，从节点定期轮询主节点获取这些操作，然后对自己的数据副本执行这些操作，从而保证从节点的数据与主节点一致。 
     3.搭建复制集步骤 
     * 启动mongo主节点实例，bin目录下命令窗口执行，复制集命名为doudou, 8080端口的数据库文件位于db1目录下，--dbpath=路径写自己的，启动后勿关闭命令窗口 
     mongod --replSet zhengchao --dbpath=C:\data\db1 --port=8080　　 
     * 启动mongo从节点实例，bin目录下命令窗口执行，复制集命名为doudou, 8081端口的数据库文件位于db2目录下，--dbpath=路径写自己的，启动后勿关闭命令窗口 
     mongod --replSet zhengchao--dbpath=C:\data\db2 --port=8081 
     * 两个节点启动后，bin目录下打开命令窗口，连接主节点 
     mongo --port=8080 
     * 命令初始化 
     rs.initiate() 
     * 两个节点启动后，bin目录下打开命令窗口，连接主节点 
     mongo --port=8080 
 
 *命令初始化 
 rs.initiate() 
 成功的结果是（ok项是1，失败是0） 
 查看是否是主节点 rs.isMaster() 
 查看复制集状态 rs.status() 
 * 初始化配置 
 rs.conf() 
 * 向主节点添加从节点 
 rs.add("localhost:8081") 
 * 查看副本集姿态使用 rs.status() 命令 
 rs.status() 
 复制集配置完成
```
