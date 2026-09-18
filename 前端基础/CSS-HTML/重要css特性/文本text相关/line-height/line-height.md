# line-height

## 目录

- [line-height三种赋值的区别（带单位，纯数字，百分比）](#line-height三种赋值的区别带单位纯数字百分比)

# `line-height`三种赋值的区别（带单位，纯数字，百分比）

`line-height`是可以继承的，由于这个特性，子元素就可以不用重复定义`line-height`

1.带单位：`px`不用计算，直接把它传递给后代，`em`则是乘以父级的`font-size`，`rem`则是乘以`html`的`font-size`；

2.纯数字：例如父级行高为`1.5`，子元素字体为`18px`，则子元素行高为`1.5*18=27px`；

3.百分比：先计算自己行高，然后将计算后的值传递给后代。

***

1. `normal` 没什么太多可讲的，这是 `line-height` 的默认值。它实际表现等同于 `1.1 ~ 1.2`
2. `number` 指不带单位的数值。它的计算值是 `line-height` 乘当前元素的 `font-size`

   假设我现在指定 `font-size: 20px; line-height: 1.2;` ， `line-height` 最后实际值为 `20px * 1.2 = 24px`
3. `length` 就是直接指定带单位的值，如 `px` , `em`
4. `percentage` 就是指百分比。它的计算值是百分比乘当前元素的 `font-size`
5. `inherit` 因为浏览器实现方式差异较大，故不推荐使用
