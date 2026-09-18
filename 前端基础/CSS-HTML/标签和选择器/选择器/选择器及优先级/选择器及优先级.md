# 选择器及优先级

## 目录

- [优先级](#优先级)
- [属性选择器](#属性选择器)
- [元素选择器](#元素选择器)
- [综合](#综合)
- [案例](#案例)
- [选择器及其优先级详解](#选择器及其优先级详解)
  - [1. 基本选择器](#1-基本选择器)
  - [2. 组合选择器](#2-组合选择器)
  - [3. 伪类选择器](#3-伪类选择器)
  - [4. 伪元素选择器](#4-伪元素选择器)
  - [二、CSS 优先级规则](#二CSS-优先级规则)
    - [1. 优先级计算规则](#1-优先级计算规则)
    - [2. 优先级示例](#2-优先级示例)
    - [3. 优先级特殊情况](#3-优先级特殊情况)
  - [三、选择器优化建议](#三选择器优化建议)
  - [四、选择器性能比较（从高到低）](#四选择器性能比较从高到低)

# 优先级

因为这里还涉及`CSS`**组合选择器**的优先级。

基础的优先级应该不用赘述：`!important>内联样式>ID选择器>类选择器>标签选择器`。（!important这种hack会导致项目不好维护，不提倡使用）

在这个基础上还有五种组合选择器要对优先级**分数做累计**，以类选择器为例：

1. 后代选择器（空格）：`.A .B`，选择.A元素后的所有.B元素，
2. 子元素选择器（大于号）：`.A>.B`，选择.A元素的直接后代中的.B元素
3. 相邻兄弟选择器（加号）：`.A+.B`，选择.A元素后紧邻的第一个兄弟.B元素
4. 后续兄弟选择器(\~号)：`.A~.B`，选择.A元素后所有的兄弟.B元素
5. 交集选择器（连在一起）：`.A.B`选择自身同时拥有.A和.B两个属性的元素

上面几个规则看着很复杂，其实用的多的就是第一个后代选择器，记住它就行。Antd组件库用的就是它：

# 属性选择器

| 属性选择器              | 含义描述                                                                     |
| ------------------ | ------------------------------------------------------------------------ |
| E\[attr]           | 存在属性attr的元素                                                              |
| E\[attr ="val"]    | 属性attr的值等于"val"的元素                                                       |
| E\[attr ^="val"]   | 属性attr的值以"val"**开头**的元素                                                  |
| E\[attr \$="val"]  | 属性attr的值以"val"**结尾**的元素                                                  |
| E\[attr \*="val"]  | 属性attr的值**包含**"val"字符串的元素 title="websiteitem link"  title="website link" |
| E\[attr \~="val"]  | 属性attr的值**包含**"val"字符串的元素 并以空格隔开 title="website link"                    |
| E\[attr  \|="val"] | 属性attr以val开头或用 "-" 隔开 class="a" class="a-test"                           |

# 元素选择器

| 含义描述                                                                                     |
| ---------------------------------------------------------------------------------------- |
| 匹配文档的**根元素**，对于HTML文档，就是HTML元素                                                           |
| 匹配其**父元素的第n个子元素**，第一个编号为1                                                                |
| 匹配其父元素的**倒数第n个子元素**，第一个编号为1                                                              |
| 与:nth-child()作用类似，但是仅匹配使用同种标签的元素                                                         |
| 与:nth-last-child() 作用类似，但是仅匹配使用同种标签的元素                                                   |
| 匹配父元素的最后一个子元素，等同于:nth-last-child(1)                                                      |
| 匹配父元素下使用同种标签的第一个子元素，等同于:nth-of-type(1)                                                   |
| 匹配父元素下使用同种标签的最后一个子元素，等同于:nth-last-of-type(1)                                             |
| 匹配父元素下仅有的一个子元素，等同于:first-child:last-child或 :nth-child(1):nth-last-child(1)               |
| 匹配父元素下使用同种标签的唯一一个子元素，等同于:first-of-type:last-of-type或 :nth-of-type(1):nth-last-of-type(1) |
| 匹配一个不包含任何子元素的元素，注意，文本节点也被看作子元素&#xA;&#xA;                                                 |

# 综合

| 选择器                                                                                                                                                                                                                                                                                                                                                                                                        | 示例                    | 示例说明                          | CSS |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------- | ----------------------------- | --- |
| [.](https://www.runoob.com/cssref/sel-class.html ".")[*class*](https://www.runoob.com/cssref/sel-class.html "class")                                                                                                                                                                                                                                                                                       | .intro                | 选择所有class="intro"的元素          | 1   |
| [#](https://www.runoob.com/cssref/sel-id.html "#")[*id*](https://www.runoob.com/cssref/sel-id.html "id")                                                                                                                                                                                                                                                                                                   | #firstname            | 选择所有id="firstname"的元素         | 1   |
| [\*](https://www.runoob.com/cssref/sel-all.html "*")                                                                                                                                                                                                                                                                                                                                                       | \*                    | 选择所有元素                        | 2   |
| [*element*](https://www.runoob.com/cssref/sel-element.html "element")                                                                                                                                                                                                                                                                                                                                      | p                     | 选择所有\<p>元素                    | 1   |
| [*element,element*](https://www.runoob.com/cssref/sel-element-comma.html "element,element")                                                                                                                                                                                                                                                                                                                | div,p                 | 选择所有\<div>元素和\<p>元素           | 1   |
| [*element*](https://www.runoob.com/cssref/sel-element-element.html "element")[ ](https://www.runoob.com/cssref/sel-element-element.html " ")[*element*](https://www.runoob.com/cssref/sel-element-element.html "element")                                                                                                                                                                                  | div p                 | 选择\<div>元素内的所有\<p>元素          | 1   |
| [*element*](https://www.runoob.com/cssref/sel-element-gt.html "element")[>](https://www.runoob.com/cssref/sel-element-gt.html ">")[*element*](https://www.runoob.com/cssref/sel-element-gt.html "element")                                                                                                                                                                                                 | div>p                 | 选择所有父级是 \<div> 元素的 \<p> 元素    | 2   |
| [*element*](https://www.runoob.com/cssref/sel-element-pluss.html "element")[+](https://www.runoob.com/cssref/sel-element-pluss.html "+")[*element*](https://www.runoob.com/cssref/sel-element-pluss.html "element")                                                                                                                                                                                        | div+p                 | 选择所有紧接着\<div>元素之后的\<p>元素      | 2   |
| [\[](https://www.runoob.com/cssref/sel-attribute.html "\[")[*attribute*](https://www.runoob.com/cssref/sel-attribute.html "attribute")[\]](https://www.runoob.com/cssref/sel-attribute.html "]")                                                                                                                                                                                                           | \[target]             | 选择所有带有target属性元素              | 2   |
| [\[](https://www.runoob.com/cssref/sel-attribute-value.html "\[")[*attribute*](https://www.runoob.com/cssref/sel-attribute-value.html "attribute")[=](https://www.runoob.com/cssref/sel-attribute-value.html "=")[*value*](https://www.runoob.com/cssref/sel-attribute-value.html "value")[\]](https://www.runoob.com/cssref/sel-attribute-value.html "]")                                                 | \[target=-blank]      | 选择所有使用target="-blank"的元素      | 2   |
| [\[](https://www.runoob.com/cssref/sel-attribute-value-contains.html "\[")[*attribute*](https://www.runoob.com/cssref/sel-attribute-value-contains.html "attribute")[\~=](https://www.runoob.com/cssref/sel-attribute-value-contains.html "~=")[*value*](https://www.runoob.com/cssref/sel-attribute-value-contains.html "value")[\]](https://www.runoob.com/cssref/sel-attribute-value-contains.html "]") | \[title\~=flower]     | 选择标题属性包含单词"flower"的所有元素       | 2   |
| [\[](https://www.runoob.com/cssref/sel-attribute-value-lang.html "\[")[*attribute*](https://www.runoob.com/cssref/sel-attribute-value-lang.html "attribute")[\|=](https://www.runoob.com/cssref/sel-attribute-value-lang.html "\|=")[*language*](https://www.runoob.com/cssref/sel-attribute-value-lang.html "language")[\]](https://www.runoob.com/cssref/sel-attribute-value-lang.html "]")              | \[lang\|=en]          | 选择 lang 属性以 en 为开头的所有元素       | 2   |
| [:link](https://www.runoob.com/cssref/sel-link.html ":link")                                                                                                                                                                                                                                                                                                                                               | a:link                | 选择所有未访问链接                     | 1   |
| [:visited](https://www.runoob.com/cssref/sel-visited.html ":visited")                                                                                                                                                                                                                                                                                                                                      | a:visited             | 选择所有访问过的链接                    | 1   |
| [:active](https://www.runoob.com/cssref/sel-active.html ":active")                                                                                                                                                                                                                                                                                                                                         | a:active              | 选择活动链接                        | 1   |
| [:hover](https://www.runoob.com/cssref/sel-hover.html ":hover")                                                                                                                                                                                                                                                                                                                                            | a:hover               | 选择鼠标在链接上面时                    | 1   |
| [:focus](https://www.runoob.com/cssref/sel-focus.html ":focus")                                                                                                                                                                                                                                                                                                                                            | input:focus           | 选择具有焦点的输入元素                   | 2   |
| [:first-letter](https://www.runoob.com/cssref/sel-firstletter.html ":first-letter")                                                                                                                                                                                                                                                                                                                        | p:first-letter        | 选择每一个\<p>元素的第一个字母             | 1   |
| [:first-line](https://www.runoob.com/cssref/sel-firstline.html ":first-line")                                                                                                                                                                                                                                                                                                                              | p:first-line          | 选择每一个\<p>元素的第一行               | 1   |
| [:first-child](https://www.runoob.com/cssref/sel-firstchild.html ":first-child")                                                                                                                                                                                                                                                                                                                           | p:first-child         | 指定只有当\<p>元素是其父级的第一个子级的样式。     | 2   |
| [:before](https://www.runoob.com/cssref/sel-before.html ":before")                                                                                                                                                                                                                                                                                                                                         | p:before              | 在每个\<p>元素之前插入内容               | 2   |
| [:after](https://www.runoob.com/cssref/sel-after.html ":after")                                                                                                                                                                                                                                                                                                                                            | p:after               | 在每个\<p>元素之后插入内容               | 2   |
| [:lang(](https://www.runoob.com/cssref/sel-lang.html ":lang(")[*language*](https://www.runoob.com/cssref/sel-lang.html "language")[)](https://www.runoob.com/cssref/sel-lang.html ")")                                                                                                                                                                                                                     | p:lang(it)            | 选择一个lang属性的起始值="it"的所有\<p>元素  | 2   |
| [*element1*](https://www.runoob.com/cssref/sel-gen-sibling.html "element1")[\~](https://www.runoob.com/cssref/sel-gen-sibling.html "~")[*element2*](https://www.runoob.com/cssref/sel-gen-sibling.html "element2")                                                                                                                                                                                         | p\~ul                 | 选择p元素之后的每一个ul元素               | 3   |
| [\[](https://www.runoob.com/cssref/sel-attr-begin.html "\[")[*attribute*](https://www.runoob.com/cssref/sel-attr-begin.html "attribute")[^=](https://www.runoob.com/cssref/sel-attr-begin.html "^=")[*value*](https://www.runoob.com/cssref/sel-attr-begin.html "value")[\]](https://www.runoob.com/cssref/sel-attr-begin.html "]")                                                                        | a\[src^="https"]      | 选择每一个src属性的值以"https"开头的元素     | 3   |
| [\[](https://www.runoob.com/cssref/sel-attr-end.html "\[")[*attribute*](https://www.runoob.com/cssref/sel-attr-end.html "attribute")[\$=](https://www.runoob.com/cssref/sel-attr-end.html "\$=")[*value*](https://www.runoob.com/cssref/sel-attr-end.html "value")[\]](https://www.runoob.com/cssref/sel-attr-end.html "]")                                                                                | a\[src\$=".pdf"]      | 选择每一个src属性的值以".pdf"结尾的元素      | 3   |
| [\[](https://www.runoob.com/cssref/sel-attr-contain.html "\[")[*attribute*](https://www.runoob.com/cssref/sel-attr-contain.html "attribute")[\*=](https://www.runoob.com/cssref/sel-attr-contain.html "*=")[*value*](https://www.runoob.com/cssref/sel-attr-contain.html "value")[\]](https://www.runoob.com/cssref/sel-attr-contain.html "]")                                                             | a\[src \*="runoob"]   | 选择每一个src属性的值包含子字符串"runoob"的元素 | 3   |
| [:first-of-type](https://www.runoob.com/cssref/sel-first-of-type.html ":first-of-type")                                                                                                                                                                                                                                                                                                                    | p:first-of-type       | 选择每个p元素是其父级的第一个p元素            | 3   |
| [:last-of-type](https://www.runoob.com/cssref/sel-last-of-type.html ":last-of-type")                                                                                                                                                                                                                                                                                                                       | p:last-of-type        | 选择每个p元素是其父级的最后一个p元素           | 3   |
| [:only-of-type](https://www.runoob.com/cssref/sel-only-of-type.html ":only-of-type")                                                                                                                                                                                                                                                                                                                       | p:only-of-type        | 选择每个p元素是其父级的唯一p元素             | 3   |
| [:only-child](https://www.runoob.com/cssref/sel-only-child.html ":only-child")                                                                                                                                                                                                                                                                                                                             | p:only-child          | 选择每个p元素是其父级的唯一子元素             | 3   |
| [:nth-child(](https://www.runoob.com/cssref/sel-nth-child.html ":nth-child(")[*n*](https://www.runoob.com/cssref/sel-nth-child.html "n")[)](https://www.runoob.com/cssref/sel-nth-child.html ")")                                                                                                                                                                                                          | p:nth-child(2)        | 选择每个p元素是其父级的第二个子元素            | 3   |
| [:nth-last-child(](https://www.runoob.com/cssref/sel-nth-last-child.html ":nth-last-child(")[*n*](https://www.runoob.com/cssref/sel-nth-last-child.html "n")[)](https://www.runoob.com/cssref/sel-nth-last-child.html ")")                                                                                                                                                                                 | p:nth-last-child(2)   | 选择每个p元素的是其父级的第二个子元素，从最后一个子项计数 | 3   |
| [:nth-of-type(](https://www.runoob.com/cssref/sel-nth-of-type.html ":nth-of-type(")[*n*](https://www.runoob.com/cssref/sel-nth-of-type.html "n")[)](https://www.runoob.com/cssref/sel-nth-of-type.html ")")                                                                                                                                                                                                | p:nth-of-type(2)      | 选择每个p元素是其父级的第二个p元素            | 3   |
| [:nth-last-of-type(](https://www.runoob.com/cssref/sel-nth-last-of-type.html ":nth-last-of-type(")[*n*](https://www.runoob.com/cssref/sel-nth-last-of-type.html "n")[)](https://www.runoob.com/cssref/sel-nth-last-of-type.html ")")                                                                                                                                                                       | p:nth-last-of-type(2) | 选择每个p元素的是其父级的第二个p元素，从最后一个子项计数 | 3   |
| [:last-child](https://www.runoob.com/cssref/sel-last-child.html ":last-child")                                                                                                                                                                                                                                                                                                                             | p:last-child          | 选择每个p元素是其父级的最后一个子级。           | 3   |
| [:root](https://www.runoob.com/cssref/sel-root.html ":root")                                                                                                                                                                                                                                                                                                                                               | :root                 | 选择文档的根元素                      | 3   |
| [:empty](https://www.runoob.com/cssref/sel-empty.html ":empty")                                                                                                                                                                                                                                                                                                                                            | p:empty               | 选择每个没有任何子级的p元素（包括文本节点）        | 3   |
| [:target](https://www.runoob.com/cssref/sel-target.html ":target")                                                                                                                                                                                                                                                                                                                                         | #news:target          | 选择当前活动的#news元素（包含该锚名称的点击的URL） | 3   |
| [:enabled](https://www.runoob.com/cssref/sel-enabled.html ":enabled")                                                                                                                                                                                                                                                                                                                                      | input:enabled         | 选择每一个已启用的输入元素                 | 3   |
| [:disabled](https://www.runoob.com/cssref/sel-disabled.html ":disabled")                                                                                                                                                                                                                                                                                                                                   | input:disabled        | 选择每一个禁用的输入元素                  | 3   |
| [:checked](https://www.runoob.com/cssref/sel-checked.html ":checked")                                                                                                                                                                                                                                                                                                                                      | input:checked         | 选择每个选中的输入元素                   | 3   |
| [:not(](https://www.runoob.com/cssref/sel-not.html ":not(")[*selector*](https://www.runoob.com/cssref/sel-not.html "selector")[)](https://www.runoob.com/cssref/sel-not.html ")")                                                                                                                                                                                                                          | :not(p)               | 选择每个并非p元素的元素                  | 3   |
| [::selection](https://www.runoob.com/cssref/sel-selection.html "::selection")                                                                                                                                                                                                                                                                                                                              | ::selection           | 匹配元素中被用户选中或处于高亮状态的部分          | 3   |
| [:out-of-range](https://www.runoob.com/cssref/sel-out-of-range.html ":out-of-range")                                                                                                                                                                                                                                                                                                                       | :out-of-range         | 匹配值在指定区间之外的input元素            | 3   |
| [:in-range](https://www.runoob.com/cssref/sel-in-range.html ":in-range")                                                                                                                                                                                                                                                                                                                                   | :in-range             | 匹配值在指定区间之内的input元素            | 3   |
| [:read-write](https://www.runoob.com/cssref/sel-read-write.html ":read-write")                                                                                                                                                                                                                                                                                                                             | :read-write           | 用于匹配可读及可写的元素                  | 3   |
| [:read-only](https://www.runoob.com/cssref/sel-read-only.html ":read-only")                                                                                                                                                                                                                                                                                                                                | :read-only            | 用于匹配设置 "readonly"（只读） 属性的元素   | 3   |
| [:optional](https://www.runoob.com/cssref/sel-optional.html ":optional")                                                                                                                                                                                                                                                                                                                                   | :optional             | 用于匹配可选的输入元素                   | 3   |
| [:required](https://www.runoob.com/cssref/sel-required.html ":required")                                                                                                                                                                                                                                                                                                                                   | :required             | 用于匹配设置了 "required" 属性的元素      | 3   |
| [:valid](https://www.runoob.com/cssref/sel-valid.html ":valid")                                                                                                                                                                                                                                                                                                                                            | :valid                | 用于匹配输入值为合法的元素                 | 3   |
| [:invalid](https://www.runoob.com/cssref/sel-invalid.html ":invalid")                                                                                                                                                                                                                                                                                                                                      | :invalid              | 用于匹配输入值为非法的元素                 | 3   |

# 案例

```纯文本 
1.当全部是 li  不穿插其他元素 情况下：操作除了第一个li元素之外的 好方法 
 ul l i+li{ 
    background: #00ffff
}
```


```纯文本 
2.可悲的事： 
 nth-of-child 系列只支持 标签；不支持class id 之类的
 无效：
    <style>
        li {
            height: 20px;
            background: red;
        }
        ul .box:nth-last-of-type(1){
            background: blue;
        }
    </style>
</head>
<body>
    <ul>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li class="box"></li>
        <li></li>
        <li></li>
        <li></li>
        <p></p>
    </ul>
</body>
```


# 选择器及其优先级详解

### 1. 基本选择器

| 选择器    | 示例                 | 描述                       |
| ------ | ------------------ | ------------------------ |
| 元素选择器  | \`p\`              | 选择所有\`\<p>\`元素           |
| 类选择器   | \`.class\`         | 选择所有\`class="class"\`的元素 |
| ID 选择器 | \`#id\`            | 选择\`id="id"\`的元素         |
| 通配符选择器 | ` *`               | 选择所有元素                   |
| 属性选择器  | \`\[type="text"]\` | 选择具有特定属性的元素              |

### 2. 组合选择器

| 选择器     | 示例           | 描述                           |
| ------- | ------------ | ---------------------------- |
| 后代选择器   | \`div p\`    | 选择\`\<div>\`内所有\`\<p>\`元素    |
| 子元素选择器  | \`div > p\`  | 只选择\`\<div>\`的直接子元素\`\<p>\`  |
| 相邻兄弟选择器 | \`div + p\`  | 选择紧接在\`\<div>\`后的第一个\`\<p>\` |
| 通用兄弟选择器 | \`div \~ p\` | 选择\`\<div>\`后的所有\`\<p>\`兄弟元素 |

### 3. 伪类选择器

| 选择器  | 示例                  | 描述               |
| ---- | ------------------- | ---------------- |
| 动态伪类 | \`a:hover\`         | 鼠标悬停时的状态         |
| 结构伪类 | \`li:nth-child(2)\` | 选择第2个\`\<li>\`元素 |
| 表单伪类 | \`input:disabled\`  | 选择禁用的输入框         |

### 4. 伪元素选择器

| 选择器              | 示例                | 描述               |
| ---------------- | ----------------- | ---------------- |
| \`::before\`     | \`p::before\`     | 在\`\<p>\`内容前插入内容 |
| \`::after\`      | \`p::after\`      | 在\`\<p>\`内容后插入内容 |
| \`::first-line\` | \`p::first-line\` | 选择\`\<p>\`的第一行文本 |

## 二、CSS 优先级规则

### 1. 优先级计算规则

优先级由四个部分组成，按从左到右比较：

```css 
[内联样式, ID选择器, 类/属性/伪类选择器, 元素/伪元素选择器]

```


每个部分的计数相加，数值越大优先级越高。

### 2. 优先级示例

| 选择器             | 计算值     | 优先级      |
| --------------- | ------- | -------- |
| \`style="..."\` | 1,0,0,0 | 最高       |
| \`#id\`         | 0,1,0,0 | 高        |
| \`.class\`      | 0,0,1,0 | 中        |
| \`div\`         | 0,0,0,1 | 低        |
| \`div.class\`   | 0,0,1,1 | 高于单独类或元素 |
| \`#id .class\`  | 0,1,1,0 | 更高       |

### 3. 优先级特殊情况

1. **`!important`**：覆盖所有其他规则（慎用）
2. **相同优先级**：后定义的样式覆盖前面的
3. **继承的样式**：优先级最低

## 三、选择器优化建议

1. **避免过度嵌套**：

```css 
/* 不好 */
body div#container ul li a {}

/* 更好 */
#container a {}
```


1. **优先使用类选择器**：比元素选择器更高效
2. **避免通用选择器**：`*`会匹配所有元素，影响性能
3. **减少使用后代选择器**：**浏览器从右向左解析选择器**
4. **利用继承**：合理使用`inherit`减少重复定义

## 四、选择器性能比较（从高到低）

1. ID 选择器 (`#id`)
2. 类选择器 (`.class`)
3. 元素选择器 (`div`)
4. 后代选择器 (`div a`)
5. 子选择器 (`div > a`)
6. 相邻兄弟选择器 (`div + a`)
7. 通用兄弟选择器 (`div ~ a`)
8. 属性选择器 (`[type="text"]`)
9. 伪类和伪元素 (`:hover`,`::before`)
10. 通配符选择器 (`*`)
