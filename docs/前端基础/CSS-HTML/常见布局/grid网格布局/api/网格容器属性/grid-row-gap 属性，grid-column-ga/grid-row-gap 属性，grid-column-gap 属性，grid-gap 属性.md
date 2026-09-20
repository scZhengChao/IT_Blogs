# grid-row-gap 属性，grid-column-gap 属性，grid-gap 属性

三个属性都是用来指定网格线(grid lines)的大小，grid-row-gap 属性定义水平网格线的大小，即行与行的间隔（行间距），grid-column-gap 属性定义垂直网格线的大小，即列与列的间隔（列间距），grid-gap 属性是 grid-column-gap 和 grid-row-gap 的合并简写形式，语法如下：

```typescript 
grid-gap: <grid-row-gap> <grid-column-gap>;
```


示例：

```typescript 
.container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  grid-row-gap: 20px;
  grid-column-gap: 20px;
}
```


页面效果：

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b7d295b44801446c934224e8162497a9~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?)

上面代码等同于：

```typescript 
.container {
   display: grid;
   grid-template-columns: 1fr 1fr 1fr;
   grid-template-rows: 1fr 1fr 1fr;
   grid-gap: 20px 20px;
}
```


注：

如果grid-gap省略了第二个值，浏览器认为第二个值等于第一个值。
根据最新标准，上面三个属性名的grid-前缀已经删除，grid-column-gap和grid-row-gap写成column-gap和row-gap，grid-gap写成gap。
