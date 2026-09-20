# open

## 目录

- [window.open详解](#windowopen详解)
  - [window.close() ](#windowclose)
  - [使用场景](#使用场景)

# window\.open详解

window\.open 弹出新窗口的命令；

- ‘locationPage.html’ 弹出窗口的文件名,相对路径绝对路径都可以；
- ‘*blank’ 弹出新的独立窗口，非必须，可用空”代替，默认是’* self’；
- height=100 窗口高度；
- width=400 窗口宽度；
- top=0 窗口距离屏幕上方的象素值；
- left=0 窗口距离屏幕左侧的象素值；
- toolbar=no 是否显示工具栏，yes为显示；
- menubar=no 是否显示菜单栏，yes为显示；
- scrollbars=no 是否显示滚动栏，yes为显示；
- resizable=no 是否允许改变窗口大小，yes为允许；
- location=no 是否显示地址栏，yes为允许；
- status=no 是否显示状态栏内的信息（通常是文件已经打开），yes为允许；
- alwaysLowered 窗口隐藏在所有窗口之后，yes为允许；
- alwaysRaised 窗口悬浮在所有窗口之上，yes为允许；
- depended 是否和父窗口同时关闭，yes为允许；
- titlebar 窗口题目栏是否可见，yes为允许；
- z-look 窗口打开后是否浮在所有窗口之上，yes为允许；
-

**window\.open ('page.html', 'newwindow', 'fullscreen') //全屏了，自然其他条件就都失效了**

**window\.open ('page.html', 'newwindow', channelmode)  //打开一个和按F11所见到的一样的窗口**

**这个非常有意思；只是没什么实际作用**

```javascript 
 function unload(){ 
  //打开一个连标题栏都没有的窗口（无标题、最小、最大、以及关闭按钮）  看看，什么效果？ 如果把resizable 设为0 scrollbars = no 呢？
    var popUpSizeX=200; //窗口的宽度
    var popUpSizeY=166; //窗口的高度
    var popUpLocationX=2;//距离左边的距离 相当于 left
    var popUpLocationY=2;//距离顶端的距离 相当于 top
    // URL of the popUp
    var popUpURL="http://www.33d9.com/default.asp";; //打开页面的路径
    // ** 下面的就不要随便改了 ***
    splashWin = window.open("",'x','fullscreen=1, ,scrollbars=auto,resizable=1');
    splashWin.blur(); // Hide while updating
    window.focus();
    splashWin.resizeTo(popUpSizeX,popUpSizeY);
    splashWin.moveTo(popUpLocationX,popUpLocationY);
    splashWin.location=popUpURL;
}
    // END
    unload();
```


常用：

```javascript 
window.open('http://www.baidu.com',
'_blank','scrollbars=yes,top=100,left=100,resizable=no,status=no,toolbar=no,menubar=no,location=no,width=1024,height=768')

```


## \*\*window\.close() \*\*​

- 只能关闭 由window\.open(打开的窗口) &#x20;
- 不能关闭opener =null 的窗口， 及 直接浏览器地址栏输入，或者其他程序调用产生的浏览器窗口
- **判断由window\.open()打开的页面是否关闭  opener.closed // true false**

## 使用场景

```javascript 
 使用场景: ActiveXObject.打开其他页面而被关闭本页面
var userAgent = navigator.userAgent;
if (userAgent.indexOf("Firefox") != -1 || userAgent.indexOf("Presto") != -1) {
    window.location.replace("about:blank");
} else {
    window.opener = null;
    window.open("", "_self");
    window.close();
}
同样:只能关闭由 window.open()打开的页面  api
或者比如:
  socket.on('connect', function () {
        socket.on('openBrower', function (data) {
          if(opener) opener.close()
          opener=window.open('http://localhost/EcmaScript/iframe/swiper1.html)
        });
  });
```
