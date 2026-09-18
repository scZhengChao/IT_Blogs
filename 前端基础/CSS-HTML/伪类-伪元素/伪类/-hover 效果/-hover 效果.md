# :hover 效果

## 目录

- [父对子
  ](#父对子)
- [子对父
  ](#子对父)
- [同级控制](#同级控制)

**父对子**

是指父元素触发hover事件，并且控制父元素中的子元素做出响应。

```javascript 
<div class="d1">
  <p class="p1">hello</p>
</div>

.d1:hover .p1{
  color:#fff
}

```


当鼠标移入d1时触发hover事件，其子元素p1的color变为#fff

**子对父**

指子元素触发hover事件时，其父元素做出相关相应。

```javascript 
<div class="d1">
  <p class="p1">hello</p>
</div>

.p1:hover ~ .d1{
  background-color: #fff;
}

```


使用`~`号**标签来实现对上层元素的控制**，当然通过\*\*该标签其实是可以控制任意元素的，不仅仅是父元素。
\*\*

# **同级控制**

指处在统一层级的元素的hover控制关系。

```javascript 
<div class="d1">
  <p class="p1">hello</p>
</div>
<div class="d2">
  <p class="p1">hello</p>
</div>

.d1:hover + .d2{
  background-color: #fff;
}
.d1:hover + .d2 .p1{
  color: #fff;
}

```


[平滑transition效果](平滑transition效果.md "平滑transition效果")
