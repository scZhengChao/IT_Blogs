# ios 回弹

## 目录

- [禁止ios H5的回弹效果](#禁止ios-H5的回弹效果)
  - [ios 滚动和 屏幕的回弹效果相互影响](#ios-滚动和-屏幕的回弹效果相互影响)

问题描述：手指按住屏幕下拉，屏幕顶部会多出一块白色区域。手指按住屏幕上拉，底部多出一块白色区域。

产生原因：在 iOS 中，手指按住屏幕上下拖动，会触发 touchmove 事件。这个事件触发的对象是整个 webview 容器，容器自然会被拖动，剩下的部分会成空白。

```javascript 
document.body.addEventListener(  
  'touchmove',  
  function(e) {  
    if (e._isScroller) return  
    // 阻止默认事件  
    e.preventDefault()  
  },  
  {  
    passive: false  
  }  
)

```


# 禁止ios H5的回弹效果

[https://www.cnblogs.com/haqiao/p/10417366.html](https://www.cnblogs.com/haqiao/p/10417366.html "https://www.cnblogs.com/haqiao/p/10417366.html")

IOS的移动端/H5/webapp 页面如果滚动到底部或者在页面顶部再往上拉，都会出现一个回弹的效果。想取消这个效果可以引入一个简单的库就行，不用再写繁琐的样式。[github地址](https://github.com/lazd/iNoBounce "github地址")直接引入就行

```javascript 
 <script src="inobounce.js"></script>
```


&#x20;      \*\*因为这个库是禁止了整个页面的滑动，所以如果页面中有其他元素需要滑动的，要给滑动元素设置一个height或max-height,还有overflow: auto; -webkit-overflow-scrolling: touch; \*\*

[https://www.cnblogs.com/ypppt/p/13330958.html](https://www.cnblogs.com/ypppt/p/13330958.html "https://www.cnblogs.com/ypppt/p/13330958.html")

在ios中为了让滑动更流畅，不那么生涩，我们需要使用-webkit-overflow-scrolling属性，如下：-webkit-overflow-scrolling : touch;

           其工作原理是：在有这个属性的容器上，系统会创建了一个uiscrollview，应用于该元素并将之作为渲染对象，从而为我们实现体验流畅的触屏滑动。在ios上的表现结果令人十分满意，并且网页滑动和区域滑动的冲突同样解决的很好。

        但是在safari、微信等浏览器中会出现下拉回弹和上拉空白的效果。解决办法为：当滚动区滚到顶部时，手再触屏时，把把div的滚动位置向下调一点点，这样系统就会以为还没有滚到头，就会继续滑动。

```javascript 
var overscroll = function(el) {
    el.addEventListener('touchstart', function() {
        var top = el.scrollTop 
        ,totalScroll = el.scrollHeight
         ,currentScroll = top + el.offsetHeight;
        if(top === 0) {
            el.scrollTop = 1;
        }else if(currentScroll === totalScroll) {
            el.scrollTop = top - 1;
        }
    });
    el.addEventListener('touchmove', function(evt) {
    if(el.offsetHeight < el.scrollHeight)
        evt._isScroller = true;
    });
}
overscroll(document.querySelector('.scroll'));
document.body.addEventListener('touchmove', function(evt) {
    if(!evt._isScroller) {
        evt.preventDefault();
    }
});
```


### **ios 滚动和 屏幕的回弹效果相互影响**

```javascript 
//这个ios13以上没有效果 
document.body.addEventListener('touchmove', function(evt) {    
  if(!evt._isScroller) {         
    evt.preventDefault();    
  }
}); 
//这个会完全禁止touchmove  导致内部无法滚动。 
document.body.addEventListener('touchmove', function (e) {  
  if(e._isScroller) return; 
  //过滤掉具有滚动容器的元素。   
  e.preventDefault(); 
}, {passive: false}); //passive 参数不能省略

```
