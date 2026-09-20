# 百分比的大小

## 目录

- [padding百分比特点：](#padding百分比特点)
- [margin百分比特点：](#margin百分比特点)
- [position: fixed 中的百分比值计算基准](#position-fixed-中的百分比值计算基准)
  - [与其他定位方式的比较](#与其他定位方式的比较)
  - [translate百分比特点](#translate百分比特点)
    - [如果是百分比，会以本身的长宽做参考](#如果是百分比会以本身的长宽做参考)
- [border-radius 百分比](#border-radius-百分比)

#### padding百分比特点：

padding的**百分比是相对于父元素宽度**，如果父元素有宽度，相对于父元素宽度，如果没有，找其父辈元素的宽度，均没设宽度时，相对于屏幕的宽度。

### margin百分比特点：

对元素的 margin（外边距）设置百分数值：百分数是相对于**父元素的width**来计算的。

```javascript 
 <div class="contain">
     <div class="d1"></div>
</div>
 .contain{
           width: 500px;
           height:400px;
       }
       .d1{
           width:100px;
           height: 100px;
           background:#af2727;
           margin: 1%;
       }
```


控制台中查看 d1 盒子情况：

![](https://img-blog.csdnimg.cn/20191115150905112.png)

可以发现：margin的 top，right，bottom，left都是 5px，即相对于width计算得出。

为什么是相对于父元素的 width 呢？《CSS权威指南》中是这样说的：

> 正常流中的大多数元素都会足够高以包含其后代元素(包括其外边距)。如果一个元素的上下外边距是父元素的height的一个百分数，就可能导致一个无限循环，父元素的height会增加，以适应后代元素上下外边距的增加，而相应地，上下外边距又必须增加，以适应新的父元素height,如此继续。

# position: fixed 中的百分比值计算基准

- `left`和`right`的百分比值是相对于视口的宽度
- `top`和`bottom`的百分比值是相对于视口的高度

## 与其他定位方式的比较

| 定位方式           | 百分比基准                       | 是否脱离文档流 | 是否随滚动移动 |
| -------------- | --------------------------- | ------- | ------- |
| \`static\`(默认) | 不适用                         | 否       | 是       |
| \`relative\`   | 相对于\*\*自身原始位置\*\*           | 否       | 是       |
| \`absolute\`   | 相对于最近的\*\*非static定位祖先元素\*\* | 是       | 是       |
| \`fixed\`      | 相对于\*\*视口\*\*               | 是       | 否       |
| \`sticky\`     | 相对于\*\*最近的滚动祖先和视口\*\*       | 否       | 部分      |

## translate百分比特点

##### 如果是百分比，会以本身的长宽做参考

# border-radius 百分比

`border-radius`属性在使用百分比值时，其基准是**元素自身的宽度和高度**，而不是父元素或其他参考物。
