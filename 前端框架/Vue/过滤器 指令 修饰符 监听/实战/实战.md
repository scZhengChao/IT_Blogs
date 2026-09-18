# 实战

一：marquee 的代替实现

```纯文本 
 由于官方废弃了marquee标签；自定义； 
 /** 
   * 这个只是简单的一个应用； 
   * 后续可以进一步扩展 
 */ 
 使用： 
 <div class="mar" v-marquee:right='{speed:60,direction:"left"}' data-once='0'> 
         <span class="marquee">这是具体滚动的内容</span> 
 </div> 
 指令： 
 export default { 
         componentUpdated(el,binding,{context},oldVnode){ 
             let once = el.getAttribute('data-once') 
             //let once = el.dataset.once 
             if(once == 1) return 
             let text = el.children[0].innerText 
             if(text !== ''){ 
                 el.setAttribute('data-once',1) 
                 var target = el.children[0] 
                 function move(){ 
                     if(context.$route.fullPath !== '/botaonline') return 
                     var mar_style = document.querySelector('#style_marquee') 
                     var width = target.offsetWidth; 
                     var allWidth = el.offsetWidth; 
                     var mar = `@keyframes mar { 
                         from {} 
                         to{ 
                             transform: translate3d(${-allWidth-width},0,0) 
                         } 
                     }` 
                     target.style.animation = `mar 10s linear infinite`; 
                     mar_style.innerHTML= mar; 
                     target.style.animationPlayState = 'running'; 
 
 
                 } 
                 move() 
                 el.onmouseenter = function(){ 
                     target.style.animationPlayState ='paused' 
                 } 
                 el.onmouseleave = function(){ 
                     target.style.animationPlayState ='running' 
                 } 
                 let timer =''; 
                 window.onresize = function(){ 
                     clearTimeout(timer) 
                     target.style.animationPlayState = 'paused'; 
                     timer = setTimeout(()=>{ 
                         move() 
                     },300) 
                 } 
             } 
         }, 
         unbind(el,binding,newVnode,oldVnode){ 
             el.onmouseenter =null; 
             el.onmouseleave = null; 
             window.onresize =null 
         } 
     }
```
