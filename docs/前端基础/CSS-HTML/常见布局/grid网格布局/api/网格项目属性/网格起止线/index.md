# grid-column-start / grid-column-end / grid-row-start / grid-row-end属性

通过引用特定网格线来确定网格项在网格内的位置。 grid-column-start / grid-row-start 是网格项开始的网格线，grid-column-end / grid-row-end 是网格项结束的网格线。

属性值：

- \<line> ：用网格线名称来引用对应网格线。
- span \<number> ：该网格项将跨越所提供的网格轨道数量。
- span \<name> ：该网格项将跨越到它与提供的名称位置
- auto：表示自动放置，自动跨度，默认会扩展一个网格轨道的宽度或者高度

示例：

```typescript 
.container {
    display: grid;
    grid-template-rows: [r1]100px [r2] 100px [r3] 100px [r4];
    grid-template-columns: [c1]100px [c2] 100px [c3] 100px [c4];
    grid-auto-rows: 100px;
}
.item-8 {
    grid-column-start: c2;
    grid-column-end: c4;
}
```


页面效果：

![](<../assets/grid-column-start - grid-colum/image/image_1nQH9A2SRn.webp>)

在上面示例中我们用网格线的名字来引用一个命名的网格线，在介绍 grid-template-columns，grid-template-rows 属性中的2.1网格线名称中说到如果没有直接指定网格线的名称网格线会自动分配正数和负数名称，但实际上即使我们指定了网格线名字我们依然可以通过正数或负数名称来引用网格线，示例：

```typescript 
.container {
    display: grid;
    grid-template-rows: [r1]100px [r2] 100px [r3] 100px [r4];
    grid-template-columns: [c1]100px [c2] 100px [c3] 100px [c4];
    grid-auto-rows: 100px;
}
.item-8 {
    grid-column-start: 2;
    grid-column-end: 4;
    // 等同于grid-column-start: -3; grid-column-end: -1;
}
```


页面效果：

![](<../assets/grid-column-start - grid-colum/image/image_EEPiahypgz.webp>)

因此无论我们是否在grid-template-columns，grid-template-rows属性中指定网格线名称来引用网格线，因此大家最好使用正负数来引用对应网格线。看到这儿大家可能会好奇假如我们没有指定网格线名称，但是依然使用网格线名称来引用网格线会产生什么页面结果？示例：

```typescript 
.container {
    display: grid;
    grid-template-rows: 100px 100px 100px;
    grid-template-columns: 100px 100px 100px;
    grid-auto-rows: 100px;
  }
.item-8 {
    grid-column-start: c2;
    grid-column-end: c4;
 }
```


页面效果：

![](<../assets/grid-column-start - grid-colum/image/image_gGX29-n0NA.webp>)

从上图我们可以发现8号项目结束的网格线实际上就是网格容器的右边界的位置，因此如果网格容器大于网格内容，此时8号项目就会位于显式网格的外部，因此形成了隐式网格，所以页面布局如上图所示，这儿需要大家注意。

示例：

```typescript 
.container {
    display: grid;
    grid-template-rows: 100px 100px 100px;
    grid-template-columns: 100px 100px 100px;
    grid-auto-rows: 100px;
}
.item-8 {
    grid-column-start: -4;
    grid-column-end: span 2;
 }
```


上面代码的含义为网格项开始为名字为-4对应的网格线，然后跨越2个网格轨道，因此页面效果如下图所示：

![](<../assets/grid-column-start - grid-colum/image/image_x8KN2dc2d1.webp>)

属性还可以取span \<name>表示跨越到名字为\<name>的网格线位置，示例：

```typescript 
.container {
    display: grid;
    grid-template-rows: [r1] 100px [r2] 100px [r3] 100px [r4];
    grid-template-columns: [c1] 100px [c2] 100px [c3] 100px [c4];
     grid-auto-rows: 100px;
}
.item-8 {
     grid-column-start: c1;
     grid-column-end: span c3;
}

```


页面效果：

![](<../assets/grid-column-start - grid-colum/image/image_42g7_vnQUN.webp>)

grid-row-start、grid-row-end属性和grid-column-start、grid-column-end属性类型，仅仅是分别定义水平位置和垂直位置的区别。
