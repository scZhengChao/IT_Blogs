# 错误分析：

## 目录

- [Cannot set headers after they are sent to the client](#Cannot-set-headers-after-they-are-sent-to-the-client)
- [问题解决后发现翻译如下：已经将response信息返回给客户端后，不能再设置headers](#问题解决后发现翻译如下已经将response信息返回给客户端后不能再设置headers)
- [原因：客户端发出一次请求，服务器给出两次及以上响应](#原因客户端发出一次请求服务器给出两次及以上响应)
- [解决方案：清理多余次数响应；每次响应后立马return掉函数](#解决方案清理多余次数响应每次响应后立马return掉函数)

```纯文本 
 The MySQL server is running with the --skip-grant-tables option so it cannot execute this statement 
      flush privileges; 先刷新一下权限表 在重新试
```


```纯文本 
 net stop mysql  拒绝访问 系统错误提示 5 
     管理员身份运行cmd 重试
```


```纯文本 
 Unable to connect to the database: AccessDeniedError  [SequelizeAccessDeniedError]: Access denied for user 'root'@'localhost' (using  password: YES) 
 
     重启数据库； 虽然密码对了；但是拒绝访问
```


```纯文本 
 Incorrect table definition;there can be only one auto column and it must be defined as a key 
 1、有两个或者两个以上的自增长列：这个问题很少出现，而且也容易排查； 
 2、设置自增长的列，必须设为主键才可以：如果很明显排除不是1的情况，那么久是这个了，需要给自增长列设置为主键就可以了；
```


```纯文本 
 Cannot add or update a child row: a foreign key constraint fails 
 原因一： 
 添加的外键列与另一个表的唯一索引列（一般是主键）的数据类型不同 
 原因二： 
 要添加外键的表类型与另一个表的存储引擎是不是都为innodb引擎 
 原因三： 
 设置的外键与另一个表中的唯一索引列（一般是主键）中的值不匹配 
 
 一般是主从不同步： 1=》n 的关系时： 操作从表时，在主表里找不到从表的外键 ；  主从不一致;
```


# Cannot set headers after they are sent to the client

# 问题解决后发现翻译如下：已经将response信息返回给客户端后，不能再设置headers

# 原因：客户端发出一次请求，服务器给出两次及以上响应

# 解决方案：清理多余次数响应；每次响应后立马return掉函数
