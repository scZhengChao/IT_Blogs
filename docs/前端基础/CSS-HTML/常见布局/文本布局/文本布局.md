# 文本布局

## 目录

- [文本垂直居中](#文本垂直居中)
- [竖向布局](#竖向布局)

# **文本垂直居中**

```css 
//table-cell vertical-align: middle;
.tab{
    width: 100px;
    height: 100px;
     display: table-cell;
    vertical-align: middle;
     border: 1px solid black;
    text-align: center;
}
```


# **竖向布局**

```html 
 writing-mode: horizontal-tb | vertical-rl | vertical-lr | sideways-rl | sideways-lr 
 * horizontal-tb：水平方向自上而下的书写方式。即 left-right-top-bottom 
 * vertical-rl：垂直方向自右而左的书写方式。即 top-bottom-right-left 
 * vertical-lr：垂直方向内内容从上到下，水平方向从左到右 
 * sideways-rl：内容垂直方向从上到下排列 
 * sideways-lr：内容垂直方向从下到上排列 
 
 
 <!DOCTYPE html> 
 <html> 
 <head> 
     <style> 
         #mainBox { 
             border: 1px #f00 solid; 
             width: 300px; 
             height: 230px; 
             writing-mode: vertical-lr; 
             /* -webkit-column-count: 6; 
             -moz-column-count: 6; 
             -webkit-column-gap: 10px; 
             -moz-column-gap: 10px; */ 
         } 
         #mainBox a { 
             margin: 5px; 
             padding: 0px; 
             display: inline-block; 
             width: 30px; 
             height: 30px; 
             border: 1px #00f solid; 
             /* writing-mode: sideways-rl;  */ 
 
 
             /* writing-mode: sideways-lr;  */ 
             writing-mode:horizontal-tb; 
         } 
     </style> 
 </head> 
 <body> 
     <div id="mainBox"> 
         <a href="#">12</a> 
         <a href="#">12</a> 
         <a href="#">12</a> 
         <a href="#">12</a> 
         <a href="#">12</a> 
         <a href="#">12</a> 
         <a href="#">12</a> 
     </div> 
 </body> 
 </html>
```
