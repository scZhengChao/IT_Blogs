# justify-content 属性

定义整个内容区域在容器里面的水平对齐方式（左中右）

属性值：

- start：将网格对齐到 网格容器(grid container) 的左侧起始边缘（左侧对齐）
- end：将网格对齐到 网格容器 的右侧结束边缘（右侧对齐）
- center：将网格对齐到 网格容器 的水平中间位置（水平居中对齐）
- stretch：调整 网格项(grid items) 的宽度，允许该网格填充满整个网格容器的宽度
- space-around：在每个网格项之间放置一个均匀的空间，左右两端放置一半的空间
- space-between：在每个网格项之间放置一个均匀的空间，左右两端没有空间
- space-evenly：在每个网格项目之间放置一个均匀的空间，左右两端放置一个均匀的空间

示例：

```typescript 
.container {
  width: 350px;
  height: 350px;
  border: 2px dashed gray;
  display: grid;
        grid-template-rows: 100px 100px 100px;
        grid-template-columns: 100px 100px 100px;
        justify-content: start;
}
.item {
  text-align: center;
    color: #fff;
        border: 1px solid #fff;
    background: lightblue;    
}
```


页面效果：

![](./image/image_ugDPkZQAqL.png)

```typescript 
justify-content: end;
```


![](./image/image_b3e00DoeyY.png)

```typescript 
justify-content: center;

```


![](./image/image_P2X5jeqGct.png)

```typescript 
justify-content: space-around;

```


![](./image/image_YuCT0nbhLD.png)

```typescript 
justify-content: space-between;
```


![](./image/image_cok6hlu5q-.png)

```typescript 
justify-content: space-evenly;

```


![](./image/image_Ngmok6d5yg.png)

注意：只有当项目宽度没有指定时，`justify-content: stretch;`才会使得整个内容区域在水平方向拉伸占据整个网格容器，如果指定了项目宽度页面效果与`justify-content: start;`相同。 不指定项目宽度后，显示效果如图所示：

![](./image/image_SOaK7Le_8C.png)
