# **hover和focus显示浮层**

我们完全可以只用CSS的父子选择器（用于“父子嵌套”）/兄弟选择器（用于“同级并列排列”）+伪类 :hover

 实现【当鼠标滑入显示xxx】，甚至不用JS！比如：当鼠标滑入链接时显示图片

```css 
img{
      visibility: hidden;
      position: absolute;
      transition: visibility .2s;  /** 设置延时 **/
}
 a:hover + img,
img:hover{
  visibility: visible;
} 

<a href="javascript:;">图片链接</a>
<img src="xxx" alt="" />
```


最后又加了 img:hover是为了让鼠标在图片上滑动时也保持图片的显示状态 —— 防止图片覆盖链接显示的情况。

但是这样会在一种情况下“失效”：无鼠标环境。比如：移动端、智能设备。我们可以再为img加上伪类 :focus来优化体验 —— 聚焦态：

```css 
a:focus + img,
img:focus{
    visibility: visible;
    transition: none;
}
```
