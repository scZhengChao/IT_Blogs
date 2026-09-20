# iframe

## 目录

- [第一、在iframe中查找父页面元素的方法：](#第一在iframe中查找父页面元素的方法)
- [第二、在父页面中获取iframe中的元素方法：](#第二在父页面中获取iframe中的元素方法)
- [第三、在iframe中调用父页面中定义的方法和变量：](#第三在iframe中调用父页面中定义的方法和变量)
- [jquery 在iframe子页面获取父页面元素代码如下:](#jquery-在iframe子页面获取父页面元素代码如下)
- [jquery在父页面 获取iframe子页面的元素 代码如下:](#jquery在父页面-获取iframe子页面的元素-代码如下)
- [js 在iframe子页面获取父页面元素代码如下:](#js-在iframe子页面获取父页面元素代码如下)
- [js 在父页面获取iframe子页面元素代码如下:](#js-在父页面获取iframe子页面元素代码如下)
- [子类iframe内调用父类函数](#子类iframe内调用父类函数)
- [高度自适应](#高度自适应)

### 第一、在iframe中查找父页面元素的方法：

`$('#id', window.parent.document)`

### 第二、在父页面中获取iframe中的元素方法：

`$(this).contents().find("#suggestBox")`

### 第三、在iframe中调用父页面中定义的方法和变量：

`parent.method `

`parent.value`

### jquery 在iframe子页面获取父页面元素代码如下:

`$("#objid", parent.document)`

### jquery在父页面 获取iframe子页面的元素 代码如下:

`$("#objid",document.frames('iframename').document)`

### js 在iframe子页面获取父页面元素代码如下:

` window.parent.document.getElementByIdx_x("元素id");`

### js 在父页面获取iframe子页面元素代码如下:

`window.frames["iframe_ID"].document.getElementByIdx_x("元素id");`

### 子类iframe内调用父类函数

`window.parent.func();`

# 高度自适应

嵌入iframe，加入onload事件

```html 
<iframe id="bi_iframe" src="http://xx.xx.xx.xx/yourServicePath&para1=xxx" onload="adjustIframe();" 
        frameborder="0" scrolling="auto">
</iframe>
```


添加自适应js

```javascript 
function adjustIframe(){
        var ifm= document.getElementById("bi_iframe");
        ifm.height=document.documentElement.clientHeight;
        ifm.width=document.documentElement.clientWidth;
}
```
