# each

## 目录

- [定义和用法](#定义和用法)
- [语法](#语法)

> 因为jqury 总是数组

```javascript title="输出每个 <li> 元素的文本："
$("button").click(function(){
    $("li").each(function(){
        alert($(this).text())
    });
});
```


## 定义和用法

`each()` 方法为每个匹配元素规定要运行的函数。

**提示：**返回 `false` 可用于**及早停止循环。**

## 语法

```javascript 
$(selector).each(function(index,element))

```


| 参数                                        | 描述                                                                                                 |
| ----------------------------------------- | -------------------------------------------------------------------------------------------------- |
| `javascript  function _(index,element)_ ` | 必需。为每个匹配元素规定运行的函数。  \\\*   \*index\* - 选择器的 index 位置。 \\\*   \*element\* - 当前的元素（也可使用 "this" 选择器）。 |
