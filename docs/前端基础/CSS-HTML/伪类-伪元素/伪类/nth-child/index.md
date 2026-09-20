# nth-child

## 目录

- [第一种：简单数字序号写法](#第一种简单数字序号写法)
- [第二种：倍数写法](#第二种倍数写法)
- [第三种：倍数分组匹配](#第三种倍数分组匹配)
- [第四种：反向倍数分组匹配](#第四种反向倍数分组匹配)
- [第五种：奇偶匹配](#第五种奇偶匹配)
- [:nth-last-child](#nth-last-child)

> *`nth-of-type`*\* 选择器只能用在标签后面\*
> `nth-child` 可以用在类名后面

> 注意；即使跟在类名后面；**他也算的是标签的个数；不是以类名的角度计数的**

[ :nth-child() - CSS：层叠样式表 | MDNMDN Web DocsMDN logoMozilla logo CSS :nth-child() 伪类根据元素在父元素的子元素列表中的索引来选择元素。换言之，:nth-child() 选择器根据父元素内的所有兄弟元素的位置来选择子元素。 https://developer.mozilla.org/zh-CN/docs/Web/CSS/:nth-child](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:nth-child " :nth-child() - CSS：层叠样式表 | MDNMDN Web DocsMDN logoMozilla logo CSS :nth-child() 伪类根据元素在父元素的子元素列表中的索引来选择元素。换言之，:nth-child() 选择器根据父元素内的所有兄弟元素的位置来选择子元素。 https://developer.mozilla.org/zh-CN/docs/Web/CSS/:nth-child")

[CSS](https://developer.mozilla.org/zh-CN/docs/Web/CSS "CSS") **`:nth-child()`** [伪类](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Pseudo-classes "伪类")根据元素在父元素的子元素列表中的索引来选择元素。换言之，`:nth-child()` 选择器根据父元素内**的所有兄弟元素的位置来选择子元素**。

**语法：**

```javascript 
:nth-child(an+b)
```


下面就把`CSS3`标准中`nth-child()`用法大致介绍给大家： 

CSS3伪类选择器：`nth-child()` &#x20;
简单的归纳下`nth-child()`的几种用法。

### **第一种：简单数字序号写法**

**`:nth-child(`*****`number`*****`)`**

直接匹配第number个元素。参数\_number\_必须为大于0的整数。

例子：

```javascript 
li:nth-child(3){background:blue;}
```


### **第二种：倍数写法**

**`:nth-child(`*****`an`*****`)`**

匹配所有倍数为a的元素。其中参数\_an\_中的字母\_n\_不可缺省，它是倍数写法的标志，如3n、5n。

例子：

```javascript 
li:nth-child(3n){background:red;}
```


### **第三种：倍数分组匹配**

**`:nth-child(`*****`an+b`*****`)`与** **`:nth-child(`*****`an-b`*****`)`**

先对元素进行分组，每组有\_a\_个，*b\_为组内成员的序号，其中字母\_n\_和加号*+*不可缺省，位置不可调换，这是该写法的标志，其中\_a*,\_b\_均为正整数或0。如3n+1、5n+1。但加号可以变为负号，此时匹配组内的第a-b个。（其实\_an\_前面也可以是负号，但留给下一部分讲。）

例子：

```javascript 
li:nth-child(3n+1){background:red;}

li:nth-child(3n+5){background:blue;}

li:nth-child(5n-1){background:yellow;}

li:nth-child(3n±0){background:green;}

li:nth-child(±0n+3){background:orange;}
```


### **第四种：反向倍数分组匹配**

**`:nth-child(`*****`-an+b`*****`)`**

此处一负一正，均不可缺省，否则无意义。这时与`:nth-child(`*`an+1`*`)`相似，都是匹配第1个，但不同的是它是倒着算的，从第\_b\_个开始往回算，所以它所匹配的最多也不会超过\_b\_个。

例子：

```javascript 
li:nth-child(-3n+8){background:red;}

li:nth-child(-1n+8){background:blue;}
```


### **第五种：奇偶匹配**

**`:nth-child(`*****`odd`*****`) `****与**` `**`:nth-child(`*****`even`*****`)`**

分别匹配序号为奇数与偶数的元素。奇数(odd)与(2n+1)结果一样；偶数(even)与(2n+0)及(2n)结果一样。 &#x20;

作者观点：表格奇偶数行定义样式就可以写成 &#x20;

```javascript 
.table > tr:nth-child(even) > td {background-color: #f00;}  （偶数行）  

.table > tr:nth-child(odd) > td {background-color: #c00;}  （奇数行）
```


# :nth-last-child

和 `nth-child` 基本一致；只是从后往前匹配
