JDBC API 详解

## 目录

- [总结](#总结)
  - [1.jdbc查询使用步骤?](#1jdbc查询使用步骤)
  - [2.ResultSet如何获取数据？](#2ResultSet如何获取数据)

[DriverManager](./DriverManager/index.md "DriverManager")

[](./Connection-/index.md)

[Statement](./Statement/index.md "Statement")

[ResultSet](./ResultSet/index.md "ResultSet")

# 总结

### 1.jdbc查询使用步骤?

1\)注册驱动2\)获取连接对象3\)获取发送sql的对象Statement;4\)发送sql,获取结果集; ResultSet rs= stm.executeQuery(sql);5\)解析结果集,获取数据6\)关闭资源,释放连接(3个close)

### 2.ResultSet如何获取数据？

1\)调用next()方法获取某一行的记录;2\)通过getXXX(字段索引位);getXXX(字段名称);

[SQL注入](./SQL注入/index.md "SQL注入")
