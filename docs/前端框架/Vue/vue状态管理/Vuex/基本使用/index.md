# 基本使用

## 目录

- [store 基础](#store基础)
  - [其他共享数据的方法](#其他共享数据的方法)
    - [发布订阅 let bus = new vue() 公共总线](#发布订阅-let-bus--new-vue-公共总线)
  - [状态管理内部](#状态管理内部)
- [插件：pulgins    ](#插件pulgins-)
- [表单处理    ](#表单处理-)
- [优雅的分区module 化 ](#优雅的分区module化)
- [vuex 和 单文件vue的结合](#vuex和单文件vue的结合)

# ***store 基础***

```纯文本 
dispatch()是异步的, 但是commit是同步的, 在严格模式下不通过mutations 修改store的数据会报错会报错
vue的状态管理
这状态管理 -->本质上就是一个仓库.相对于组件间的prop和ref传值,

对于大型项目来说,状态管理更加方便管理.

集中式数据管理,一处修改,多出使用.无需复杂的组件间传值

在我看来 vuex 就是把需要共享的变量全部存储在一个对象里面，然后将这个对象放在顶层组件中供其他组件使用
思维流程:
                                        store.js
                this.$store.commit('increment')    -> mutations
                this.$store.dispatch('jia')                -> actions
                 mapActions() ->actions                                                mapGetters()->getters
        components - >  actions        ->  mutations -> state  <-  getters    <-    components
            发送请求              处理                 修改状态
                                      业务逻辑            修改state                       读取state
                                          异步
                                                      state<-$store.state <-  学生
-----------------------------------------------------------------------------
安装 vuex 状态管理插件
引入 + use
------------------------------------------------------------------------------
mapActions/mapGetters  执行后， 返回来的是对象
    对象:    {incremen:fn,decrement:fn,xx,xx}
------------------------------------------------------------------------------
this.$store.commit('increment',参数/负载/payload) -> mutations   //会导致不响应
this.$store.dispatch('increment',参数/负载/payload)  -> actions
const actions = {
    increment:({store对象},参数)=>{}
}

```


## ***其他共享数据的方法***

```纯文本 
 //绑定 
 vm.$on('bulala',function(mess){ 
     console.log('bulala事件触发了，接受了：',mess); 
     //解绑 
     vm.$off('bulala') 
 }); 
 
 
 //触发 
 vm.$emit('bulala',vm.$data.a); 
 vm.$emit('bulala',vm.$data.a); 
 
 
 
 watch:{//数据观测|监听 
     a(newVal,oldVal){ 
         console.log('a数据变化前:',oldVal,'后的:',newVal,this) 
     }, 
     b:'show',//vue 实例方法, 
     e:{ 
         handler:function(newVal,oldVal){console.log('e变化了')}, 
         deep:true,//深度检查 
         immediate:true//立即调用 ,第一次加载没有变化才执行 
     } 
 } 

```


### ***发布订阅 let bus = new vue() 公共总线***

```纯文本 
 <body> 
 <div id="app"> 
     <aa></aa> 
     <bb></bb> 
     <cc></cc> 
 </div> 
 <script> 
 let bus =new Vue(); 
 
 let aa={ 
     data(){return {msg1:'aaa'}}, 
     template:`<div @click="send">aa</div>`, 
     methods:{ 
         send(){ 
             bus.$emit('aa-to-cc',this.msg1);//发布 
         } 
     } 
 } 
 let bb={ 
     data(){return {msg2:'bbb'}}, 
     template:`<div @click="send">bb</div>`, 
     methods:{ 
         send(){ 
             bus.$emit('bb-to-cc',this.msg2) 
         } 
     } 
 } 
 let cc={ 
     data(){return {msg3:'ccc',msg1:'空',msg2:'空'}}, 
     template:`<div>{{msg1}}/{{msg2}}/{{msg3}}</div>`, 
     mounted() { 
         bus.$on('aa-to-cc',(data)=>{this.msg1=data}); 
         bus.$on('bb-to-cc',(data)=>{this.msg2=data}); 
     }, 
 } 
 
 let vm = new Vue({ 
     el: '#app', 
     data:{ 
         title:'app root' 
     }, 
     components: { 
         aa,bb,cc 
     } 
 }) 
 </script> 
 </body>
```


## ***状态管理内部***

```纯文本 
 actions 
 let actions={ 
     [types.VIEW_NAV]:({commit},payload)=>commit(types.VIEW_NAV,payload), 
     [types.VIEW_FOOT]:({commit},payload)=>commit(types.VIEW_FOOT,payload), 
     [types.VIEW_LOADING]:({commit},payload)=>commit(types.VIEW_LOADING,payload), 
     [types.login]: ({ commit, state }, payload) => { 
         return axios({ 
             url: 'http://localhost:3000/login', 
             params: payload, 
             // withCredentials: true,//携带跨源凭证 
             }) 
     }, 
     [types.UPDATE_HOME]:({commit,state},payload)=>{ 
         //???? axios 
         axios({ 
             url:payload, 
         }).then( 
             res=>commit(types.UPDATE_HOME,res.data) 
         ) 
     }, 
     [types.CHECK_USER]:({commit,state},payload)=>{ 
         // console.log('CHECK_USER123',payload); 
         axios({ 
             url:'/data/user.json', 
                 /* params:{ 
                     username:payload.username, 
                     password:payload.password, 
                 } */ 
         }).then( 
             res=>commit(types.CHECK_USER,res.data) 
         ) 
     } 
 }; 
 
 getters 
 let getters={ 
     bNav:(state)=>state.bNav, 
     bFoot:(state)=>state.bFoot, 
     bLoading:(state)=>state.bLoading, 
     home:(state)=>state.home, 
     user:(state)=>state.user 
 }; 
 
 mutations 只用作数据的图片 
 let mutations={ 
     [types.VIEW_NAV]:(state,payload)=>state.bNav=payload, 
     [types.VIEW_FOOT]:(state,payload)=>state.bFoot=payload, 
     [types.VIEW_LOADING]:(state,payload)=>state.bLoading=payload, 
     [types.UPDATE_HOME]:(state,payload)=>state.home=payload, 
     [types.CHECK_USER]:(state,payload)=>state.user=payload 
 }; 

```


# \*\*\*插件：pulgins    \*\*\*​

[***https://vuex.vuejs.org/zh/guide/plugins.html***](https://vuex.vuejs.org/zh/guide/plugins.html "https://vuex.vuejs.org/zh/guide/plugins.html")

```纯文本 
 封装：意思和高阶函数/组件类似 
 export default function createWebSocketPlugin (socket) { 
   return store => { 
     socket.on('data', data => { 
       store.commit('receiveData', data) 
     }) 
     store.subscribe(mutation => { 
       if (mutation.type === 'UPDATE_DATA') { 
         socket.emit('update', mutation.payload) 
       } 
     }) 
   }} 
 
     const plugin = createWebSocketPlugin(socket) 
     const store = new Vuex.Store({ 
       state, 
       mutations, 
       plugins: [plugin]} 
     ) 
 
 
 //这才是原本的plugins的样子 
 const myPlugin = store => { 
   // 当 store 初始化后调用 
   store.subscribe((mutation, state) => { 
     // 每次 mutation 之后调用 
     // mutation 的格式为 { type, payload } 
   })}
```


# \*\*\*表单处理    \*\*\*​

[***https://vuex.vuejs.org/zh/guide/forms.html***](https://vuex.vuejs.org/zh/guide/forms.html "https://vuex.vuejs.org/zh/guide/forms.html")

\*\*\*   get set 的应用/简单到store的双向绑定\*\*\*​

```纯文本 
 简化就是状态管理使用v-model 
 <input v-model="message"> 
 computed: { 
   message: { 
     get () { 
       return this.$store.state.obj.message 
     }, 
     set (value) { 
       this.$store.commit('updateMessage', value) 
     } 
   }}
```


# \*\*优雅的分区module 化 \*\*​

```纯文本 
 getters 
 import * as  types from './types'; 
 export default { 
     move: state => state.modb.move, 
     name: state => state.moda.name 
 } 
 
 import a from './a' 
 import b from './b' 
 export default  { 
     ...a, 
     ...b 
 } 
 
 
 modules 
 import * as types from '../../store/types'; 
 export default { 
     state: { 
         move:{} 
     }, 
     actions: { 
         [types.MOVE]: ({ commit }, payload) => { 
             commit(types.MOVE,payload) 
         } 
     }, 
     mutations: { 
         [types.MOVE]: (state, payload) => {state.move = payload} 
     } 
 } 
 
 import a from './a' 
 import b from './b' 
 export default { 
     a, 
     b 
 } 
 
 const moduleA ={ 
      namespaced:true , //开启namespace:true，该模块就成为命名空间模块了 
      state:{ 
           count:10, 
           countA:888 
      }, 
      mutations:{...}, 
      actions:{...} 
 } 
 
 
 
 types 
 import * as a from './a' 
 import * as b from './b' 
 export default { 
     a, 
     b 
 } 
     
 index 
 import Vue from 'vue' 
 import Vuex from 'vuex' 
 Vue.use(Vuex) 
 import models from './models' 
 import getters from './getters' 
 export default new Vuex.Store({ 
     modules:{ 
         ...models 
     }, 
     getters, 
     strict: process.env.NODE_ENV !== 'production' 
 })
```


# ***vuex 和 单文件vue的结合***

```纯文本 
 import {mapGetters,mapMutations,mapState,mapActions } from 'vuex 
 
 mapGetters 
 computed:{ 
     ...mapGetters([ 
         'bfoot','bloadding',"shop" 
     ]) 
   }, 
 
 mapMutations 
 methods:{ 
     ...mapMutations([ 
           'set','get','update 
      ']) 
 } 
 
 mapActions 
 methods:{ 
     ...mapActions([ 
         'set','get','update 
     ']) 
 } 
 
 mapState 
 computed:{ 
     ...mapState([ 
         'bfoot','bloadding',"shop" 
     ]) 
   }, 
 

```
