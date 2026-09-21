# vue的transition分析 和 collapse

```纯文本 
 https://www.cnblogs.com/fangnianqin/p/10109185.html 
 https://www.liangzl.com/get-article-detail-39332.html         源码分析
```


```纯文本 
 // fade/zoom 等 
 import 'element-ui/lib/theme-chalk/base.css'; 
 // collapse 展开折叠 
 import CollapseTransition from 'element-ui/lib/transitions/collapse-transition'; 
 import Vue from 'vue' 
 
 Vue.component(CollapseTransition.name, CollapseTransition) 
 
 使用方法 
 <template> 
   <div> 
      <div><button @click="cb">切换</button></div> 
      <el-collapse-transition> 
       <div v-if="show" class="testshow"> 
         <div>sssssss</div> 
         <div>sssssss</div> 
         <div>sssssss</div> 
         <div>sssssss</div> 
         <div>sssssss</div> 
       </div> 
      </el-collapse-transition> 
   </div> 
 </template> 
 
 <script> 
 export default { 
     data: () => ({ 
       show: true 
     }), 
     methods: { 
       cb() { 
         this.show = !this.show; 
       }, 
     } 
 } 
 </script> 
 <style lang="less"> 
 .testshow{ 
   padding: 10px 10px; 
   background-color: aqua; 
 } 
 <style>
```


```纯文本 
 element 部分源码 
 import { addClass, removeClass } from 'element-ui/src/utils/dom'; 
 
 class Transition { 
   beforeEnter(el) { 
     addClass(el, 'collapse-transition'); 
     if (!el.dataset) el.dataset = {}; 
 
 
     el.dataset.oldPaddingTop = el.style.paddingTop; 
     el.dataset.oldPaddingBottom = el.style.paddingBottom; 
 
 
     el.style.height = '0'; 
     el.style.paddingTop = 0; 
     el.style.paddingBottom = 0; 
   } 
 
 
   enter(el) { 
     el.dataset.oldOverflow = el.style.overflow; 
     if (el.scrollHeight !== 0) { 
       el.style.height = el.scrollHeight + 'px'; 
       el.style.paddingTop = el.dataset.oldPaddingTop; 
       el.style.paddingBottom = el.dataset.oldPaddingBottom; 
     } else { 
       el.style.height = ''; 
       el.style.paddingTop = el.dataset.oldPaddingTop; 
       el.style.paddingBottom = el.dataset.oldPaddingBottom; 
     } 
 
 
     el.style.overflow = 'hidden'; 
   } 
 
 
   afterEnter(el) { 
     // for safari: remove class then reset height is necessary 
     removeClass(el, 'collapse-transition'); 
     el.style.height = ''; 
     el.style.overflow = el.dataset.oldOverflow; 
   } 
 
 
   beforeLeave(el) { 
     if (!el.dataset) el.dataset = {}; 
     el.dataset.oldPaddingTop = el.style.paddingTop; 
     el.dataset.oldPaddingBottom = el.style.paddingBottom; 
     el.dataset.oldOverflow = el.style.overflow; 
 
 
     el.style.height = el.scrollHeight + 'px'; 
     el.style.overflow = 'hidden'; 
   } 
 
 
 
   leave(el) { 
     if (el.scrollHeight !== 0) { 
       // for safari: add class after set height, or it will jump to zero height suddenly, weired 
       addClass(el, 'collapse-transition'); 
       el.style.height = 0; 
       el.style.paddingTop = 0; 
       el.style.paddingBottom = 0; 
     } 
   } 
 
 
   afterLeave(el) { 
     removeClass(el, 'collapse-transition'); 
     el.style.height = ''; 
     el.style.overflow = el.dataset.oldOverflow; 
     el.style.paddingTop = el.dataset.oldPaddingTop; 
     el.style.paddingBottom = el.dataset.oldPaddingBottom; 
   } 
 } 
 
 
 export default { 
   name: 'ElCollapseTransition', 
   functional: true, 
   render(h, { children }) { 
     const data = { 
       on: new Transition() 
     }; 
 
 
     return h('transition', data, children); 
   } 
 }; 
 
 或者下载附件自定义
```


[transition-velocity.rar](https://github.com/scZhengChao/IT_Blogs/releases/download/assets-v1/transition-velocity_4Avnk79J-K.rar "transition-velocity.rar")
