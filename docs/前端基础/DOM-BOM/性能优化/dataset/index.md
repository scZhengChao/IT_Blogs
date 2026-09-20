# dataset

## 目录

- [JS获取](#JS获取)
- [css 如何区分data-\* 的元素呢](#css-如何区分data--的元素呢)
  - [1. 基本语法](#1-基本语法)
    - [(1) 仅匹配data-\*属性是否存在](#1-仅匹配data-属性是否存在)
    - [(2) 精确匹配data-\*的值](#2-精确匹配data-的值)
    - [(3) 部分匹配data-\*的值](#3-部分匹配data-的值)
  - [2. 结合其他选择器](#2-结合其他选择器)
  - [3.使用:has()选择器（CSS4 实验性支持）](#3使用has选择器CSS4-实验性支持)
  - [4. 使用 JavaScript 查询data-\*元素](#4-使用-JavaScript-查询data-元素)
  - [总结](#总结)

# JS获取

```javascript 
  使用 dataset 属性访问元素的自定义数据属性 (data-*)：
<div id="user" data-name="John Doe" data-age="29" data-something="Some Data">
    John Doe
</div>

<script>
    const user = document.getElementById('user');
  
    console.log(user.dataset); 
    // { name: "John Doe", age: "29", something: "Some Data" }
  
    console.log(user.dataset.name); // "John Doe"
    console.log(user.dataset.age); // "29"
    console.log(user.dataset.something); // "Some Data"
</script>     

```


# css 如何区分data-\* 的元素呢

在 CSS 中区分带有`data-*`属性的元素，可以使用 **属性选择器（Attribute Selectors）**。以下是详细的方法和示例：

***

## **1. 基本语法**

CSS 提供了多种方式来匹配`data-*`属性：

### **(1) 仅匹配**\*\*`data-*`\*\***属性是否存在**

```css 
div[data-custom] {
  background-color: yellow;
}
```


- 匹配所有带有`data-custom`属性的`<div>`元素。

***

### **(2) 精确匹配**\*\*`data-*`\*\***的值**

```css 
div[data-custom="value"] {
  border: 2px solid red;
}
```


- 仅匹配`data-custom="value"`的`<div>`元素。

***

### **(3) 部分匹配**\*\*`data-*`\*\***的值**

| 选择器                  | 作用                 | 示例                          |
| -------------------- | ------------------ | --------------------------- |
| \`\[attr^="val"]\`   | 匹配以\`"val"\`开头的值   | \`\[data-custom^="val"]\`   |
| \`\[attr\$="ue"]\`   | 匹配以\`"ue"\`结尾的值    | \`\[data-custom\$="ue"]\`   |
| `[attr *="alu"]`     | 匹配包含\`"alu"\`的值    | `[data-custom *="alu"]`     |
| \`\[attr\~="word"]\` | 匹配包含单词\`"word"\`的值 | \`\[data-custom\~="word"]\` |
| \\\`\\\[attr         | \\="prefix"]\\\`   | 匹配以\`"prefix-"\`开头的值        |

**示例：**

```css 
/* 匹配 data-custom 以 "btn-" 开头的元素 */
[data-custom^="btn-"] {
  color: blue;
}

/* 匹配 data-custom 包含 "active" 的元素 */
[data-custom*="active"] {
  font-weight: bold;
}
```


## **2. 结合其他选择器**

可以结合 **类名、ID、伪类** 等增强选择能力：

```css 
/* 匹配 class="box" 且 data-status="active" 的元素 */
.box[data-status="active"] {
  background-color: green;
}

/* 匹配 hover 时 data-tooltip 存在的元素 */
[data-tooltip]:hover::after {
  content: attr(data-tooltip);
  display: block;
}
```


## 3.**使用**\*\*`:has()`\*\***选择器（CSS4 实验性支持）**

```css 
/* 选择包含 data-highlight 子元素的父元素 */
.container:has([data-highlight]) {
  border: 2px dashed orange;
}
```


> ⚠️ 注意：`has()`目前仅部分浏览器支持（Chrome 105+）。

***

## **4. 使用 JavaScript 查询**\*\*`data-*`\*\***元素**

如果 CSS 无法满足需求，可以用 JS 筛选：

```javascript 
// 获取所有带 data-custom 属性的元素
const customElements = document.querySelectorAll('[data-custom]');

// 获取 data-custom="special" 的元素
const specialElements = document.querySelectorAll('[data-custom="special"]');
```


## **总结**

| 方法                       | 示例                             | 适用场景     |
| ------------------------ | ------------------------------ | -------- |
| \`\[data-attr]\`         | \`\[data-custom]\`             | 检查属性是否存在 |
| \`\[data-attr="value"]\` | \`\[data-id="123"]\`           | 精确匹配值    |
| \`\[data-attr^="val"]\`  | \`\[data-id^="btn"]\`          | 匹配开头     |
| `[data-attr *="val"]`    | `[data-id *="error"]`          | 模糊匹配     |
| \`:has(\[data-attr])\`   | \`.parent:has(\[data-child])\` | 父元素选择    |

**最佳实践：**

- **优先用**\*\*`data-*`****代替****`class`\*\*，用于存储状态或标识。
- **避免过度使用**，仅用于逻辑相关样式。
- **结合 JS 使用** 实现更复杂的交互逻辑。
