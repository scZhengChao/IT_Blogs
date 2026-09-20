# after

## 目录

- [定义和用法](#定义和用法)
- [语法](#语法)

```javascript title="在每个 <p> 元素后插入内容："
$("button").click(function(){
    $("p").after("<p>Hello world!</p>");
});
```


## 定义和用法

after() 方法在被选元素后插入指定的内容。

**提示：** 如需在被选元素前插入内容，请使用[before()](https://www.runoob.com/jquery/html-before.html "before()") 方法。

## 语法

`$(selector).after(content,function(index))`

| 参数                  | 描述                                                                                    |
| ------------------- | ------------------------------------------------------------------------------------- |
| *content*​          | 必需。规定要插入的内容（可包含 HTML 标签）。 可能的值： \\\*   HTML 元素 \\\*   jQuery 对象 \&#x20; \\\*   DOM 元素 |
| function(\*index\*) | 规定返回待插入内容的函数。 \\\*   \*index\* - 返回集合中元素的 index 位置。                                   |
