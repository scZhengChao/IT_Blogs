# 修饰符

```纯文本 
 1.     v-bind:title.sync=”doc.title + ‘!’”是无效的) 
     将 v-bind.sync 用在一个字面量的对象上，例如 v-bind.sync=”{ title: doc.title }”，是无法正常工作的 
 Sync： 
     对基础数据 
 <input type="text" v-model="str"> 
 props:['title'], 
 data(){return{ 
     str:this.title 
 }}, 
   watch:{ 
     str:{ 
       handler:function(newValue,oldValue){ 
         this.$emit('update:title',newValue) 
       } 
     } 
   } 
 } 
      对对象  
     是可以不用 （‘update：title')这一套的，因为如果你没有深拷贝，对象是引用型数据，本质上你没有改变prop 
 官网： 
      注意在 JavaScript 中对象和数组是通过引用传入的，所以对于一个数组或对象类型的 prop 来说，在子组件中改变这个对象或数组本身将会影响到父组件的状态。 
     如果是动态传入prop 你可以尝试改造 computed 的get set 类似状态管理的双向绑定。 

```


```纯文本 
 2.一个好例子:.lazy  ctrl.enter.exact 
 <textarea type="text" v-model.lazy="ipt" @keyup.ctrl.enter.exact="add"></textarea> 
 <ul> 
     <li v-for="(val, index) in list" :key="index">{{val}}</li> 
 </ul> 
 <div>{{cptipt}}</div> 
 
 
 <script> 
 let vm=new Vue({ 
     el:'#app', 
     data:{ 
         ipt:'', 
         list:['aa','bb'] 
     }, 
     methods:{ 
         add(ev){ 
             // ev.keyCode==13 
             this.list.push(this.ipt); 
         } 
     }, 
     computed:{ 
         cptipt(){ 
             return this.ipt+3; 
         } 
     } 
 }) 
 lazy  针对说明下： 相当于把 input  事件 改成了 change 事件
```
