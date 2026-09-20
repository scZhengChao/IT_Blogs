# 映射类：Mapper

> 作用：**把通过解析@Select注解中的属性值（sql语句），存储到Mapper对象中**

```java 
public class Mapper {
    private String sql;//存储sql语句

    public Mapper() {
    }

    public Mapper(String sql) {
        this.sql = sql;
    }

    public String getSql() {
        return sql;
    }

    public void setSql(String sql) {
        this.sql = sql;
    }
}

```
