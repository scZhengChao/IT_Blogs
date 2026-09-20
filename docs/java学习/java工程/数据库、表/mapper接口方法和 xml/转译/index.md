# 转译

## 目录

- [为什么<需要转义为\&lt;？](#为什么需要转义为lt)
- [在Map中的情况](#在Map中的情况)
- [是否需要手动转义？](#是否需要手动转义)
- [示例：手动转义](#示例手动转义)
- [总结](#总结)

在 Java 中，当你在 XML 或 HTML 中使用`Map`或其他集合类时，如果需要在字符串中包含特殊字符（如`<`,`>`,`&`等），通常需要对这些字符进行转义（escape）。这是因为这些字符在 XML/HTML 中有特殊含义，直接使用可能会导致解析错误或安全问题。

### 为什么`<`需要转义为`&lt;`？

1. **XML/HTML 语法规则**：
   - `<`是 XML/HTML 的起始标签符号（如`<tag>`）。如果直接在字符串中使用`<`，解析器会误以为它是一个标签的开始，从而导致语法错误。
   - 为了避免歧义，XML/HTML 规定`<`必须转义为`&lt;`，`>`转义为`&gt;`，`&`转义为`&amp;`等。
2. **Java 字符串中的转义**：
   - 如果你在 Java 代码中直接写`&lt;`，它会被当作普通字符串处理（即`"&lt;"`）。
   - 但如果你是从 XML/HTML 中读取内容或生成 XML/HTML，解析器会自动将`<`转换为`&lt;`（或反之）。

### 在`Map`中的情况

如果`Map`的值是 XML/HTML 内容，并且包含`<`，则需要转义：

```java 
Map<String, String> map = new HashMap<>();
map.put("key", "This is a <tag>");  // 直接存储，可能导致 XML/HTML 解析问题
map.put("key", "This is a &lt;tag&gt;");  // 正确转义后的存储
```


### 是否需要手动转义？

- 如果你直接操作字符串，可能需要手动转义（或使用工具库如`org.apache.commons.text.StringEscapeUtils`）。
- 如果你使用 XML/HTML 生成工具（如 JAXB、DOM、Thymeleaf 等），它们通常会**自动处理转义**。

### 示例：手动转义

```java 
import org.apache.commons.text.StringEscapeUtils;

public class Main {
    public static void main(String[] args) {
        String xmlContent = "<message>Hello, World!</message>";
        String escaped = StringEscapeUtils.escapeXml11(xmlContent);
        System.out.println(escaped);  // 输出: &lt;message&gt;Hello, World!&lt;/message&gt;
    }
}
```


### 总结

- `<`需要转义为`&lt;`是为了遵守 XML/HTML 的语法规范。
- 在 Java 中，如果你直接操作字符串，可能需要手动转义；如果是通过框架生成 XML/HTML，通常会自动处理。
- 推荐使用工具库（如 Apache Commons Text）或框架内置的转义功能，避免手动处理出错。
