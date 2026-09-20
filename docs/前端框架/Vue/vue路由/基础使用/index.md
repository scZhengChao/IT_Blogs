# 基础使用

## 目录

- [vue的路由](#vue的路由)
- [路由守卫](#路由守卫)
- [基本使用](#基本使用)
- [优雅的分区](#优雅的分区)
- [路由嵌套](#路由嵌套)
- [命名视图](#命名视图)
  - [嵌套命名视图](#嵌套命名视图)
  - [\<router-view> 的 v-slot](#router-view-的-v-slot)

# **vue的路由**

```javascript 
 <li> 
 <router-link 
            active-class="product-router-activ :to="{name:'detail',params:{id:3},query:{a:111,b:222}}">商品003 
 </router-link> 
 </li> 
 
 多视图,命名视图 
 <router-view style="float:left;margin-top: 100px"></router-view> 
 <router-view name='a' style="float:right;margin-top: 100px;"></router-view> 
 let routes=[ 
     {path:'/child',components:{ 
         default:child, 
         a:childb 
     }}, 
  ]
```


# **路由守卫**

```纯文本 
 组件内路由（必须在一个router里） 
 <template id="user"> 
     <div class="user"> 
         <h3>用户</h3> 
         <div>{{userdata}}</div> 
     </div> 
 </template> 
 <script> 
     let user = { 
         template: '#user', 
         data(){ 
             return { 
                 ipt:'xxx', 
                 userdata:{} 
             } 
         }, 
         mounted(){ 
             console.log('mountd',this.userdata) 
         }, 
         update(){ 
             console.log('update') 
         }, 
         beforeRouteEnter(to,from,next){ 
             console.log('组件内前置守卫'); 
             //true 条件 vuex同步拿到 | 异步 axios -> nodejs->mongdb 
             if(true){ 
                //数据预载 
                 // axios 读写数据 假数据{a:数据} 
                 // this.data={a:'数据'} 不能访问this user未初始化 
                 next((_this)=>{ 
                     // alert('进入user组件未渲染前，调用了') 
                     // _this==目标组件 
                     _this.userdata={a:'假数据'} 
                 }) 
             }else{ 
                 next('/login'); 
             } 
         }, 
         beforeRouteLeave(to,from,next){ 
             console.log('后置守卫') 
             if(this.ipt!=''){ 
                 //控制data 数据 来对一段dom的显示 
                 let bl=window.confirm('要走了去?'+to.path) 
                 next(bl) 
             }else{ 
                 next(false) 
             } 
         } 
 } 
 </script> 
 
 
 全局路由守卫 
 router.beforeEach((to, from, next) => { 
     console.log('全局守卫',to,from);//to 目标组件的$route / from 当前的 
     next();//放过 
     next(true);//放过 
     next(false);//不放过 
     next('/login');//跳转 
      next({name:'',params:{},query:{}});//跳转传参  (注意：要params 必须有name属性才行) 
 }) 
 
 
 路由独享 
 / {path:'/user',component:user, }, 
 /{path:'/user',component:user,beforeEnter:userauth}, 
 /* let userAuth=(to, from, next) => { 
     console.log('路由独享'); 
     next(); 
 }; */ 

```


# 基本使用

```纯文本 
 路由要求： 引入 vue-router.js 
 
 路由使用流程： 
     0.    src="vue" -> src="vue-router" 
     1. 使用路由 (去哪) 
         <router-link to="/home">首页</router-link> 
           <router-view>展示区</router-view> 
           router-link 组件属性 
             tag='li' 指定编译后的标签 
             active-class='类名' 指定激活后的样式 
     2. 配置路由(建立组件和请求的对应关系)    数组 
         [{path:'/home',component:home},,{}] 
         path 路径 
         component: 指向的组件变量名 
     3. 创建路由(传递配置) 
         router = new VueRouter(配置) 
         配置:    {routes:数组} 
     4. 顶层|根组件，注册路由 （路由控制页面组件的加载） 
         选项 
             router(选项):router (router对象) 
 子路由：children 
     routes=[ 
         {}, 
         { 
             path:xx 
             component:xx 
             children:[  子路由 
                 {} 
                 .. 
             ] 
         }, 
         {} 
     ] 
 
 传参: 
 
 参数配置: 
     {path:'xx/:参数变量',component:xx} 
 
 传递参数 and 数据 
 router-link to='xx/参数?a=1b=2' 
 router-link :to='{name:'xx',params:{},query:{}}' 
 
 接收参数和数据 
     {{this.$route.params|query|path}} 
 
 组件内部实现路由跳转: 
     router.push(...) 
     this.$router.push({path:'...'})   添加一个路由 （记录到历史记录) 
     this.$router.replace({path:'...'})   替换一个路由 （不记录到历史记录) 
     this.$router.go(-1|1)|goBack()  回退/前进  history.go|goBack 
 
 路由守卫: 
         全局守卫/路由独享的守卫/组件内的守卫 
 
         beforeRouteEnter(to,from,next){}    前置守卫,进入 
             to 目标路由 
             from 当前路由 
             next 是个函数  next() == next(true)  运行跳转 
                            next(false) 不让跳转 
                            next('字符路径')/next({对象路径}) 重定向 
 
 
         beforeRouteLeave(to,from,next){}  后置守卫,离开 
 
 
     路由数据预载: 
         beforeRouteEnter(to,from,next){ 
             1. 兜库 this.$http   axios可用 
             2. next( _this => _this.属性="拿到的数据") 
         } 
 
 
 2.vue-router 的next() 
 vue-router 的 next() 不会再次经过 路由守卫   
 但是next('/login') 会再次经过路由守卫造成死循环(maximum call stack size exceeded 无限死循环)’ 
 当路由中path, component, redirect 都存在时， 以 redirect 为准 
 想· 
 
 
 :id params 可有可无 
 { 
     name: "index", 
     path: '/p/:id?', 
     component: resolve =>void(require(['../components/admin/layout/index.vue'], resolve)) 
 } 

```


# **优雅的分区**

```纯文本 
 import Vue from 'vue'; 
 import Router from 'vue-router'; 
 Vue.use(Router) 
 let routes = [] 
 let context = require.context('./routes', false, /.(js|ts)$/) 
 let keys = context.keys().forEach(path=>{ 
     const defaultRoutes = context(path) 
     routes = [...routes,...defaultRoutes.default] 
 }) 
 let router = new Router({ 
     base:process.env.BASE_URL, 
     routes:[ 
         ...routes, 
         { 
             path:'*', 
             name:'error', 
             meta:{ 
                 title:'404' 
             }, 
             component:()=>import('@/pages/errors/404.vue') 
         } 
     ], 
     scrollBehavior(to, from, savedPosition) { 
         if (savedPosition) { 
           return savedPosition 
         } else { 
           return { x: 0, y: 0 } 
         } 
     }, 
 }) 
 
 
 export default router
```


# 路由嵌套

又叫做子路有；经常用做admin 管理平台 laylout 和 view

```javascript 
import Vue from 'vue'
import VueRouter from 'vue-router'
import Admin from '@/views/Admin.vue'

// 导入admin子路由
import Create from '@/views/admin/Create';
import Edit from '@/views/admin/Edit';

Vue.use(VueRouter)

const routes = [
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    children: [
      {
        path: 'create',
        component: Create,
      },
      {
        path: 'edit',
        component: Edit,
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router


```


# 命名视图

**有时候想同时 (同级) 展示多个视图**，而不是嵌套展示，例如创建一个布局，有 `sidebar` (侧导航) 和 `main` (主内容) 两个视图，这个时候命名视图就派上用场了。你可以在界面中拥有多个单独命名的视图，而不是只有一个单独的出口。如果 `router-view` 没有设置名字，那么默认为 `default`。

```javascript 
<router-view class="view left-sidebar" name="LeftSidebar"></router-view>
<router-view class="view main-content"></router-view>
<router-view class="view right-sidebar" name="RightSidebar"></router-view>
```


一个视图使用一个组件渲染，因此对于同个路由，多个视图就需要多个组件。确保正确使用 `components` 配置 (带上 **s**)：

```javascript 
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      components: {
        default: Home,
        // LeftSidebar: LeftSidebar 的缩写
        LeftSidebar,
        // 它们与 `<router-view>` 上的 `name` 属性匹配
        RightSidebar,
      },
    },
  ],
})
```


## 嵌套命名视图

我们也有可能使用命名视图创建嵌套视图的复杂布局。这时你也需要命名用到的嵌套 `router-view` 组件。我们以一个设置面板为例：

![](./image/image_CF8dpxihrw.png)

- `Nav` 只是一个常规组件。
- `UserSettings` 是一个视图组件。
- `UserEmailsSubscriptions`、`UserProfile`、`UserProfilePreview` 是嵌套的视图组件。

**注意**：*我们先忘记 HTML/CSS 具体的布局的样子，只专注在用到的组件上。*

`UserSettings` 组件的 `<template>` 部分应该是类似下面的这段代码:

```javascript 
<!-- UserSettings.vue -->
<div>
  <h1>User Settings</h1>
  <NavBar />
  <router-view />
  <router-view name="helper" />
</div>
```


那么你就可以通过这个路由配置来实现上面的布局：

```javascript 
{
  path: '/settings',
  // 你也可以在顶级路由就配置命名视图
  component: UserSettings,
  children: [{
    path: 'emails',
    component: UserEmailsSubscriptions
  }, {
    path: 'profile',
    components: {
      default: UserProfile,
      helper: UserProfilePreview
    }
  }]
}
```


## `<router-view>` 的 `v-slot`

`<router-view>` 暴露了一个 `v-slot` API，主要使用 `<transition>` 和 `<keep-alive>` 组件来包裹你的路由组件。

```javascript 
<router-view v-slot="{ Component, route }">
  <transition :name="route.meta.transition || 'fade'" mode="out-in">
    <keep-alive>
      <suspense>
        <template #default>
          <component
            :is="Component"
            :key="route.meta.usePathKey ? route.path : undefined"
          />
        </template>
        <template #fallback> Loading... </template>
      </suspense>
    </keep-alive>
  </transition>
</router-view>
```
