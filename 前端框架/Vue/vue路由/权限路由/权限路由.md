# 权限路由

[https://segmentfault.com/a/1190000015800801](https://segmentfault.com/a/1190000015800801 "https://segmentfault.com/a/1190000015800801")

```javascript 
 ['parents/children', 'parents2/children']  // 后端返回的动态路由 
 这边又一系列的完整的 动态路由 数组 [] 
 
 import router from './router'; 
 import store from './store'; 
 import { Message } from 'element-ui'; 
 import Nprogress from 'nprogress'; 
 import 'nprogress/nprogress.css';  //这个地方默认启动时加了localhost:8000;绝对路径;类似http://localhost:400/socket.io/socket.io.js; 
 import { 
   getUserInfo, 
   removeUserInfo 
 } from '@/utils/auth'; 
 Nprogress.configure({ 
   showSpinner:false 
 }) 
 //判断是否有权限 
 function hasPermission(permissions) { 
   // 如果meta中没有定义permissions ,直接true 
   if (!permissions) { 
     return true 
   } 
   const newPermissions = []; 
   store.getters.permissions.forEach(permission => { 
     // 将后端返回的permissions 按照'/'分隔,并且第一个,作为一级菜单 
     var permissionArray = permission.split('/') 
     var modulePermission = permissionArray.shift() 
     // 这个判断是把第一个当作一级菜单,并且把子菜单不要改动 
     if (!newPermissions.includes(modulePermission)) { 
       newPermissions.push(modulePermission) 
     } 
     newPermissions.push(permission) 
   }) 
   // some 传过来的权限列表里是否找到路由中meta的项 返回true 或者false 
   return newPermissions.some(item => permissions.includes(item)) 
 } 
 const whiteList = ['/login', '/auth-redirect']  //白名单,不需要登录就可访问 
 let firstRequestPermission = true;   //是否第一次请求,主要是权限路由并没有储存在cookie 防止刷新没掉了 
 
 
 router.beforeEach((to, from, next) => { 
   Nprogress.start() 
   // 确认是否有userinfo 和 token信息 
   // 有 
   const userInfo = JSON.parse(getUserInfo()) 
   if (userInfo && userInfo.createToken) { 
     if (to.path === '/login') { 
       next({ path: '/' }) 
       Nprogress.done()   //如果他没有afterEach 的话 
     } else if (!firstRequestPermission) { //在登录的情况下,如果你刷新了,就请走下面else,就是因为刷新把premission刷没有 
       //没有刷新,不是第一次 
       next() 
     } else {  //刷新的情况下 
       if (store.getters.permission.length === 0) {  //判断是否已经拉取了权限列表       
         store.dispatch('GetPermission').then(res => {  //从后端拉取权限 
           const permission = res.data //后盾返回的权限 
           store.dispatch('GenerateRoutes', { permission }).then(res => {  //去整合权限生成新的完整权限路由 
             firstRequestPermission = false; 
             router.addRoutes(store.getters.addRoutes) 
             next({...to,replace:true}) //刷新的情况下,this.$store.replace()替换里是记录 
           }) 
         }).catch(() => { 
           // 如果初始化路由出错了,就退出登录,并跳转login 
           removeUserInfo() 
           Message.error(err || '验证失败,请重新登录') 
           next({path:'/'}) 
         }) 
       } else { 
         // 如果没有动态改变权限的需求,可直接next 删除下方的权限判断 
         if (hasPermission(to.meta.permission)) { //取得路由在权限里 
           next() 
         } else { 
           next({ 
             path: '/401', 
             replace: true, 
             query:{noGoBack:true} 
           }) 
         } 
         // 可删  ↑ 
       } 
       // 机构信息 
       if (store.getters.organizations.length === 0) { 
         store.dispatch('GetOrganizations') 
       } 
     } 
   } else { 
     // 没有token信息 
     if (whiteList.indexOf(to.path) !== -1) { 
       next()  //不会经过路由守卫了 
     } else { 
       next(`/login?redirect=${to.path}`) //只要里面有东西,就会再次经过路由守卫 
       Nprogress.done() 
     } 
   } 
 }) 
 
 
 router.afterEach(() => { 
   NProgress.done() 
 })
```
