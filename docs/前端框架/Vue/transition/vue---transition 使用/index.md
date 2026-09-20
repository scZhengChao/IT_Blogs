# vue---transition 使用

```纯文本 
 vue动画 
 
     动画组件: transition|transition-group    谁做动画，就包着谁 
 
 
     组件属性: 
         name =  "动画名" 
         enter-class = "类名" 
         enter-active-class = "类名" 
         leave-class = "类名" 
         leave-active-class = "类名" 
     样式： 
         .动画名-enter{..}  入场前(打哪来) 
         .动画名-enter-active{..} 入场后(来了停哪) 
         .动画名-leave{..} 离场前 
         .动画名-leave-active{..} 离开场后(到哪去) 
 
 
     transition组件事件: 
         @before-enter="方法(el)"   el==做动画的元素(原生) 
         @enter="方法" 
         @after-enter="方法" 
         @before-leave="方法" 
         @leave="方法" 
         @after-leave="方法" 
 
 
     1) css3 
         transition：无跳变 
             .动画名-enter{..} 打哪来 1  +   .动画名-leave-active{..} 到哪去 4 
         animation：有跳变 
             .动画名-enter-active{指定入场} 2 来了停哪 + .动画名-leave-active{指定离场}到哪去 4 
     2) css库 animate.css 
         同 animation 有跳变 
     3) js库 动画名  需要设定初始位置 
         下载 velocity.js   http://velocityjs.org/ 
         使用:    velocity(el,{css属性},{配置}) 
 
 
         配置: 
             duration: 毫秒   事件 
             easing: 动画类别 '' 
             Queue 
             complete:fn() 
             progress:fn 
 
 
 
 
             loop: 1 次  true无限 
             delay: 毫秒 延时 
             display:'none/block' 动画结束时是否可见 
         注意： 
             leave(el,done){} 
 
 
 transition-group: 
     一组动画 
     transition-group 包着一组元素  ，每个元素要有key  其他的同transition
```


```纯文本 
 当有相同标签名的元素切换时，需要通过 key 特性设置唯一的值来标记以让 Vue 区分它们， 
 否则 Vue 为了效率只会替换相同标签内部的内容。 
 即使在技术上没有必要，给在 <transition> 组件中的多个元素设置 key 是一个更好的实践 。
```


```纯文本 
 <!DOCTYPE html> 
 <html lang="en"> 
 <head> 
     <meta charset="UTF-8"> 
     <meta name="viewport" content="width=device-width, initial-scale=1.0"> 
     <meta http-equiv="X-UA-Compatible" content="ie=edge"> 
     <title>Document</title> 
     <link rel="stylesheet" href="https://unpkg.com/element-ui/lib/theme-chalk/index.css"> 
     <style> 
     *{ 
         margin: 0; 
         padding: 0; 
     } 
     html,body{ 
         width: 100%; 
         height: 100%; 
     } 
     #app{ 
         width: 100%; 
         height: 100%; 
         position: relative; 
     } 
     .box{ 
         width: 500px; 
         height: 500px; 
         background: #ccc; 
         position: absolute; 
         left: 100px; 
         transition: all 1s ease; 
         transform-origin: top left; 
     } 
     .app-fade-enter{ 
         transform:translate3d(-100%,0,0) 
     } 
     .app-fade-leave-active{ 
         opacity: 0; 
         transform:translate3d(100%,0,0) 
     } 
     </style> 
 </head> 
 <body> 
     <div id="app"> 
 
 
         <input type="button" @click='bl=!bl' value='运动'> 
         <transition 
             name='app-fade' 
         > 
             <div v-if='bl' class="box" key='on'>box1</div> 
             <div v-else class="box" key='off'>box2</div>     
         </transition> 
     </div> 
 </body> 
 <script src="../assets/lib/vue.js"></script> 
 <script src="https://unpkg.com/element-ui/lib/index.js"></script> 
 <script> 
 let vm = new Vue({ 
     el:"#app", 
     data:{ 
        bl:false 
     }, 
     created(){ 
 
 
     }, 
     methods:{ 
     
     } 
 }) 
 
 </script> 
 </html>
```


```纯文本 
 修改mode 和 
 animation-duration:.3s;
```


```纯文本 
 常用动画整理： 
     css： 
 // 定义进入前与离开后状态 
     .name-enter, .name-leave-to { 
       ... 
     } 
     // 定义离开前与进入后状态 
     .name-leave, .name-enter-to { 
       ... 
     } 
     // 定义进出过程 
     .name-enter-active, .name-leave-active { 
       transition: all .5s 
     } 
 1. fade 淡化进出 
 .fade-enter, .fade-leave-to { 
       opacity: 0 
     } 
     .fade-leave, .fade-enter-to { 
       opacity: 1 
     } 
     .fade-enter-active, .fade-leave-active { 
       transition: all .2s 
     } 
 2. scale 缩放进出 
 .scale-enter, .scale-leave-to { 
       transform: scale(0) 
     } 
     .scale-leave, .scale-enter-to { 
       transform: scale(1) 
     } 
     .scale-enter-active, .scale-leave-active { 
       transition: all .2s 
     } 
 3. left 左侧进出 (通常用于左侧边栏) 
   .left-enter, .left-leave-to { 
       transform: translate3d(-100%, 0, 0) 
     } 
     .left-leave, .left-enter-to { 
       transform: translate3d(0, 0, 0) 
     } 
     .left-enter-active, .left-leave-active { 
       transition: all .2s 
     } 
 4. right 右侧进出 (通常用于右侧边栏) 
   .right-enter, .right-leave-to { 
       transform: translate3d(100%, 0, 0) 
     } 
     .right-leave, .right-enter-to { 
       transform: translate3d(0, 0, 0) 
     } 
     .right-enter-active, .right-leave-active { 
       transition: all .2s 
     } 
 5. top 顶部进出 (通常用于提示弹窗) 
 .top-enter, .top-leave-to { 
       transform: translate3d(0, -100%, 0) 
     } 
     .top-leave, .top-enter-to { 
       transform: translate3d(0, 0, 0) 
     } 
     .top-enter-active, .top-leave-active { 
       transition: all .2s 
     } 
 
 6.轮播图 上下 
   .up-enter{ 
       transform: translate3d(0, 100%, 0) 
     } 
     .up-leave-to { 
         transform:translate3d(0,-100%,0) 
     } 
     .up-leave, .up-enter-to { 
       transform: translate3d(0, 0, 0) 
     } 
     .up-enter-active, .up-leave-active { 
       transition: all .5s 
     } 
     .down-enter{ 
       transform: translate3d(0, -100%, 0) 
     } 
     .down-leave-to { 
         transform:translate3d(0,100%,0) 
     } 
     .down-leave, .down-enter-to { 
       transform: translate3d(0, 0, 0) 
     } 
     .down-enter-active, .down-leave-active { 
       transition: all .5s 
     }
```


根据key值得不同 可以模拟if else  完成单个元素的过度

[transition.html](./file/transition_5nuz51p5bO.html "transition.html")

[transitionMarqueen.html](./file/transitionMarqueen_O64H6hQebx.html "transitionMarqueen.html")
