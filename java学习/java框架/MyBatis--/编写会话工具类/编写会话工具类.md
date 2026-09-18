# 编写会话工具类

## 目录

- [步骤：  ](#步骤)
- [代码 ](#代码-)

步骤：

在静态代码块中创建会话工厂对象
编写静态方法得到会话对象，设置自动提交事务
编写静态方法得到会话对象，方法接收调用者传递的布尔类型，决定是否自动提交事务
编写静态方法接收会话对象，手动提交事务并且关闭会话
编写静态方法接收会话对象，回滚事务并且关闭会话

详见：SessionFactoryUtils.java

# 代码&#x20;

```java 
package com.itheima.sh.utils;

import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;

import java.io.IOException;
import java.io.InputStream;

@SuppressWarnings("all")
public class SqlSessionUtil {

    private static SqlSessionFactory factory;

    static {
        //实例化工厂建造类
        SqlSessionFactoryBuilder builder = new SqlSessionFactoryBuilder();
        //读取核心配置文件
        try (InputStream inputStream = Resources.getResourceAsStream("mybatis-config.xml")) {
            //创建工厂对象
            factory = builder.build(inputStream);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    /**
     * 得到会话对象
     *
     * @return 会话对象 : 自动提交事务
     */
    public static SqlSession getSession() {
        return factory.openSession(true);
    }

    /**
     * 得到会话对象
     *
     * @param isAutoCommit 是否自动提交事务
     */
    public static SqlSession getSession(boolean isAutoCommit) {
        return factory.openSession(isAutoCommit);
    }

    /*
     *   提交事务并关闭session
     * */
    public static void commitAndClose(SqlSession session) {
        if (session != null) {
            session.commit();
            session.close();
        }
    }

    /*
     *   回滚事务并关闭session
     * */
    public static void rollbackAndClose(SqlSession session) {
        if (session != null) {
            session.rollback();
            session.close();
        }
    }
}

```
