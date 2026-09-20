# js修改keyframes

```javascript 
 //js脚本 改变 keyframes 的方法， 除了插件 
 
 var runkeyframes  = ` @keyframes mar { 
       from{  } 
       to{ transform: translate3d(${-600+'px'},0,0) } 
     }` 
 var style = document.querySelector('.marquee') 
 style.innerHTML = runkeyframes 
 console.log(style)
```


```javascript 
//暂停：  
tarB.onmouseenter = function(){
  this.style.animationPlayState = 'paused'
}
tarB.onmouseleave = function(){
  this.style.animationPlayState = 'running'
}
```
