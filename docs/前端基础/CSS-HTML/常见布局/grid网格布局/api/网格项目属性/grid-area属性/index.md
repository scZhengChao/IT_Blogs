# grid-area属性

指定项目放在哪一个区域，示例：

```typescript 
.container{
    display: grid;
    grid-template-columns: 100px 100px 100px;
    grid-template-rows: 100px 100px 100px;
    grid-template-areas: 'a b c'
                         'd e f'
                         'g h i';
}
.item-8 {
  grid-area: e;
}
```


页面效果：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d6d1b36dc8a24454b3bfde2747ccce5f~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?)

grid-area属性还可用作 grid-row-start、grid-column-start、grid-row-end、grid-column-end 的合并简写形式，直接指定项目的位置。

代码形式：

```typescript 
grid-area: <row-start> / <column-start> / <row-end> / <column-end>;
```


因此下面示例的页面效果跟上面一致。

```typescript 
.item-8 {
  grid-area: 2 / 2 / 3 / 3;
}
```
