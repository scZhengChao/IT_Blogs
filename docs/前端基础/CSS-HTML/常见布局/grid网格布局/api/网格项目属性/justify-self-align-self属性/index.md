# justify-self/align-self属性

justify-self 属性设置单元格内容的水平位置（左中右），跟 justify-items 属性的用法完全一致，**但只作用于单个项目**。 align-self 属性设置单元格内容的垂直位置（上中下），跟 align-items 属性的用法完全一致，也是只作用于单个项目。

属性值：

- start：对齐单元格的起始边缘。
- end：对齐单元格的结束边缘。
- center：单元格内部居中。
- stretch：拉伸，占满单元格的整个宽度（默认值）。

注意stretch属性只有在单元格内容没有自定义大小的时候才会生效，否则默认效果为对齐单元格的起始边缘。

示例

```typescript 
.container {
    display: grid;
    grid-template-rows: 100px 100px 100px;
    grid-template-columns: 100px 100px 100px;
}
.item-8 {
    width: 80px;
    height: 80px;
    justify-self: center;
    align-self: center;
}
```


页面效果：

![](./assets/image/image_I4SNvaoFGg.png)

限于篇幅本文不再一一展示其他属性的页面效果，大家可以自己一一尝试一下。
