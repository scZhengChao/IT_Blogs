# 常见问题

## 目录

- [Loading chunk (\d)+ failed](#Loading-chunk-d-failed)
- [this.\$route.push() 禁止跳转到当前路由](#thisroutepush-禁止跳转到当前路由)
- [vue-router的滚动行为；做的更好，更细致](#vue-router的滚动行为做的更好更细致)

# **Loading chunk (\d)+ failed**

猜测: 出现场景 路由懒加载是时 出现几率加大, 偶尔会出现

```javascript 
import Vue from 'vue';

import Router from 'vue-router';

// 两种页面引入方式

// 方式1，将所有页面import进来，会打包成一个巨大的js,首页加载慢，后续页面加载快，不推荐

// import Page404 from '@/pages/Page404';

// import Indexfrom '@/pages/index';

// 方式2，路由懒加载，所有页面按需加载，推荐，但"Loading chunk {n} failed"出现几率高于方式1，原因未知

const Page404 = resolve => require(['@/pages/Page404'], resolve);

const Index= resolve => require(['@/pages/index'], resolve);

Vue.use(Router);

const $router = new Router({

    mode: 'history',

    // 解决vue框架页面跳转有白色不可追踪色块的bug

    scrollBehavior (to, from, savedPosition) {
        return { x: 0, y: 0 }
    },
    routes: [
        {
            path: '*',
            name: page404
            component: Page404
        },
         {
            path: '/index',
            name: index
            component: Index
        },
    ]
})

$router.onError((error) => {
    const pattern = /Loading chunk (\d)+ failed/g;
    const isChunkLoadFailed = error.message.match(pattern);
    if(isChunkLoadFailed){
        // 用路由的replace方法，并没有相当于F5刷新页面，失败的js文件并没有从新请求，会导致一直尝试replace页面导致死循环，而用 location.reload 方法，相当于触发F5刷新页面，虽然用户体验上来说会有刷新加载察觉，但不会导致页面卡死及死循环，从而曲线救国解决该问题
        location.reload();
        // const targetPath = $router.history.pending.fullPath;
        // $router.replace(targetPath);
    }
  });
export default $router;
```


# **this.\$route.push() 禁止跳转到当前路由**

```javascript 
(1)
降低vue-router 版本  因为3.0.7 以上 this.router.push() 返回为promise

(2)
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}
```


# vue-router的滚动行为；做的更好，更细致

[https://router.vuejs.org/zh/guide/advanced/scroll-behavior.html#%E5%BC%82%E6%AD%A5%E6%BB%9A%E5%8A%A8](https://router.vuejs.org/zh/guide/advanced/scroll-behavior.html#%E5%BC%82%E6%AD%A5%E6%BB%9A%E5%8A%A8 "https://router.vuejs.org/zh/guide/advanced/scroll-behavior.html#%E5%BC%82%E6%AD%A5%E6%BB%9A%E5%8A%A8")

注意：只是浏览器的前进后退；而且如果有数据请求；得异步return

```handlebars 
 scrollBehavior (to, from, savedPosition) {   
  return new Promise((resolve, reject) => {     
        setTimeout(() => {       
            resolve({ x: 0, y: 0 })     
        }, 500)  
   })
 }
```
