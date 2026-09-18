# **模拟: placeholder**

```html 
.edit-div:empty:before {
    content: 'placeholder';
    display: block;
    color: #ccc;
}
如何模拟 可见 框架组件内div可输入

实现可编辑的竖向排列
<div class="abc"  contenteditable=true> </div>
.abc{
    width: 50px;
    height: 400px;
    border: 2px solid red;
    box-sizing: border-box;
    padding: 10px;
    font-size: 30px;
    /* -webkit-user-select:text; */
    overflow-y: auto;
    overflow-x: hidden;
}
 .abc:empty::before{ 
    content: '请输入你的名字';
}
```


```css 
 修改placehoder 的样式:  注意兼容 
         input::-webkit-input-placeholder{ 
             color:red; 
         } 
         input::-moz-placeholder{   /* Mozilla Firefox 19+ */ 
             color:red; 
         } 
         input:-moz-placeholder{    /* Mozilla Firefox 4 to 18 */ 
             color:red; 
         } 
         input:-ms-input-placeholder{  /* Internet Explorer 10-11 */ 
             color:red; 
         } 
 ios 上placeholder 不居中：  pading-top 把文字顶下来
```
