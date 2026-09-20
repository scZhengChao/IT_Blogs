# 事件概览

## 目录

- [6.不怎么常用的 事件
  ](#6不怎么常用的事件)

**pc端web**

```纯文本 
 鼠标事件 
 click 当用户点击某个对象时调用的事件句柄。 
 contextmenu 在用户点击鼠标右键打开上下文菜单时触发 
 dblclick 当用户双击某个对象时调用的事件句柄。 
 mousedown 鼠标按钮被按下。 
 mouseenter 当鼠标指针移动到元素上时触发。 
 mouseleave 当鼠标指针移出元素时触发 
 mousemove 鼠标被移动。 
 mouseover 鼠标移到某元素之上。 
 mouseout 鼠标从某元素移开。 
 mouseup 鼠标按键被松开。 
 mousewheel  鼠标滚轮 
 ，onmousewheel（firefox不支持）和DOMMouseScroll（只有firefox支持）， 
 现在五大浏览器（IE、Opera、Safari、Firefox、Chrome）中Firefox 使用detail，其余四类使用wheelDelta；两者只在取值上不一致，代表含义却是一致的，detail只取±3，wheelDelta只取±120，其中正数表示为向上，负数表示向下 
 
 键盘事件 
 属性 描述 DOM 
 keydown 某个键盘按键被按下。 
 keypress 某个键盘按键被按下并松开。 
 keyup 某个键盘按键被松开。 
 
 框架/对象（Frame/Object）事件 
 abort 图像的加载被中断。 ( ) 
 beforeunload 该事件在即将离开页面（刷新或关闭）时触发 
 error 在加载文档或图像时发生错误。 ( , 和 ) 
 hashchange 该事件在当前 URL 的锚部分发生修改时触发。 
 load 一张页面或一幅图像完成加载。 
 pageshow 该事件在用户访问页面时触发 
 pagehide 该事件在用户离开当前网页跳转到另外一个页面时触发 
 resize 窗口或框架被重新调整大小。 
 scroll 当文档被滚动时发生的事件。 
 unload 用户退出页面。 ( 和 ) 
 
 表单事件 
 blur 元素失去焦点时触发 
 change 该事件在表单元素的内容改变时触发( , , , 和 ) 
 focus 元素获取焦点时触发 
 focusin 元素即将获取焦点是触发 
 focusout 元素即将失去焦点是触发 
 input 元素获取用户输入是触发 
 compositionstart 事件在用户开始进行非直接输入的时候触 
 compositionend  事件在用户开始进行非直接输入结束的时候触发 
 compositionupdate  输入过程中不断更新 （可以去到拼音+ value 解决换行问题） 
 reset 表单重置时触发 
 search 用户向搜索域输入文本时触发 ( 
 
 剪贴板事件 
 copy 该事件在用户拷贝元素内容时触发 
 cut 该事件在用户剪切元素内容时触发 
 paste 该事件在用户粘贴元素内容时触发 
 
 打印事件 
 afterprint 该事件在页面已经开始打印，或者打印窗口已经关闭时触发 
 beforeprint 该事件在页面即将开始打印时触发 
 
 拖动事件 
 drag 该事件在元素正在拖动时触发 
 dragend 该事件在用户完成元素的拖动时触发 
 dragenter 该事件在拖动的元素进入放置目标时触发 
 dragleave 该事件在拖动元素离开放置目标时触发 
 dragover 该事件在拖动元素在放置目标上时触发 
 dragstart 该事件在用户开始拖动元素时触发 
 drop 该事件在拖动元素放置在目标区域时触发 
 
 多媒体（Media）事件 
 abort 事件在视频/音频（audio/video）终止加载时触发。 
 canplay 事件在用户可以开始播放视频/音频（audio/video）时触发。 
 canplaythrough 事件在视频/音频（audio/video）可以正常播放且无需停顿和缓冲时触发。 
 durationchange 事件在视频/音频（audio/video）的时长发生变化时触发。 
 emptied The event occurs when the current playlist is empty 
 ended 事件在视频/音频（audio/video）播放结束时触发。 
 error 事件在视频/音频（audio/video）数据加载期间发生错误时触发。 
 loadeddata 事件在浏览器加载视频/音频（audio/video）当前帧时触发触发。 
 loadedmetadata 事件在指定视频/音频（audio/video）的元数据加载后触发。 
 loadstart 事件在浏览器开始寻找指定视频/音频（audio/video）触发。 
 pause 事件在视频/音频（audio/video）暂停时触发。 
 play 事件在视频/音频（audio/video）开始播放时触发。 
 playing 事件在视频/音频（audio/video）暂停或者在缓冲后准备重新开始播放时触发。 
 progress 事件在浏览器下载指定的视频/音频（audio/video）时触发。 
 ratechange 事件在视频/音频（audio/video）的播放速度发送改变时触发。 
 seeked 事件在用户重新定位视频/音频（audio/video）的播放位置后触发。 
 seeking 事件在用户开始重新定位视频/音频（audio/video）时触发。 
 stalled 事件在浏览器获取媒体数据，但媒体数据不可用时触发。 
 suspend 事件在浏览器读取媒体数据中止时触发。 
 timeupdate 事件在当前的播放位置发送改变时触发。 
 volumechange 事件在音量发生改变时触发。 
 waiting 事件在视频由于要播放下一帧而需要缓冲时触发。 
 
 动画事件 
 animationend 该事件在 CSS 动画结束播放时触发 
 animationiteration 该事件在 CSS 动画重复播放时触发 
 animationstart 该事件在 CSS 动画开始播放时触发 
 
 过渡事件 
 transitionend 该事件在 CSS 完成过渡后触发。 
 
 其他事件 
 message 该事件通过或者从对象(WebSocket, Web Worker, Event Source 或者子 frame 或父窗口)接收到消息时触发 
 online 该事件在浏览器开始在线工作时触发。 
 offline 该事件在浏览器开始离线工作时触发。 
 popstate 该事件在窗口的浏览历史（history 对象）发生改变时触发。 event occurs when the window’s history changes 
 show 该事件当元素在上下文菜单显示时触发 
 storage 该事件在 Web Storage(HTML 5 Web 存储)更新时触发 
 toggle 该事件在用户打开或关闭 元素时触发
```


**移动H5**

```纯文本 
 1. click事件     
 单击事件，类似于PC端的click，但在移动端中，连续click的触发有200ms ~ 300ms的延迟 
 
 2. touch类事件 
 触摸事件，有touchstart touchmove touchend touchcancel 四种之分 
 touchstart：手指触摸到屏幕会触发 
 touchmove：当手指在屏幕上移动时，会触发 
 touchend：当手指离开屏幕时，会触发 
 touchcancel：被迫终止触摸的时候触发 （例如：来电 消息弹窗）则可以触发该事件 
 
 注意：以下事件均为 touch原生事件封装的：  https://www.cnblogs.com/houfee/p/10413687.html   或者 npm i vue-touch-events 
 
 3. tap类事件 
 触碰事件，我目前还不知道它和touch的区别，一般用于代替click事件，有tap longTap singleTap doubleTap四种之分 
 tap: 手指碰一下屏幕会触发 
 longTap: 手指长按屏幕会触发 
 singleTap: 手指碰一下屏幕会触发 
 doubleTap: 手指双击屏幕会触发 
 
 4. swipe类事件 
 滑动事件，有swipe swipeLeft swipeRight swipeUp swipeDown 五种之分 
 swipe：手指在屏幕上滑动时会触发 
 swipeLeft：手指在屏幕上向左滑动时会触发 
 swipeRight：手指在屏幕上向右滑动时会触发 
 swipeUp：手指在屏幕上向上滑动时会触发 
 swipeDown：手指在屏幕上向下滑动时会触发 
 
 5.手指信息e 
 console.log(e) 
 console.log(e.touches ) // touches 当前屏幕上的手指列表 
 console.log(e.targetTouches) //当前元素上的手指列表 
 console.log(e.changedTouches) //触发当前事件的手指列表 
 console.log(e.changedTouches.length) //获取手指的个数 
 console.log(e.changedTouches[0].pageX,e.changedTouches[0].pageY) //获取坐标 
 在touchend的时候想要获取手指列表，只能用changedTouches 
 identifier：表示触摸的唯一ID 
 clientX:触摸目标在视口中的X坐标。 
 clientY:触摸目标在视口中的Y坐标。 
 identifier：表示触摸的唯一ID。 
 pageX：触摸目标在页面中的x坐标。 
 pageY：触摸目标在页面中的y坐标。 
 screenX:触摸目标在屏幕中的x坐标。 
 screenY:触摸目标在屏幕中的y坐标。 
 target:触摸的DOM节点坐标。 
 
 6.300毫秒延迟事件和点透现象： 
 
 https://blog.csdn.net/qq_42532128/article/details/106176195 
 
 300ms 延迟： 
     为什么要用触摸事件？触摸事件是移动端浏览器特有的html5事件。 
     因为移动端的click有很大延迟（大约300ms）， 300ms延迟来自判断双击和长按， 因为只有默认等待时间结束以确定没有后续动作发生时，才会触发click事件。而触摸事件的延迟则是非常短的，使用触摸事件的能够提高页面响应速度，带来更好的用户体验。 
     重点：由于移动端会有双击缩放的这个操作，因此浏览器在click之后要等待300ms，看用户有没有下一次点击，也就是这次操作是不是双击。 
 
 解决方案： 
 1.用缩放（HTML文档头部设置meta标签） 
     <meta name="viewport" content="user-scalable=no">  
     <meta name="viewport" content="initial-scale=1,maximum-scale=1"> 
 这种方法的缺点显而易见，我们牺牲了缩放的功能。但实际需求中，我们还是希望能通过双指还实现缩放的。我们不想要的只是双击缩放行为。 
 
 2.更改默认的视口宽度 
     <meta name="viewport" content="width=device-width"> 
 如果设置了上述meta标签，那浏览器就可以认为该网站已经对移动端做过了适配和优化，就无需双击缩放操作了。 
 这个方案相比方案一的好处在于，它没有完全禁用缩放，而只是禁用了浏览器默认的双击缩放行为，但用户仍然可以通过双指缩放操作来缩放页面。 
 
 3.CSS touch-action 
     CSS属性 touch-action 用于设置触摸屏用户如何操纵元素的区域(例如，浏览器内置的缩放功能)。 
     如果将该属性值设置为 touch-action: none， 那么表示在该元素上的操作不会触发用户代理的任何默认行为，就无需进行300ms的延迟判断。 
     由于除了IE之外的大部分浏览器都不支持这个新的CSS属性，所以指针事件的polyfill必须通过某种方式去模拟支持这个属性。一种方案是JS去请求解析所有的样式表，另一种方案是将 touch-action作为html标签 的属性。 
 
 4.FastClick 
     <script src="js/fastclick.min.js"></script> 
     // 原生js初始化 
     if ('addEventListener' in document) { 
         document.addEventListener('DOMContentLoaded', function() { 
             FastClick.attach(document.body); 
         }, false); 
     } 
     FastClick 是 FT Labs 专门为解决移动端浏览器 300 毫秒点击延迟问题所开发的一个轻量级的库。 
     FastClick的 实现原理是在检测到touchend事件的时候，会通过DOM自定义事件立即出发模拟一个click事件，并把浏览器在300ms之后的click事件阻止掉。 
 
 5.使用touchstart替代click 
 可能有人会想，既然click点击有300ms的延迟，那对于触摸屏，我们直接监听touchstart事件不就好了吗？ 
 事实上，使用touchstart去代替click事件有两个不好的地方。 
 第一：touchstart是手指触摸屏幕就触发，有时候用户只是想滑动屏幕，却触发了touchstart事件，这不是我们想要的结果； 
 第二：使用touchstart事件在某些场景下可能会出现点击穿透的现象。下面讲一讲点击穿透。 
 
 点击穿透： 
     假如页面上有两个元素A和B。B元素在A元素之上。我们在B元素的 touchstart 事件上注册了一个回调函数，该回调函数的作用是隐藏B元素。我们发现，当我们点击B元素，B元素被隐藏了，随后，A元素触发了 click事 件。当然前提是A元素上 绑定了click事件 ，或者说，A元素是 个链接<a> 、 输入框<input >等。 
     这是因为在移动端浏览器，事件执行的顺序是 touchstart > touchend > click 。而click事件有300ms的延迟，当 touchstart 事件把B元素隐藏之后，隔了300ms，浏览器触发了 click 事件，但是此时B元素不见了，所以该事件被派发到了A元素身上。如果A元素是一个链接，那此时页面就会意外地跳转。 
 
 解决方案： 
     不要混用touch和click。既然touch之后300ms会触发click，只用touch或者只用click就自然不会存在问题了。 
 1.延迟蒙层的消失时间 
     对于设置蒙层的穿透，可以将这个蒙层消失的时间后移350ms，当然为了不让用户感觉到卡顿，可以先设置这个蒙层的opacity透明度为0，然后等350ms后，再设置display:none。 
 2.CSS touch-action 
     和之前说到的一样，将touch-action设置为none，使被覆盖元素的click事件无法发生。当然我们需要在350ms之后解除这个锁定，将touch-action恢复为auto。 
 3.使用FastClick 
     使用fastclick库，从此所有的点击事件都使用click，而且不存在300ms延迟。当然也就没有了点击穿透问题。 
 
 现在浏览器基本不会存在尚明两个问题了；
```


**6.不怎么常用的 事件**

```纯文本 
解决方案，给父级元素加上禁止选择：onselectstart = "return false"就不能被选中了
这里做一下总结，关于一些不是被经常用到的。
onselectstart
    * 触发时间为目标对象被开始选中时（即选中动作刚开始，尚未实质性被选中）
    * 基本上都能支持，但不被 input 和 textarea 标签支持
    * 注意：如果想在火狐中禁用的话可以使用样式控制 div { -moz-user-select: none; }
onselect
    * 文本框中的文本被选中时发生
    * 被 input 和 textarea 标签支持


禁止选择：onselectstart="return false"
    使用场景：实现元素内文本不被选中
禁止拖放：ondragstart="return false"
    使用场景：禁止鼠标在网页上拖动
禁止拷贝：oncopy="return false"
    使用场景：很多网站上的页面内容是不允许复制的，这样可以防止用户或者程序恶意的去抓取页面数据。
禁止粘贴：onpaste="return false"
    使用场景：网银转账时，输入对方卡号，需要输入两次，通常第二次输入的输入框是不允许粘贴的，这样就在一定程度上保证了卡号的准确性。
禁止剪贴：oncut = "return false"
禁止鼠标右键：oncontextmenu="return false"
禁止保存
    <noscript><iframe src="*.htm"></iframe></noscript> //放在head里面
```


[MouseEvent](./MouseEvent/index.md "MouseEvent")

[select](./select/index.md "select")

[ClipboardEvent](./ClipboardEvent/index.md "ClipboardEvent")

[键盘](./键盘/index.md "键盘")

[resize](./resize/index.md "resize")
