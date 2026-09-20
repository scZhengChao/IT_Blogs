# 入门

```svg 
<svg version="1.1"
     baseProfile="full"
     width="300" height="200"
     xmlns="http://www.w3.org/2000/svg">

  <rect width="100%" height="100%" fill="red" />

  <circle cx="150" cy="100" r="80" fill="green" />

  <text x="150" y="125" font-size="60" text-anchor="middle" fill="white">SVG</text>

</svg>

```


复制并粘贴代码到文件 demo1.svg。然后在浏览器中打开该文件。它将会呈现为下面的截图。（Firefox 用户点击[这里](https://mdn.dev/archives/media/attachments/2012/07/09/3075/89b1e0a26e8421e19f907e0522b188bd/svgdemo1.xml "这里")）

![](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Tutorial/Getting_Started/svgdemo1.png)

绘制流程包括以下几步：

1. 从[\<svg>](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Element/svg "<svg>")根元素开始：
   - 应舍弃来自 (X)HTML 的 doctype 声明，因为基于 DTD 的 SVG 验证导致的问题比它能解决的问题更多。
   - SVG 2 之前`version`属性和`baseProfile`属性用来供其他类型的验证识别 SVG 的版本。SVG 2 已弃用`version`和`baseProfile`这两个属性。
   - 作为 XML 的一种方言，SVG 必须正确的绑定命名空间（在 xmlns 属性中绑定）。请阅读[命名空间速成](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Namespaces_Crash_Course "命名空间速成")页面获取更多信息。
2. 绘制一个完全覆盖图像区域的矩形[\<rect>](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Element/rect "<rect>")，把背景颜色设为红色。
3. 一个半径 80px 的绿色圆圈[\<circle>](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Element/circle "<circle>")绘制在红色矩形的正中央（向右偏移 150px，向下偏移 100px）。
4. 绘制文字“SVG”。文字被填充为白色，通过设置居中的锚点把文字定位到期望的位置：在这种情况下，中心点应该对应于绿色圆圈的中点。还可以精细调整字体大小和垂直位置，确保最后的样式是美观的。
5. 最值得注意的一**点是元素的渲染顺序。SVG 文件全局有效的规则是“后来居上”，越后面的元素越可见。**
