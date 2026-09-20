# &#x20;Image elements do not have explicit width and height 图片设置宽高

## 目录

- [CLS较差的最常见原因是：](#CLS较差的最常见原因是)

这个很好理解就不写案例了————

> **始终在图像和视频元素上包括width和设置height尺寸属性。** 以确保在浏览器开始获取图像之前在页面上分配了足够的空间。**这将最大程度地减少回流和重新布局。**

`<img src="puppy.jpg" width="640" height="360" alt="Puppy with balloons" />`

或者设置height：auto 自适应保真比例也可以

###### CLS较差的最常见原因是：

- 图片无尺寸
- 没有尺寸的广告，嵌入和iframe
- 动态注入的内容
- Web字体导致FOIT / FOUT
- 在更新DOM之前等待网络响应的操作
