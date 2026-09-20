# **:focus-within下拉列表（二级菜单）**

事实上，在下拉列表中。我不建议使用“非父子关系的并列元素” —— 如果你只是单纯的使用css的话。问题就出在focus上：**:focus**

**只有在当前元素处于聚焦状态时才匹配**。那么，这就需要一系列方案去单纯的解决这个问题，比如上面设置transition延时就是为了这个效果。但其实这还是“不算问题的问题”：因为浏览器支持了新规范：:**focus-within**

**，它规定“在当前元素或是当前元素的任意子元素处于聚焦状态时都会匹配”**！它本质上是一种“父选择器行为”：

```css 
 <div class="y-table"> 
         <a href="javascript:;" class="y-msg">我的消息</a> 
         <div class="cs-list"> 
              <a href="javascript:;">我的回答</a> 
              <a href="javascript:;">我的私信</a> 
              <a href="javascript:;">我的订单</a> 
              <a href="javascript:;">我的关注</a> 
              <a href="javascript:;">我的收藏</a> 
          </div> 
    </div> 
 
 .cs-list{ 
   display: none; 
   position: absolute; 
   border: 1px solid red; 
   background-color: #fff; 
 } 
 .y-table:focus-within .cs-list{ 
   display: block; 
 }
```
