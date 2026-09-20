# js脚本出发点击上传文件

[ 不使用file类型input也能触发文件上传 «  张鑫旭-鑫空间-鑫生活  介绍全新的File System Access API，也就是文件系统访问API，可以无需专门的 HTML 文件选择控件，纯 JS 代码就可以触发本地文件的选择，支持文件类型的指定，有demo，有代码示意，可以进来了解下。  https://www.zhangxinxu.com/wordpress/2021/08/file-system-access-api/](https://www.zhangxinxu.com/wordpress/2021/08/file-system-access-api/ " 不使用file类型input也能触发文件上传 «  张鑫旭-鑫空间-鑫生活  介绍全新的File System Access API，也就是文件系统访问API，可以无需专门的 HTML 文件选择控件，纯 JS 代码就可以触发本地文件的选择，支持文件类型的指定，有demo，有代码示意，可以进来了解下。  https://www.zhangxinxu.com/wordpress/2021/08/file-system-access-api/")

```html 
<input 
  type="file" 
  id="fileElem" 
  multiple 
  accept="image/*" 
  style="display：none" 
  onchange="handleFiles(this.files)"
>
<a href="#" id="fileSelect">Select some files</a>
```


```javascript 
var fileSelect = document.getElementById("fileSelect"),
    fileElem = document.getElementById("fileElem");
 
fileSelect.addEventListener("click", function (e) {
  if (fileElem) {
    fileElem.click();
  }
  e.preventDefault(); // prevent navigation to "#"
}, false);
```


> **这个地方要注意；必须点击一个地方；然后再去用脚本执行；单纯的用脚本执行是不行的；不会出发弹框的打开**

**原因：**

[ JavaScript判断是人工点击还是脚本触发的事件\_判断触摸事件是用户点击还是程序触发-CSDN博客 文章浏览阅读2.6k次。https://developer.mozilla.org/zh-CN/docs/Web/API/Event/isTrusted概述返回一个布尔值,为true表明当前事件是由用户行为触发(比如说真实的鼠标点击触发一个click事件), 为false表明事件由一个脚本生成的(使用事件构造方法,比如event.initEvent)语法var bool = event.isTru https://blog.csdn.net/qq\_17613195/article/details/95484906](https://blog.csdn.net/qq_17613195/article/details/95484906 " JavaScript判断是人工点击还是脚本触发的事件_判断触摸事件是用户点击还是程序触发-CSDN博客 文章浏览阅读2.6k次。https://developer.mozilla.org/zh-CN/docs/Web/API/Event/isTrusted概述返回一个布尔值,为true表明当前事件是由用户行为触发(比如说真实的鼠标点击触发一个click事件), 为false表明事件由一个脚本生成的(使用事件构造方法,比如event.initEvent)语法var bool = event.isTru https://blog.csdn.net/qq_17613195/article/details/95484906")

**其他的一些方法**

[   https://segmentfault.com/a/1190000014075183](https://segmentfault.com/a/1190000014075183 "   https://segmentfault.com/a/1190000014075183")
