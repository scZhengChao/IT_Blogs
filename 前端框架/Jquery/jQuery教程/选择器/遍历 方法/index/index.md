# index

## 目录

- [定义和用法](#定义和用法)
- [第一个匹配元素相对于同级元素的 index。](#第一个匹配元素相对于同级元素的-index)
- [语法](#语法)
- [元素相对于选择器的 index。](#元素相对于选择器的-index)
- [语法](#语法)

```javascript title="获得被点击的 <li> 元素相对于它的同级元素的 index："
$("li").click(function(){
  alert($(this).index());
  });
```


## 定义和用法

index() 方法返回指定元素相对于其他指定元素的 index 位置。

这些元素可通过 jQuery 选择器或 DOM 元素来指定。

**注意：** 如果未找到元素，index() 将返回 -1。

## 第一个匹配元素相对于同级元素的 index。

获得第一个匹配元素相对于其同级元素的 index 位置。

## 语法

```javascript 
$(selector).index()
```


## 元素相对于选择器的 index。

获得元素相对于选择器的 index 位置。

该元素可以通过 DOM 元素或 jQuery 选择器来指定。

## 语法

```javascript 
$(selector).index(element)
```


| 参数         | 描述                                           |
| ---------- | -------------------------------------------- |
| *element*​ | 可选。规定要获得 index 位置的元素。可以是 DOM 元素或 jQuery 选择器。 |
