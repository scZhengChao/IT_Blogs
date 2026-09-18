# 1px问题

## 目录

- [vant-ui方案](#vant-ui方案)
- [viewport](#viewport)

在Retina Display 屏幕1px 其实是逻辑像素 1pt； 应为移动端有dpi；

# vant-ui方案

参考vant-ui的设计用伪元素实现：

```sass (scss)  

.van-hairline, 
.van-hairline--top, 
.van-hairline--left, 
.van-hairline--right, 
.van-hairline--bottom, 
.van-hairline--surround, 
.van-hairline--top-bottom {
     position: relative;
}

[class*='van-hairline']::after {
  position: absolute;
  box-sizing: border-box;
  content: ' ';
  pointer-events: none;
  top: -50%;
  right: -50%;
  bottom: -50%;
  left: -50%;
  border: 0 solid #ebedf0;
  -webkit-transform: scale(0.5);
  transform: scale(0.5);
}
.van-hairline--top::after {
  border-top-width: 1px;
}
.van-hairline--left::after {
  border-left-width: 1px;
}
.van-hairline--right::after {
  border-right-width: 1px;
}

```


# viewport

同时通过设置对应viewport的rem基准值，这种方式就可以像以前一样轻松愉快的写1px了。原来我们的px实际上是pt；现在变成真正的px了

```sass (scss)  
在devicePixelRatio = 2 时，输出viewport：
<meta name="viewport" content="initial-scale=0.5, maximum-scale=0.5, minimum-scale=0.5, user-scalable=no">
在devicePixelRatio = 3 时，输出viewport：
<meta name="viewport" content="initial-scale=0.3333333333333333, maximum-scale=0.3333333333333333, minimum-scale=0.3333333333333333, user-scalable=no">




接下来的任务就是js的动态修改缩放比 以及 实现rem根元素字体大小的设置。
var viewport = document.querySelector("meta[name=viewport]")
if (window.devicePixelRatio == 1) {
    viewport.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no')
}
if (window.devicePixelRatio == 2) {
    viewport.setAttribute('content', 'width=device-width, initial-scale=0.5, maximum-scale=0.5, minimum-scale=0.5, user-scalable=no')
}
if (window.devicePixelRatio == 3) {
    viewport.setAttribute('content', 'width=device-width, initial-scale=0.333333333, maximum-scale=0.333333333, minimum-scale=0.333333333, user-scalable=no')
}
var docEl = document.documentElement;
var fontsize = 10 * (docEl.clientWidth / 320) + 'px';
docEl.style.fontSize = fontsize;
```
