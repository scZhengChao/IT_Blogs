# 网页打印尺寸设置

## 目录

- [浏览器打印](#浏览器打印)
- [CSS 打印样式](#CSS-打印样式)
  - [1、@media print](#1media-print)
  - [2、@page](#2page)

## 浏览器打印

在公制长度单位与屏幕分辨率进行换算时，必须用到一个DPI(Dot Per Inch)指标。 &#x20;

经过我仔细的测试，发现了网页打印中，\*\*windows系统默认采用的是96dpi，Mac系统采用的是72dpi  \*\*

**Chrome可直接将网页保存（打印）为PDF（无需安装Adobe）**

**Chrome在保存为PDF文件时，默认纸张大小是A4。若布局为纵向，显示大小为210mm×297mm；若布局为横向，显示大小为297mm×210mm。**

Windows下的网页打印\*\*的默认DPI为96dpi。**按照1英寸=25.41mm换算，A4纸张可实际显示的像素宽度为**794px×1123px，\*\*即打印网页的宽度为794px。

实际打印还会有页边距，如果页边**距为5mm（窄边距）**，网页内容最大**宽度约750px，**若页边**距为19mm（默认边距**），网页内最大元素**分辨率约650px。**

**基于此，很多网页在打印时会变形，因为打印时内容容器的宽度只有750px或者650px，但现在的网页内容大多都是基于至少1000px以上宽度设计的，这时候浮动容器会错位、超过宽度的图片和表格会显示不完全。**

解决办法有两个。

其一，锁定网页的宽度。

**当网页宽度被指定时，页面将被自动缩放。这可以保证PDF文件和浏览器上显示的效果一模一样。这时候打印出的PDF文件仍是A4大小。**

其二，指定打印纸张大小。

```css 
@media print {
    @page {
        size: 210mm 297mm;  /* or size: 794px 1123px;   */
        size: 297mm 420mm;  /* or size: 1123px 1588px;  */
    }
}

```


```javascript 
/* 通过分别设置左页和右页不同的左右页面距，为装订边留出更多的空间 */
   @media print {
    @page {
      size: 1800px 1800px;  /* or size: 1123px 1588px;  */
 
    }
    /* 设置 body 元素的 margin 来保证打印出来的页面带有外边距 */
    body {
      margin: 1cm;
    }
  }

function Print(){
    //根据div标签ID拿到div中的局部内容
        var newStr=document.getElementById("opt-content").innerHTML;
        var oldStr=document.body.innerHTML;
        //把获取的局部div内容赋给body标签, 相当于重置了 body里的内容
        document.body.innerHTML=newStr;
        //调用打印功能
      window.print();
      //重新给页面内容赋值；
        document.body.innerHTML=oldStr;
        return location.reload();
    }

```


A4纸张的尺寸是210×297mm，按1英寸=25.41mm换算，**`即8.264×11.688英寸 `**&#x20;

所以，**A4纸96dpi下的分辨率是794×1123，** 这就是我们在制作网页的时候需要的象素。

&#x20;&#x20;

但是打印机是无法满幅打印的，总要有页边距，所以我们在制作网页的时候必须减去页边距。 &#x20;

以下是我测试的各种页边距下，A4纸对应的象素尺寸： &#x20;

打印页边距设定为 0mm 时，网页内最大元素的分辨率：**794×1123**

`<div style="width:794px;height:1123px;border:1px solid #000000;"> </div>`

打印页边距设定为 5mm 时，网页内最大元素的分辨率：**756×1086**

`<div style="width:756px;height:1086px;border:1px solid #000000;"> </div>`

打印页边距设定为 19.05mm 时，网页内最大元素的分辨率：**649×978**

`<div style="width:649px;height:978px;border:1px solid #000000;"> </div>`

其他的大小，一般标准印刷300dpi时： &#x20;

A4纸的尺寸的图像的像素是2480×3508； &#x20;

A3纸的尺寸的图像的像素是4960×3508； &#x20;

B3纸的尺寸的图像的像素是3248×4300； &#x20;

B4纸的尺寸的图像的像素是3248×2150。

附： &#x20;

A4纸的尺寸：210×297mm &#x20;

A3纸的尺寸：297×420mm

## CSS 打印样式

### 1、@media print

那么怎么控制我们打印内容的样式呢？其实就是将我们的打印样式传给打印机，引入打印文件一般有三种方式。

```css 

//  第一种：媒体查询 @media print
@media print {
    body {
        background-color: white;
    }
    img {
        visibility: hidden;
    }
    a::after {
        content: "(" attr(href) ")"; /* 所有链接后显示链接地址 */
    }
}
 
 
// 第二种：CSS 中使用 @import … print
@import url("my-print-style.css") print;
 
 
// 第三种：在 HTML 中使用 <Link> 标签
<link rel="stylesheet" media="print" href="my-print-style.css”>

```


### 2、@page

用来设置页面大小、边距、方向等。在@page里面可以使用页面[外边距](https://so.csdn.net/so/search?q=外边距\&spm=1001.2101.3001.7020 "外边距")盒子，类似伪类的使用。

```css 
@page {
    size: A4 portrait; /*  */
    margin: 3.7cm 2.6cm 3.5cm; /* 国家标准公文页边距 GB/T 9704-2012 */
}
 
 
// 去除页眉
@page { margin-top: 0; }
 
// 去除页脚
@page { margin-bottom: 0; }
 
// 页眉页脚全部去掉
@page { margin: 0; }
```


设置纸张及其方向 portrait：纵向；  landscape: 横向

```css 
@media print {//media标签
    @page {
        size: A5 portrait; //设置纸张及其方向 portrait：纵向；  landscape: 横向
        margin-top: 0mm;//去掉页眉
        margin-bottom:0mm;//去掉页脚
    }
    h4{
        color:red;//打印时将标签h4设置为红色
    }
}
```
