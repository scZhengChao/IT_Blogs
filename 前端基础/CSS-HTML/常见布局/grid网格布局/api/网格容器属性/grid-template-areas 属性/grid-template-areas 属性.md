# grid-template-areas 属性

定义网格布局中网格区域(Grid Area)，一个网格区域由单个或多个单元格组成，重复网格区域的名称可让区域内容跨越这些单元格。

取值：

- grid-area-name：由网格项的 grid-area 指定的网格区域名称
- .（点号） ：代表一个空的网格单元
- none：不定义网格区域

示例：

```typescript 
grid-template-areas: 'a a a'
                     'b b b'
                     'c c c';
```


上面代码将9个单元格分成a、b、c三个区域。 示例：

```typescript 
grid-template-areas: "header header header"
                     "main main sidebar"
                     "footer footer footer";
```


上面代码中，顶部是页眉区域header，底部是页脚区域footer，中间部分则为main和sidebar。
注意，区域的命名会影响到网格线。每个区域的起始网格线，会自动命名为区域名-start，终止网格线自动命名为区域名-end。比如，区域名为 header，则起始位置的水平网格线和垂直网格线叫做 header-start，终止位置的水平网格线和垂直网格线叫做 header-end。注意此处是自动命名，我们无法通过 grid-template-areas 属性来自定义网格线名称。
