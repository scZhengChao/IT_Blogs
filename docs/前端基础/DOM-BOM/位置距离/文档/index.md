# 文档

## 目录

- [1.2 文档区宽高（只读）](#12-文档区宽高只读)
- [1.3 整个浏览器窗口的宽高（只读）outerWidth、outerHeight](#13-整个浏览器窗口的宽高只读outerWidthouterHeight)
- [1.4 pageXOffset、pageYOffset](#14-pageXOffsetpageYOffset)
- [1.5网页可见区域（视口宽高）](#15网页可见区域视口宽高)
- [1.6网页全文](#16网页全文)

### 1.2 文档区宽高（只读）

文档区宽高（不含工具栏、控制台等，只是网页显示区域的宽高）注意：包含滚动条

```javascript 
window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
```


> innerWidth是非IE写法，document是IE写法

window\.innerHeight/innerWidth         "浏览器的宽度/高度 和页面的高度无关"

![](./image/image_fckeSiociy.png)

### 1.3 整个浏览器窗口的宽高（只读）outerWidth、outerHeight

不支持IE，IE没有获取整个浏览器窗口的宽高的方法

![](./image/image_CDKrPgnGMx.png)

### 1.4 pageXOffset、pageYOffset

`window.pageXOffset`和`window.pageYOffset`用于计算文档的水平和垂直滚动时的偏移量。因此，可以了解用户已经滚动了多少

- 设置或读取当前页面相对于窗口显示区左上角的 X/Y 位置

![](https://i-blog.csdnimg.cn/blog_migrate/a62d8974bd7bdcbc89776b455588862b.gif)

# 1.5网页可见区域（视口宽高）

s += "\r\n网页可见区域宽："+ document.body.clientWidth;
s += "\r\n网页可见区域高："+ document.body.clientHeight;

s += "\r\n网页可见区域宽："+ document.body.offsetWidth  +" (包括边线和滚动条的宽)";
s += "\r\n网页可见区域高："+ document.body.offsetHeight +" (包括边线的宽)";

# 1.6网页全文

s += "\r\n网页正文全文宽："+ document.body.scrollWidth;
s += "\r\n网页正文全文高："+ document.body.scrollHeight;

s += "\r\n网页被卷去的高："+ document.body.scrollTop;
s += "\r\n网页被卷去的左："+ document.body.scrollLeft;

![](./image/image_t5WnX49UIv.png)

```javascript 
// 浏览器窗口相对于屏幕左上角的水平位置
const windowScreenX = window.screenX/screenLeft;
// 浏览器窗口相对于屏幕左上角的垂直位置
const windowScreenY = window.screenY/screenTop;



```


[7种Height的比较](./7种Height的比较/index.md "7种Height的比较")
