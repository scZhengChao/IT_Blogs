# 一般组件

```纯文本 
 1.组件： 
     Vue根实例表示1个应用，一个应用有若干个组件拼装而成 
 
      当不需要实际的div 但需要循环 或者 v-if 并存的时候 template 使用极其合适当不能attr key,key必须挂到实际的元素上. 
 
 使用组件 
     <组件名></组件名> 
     <组件名/> 
 定义组件 
     定义: 
         a)       let 组件变量名= Vue.extend({ 
                 template:'<div class="header">我是header组件</div>' 
                 }); 
         b)     let 组件变量名={};        √ 
     注册(拼装) 
         a)    Vue.component('组件名',组件变量名); 
         b)    选项 
             components:{ 
                 组件名：组件变量名    √ 
             } 
 组件数据 
     data 要是个函数，且要有返回值 object 
 
 
 模板： 
     组件内部: template: #id名 
     <script type="x-template" id='id名' 
     <tempate id='id名'... 
 
 
 组件（单文件)  xx.vue 
     script + template + style
```


```纯文本 
 2. 加载公共组件 
 动态注册全局公共组件:组件文件的名字就是挂载组件的名字,第一个字母大小 
 //require.context 
 const requireComponent = require.context('@/common', false, /.vue$/) 
 requireComponent.keys().forEach(fileName => { 
     const componentConfig = requireComponent(fileName) 
     let name = fileName.replace(/^.\//, '').replace(/.\w+$/, '') 
     let componentName = name.charAt(0).toUpperCase()+name.slice(1) 
     Vue.component(componentName, componentConfig.default || componentConfig) 
 })
```


```纯文本 
 3.函数式组件 
      函数式组件，即无状态，无法实例化，内部没有任何生命周期处理方法，非常轻量，因而渲染性能高，特别适合用来只依赖外部数据传递而变化的组件 
 <!-- App.vue --> 
 <template> 
     <div id="app"> 
         <List 
         :items="['Wonderwoman', 'Ironman']" 
         :item-click="item => (clicked = item)" 
         /> 
         <p>Clicked hero: {{ clicked }}</p> 
     </div> 
 </template> 
 <script> 
 import List from "./List"; 
 export default { 
     name: "App", 
     data: () => ({ clicked: "" }), 
     components: { List } 
 }; 
 </script> 
 
 <!-- List.vue 函数式组件 --> 
 <template functional> 
     <div> 
         <p v-for="item in props.items" @click="props.itemClick(item);"> 
             {{ item }} 
         </p> 
     </div> 
 </template>
```


```纯文本 
 4.v-model 的使用 
 // k-input   v-model   placeholder=' '  type='password'   attrs 的使用 
 <template> 
     <div> 
         <input v-bind='$attrs' :value='value' @input='oninput'> 
     </div> 
 </template> 
 <style> 
 
 
 </style> 
 <script> 
 export default { 
     name:'Form', 
     // model: {  //修改 当前组件v-model 的默认行为  默认是： value input 
     //     prop: 'checked',   
     //     event: 'change' 
     // }, 
     inheritAttrs: false,  //阻止attrs 默认继承在div上； 
     props:{ 
         value:{ 
             required:true, 
             type:String 
         } 
     }, 
     methods:{ 
         oninput(e){ 
             this.$emit('input',e.target.value) 
             this.$parent.$emit('validate') 
         } 
     } 
 } 
 </script>
```
