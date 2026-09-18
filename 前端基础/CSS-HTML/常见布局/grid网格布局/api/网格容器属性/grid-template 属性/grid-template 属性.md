# grid-template 属性

grid-template 属性是 grid-template-columns、grid-template-rows 和 grid-template-areas 这三个属性的合并简写形式。

示例：

```typescript 
.container {  
  grid-template:
    [row1-start] "header header header" 25px [row1-end]
    [row2-start] "footer footer footer" 25px [row2-end]
    / auto 50px auto;
}
```


等价于：

```typescript 
.container {  
  grid-template-rows: [row1-start] 25px [row1-end row2-start] 25px [row2-end];  
  grid-template-columns: auto 50px auto;  
  grid-template-areas: 
    "header header header"     
    "footer footer footer";
}
```


使用grid-template属性需要注意以下两点：

- grid-template 属性的取值还可以直接为none，是将所有三个属性设置为其初始值
- grid-template 不会重置隐式网格属性（grid-auto-columns，grid-auto-rows，和 grid-auto-flow)
