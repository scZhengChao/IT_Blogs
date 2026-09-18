# 好用插件

**Vue.Draggable**

```纯文本 
 https://github.com/SortableJS/Vue.Draggable    详细见源码 example   这个很牛 
 https://www.jianshu.com/p/382ac5f9d6ff 
 
       <draggable 
             class="list-group" 
             tag="ul" 
             v-model="list" 
             v-bind="dragOptions" 
             @start="isDragging = true" 
             @end="isDragging = false" 
           > 
             <transition-group type="transition" name="flip-list"> 
               <li 
                 :class="{'list-group-item':true,'isActive':element.order==activeOrder}" 
                 v-for="(element,index) in list" 
                 :key="element.order" 
                 v-editor 
                 @click='choseActive(element.order)' 
               > 
               
                 {{ element.name }} 
               </li> 
             </transition-group> 
           </draggable> 
 
 css 
 .ghost { 
     opacity: 0.5; 
     background: #c8ebfb; 
 }    
 .flip-list-move { 
     transition: transform 0.5s; 
 }
```


**vue2-countdown**

```纯文本 
 基于vue2.0的活动倒计时组件 
 https://github.com/cgygd/vue2-countdown#vue2-countdown
```
