# Vue优化建议 一 :

```纯文本 
 1.keep-alive 
 
 keep-alive  时created 和 mounted  不会发生 但是 beforeRouteEnter 还是正常发生, 
    这里要注意:指的是直接被keep-alive 包裹的组件不包括组件里的子组件(子组件正常created和mounted) 
     但是component除外 ; 即使 component作为子组件 依然会被缓存 
     如果包裹的是router-view 那么子路由也要加入缓存 
 
 
 
 因此  你要避免一些东西反复加载 或者 一些东西 不加载,  
 而最好的方法时把这些东西 封装在  里面(先检测有没有,有就删除在加载)     而不要参合 在业务代码逻辑外面 
 
 
 千万不要用v-if或者v-show 来进行 是否keep-alive的判断 会有一系列的麻烦 能用 includes就用includes（注意是组件的name而不是路由的name,所以设计的时候） 
 keep-alive  非常好用的一个组件 
 
 在动态组件上使用 keep-alive 
 当在这些组件之间切换的时候，你有时会想保持这些组件的状态，以避免反复重渲染导致的性能问题 
 * include - 字符串或正则表达式。只有名称匹配的组件会被缓存。 
 * exclude - 字符串或正则表达式。任何名称匹配的组件都不会被缓存。 
 * max - 数字。最多可以缓存多少组件实例。 
 <keep-alive> 包裹动态组件时，会缓存不活动的组件实例，而不是销毁它们。 
 和 <transition> 相似，<keep-alive> 是一个抽象组件：它自身不会渲染一个 DOM 元素，也不会出现在父组件链中。 
 在 2.2.0 及其更高版本中，activated 和 deactivated 将会在 <keep-alive> 树内的所有嵌套组件中触发。 
 
 
 例一: 
 <!-- 失活的组件将会被缓存！--> 
 <keep-alive> 
     <component v-bind:is="currentTabComponent"></component> 
 </keep-alive>     
 例二: 
 <!-- 和 `<transition>` 一起使用 -- > 
 <transition> 
     <keep-alive> 
         <component :is="view"></component> 
     </keep-alive> 
 </transition> 
 
 
 <keep-alive> 不会在函数式组件中正常工作，因为它们没有缓存实例。 
 匹配首先检查组件自身的 name 选项，如果 name 选项不可用，则匹配它的局部注册名称 (父组件 components 选项的键值)。匿名组件不能被匹配。 
 
 
 <!-- 逗号分隔字符串 --> 
 <keep-alive include="a,b"> 
      <component :is="view"></component> 
 </keep-alive> 
 <!-- 正则表达式 (使用 `v-bind`) --> 
 <keep-alive :include="/a|b/"> 
      <component :is="view"></component> 
 </keep-alive> 
 <!-- 数组 (使用 `v-bind`) --> 
 <keep-alive :include="['a', 'b']"> 
     <component :is="view"></component> 
 </keep-alive> 
 
 
 最多可以缓存多少组件实例。一旦这个数字达到了，在新实例被创建之前，已缓存组件中最久没有被访问的实例会被销毁掉。 
 <keep-alive :max="10"> 
     <component :is="view"></component> 
 </keep-alive> 
 动态缓存： 
 <keep-alive :include='cache'></keep-alive> 
 watch:{ 
     $route:{ 
         handler(to,from){ 
          //注意：这个地方route的name要和组件的name保持一致； 
             if(to.meta.keepAlive){ 
                 if(this.cache.includes(to.name)){ 
                     this.cache.push(to.name) 
                 } 
             } 
         } 
     } 
 } 
 
 keep-alive和key的奇妙组合 
 key需要保持稳定；唯一；而不是随机数之类的；这是前提； 
 :key 会导致keep-alive重新失效吗？ 不会；依然该组件会被缓存；前提是key不变；如果key变了；依然会执行mounted等 
 常用组合： 
 <keep-alive> 
     <router-view :key="$route.fullPath"></router-view> 
 </keep-alive> 
 
 
 <keep-alive> 和beforeRouteEnter的坑 
 第一次进来 to,from.next 完全正常获取，但是你第二次进来 发现 from === undefined；这个地方没有及时更新； 
 这个时候你就要想到另一个钩子了： 
 beforeRouteUpdate (to, from, next) { 
     // 在当前路由改变，但是该组件被复用时调用 
     // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候， 
     // 实测keep-alive 仅仅query变化时也会触发 
     // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。 
     // 可以访问组件实例 `this` 
   }, 
 但是你在beforRouteUpdate里改变的值并没有跟新；、？？？？很奇怪 
 https://router.vuejs.org/zh/guide/advanced/navigation-guards.html#%E7%BB%84%E4%BB%B6%E5%86%85%E7%9A%84%E5%AE%88%E5%8D%AB   官网
```


```纯文本 
 2.import 引入 节省空间，防止版本不一致  类似把一个相关项目（后端） 当作稳定的cdn 引入 
 import 'nprogress/nprogress.css';  //这个地方默认启动时加了localhost:8000;绝对路径;类似                                http://localhost:400/socket.io/socket.io.js; 
 import * as type from ‘./tpyes’
```


```纯文本 
 3.相当强大和灵活，特别是项目重复且庞大的时候 
 
 
 mixins： 多个组件之间可以共享数据和方法 ， 非常的灵活 
 mixin:用法 
     抽离出组件中公用的方法和数据 ，非常的灵活和好用, 命名冲突时以组件为准 ， 其他情况合并，并且优先执行mixins 里 的 
 中的data是响应式的，和本实列的data 一样，但是在各个实列之间并不是互通的，而是互不影响，
```


```纯文本 
 4.Vue this.$nextTick 
 vue为了节省性能 数据发生变化时,dom 不会立即跟着变化,自己内部有一套自己的机制, 
 在 this.$nextTick(callback) 可以在数据发生变化时立即使用这个方法,就可以dom更新后执行回调函数, 
     Vue.nextTick(callback)
```


```纯文本 
 5.observable 用法 (使数据可响应式) 
     用法一:  使用vue2.6最新API Vue.observable 优化响应式 provide 
 // provide() { 
     // this.theme = Vue.observable({ 
         // color: "blue" 
     // }); 
     // return { 
         // theme: this.theme 
     // }; 
 // }, 
 // methods: { 
     // changeColor(color) { 
         // if (color) { 
             // this.theme.color = color; 
         // } else { 
             // this.theme.color = this.theme.color === "blue" ? "red" : "blue"; 
         // } 
     // } 
 // } 
     子组件: 
         inject: [ 
             'name' 
         ], 
     用法二: 针对小应用 模仿store 
              import Vue from "vue"; 
        export const store = Vue.observable({ count: 0 }); 
        export const mutations = { 
           setCount(count) { 
             store.count = count; 
           } 
        } 
 
     import { store, mutations } from "./store"; 
     export default { 
         name: "App", 
         computed: { 
             count() { 
                 return store.count; 
             } 
         }, 
         methods: { 
             setCount: mutations.setCount 
         } 
     };
```


```纯文本 
 6.object.freeze ( 长列表性能优化) 
     vue会通过object.defineProperty对数据进行劫持. 
     有些时候我们的组件就是 纯粹的数据展示 ， 不会有任何改变 ， 
     我们就 不需要vue来劫持我们的数据 ，在大量数据展示的情况下，这能够 很明显的减少组件初始化的时间 
     object.freeze方法来冻结一个对象，一旦被冻结的对象就再也不能被修改了。 
     export default { 
         data: () => ({ 
             users: {} 
         }), 
         async created() { 
             const users = await axios.get("/api/users"); 
             this.users = Object.freeze(users); 
         } 
     }; 
 注意: 这里只是冻结了users的值, 但是她的引用 别没有被冻结 
     // 改变值不会触发视图响应 
     this.users[0] = newValue 
     // 改变引用依然会触发视图响应 
     this.users = newArray 

```


```纯文本 
 7.属性事件传 递( $props,$listeners) 
     写过高阶组件的童鞋可能都会碰到过将加工过的属性向下传递的情况，如果碰到属性较多时，需要一个个去传递，非常不友好并且费时，有没有一次性传递的呢（比如react里面的{...this.props}）？答案就是v-bind和v-on。 
     举个例子，假如有一个基础组件BaseList，只有基础的列表展示功能，现在我们想在这基础上增加排序功能，这个时候我们就可以创建一个高阶组件SortList。 
     <!-- SortList --> 
     <template> 
         <BaseList v-bind="$props" v-on="$listeners"> <!-- ... --> </BaseList> 
     </template> 
     <script> 
     import BaseList from "./BaseList"; 
     // 包含了基础的属性定义 
     import BaseListMixin from "./BaseListMixin"; 
     // 封装了排序的逻辑 
     import sort from "./sort.js"; 
     export default { 
         props: BaseListMixin.props, 
         components: {     
             BaseList 
         } 
     }; 
     </script>
```


```纯文本 
 8.关于Vue中计时器使用 
    该方法是通过$once这个事件侦听器器在定义完定时器之后的位置来清除定时器。以下是完整代码： 
     const timer = setInterval(() =>{                     
         // 某些定时器操作                 
     }, 500);             
     // 通过$once来监听定时器，在beforeDestroy钩子可以被清除。 
     this.$once('hook:beforeDestroy', () => {             
         clearInterval(timer);                                     
     }) 
 通过 $on(eventName, eventHandler) 注册侦听一个事件 
 通过 $once(eventName, eventHandler) 注册一次性侦听一个事件 
 通过 $off(eventName, eventHandler) 停止侦听一个事件 
 通过 $emit( eventName, […args] )  触发已经侦听过的事件
```


```纯文本 
 9. vm.$watch( expOrFn, callback, [options] ) 
     观察 Vue 实例上的一个表达式或者一个函数计算结果的变化。回调函数得到的参数为新值和旧值。表达式只接受监督的键路径。对于更复杂的表达式，用一个函数取代。 
     注意：在变异 (不是替换) 对象或数组时，旧值将与新值相同，因为它们的引用指向同一个对象/数组。Vue 不会保留变异之前值的副本。 
 
 // 键路径 
 vm.$watch('a.b.c', function (newVal, oldVal) { 
   // 做点什么 
 }) 
 
 // 函数 
 vm.$watch( 
   function () { 
     // 表达式 `this.a + this.b` 每次得出一个不同的结果时 
     // 处理函数都会被调用。 
     // 这就像监听一个未被定义的计算属性 
     return this.a + this.b 
   }, 
   function (newVal, oldVal) { 
     // 做点什么 
   } 
 ) 
 
 //vm.$watch 返回一个取消观察函数，用来停止触发回调： 
 var unwatch = vm.$watch('a', cb) 
 // 之后取消观察 
 unwatch() 
 a.选项：deep 
 为了发现对象内部值的变化，可以在选项参数中指定 deep: true 。注意监听数组的变动不需要这么做。 
 b.选项：immediate 
 在选项参数中指定 immediate: true 将立即以表达式的当前值触发回调： 
 注意在带有 immediate 选项时，你不能在第一次回调时取消侦听给定的 property。 
 // 这会导致报错 
 var unwatch = vm.$watch( 
   'value', 
   function () { 
     doSomething() 
     unwatch() 
   }, 
   { immediate: true } 
 ) 
 //如果你仍然希望在回调内部调用一个取消侦听的函数，你应该先检查其函数的可用性： 
 var unwatch = vm.$watch( 
   'value', 
   function () { 
     doSomething() 
     if (unwatch) { 
       unwatch() 
     } 
   }, 
   { immediate: true } 
 )
```
