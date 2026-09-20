# Vue经典组件

```纯文本 
 递归：  重要的是必须有打断组件循环的条件 
 <template> 
     <li> 
         <div @click='toggle' > 
             {{model.title}} 
             <span v-if='isFolder' class="isFolder">[{{open ? '-' : '+' }}]</span> 
         </div> 
         <ul v-show='open' v-if='isFolder'> 
             <item class="item" v-for="model in model.children" :model="model" :key="model.title"></item> 
         </ul> 
     </li>   
 </template> 
 <script> 
     export default { 
         name:'Item', 
         props:{ 
             model:{ 
                 type:Object, 
                 required:true 
             }, 
         }, 
         data(){return { 
             open:false 
         }}, 
         computed:{ 
             isFolder(){ 
                  return this.model.children && this.model.children.length 
             } 
         }, 
         methods:{ 
             toggle(){ 
                 if(this.isFolder){ 
                     this.open = !this.open 
                 } 
             } 
         } 
     } 
 </script> 
 <style scoped> 
 .isFolder{ 
     cursor: pointer; 
 } 
 </style> 

```


```纯文本 
 extend   render  Vue 
 
 // notice 组件 
 <template> 
     <div class="box" v-if="isShow"> 
       <h3>{{title}}</h3> 
       <p class="box-content">{{message}}</p> 
     </div> 
   </template> 
    
   <script> 
   export default { 
     props: { 
       title: { 
         type: String, 
         default: "" 
       }, 
       message: { 
         type: String, 
         default: "" 
       }, 
       duration: { 
         type: Number, 
         default: 1000 
       } 
     }, 
     data() { 
       return { 
         isShow: false 
       }; 
     }, 
     methods: { 
       show() { 
         this.isShow = true; 
         setTimeout(this.hide, this.duration); 
       }, 
       hide() { 
         this.isShow = false; 
         this.remove(); 
       } 
     } 
   }; 
   </script> 
    
   <style scoped> 
   .box { 
     position: fixed; 
     width: 100%; 
     top: 16px; 
     left: 0; 
     text-align: center; 
     pointer-events: none; 
   } 
   .box-content { 
     width: 200px; 
     margin: 10px auto; 
     font-size: 14px; 
     border: blue 3px solid; 
     padding: 8px 16px; 
     background: #fff; 
     border-radius: 3px; 
     margin-bottom: 8px; 
   } 
   </style> 
 
 
 //create.js       Vue.prototype.$create = create   
 import Vue from 'vue' 
 export default function create(Component, props) { 
 
     //Component 是组件配置  Notice js对象 
     //comp 是组件实例 
      //Vue.extend(Component) ==> function 构造函数   需要new一下 
      //Vue.component('comp',Component)  注册全局组件   
 
 
     //方案一： render 
 
     // const vm = new Vue({ 
     //     render(h){ 
     //         // h 就是createElement  返回vnode 
     //         return h(Component,{props}) 
     //     } 
     // }) .$mount()    // $mount必须执行 才能得出$el 这是vue 根据虚拟dom得出的真实dom ， 可以不挂载 dom  因为这里想挂载body 但是vue 不允许挂载body 
 
     // //手动挂载 
     //  document.body.appendChild(vm.$el) 
 
     // //销毁方法 
     //  const comp = vm.$children[0]  //这里用的render 只有一个 子组价 相对于根组件 
     // comp.remove = function(){ 
     //     document.body.removeChild(vm.$el) 
     //     vm.$destroy() 
     // } 
     // return comp 
 
 
 
     //方案二：  extend 构造函数 
      const comp = Vue.extend(Component) 
     const vm = new comp() 
     vm.title = props.title 
     vm.message = props.message 
     vm.duration = props.duration 
     document.body.appendChild(vm.$mount().$el) 
     vm.remove = function () { 
         document.body.removeChild(vm.$el) 
         vm.$destroy() 
     } 
     return vm 
 } 
 
 //执行create 
 const notice = this.$create(Notice, { 
                         title: "社会你杨哥喊你来搬砖", 
                         message: valid ? "请求登录!" : "校验失败!", 
                         duration: 1000 
                       }); 
                       notice.show(); 

```
