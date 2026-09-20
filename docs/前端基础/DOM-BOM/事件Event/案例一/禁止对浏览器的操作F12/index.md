# 禁止对浏览器的操作F12

```javascript 
if(window.location.hostname !== 'localhost'){
  // 按键
  document.onkeydown = function(ev){
    let eve = ev || window.event;
    let code = eve.keyCode || eve.which
    // 禁用 F12
    if(code === 123){
      eve.preventDefault()  //阻止默认事件
    }
    if(eve.ctrlKey && (code == 189 || code == 187)){
      eve.preventDefault() || (eve.returnValue = false)
    }
    // 禁止 ctrl + mousewhell
    window.onmousewheel = function(ev){
      let event = ev || window.event
      if(event.ctrlKey && event.isTrusted){
        eve.preventDefault() || (eve.returnValue = false)
      }
    }
  }
  // 禁用鼠标右键
  window.oncontextmenu = function(e){
    e.preventDefault()
  }
}

e.stopPropagation() ||  e.cancelBubble = true  取消冒泡
```
