# grid属性

在一个声明中设置所有以下属性的简写： grid-template-rows, grid-template-columns, grid-template-areas, grid-auto-rows, grid-auto-columns, 和 grid-auto-flow 。（注意：只能在单个网格声明中指定显式或隐式网格属性）。

属性值：

- none：将所有子属性设置为其初始值。
- \<grid-template>：与grid-template 简写的工作方式相同。
- \<grid-template-rows> / \[ auto-flow && dense? ] \<grid-auto-columns>? ：将grid-template-rows 设置为指定的值。 如果 auto-flow 关键字位于斜杠的右侧，则会将 grid-auto-flow 设置为 column。 如果另外指定了 dense 关键字，则自动放置算法使用 “dense” 算法。 如果省略 grid-auto-columns ，则将其设置为 auto。
- \[ auto-flow && dense? ] \<grid-auto-rows>? / \<grid-template-columns>：将 grid-template-columns 设置为指定值。 如果 auto-flow 关键字位于斜杠的左侧，则会将grid-auto-flow 设置为 row 。 如果另外指定了 dense 关键字，则自动放置算法使用 “dense” 打包算法。 如果省略 grid-auto-rows ，则将其设置为 auto。

示例1：

```typescript 
.container {  
  grid: 100px 300px / 3fr 1fr;
}
```


等价于：

```typescript 
.container {  
  grid-template-rows: 100px 300px;  
  grid-template-columns: 3fr 1fr;
}
```


示例2：

```typescript 
.container {  
  grid: auto-flow / 200px 1fr;
}
```


等价于：

```typescript 
.container {  
  grid-auto-flow: row;  
  grid-template-columns: 200px 1fr;
}
```


示例3：

```typescript 
.container {  
  grid: auto-flow dense 100px / 1fr 2fr;
}
```
