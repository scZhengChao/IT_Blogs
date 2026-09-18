# XML的组成：字符区(了解)

当**大量的转义字符**出现在xml文档中时，会使XML文档的可读性大幅度降低。这时如果。

CDATA (Character Data)字符数据区，格式如下：

```xml 
<![CDATA[
    文本数据   < >  & ; " "
]]>

```


1. CDATA 指的**是不应由 XML 解析器进行解析的文本数据**（Unparsed Character Data）
2. CDATA 部分由 `<![CDATA[`开始，由 `]]>` 结束；

例如：

```lua 
<![CDATA[
    if salary < 1000 then
]]

```


快捷模板：CD 回车

![](image_z4fRZkzoZs.png)

*注意：*

**CDATA 部分不能包含字符串 "]]>"。也不允许嵌套的 CDATA 部分。**

标记 CDATA 部分结**尾的 "]]>" 不能包含空格或折行。**

**小结：**

- 字符区的特点：
  - **原样显示（书写的内容不会被xml解析器解析）**
