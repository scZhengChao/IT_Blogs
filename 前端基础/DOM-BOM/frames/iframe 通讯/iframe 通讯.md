# iframe 通讯

## 目录

- [参考文档](#参考文档)
- [属性](#属性)
- [案例](#案例)
- [判断页面是否被iframet](#判断页面是否被iframet)
- [禁止被iframe](#禁止被iframe)

# 参考文档

[*https://www.cnblogs.com/lvhw/p/7107436.html*](https://www.cnblogs.com/lvhw/p/7107436.html "https://www.cnblogs.com/lvhw/p/7107436.html")

[*https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/iframe*](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/iframe "https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/iframe")

# 属性

iframe常用属性:

1.frameborder:是否显示边框，1(yes),0(no)

2.height:框架作为一个普通元素的高度，建议在使用css设置。

3.width:框架作为一个普通元素的宽度，建议使用css设置。

4.name:框架的名称，window\.frames\[name]时专用的属性。

5.scrolling:框架的是否滚动。yes,no,auto。

6.src：内框架的地址，可以使页面地址，也可以是图片的地址。

7.srcdoc , 用来替代原来HTML body里面的内容。但是IE不支持, 不过也没什么卵用

8.sandbox: 对iframe进行一些列限制，IE10+支持

# 案例

[testLib.rar](testLib_-EoCMHVK0B.rar "testLib.rar")

postMessage是html5引入的API,postMessage()方法允许来自不同源的脚本采用异步方式进行有效的通信,可以实现跨文本文档,多窗口,跨域消息传递.多用于窗口间数据通信,这也使它成为跨域通信的一种有效的解决方案.

# 判断页面是否被iframet

```typescript 
//判断页面是否被iframe有三种方法
//方式一
if (self.frameElement && self.frameElement.tagName == "IFRAME") {
  alert('在iframe中');
}
//方式二
if (window.frames.length != parent.frames.length) {
  alert('在iframe中');
}
//方式三
if (self != top) {
  alert('在iframe中');
}
```


# 禁止被iframe

```typescript 
//禁止页面被别人iframe了
<script language="JavaScript">
try{
　　top.location.hostname;
　　if (top.location.hostname != window.location.hostname) {
　　　　top.location.href =window.location.href;
　　}
}
catch(e){
　　top.location.href = window.location.href;
}
</script> 
```


[导航](导航.md "导航")

[通讯](IT/前端基础/DOM-BOM/frames/iframe%20通讯/通讯/通讯.md "通讯")

[window](IT/前端基础/DOM-BOM/frames/iframe%20通讯/window/window.md "window")
