# wheel 鼠标滚轮

> 注意：`mouseWheel `改变的是`dpr`；来失效的放大缩小；

```javascript 
document.addEventListener('wheel', (e) => {
    // if (e.ctrlKey) {
    //     e.preventDefault();
    // }
    console.log(window.devicePixelRatio,'-s---asf--')
}, { passive: false });
```
