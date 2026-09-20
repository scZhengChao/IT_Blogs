# 隐藏滚动条

## 目录

- [隐藏滚动条还能滚动（纵向）](#隐藏滚动条还能滚动纵向)

#### **隐藏滚动条还能滚动（纵向）**

```javascript 
 方法一： 计算滚动条宽度并隐藏起来 
 <div class="outer-container"> 
     <div class="inner-container"> 
         ...... 
     </div> 
 </div> 
 .outer-container{ 
         width: 360px; 
         height: 200px; 
         position: relative; 
         overflow: hidden; 
 } 
 .inner-container{ 
         position: absolute; 
         left: 0; 
         top: 0; 
         right: -17px; 
         bottom: 0; 
         overflow-x: hidden; 
         overflow-y: scroll; 
 } 
 这个代码巧妙的向右移动了17个像素，刚好等于滚动条的宽度。这个值是我手动调试得来的。在chrome和IE没发现问题。 
 
 方法2：使用三个容器包围起来，不需要计算滚动条的宽度 
 <div class="outer-container"> 
      <div class="inner-container"> 
         <div class="content"> 
             ...... 
         </div> 
      </div> 
 </div> 
 .element, .outer-container { 
   width: 200px; 
   height: 200px; 
 } 
 
 
 .outer-container { 
   border: 5px solid purple; 
   position: relative; 
   overflow: hidden; 
 } 
 
 
 .inner-container { 
   position: absolute; 
   left: 0; 
   overflow-x: hidden; 
   overflow-y: scroll; 
 } 
 
 
 .inner-container::-webkit-scrollbar { 
   display: none; 
 } 
 
 方法3：css隐藏滚动条 
 chrome 和Safari 
 .element::-webkit-scrollbar { width: 0 !important } 
 IE 10+ 
 .element { -ms-overflow-style: none; } 
 Firefox 
 .element { overflow: -moz-scrollbars-none; }
```


**2.当项目里有swiper时，可以用swiper来去掉滚动条**

记住给silder 加上width：auto

**每个内容单独放在slide里，下下策；**

**放在一个slider里记住slider的宽度和高度不能固定；；min-with都不行；上策；min-width 和 auto的区别**
