# vue----思想和基础

```纯文本 
 VUE: 
     官网：https://cn.vuejs.org 
     API：https://cn.vuejs.org/v2/api/ 
 
 
     小 -> 大 
     封装(函数)->多个封装(文件)==库||框架 
                     ↓ 
                    插件 
 
 
                    模块(文件)  分类（目录)->包 
     框架：改变了编码思想   VUE: 数据驱动，一切都是数据,面向数据 
         面向  事件 
         面向  对象 
         面向  数据 
     库:  工具本身不改变编码的方式 
         jquery -> dom        事件驱动 
 
 
 MVC：html页面里面会出现<%=后台属性%>  {$后台属性$} {{后台属性}} mustache 
     一个思想、是后端产物,是为了前后端分离 
     1. 后台 java(jsp+html)  php(php+html+js)  nodejs(nodejs+ejs) 
     2. 前台 (html+css+js) 
     3. 编辑 (拿着后台给他开发的后台管理页面xxx.com:8008/admin.php) 
     4. 设计 
 
 
 前端MVC(分离js)：   数据、表现、业务分离 
     model        M  数据  ajax/jsonp/数据解析  可以复用 
         | xx.js 
         ... 
     view        V  视图表现层 展示数据、创建元素，变色，运动 可以复用 
         ... 
     control        C  控制层(串业务,事件驱动)  一般不复用 
         ... 
 
 
     function readBaidu(str,callback){..拿着需求str,求数据，调用回调带数据出去.} 
     function writeLi(data){...拿着数据写页面} 
     window.onload=function(){ 
         oBtn.onclick=function(){ 
             readBaidu('xxx',function(res){ 
                 writeLi(res); 
                 winObj.close() 
             }) 
         } 
     } 
 VUE: 是个M V VM框架 
     MVC:衍生出很多变体  MVP MVVM MV* 
     mv  vm~C 
     MVVM M  <-> VM <-> V 
 
 
 
 
 基本使用： 
     new出来一个Vue的实例，传一堆配置参数，控制一片html 
 
 
     VM:        响应系统 - > vDOM做标记 ->一个循环周期结束后->操作DOM 
         new Vue   返回  VM 
         new Vue({ 
             el:'选择器'  要控制器的那片html代码 
             data:{key:value}数据 
             methods:{fnName:fn} 方法 
         }) 
     M:    初始化数据 
         data 选项   number/string/boolean/array/json/undefined/null 
     V:  数据绑定 
         {{数据名}}    模板 mustche  插值表达式 
         v-text="数据名"        vue特有的属性(指令) 
         v-html="strong"        非转义输出 
         v-for="(val,index) in 数据"        val值  index索引    变量数组、对象 
             key="bmw"  指定key 是个bmw字符 vue是认得 修改VDom的key值 
             :key="item.id"  指定key 是数据id（唯一性） 修改VDom的key值 
         v-bind:html属性="数据"    普通的html属性绑定数据 
             :html属性="数据"  简写   title/src/url/..... 
         事件： 
             v-on:事件名="方法" 
                @:事件名="方法"    简写 
                @:事件名="方法(参数)" 
                @:事件名="方法($event,参数)"        methods:{方法:function(ev,参数){ev/event}} 
 class Person{ 
     con...(){ 
     this.实例属性 
     } 
 
 
     show(){}实例方法 
 } 
 
 
 Person.类属性 
 Person.实例方法=fn 
 
 
 类属性|方法  和 实例属性|方法
```


```纯文本 
 Vue == 类 
     vm ==  new Vue({配置}) 返回  实例 
     在配置内部  的  this == vm 实例 
         Vue.类方法|类属性 
         vm.$实例方法()|$实例属性  == this.$实例方法()|$实例属性 
         vm==this   this.$set/Vue.set 
 
 
 数据检测：vue的数据是响应式，非响应式的情况如下 
 
 
     数组数据变化： 
             问题:对数组使用了非变异 (non-mutating method) 方法（返回的了新数组） 
             解决： 对象合并 
 
 
             问题：利用索引直接设置一个项|修改数组的长度时 
             解决：Vue.set(数组对象, key, value) | vm|this.$set(数组对象, key, value) 
 
 
     对象的数据变化： 
             问题：data:{a:1} 
                     a 数据是响应式的 
                     vm.b='qq';  b 属性不是响应式的 
             解决：Vue.set(数组对象, key, value) | vm|this.$set(数组对象, key, value) 
 
 
 
 
 模块表达式: 
     {{数据本身|data的属性|变量|表达式}} 
     v-指令名="数据|data的属性|变量|表达式" 
 
 
 计算属性:  是一个函数,所依赖的元数据变化时，就会再次执行 
     computed:{ 
         计算属性:函数:function(){return 返回值}        使用:    {{计算属性}} 
     } 
 
 
     与method的区别:    方法会每次调用，计算属性不会(只有在与之相关的元数据发生变化时，才调用) 
         计算属性的性能高: 适合做筛选 
         方法：适合在列表渲染使用，强制渲染执行 
 
 
 指令:  扩展了html语法功能,区别了普通的html属性 
     vue自带的指令:    v-text/v-html/v-bind/v-for/v-model/v-on 
 
 
             v-show="布尔"             v-if="布尔" 
     区别:    操作css                    操作dom 
     场景:    适合频繁切换            适合不频繁切换 
     性能:    初始渲染消耗            频繁切换回有渲染消耗 
 
 
 
 
 class操作/style操作: 
     v-bind:class="数据|属性|变量|表达式" 
           :class/style = " 数据 "        数据类型：字符/对象 / 数组 
           :class="{类名:true,类名2:false}"  布尔值决定样式是否使用 
           :style="[{css属性名:值},{css属性名小驼峰：值}]" 
 
 
 双向绑定： 
     v-model:    创建双向数据绑定(M<->V) , 用在能生产数据的表单元素 
         input/radio/select/.....  绑定的是表单元素的  value值 
 单向绑定： 
     :value="model层属性" 
     :checked="......" 
 
 
 单向绑定模拟双向绑定: 
     :value="...."   model->view 
     v-on:input="fn($event.value)"  输入时把事件对象的value携带到方法，方法修改了model 
 
 
 --------------------------------------------------------------------------------- 
 
 
 指令(directive): 
     v-text/v-html/v-bind/v-on/v-model/v-for/v-if/v-show/v-else/v-else-if 
 
 
 自定义指令: 指令是个函数|对象,用来操作dom的, 里面的this 返回window 
 
 
     a)    Vue.directive('指令名不带v-',函数(el,binding)) 
             el == 使用指令的DOM元素 
             binding 是个对象 含有传入的 参数(binding.value) 
     b)  定义在选项里面 
         directives:{ 
             指令名不带v-    : 函数(el,binding){} 
         } 
 
 
     指令是个函数(简写)，可以是个对象 
 
 
     { 
         钩子函数 
         inserted:fn(el,binding)        绑定指令的元素插入到父节点时调用 
         bind:fn    指令第一次绑定到元素时调用 
         update:fn    指令所在的元素的model层的数据，view有更新请求时 
         componentUpdated:fn    更新完成时 
     } 
 
 
     简写方式: bind + update 
 
 
 
 
 事件： 
     模块绑定行间事件:        <xx v-on:事件名="方法名($event,参数)" 
                             <xx @事件名="方法名($event,参数)" 
     绑定自定事件: 
         定义：vm.$on( '自定义事件名'|['自定义事件名1','自定义事件名2'], 回调(参数) ) 
         销毁：vm.$off( '自定义事件名'|['自定义事件名1','自定义事件名2'], 回调(参数) ) 
         触发: vm.$emit(自定义事件名1,参数) 
 
 
     事件对象: 
         事件对象可以不传递，需要传递的场景:传参数同时使用事件对象时 
         show($event,参数) 
 
 
     冒泡：默认冒泡 
         $event   ev|event.cacelBubble=true ev.stopPropagation() 
         @click.stop 修饰符 
     默认行为: 
         event|ev.preventDefault();   @事件.prevent 
 
 
     连缀:    @事件.修饰符.修饰符    @事件.prevent.stop 
 
 
     修饰符:  keyCode/键名(enter/left/right/up/down/...) 
 
 
 修饰符： 
     事件修饰符: @click.stop 
     按键修饰符:    @keyup.left 
         系统键    修饰符:    @keyup.ctrl 
     表单指令修饰符: v-model.number 
 
 
 
 
 ------------------------------------------------------ 
 
 
 
 
 过滤器(filter)： 就是个函数 
 
 
     场景： 格式数据 
      
     currency / number / date   vue1.x 
      
     vue2.x 取消了自带过滤器,  需要用户自行封装 
      
     使用：    {{数据名 | 过滤器名(参数1,参数2)}} 
             v-xxx="数据名 | 过滤器名(参数1,参数2)" 
             :属性="数据| ... " 
     定义: 
             a) Vue.filter('过滤器名称',函数(要过滤的元数据,参数1，n)) 
             b) 选项 
                 filters:{ 
                     过滤器名称:函数 
                     过滤器名称2:函数(要过滤的元数据,参数) 
                 } 
 

```


```纯文本 
 数据交互： 
 
     XMLHttpRequest|ActiveObjectX 
 
         - ajax函数 
     $.ajax() 
 
 
     fetch()  返回 是一个promise 
     promise   async + await 
 
 
     vue-resource   下载安装引入   vue1.x 推荐    支持jsonp 
         使用:    返回的是promise对象 
         this.$http.get('url地址?key=value&key=value').then(succFN,errorFn) 
         this.$http.get('url地址',{配置}).then(succFN,errorFn) 
         this.$http.post('url地址',{数据},{配置}).then(succFN,errorFn) 
         this.$http.jsonp('url地址',{配置}).then(succFN,errorFn) 
             params:{ //携带参数 
                 wd:'bulala' 
               }, 
             jsonp:'cb', //约束回调函数的key, 
             jsonpCallback:'show',//回调函数名 
 
 
              this.$http.jsonp( 
                         'https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su', 
                         { 
                           params:{ 
                             wd:'labula' 
                           }, 
                           jsonp:'cb' 
                         } 
                       ).then( 
                         res=>this.list=res.body.s 
                       ) 
 
 
             请求: 
                 body: post需要携带的数据 
                     支持string  a=1&b=2 
                      对象<需要设置emulateJSON：true> 
                      UrlSearchParams 类型 new Xxx() -> x.set(key,value) 
                 params: {key:value}  携带数据  get 
                 headers: {}  携带请求头 
                 method：'get' get/post/.....   string 
                 timeout: number  超时 
                 progress：fn   进度 
                 credentials: false  是否携带跨源凭证 
                 emulateJSON：true post请求是需要携带的请求头 
                 jsonp:'回调函数键' 默认是callback 
             响应： 
                 body      返回的数据  对象  (JSONP.parse) 
                 bodyText  返回的数据  文本格式  toString 
 
 
 
 
 数据监听：监听到数据的变化,启动处理函数 
         1)    watch 选项|属性   √ 
             watch:{data里面的属性名:处理函数|对象} 
             watch:{ 
                 元数据:函数(新值，老值) 
                 元数据:{ 
                     handler:函数(新值，老值), 
                     deep: true   深度检测   默认false 
                 } 
             } 
 
 
 实例|组件 生命周期 
     beforeCreate/created/beforeMount/mounted/beforeUpdate/updated/beforeDestroy/destroyed、 
 

```
