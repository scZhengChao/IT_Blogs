# children

## 目录

- [实例](#实例)
- [定义和用法](#定义和用法)
  - [语法](#语法)
  - [详细说明](#详细说明)
- [案例](#案例)

## 实例

找到类名为 "selected" 的所有 div 的子元素，并将其设置为蓝色：

```javascript 
$("div").children(".selected").css("color", "blue");

```


## 定义和用法

children() 方法返回返回被选元素的所有直接子元素。

### 语法

`.children(`*`selector`*`)`

| 参数          | 描述                  |
| ----------- | ------------------- |
| *selector*​ | 字符串值，包含匹配元素的选择器表达式。 |

### 详细说明

如果给定表示 DOM 元素集合的 jQuery 对象，.children() 方法允许我们检索 DOM 树中的这些元素，并用匹配元素构造新的 jQuery 对象。[.find()](https://www.w3school.com.cn/jquery/traversing_find.asp ".find()") 和 .children() 方法类似，**不过后者只沿着 DOM 树向下遍历单一层级。**

请注意，与大多数 jQuery 方法一样，.`children`() 不返回文本节点；如果需要获得包含文本和注释节点在内的所有子节点，请使用 `.contents()。`

该方法接受一个选择器表达式作为可选参数，与我们传递到 \$() 的参数的类型是相同的。如果应用该选择器，将测试元素是否匹配该表达式，以此筛选这些元素。

请思考这个带有基础的嵌套列表的页面：

```html 
<ul class="level-1">
  <li class="item-i">I</li>
  <li class="item-ii">II
    <ul class="level-2">
      <li class="item-a">A</li>
      <li class="item-b">B
        <ul class="level-3">
          <li class="item-1">1</li>
          <li class="item-2">2</li>
          <li class="item-3">3</li>
        </ul>
      </li>
      <li class="item-c">C</li>
    </ul>
  </li>
  <li class="item-iii">III</li>
</ul>

```


如果我们从 level-2 列表开始，我们可以找到它的子元素：

```javascript 
$('ul.level-2').children().css('background-color', 'red');

```


这行代码的结果是，项目 A, B, C 得到红色背景。由于我们没有应用选择器表达式，返回的 jQuery 对象包含了所有子元素。如果应用一个选择器的话，那么只会包括匹配的项目。

# 案例

```javascript 
$('body').children(':first'). // 第一个子元素
```
