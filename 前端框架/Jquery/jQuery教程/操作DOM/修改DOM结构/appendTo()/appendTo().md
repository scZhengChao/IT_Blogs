# appendTo()

## 目录

- [定义和用法](#定义和用法)
- [语法](#语法)

```javascript title="在每个 <p> 元素的结尾插入 <span> 元素："
$("button").click(function(){
    $("<span>Hello World!</span>").appendTo("p");
});
```


## 定义和用法

appendTo() 方法在被选元素的结尾插入 HTML 元素。

**提示：** 如需在被选元素的开头插入 HTML 元素，请使用[prependTo()](https://www.runoob.com/jquery/html-prependto.html "prependTo()") 方法。

## 语法

```javascript 
$(content).appendTo(selector)
```


| 参数          | 描述                                                                                |
| ----------- | --------------------------------------------------------------------------------- |
| *content*​  | 必需。规定要插入的内容（必须包含 HTML 标签）。  **注意：** 如果 *content* 是已存在的元素，它将从当前位置被移除，并在被选元素的结尾被插入。 |
| *selector*​ | 必需。规定把内容追加到哪个元素上。                                                                 |
