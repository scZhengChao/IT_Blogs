# 伪类

## 目录

- [伪类](#伪类)
- [伪元素](#伪元素)

在一个网页中CSS占着非常重要的地位。**近年来随着CSS的发展，伪元素/伪类也开始被大量应用**：在性能愈加被看中的当下，处于

**文档流之外的CSS伪元素/伪类是当之无愧的“无冕之王” ！**

**css3为了区分伪类和伪元素，伪元素采用双冒号写法。**

### 伪类

w3cSchool对于伪类的定义是”**伪类用于定义元素的特殊状态“**。向我们常用到的`:link`、`:hover`、`:active`、`:first-child`,等都是伪类，全部伪类比较多，大家感兴趣的话可以去官方文档了解一下

### 伪元素

至于伪元素，w3cSchool的定义是”CSS 伪元素用于设置元素指定部分的样式“，光看定义我是搞不懂，其实我们只要记住有哪些东西就好了，伪元素**共有5个**，分别是`::before`、`::after`、`::first-letter`、`::first-line`和`::selection`

> 伪类和伪元素可以叠加使用，如`.sbu-btn:hover::before`

[:has](./-has/index.md ":has")

[:is](./-is/index.md ":is")

[:where ](./-where-/index.md ":where ")

[:not](./-not/index.md ":not")

[nth-child](./nth-child/index.md "nth-child")

[nth-of-type](./nth-of-type/index.md "nth-of-type")

[:active](./-active/index.md ":active")

[:target](./-target/index.md ":target")

[:focus](./-focus/index.md ":focus")

[:hover 效果](<./-hover 效果/index.md> ":hover 效果")

[:focus-within](./-focus-within/index.md ":focus-within")
