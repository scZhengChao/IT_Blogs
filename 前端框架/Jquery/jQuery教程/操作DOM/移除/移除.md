# 移除

## 目录

- [detach() 方法](#detach-方法)
  - [定义和用法](#定义和用法)
  - [语法](#语法)
    - [删除节点](#删除节点)

# detach() 方法

```javascript title="移除所有的 <p> 元素："
$("button").click(function(){
    $("p").detach();
});
```


## 定义和用法

`detach()` 方法**移除被选元素，包括所有的文本和子节点**。然后**它会保留数据和事件**。

**该方法会保留移除元素的副本，允许它们在以后被重新插入。**

**提示：** ​**如需移除元素及它的数据和事件**，请使用 [remove()](https://www.runoob.com/jquery/html-remove.html "remove()") 方法代替。

**提示：**如**只需从被选元素移除内容，请使用 **[**empty()**](https://www.runoob.com/jquery/html-empty.html "empty()")** 方法。**

## 语法

`$(`*`selector`*`).detach()`

### 删除节点

要删除DOM节点，拿到jQuery对象后直接调用`remove()`方法就可以了。如果jQuery对象包含若干DOM节点，实际上可以一次删除多个DOM节点：

```javascript 
let li = $('#test-div>ul>li');
li.remove(); // 所有<li>全被删除
```
