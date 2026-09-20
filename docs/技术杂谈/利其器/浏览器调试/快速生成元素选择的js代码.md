# 快速生成元素选择的js代码

选中元素后，右键copy js path，可以快速生成选中当前元素的js代码；

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/690e5649f5784d0eb28d51099aa1c727~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?)

剪贴板粘贴：&#x20;

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f2f64f79d4844cff9555017311ddb567~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?)

> 另外顺便一提，在console中使用$以及$\$也可以用较短的js代码快速对元素进行选择，代替“document.querySelector”和“document.querySelectorAll”

```javascript 
$("span")
控制台输出：<span class=​"byte-select__suffix byte-select__suffix--down">​…​</span>​
$$("button")
控制台输出：(5) [button.xitu-btn.with-padding.xitu-btn-outline, button.xitu-btn, button.select-btn, button.ui-btn.btn.line.medium.default, button.ui-btn.btn.primary.medium.default]

```
