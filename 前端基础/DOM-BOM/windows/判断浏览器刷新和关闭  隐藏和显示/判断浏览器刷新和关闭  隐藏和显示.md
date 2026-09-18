# 判断浏览器刷新和关闭  隐藏和显示

```纯文本 
 3. 
 监听页面的刷新，关闭 
 onunload 和 onbeforeunload 都是在刷新或者关闭页面 
 页面加载时只执行onload 
 页面关闭时先执行onbeforeunload，最后onunload 
 页面刷新时先执行onbeforeunload，然后onunload，最后onload。 
 兼容： 
 1. ios微信，关闭浏览器不触发beforeunload，但是触发unload 
 2. ios微信，传统页面间的跳转，beforeunload，unload 都不触发 
 所以出现替代api： 
     pageshow   pagehide 
 pageshow定义和用法 
     onpageshow 事件在用户浏览网页时触发。 
     onpageshow 事件类似于 onload 事件，onload 事件在页面第一次加载时触发， onpageshow 事件在每次加载页面时触发，即 onload 事件在页面从浏览器缓存中读取时不触发。 
     为了查看页面是直接从服务器上载入还是从缓存中读取，你可以使用 PageTransitionEvent 对象的 persisted 属性来判断。 如果页面从浏览器的缓存中读取该属性返回 ture，否则返回 false 
 
 pagehide定义和用法 
     onpagehide 事件在用户离开网页时触发。 
     离开网页有多种方式。如点击一个链接，刷新页面，提交表单，关闭浏览器等。. 
     onpagehide 事件有时可以替代 onunload 事件，但 onunload 事件触发后无法缓存页面。 
     为了查看页面是直接从服务器上载入还是从缓存中读取，你可以使用 PageTransitionEvent 对象的 persisted 属性来判断。 如果页面从浏览器的缓存中读取该属性返回 ture，否则返回 false 
 
 ------------------------------------------------------------------------ 
 1、onbeforeunload事件： 
 　　说明：目前三大主流浏览器中firefox和IE都支持onbeforeunload事件,opera尚未支持。 
 　　用法： 
 　　　·object.onbeforeunload = handler 
 　　　·<element onbeforeunload = “handler” … ></element> 
 　　描述： 
 　　　事件触发的时候弹出一个有确定和取消的对话框，确定则离开页面，取消则继续待在本页。handler可以设一个返回值作为该对话框的显示文本。 
 
 
 
 
 　　触发于： 
 　　　·关闭浏览器窗口 
 　　　·通过地址栏或收藏夹前往其他页面的时候 
 　　　·点击返回，前进，刷新，主页其中一个的时候 
 　　　·点击 一个前往其他页面的url连接的时候 
 　　　·调用以下任意一个事件的时候：click，document write，document open，document close，window close ，window navigate ，window NavigateAndFind,location replace,location reload,form submit. 
 　　　·当用window open打开一个页面，并把本页的window的名字传给要打开的页面的时候。 
 　　　·重新赋予location.href的值的时候。 
 　　　·通过input type=”submit”按钮提交一个具有指定action的表单的时候。 
 　　可以用在以下元素： 
 　　　·BODY, FRAMESET, window 
 　　平台支持： 
 　　　IE4+/Win, Mozilla 1.7a+, Netscape 7.2+, Firefox0.9+
```


```纯文本 
 单纯的一般方法不能判断浏览器的关闭和刷新： 
      window.addEventListener("beforeunload", function (e) { 
       var confirmationMessage = "\o/"; 
       (e || window.event).returnValue = confirmationMessage;     // Gecko and Trident 
       return confirmationMessage;                                // Gecko and WebKit 
     });
```


```纯文本 
 就单单对谷歌和火狐： 
 
     var _beforeUnload_time = 0, _gap_time = 0; 
     window.onbeforeunload = function(){ 
         _beforeUnload_time = new Date().getTime() 
     } 
     window.onunload = function(){ 
         _gap_time = new Date().getTime() -_beforeUnload_time; 
         localStorage.setItem('gap',_gap_time) 
         if(_gap_time < 5){ 
             localStorage.setItem('status','关闭') 
         }else{ 
             localStorage.setItem('status','刷新') 
         } 
     } 
 
 越是页面加载多的情况下：判断越准确
```


```纯文本 
 判断tab页的切换和 最小化 锁屏等 低版本浏览器可能不支持（推荐放弃）判断当且页面是否活跃 
 
 //支持浏览器 最小化 和 tab页切换 
  document.addEventListener('visibilitychange',function(){   
     console.log(document.hidden) 
     if(document.visibilityState === 'hidden'){ 
       console.log('hidden') 
     }else if(document.visibilityState === 'visible'){ 
       console.log('visible') 
     }else{ 
       console.log('other') 
     } 
   },false) 
 更加全面的; 还支持pc浏览器不再最上层 
 window.addEventListener('focus',function(){  }) 
 window.addEventListener('blur',function(){   })
```
