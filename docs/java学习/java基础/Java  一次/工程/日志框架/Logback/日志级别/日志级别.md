# 日志级别

- 级别程度依次是：`TRACE< DEBUG< INFO<WARN<ERROR`  ; 默认级别是debug（忽略大小写），对应其方法。
- 作用：用于**控制系统中哪些日志级别是可以输出**的，**只输出级别不低于设定级别的日志信息**。
- ALL  和 OFF分别是打开全部日志信息，及关闭全部日志信息。

  具体在`<root level=“INFO”>标签`的level**属性中设置日志级别**。

```xml 
<root level=“INFO">    
  <appender-ref ref="CONSOLE"/>    
  <appender-ref ref="FILE" />
</root>
```
