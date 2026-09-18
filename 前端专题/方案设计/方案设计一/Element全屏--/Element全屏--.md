Element全屏

## 目录

- [进入全屏](#进入全屏)
- [退出全屏](#退出全屏)
- [全屏事件](#全屏事件)
- [screenfull](#screenfull)

## `进入全屏`

```typescript 
function launchFullscreen(element) {
  if (element.requestFullscreen) {
    element.requestFullscreen()
  } else if (element.mozRequestFullScreen) {
    element.mozRequestFullScreen()
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen()
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullScreen()
  }
}

launchFullscreen(document.documentElement) // 整个页面进入全屏
launchFullscreen(document.getElementById("id")) //某个元素进入全屏

```


## `退出全屏`

```typescript 
function exitFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen()
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen()
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen()
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen()
  }
}
exitFullscreen()


```


## `全屏事件`

```typescript 
['fullscreenchange','webkitfullscreenchange','mozfullscreenchange'].forEach((item,index) => {
        window.addEventListener(item, () => this.fullscreenchange());
})  // 兼容chrome、safari


//  监听全屏事件触发
fullscreenchange() {
  let isFullScreen = document.fullScreen || document.mozFullScreen || document.webkitIsFullScreen;
  if (isFullScreen) {
    //  进入全屏
  } else {
    //  退出全屏
    
  }
},


```


# screenfull

[ npm: screenfull Simple wrapper for cross-browser usage of the JavaScript Fullscreen API, which lets you bring the page or any element into fullscreen.. Latest version: 6.0.2, last published: 6 months ago. Start using https://www.npmjs.com/package/screenfull](https://www.npmjs.com/package/screenfull " npm: screenfull Simple wrapper for cross-browser usage of the JavaScript Fullscreen API, which lets you bring the page or any element into fullscreen.. Latest version: 6.0.2, last published: 6 months ago. Start using https://www.npmjs.com/package/screenfull")

```typescript 
npm install screenfull


screenfull.toggle() //这个方法会请求全屏，如果当前是全屏则会退出全屏。

screenfull.isFullscreen //返回一个布尔值，当前是否是全屏状态。

screenfull.isEnabled  //返回一个布尔值，是否当前可以进入全屏。

Toggle fullscreen on a image
$('img').on('click', event => {
  if (screenfull.isEnabled) {
    screenfull.toggle(event.target);
  }
});


```
